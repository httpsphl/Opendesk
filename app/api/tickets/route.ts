import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { ticketSchema } from "@/lib/validations";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const tickets = await prisma.ticket.findMany({
    where: session.user.role === "USER" ? { requesterId: session.user.id } : {},
    include: { requester: { select: { name: true } }, assignee: { select: { name: true } } },
    orderBy: { updatedAt: "desc" }
  });
  return NextResponse.json(tickets);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const parsed = ticketSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const defaultAgent = await prisma.user.findFirst({
    where: {
      email: (process.env.DEFAULT_AGENT_EMAIL ?? "").toLowerCase().trim(),
      role: { in: [Role.AGENT, Role.ADMIN] }
    },
    select: { id: true }
  });
  if (!defaultAgent) return NextResponse.json({ error: "O responsável padrão ainda não foi configurado." }, { status: 503 });
  const ticket = await prisma.ticket.create({ data: { ...parsed.data, requesterId: session.user.id, assigneeId: defaultAgent.id } });
  return NextResponse.json(ticket, { status: 201 });
}
