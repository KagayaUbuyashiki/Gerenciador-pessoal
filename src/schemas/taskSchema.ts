import { z } from "zod"

export const taskSchema = z.object({
  titulo: z.string().min(5, "Mínimo 5 caracteres"),
  categoria: z.enum(["Trabalho", "Pessoal", "Urgente"])
})

export type TaskFormData = z.infer<typeof taskSchema>