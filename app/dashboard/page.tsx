import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { Badge, Button } from "@/components/ui";
import { formatDate, priorityLabels, statusLabels } from "@/lib/utils";
import { TicketForm } from "@/components/ticket-form";

function statusTone(status: string) {
  if (status === "RESOLVED" || status === "CLOSED") return "teal" as const;
  if (status === "WAITING_FOR_USER") return "amber" as const;
  return "neutral" as const;
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) return null;
  const where = session.user.role === "USER" ? { requesterId: session.user.id } : {};
  const tickets = await prisma.ticket.findMany({ where, include: { requester: { select: { name: true } }, assignee: { select: { name: true } } }, orderBy: { updatedAt: "desc" }, take: 20 });
  const [open, active, resolved] = await Promise.all([
    prisma.ticket.count({ where: { ...where, status: "OPEN" } }),
    prisma.ticket.count({ where: { ...where, status: "IN_PROGRESS" } }),
    prisma.ticket.count({ where: { ...where, status: { in: ["RESOLVED", "CLOSED"] } } })
  ]);
  return <main className="mx-auto max-w-6xl px-5 py-8 lg:px-10 lg:py-12"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm text-[var(--muted)]">Olá, {session.user.name?.split(" ")[0]}</p><h1 className="mt-1 text-3xl font-semibold tracking-tight">Seus chamados</h1></div><TicketForm /></div><div className="mt-8 grid gap-3 sm:grid-cols-3"><Metric label="Abertos" value={open} detail="Precisam de atenção" /><Metric label="Em atendimento" value={active} detail="Com nosso time" /><Metric label="Resolvidos" value={resolved} detail="Tudo certo por aqui" /></div><section className="mt-10"><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-semibold">Chamados recentes</h2><span className="text-sm text-[var(--muted)]">{tickets.length} exibidos</span></div>{tickets.length ? <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white">{tickets.map(ticket => <Link href={`/dashboard/chamados/${ticket.id}`} key={ticket.id} className="focus-ring grid gap-3 border-b border-[var(--line)] p-4 transition last:border-0 hover:bg-paper sm:grid-cols-[1fr_auto] sm:items-center"><div><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-semibold text-[var(--muted)]">#{ticket.number}</span><Badge tone={statusTone(ticket.status)}>{statusLabels[ticket.status]}</Badge><span className="text-xs text-[var(--muted)]">{priorityLabels[ticket.priority]}</span></div><h3 className="mt-2 font-semibold">{ticket.subject}</h3><p className="mt-1 line-clamp-1 text-sm text-[var(--muted)]">{ticket.description}</p></div><time className="text-xs text-[var(--muted)]">{formatDate(ticket.updatedAt)}</time></Link>)}</div> : <div className="rounded-2xl border border-dashed border-[var(--line)] bg-white px-6 py-14 text-center"><p className="font-semibold">Nenhum chamado por aqui</p><p className="mt-2 text-sm text-[var(--muted)]">Quando precisar, abra um novo chamado e conte com a gente.</p><TicketForm /></div>}</section></main>;
}

function Metric({ label, value, detail }: { label: string; value: number; detail: string }) {
  return <div className="rounded-2xl border border-[var(--line)] bg-white p-5"><p className="text-sm text-[var(--muted)]">{label}</p><p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p><p className="mt-1 text-xs text-[var(--muted)]">{detail}</p></div>;
}
