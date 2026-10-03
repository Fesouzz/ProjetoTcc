import "./style.css"

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter , Route , Routes} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";


import Home  from './pages/Home/Home';
import Local  from './pages/Local/Local';
import Noticia from './pages/Noticia/Noticia';
import Historia from './pages/Historia/quem-somos';
import Cadastro from './pages/Cadastro/Cadastro';
import CadastroProjeto from './pages/CadastroProjeto/CadastroProjeto';
import Dashboard from "./pages/DashBoard/DashBoard";
import Login from './pages/Login/Login'
import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";
import RotaProtegida from "./context/AuthContext";



createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AuthProvider>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Local' element={<Local/>}/>
      <Route path='/Noticia' element={<Noticia/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Historia' element={<Historia/>}/>
      <Route path="/Cadastro" element={<Cadastro />} />
      <Route path="/CadastroProjeto" element={
        <RotaProtegida>
          <CadastroProjeto/>
        </RotaProtegida>
        } />
      <Route path="/DashBoard" element={
        <RotaProtegida apenasAdmin={true}>
          <Dashboard/>
        </RotaProtegida>

      }/>
    </Routes>
    <Footer/>

    </AuthProvider>
  </BrowserRouter>,

)
