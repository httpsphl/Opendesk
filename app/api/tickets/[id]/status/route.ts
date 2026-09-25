import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { TicketStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user || session.user.role === "USER") return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
  const body = await request.json() as { status?: TicketStatus };
  if (!body.status || !Object.values(TicketStatus).includes(body.status)) return NextResponse.json({ error: "Status inválido" }, { status: 400 });
  const ticket = await prisma.ticket.update({
    where: { id: params.id },
    data: { status: body.status, closedAt: body.status === TicketStatus.CLOSED || body.status === TicketStatus.RESOLVED ? new Date() : null }
  });
  return NextResponse.json(ticket);
}
