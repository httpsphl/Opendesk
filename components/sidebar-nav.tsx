"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SquaresFour, ChartLineUp } from "phosphor-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Visão geral", icon: SquaresFour, exact: true, staffOnly: false },
  { href: "/dashboard/metricas", label: "Métricas", icon: ChartLineUp, exact: false, staffOnly: true }
];

export function SidebarNav({ role }: { role: "USER" | "AGENT" | "ADMIN" }) {
  const pathname = usePathname();
  return (
    <nav className="mt-12 grid gap-1 text-sm">
      {items.filter(item => !item.staffOnly || role !== "USER").map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link key={href} href={href} className={cn("focus-ring flex items-center gap-2.5 rounded-xl px-3 py-2.5 font-semibold transition", active ? "bg-brand-soft text-brand-dark" : "text-[var(--muted)] hover:bg-mist hover:text-ink")}>
            <Icon size={18} weight={active ? "fill" : "regular"} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
