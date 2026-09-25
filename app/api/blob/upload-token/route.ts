import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

const allowed = ["image/", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument"];

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  try {
    const body = (await request.json()) as HandleUploadBody;
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (pathname.length > 200) throw new Error("Nome de arquivo inválido.");
        return {
          allowedContentTypes: allowed,
          maximumSizeInBytes: 15 * 1024 * 1024,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ userId: session.user.id })
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const ticketId = new URL(blob.url).pathname.split("/").filter(Boolean).at(-2);
        const payload = tokenPayload ? JSON.parse(tokenPayload) as { userId?: string; ticketId?: string } : {};
        const uploadedById = payload.userId ?? session.user.id;
        const resolvedTicketId = payload.ticketId ?? ticketId;
        if (!resolvedTicketId || !uploadedById) throw new Error("Upload sem chamado associado.");
        const ticket = await prisma.ticket.findUnique({ where: { id: resolvedTicketId }, select: { requesterId: true } });
        if (!ticket || (session.user.role === "USER" && ticket.requesterId !== session.user.id)) throw new Error("Sem permissão para este chamado.");
        await prisma.attachment.create({
          data: {
            ticketId: resolvedTicketId,
            uploadedById,
            name: blob.pathname.split("/").pop() ?? "arquivo",
            url: blob.url,
            size: 0,
            mimeType: blob.contentType ?? "application/octet-stream"
          }
        });
      }
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Falha no upload." }, { status: 400 });
  }
}
