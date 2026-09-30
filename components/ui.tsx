import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function Button({ className, variant = "primary", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "outline" }) {
  return <button className={cn("focus-ring inline-flex min-h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold transition active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-50", variant === "primary" && "bg-brand-gradient text-white shadow-soft hover:shadow-glow hover:brightness-[1.06]", variant === "outline" && "border border-[var(--line)] bg-white text-ink hover:border-brand/50", variant === "ghost" && "text-[var(--muted)] hover:bg-mist hover:text-ink", className)} {...props} />;
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("focus-ring h-11 w-full rounded-xl border border-[var(--line)] bg-white px-3 text-sm text-ink outline-none placeholder:text-slate-400 focus:border-brand", className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("focus-ring min-h-28 w-full resize-y rounded-xl border border-[var(--line)] bg-white px-3 py-3 text-sm text-ink outline-none placeholder:text-slate-400 focus:border-brand", className)} {...props} />;
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return <label className="grid gap-2 text-sm font-medium text-ink"><span>{label}</span>{children}{hint && <span className="text-xs font-normal text-[var(--muted)]">{hint}</span>}</label>;
}

export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "brand" | "amber" | "red" }) {
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", tone === "brand" && "bg-brand-soft text-brand-dark", tone === "amber" && "bg-amber-100 text-amber-800", tone === "red" && "bg-rose-100 text-rose-800", tone === "neutral" && "bg-slate-100 text-slate-600")}>{children}</span>;
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return <a href="/" className={cn("focus-ring inline-flex items-center gap-2 font-semibold tracking-tight", dark ? "text-white" : "text-ink")}><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-gradient text-sm font-black text-white">O</span><span>OpenDesk</span></a>;
}
