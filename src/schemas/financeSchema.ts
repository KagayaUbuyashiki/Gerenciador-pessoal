import { z } from "zod"

export const financeSchema = z.object({
  descricao: z.string().min(3, "Mínimo 3 caracteres"),
  valor: z.number().positive("Valor deve ser positivo"),
  tipo: z.enum(["entrada", "saida"])
})

export type FinanceFormData = z.infer<typeof financeSchema>