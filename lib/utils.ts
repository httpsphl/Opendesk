import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(date));
}

export function formatFullDate(date: Date | string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(date));
}

export const statusLabels = {
  OPEN: "Aberto",
  IN_PROGRESS: "Em atendimento",
  WAITING_FOR_USER: "Aguardando você",
  RESOLVED: "Resolvido",
  CLOSED: "Encerrado"
} as const;

export const priorityLabels = { LOW: "Baixa", MEDIUM: "Média", HIGH: "Alta", URGENT: "Urgente" } as const;
