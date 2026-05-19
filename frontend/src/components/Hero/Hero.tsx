import { Button } from "../Button";
import { ScrollReveal } from "../ScrollReveal";

export const Hero = () => {
  return (
<ScrollReveal as={"section"} className="-mt-px relative min-h-140 md:h-140.5 overflow-hidden flex items-center bg-[url('/images/HomeHero.png')] bg-cover bg-center overflow-hidden">      


      <div className="absolute w-full h-full inset-0 bg-linear-to-r from-blue-200/95 from-0% via-blue-200/70 via-35% to-transparent to-70% z-0"></div>

      <div className="relative h-full flex flex-col justify-center text-white max-w-350 w-full mx-auto px-5 sm:px-8 md:px-10 2xl:max-w-550 2xl:px-9 text-left z-10 reveal-element">

        <p className="w-fit flex flex-col items-center justify-center text-orange-500 tracking-[0.2em] text-[0.85rem] sm:text-[0.95rem] uppercase mb-4 border border-orange-500/30 rounded-sm font-bold backdrop-blur-sm shadow-lg py-1.5 px-4">
          Firma Consultora de Élite
        </p>
        <h1 className="font-bold text-[2.5rem] sm:text-[3rem] md:text-[3.6rem] lg:text-[3.4rem] leading-[1.05] drop-shadow-2xl w-full md:max-w-225 tracking-tight">
          ESTRATEGIA CORPORATIVA <br /> Y TRIBUTARIA DEL <br /><span className="text-orange-500 tracking-wider ">MÁS ALTO NIVEL.</span>
        </h1>

        <p className="text-[1.05rem] sm:text-[1.15rem] md:text-[1.25rem] mt-6 mb-8 font-light max-w-175 text-gray-200 leading-relaxed drop-shadow-md">
          Transformamos la complejidad regulatoria en ventajas competitivas. Protegemos su patrimonio y optimizamos su rentabilidad con estrategias sólidas.
        </p>

        <div className="flex gap-4 sm:gap-7 items-center">
          <Button texto="AGENDAR ASESORÍA" estilosPersonalizados="bg-orange-500 cursor-pointer text-white text-[0.95rem] sm:text-[1.05rem] font-bold tracking-wider uppercase px-8 py-4 shadow-2xl rounded-sm w-full sm:w-auto transition-all hover:bg-white hover:text-orange-600 duration-300"/>
            
        </div>
      </div>
    </ScrollReveal>
  );
};