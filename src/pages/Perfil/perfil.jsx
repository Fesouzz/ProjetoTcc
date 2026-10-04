import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./PerfilStyle.css";

export default function Perfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const ehAdmin = user?.tipo_acesso === "admin";
  
  // 🔥 CORRIGIDO: Se for admin, começa na aba "dados". Se for comum, começa em "projetos"
  const [subAba, setSubAba] = useState(ehAdmin ? "dados" : "projetos");
  const [meusProjetos, setMeusProjetos] = useState([]);

  useEffect(() => {
    if (user) {
      fetch("http://localhost:3000/api/projetos")
        .then((res) => res.json())
        .then((data) => {
          if (data.sucesso) {
            const filtrados = data.dados.filter((p) => p.id === user.id);
            setMeusProjetos(filtrados);
          }
        })
        .catch((err) => console.error("Erro ao buscar projetos:", err));
    }
  }, [user]);

  if (!user) return <p className="sem-resultados-global">Carregando perfil...</p>;

  return (
    <main className="perfil-page-container">
      <div className="perfil-box-content">
        
        {/* HEADER DO PERFIL */}
        <section className="perfil-info-header">
          <div className="perfil-avatar-circle-large">
            {user.nome ? user.nome.charAt(0).toUpperCase() : "U"}
          </div>
          <h1 className="perfil-display-name">{user.nome}</h1>
          
          {ehAdmin ? (
            <p className="perfil-admin-badge">⚡ ADMINISTRADOR MASTER</p>
          ) : (
            <p className="perfil-user-badge">🏅 MEMBRO COMUNIDADE</p>
          )}

          <p className="perfil-display-bio">
            {ehAdmin 
              ? "Responsável pela moderação de quadras, triagem de propostas esportivas e gerenciamento de segurança do ecossistema Comuna Esportes."
              : "Membro ativo do Comuna Esportes. Colando junto em prol do esporte, inclusão social e bem-estar nas quadras da Zona Leste. 🏀⚽"
            }
          </p>
        </section>

        {/* =========================================================================
           🔥 ABAS CORRIGIDAS: ADMIN VÊ DADOS E CONFIGS. COMUM VÊ PROPOSTAS E DADOS.
           ========================================================================= */}
        <div className="perfil-internal-tabs">
          {ehAdmin ? (
            <>
              {/* O que aparece para o ADMINISTRADOR de início */}
              <button 
                type="button" 
                className={`internal-tab-link ${subAba === "dados" ? "active" : ""}`}
                onClick={() => setSubAba("dados")}
              >
                👤 Meus Dados
              </button>
              <button 
                type="button" 
                className={`internal-tab-link ${subAba === "config" ? "active" : ""}`}
                onClick={() => setSubAba("config")}
              >
                ⚙️ Configurações da Conta
              </button>
            </>
          ) : (
            <>
              {/* O que aparece para o USUÁRIO COMUM de início */}
              <button 
                type="button" 
                className={`internal-tab-link ${subAba === "projetos" ? "active" : ""}`}
                onClick={() => setSubAba("projetos")}
              >
                📋 Minhas Propostas
              </button>
              <button 
                type="button" 
                className={`internal-tab-link ${subAba === "dados" ? "active" : ""}`}
                onClick={() => setSubAba("dados")}
              >
                👤 Meus Dados
              </button>
            </>
          )}
        </div>

        {/* =========================================================================
           EXIBIÇÃO DOS CONTEÚDOS DE ACORDO COM A ABA SELECIONADA
           ========================================================================= */}
        
        {/* ABA: MEUS DADOS */}
        {subAba === "dados" && (
          <section className="perfil-section-block">
            <div className="perfil-data-grid">
              <div className="data-field-card">
                <label>Nome Completo</label>
                <p>{user.nome}</p>
              </div>
              <div className="data-field-card">
                <label>E-mail de Cadastro</label>
                <p>{user.email}</p>
              </div>
              <div className="data-field-card">
                <label>Tipo de Conta</label>
                <p style={{ color: ehAdmin ? "#8a4eff" : "#22c55e", fontWeight: "800" }}>
                  {ehAdmin ? "ADMINISTRADOR" : "USUÁRIO COMUM"}
                </p>
              </div>
              <div className="data-field-card">
                <label>Cidade / Estado</label>
                <p>{user.endereco || "São Paulo / SP"}</p>
              </div>
            </div>
            
            {/* Se for usuário comum, mostra o logout aqui embaixo dos dados */}
            {!ehAdmin && (
              <button type="button" className="btn-logout-comum" onClick={logout}>
                🚪 Sair da Conta (Logout)
              </button>
            )}
          </section>
        )}

        {/* ABA: MINHAS PROPOSTAS (Apenas Usuário Comum acessa) */}
        {subAba === "projetos" && !ehAdmin && (
          <section className="perfil-section-block">
            {meusProjetos.length === 0 ? (
              <div className="perfil-empty-state">
                <p>Nenhuma proposta de projeto comunitário enviada por este perfil.</p>
              </div>
            ) : (
              <div className="perfil-projects-stack">
                {meusProjetos.map((proj) => (
                  <div key={proj.id_proj} className="perfil-project-row-card">
                    <div className="project-row-icon">🏅</div>
                    <div className="project-row-details">
                      <h3>{proj.local || proj.Local}</h3>
                      <p>
                        Status da Triagem:{" "}
                        <strong className={`status-text-badge status-${proj.status || "pendente"}`}>
                          {(proj.status || "pendente").toUpperCase()}
                        </strong>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ABA: CONFIGURAÇÕES DA CONTA (Apenas Admin acessa) */}
        {subAba === "config" && ehAdmin && (
          <section className="perfil-section-block">
            <div className="perfil-settings-stack">
              
              <div className="settings-item-row" onClick={() => navigate("/DashBoard")}>
                <div className="settings-item-text">
                  <h4>📊 Ir para o Painel Geral</h4>
                  <p>Acesse o gerenciamento de propostas de projetos e triagem pendente.</p>
                </div>
                <span className="settings-arrow">➔</span>
              </div>

              <div className="settings-item-row">
                <div className="settings-item-text">
                  <h4>🔒 Criptografia JWT Ativa</h4>
                  <p>Sessão administrativa criptografada e autenticada com sucesso via pool local.</p>
                </div>
                <span className="settings-arrow">✔️</span>
              </div>

              <hr className="settings-menu-divider" />

              <button type="button" className="btn-menu-logout-danger" onClick={logout}>
                🔑 Encerrar Sessão Master (Logout)
              </button>

            </div>
          </section>
        )}

      </div>
    </main>
  );
}
