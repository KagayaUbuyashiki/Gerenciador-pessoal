import { Link } from "react-router-dom"

export function Home() {
  return (
    <div className="container-page items-center">

      <h1 className="titulo-pagina">
        Portal Utilitário
      </h1>

      <div className="grid-cards">

        <Link to="/tasks">
          <div className="card-home">
            <h2 className="text-lg font-semibold mb-2">Gerenciador de tarefas</h2>
            <p className="text-gray-600 text-sm">
              Gerencie suas tarefas do dia a dia
            </p>
          </div>
        </Link>

        <Link to="/contacts">
          <div className="card-home">
            <h2 className="text-lg font-semibold mb-2">ConnectHub</h2>
            <p className="text-gray-600 text-sm">
              Cadastre e organize seus contatos
            </p>
          </div>
        </Link>

        <Link to="/finance">
          <div className="card-home">
            <h2 className="text-lg font-semibold mb-2">Controle financeiro</h2>
            <p className="text-gray-600 text-sm">
              Controle simples de gastos
            </p>
          </div>
        </Link>

      </div>

    </div>
  )
}