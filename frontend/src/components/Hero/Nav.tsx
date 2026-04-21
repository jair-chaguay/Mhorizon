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
              ? "flex flex-col gap-5 text-white text-[15px] font-medium items-start bg-blue-200 py-4 tracking-wide"
              : "flex gap-10 text-white text-[15px] font-medium items-center tracking-wide"
          }
        >
          <li className={mobile ? "relative w-full" : "relative group py-4"}>
            <div
              className={`flex items-center gap-1 cursor-pointer transition-colors duration-300 hover:text-orange-500 ${isActive('/soluciones') ? 'text-orange-500' : ''
                }`}
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
                ? `overflow-hidden transition-all duration-300 ${openDropdown === 'soluciones' ? 'max-h-96 opacity-100 pt-3' : 'max-h-0 opacity-0'}`
                : "absolute left-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 z-50"
            }>
              <ul className={
                mobile
                  ? "flex flex-col gap-3 pl-4 text-sm font-normal text-white"
                  : "bg-white text-blue-200 shadow-xl rounded-md overflow-hidden flex flex-col border border-gray-100"
              }>
                <li><Link to="/soluciones/consultoria-empresarial" className={`${isActive('/soluciones/consultoria-empresarial')
                  ? 'text-orange-500 bg-orange-50'
                  : ''
                  } ${mobile
                    ? "hover:text-orange-500 transition-colors"
                    : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium border-b border-gray-50 uppercase tracking-wide"
                  }`}>Consultoría Empresarial
                </Link></li>
                <li><Link to="/soluciones/gestion-tributaria" className={`${isActive('/soluciones/gestion-tributaria')
                  ? 'text-orange-500 bg-orange-50'
                  : ''
                  } ${mobile
                    ? "hover:text-orange-500 transition-colors"
                    : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium border-b border-gray-50 uppercase tracking-wide"
                  }`}>Gestión Tributaria
                </Link></li>
                <li><Link to="/soluciones/outsourcing" className={`${isActive('/soluciones/outsourcing')
                  ? 'text-orange-500 bg-orange-50'
                  : ''
                  } ${mobile
                    ? "hover:text-orange-500 transition-colors"
                    : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium border-b border-gray-50 uppercase tracking-wide"
                  }`}>Outsourcing BPO
                </Link></li>
                <li><Link to="/soluciones/auditoria" className={`${isActive('/soluciones/auditoria')
                  ? 'text-orange-500 bg-orange-50'
                  : ''
                  } ${mobile
                    ? "hover:text-orange-500 transition-colors"
                    : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium border-b border-gray-50 uppercase tracking-wide"
                  }`}>Auditoría Financiera
                </Link></li>
              </ul>
            </div>
          </li>

          <li className={mobile ? "relative w-full" : "relative group py-4"}>
            <div
              className={`flex items-center gap-1 cursor-pointer transition-colors duration-300 hover:text-orange-500 ${isActive('/sectores') ? 'text-orange-500' : ''
                }`}
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
                ? `overflow-hidden transition-all duration-300 ${openDropdown === 'sectores' ? 'max-h-96 opacity-100 pt-3' : 'max-h-0 opacity-0'}`
                : "absolute left-0 top-full pt-2 w-85 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 z-50"
            }>
              <ul className={
                mobile
                  ? "flex flex-col gap-3 pl-4 text-sm font-normal text-white"
                  : "bg-white text-blue-200 shadow-xl rounded-md overflow-hidden flex flex-col border border-gray-100"
              }>
                <li><Link to="/sectores/financiero" className={`${isActive('/sectores/financiero')
                    ? 'text-orange-500 bg-orange-50'
                    : ''
                  } ${mobile
                    ? "hover:text-orange-500 transition-colors"
                    : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium border-b border-gray-50 uppercase tracking-wide"
                  }`}>Financiero
                  </Link></li>
                <li><Link to="/sectores/industrial-comercial" className={`${isActive('/sectores/industrial-comercial')
                    ? 'text-orange-500 bg-orange-50'
                    : ''
                  } ${mobile
                    ? "hover:text-orange-500 transition-colors"
                    : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium border-b border-gray-50 uppercase tracking-wide"
                  }`}>Industrial y Comercial
                  </Link></li>
                <li><Link to="/sectores/servicios-empresariales" className={`${isActive('/sectores/servicios-empresariales')
                    ? 'text-orange-500 bg-orange-50'
                    : ''
                  } ${mobile
                    ? "hover:text-orange-500 transition-colors"
                    : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium border-b border-gray-50 uppercase tracking-wide"
                  }`}>Servicios Empresariales
                  </Link></li>
                <li><Link to="/sectores/logistico-portuario" className={`${isActive('/sectores/logistico-portuario')
                    ? 'text-orange-500 bg-orange-50'
                    : ''
                  } ${mobile
                    ? "hover:text-orange-500 transition-colors"
                    : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium border-b border-gray-50 uppercase tracking-wide"
                  }`}>Logístico y Portuarios
                  </Link></li>
              </ul>
            </div>
          </li>

          <li className={`hover:text-orange-500 transition-colors duration-300 py-4 ${isActive('/novedades') ? 'text-orange-500' : ''}`}>
            <Link to="/novedades">INFORMATIVOS</Link>
          </li>

          <li className={`hover:text-orange-500 transition-colors duration-300 py-4 ${isActive('/calculadora') ? 'text-orange-500' : ''}`}>
            <Link to="/calculadora">CALCULADORA</Link>
          </li>

          <li className={`hover:text-orange-500 transition-colors duration-300 py-4 ${isActive('/nosotros') ? 'text-orange-500' : ''}`}>
            <Link to="/nosotros">NOSOTROS</Link>
          </li>

          <li className="hover:bg-white hover:text-orange-500 transition-all duration-300 bg-orange-500 rounded-sm px-5 py-2 w-full md:w-auto text-center md:text-left">
            <Link to="/loginPage">PORTAL CLIENTE</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};