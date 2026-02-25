import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { taskSchema } from "../schemas/taskSchema"
import type { TaskFormData } from "../schemas/taskSchema"
import { EventLogger } from "../services/eventLog"

type TaskWithTimestamp = TaskFormData & { timestamp: string }

export function TaskMaster() {

  const [tasks, setTasks] = useState<TaskWithTimestamp[]>(() => {
    const stored = localStorage.getItem("tasks")
    return stored ? JSON.parse(stored) : []
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema)
  })

  function formatarData(data: string): string {
    const d = new Date(data)
    const horas = String(d.getHours()).padStart(2, "0")
    const minutos = String(d.getMinutes()).padStart(2, "0")
    return `${horas}:${minutos}`
  }

  function onSubmit(data: TaskFormData) {

    const tarefaComTimestamp: TaskWithTimestamp = {
      ...data,
      timestamp: new Date().toISOString()
    }

    const novasTasks = [...tasks, tarefaComTimestamp]

    setTasks(novasTasks)

    localStorage.setItem(
      "tasks",
      JSON.stringify(novasTasks)
    )

    EventLogger.log("TaskMaster", "tarefa_adicionada", {
      titulo: data.titulo,
      categoria: data.categoria,
      totalTarefas: novasTasks.length
    })

    reset()
  }

  function removerTask(index: number) {

    const tarefaRemovida = tasks[index]

    const novasTasks = tasks.filter(
      (_, i) => i !== index
    )

    setTasks(novasTasks)

    localStorage.setItem(
      "tasks",
      JSON.stringify(novasTasks)
    )

    EventLogger.log("TaskMaster", "tarefa_removida", {
      titulo: tarefaRemovida.titulo,
      categoria: tarefaRemovida.categoria,
      totalTarefas: novasTasks.length
    })
  }

  return (
    <div className="container-page">

      <div className="container-content">

        <h1 className="titulo-pagina">
          Gerenciador de tarefas
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-principal"
        >

          <input
            {...register("titulo")}
            placeholder="Título da tarefa"
            className="input-campo"
          />

          {errors.titulo && (
            <p className="erro-texto">
              {errors.titulo.message}
            </p>
          )}

          <select
            {...register("categoria")}
            className="input-campo"
          >
            <option value="">Selecione uma categoria</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Pessoal">Pessoal</option>
            <option value="Urgente">Urgente</option>
          </select>

          {errors.categoria && (
            <p className="erro-texto">
              {errors.categoria.message}
            </p>
          )}

          <button
            type="submit"
            className="botao-primario"
          >
            Adicionar tarefa
          </button>

        </form>

        <div className="lista-itens">

          {tasks.length === 0 ? (
            <p className="text-center text-gray-500 py-4">
              Nenhuma tarefa adicionada ainda
            </p>
          ) : (
            tasks.map((task, index) => (

              <div
                key={index}
                className="item-registro"
              >

                <div className="flex-1 min-w-0">
                  <span className="font-medium block break-words">
                    {task.titulo} - {task.categoria}
                  </span>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="hora-registro">
                    {formatarData(task.timestamp)}
                  </span>

                  <button
                    onClick={() => removerTask(index)}
                    className="botao-remover"
                  >
                    remover
                  </button>
                </div>

              </div>

            ))
          )}

        </div>

      </div>

    </div>
  )
}