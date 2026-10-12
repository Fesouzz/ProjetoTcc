import './AboutStyle.css';

export default function QuemSomos() {
  return (
    <div className="quem-somos-page-container">
      <h1 className="quem-somos-main-title">Nossa História</h1>

      {/* Seção Superior Centralizada em Coluna Única */}
      <div className="sobre-nos-layout-center">
        <div className="sobre-text-block-center">
          <p>
            O <strong>Comuna Esportes</strong> nasceu do desejo de mapear, conectar e fortalecer as iniciativas esportivas autônomas que acontecem diariamente nas comunidades periféricas.
          </p>
          <p>
            Acreditamos que o acesso ao esporte e ao lazer é um direito fundamental capaz de transformar realidades coletivas, gerar saúde preventiva e fomentar manifestações culturais vibrantes.
          </p>
        </div>
      </div>

      {/* GRADE DOS TRÊS PILARES INFERIORES CENTRALIZADOS */}
      <div className="grade-tres-pilares-historia">
        
        {/* PILAR 1 */}
        <div className="card-pilar-historia">
          <h3>Saúde</h3>
          <p>Promover o bem-estar físico e mental através da prática regular de exercícios físicos acessíveis.</p>
        </div>
        
        {/* PILAR 2 */}
        <div className="card-pilar-historia">
          <h3>União</h3>
          <p>Aproximar atletas amadores, organizadores de times e apoiadores locais em uma única rede integrada.</p>
        </div>
        
        {/* PILAR 3 */}
        <div className="card-pilar-historia">
          <h3>Cultura</h3>
          <p>Valorizar a identidade periférica mesclando esporte com música, dança e vivências de rua.</p>
        </div>
        
      </div>
    </div>
  );
}
