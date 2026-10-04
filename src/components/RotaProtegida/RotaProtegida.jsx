import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RotaProtegida({ children, apenasAdmin = false }) {
  const { user, carregando } = useAuth();

  if (carregando) {
    return <p className="sem-resultados-global">Verificando credenciais...</p>;
  }

  // 🔥 CORRIGIDO: Se não tiver usuário logado, joga para o login EM SILÊNCIO, sem disparar alerts
  if (!user) {
    return <Navigate to="/Login" replace />;
  }

  // Se a rota for exclusiva de admin e o usuário for comum, bloqueia e manda de volta
  if (apenasAdmin && user.tipo_acesso !== "admin") {
    return <Navigate to="/Perfil" replace />;
  }

  return children;
}
