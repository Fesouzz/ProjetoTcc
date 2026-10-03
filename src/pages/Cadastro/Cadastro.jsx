import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo-comuna-esportes.png";
import './CadastroStyle.css';



export default function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [endereco, setEndereco] = useState("");
  const [dt_nasc, setDt_nasc] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (senha.length < 6) {
      setErro("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setErro("");

    // TODO: enviar os dados para a sua API
    // await fetch("/api/cadastro", { method: "POST", body: JSON.stringify({ nome, sobrenome, email, senha }) })
    console.log({ nome, sobrenome, email });

    navigate("/Login");
  }

  return (
    <>

      <div className="main-container">
        <div id="cadastroBox" className="glass-box login-size">
          <div className="div-logo">
            <img className="imagem-logo" src={logo} alt="Comuna Esportes" />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="nome"
                    placeholder="Seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                  <i className="fas fa-user"></i>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="sobrenome">Sobrenome</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="sobrenome"
                    placeholder="Seu sobrenome"
                    value={sobrenome}
                    onChange={(e) => setSobrenome(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            
            <div className="form-group">
              <label htmlFor="endereco">Endereço</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="endereco"
                  placeholder="rua xxxxxxxx"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  required
                />
              </div>
            </div>

               
            <div className="form-group">
              <label htmlFor="dt_nasc">Data de Nascimento</label>
              <div className="input-wrapper">
                <input
                  type="date"
                  id="dt_nasc"
                  placeholder="dd/mm/aaaa"
                  value={dt_nasc}
                  onChange={(e) => setDt_nasc(e.target.value)}
                  required
                />
      
              </div>
            </div>
        



            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="senha"
                  placeholder="Mínimo de 6 caracteres"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
            
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmarSenha">Confirmar senha</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="confirmarSenha"
                  placeholder="Repita a senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  autoComplete="new-password"
                  required
                />
                <i className="fas fa-lock"></i>
              </div>
            </div>

            {erro && (
              <p className="form-erro" role="alert">
                {erro}
              </p>
            )}

            <button type="submit" className="btn-primary">
              Criar conta
            </button>
          </form>

          <p className="link-alternativo">
            Já tem uma conta? <Link to="/Login">Entrar</Link>
          </p>

          <Link to="/" className="voltar">
            <i className="fas fa-arrow-left"></i>Voltar para o Início
          </Link>
        </div>
      </div>


    </>
  );
}