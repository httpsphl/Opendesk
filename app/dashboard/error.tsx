"use client";
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="mx-auto max-w-xl px-5 py-24 text-center"><h1 className="text-2xl font-semibold">Não conseguimos carregar seus chamados</h1><p className="mt-2 text-sm text-[var(--muted)]">Tente novamente em alguns instantes.</p><button onClick={reset} className="mt-6 rounded-xl bg-teal px-4 py-2 text-sm font-semibold text-white">Tentar novamente</button></main>;
}
