import { Button } from "../Button"
import { ScrollReveal } from "../ScrollReveal"

export const HeroGestion = () => {

  return (
    <ScrollReveal as={"section"} className="px-5 sm:px-8 md:px-20 flex gap-6 items-center relative min-h-137.5 bg-[url('/images/HeroEstrategia.webp')] bg-cover bg-center overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent"></div>

      <div className="relative z-10 w-full pt-10 reveal-element">
        <p className="inline-block bg-white/10 text-orange-500 border border-orange-500/30 px-4 py-1 text-center rounded-sm text-[0.75rem] md:text-[0.85rem] font-bold tracking-widest uppercase mb-4 backdrop-blur-sm">
          INTELIGENCIA TRIBUTARIA
        </p>

        <h1 className="text-white drop-shadow-lg text-[2.4rem] sm:text-[2.8rem] md:text-[3.3rem] font-bold w-full md:w-200px tracking-tight leading-[1.1]">
          ESTRATEGIA Y DEFENSA FISCAL
        </h1>

        <p className="text-gray-300 font-light mt-6 text-[1.05rem] sm:text-[1.15rem] md:text-[1.2rem] w-full md:w-[70%] lg:w-[55%] leading-relaxed">
          Aseguramos el estricto cumplimiento normativo frente al SRI y optimizamos su carga fiscal corporativa mediante una planificación estratégica de clase mundial, mitigando contingencias antes de que ocurran.
        </p>

        <div className="mt-10 md:mt-12">
          <Button texto="Agendar asesoría" estilosPersonalizados="cursor-pointer bg-orange-500 text-white font-bold tracking-wider uppercase w-full md:w-[280px] py-4 rounded-md hover:bg-white hover:text-orange-600 shadow-xl hover:shadow-2xl transition-all duration-300"/>
        </div>
      </div>

    </ScrollReveal>
  )
}