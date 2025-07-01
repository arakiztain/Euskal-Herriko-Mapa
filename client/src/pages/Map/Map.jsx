import styles from "./Map.module.css";
import { SearchMunicipality } from "../../components/SearchMunicipality";
import { SelectedMunicipalities } from "../../components/SelectedMunicipalities/SelectedMunicipalities";
import { SVG } from "../../components/Svg";
import logo from '../../assets/images/logo.png';

export default function MapPage() {
  return (
    <div className={styles.page}>
      <nav className={styles.navbar}>
        <div className={styles.left}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <h1 className={styles.title}>
            Euskal Herriko Mapa <span className={styles.titleIcon}>*</span>
          </h1>
        </div>

        <div className={styles.center}>
          <SearchMunicipality />
        </div>

        <div className={styles.right}>
          <a href="/" className={styles.link}>Home</a>
          <a href="/map" className={styles.link}>Mapa</a>
          <a href="/argibidea" className={styles.link}>Argibidea</a>
          <a href="/profile" className={styles.link}>Nire profila</a>
        </div>
      </nav>

      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <SelectedMunicipalities />
        </aside>

        <main className={styles.mapContainer}>
          <SVG />
        </main>
      </div>
    </div>
  );
}
