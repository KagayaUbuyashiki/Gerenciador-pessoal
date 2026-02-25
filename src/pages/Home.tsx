import { Link } from "react-router-dom"

export function Home() {
  return (
    <div className="home-container">

      <div className="home-header">
        <h1 className="home-titulo">Bem-vindo ao Gerenciador Pessoal</h1>
        <p className="home-subtitulo">Organize sua vida com eficiência e simplicidade</p>
      </div>

      <div className="home-grid">

        <Link to="/tasks" className="home-link">
          <div className="home-card">
            <h2 className="home-card-titulo">Tarefas</h2>
            <p className="home-card-descricao">
              Mantenha suas tarefas organizadas, defina prioridades e acompanhe seu progresso.
            </p>
            <div className="home-card-arrow">→</div>
          </div>
        </Link>

        <Link to="/contacts" className="home-link">
          <div className="home-card">
            <h2 className="home-card-titulo">Contatos</h2>
            <p className="home-card-descricao">
              Mantenha seus contatos organizados e sempre à mão quando precisar deles         
            </p>
            <div className="home-card-arrow">→</div>
          </div>
        </Link>

        <Link to="/finance" className="home-link">
          <div className="home-card">
            <h2 className="home-card-titulo">Controle financeiro</h2>
            <p className="home-card-descricao">
              Acompanhe suas transações e mantenha o controle de suas finanças de forma simples e eficiente.
            </p>
            <div className="home-card-arrow">→</div>
          </div>
        </Link>

      </div>

      <div className="home-footer">
        <p>Escolha um módulo acima para começar a gerenciar sua rotina</p>
      </div>

    </div>
  )
}