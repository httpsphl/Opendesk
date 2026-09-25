"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { messageSchema, registerSchema, ticketSchema } from "@/lib/validations";
import { Role, TicketStatus, MessageAuthorType } from "@prisma/client";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export type ActionState = { error?: string; success?: string };

export async function registerAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Confira os dados." };
  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
  if (existing) return { error: "Já existe uma conta com este e-mail." };
  await prisma.user.create({
    data: { name: parsed.data.name, email: parsed.data.email.toLowerCase(), passwordHash: await bcrypt.hash(parsed.data.password, 12), role: Role.USER }
  });
  return { success: "Conta criada. Você já pode entrar." };
}

export async function createTicketAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Faça login para abrir um chamado." };
  const parsed = ticketSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Confira os dados." };
  const defaultAgent = await prisma.user.findFirst({
    where: {
      email: (process.env.DEFAULT_AGENT_EMAIL ?? "").toLowerCase().trim(),
      role: { in: [Role.AGENT, Role.ADMIN] }
    },
    select: { id: true }
  });
  if (!defaultAgent) return { error: "O responsável padrão ainda não foi configurado." };
  const ticket = await prisma.ticket.create({ data: { ...parsed.data, requesterId: session.user.id, assigneeId: defaultAgent.id } });
  revalidatePath("/dashboard");
  return { success: `Chamado #${ticket.number} criado com sucesso.` };
}

export async function addMessageAction(ticketId: string, _: ActionState, formData: FormData): Promise<ActionState> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Faça login para continuar." };
  const ticket = await prisma.ticket.findUnique({ where: { id: ticketId }, select: { requesterId: true, status: true } });
  if (!ticket || (ticket.requesterId !== session.user.id && session.user.role === "USER")) return { error: "Chamado não encontrado." };
  const parsed = messageSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Escreva uma mensagem." };
  const authorType = session.user.role === "USER" ? MessageAuthorType.USER : MessageAuthorType.AGENT;
  await prisma.message.create({ data: { ticketId, body: parsed.data.body, authorId: session.user.id, authorType } });
  if (authorType === MessageAuthorType.USER && ticket.status === TicketStatus.WAITING_FOR_USER) {
    await prisma.ticket.update({ where: { id: ticketId }, data: { status: TicketStatus.IN_PROGRESS } });
  }
  revalidatePath(`/dashboard/chamados/${ticketId}`);
  return { success: "Mensagem enviada." };
}

export async function updateTicketStatus(ticketId: string, status: TicketStatus) {
  const session = await auth();
  if (!session?.user?.id || session.user.role === "USER") return { error: "Sem permissão." };
  await prisma.ticket.update({
    where: { id: ticketId },
    data: { status, closedAt: status === TicketStatus.CLOSED || status === TicketStatus.RESOLVED ? new Date() : null }
  });
  revalidatePath(`/dashboard/chamados/${ticketId}`);
  revalidatePath("/dashboard");
  return { success: "Status atualizado." };
}
