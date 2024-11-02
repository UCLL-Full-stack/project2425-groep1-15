import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header>
      <a> Project Pinch</a>
      <nav>
        <Link href="/" className="flex nav-link px-4 fs-5 text-white">
          Home
        </Link>
      </nav>
    </header>
  );
};

export default Header;
