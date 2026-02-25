import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { financeSchema } from "../schemas/financeSchema"
import type { FinanceFormData } from "../schemas/financeSchema"
import { EventLogger } from "../services/eventLog"

type Transaction = {
  descricao: string
  valor: number
  tipo: "entrada" | "saida"
  timestamp: string
}

export function MoneyFlow() {

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const stored = localStorage.getItem("transactions")
    return stored ? JSON.parse(stored) : []
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FinanceFormData>({
    resolver: zodResolver(financeSchema)
  })

  function formatarData(data: string): string {
    const d = new Date(data)
    const horas = String(d.getHours()).padStart(2, "0")
    const minutos = String(d.getMinutes()).padStart(2, "0")
    return `${horas}:${minutos}`
  }

  function onSubmit(data: FinanceFormData) {

    const valorFinal =
      data.tipo === "saida"
        ? -Math.abs(data.valor)
        : Math.abs(data.valor)

    const novaTransacao: Transaction = {
      descricao: data.descricao,
      valor: valorFinal,
      tipo: data.tipo,
      timestamp: new Date().toISOString()
    }

    const novaLista = [...transactions, novaTransacao]

    setTransactions(novaLista)

    localStorage.setItem("transactions", JSON.stringify(novaLista))

    EventLogger.log("MoneyFlow", "transacao_registrada", {
      descricao: data.descricao,
      valor: valorFinal,
      tipo: data.tipo,
      saldoAtual: novaLista.reduce((acc, t) => acc + t.valor, 0)
    })

    reset()
  }

  const saldo = transactions.reduce((acc, t) => acc + t.valor, 0)

  return (
    <div className="page-container page-finance">

      <div className="page-header">
        <h1 className="page-titulo">Controle financeiro</h1>
        <p className="page-subtitulo">Controle suas finanças com simplicidade e clareza</p>
      </div>

      <div className="page-content">

        <div className="saldo-card">
          <h2 className="text-sm font-semibold mb-2 text-gray-700">
            Saldo Total
          </h2>

          <p
            className={
              saldo >= 0
                ? "saldo-positivo"
                : "saldo-negativo"
            }
          >
            R$ {saldo.toFixed(2)}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-principal"
        >

          <input
            {...register("descricao")}
            placeholder="Descrição"
            className="input-campo"
          />

          {errors.descricao && (
            <p className="erro-texto">
              {errors.descricao.message}
            </p>
          )}

          <input
            type="number"
            step="0.01"
            {...register("valor", { valueAsNumber: true })}
            placeholder="Valor"
            className="input-campo"
          />

          {errors.valor && (
            <p className="erro-texto">
              {errors.valor.message}
            </p>
          )}

          <select
            {...register("tipo")}
            className="input-campo"
          >
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>

          {errors.tipo && (
            <p className="erro-texto">
              {errors.tipo.message}
            </p>
          )}

          <button
            type="submit"
            className="botao-primario"
          >
            Adicionar transação
          </button>

        </form>

        <div className="lista-itens">

          {transactions.length === 0 ? (
            <p className="empty-state">
              Nenhuma transação registrada ainda. Comece adicionando uma transação acima!
            </p>
          ) : (
            transactions.map((t, index) => (

              <div
                key={index}
                className="item-registro"
              >

                <span className="font-medium flex-1 min-w-0 break-words">
                  {t.descricao}
                </span>

                <div className="flex items-center gap-3 flex-wrap justify-end">
                  <span
                    className={
                      t.valor >= 0
                        ? "text-green-600 font-semibold text-right"
                        : "text-red-600 font-semibold text-right"
                    }
                  >
                    R$ {t.valor.toFixed(2)}
                  </span>

                  <span className="hora-registro">
                    {formatarData(t.timestamp)}
                  </span>
                </div>

              </div>

            ))
          )}

        </div>

      </div>

    </div>
  )
}