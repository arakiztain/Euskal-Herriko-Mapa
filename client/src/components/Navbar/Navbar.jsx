import styles from "./Navbar.module.css";
import logo from "../../assets/images/logo.png";
import { SearchMunicipality } from "../SearchMunicipality";

export function Navbar({ showSearch = false }) {
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
        <a href="/profile" className={styles.link}>Nire profila</a>
      </div>
    </nav>
  );
}

