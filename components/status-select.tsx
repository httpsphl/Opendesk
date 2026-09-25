"use client";
import { useTransition } from "react";
import { updateTicketStatus } from "@/app/actions";
import { TicketStatus } from "@prisma/client";

export function StatusSelect({ ticketId, current }: { ticketId: string; current: TicketStatus }) {
  const [pending, startTransition] = useTransition();
  return <label className="grid gap-1 text-xs font-semibold text-[var(--muted)]">Status<select disabled={pending} value={current} onChange={event => startTransition(() => { void updateTicketStatus(ticketId, event.target.value as TicketStatus); })} className="focus-ring h-10 rounded-xl border border-[var(--line)] bg-white px-3 text-sm font-medium text-ink"><option value="OPEN">Aberto</option><option value="IN_PROGRESS">Em atendimento</option><option value="WAITING_FOR_USER">Aguardando você</option><option value="RESOLVED">Resolvido</option><option value="CLOSED">Encerrado</option></select></label>;
}
