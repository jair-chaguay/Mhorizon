export const Footer = () => {
  return (
    <footer className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 py-10">
      <div>
        <img
          className="w-40 sm:w-45 md:w-50"
          src="/images/MHORIZONBOCETO.png"
          alt="MHORIZON"
        />
      </div>

      <ul className="flex flex-wrap justify-center gap-y-3 gap-x-4 sm:gap-x-6 mt-6 text-[0.85rem] sm:text-[0.93rem]">
        <li className="text-white opacity-70 hover:opacity-100 sm:pr-4">
          <a href="">INICIO</a>
        </li>
        <li className="text-white opacity-70 hover:opacity-100 sm:pr-4">
          <a href="">CONSULTORÍA</a>
        </li>
        <li className="text-white sm:pr-4">
          <a href="">OUTSOURCING</a>
        </li>
        <li className="text-white">
          <a href="">AUDITORÍA</a>
        </li>
      </ul>
      <ul className="flex gap-4 sm:gap-8 my-6 pb-9">
        <li>
          <a href="">
            <img className="size-7 sm:size-8 opacity-70 hover:opacity-100" src="/images/fb.png" alt="Facebook" />
          </a>
        </li>
        <li>
          <a href="">
            <img className="size-7 sm:size-8 opacity-70 hover:opacity-100" src="/images/ig.png" alt="Instagram" />
          </a>
        </li>
        <li>
          <a href="">
            <img className="size-7 sm:size-8 opacity-70 hover:opacity-100" src="/images/in.png" alt="LinkedIn" />
          </a>
        </li>
        <li>
          <a href="">
            <img className="size-7 sm:size-8 opacity-70 hover:opacity-100" src="/images/tk.png" alt="TikTok" />
          </a>
        </li>
      </ul>
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6 w-full max-w-6xl text-center md:text-left">
        <p className="text-white/70 text-[0.75rem] sm:text-[0.80rem]">
          © 2026 MHORIZON. TODOS LOS DERECHOS RESERVADOS 
        </p>
        <p className="text-white/70 text-[0.75rem] sm:text-[0.80rem]">
          TÉRMINOS DE USO | POLÍTICAS DE PRIVACIDAD
        </p>
      </div>
    </footer>
  );
};