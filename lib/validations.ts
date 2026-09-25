import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Informe seu nome completo."),
  email: z.string().email("Digite um e-mail válido."),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres."),
  passwordConfirmation: z.string().min(1, "Confirme sua senha.")
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "As senhas não conferem.",
  path: ["passwordConfirmation"]
});

export const ticketSchema = z.object({
  subject: z.string().min(5, "O assunto precisa ter pelo menos 5 caracteres.").max(120),
  description: z.string().min(10, "Conte um pouco mais sobre o que aconteceu.").max(5000),
  category: z.string().min(1),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"])
});

export const messageSchema = z.object({ body: z.string().min(1, "Escreva uma mensagem.").max(5000) });
