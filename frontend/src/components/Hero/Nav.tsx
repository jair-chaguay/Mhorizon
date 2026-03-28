import { Link } from "react-router-dom"

interface NavProps {
  mobile?: boolean
}

export const Nav = ({ mobile = false }: NavProps) => {
  return (
    <nav>
      <ul
        className={
          mobile
            ? "flex flex-col gap-5 text-white text-[16px] font-bold items-start bg-blue-200 py-4"
            : "flex gap-12 text-white text-[16px] font-bold items-center"
        }
      >
        <li className="hover:text-orange-500 transition-colors duration-300">
          <Link to="/soluciones">SOLUCIONES</Link>
        </li>

        <li className="hover:text-orange-500 transition-colors duration-300">
          <Link to="/sectores">SECTORES</Link>
        </li>

        <li className="hover:text-orange-500 transition-colors duration-300">
          <Link to="/novedades">NOVEDADES</Link>
        </li>

        <li className="hover:text-orange-500 transition-colors duration-300">
          <Link to="/nosotros">NOSOTROS</Link>
        </li>

        <li className="hover:text-blue-200 transition-colors duration-300 bg-orange-500 rounded-sm px-3 py-2">
          <Link to="/contactanos">CONTÁCTANOS</Link>
        </li>

        <li>
          <img
            className="size-8 cursor-pointer"
            src="/images/usuario-2.png"
            alt="Usuario"
          />
        </li>
      </ul>
    </nav>
  )
}