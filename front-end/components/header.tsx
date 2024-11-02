import Link from "next/link";
import styles from "../styles/Home.module.css";
const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <a className={styles.title}> Courses App</a>
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>
          Home
        </Link>
        <Link href="/lecturers" className={styles.link}>
          Lecturers
        </Link>
      </nav>
    </header>
  );
};

export default Header;
