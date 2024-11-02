import Link from "next/link";
import styles from "../styles/Home.module.css";
const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <a className={styles.title}> project pinch</a>
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>
          Home
        </Link>
        <Link href="/posts" className={styles.link}>
          posts
        </Link>
        <Link href="/profile" className={styles.link}>
          profile
        </Link>
        <Link href="/login" className={styles.link}>
          log in
        </Link>
      </nav>
    </header>
  );
};

export default Header;
