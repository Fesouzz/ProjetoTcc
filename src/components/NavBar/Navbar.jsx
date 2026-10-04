import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavbarStyle.css";
import logo from "../../assets/logo-comuna-esportes.png";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const ehAdmin = user?.tipo_acesso === "admin";
  const estaNoLogin = pathname === "/Login";
  const estaNoCadastro = pathname === "/Cadastro";

  // Gera as iniciais do nome do usuário
  const partes = user?.nome?.trim().split(" ") || [];
  const iniciais = partes.length > 1
    ? (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase()
    : user?.nome?.substring(0, 2).toUpperCase();

  return (
    <header className="site-header-global">
      <nav className="nav-bar">
        <div className="logo">
          <Link to="/">
            <img className="logo-img" src={logo} alt="Logo Comuna Esportes" />
          </Link>
        </div>

        <div className="main-nav">
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/Local">Locais</Link></li>
            <li><Link to="/Noticia">Notícias</Link></li>
            <li><Link to="/Historia">Quem Somos</Link></li>
          </ul>
        </div>

                {user ? (
          /* CONTAINER DO AVATAR COM REDIRECIONAMENTO E DROPDOWN */
          <div 
            className="avatar-navbar-wrapper"
            onClick={() => setDropdownAberto(!dropdownAberto)}
          >
            <div className="avatar-mini" title={user.nome}>
              {iniciais}
            </div>

            {/* DROPDOWN INTEGRADO NA NAVBAR ESTILO GITHUB */}
            {dropdownAberto && (
              <div className="navbar-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                <div className="navbar-dropdown-user-info">
                  <span className="nav-user-name">{user.nome}</span>
                  <span className="nav-user-email">@{user.email.split("@")}</span>
                </div>
                <hr />
                
                <button type="button" onClick={() => { navigate("/Perfil"); setDropdownAberto(false); }}>
                  <span className="nav-menu-icon">👤</span> Meu Perfil
                </button>

                {ehAdmin && (
                  <button type="button" onClick={() => { navigate("/DashBoard"); setDropdownAberto(false); }}>
                    <span className="nav-menu-icon">📊</span> Painel Admin
                  </button>
                )}
                
                <hr />
                
                <button type="button" className="nav-menu-signout" onClick={() => { logout(); setDropdownAberto(false); }}>
                  <span className="nav-menu-icon">🚪</span> Sair da Conta
                </button>
              </div>
            )}
          </div>
        ) : (
          !(estaNoLogin || estaNoCadastro) && (
            <Link className="btn-cadastro" to="/Login">Entrar</Link>
          )
        )}

      </nav>
    </header>
  );
}
