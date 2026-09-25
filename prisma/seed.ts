import { PrismaClient, Role, TicketPriority, TicketStatus, MessageAuthorType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const seedPassword = process.env.SEED_DEMO_PASSWORD;
  if (!seedPassword || seedPassword.length < 12) {
    throw new Error("Defina SEED_DEMO_PASSWORD com pelo menos 12 caracteres antes de executar o seed.");
  }
  const passwordHash = await bcrypt.hash(seedPassword, 12);
  const agent = await prisma.user.upsert({
    where: { email: "ana@opendesk.local" },
    update: {},
    create: { name: "Ana Martins", email: "ana@opendesk.local", passwordHash, role: Role.AGENT }
  });
  if (!process.env.DEFAULT_AGENT_EMAIL) {
    console.warn("DEFAULT_AGENT_EMAIL não definido. Use ana@opendesk.local em desenvolvimento.");
  }
  const user = await prisma.user.upsert({
    where: { email: "cliente@opendesk.local" },
    update: {},
    create: { name: "Rafael Costa", email: "cliente@opendesk.local", passwordHash, role: Role.USER }
  });
  const count = await prisma.ticket.count({ where: { requesterId: user.id } });
  if (!count) {
    const ticket = await prisma.ticket.create({
      data: {
        subject: "Não consigo acessar meu painel",
        description: "A tela fica carregando depois que digito minha senha. Já tentei em dois navegadores.",
        category: "Acesso",
        priority: TicketPriority.HIGH,
        status: TicketStatus.IN_PROGRESS,
        requesterId: user.id,
        assigneeId: agent.id,
        messages: {
          create: [
            { body: "A tela fica carregando depois que digito minha senha. Já tentei em dois navegadores.", authorType: MessageAuthorType.USER, authorId: user.id },
            { body: "Oi, Rafael. Vou investigar o fluxo de login e retorno por aqui.", authorType: MessageAuthorType.AGENT, authorId: agent.id }
          ]
        }
      }
    });
    console.log(`Seeded ticket #${ticket.number}`);
  }
}

main().finally(() => prisma.$disconnect());
