import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";



function RotaProtegida({ children, apenasAdmin = false }) {
  const { user, carregando } = useAuth();

  if (carregando) {
    return <p>Carregando...</p>; 
  }

  if (!user) {
    alert("Você precisa estar cadastrado")
    return <Navigate to="/Login" />;
  }

  if (apenasAdmin && user.tipo_acesso !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}


export default RotaProtegida; 