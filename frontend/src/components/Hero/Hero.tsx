import { ScrollReveal } from "../ScrollReveal";

export const Hero = () => {
  return (
    <ScrollReveal as={"section"} className="relative min-h-150 md:h-162.5 bg-[url('/images/Recurso06.avif')] bg-cover bg-center overflow-hidden flex items-center">

      <div className="absolute inset-0 bg-linear-to-r from-blue-200/95 via-blue-200/70 to-transparent"></div>

      <div className="relative h-full flex flex-col justify-center text-white max-w-350 w-full mx-auto px-5 sm:px-8 md:px-12 text-left z-10 reveal-element">

        <p className="w-fit text-orange-500 tracking-[0.2em] text-[0.85rem] sm:text-[0.95rem] uppercase mb-4 border border-orange-500/30 rounded-sm font-medium backdrop-blur-sm shadow-lg py-1 px-4">
          Firma Consultora de Élite
        </p>
        <h1 className="font-bold text-[2.5rem] sm:text-[3rem] md:text-[3.8rem] lg:text-[4.5rem] leading-[1.05] drop-shadow-2xl w-full md:max-w-225 tracking-tight">
          ESTRATEGIA CORPORATIVA Y TRIBUTARIA DEL <span className="text-orange-500">MÁS ALTO NIVEL.</span>
        </h1>

        <p className="text-[1.05rem] sm:text-[1.15rem] md:text-[1.25rem] mt-6 mb-8 font-light max-w-175 text-gray-200 leading-relaxed drop-shadow-md">
          Transformamos la complejidad regulatoria en ventajas competitivas. Blindamos su patrimonio y optimizamos su rentabilidad con estrategias sólidas ante el SRI y la SCVS en Ecuador.
        </p>

        <div className="flex gap-4 sm:gap-7 items-center">
          <a href="#calculadora" className="w-full sm:w-auto cursor-pointer">
            <button className="bg-orange-500 text-white text-[0.95rem] sm:text-[1.05rem] font-bold tracking-wider uppercase px-8 py-4 shadow-2xl rounded-sm w-full sm:w-auto transition-all hover:bg-white hover:text-orange-600 duration-300">
              EVALUAR MI ESCENARIO
            </button>
          </a>
        </div>
      </div>
    </ScrollReveal>
  );
};