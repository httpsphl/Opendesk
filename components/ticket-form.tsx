"use client";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createTicketAction } from "@/app/actions";
import { Button, Field, Input, Textarea } from "@/components/ui";

export function TicketForm() {
  const [open, setOpen] = useState(false);
  const [state, action] = useFormState(createTicketAction, {});
  useEffect(() => { if (state.success) setOpen(false); }, [state.success]);
  if (!open) return <Button type="button" onClick={() => setOpen(true)}>Novo chamado</Button>;
  return <div className="fixed inset-0 z-20 grid place-items-center bg-ink/30 p-4"><div className="w-full max-w-lg rounded-2xl border border-[var(--line)] bg-white p-6 shadow-soft"><div className="flex items-start justify-between"><div><h2 className="text-xl font-semibold">Abrir chamado</h2><p className="mt-1 text-sm text-[var(--muted)]">Descreva o que você precisa resolver.</p></div><button className="focus-ring rounded-lg px-2 text-xl text-[var(--muted)]" onClick={() => setOpen(false)} aria-label="Fechar">×</button></div><form action={action} className="mt-6 grid gap-4"><Field label="Assunto"><Input name="subject" placeholder="Ex.: Erro ao acessar o sistema" required /></Field><Field label="Categoria"><select name="category" defaultValue="Geral" className="focus-ring h-11 rounded-xl border border-[var(--line)] bg-white px-3 text-sm"><option>Geral</option><option>Acesso</option><option>Financeiro</option><option>Produto</option><option>Integração</option></select></Field><Field label="Prioridade"><select name="priority" defaultValue="MEDIUM" className="focus-ring h-11 rounded-xl border border-[var(--line)] bg-white px-3 text-sm"><option value="LOW">Baixa</option><option value="MEDIUM">Média</option><option value="HIGH">Alta</option><option value="URGENT">Urgente</option></select></Field><Field label="Descrição"><Textarea name="description" placeholder="Inclua detalhes que ajudam nosso time a entender o contexto." required /></Field>{state.error && <p className="text-sm text-rose-700" role="alert">{state.error}</p>}{state.success && <p className="text-sm text-teal-dark">{state.success}</p>}<div className="flex justify-end gap-2 pt-2"><Button variant="ghost" type="button" onClick={() => setOpen(false)}>Cancelar</Button><TicketSubmit /></div></form></div></div>;
}

function TicketSubmit() {
  const { pending } = useFormStatus();
  return <Button type="submit" disabled={pending}>{pending ? "Enviando..." : "Criar chamado"}</Button>;
}
