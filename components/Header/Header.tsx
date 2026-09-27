import Link from "next/link";
import { FiLogIn } from "react-icons/fi";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.flag} aria-hidden="true">
            <span className={styles.flagBlue}></span>
            <span className={styles.flagYellow}></span>
          </span>

          <span className={styles.logoText}>LearnLingo</span>
        </Link>

        <nav className={styles.navigation}>
          <Link href="/" className={styles.link}>
            Home
          </Link>

          <Link href="/teachers" className={styles.link}>
            Teachers
          </Link>
        </nav>

        <div className={styles.actions}>
          <button type="button" className={styles.loginButton}>
            <FiLogIn className={styles.loginIcon} aria-hidden="true" />
            <span>Log in</span>
          </button>

          <button type="button" className={styles.registerButton}>
            Registration
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;