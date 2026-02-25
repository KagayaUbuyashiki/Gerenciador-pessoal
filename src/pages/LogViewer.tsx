import { useState } from "react"
import { EventLogger, type LogEvent } from "../services/eventLog"

export function LogViewer() {
  const [historico, setHistorico] = useState<LogEvent[]>(() => {
    return EventLogger.getLogs()
  })
  const [filtro, setFiltro] = useState<string>("")

  const atualizarDados = () => {
    const dados = EventLogger.getLogs()
    setHistorico(dados)
  }

  const limparHistorico = () => {
    if (window.confirm("Deseja realmente limpar todo o histórico de logs?")) {
      EventLogger.clearLogs()
      setHistorico([])
    }
  }

  const exportarDados = () => {
    const conteudo = EventLogger.exportLogs()
    const elemento = document.createElement("a")
    elemento.setAttribute(
      "href",
      `data:text/plain;charset=utf-8,${encodeURIComponent(conteudo)}`
    )
    elemento.setAttribute("download", `logs_${new Date().getTime()}.json`)
    elemento.style.display = "none"
    document.body.appendChild(elemento)
    elemento.click()
    document.body.removeChild(elemento)
  }

  const listadia = historico
    .filter(item =>
      filtro === ""
        ? true
        : item.module.toLowerCase().includes(filtro.toLowerCase())
    )
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )

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

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 flex justify-center">
      <div className="w-full max-w-4xl p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Histórico de Atividades</h1>

        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Filtrar por módulo..."
              value={filtro}
              onChange={e => setFiltro(e.target.value)}
              className="flex-1 border p-2 rounded"
            />
            <button
              onClick={atualizarDados}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
              Atualizar
            </button>
            <button
              onClick={exportarDados}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
            >
              Exportar
            </button>
            <button
              onClick={limparHistorico}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
            >
              Limpar
            </button>
          </div>
          <p className="text-gray-600">
            Total de registros: <span className="font-semibold">{historico.length}</span>
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {listadia.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow text-center text-gray-600">
              Nenhum registro encontrado
            </div>
          ) : (
            listadia.map(item => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Módulo</p>
                    <p className="font-semibold text-gray-800">{item.module}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Ação</p>
                    <p className="font-semibold text-gray-800">
                      {item.action.replace(/_/g, " ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Data/Hora</p>
                    <p className="font-semibold text-gray-800">
                      {formatarData(item.timestamp)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">ID</p>
                    <p className="font-mono text-xs text-gray-600">{item.id.substring(0, 12)}...</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-gray-500 uppercase mb-2">Detalhes</p>
                  <pre className="bg-gray-50 p-2 rounded text-xs overflow-auto max-h-24">
                    {JSON.stringify(item.details, null, 2)}
                  </pre>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
