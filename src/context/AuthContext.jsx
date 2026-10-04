import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodificado = jwtDecode(token);
        // Verifica se expirou
        if (decodificado.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          setUser(null);
        } else {
          setUser(decodificado);
        }
      } catch (err) {
        localStorage.removeItem("token");
        setUser(null);
      }
    }
    setCarregando(false);
  }, []);

  function login(token) {
    localStorage.setItem("token", token);
    try {
      const decodificado = jwtDecode(token);
      setUser(decodificado);
    } catch (err) {
      setUser(null);
    }
  }
  function logout() {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/Login"); // Redireciona direto para a tela de login limpa
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
