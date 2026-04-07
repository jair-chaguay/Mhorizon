import { Link } from "react-router-dom"
import { useState } from "react"
import { ContactModal } from "../ContactModal"

interface NavProps {
  mobile?: boolean
}

export const Nav = ({ mobile = false }: NavProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    if (openDropdown === menu) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(menu);
    }
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
              className={`flex items-center gap-1 cursor-pointer transition-colors duration-300 ${mobile ? 'hover:text-orange-500' : 'text-orange-500 hover:text-orange-400'}`}
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
                : "absolute left-0 top-[100%] pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 z-50"
            }>
              <ul className={
                mobile
                  ? "flex flex-col gap-3 pl-4 text-sm font-normal text-white"
                  : "bg-white text-blue-200 shadow-xl rounded-md overflow-hidden flex flex-col border border-gray-100"
              }>
                <li><Link to="/soluciones/consultoria-empresarial" className={mobile ? "hover:text-orange-500 transition-colors" : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium border-b border-gray-50 uppercase tracking-wide"}>Consultoría Empresarial</Link></li>
                <li><Link to="/soluciones/gestion-tributaria" className={mobile ? "hover:text-orange-500 transition-colors" : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium border-b border-gray-50 uppercase tracking-wide"}>Gestión Tributaria</Link></li>
                <li><Link to="/soluciones/outsourcing" className={mobile ? "hover:text-orange-500 transition-colors" : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium border-b border-gray-50 uppercase tracking-wide"}>Outsourcing BPO</Link></li>
                <li><Link to="/soluciones/auditoria" className={mobile ? "hover:text-orange-500 transition-colors" : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium uppercase tracking-wide"}>Auditoría Financiera</Link></li>
              </ul>
            </div>
          </li>

          <li className={mobile ? "relative w-full" : "relative group py-4"}>
            <div
              className="hover:text-orange-500 transition-colors duration-300 flex items-center gap-1 cursor-pointer"
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
                : "absolute left-0 top-[100%] pt-2 w-[340px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 z-50"
            }>
              <ul className={
                mobile
                  ? "flex flex-col gap-3 pl-4 text-sm font-normal text-white"
                  : "bg-white text-blue-200 shadow-xl rounded-md overflow-hidden flex flex-col border border-gray-100"
              }>
                <li><Link to="/sectores/financiero" className={mobile ? "hover:text-orange-500 transition-colors" : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium border-b border-gray-50 uppercase tracking-wide"}>Sector Financiero</Link></li>
                <li><Link to="/sectores/industrial-comercial" className={mobile ? "hover:text-orange-500 transition-colors" : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium border-b border-gray-50 uppercase tracking-wide"}>Industrial y Comercial</Link></li>
                <li><Link to="/sectores/servicios-empresariales" className={mobile ? "hover:text-orange-500 transition-colors" : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium uppercase tracking-wide"}>Servicios Empresariales</Link></li>
                <li><Link to="/sectores/logistico-portuario" className={mobile ? "hover:text-orange-500 transition-colors" : "block px-5 py-4 text-[0.85rem] hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium uppercase tracking-wide"}>Logístico y Portuarios</Link></li>

              </ul>
            </div>
          </li>

          <li className="hover:text-orange-500 transition-colors duration-300 py-4">
            <Link to="/novedades">INFORMATIVOS</Link>
          </li>
          <li className="hover:text-orange-500 transition-colors duration-300 py-4">
            <Link to="/nosotros">NOSOTROS</Link>
          </li>

          <li className="hover:bg-white hover:text-orange-500 transition-all duration-300 bg-orange-500 rounded-sm px-5 py-2 w-full md:w-auto text-center md:text-left">
            <Link to="/loginPage">PORTAL</Link>
          </li>
          <li className="hover:bg-white hover:text-orange-500 transition-all duration-300 bg-orange-500 rounded-sm px-5 py-2 w-full md:w-auto text-center md:text-left">
            <button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer uppercase w-full outline-none"
            >
              CONTACTO
            </button>
          </li>


        </ul>
      </nav>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}