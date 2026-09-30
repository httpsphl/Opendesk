import { Logo } from "@/components/ui";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <main className="grid min-h-[100dvh] lg:grid-cols-[.85fr_1.15fr]">
      <div className="grain relative hidden overflow-hidden bg-[radial-gradient(120%_120%_at_0%_0%,#26265c_0%,#12152b_55%,#0b0d1c_100%)] p-10 lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand-gradient opacity-30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 size-64 rounded-full bg-sky-400/20 blur-3xl" />
        <Logo dark />
        <div className="relative max-w-md text-white">
          <p className="text-sm font-semibold uppercase tracking-[.18em] text-sky-300">Portal do cliente</p>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-tight tracking-[-.03em]">Ajuda que chega até o fim.</h1>
          <p className="mt-5 text-base leading-7 text-white/65">Acompanhe seus chamados e mantenha todas as conversas no mesmo lugar.</p>
        </div>
        <p className="relative text-sm text-white/45">© {new Date().getFullYear()} OpenDesk</p>
      </div>
      <div className="flex items-center justify-center bg-paper px-5 py-12">
        <div className="w-full max-w-md animate-in">
          <div className="mb-8 lg:hidden"><Logo /></div>
          <p className="text-sm font-semibold uppercase tracking-[.18em] text-brand">Bem-vindo de volta</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Entre no seu portal</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">Use seu e-mail e senha para continuar.</p>
          <LoginForm />
          <p className="mt-7 text-center text-sm text-[var(--muted)]">Ainda não tem conta? <a href="/cadastro" className="font-semibold text-brand hover:text-brand-dark">Criar cadastro</a></p>
        </div>
      </div>
    </main>
  );
}
