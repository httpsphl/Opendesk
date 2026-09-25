"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button, Field, Input } from "@/components/ui";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setPending(true);
    const data = new FormData(event.currentTarget);
    const result = await signIn("credentials", { email: data.get("email"), password: data.get("password"), redirect: false });
    if (result?.error) setError("E-mail ou senha incorretos."); else router.push("/dashboard");
    setPending(false);
  }
  return <form onSubmit={submit} className="mt-8 grid gap-5"><Field label="E-mail"><Input name="email" type="email" autoComplete="email" required /></Field><Field label="Senha"><Input name="password" type="password" autoComplete="current-password" required /></Field>{error && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">{error}</p>}<Button type="submit" disabled={pending}>{pending ? "Entrando..." : "Entrar no portal"}</Button></form>;
}
