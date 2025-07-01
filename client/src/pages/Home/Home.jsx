import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { LoginModal } from "../../components/LoginModal/LoginModal";
import { RegisterModal } from "../../components/RegisterModal/RegisterModal";

export default function Home() {
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

  // Fondo difuminado cuando modal está abierto
  const backdropActive = showLogin || showRegister;

  return (
    <div className={styles.pageWrapper}>
      <Navbar
        isAuthenticated={isAuthenticated}
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />

      {/* Modales */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onRegisterSuccess={() => {
            setIsAuthenticated(true);
            setShowRegister(false);
          }}
        />
      )}

      {/* Si hay modal abierto, añade clase para fondo oscuro y difuminado */}
      <main className={`${styles.main} ${backdropActive ? styles.mainBlur : ""}`}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Ongi Etorri Euskal Herriko Mapa Interaktibora</h1>
            <p>Aztertu udalerriak eta eskuratu bakoitzaren informazio zehatza klik egitean.</p>
            <Link to="/map" className={styles.btnPrimary}>
              Mapa ikusi
            </Link>
          </div>
        </div>

        <section className={styles.features}>
          <div className={styles.feature}>
            <h2>Interaktibitatea</h2>
            <p>Egin klik edozein udalerritan informazio zehatza berehala lortzeko.</p>
          </div>
          <div className={styles.feature}>
            <h2>Euskal Herria ezagutu</h2>
            <p>Geure herriaren udalerri eta herriei buruz gehiau ezagutu</p>
          </div>
          <div className={styles.feature}>
            <h2>Erabiltzeko erraza</h2>
            <p>Intuitiboa eta nabigatzeko erraza edozeinentzat.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
