import { Link } from "react-router-dom";
import "../Futebol/FutebolStyle.css";

export default function Volei() {
  return (
    <div className="esporte-page">
      <section className="hero-esporte">
        <h1 className="hero-title-esporte">Vôlei</h1>
        <p>Encontre os grupos de vôlei de quadra, vôlei de areia e rachas mistos que integram os moradores aos finais de semana.</p>
      </section>

      <div className="page-section-esporte">
        <main>
          <h2 className="section-title-esporte">Coletivos de Vôlei</h2>
          <div className="lista-grupos-esporte">
            <div className="group-card-esporte">
              <div className="group-card-info">
                <div className="group-emoji-esporte">🏐</div>
                <div className="group-info-texto">
                  <h3>Vôlei dos Coroas</h3>
                  <p>Domingos às 08h • Quadra de Areia Central • Misto e Aberto</p>
                </div>
              </div>
              <button type="button" className="btn-join-esporte" onClick={() => alert('Presença confirmada!')}>participar</button>
            </div>
          </div>
        </main>

        <aside className="sidebar-esporte">
          <h2 className="section-title-esporte">Próximos Eventos</h2>
          <div className="match-card-esporte">
            <div className="match-date-esporte">Domingo - 10:00</div>
            <div className="match-teams-esporte">Coroas <span className="vs-text">VS</span> Leste Vôlei</div>
            <div className="match-location-esporte">Espaço de Areia da Comunidade</div>
          </div>
        </aside>
      </div>

      <section className="chamada-inscricao-esporte">
        <div className="inscricao-box-esporte">
          <h3>Desenvolva o esporte local!</h3>
          <p>Tem um racha, treino ou coletivo comunitário de <strong>Vôlei</strong> na sua área? Inscreva a sua proposta no nosso mapa oficial.</p>
          <Link to="/CadastroProjeto" className="btn-primary-esporte">Inscrever Projeto Oficial</Link>
        </div>
      </section>
    </div>
  );
}
