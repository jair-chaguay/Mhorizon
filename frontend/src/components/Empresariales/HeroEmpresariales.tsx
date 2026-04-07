import { ScrollReveal } from "../ScrollReveal"

export const HeroEmpresariales = () => {

    return (
        <ScrollReveal as={"section"} className="relative flex items-center px-5 sm:px-8 md:px-20 w-full min-h-137.5 md:h-162.5 bg-[url('/images/Recurso10.avif')] bg-cover bg-center overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-blue-200/95 via-blue-200/80 to-blue-200/20"></div>

            <div className="relative z-10 w-full md:w-[75%] lg:w-[60%] pt-10 reveal-element">
                <p className="inline-block bg-white/10 text-orange-500 border border-orange-500/30 px-4 py-1 text-center rounded-sm text-[0.75rem] font-bold tracking-widest uppercase mb-4 backdrop-blur-sm">
                    ESPECIALIZACIÓN SECTORIAL
                </p>

                <h1 className="text-white drop-shadow-lg text-[2.6rem] sm:text-[3rem] md:text-[4rem] font-bold w-full tracking-tight leading-[1.05]">
                    Servicios <br className="md:hidden" />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">Empresariales</span>
                </h1>

                <p className="text-gray-200 mt-6 text-[1.05rem] sm:text-[1.15rem] md:text-[1.3rem] w-full leading-relaxed drop-shadow-md text-left font-light max-w-2xl">
                    Brindamos planeación corporativa, cumplimiento normativo y outsourcing estratégico para empresas B2B, corporaciones de tecnología, sector salud y desarrollo inmobiliario.
                </p>

                <div className="mt-10 md:mt-12 flex">
                    <button id="agenda-hero-btn" className="bg-orange-500 text-white font-bold tracking-wider uppercase w-full sm:w-70 py-4 rounded-md hover:bg-white hover:text-orange-600 shadow-xl transition-all duration-300">
                        AGENDAR CONSULTORÍA
                    </button>
                </div>
            </div>

        </ScrollReveal>
    )
}