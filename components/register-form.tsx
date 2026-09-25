"use client";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { registerAction } from "@/app/actions";
import { Button, Field, Input } from "@/components/ui";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const [state, action] = useFormState(registerAction, {});
  useEffect(() => { if (state.success) router.push("/login"); }, [state.success, router]);
  return <form action={action} className="mt-7 grid gap-5"><Field label="Nome completo"><Input name="name" placeholder="Como podemos chamar você?" required /></Field><Field label="E-mail"><Input name="email" type="email" placeholder="voce@empresa.com" required /></Field><Field label="Senha" hint="Use pelo menos 8 caracteres."><Input name="password" type="password" required /></Field><Field label="Confirme sua senha"><Input name="passwordConfirmation" type="password" required /></Field>{state.error && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">{state.error}</p>}<SubmitButton /></form>;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" disabled={pending}>{pending ? "Criando conta..." : "Criar conta"}</Button>;
}
