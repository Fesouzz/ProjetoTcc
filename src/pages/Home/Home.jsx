import Navbar from "../../components/NavBar/Navbar"
import Footer from "../../components/Footer/Footer"
import imagemHero from "../../assets/WhatsApp Image 2026-03-26 at 23.54.54 (2).jpeg"
import Karate from "../../assets/Karate.png"
import { Link, useNavigate } from "react-router-dom"
import CardEvento from "../../components/CardEvento/CardEvento"
import { useAuth } from "../../context/AuthContext"
import "./HomeStyle.css"

function Home() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <main>
                <section className="hero">
                    <div className="hero-inner">
                        <img
                            src={imagemHero}
                            alt="Jovem em comunidade à noite"
                        />

                        <div className="hero-content">
                            <h1>
                                COMUNA
                                <br />
                                ESPORTES
                            </h1>

                            <p>
                                Fortalecendo o talento periférico através da união, saúde e
                                cultura urbana. Junte-se ao movimento que transforma comunidades.
                            </p>

                            <div className="hero-actions">
                                {/* Link original com a trava de segurança do alert e texto branco */}
                                <Link  
                                    className="btn-outline" 
                                    to="/cadastroProjeto"
                                    onClick={(e) => {
                                        if (!user) {
                                            e.preventDefault();
                                            alert("Você precisa estar cadastrado");
                                            navigate("/Login");
                                        }
                                    }}
                                    style={{ color: "#ffffff" }}
                                >
                                    Cadastre seu projeto
                                </Link>

                                <Link to="/Historia" className="link-arrow">
                                    Saiba mais →
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="sports">
                    {/* Futebol */}
                    <div className="pill">
                        <svg
                            className="icon"
                            xmlns="http://w3.org"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="#4da3ff"
                                d="M417.3 360.1l-71.6-4.8c-5.2-.3-10.3 1.1-14.5 4.2s-7.2 7.4-8.4 12.5l-17.6 69.6C289.5 445.8 273 448 256 448s-33.5-2.2-49.2-6.4L189.2 372c-1.3-5-4.3-9.4-8.4-12.5s-9.3-4.5-14.5-4.2l-71.6 4.8c-17.6-27.2-28.5-59.2-30.4-93.6L125 228.3c4.4-2.8 7.6-7 9.2-11.9s1.4-10.2-.5-15l-26.7-66.6C128 109.2 155.3 89 186.7 76.9l55.2 46c4 3.3 9 5.1 14.1 5.1s10.2-1.8 14.1-5.1l55.2-46c31.3 12.1 58.7 32.3 79.6 57.9l-26.7 66.6c-1.9 4.8-2.1 10.1-.5 15s4.9 9.1 9.2 11.9l60.7 38.2c-1.9 34.4-12.8 66.4-30.4 93.6zM256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm14.1-325.7c-8.4-6.1-19.8-6.1-28.2 0L194 221c-8.4 6.1-11.9 16.9-8.7 26.8l18.3 56.3c3.2 9.9 12.4 16.6 22.8 16.6l59.2 0c10.4 0 19.6-6.7 22.8-16.6l18.3-56.3c3.2-9.9-.3-20.7-8.7-26.8l-47.9-34.8z"
                            />
                        </svg>
                        <span>Futebol</span>
                    </div>

                    {/* Basquete */}
                    <div className="pill">
                        <svg
                            className="icon"
                            xmlns="http://w3.org"
                            viewBox="0 0 512 512"
                        >
                            {/* 🔥 TEXTO INTRUSO REMOVIDO DAQUI DE BAIXO */}
                            <path
                                fill="#ff4a09"
                                d="M92.7 58.8l78.4 78.4c18.2-25 28.9-55.9 28.9-89.2 0-14.1-1.9-27.7-5.5-40.6-38 9.4-72.6 27.2-101.8 51.4zM58.8 92.7c-24.2 29.2-42 63.8-51.4 101.8 12.9 3.6 26.5 5.5 40.6 5.5 33.3 0 64.1-10.7 89.2-28.9L58.8 92.7zM256 0c-4.6 0-9.2 .1-13.7 .4 3.7 15.3 5.7 31.2 5.7 47.6 0 46.6-15.9 89.4-42.6 123.4L256 222.1 419.3 58.8C374.9 22.1 318.1 0 256 0zM48 248c-16.4 0-32.4-2-47.6-5.7-.2 4.5-.4 9.1-.4 13.7 0 62.1 22.1 118.9 58.8 163.3L222.1 256 171.4 205.4C137.4 232.1 94.6 248 48 248zm463.6 21.7c.2-4.5 .4-9.1 .4-13.7 0-62.1-22.1-118.9-58.8-163.3L289.9 256 340.6 306.6c34-26.7 76.9-42.6 123.4-42.6 16.4 0 32.4 2 47.6 5.7zm-7.1 47.8c-12.9-3.6-26.5-5.5-40.6-5.5-33.3 0-64.1 10.7-89.2 28.9l78.4 78.4c24.2-29.2 42-63.8 51.4-101.8zM340.9 374.8c-18.2 25-28.9 55.9-28.9 89.2 0 14.1 1.9 27.7 5.5 40.6 38-9.4 72.6-27.2 101.8-51.4l-78.4-78.4zm-34.3-34.3L256 289.9 92.7 453.2c44.3 36.7 101.2 58.8 163.3 58.8 4.6 0 9.2-.1 13.7-.4-3.7-15.3-5.7-31.2-5.7-47.6 0-46.6 15.9-89.4 42.6-123.4z"
                            />
                        </svg>
                        <span>Basquete</span>
                    </div>

                    {/* Vôlei */}
                    <div className="pill">
                        <svg
                            className="icon"
                            xmlns="http://w3.org"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="#f4d35e"
                                d="M512 258.9c-23.4 8-47.8 13.1-72.6 15.1 5.9-98.6-30.7-191.1-94.9-258.3 97.8 36 167.5 130 167.5 240.3 0 1 0 1.9 0 2.9zm-5.9 52c-5.2 23.7-13.6 46.2-24.9 66.9-94.7 52.2-214 50-308.4-13.6 21.7-31.3 49.8-58.9 83.8-80.5 79.5 41.6 168.5 49.1 249.5 27.1zM279.7 241.6c-3.7-89.7-41.7-170.5-101.3-229.7 22.3-7.1 46-11.2 70.5-11.9 92.5 55.9 150.3 160.3 142.4 273.8-38-3.2-75.9-13.7-111.6-32.3zM130.5 32.8C149.1 49.1 165.8 67.7 179.9 88.2 91.5 132.3 29.7 210.3 3.7 299.5 1.3 285.3 0 270.8 0 256 0 160.2 52.6 76.7 130.5 32.8zm73.4 97c16.3 34.5 26.1 72.6 27.9 112.8-75.8 48-126.8 121.3-148.3 202.5-17.6-16.1-33-34.6-45.5-55 2.1-108.1 63.7-210.4 165.9-260.3zM256 512c-47.7 0-92.3-13-130.5-35.7 4.8-24.3 12.6-48 23.2-70.4 82.4 54.4 180.8 68.9 271 47-44.4 37-101.5 59.2-163.7 59.2z"
                            />
                        </svg>
                        <span>Vôlei</span>
                    </div>

                    {/* Artes marciais */}
                    <div className="pill">
                        <img
                            src={Karate}
                            alt="Artes marciais"
                            className="icon"
                        />
                        <span>Artes marciais</span>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Home;
