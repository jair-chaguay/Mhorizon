
import { ScrollReveal } from '../ScrollReveal';

export const HeroNosotros = () => {

    return (
        <ScrollReveal as={"section"} className="relative flex items-center px-5 sm:px-8 md:px-20 w-full min-h-137.5 md:h-162.5 bg-[url('/images/Recurso02.avif')] bg-cover bg-center overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-blue-200/95 via-blue-200/70 to-transparent"></div>


            <div className="relative z-10 w-full md:w-[85%] lg:w-[70%] pt-10 reveal-element">
                <div className="max-w-6xl">
                    <p className="inline-block bg-white/10 text-orange-500 border border-orange-500/30 px-4 py-1 text-center rounded-sm text-[0.75rem] font-medium tracking-widest uppercase mb-6 backdrop-blur-sm shadow-lg">
                        NUESTRA IDENTIDAD CORPORATIVA
                    </p>

                    <h1 className="text-white drop-shadow-2xl text-[2.6rem] sm:text-[3.2rem] md:text-[4.2rem] font-extrabold w-full tracking-tight leading-[1.05]">
                        Excelencia en Prácticas <br className="hidden lg:block" />
                        <span className="text-orange-500">Tributarias, Legales y Financieras.</span>
                    </h1>

                    <p className="text-gray-300 mt-6 text-[1.05rem] sm:text-[1.15rem] md:text-[1.25rem] w-full leading-relaxed drop-shadow-md text-left font-light max-w-3xl">
                        Con sede central en Guayaquil, somos la firma experta que transforma la complejidad regulatoria del mercado ecuatoriano en estrategias de crecimiento seguro, sostenible y auditable para su corporación.
                    </p>

                    <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-5">
                    <button id="agenda-hero-btn" className="bg-orange-500 text-white text-center font-bold tracking-wider uppercase w-full sm:w-70 py-4 rounded-sm hover:bg-white hover:text-orange-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        AGENDAR CONSULTORÍA
                    </button>
                </div>
                </div>
            </div>

        </ScrollReveal>
    )
}