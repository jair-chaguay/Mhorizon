import { Link } from "react-router-dom"

export const Nav = () => {
  return (
    <nav>
      <ul className="flex gap-12 text-white text-[16px] font-bold items-center">
        <li className="hover:text-orange-500 hover:transition-colors duration-300">
          <Link to="/soluciones">SOLUCIONES</Link>
        </li>
        <li className="hover:text-orange-500 hover:transition-colors duration-300">
          <Link to="/sectores">SECTORES</Link>
        </li>
        <li className="hover:text-orange-500 hover:transition-colors duration-300">
          <Link to="/novedades">NOVEDADES</Link>
        </li>
        <li className="hover:text-orange-500 hover:transition-colors duration-300">
          <Link to="/nosotros">NOSOTROS</Link>
        </li>
        <li className="hover:text-blue-200 hover:transition-colors duration-300 bg-orange-500 rounded-sm p-1">
          <Link to="/contactanos">CONTÁCTANOS</Link>
        </li>

        <li><img className="size-8 cursor-pointer" src="/images/usuario-2.png" alt="" /></li>
      </ul>
    </nav>
  )
}

