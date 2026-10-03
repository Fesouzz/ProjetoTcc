import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from  "react-router-dom";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(true);

useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodificado = jwtDecode(token);

        // Verifica se o token já expirou
        if (decodificado.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
        } else {
          setUser(decodificado);
        }
        } catch {
            localStorage.removeItem("token");
        }
    }
     setCarregando(false);
}, []);
  function login(token) {
    setUser(null);
    localStorage.setItem("token", JSON.stringify(token));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

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