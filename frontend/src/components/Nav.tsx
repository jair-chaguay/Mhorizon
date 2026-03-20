
export const Nav = () => {
  return (
    <nav>
      <ul className="flex gap-12 text-white text-[16px] font-bold items-center">
        <li className="hover:text-orange-500 hover:transition-colors duration-300"><a href="#">SOLUCIONES</a></li>
        <li className="hover:text-orange-500 hover:transition-colors duration-300"><a href="#">SECTORES</a></li>
        <li className="hover:text-orange-500 hover:transition-colors duration-300"><a href="#">NOVEDADES</a></li>
        <li className="hover:text-orange-500 hover:transition-colors duration-300"><a href="#">NOSOTROS</a></li>
        <li><img className="size-8 cursor-pointer" src="images/usuario-2.png" alt="" /></li>
      </ul>
    </nav>
  )
}

