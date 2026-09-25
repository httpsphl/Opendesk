import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Logo, Button } from "@/components/ui";
import { SignOutButton } from "@/components/sign-out-button";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return <div className="min-h-[100dvh] bg-paper"><aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-[var(--line)] bg-white px-5 py-6 lg:flex lg:flex-col"><Logo /><nav className="mt-12 grid gap-1 text-sm"><a className="rounded-xl bg-mist px-3 py-2.5 font-semibold text-ink" href="/dashboard">Visão geral</a><a className="rounded-xl px-3 py-2.5 text-[var(--muted)] hover:bg-mist" href="/dashboard/metricas">Métricas</a></nav><div className="mt-auto border-t border-[var(--line)] pt-5"><p className="truncate text-sm font-semibold">{session.user.name}</p><p className="mt-1 truncate text-xs text-[var(--muted)]">{session.user.email}</p><SignOutButton /></div></aside><div className="lg:pl-64"><header className="flex items-center justify-between border-b border-[var(--line)] bg-white px-5 py-4 lg:hidden"><Logo /><SignOutButton compact /></header>{children}</div></div>;
}
