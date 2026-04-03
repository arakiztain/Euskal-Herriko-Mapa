import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, validateToken } from "../utils/fetchServer";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await validateToken();
        if (res.valid) {
          setUserData({ user: res.user, token });
        } else {
          localStorage.removeItem("token");
          setUserData(null);
        }
      } catch (err) {
        console.error("Error al validar el token:", err);
        localStorage.removeItem("token");
        setUserData(null);
      }
    };

    checkToken();
  }, []);

const handleLogin = async (email, password) => {
  try {
    const result = await loginUser(email, password);

    if (result.token && result.user) {
      localStorage.setItem("token", result.token);
      setUserData({ user: result.user, token: result.token });
      return null;
    } else {
      return "No se recibió token del backend";
    }

  } catch (error) {
    return error.response?.data?.error || "Error al iniciar sesión";
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{ userData, setUserData, onLogin: handleLogin, onLogout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
