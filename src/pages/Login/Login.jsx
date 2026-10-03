import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo-comuna-esportes.png";
import { useAuth } from "../../context/AuthContext";

import "./LoginStyle.css"




function Login() {


  
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (!data.sucesso) {
        setErro(data.mensagem);
        return;
      }

      login(data.dados);
      navigate("/");
      // redirecionar ou salvar o usuário no estado global aqui

    } catch (err) {
      console.error(err);
      setErro("Erro ao conectar com o servidor");
    }
  };

  return (
    <>
      



      <div className="main-container">

        <div id="loginBox" className="glass-box login-size">

          <div className="div-logo">
            <img className="imagem-logo" src={logo} alt="" />
          </div>

          <form  onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="usuario">Usuário ou E-mail</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="usuario"
                  placeholder="Seu usuário"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <i className="fas fa-user"></i>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="senha"
                  placeholder="Sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <i className="fas fa-lock"></i>
              </div>
            </div>
            {erro && <p style={{ color: "red" }}>{erro}</p>}
            <button type="submit" className="btn-primary">
              Entrar na Conta
            </button>
          </form>


          <p className="link-alternativo">
            Não tenho conta? <Link to="/Cadastro">Cadastre-se aqui</Link>
          </p>

          <Link to="/" className="voltar">
            <i className="fas fa-arrow-left"></i>Voltar para o Início
          </Link>
        </div>
      </div>




    </>
  );
}

export default Login