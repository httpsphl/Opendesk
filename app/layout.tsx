import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "OpenDesk | Suporte que acompanha você",
  description: "Portal de atendimento e chamados da OpenDesk."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
