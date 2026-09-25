import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui";
import { MetricsChart } from "@/components/metrics-chart";

export default async function MetricsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role === "USER") redirect("/dashboard");
  const [total, open, active, resolved, urgent, closedTickets, users] = await Promise.all([
    prisma.ticket.count(), prisma.ticket.count({ where: { status: "OPEN" } }), prisma.ticket.count({ where: { status: "IN_PROGRESS" } }), prisma.ticket.count({ where: { status: { in: ["RESOLVED", "CLOSED"] } } }), prisma.ticket.count({ where: { priority: "URGENT", status: { notIn: ["RESOLVED", "CLOSED"] } } })
    , prisma.ticket.findMany({ where: { closedAt: { not: null } }, select: { createdAt: true, closedAt: true } })
    , prisma.user.findMany({ where: { role: "USER" }, select: { id: true, name: true, _count: { select: { tickets: true } } }, orderBy: { tickets: { _count: "desc" } }, take: 8 })
  ]);
  const ratio = total ? Math.round((resolved / total) * 100) : 0;
  const averageHours = closedTickets.length ? Math.round(closedTickets.reduce((sum, ticket) => sum + (ticket.closedAt!.getTime() - ticket.createdAt.getTime()), 0) / closedTickets.length / 36e5) : 0;
  const chart = await Promise.all(Array.from({ length: 6 }, async (_, index) => {
    const start = new Date(); start.setDate(start.getDate() - (5 - index) * 7 - 6); start.setHours(0, 0, 0, 0);
    const end = new Date(start); end.setDate(end.getDate() + 7);
    const [opened, closed] = await Promise.all([
      prisma.ticket.count({ where: { createdAt: { gte: start, lt: end } } }),
      prisma.ticket.count({ where: { closedAt: { gte: start, lt: end } } })
    ]);
    return { label: `${start.getDate()}/${start.getMonth() + 1}`, abertos: opened, fechados: closed };
  }));
  return <main className="mx-auto max-w-6xl px-5 py-8 lg:px-10 lg:py-12"><p className="text-sm text-[var(--muted)]">Operação</p><h1 className="mt-1 text-3xl font-semibold tracking-tight">Métricas</h1><p className="mt-2 text-sm text-[var(--muted)]">Uma leitura rápida do volume atual de atendimento.</p><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"><Metric label="Total de chamados" value={total} /><Metric label="Abertos" value={open} /><Metric label="Em atendimento" value={active} /><Metric label="Resolvidos" value={resolved} /><Metric label="Média até fechar" value={averageHours} suffix="h" /></div><div className="mt-8 grid gap-4 lg:grid-cols-[1fr_340px]"><section className="rounded-2xl border border-[var(--line)] bg-white p-6"><div className="flex items-center justify-between"><h2 className="font-semibold">Abertos x fechados</h2><span className="text-xs text-[var(--muted)]">Últimas 6 semanas</span></div><div className="mt-5"><MetricsChart data={chart} /></div></section><section className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-semibold">Chamados por usuário</h2><div className="mt-5 grid gap-4">{users.length ? users.map((user) => <div key={user.id} className="flex items-center justify-between gap-4 text-sm"><span className="truncate">{user.name}</span><span className="font-semibold text-teal">{user._count.tickets}</span></div>) : <p className="text-sm text-[var(--muted)]">Ainda não há dados.</p>}</div></section></div><div className="mt-4 rounded-2xl border border-[var(--line)] bg-white p-6"><div className="flex items-center justify-between"><h2 className="font-semibold">Saúde da fila</h2><Badge tone={urgent ? "red" : "teal"}>{urgent ? `${urgent} urgente${urgent > 1 ? "s" : ""}` : "Sem urgências"}</Badge></div><div className="mt-6 grid gap-5 sm:grid-cols-3"><Row label="Chamados resolvidos" value={`${ratio}%`} text="do total" /><Row label="Abertos" value={String(open)} text="aguardando triagem" /><Row label="Em atendimento" value={String(active)} text="com responsável" /></div></div></main>;
}

function Metric({ label, value, suffix }: { label: string; value: number; suffix?: string }) { return <div className="rounded-2xl border border-[var(--line)] bg-white p-5"><p className="text-sm text-[var(--muted)]">{label}</p><p className="mt-3 text-3xl font-semibold">{value}<span className="ml-1 text-base text-[var(--muted)]">{suffix}</span></p></div>; }
function Row({ label, value, text }: { label: string; value: string; text: string }) { return <div className="flex items-end justify-between border-b border-[var(--line)] pb-4 last:border-0 last:pb-0"><div><p className="font-semibold">{label}</p><p className="mt-1 text-xs text-[var(--muted)]">{text}</p></div><p className="text-2xl font-semibold text-teal">{value}</p></div>; }
