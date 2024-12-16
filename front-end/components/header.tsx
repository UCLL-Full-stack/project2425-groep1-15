import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    const userData = sessionStorage.getItem("loggedInUser");

    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setIsLoggedIn(!!parsedData.token);
      } catch (error) {
        console.error("Error parsing session storage data:", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    sessionStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
  };

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
        {isLoggedIn === null ? (
          <p>Loading...</p>
        ) : isLoggedIn ? (
          <a href="/login" onClick={handleLogout} className={styles.link}>
            Logout
          </a>
        ) : (
          <Link href="/login" className={styles.link}>
            Log in
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
