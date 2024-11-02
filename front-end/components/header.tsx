import Link from "next/link";
import styles from "../styles/Home.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>
          Home
        </Link>
        <Link href="/posts" className={styles.link}>
          Posts
        </Link>
        <a className={styles.title}> Project Pinch</a>
        <Link href="/profile" className={styles.link}>
          Profile
        </Link>
        <Link href="/login" className={styles.link}>
          Log in
        </Link>
      </nav>
    </header>
  );
};

export default Header;
