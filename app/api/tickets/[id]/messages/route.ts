import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { messageSchema } from "@/lib/validations";
import { MessageAuthorType, TicketStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const ticket = await prisma.ticket.findUnique({ where: { id: params.id }, select: { requesterId: true, status: true } });
  if (!ticket || (session.user.role === "USER" && ticket.requesterId !== session.user.id)) return NextResponse.json({ error: "Chamado não encontrado" }, { status: 404 });
  const parsed = messageSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const authorType = session.user.role === "USER" ? MessageAuthorType.USER : MessageAuthorType.AGENT;
  const message = await prisma.message.create({ data: { ticketId: params.id, body: parsed.data.body, authorId: session.user.id, authorType } });
  if (authorType === MessageAuthorType.USER && ticket.status === TicketStatus.WAITING_FOR_USER) await prisma.ticket.update({ where: { id: params.id }, data: { status: TicketStatus.IN_PROGRESS } });
  return NextResponse.json(message, { status: 201 });
}
