import Link from "next/link";
import "../styles/Home.module.css";
const Header: React.FC = () => {
  return (
    <header className="header">
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
        {" "}
        Courses App
      </a>
      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white">
          Home
        </Link>
        <Link href="/lecturers" className="nav-link px-4 fs-5 text-white">
          Lecturers
        </Link>
      </nav>
    </header>
  );
};

export default Header;
