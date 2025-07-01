import styles from "./Map.module.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { SelectedMunicipalities } from "../../components/SelectedMunicipalities/SelectedMunicipalities";
import { SVG } from "../../components/Svg";

export default function MapPage() {
  return (
    <div className={styles.page}>
      <Navbar showSearch={true} />

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
