import { useState } from "react";
import PesquisaFiltro from "../../components/Filtro/Filtro";
import "./NoticiaStyle.css";

// 📸 Importações das imagens originais do seu projeto (verifique se os caminhos na pasta assets batem)
import ImgFutebol from "../../assets/fut1.jpg";
import ImgBasquete from "../../assets/basquete.jpg";

// Array com os textos e dados EXATOS extraídos do seu notícias.html original
const dadosNoticiasOriginais = [
  {
    id: 1,
    imagem: ImgFutebol,
    tagTexto: "Várzea Ativa",
    tagTipo: "futebol",
    titulo: "Time de Futebol garante vaga na final do Torneio do Terrão",
    descricao: "Com uma virada histórica nos acréscimos, o time do morro carimbou o passaporte para a grande disputa.",
    autor: "Redação Comuna",
    tempo: "Há 2 horas",
    categoria: "Futebol"
  },
  {
    id: 2,
    imagem: ImgBasquete,
    tagTexto: "Streetball",
    tagTipo: "basquete",
    titulo: "Basquetebol organiza mutirão para revitalizar a Quadra Azul",
    descricao: "Coletivo de basquete de rua reuniu atletas e moradores para pintura do piso e instalação de novas redes nos aros.",
    autor: "Lucas Silva",
    tempo: "Ontem",
    categoria: "Basquete"
  }
];

export default function Noticia() {
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [termoBusca, setTermoBusca] = useState("");

  // Regra de filtragem reativa e inteligente para a sua busca
  const noticiasFiltradas = dadosNoticiasOriginais.filter((item) => {
    const categoriaItem = item.categoria.toLowerCase().trim();
    const bateuCategoria = filtroCategoria === "todos" || categoriaItem === filtroCategoria;

    const buscaTratada = termoBusca.toLowerCase().trim();
    const tituloItem = item.titulo.toLowerCase().trim();
    const descricaoItem = item.descricao.toLowerCase().trim();
    const tagItem = item.tagTexto.toLowerCase().trim();

    const bateuPesquisa =
      buscaTratada === "" ||
      tituloItem.includes(buscaTratada) ||
      descricaoItem.includes(buscaTratada) ||
      tagItem.includes(buscaTratada);

    return bateuCategoria && bateuPesquisa;
  });

  return (
    <div className="noticias-page-container">
      <main>
        {/* Barra de pesquisa e modalidades centralizada em 850px */}
        <PesquisaFiltro
          termoBusca={termoBusca}
          setTermoBusca={setTermoBusca}
          filtroCategoria={filtroCategoria}
          setFiltroCategoria={setFiltroCategoria}
          placeholder="Pesquise a notícia que você deseja"
        />

        {/* Mural de Notícias em Linha Vertical Simétrica */}
        <section className="lista-noticias-stack">
          {noticiasFiltradas.length === 0 ? (
            <p className="sem-noticias-resultados">
              Nenhuma notícia encontrada para esta busca.
            </p>
          ) : (
            noticiasFiltradas.map((item) => (
              <article key={item.id} className="noticia-article-card">
                
                {/* Imagem de cobertura da notícia */}
                <div className="noticia-card-thumb">
                  <img src={item.imagem} alt={item.titulo} />
                </div>

                {/* Conteúdo textual interno */}
                <div className="noticia-card-body-content">
                  <span className={`noticia-badge-tag-tipo tag-${item.tagTipo}`}>
                    {item.tagTexto}
                  </span>
                  
                  <h3 className="noticia-card-main-title">
                    {item.titulo}
                  </h3>
                  
                  <p className="noticia-card-main-description">
                    {item.descricao}
                  </p>
                  
                  {/* Rodapé interno com autor e tempo */}
                  <div className="noticia-card-footer-meta">
                    <span>Por: {item.autor}</span>
                    <span>{item.tempo}</span>
                  </div>
                </div>

              </article>
            ))
          )}
        </section>
      </main>
    </div>
  );
}
