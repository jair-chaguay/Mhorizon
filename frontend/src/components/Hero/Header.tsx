import { useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "./Nav";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-200 px-5 sm:px-8 md:px-10 py-2 sticky top-0 z-40 shadow-lg ">
      <div className="flex justify-between items-center">
        <Link className="w-36 sm:w-44 md:w-35 h:6 transition-transform hover:scale-105 duration-300" to="/">
          <img src="/images/LOGOTIPO.svg" alt="" />
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none hover:text-orange-500 transition-colors"
          aria-label="Abrir menú"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="hidden md:block">
          <Nav />
        </div>
      </div>

      {menuOpen && (
        <div className="absolute top-11 left-0 w-full bg-blue-200 md:hidden shadow-xl">
          <div className="px-5 sm:px-8 py-4 max-h-[85vh] overflow-y-auto">
            <Nav mobile />
          </div>
        </div>
      )}
    </header>
  );
};