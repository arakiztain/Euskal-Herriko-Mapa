import styles from "./Navbar.module.css";

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
        <h1 className={styles.title}>Euskal Herriko Mapa</h1>
      </div>

      <div className={styles.center}>
        {/* Aquí ponemos el buscador */}
        {/* Si quieres, puedes reutilizar SearchMunicipality */}
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
