import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";



function RotaPublica({ children }) {
  const { user, carregando } = useAuth();

  if (carregando) {
    return <p>Carregando...</p>;
  }

  // Já está logado → não deixa ver a tela de login/cadastro, manda pra Home
  if (user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default RotaPublica; 