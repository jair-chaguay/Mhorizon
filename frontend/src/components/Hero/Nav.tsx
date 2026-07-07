import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

interface NavProps {
  mobile?: boolean; 
}

export const Nav = ({ mobile = false }: NavProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const location = useLocation();

  const toggleDropdown = (menu: string) => {
    if (openDropdown === menu) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(menu);
    }
  };

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav>
        <ul
          className={
            mobile
              ? "flex flex-col w-full text-white text-[15px] font-medium items-start bg-blue-200 tracking-wide"
              : "flex gap-10 text-white text-[15px] font-medium items-center tracking-wide"
          }
        >
          <li className={mobile ? "relative w-full border-b border-white/10" : "relative group py-2"}>
            <div
              className={`flex items-center cursor-pointer transition-colors duration-300 hover:text-orange-500 
                ${mobile ? 'justify-between py-4' : 'gap-1'} 
                ${isActive('/soluciones') && !isActive('/soluciones/sistema-normativo') ? 'text-orange-500' : ''}`
              }
              onClick={() => mobile && toggleDropdown('soluciones')}
            >
              <Link to="/soluciones" onClick={(e) => mobile && e.preventDefault()}>SOLUCIONES</Link>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${!mobile ? 'group-hover:-rotate-180' : (openDropdown === 'soluciones' ? '-rotate-180' : '')}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>

            <div className={
              mobile
                ? `overflow-hidden transition-all duration-300 ${openDropdown === 'soluciones' ? 'max-h-96 opacity-100 pb-3' : 'max-h-0 opacity-0'}`
                : "absolute left-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 z-50"
            }>
              <ul className={
                mobile
                  ? "flex flex-col gap-3 pl-4 text-sm font-normal text-white/90 border-l border-white/20 ml-2 mt-2"
                  : "bg-white text-blue-200 shadow-xl rounded-md overflow-hidden flex flex-col border border-gray-100"
              }>
                <li><Link to="/soluciones/consultoria-empresarial" className={`${isActive('/soluciones/consultoria-empresarial') ? 'text-orange-500 bg-orange-50' : ''} ${mobile ? "hover:text-orange-500 transition-colors block py-1" : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium border-b border-gray-50 uppercase tracking-wide"}`}>Consultoría Empresarial</Link></li>
                <li><Link to="/soluciones/gestion-tributaria" className={`${isActive('/soluciones/gestion-tributaria') ? 'text-orange-500 bg-orange-50' : ''} ${mobile ? "hover:text-orange-500 transition-colors block py-1" : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium border-b border-gray-50 uppercase tracking-wide"}`}>Estrategia y defensa fiscal</Link></li>
                <li><Link to="/soluciones/outsourcing" className={`${isActive('/soluciones/outsourcing') ? 'text-orange-500 bg-orange-50' : ''} ${mobile ? "hover:text-orange-500 transition-colors block py-1" : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium border-b border-gray-50 uppercase tracking-wide"}`}>Outsourcing BPO</Link></li>
                <li><Link to="/soluciones/auditoria" className={`${isActive('/soluciones/auditoria') ? 'text-orange-500 bg-orange-50' : ''} ${mobile ? "hover:text-orange-500 transition-colors block py-1" : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium border-b border-gray-50 uppercase tracking-wide"}`}>Auditoría Financiera</Link></li>
              </ul>
            </div>
          </li>

          {/* Item 2: Sectores */}
          <li className={mobile ? "relative w-full border-b border-white/10" : "relative group py-4"}>
            <div
              className={`flex items-center cursor-pointer transition-colors duration-300 hover:text-orange-500 
                ${mobile ? 'justify-between py-4' : 'gap-1'} 
                ${isActive('/sectores') ? 'text-orange-500' : ''}`
              }
              onClick={() => mobile && toggleDropdown('sectores')}
            >
              <Link to="/sectores" onClick={(e) => mobile && e.preventDefault()}>SECTORES</Link>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${!mobile ? 'group-hover:-rotate-180' : (openDropdown === 'sectores' ? '-rotate-180' : '')}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>

            <div className={
              mobile
                ? `overflow-hidden transition-all duration-300 ${openDropdown === 'sectores' ? 'max-h-96 opacity-100 pb-3' : 'max-h-0 opacity-0'}`
                : "absolute left-0 top-full pt-2 w-85 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 z-50"
            }>
              <ul className={
                mobile
                  ? "flex flex-col gap-3 pl-4 text-sm font-normal text-white/90 border-l border-white/20 ml-2 mt-2"
                  : "bg-white text-blue-200 shadow-xl rounded-md overflow-hidden flex flex-col border border-gray-100"
              }>
                <li><Link to="/sectores/financiero" className={`${isActive('/sectores/financiero') ? 'text-orange-500 bg-orange-50' : ''} ${mobile ? "hover:text-orange-500 transition-colors block py-1" : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium border-b border-gray-50 uppercase tracking-wide"}`}>Financiero</Link></li>
                <li><Link to="/sectores/industrial-comercial" className={`${isActive('/sectores/industrial-comercial') ? 'text-orange-500 bg-orange-50' : ''} ${mobile ? "hover:text-orange-500 transition-colors block py-1" : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium border-b border-gray-50 uppercase tracking-wide"}`}>Industrial y Comercial</Link></li>
                <li><Link to="/sectores/servicios-empresariales" className={`${isActive('/sectores/servicios-empresariales') ? 'text-orange-500 bg-orange-50' : ''} ${mobile ? "hover:text-orange-500 transition-colors block py-1" : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium border-b border-gray-50 uppercase tracking-wide"}`}>Servicios Empresariales</Link></li>
                <li><Link to="/sectores/logistico-portuario" className={`${isActive('/sectores/logistico-portuario') ? 'text-orange-500 bg-orange-50' : ''} ${mobile ? "hover:text-orange-500 transition-colors block py-1" : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium border-b border-gray-50 uppercase tracking-wide"}`}>Logístico y Portuarios</Link></li>
              </ul>
            </div>
          </li>

          <li className={mobile ? "relative w-full border-b border-white/10" : "relative group py-4"}>
            <div
              className={`flex items-center cursor-pointer transition-colors duration-300 hover:text-orange-500 
                ${mobile ? 'justify-between py-4' : 'gap-1'} 
                ${isActive('/calculadora') || isActive('/soluciones/sistema-normativo') ? 'text-orange-500' : ''}`
              }
              onClick={() => mobile && toggleDropdown('inteligencia')}
            >
              <Link to="#" onClick={(e) => mobile && e.preventDefault()}>CONSULTAS</Link>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${!mobile ? 'group-hover:-rotate-180' : (openDropdown === 'inteligencia' ? '-rotate-180' : '')}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>

            <div className={
              mobile
                ? `overflow-hidden transition-all duration-300 ${openDropdown === 'inteligencia' ? 'max-h-96 opacity-100 pb-3' : 'max-h-0 opacity-0'}`
                : "absolute left-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 z-50"
            }>
              <ul className={
                mobile
                  ? "flex flex-col gap-3 pl-4 text-sm font-normal text-white/90 border-l border-white/20 ml-2 mt-2"
                  : "bg-white text-blue-200 shadow-xl rounded-md overflow-hidden flex flex-col border border-gray-100"
              }>
                <li><Link to="/calculadora" className={`${isActive('/calculadora') ? 'text-orange-500 bg-orange-50' : ''} ${mobile ? "hover:text-orange-500 transition-colors block py-1" : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium border-b border-gray-50 uppercase tracking-wide"}`}>Calculadora</Link></li>
                <li><Link to="/soluciones/sistema-normativo" className={`${isActive('/soluciones/sistema-normativo') ? 'text-orange-500 bg-orange-50' : ''} ${mobile ? "hover:text-orange-500 transition-colors block py-1" : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium border-b border-gray-50 uppercase tracking-wide"}`}>Sistema Normativo</Link></li>
              </ul>
            </div>
          </li>

          <li className={`w-full hover:text-orange-500 transition-colors duration-300 ${mobile ? 'py-4 border-b border-white/10' : 'py-4'} ${isActive('/novedades') ? 'text-orange-500' : ''}`}>
            <Link to="/novedades" className="block w-full">INFORMATIVOS</Link>
          </li>

          <li className={`w-full hover:text-orange-500 transition-colors duration-300 ${mobile ? 'py-4 mb-2' : 'py-4'} ${isActive('/nosotros') ? 'text-orange-500' : ''}`}>
            <Link to="/nosotros" className="block w-full">NOSOTROS</Link>
          </li>

          <a href="https://prueba2.miltonmontece.com/" target="_blank" className="hover:bg-white hover:text-[#4DA09C] transition-all duration-300 bg-[#4DA09C] rounded-sm px-4 py-3 w-full md:w-auto text-center md:text-left whitespace-nowrap ${mobile ? 'mt-2' : ''} ">EXPERIENCE</a>



          <li className={`hover:bg-white hover:text-orange-500 transition-all duration-300 bg-orange-500 rounded-sm px-4 py-3 w-full md:w-auto text-center md:text-left whitespace-nowrap ${mobile ? 'mt-2' : ''}`}>
            <Link to="/loginPage" className="block w-full">PORTAL CLIENTE</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};