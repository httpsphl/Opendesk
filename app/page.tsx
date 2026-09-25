import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Button, Logo } from "@/components/ui";

export default async function HomePage() {
  const session = await auth();
  if (session) redirect("/dashboard");
  return (
    <main className="min-h-[100dvh] bg-paper">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6"><Logo /><a href="/login" className="text-sm font-semibold text-teal hover:text-teal-dark">Entrar</a></header>
      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:pt-20">
        <div className="max-w-xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[.18em] text-teal">Atendimento sem ruído</p>
          <h1 className="text-5xl font-semibold leading-[1.04] tracking-[-.06em] text-ink md:text-6xl">Seu suporte, no ritmo certo.</h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-[var(--muted)]">Abra chamados, acompanhe cada resposta e resolva pendências com clareza em um só lugar.</p>
          <div className="mt-8 flex flex-wrap gap-3"><a href="/cadastro"><Button type="button">Criar minha conta</Button></a><a href="/login"><Button type="button" variant="outline">Acessar portal</Button></a></div>
        </div>
        <div className="rounded-2xl border border-[var(--line)] bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-4"><div><p className="text-xs font-semibold uppercase tracking-[.15em] text-[var(--muted)]">Visão geral</p><h2 className="mt-1 text-lg font-semibold">Central de atendimento</h2></div><span className="grid size-9 place-items-center rounded-full bg-teal-soft text-teal">↗</span></div>
          <div className="grid gap-3 py-5 sm:grid-cols-3">{[["Abertos", "02"], ["Em atendimento", "01"], ["Resolvidos", "18"]].map(([label, value]) => <div key={label} className="rounded-xl bg-paper p-4"><p className="text-xs text-[var(--muted)]">{label}</p><p className="mt-2 text-2xl font-semibold">{value}</p></div>)}</div>
          <div className="rounded-xl border border-teal/20 bg-teal-soft/40 p-4"><p className="text-sm font-semibold">Tudo em contexto</p><p className="mt-1 text-sm leading-6 text-[var(--muted)]">Histórico, arquivos e próximos passos ficam juntos em cada chamado.</p></div>
        </div>
      </section>
      <footer className="mx-auto max-w-6xl border-t border-[var(--line)] px-5 py-6 text-sm text-[var(--muted)]">OpenDesk para times que cuidam de pessoas.</footer>
    </main>
  );
}
