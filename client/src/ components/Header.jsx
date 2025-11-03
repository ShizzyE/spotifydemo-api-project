import { Link, useLocation } from "react-router-dom";
import { logout } from "../utils/logout";

export default function Header() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-white underline"
      : "hover:text-black text-white";

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center bg-[#1DB954] px-6 sm:px-10 py-4 gap-3 sm:gap-0">
      <div className="flex gap-6 sm:gap-8 text-base sm:text-lg font-semibold">
        <Link to="/search" className={isActive("/search")}>
          Search
        </Link>
        <Link to="/home" className={isActive("/home")}>
          Home
        </Link>
        <Link to="/favorites" className={isActive("/favorites")}>
          Favorites
        </Link>
      </div>

      <button
        onClick={logout}
        className="bg-red-600 text-white font-semibold px-4 py-2 rounded-full hover:bg-red-700 text-sm sm:text-base transition-colors"
      >
        Logout
      </button>
    </nav>
  );
}
