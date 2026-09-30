"use client";
import { useState } from "react";
import { upload } from "@vercel/blob/client";
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
    try {
      const pathname = `tickets/${ticketId}/${crypto.randomUUID()}`;
      const uploadPromise = upload(pathname, file, {
        access: "public",
        contentType: file.type,
        handleUploadUrl: "/api/blob/upload-token",
        clientPayload: JSON.stringify({
          ticketId,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        })
      });
      await Promise.race([
        uploadPromise,
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), 45_000))
      ]);
      setMessage("Arquivo enviado.");
      router.refresh();
    } catch (error) {
      if (error instanceof Error && error.message === "timeout") {
        setMessage("O upload demorou demais. Confira o Blob Storage e tente novamente.");
      } else {
        console.error("Blob upload failed", error instanceof Error ? error.message : "unknown error");
        setMessage(error instanceof Error && error.message.includes("Vercel Blob:")
          ? `Falha no Blob: ${error.message}`
          : "Não foi possível enviar. Confira os logs do Blob Storage e tente novamente.");
      }
    }
    finally { setPending(false); }
  }
  return <div className="mt-3"><label className="focus-ring flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-[var(--line)] px-3 py-3 text-sm text-[var(--muted)] hover:border-brand"><span>{pending ? "Enviando..." : "Adicionar arquivo"}</span><input type="file" className="sr-only" onChange={onChange} disabled={pending} /></label>{message && <p className="mt-2 text-xs text-[var(--muted)]">{message}</p>}</div>;
}
