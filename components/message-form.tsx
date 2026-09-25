"use client";
import { useFormState, useFormStatus } from "react-dom";
import { addMessageAction } from "@/app/actions";
import { Button, Textarea } from "@/components/ui";

export function MessageForm({ ticketId }: { ticketId: string }) {
  const [state, action] = useFormState(addMessageAction.bind(null, ticketId), {});
  return <form action={action} className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-4"><label className="text-sm font-semibold" htmlFor="body">Responder</label><Textarea id="body" name="body" className="mt-3 min-h-24" placeholder="Escreva uma atualização ou dúvida..." required />{state.error && <p className="mt-2 text-sm text-rose-700">{state.error}</p>}<div className="mt-3 flex justify-end"><MessageSubmit /></div></form>;
}

function MessageSubmit() {
  const { pending } = useFormStatus();
  return <Button type="submit" disabled={pending}>{pending ? "Enviando..." : "Enviar mensagem"}</Button>;
}
