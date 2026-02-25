import { useState } from "react"
import { EventLogger } from "../services/eventLog"

type Props = {
  modulo: string
}

export function LogPanel({ modulo }: Props) {
  const [expandido, setExpandido] = useState(false)

  const registros = EventLogger.getLogsByModule(modulo)

  const formatarData = (data: Date): string => {
    const d = new Date(data)
    const dia = String(d.getDate()).padStart(2, "0")
    const mes = String(d.getMonth() + 1).padStart(2, "0")
    const ano = d.getFullYear()
    const horas = String(d.getHours()).padStart(2, "0")
    const minutos = String(d.getMinutes()).padStart(2, "0")
    const segundos = String(d.getSeconds()).padStart(2, "0")
    return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`
  }

  const listaOrdenada = [...registros].sort(
    (a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
      <button
        onClick={() => setExpandido(!expandido)}
        className="w-full flex justify-between items-center hover:bg-gray-50 transition p-2 -m-2"
      >
        <h2 className="text-lg font-semibold">
          Histórico ({registros.length})
        </h2>
        <span className={`transform transition ${expandido ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {expandido && (
        <div className="mt-4 border-t pt-4">
          {listaOrdenada.length === 0 ? (
            <p className="text-gray-600 text-center py-4">
              Nenhum registro ainda
            </p>
          ) : (
            <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
              {listaOrdenada.map(item => (
                <div
                  key={item.id}
                  className="bg-gray-50 p-3 rounded border-l-4 border-blue-400 text-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-800">
                      {item.action.replace(/_/g, " ")}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatarData(item.timestamp)}
                    </span>
                  </div>
                  <pre className="bg-white p-2 rounded text-xs overflow-auto max-h-20 border">
                    {JSON.stringify(item.details, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
