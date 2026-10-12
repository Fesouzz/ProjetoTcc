import { Link } from "react-router-dom";
import "../Futebol/FutebolStyle.css";

export default function Basquete() {
  return (
    <div className="esporte-page">
      <section className="hero-esporte">
        <h1 className="hero-title-esporte">Basquete de Rua</h1>
        <p>Cole nos principais rachas, circuitos 3x3 e quadras icônicas mapeadas nas comunidades locais e fortaleça o streetball!</p>
      </section>

      <div className="page-section-esporte">
        <main>
          <h2 className="section-title-esporte">Grupos e Coletivos</h2>
          <div className="lista-grupos-esporte">
            <div className="group-card-esporte">
              <div className="group-card-info">
                <div className="group-emoji-esporte">🏀</div>
                <div className="group-info-texto">
                  <h3>Crias do Asfalto 3x3</h3>
                  <p>Segundas e Quartas às 19h • Quadra do Parque • Racha Aberto</p>
                </div>
              </div>
              <button type="button" className="btn-join-esporte" onClick={() => alert('Pedido de participação enviado!')}>participar</button>
            </div>
          </div>
        </main>

        <aside className="sidebar-esporte">
          <h2 className="section-title-esporte">Próximos Desafios</h2>
          <div className="match-card-esporte">
            <div className="match-date-esporte">Quinta-Feira - 19:30</div>
            <div className="match-teams-esporte">Os Cria <span class="vs-text">VS</span> Z/L Ballers</div>
            <div className="match-location-esporte">Quadra do Parque</div>
          </div>
        </aside>
      </div>

      <section className="chamada-inscricao-esporte">
        <div className="inscricao-box-esporte">
          <h3>Desenvolva o esporte local!</h3>
          <p>Tem um racha, treino ou coletivo comunitário de <strong>Basquete</strong> na sua área? Inscreva a sua proposta no nosso mapa oficial.</p>
          <Link to="/CadastroProjeto" className="btn-primary-esporte">Inscrever Projeto Oficial</Link>
        </div>
      </section>
    </div>
  );
}
