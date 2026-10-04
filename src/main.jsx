import "./style.css"

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Home from './pages/Home/Home';
import Local from './pages/Local/Local';
import Noticia from './pages/Noticia/Noticia';
import Historia from './pages/Historia/quem-somos';
import Cadastro from './pages/Cadastro/Cadastro';
import CadastroProjeto from './pages/CadastroProjeto/CadastroProjeto';
import Dashboard from "./pages/DashBoard/DashBoard";
import Perfil from "./pages/Perfil/perfil";
import Login from './pages/Login/Login';
import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";
import RotaPublica from "./components/RotaPublica/RotaPublica";
import RotaProtegida from "./components/RotaProtegida/RotaProtegida";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Local' element={<Local />} />
        <Route path='/Noticia' element={<Noticia />} />
        <Route path='/Historia' element={<Historia />} />
        
        <Route path='/Login' element={
          <RotaPublica>
            <Login />
          </RotaPublica>
        } />

        <Route path="/Cadastro" element={
          <RotaPublica>
            <Cadastro />
          </RotaPublica>
        } />

        <Route path="/CadastroProjeto" element={
          <RotaProtegida>
            <CadastroProjeto />
          </RotaProtegida>
        } />

        <Route path="/Perfil" element={
          <RotaProtegida apenasAdmin={false}>
            <Perfil />
          </RotaProtegida>
        } />

        <Route path="/DashBoard" element={
          <RotaProtegida apenasAdmin={true}>
            <Dashboard />
          </RotaProtegida>
        } />
      </Routes>
      <Footer />
    </AuthProvider>
  </BrowserRouter>
);
