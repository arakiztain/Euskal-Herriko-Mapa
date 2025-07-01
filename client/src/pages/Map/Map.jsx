import { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { SelectedMunicipalities } from "../../components/SelectedMunicipalities/SelectedMunicipalities";
import { SVG } from "../../components/Svg";
import { LoginModal } from "../../components/LoginModal/LoginModal";
import { RegisterModal } from "../../components/RegisterModal/RegisterModal";

export default function MapPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  const handleRegisterSuccess = () => {
    setIsAuthenticated(true);
    setShowRegister(false);
  };

  const backdropActive = showLogin || showRegister;

  return (
    <div className={styles.page}>
      <Navbar
        isAuthenticated={isAuthenticated}
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />

      <div className={`${styles.container} ${backdropActive ? styles.blurBackground : ""}`}>
        <aside className={styles.sidebar}>
          <SelectedMunicipalities isAuthenticated={isAuthenticated} />
        </aside>

        <main className={styles.mapContainer}>
          <SVG />
        </main>
      </div>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}
    </div>
  );
}
