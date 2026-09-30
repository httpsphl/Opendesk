import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Logo } from "@/components/ui";
import { SignOutButton } from "@/components/sign-out-button";
import { SidebarNav } from "@/components/sidebar-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return (
    <div className="min-h-[100dvh] bg-paper">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-[var(--line)] bg-white px-5 py-6 lg:flex lg:flex-col">
        <div className="flex items-center justify-between"><Logo /><ThemeToggle /></div>
        <SidebarNav role={session.user.role} />
        <div className="mt-auto border-t border-[var(--line)] pt-5">
          <div className="flex items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-white">{session.user.name?.[0]?.toUpperCase() ?? "U"}</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{session.user.name}</p>
              <p className="truncate text-xs text-[var(--muted)]">{session.user.email}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="text-xs text-[var(--muted)]">{session.user.role === "USER" ? "Cliente" : "Equipe"}</span>
            <SignOutButton />
          </div>
        </div>
      </aside>
      <div className="lg:pl-64">
        <header className="flex items-center justify-between border-b border-[var(--line)] bg-white px-5 py-4 lg:hidden">
          <Logo />
          <div className="flex items-center gap-2"><ThemeToggle /><SignOutButton compact /></div>
        </header>
        {children}
      </div>
    </div>
  );
}
