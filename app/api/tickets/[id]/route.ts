import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const ticket = await prisma.ticket.findUnique({ where: { id: params.id }, include: { requester: { select: { name: true, email: true } }, assignee: { select: { name: true } }, messages: { include: { author: { select: { name: true } } }, orderBy: { createdAt: "asc" } }, attachments: true } });
  if (!ticket || (session.user.role === "USER" && ticket.requesterId !== session.user.id)) return NextResponse.json({ error: "Chamado não encontrado" }, { status: 404 });
  return NextResponse.json(ticket);
}
