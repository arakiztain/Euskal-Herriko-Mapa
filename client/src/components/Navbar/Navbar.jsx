import styles from "./Navbar.module.css";
import logo from "../../assets/images/logo.png";
import { SearchMunicipality } from "../SearchMunicipality";
import { useState, useEffect, useRef } from "react";

export function Navbar({ showSearch = false, isAuthenticated = false, onLoginClick, onRegisterClick }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const toggleUserMenu = () => setUserMenuOpen((open) => !open);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h1 className={styles.title}>
          Euskal Herriko Mapa <span className={styles.titleIcon}>*</span>
        </h1>
      </div>

      <div className={styles.center}>
        {showSearch ? (
          <SearchMunicipality />
        ) : (
          <div className={styles.searchPlaceholder}></div>
        )}
      </div>

      <div className={styles.right}>
        <a href="/" className={styles.link}>Home</a>
        <a href="/map" className={styles.link}>Mapa</a>
        <a href="/argibidea" className={styles.link}>Argibidea</a>

        {!isAuthenticated ? (
          <>
            {/* Cambiamos <a> por <button> para evitar navegación */}
            <button onClick={onLoginClick} className={styles.link} type="button">
              Saioa hasi
            </button>
            <button onClick={onRegisterClick} className={styles.link} type="button">
              Erregistratu
            </button>
          </>
        ) : (
          <div className={styles.userMenu} ref={userMenuRef}>
            <button
              onClick={toggleUserMenu}
              className={styles.userIcon}
              aria-label="User menu"
              aria-haspopup="true"
              aria-expanded={userMenuOpen}
            >
              👤
            </button>

            {userMenuOpen && (
              <div className={styles.userDropdown}>
                <a href="/profile" className={styles.link}>Neure Profila</a>
                <a
  href="#"
  className={styles.link}
  onClick={e => {
    e.preventDefault();
    localStorage.removeItem("token");
    setUserMenuOpen(false);
    window.location.href = "/";
  }}
>
  Itxi saioa
</a>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
