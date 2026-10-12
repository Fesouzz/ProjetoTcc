import { useState } from "react";


import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer/Footer";
import PesquisaFiltro from "../../components/Filtro/Filtro";
import CardLocal from "../../components/CardLocal/CardLocal";
import "./LocalStyle.css"

const dadosEsportes = [
  {
    id: 1,
    titulo: "Futebol comunidade",
    faixaEtaria: "Todas as idades",
    local: "São Miguel Paulista",
    telefone: "11 99999-9999",
    horario: "6:00 - 16:00",
    categoria: "Futebol",
    
  },
  {
    id: 2,
    titulo: "Vôlei comunidade",
    faixaEtaria: "Jovem e Adulto",
    local: "JD Ângela",
    telefone: "11 99999-9999",
    horario: "6:00 - 16:00",
    categoria: "Vôlei",
    
  },
  {
    id: 3,
    titulo: "Basquete comunidade",
    faixaEtaria: "Crianças e Jovens",
    local: "CD Tiradentes",
    telefone: "11 99999-9999",
    horario: "6:00 - 16:00",
    categoria: "Basquete",
    
  }
];

function Locais() {

  // Categoria atualmente selecionada
  const [filtroCategoria, setFiltroCategoria] = useState("todos");

  // Texto digitado pelo usuário
  const [termoBusca, setTermoBusca] = useState("");


  // Filtra os locais
  const dadosFiltrados = dadosEsportes.filter((item) => {

    const categoriaItem = item.categoria.toLowerCase().trim();

    const bateuCategoria =
      filtroCategoria === "todos" ||
      categoriaItem === filtroCategoria;


    const buscaTratada =
      termoBusca.toLowerCase().trim();

    const tituloItem =
      item.titulo.toLowerCase().trim();

    const localItem =
      item.local.toLowerCase().trim();


    const bateuPesquisa =
      buscaTratada === "" ||
      tituloItem.includes(buscaTratada) ||
      localItem.includes(buscaTratada);


    return bateuCategoria && bateuPesquisa;
  });


  return (
    <div className="locais-page">

      <main>

        <PesquisaFiltro
          termoBusca={termoBusca}
          setTermoBusca={setTermoBusca}
          filtroCategoria={filtroCategoria}
          setFiltroCategoria={setFiltroCategoria}
        />


        <section className="lista-cards">

          {dadosFiltrados.length === 0 ? (

            <p className="sem-resultados">
              Nenhum local encontrado para esta busca.
            </p>

          ) : (

            dadosFiltrados.map((item) => (

              <CardLocal
                key={item.id}
                dados={item}
              />

            ))

          )}

        </section>

      </main>


    </div>
  );
}

export default Locais;