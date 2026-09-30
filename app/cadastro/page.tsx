import { Logo } from "@/components/ui";
import { RegisterForm } from "@/components/register-form";

export default function RegisterPage() {
  return (
    <main className="min-h-[100dvh] bg-paper bg-brand-mesh">
      <header className="mx-auto max-w-6xl px-5 py-6"><Logo /></header>
      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:pt-20">
        <div className="animate-in max-w-md">
          <p className="text-sm font-semibold uppercase tracking-[.18em] text-brand">Comece agora</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-.03em] md:text-5xl">Um lugar claro para pedir ajuda.</h1>
          <p className="mt-5 text-base leading-7 text-[var(--muted)]">Crie sua conta e acompanhe o suporte do primeiro contato à solução.</p>
          <ul className="mt-8 grid gap-4 text-sm text-[var(--muted)]">
            <li className="flex gap-3"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-soft text-xs font-bold text-brand-dark">✓</span> Histórico completo de conversas</li>
            <li className="flex gap-3"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-soft text-xs font-bold text-brand-dark">✓</span> Atualizações sem perder contexto</li>
            <li className="flex gap-3"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-soft text-xs font-bold text-brand-dark">✓</span> Arquivos protegidos em cada chamado</li>
          </ul>
        </div>
        <div className="animate-in stagger-1 rounded-2xl border border-[var(--line)] bg-white/90 p-6 shadow-glow backdrop-blur md:p-8">
          <h2 className="text-xl font-semibold">Criar sua conta</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Leva menos de um minuto.</p>
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}
