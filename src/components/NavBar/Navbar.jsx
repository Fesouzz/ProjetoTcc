import { useState } from "react";
import { Link, useLocation } from "react-router-dom"
import "./NavbarStyle.css"
import logo from "../../assets/logo-comuna-esportes.png";

import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const ehAdmin = user?.tipo_acesso === "admin";
  const estaNoLogin = pathname === "/Login";
  const estaNoCadastro = pathname === "/Cadastro";
  const estaNoForms = pathname === "/cadastroProjeto";

  const partes = user?.nome?.trim().split(" ") || [];
  const iniciais = partes.length > 1
    ? (partes[0][0] + partes[partes.length - 1][0]).toUpperCase()
    : partes[0]?.substring(0, 2).toUpperCase();

  return (
    <header>
      <nav className="nav-bar">
        <div className="logo">
          <Link to="/" >
            <img className="logo-img" src={logo} alt="" />
          </Link>
        </div>

        <div className="main-nav">
          <ul>
            <li className="nav-item">
              <Link to="/" className="nav-link">Início</Link>
            </li>

            <li className="nav-item">
              <Link to="/Local" className="nav-link">Locais</Link>
            </li>

            <li className="nav-item">
              <Link to="/Noticia" className="nav-link">Notícias</Link>
            </li>
            <li className="nav-item">
              <Link to="/Historia" className="nav-link">Quem somos</Link>
            </li>

            {ehAdmin && (
              <li className="nav-item">
                <Link to="/DashBoard" className="nav-link">Painel</Link>
              </li>
            )}
          </ul>
        </div>

        <div className="search-wrap">
          <div className="search-icon">

            <input
              type="text"
              className="search-txt"
              placeholder="Pesquisar..."
            />

            <a className="search-btn" aria-label="Pesquisar">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="7" />
                <line
                  x1="21"
                  y1="21"
                  x2="16.65"
                  y2="16.65"
                />
              </svg>
            </a>

          </div>
        </div>





        {user ? (
          // USUÁRIO LOGADO: mostra o avatar
          <div className="avatar-wrap">
            <div className="avatar" title={user.nome}>
              {user.avatar ? (
                <img src={user.avatar} alt={user.nome} />
              ) : (
                iniciais
              )}
            </div>

          </div>
        ) : (

          !(estaNoLogin || estaNoCadastro || estaNoForms) && (
            <Link className="btn-cadastro" to="/Login" >cadastre</Link>
          )
        )}


        {/* PERFIL
        <div className="avatar">
          SR
        </div>
           */}

        {/* MENU HAMBÚRGUER */}
        <div className="mobile-menu-icon">
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

      </nav>


      {/* MENU MOBILE */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul>

          <li className="nav-item">
            <Link to="/">Início</Link>
          </li>

          <li className="nav-item">
            <Link to="/Local">Locais</Link>
          </li>

          <li className="nav-item">
            <Link to="/Noticia">Notícias</Link>
          </li>
          <li className="nav-item">
            <Link to="/Historia" className="nav-link">Quem somos</Link>
          </li>

          {ehAdmin && (
            <li className="nav-item">
              <Link to="/DashBoard" className="nav-link">Painel</Link>
            </li>
          )}
        </ul>
      </div>
    </header >
  );
}