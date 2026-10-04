import { useState, useEffect } from "react";
import "./DashBoardStyle.css";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();
  const [grupos, setGrupos] = useState([]);
  const [aba, setAba] = useState("ativos"); 
  const [propostaAberta, setPropostaAberta] = useState(null);

  useEffect(() => {
    carregarProjetos();
  }, []);

  async function carregarProjetos() {
    try {
      const res = await fetch("http://localhost:3000/api/projetos");
      const data = await res.json();
      if (data.sucesso) setGrupos(data.dados);
    } catch (err) {
      console.error(err);
    }
  }

  async function processarDecisao(id, decisao) {
    try {
      const res = await fetch(`http://localhost:3000/api/projetos/${id}/decisao`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decisao })
      });
      const data = await res.json();
      if (data.sucesso) {
        alert(decisao === "aprovar" ? "Grupo aprovado com sucesso!" : "Proposta recusada.");
        setPropostaAberta(null);
        carregarProjetos();
      }
    } catch (err) {
      console.error(err);
    }
  }

  const ativos = grupos.filter(g => g.status === "aprovado");
  const pendentes = grupos.filter(g => g.status === "pendente");

  return (
    <main className="admin-page">
      <div className="admin-box">
        <div className="admin-header">
          <div>
            <h1>Painel Administrativo</h1>
            <p className="admin-subtitulo">Gerenciamento interno da Comuna Esportes</p>
          </div>
         <button type="button" onClick={logout} className="btn-logout">Sair</button>
        </div>

        <div className="stats-grid">
          <button 
            type="button" 
            className={`stat-card ${aba === "ativos" ? "aba-ativa" : ""}`}
            onClick={() => setAba("ativos")}
          >
            <span className="stat-titulo">Total de Grupos</span>
            <span className="stat-numero">{ativos.length} Ativos</span>
          </button>

          <button 
            type="button" 
            className={`stat-card ${aba === "solicitacoes" ? "aba-ativa" : ""}`}
            onClick={() => setAba("solicitacoes")}
          >
            <span className="stat-titulo">Solicitações</span>
            <span className="stat-numero roxo">{pendentes.length} Pendentes</span>
          </button>
        </div>

        {aba === "ativos" ? (
          <section>
            <h2 className="secao-titulo">Grupos Ativos no Site</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Nome do Grupo</th>
                    <th>Modalidade</th>
                    <th>Horário</th>
                  </tr>
                </thead>
                <tbody>
                  {ativos.length === 0 ? (
                    <tr><td colSpan={3} className="tabela-vazia">Nenhum grupo ativo.</td></tr>
                  ) : (
                    ativos.map(g => (
                      <tr key={g.id_proj}>
                        <td><strong>{g.local}</strong></td>
                        <td><span className="badge badge-futebol">{g.modalidade?.nome}</span></td>
                        <td>{g.hora_fun}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section>
            <h2 className="secao-titulo">Solicitações de Novos Grupos</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Sugestão de Grupo</th>
                    <th>Modalidade</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {pendentes.length === 0 ? (
                    <tr><td colSpan={3} className="tabela-vazia">Nenhuma solicitação pendente.</td></tr>
                  ) : (
                    pendentes.map(p => (
                      <tr key={p.id_proj}>
                        <td><strong>{p.local}</strong></td>
                        <td><span className="badge badge-volei">{p.modalidade?.nome}</span></td>
                        <td>
                          <button type="button" className="btn-action-text btn-analisar-text" onClick={() => setPropostaAberta(p)}>
                            Analisar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      {propostaAberta && (
        <div className="modal-overlay active">
          <div className="modal-box-premium">
            {/* 🔥 BOTÃO X DE FECHAR TOTALMENTE REPOSICIONADO */}
            <button 
              type="button" 
              className="modal-fechar-x" 
              onClick={() => setPropostaAberta(null)}
            >
              &times;
            </button>

            <h2>Analisar Proposta</h2>
            
            {/* 🔥 CORREÇÃO DA CAIXA BRANCA: Substituído por divs de texto estilizado */}
            <div className="form-group-static-preview">
              <label>Nome do Local / Grupo</label>
              <div className="static-text-box">{propostaAberta.local}</div>
            </div>
            
            <div className="form-group-static-preview">
              <label>Descrição da Proposta</label>
              <div className="static-text-box description-box">{propostaAberta.descricao}</div>
            </div>
            
            <div className="modal-buttons">
              <button type="button" className="btn-cancel" onClick={() => processarDecisao(propostaAberta.id_proj, "recusar")}>Recusar</button>
              <button type="button" className="btn-modal-primary" onClick={() => processarDecisao(propostaAberta.id_proj, "aprovar")}>Aceitar</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
