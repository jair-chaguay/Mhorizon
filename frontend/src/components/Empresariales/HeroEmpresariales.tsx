import { Button } from "../Button"
import { ScrollReveal } from "../ScrollReveal"

export const HeroEmpresariales = () => {

    return (
        <ScrollReveal as={"section"} className="relative flex items-center px-5 sm:px-8 md:px-20 w-full min-h-137.5 md:h-138.5 bg-[url('/images/EmpresarialesHero.webp')] bg-cover bg-center overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-blue-200/95 via-blue-200/80 to-blue-200/20"></div>

            <div className="relative z-10 w-full md:w-[78%] lg:w-[70%] pt-4 reveal-element">
                <p className="inline-block bg-white/10 text-orange-500 border border-orange-500/30 px-4 py-2 text-center rounded-sm text-[0.75rem] font-bold tracking-widest uppercase mb-4 backdrop-blur-sm">
                    ESPECIALIZACIÓN SECTORIAL
                </p>

                <h1 className="text-white  drop-shadow-lg text-[2.6rem] sm:text-[3rem] md:text-[3.3rem] font-bold w-full tracking-tight leading-[1.05]">
                    SERVICIOS EMPRESARIALES
                </h1>

                <p className="text-gray-200 mt-6 text-[1.05rem] sm:text-[1.15rem] md:text-[1.31rem] w-full leading-relaxed drop-shadow-md text-left font-light max-w-2xl">
                    Acompañamos a empresas B2B, de tecnología, salud e inmobiliarias mediante consultoría, cumplimiento y outsourcing adaptados a su operación.
                </p>

                <div className="mt-10 md:mt-12 flex">
                    <Button texto="AGENDAR ASESORÍA" estilosPersonalizados="bg-orange-500 text-white font-bold tracking-wider uppercase w-full sm:w-70 py-4 rounded-md hover:bg-white hover:text-orange-600 shadow-xl transition-all duration-300"/>
                </div>
            </div>

        </ScrollReveal>
    )
}