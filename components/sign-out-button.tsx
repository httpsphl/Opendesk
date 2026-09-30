"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui";
export function SignOutButton({ compact = false }: { compact?: boolean }) {
  return <Button variant="ghost" className={compact ? "px-2 text-xs" : "px-2 text-xs"} onClick={() => signOut({ callbackUrl: "/login" })}>Sair</Button>;
}
