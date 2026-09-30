import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Button, Logo } from "@/components/ui";

export default async function HomePage() {
  const session = await auth();
  if (session) redirect("/dashboard");
  return (
    <main className="min-h-[100dvh] overflow-hidden bg-paper bg-brand-mesh">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6"><Logo /><a href="/login" className="focus-ring rounded-lg text-sm font-semibold text-brand transition hover:text-brand-dark">Entrar</a></header>
      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:pt-20">
        <div className="max-w-xl">
          <h1 className="animate-in font-display text-5xl font-semibold leading-[1.04] tracking-[-.04em] text-ink md:text-6xl">Seu suporte,<br /><span className="bg-brand-gradient bg-clip-text text-transparent">no ritmo certo.</span></h1>
          <p className="animate-in stagger-2 mt-6 max-w-lg text-lg leading-8 text-[var(--muted)]">Abra chamados, acompanhe cada resposta e resolva pendências com clareza em um só lugar.</p>
          <div className="animate-in stagger-3 mt-8 flex flex-wrap gap-3"><a href="/cadastro"><Button type="button">Criar minha conta</Button></a><a href="/login"><Button type="button" variant="outline">Acessar portal</Button></a></div>
        </div>
        <div className="animate-in stagger-2 rounded-2xl border border-[var(--line)] bg-white/90 p-5 shadow-glow backdrop-blur">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-4"><div><p className="text-xs font-semibold uppercase tracking-[.15em] text-[var(--muted)]">Visão geral</p><h2 className="mt-1 text-lg font-semibold">Central de atendimento</h2></div><span className="grid size-9 place-items-center rounded-full bg-brand-gradient text-white">↗</span></div>
          <div className="grid gap-3 py-5 sm:grid-cols-3">{[["Abertos", "02"], ["Em atendimento", "01"], ["Resolvidos", "18"]].map(([label, value]) => <div key={label} className="rounded-xl bg-paper p-4"><p className="text-xs text-[var(--muted)]">{label}</p><p className="mt-2 text-2xl font-semibold">{value}</p></div>)}</div>
          <div className="rounded-xl border border-brand/20 bg-brand-soft/40 p-4"><p className="text-sm font-semibold">Tudo em contexto</p><p className="mt-1 text-sm leading-6 text-[var(--muted)]">Histórico, arquivos e próximos passos ficam juntos em cada chamado.</p></div>
        </div>
      </section>
      <footer className="mx-auto max-w-6xl border-t border-[var(--line)] px-5 py-6 text-sm text-[var(--muted)]">OpenDesk para times que cuidam de pessoas.</footer>
    </main>
  );
}
