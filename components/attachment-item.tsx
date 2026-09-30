"use client";
import { useState, useTransition } from "react";
import { X } from "phosphor-react";
import { deleteAttachmentAction } from "@/app/actions";
import { isImageFile, isVideoFile } from "@/lib/utils";

type Attachment = { id: string; name: string; url: string; mimeType: string };

export function AttachmentItem({ attachment, canDelete = false }: { attachment: Attachment; canDelete?: boolean }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [removed, setRemoved] = useState(false);

  function handleDelete() {
    if (!window.confirm(`Remover "${attachment.name}"?`)) return;
    setError("");
    startTransition(async () => {
      const result = await deleteAttachmentAction(attachment.id);
      if (result.error) setError(result.error);
      else setRemoved(true);
    });
  }

  if (removed) return null;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-[var(--line)]">
      {isImageFile(attachment.mimeType) ? (
        <a href={attachment.url} target="_blank" rel="noreferrer" className="block">
          <img src={attachment.url} alt={attachment.name} className="max-h-48 w-full object-cover" />
        </a>
      ) : isVideoFile(attachment.mimeType) ? (
        <video src={attachment.url} controls className="max-h-48 w-full bg-black" />
      ) : (
        <a href={attachment.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 text-xs text-brand underline">
          {attachment.name}
        </a>
      )}
      {(isImageFile(attachment.mimeType) || isVideoFile(attachment.mimeType)) && (
        <p className="truncate border-t border-[var(--line)] bg-white px-3 py-1.5 text-xs text-[var(--muted)]">{attachment.name}</p>
      )}
      {canDelete && (
        <button
          type="button"
          onClick={handleDelete}
          disabled={pending}
          className="focus-ring absolute right-1.5 top-1.5 grid size-6 place-items-center rounded-full bg-ink/60 text-white opacity-0 transition hover:bg-ink group-hover:opacity-100 disabled:opacity-100"
          aria-label={`Remover ${attachment.name}`}
          title="Remover arquivo"
        >
          <X size={14} weight="bold" />
        </button>
      )}
      {error && <p className="px-3 py-1.5 text-xs text-rose-700">{error}</p>}
    </div>
  );
}
