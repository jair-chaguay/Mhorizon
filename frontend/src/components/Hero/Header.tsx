import { useState } from "react"
import { Link } from "react-router-dom"
import { Nav } from "./Nav"

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-blue-200 px-5 sm:px-8 md:px-10 py-4 sticky top-0 z-40 shadow-lg">
      <div className="flex justify-between items-center">
        <Link className="w-36 sm:w-44 md:w-40 transition-transform hover:scale-105 duration-300" to="/">
          <img src="/images/Logo3.png" alt="MHorizon Logo" />
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
        <div className="mt-4 md:hidden">
          <Nav mobile />
        </div>
      )}
    </header>
  )
}