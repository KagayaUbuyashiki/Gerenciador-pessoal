import { Link } from "react-router-dom"

export function Navbar() {
  return (
    <nav className="nav-barra">
      <div className="nav-container">

        <h1 className="nav-titulo">Gerenciador Pessoal</h1>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/tasks" className="nav-link">
            Gerenciador de tarefas
          </Link>

          <Link to="/contacts" className="nav-link">
            ConnectHub
          </Link>

          <Link to="/finance" className="nav-link">
            Controle financeiro
          </Link>
        </div>

      </div>
    </nav>
  )
}