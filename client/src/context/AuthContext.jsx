import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/fetchServer";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const result = await loginUser(email, password);
      localStorage.setItem("token", result.token);
      setUserData({ user: result.user, token: result.token, email });
      return null;
    } catch (error) {
      return error.message || "Error al iniciar sesión";
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
