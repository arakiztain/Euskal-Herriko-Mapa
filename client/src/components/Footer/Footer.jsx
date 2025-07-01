import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Gaizka Arakiztain-ek eginda&nbsp;</p>
      <a
        href="https://github.com/arakiztain"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub de Gaizka Arakiztain"
        className={styles.githubLink}
      >
        <svg
          height="24"
          width="24"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.githubIcon}
        >
          <path
            fillRule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2 0-2.43-.49-2.59-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.58.82-2.13-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82a7.54 7.54 0 012-.27c.68 0 1.37.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.55.82 1.26.82 2.13 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8 8 0 0016 8c0-4.42-3.58-8-8-8z"
          />
        </svg>
      </a>
    </footer>
  );
}
