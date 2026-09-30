import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

const allowed = [
  "image/*",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.*"
];

export async function POST(request: Request) {
  try {
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (!blobToken) {
      return NextResponse.json({ error: "Vercel Blob não está configurado neste ambiente." }, { status: 503 });
    }
    const body = (await request.json()) as HandleUploadBody;
    const session = body.type === "blob.upload-completed" ? null : await auth();
    if (body.type !== "blob.upload-completed" && !session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    const jsonResponse = await handleUpload({
      token: blobToken,
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
       if (!session?.user?.id) throw new Error("Não autorizado.");
       if (pathname.length > 200) throw new Error("Nome de arquivo inválido.");
       const upload = clientPayload ? JSON.parse(clientPayload) as { ticketId?: string; fileName?: string; fileSize?: number; fileType?: string } : {};
       if (!upload.ticketId || !upload.fileName || !upload.fileSize || !upload.fileType) throw new Error("Dados do arquivo incompletos.");
       const ticket = await prisma.ticket.findUnique({ where: { id: upload.ticketId }, select: { requesterId: true, assigneeId: true } });
       if (!ticket || (session.user.role === "USER" && ticket.requesterId !== session.user.id)) throw new Error("Sem permissão para este chamado.");
       return {
          allowedContentTypes: allowed,
          maximumSizeInBytes: 15 * 1024 * 1024,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ userId: session.user.id, ticketId: upload.ticketId, fileName: upload.fileName, fileSize: upload.fileSize, fileType: upload.fileType })
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const payload = tokenPayload ? JSON.parse(tokenPayload) as { userId?: string; ticketId?: string; fileName?: string; fileSize?: number; fileType?: string } : {};
        const uploadedById = payload.userId;
        const resolvedTicketId = payload.ticketId;
        if (!resolvedTicketId || !uploadedById) throw new Error("Upload sem chamado associado.");
        const ticket = await prisma.ticket.findUnique({ where: { id: resolvedTicketId }, select: { requesterId: true, assigneeId: true } });
        if (!ticket || (ticket.requesterId !== uploadedById && ticket.assigneeId !== uploadedById)) throw new Error("Sem permissão para este chamado.");
        await prisma.attachment.create({
          data: {
            ticketId: resolvedTicketId,
            uploadedById,
            name: payload.fileName ?? "arquivo",
            url: blob.url,
            size: payload.fileSize ?? 0,
            mimeType: payload.fileType ?? blob.contentType ?? "application/octet-stream"
          }
        });
      }
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Falha no upload." }, { status: 400 });
  }
}
