import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 py-8">
      <div>
        <Link to={"/"} className="block w-40 sm:w-48 mb-2 transition-transform hover:scale-105 duration-300">
          <img src="/images/LOGOTIPO.svg" alt="" />
        </Link>
      </div>

      <ul className="flex flex-wrap justify-center gap-y-3 gap-x-4 sm:gap-x-6 mt-6 text-[0.85rem] sm:text-[0.93rem]">
        <li className="text-white opacity-70 hover:opacity-100 sm:pr-4">
          <Link to={"/soluciones/gestion-tributaria"}>ESTRATEGIA Y DEFENSA FISCAL</Link>
        </li>
        <li className="text-white opacity-70 hover:opacity-100 sm:pr-4">
          <Link to={"/soluciones/consultoria-empresarial"}>CONSULTORÍA EMPRESARIAL</Link>
        </li>
        <li className="text-white opacity-70 hover:opacity-100 sm:pr-4">
          <Link to={"/soluciones/outsourcing"}>OUTSOURCING BPO</Link>
        </li>
        <li className="text-white opacity-70 hover:opacity-100">
          <Link to={"/soluciones/auditoria"}>AUDITORÍA FINANCIERA</Link>
        </li>
      </ul>
      <ul className="flex gap-4 sm:gap-8 my-6 pb-18">
        <li>
          <a href="https://www.facebook.com/MhorizonEcuador/" target="_blank" rel="noopener noreferrer">
            <img className="size-7 sm:size-8 opacity-70 hover:opacity-100" src="/images/IconFb.png" alt="Facebook" />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/mhorizon.ec/" target="_blank" rel="noopener noreferrer">
            <img className="size-7 sm:size-8 opacity-70 hover:opacity-100" src="/images/IconIg.png" alt="Instagram" />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/company/mhorizon" target="_blank" rel="noopener noreferrer">
            <img className="size-7 sm:size-8 opacity-70 hover:opacity-100" src="/images/IconLinkedin.png" alt="LinkedIn" />
          </a>
        </li>
        <li>
          <a href="https://www.tiktok.com/@mhorizon.ec" target="_blank" rel="noopener noreferrer">
            <img className="size-7 sm:size-8 opacity-70 hover:opacity-100" src="/images/IconTk.png" alt="TikTok" />
          </a>
        </li>
      </ul>
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6 w-full max-w-6xl text-center md:text-left">
        <p className="text-white/70 text-[0.75rem] sm:text-[0.80rem]">
          © 2026 MHORIZON. TODOS LOS DERECHOS RESERVADOS 
        </p>
        <p className="text-white/70 text-[0.75rem] sm:text-[0.80rem]">
          <Link className="hover:text-white transition-colors duration-300" to={"/terminos-de-uso"}>TÉRMINOS DE USO</Link> | <Link className="hover:text-white transition-colors duration-300" to="/politicas-de-privacidad">POLÍTICAS DE PRIVACIDAD</Link>
        </p>
      </div>
    </footer>
  );
};