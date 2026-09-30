"use client";

import { useState } from "react";
import { Eye, EyeSlash } from "phosphor-react";
import { Input } from "@/components/ui";

type PasswordInputProps = Omit<React.ComponentProps<typeof Input>, "type">;

export function PasswordInput(props: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input {...props} type={visible ? "text" : "password"} className="pr-11" />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        className="focus-ring absolute right-1.5 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--muted)] transition hover:bg-mist hover:text-ink"
        aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
        title={visible ? "Ocultar senha" : "Mostrar senha"}
      >
        {visible ? <EyeSlash size={18} weight="regular" aria-hidden="true" /> : <Eye size={18} weight="regular" aria-hidden="true" />}
      </button>
    </div>
  );
}
