import { z } from "zod"

export const contactSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z
    .string()
    .regex(/^[0-9]+$/, "Telefone deve conter apenas números")
})

export type ContactFormData = z.infer<typeof contactSchema>