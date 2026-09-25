"use client";
import { useState } from "react";
import { upload } from "@vercel/blob/client";
import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";

const allowed = ["image/", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument"];
export function UploadBox({ ticketId }: { ticketId: string }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; if (!file) return;
    if (file.size > 15 * 1024 * 1024 || !allowed.some(type => file.type.startsWith(type))) { setMessage("Use uma imagem, PDF ou arquivo Office de até 15 MB."); return; }
    setPending(true); setMessage("");
    try { await upload(`tickets/${ticketId}/${file.name}`, file, { access: "public", handleUploadUrl: "/api/blob/upload-token" }); setMessage("Arquivo enviado."); router.refresh(); }
    catch { setMessage("Não foi possível enviar o arquivo."); }
    finally { setPending(false); }
  }
  return <div className="mt-3"><label className="focus-ring flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-[var(--line)] px-3 py-3 text-sm text-[var(--muted)] hover:border-teal"><span>{pending ? "Enviando..." : "Adicionar arquivo"}</span><input type="file" className="sr-only" onChange={onChange} disabled={pending} /></label>{message && <p className="mt-2 text-xs text-[var(--muted)]">{message}</p>}</div>;
}
