import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { contactSchema } from "../schemas/contactSchema"
import type { ContactFormData } from "../schemas/contactSchema"
import { EventLogger } from "../services/eventLog"

type ContactWithTimestamp = ContactFormData & { timestamp: string }

export function ConnectHub() {

  const [contacts, setContacts] = useState<ContactWithTimestamp[]>(() => {
    const stored = localStorage.getItem("contacts")
    return stored ? JSON.parse(stored) : []
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  function formatarData(data: string): string {
    const d = new Date(data)
    const horas = String(d.getHours()).padStart(2, "0")
    const minutos = String(d.getMinutes()).padStart(2, "0")
    return `${horas}:${minutos}`
  }

  function formatPhoneBR(raw: string): string {
    if (!raw) return ""
    let digits = raw.replace(/\D/g, "")
    digits = digits.replace(/^0+/, "")
    if (digits.startsWith("55")) digits = digits.slice(2)

    const area = digits.slice(0, 2)
    const number = digits.slice(2)
    if (!area) return raw
    if (!number) return `+55 (${area})`

    const last4 = number.slice(-4)
    const firstPart = number.slice(0, number.length - 4)
    const formattedNumber = firstPart ? `${firstPart}-${last4}` : last4

    return `+55 (${area}) ${formattedNumber}`
  }

  function onSubmit(data: ContactFormData) {

    const contatoComTimestamp: ContactWithTimestamp = {
      ...data,
      telefone: formatPhoneBR(data.telefone as string),
      timestamp: new Date().toISOString()
    }

    const novosContatos = [...contacts, contatoComTimestamp]

    setContacts(novosContatos)

    localStorage.setItem(
      "contacts",
      JSON.stringify(novosContatos)
    )

    EventLogger.log("ConnectHub", "contato_adicionado", {
      nome: data.nome,
      email: data.email,
      totalContatos: novosContatos.length
    })

    reset()
  }

  return (
    <div className="page-container page-contacts">

      <div className="page-header">
        <h1 className="page-titulo">ConnectHub</h1>
        <p className="page-subtitulo">Mantenha seus contatos sempre organizados e à mão</p>
      </div>

      <div className="page-content">

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-principal"
        >

          <input
            {...register("nome")}
            placeholder="Nome completo"
            className="input-campo"
          />

          {errors.nome && (
            <p className="erro-texto">
              {errors.nome.message}
            </p>
          )}

          <input
            {...register("email")}
            placeholder="Email"
            className="input-campo"
          />

          {errors.email && (
            <p className="erro-texto">
              {errors.email.message}
            </p>
          )}

          <input
            {...register("telefone")}
            placeholder="Telefone"
            className="input-campo"
          />

          {errors.telefone && (
            <p className="erro-texto">
              {errors.telefone.message}
            </p>
          )}

          <button
            type="submit"
            className="botao-primario"
          >
            Adicionar contato
          </button>

        </form>

        <div className="lista-itens">

          {contacts.length === 0 ? (
            <p className="empty-state">
              Nenhum contato adicionado ainda. Comece adicionando um contato acima!
            </p>
          ) : (
            contacts.map((contact, index) => (

              <div
                key={index}
                className="item-registro"
              >

                <div className="flex-1 min-w-0">
                  <p className="font-semibold break-words">
                    {contact.nome}
                  </p>

                  <p className="text-sm break-all">
                    {contact.email}
                  </p>

                  <p className="text-sm">
                    {contact.telefone}
                  </p>
                </div>

                <span className="hora-registro flex-shrink-0">
                  {formatarData(contact.timestamp)}
                </span>

              </div>

            ))
          )}

        </div>

      </div>

    </div>
  )
}