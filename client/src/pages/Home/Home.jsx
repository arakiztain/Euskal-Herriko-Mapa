import styles from "./Home.module.css";
import { Link } from 'react-router-dom';
import { Navbar } from "../../components/Navbar/Navbar";

export default function Home() {
  const hasMunicipalities = false;

  return (
    <div className={styles.pageWrapper}>
      <Navbar hasMunicipalities={hasMunicipalities} />

      <main>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Ongi Etorri Euskal Herriko Mapa Interaktibora</h1>
            <p>Aztertu udalerriak eta eskuratu bakoitzaren informazio zehatza klik egitean.</p>
            <Link to="/map" className={styles.btnPrimary}>Mapa ikusi</Link>

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

      <footer>
        <p>&copy; 2025 EH-ko mapa. Eskubide guztiak erreserbatuta.</p>
      </footer>
    </div>
  );
}
