import { ScrollReveal } from "../ScrollReveal"

export const HeroNovedades = () => {
    return (
        <ScrollReveal as={"section"} className="relative flex items-center px-5 sm:px-8 md:px-20 w-full min-h-117.5 bg-[url('/images/InformativosHero.avif')] bg-cover bg-center overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-blue-200/95 via-blue-200/80 to-transparent">
            </div>
            <div className="relative z-10 w-full md:w-[75%] lg:w-[75%] pt-2 reveal-element">
                <p className="inline-block bg-white/10 text-orange-500 border border-orange-500/30 px-4 py-2 text-center rounded-sm text-[0.75rem] font-bold tracking-widest uppercase mb-4 backdrop-blur-sm">
                    BOLETINES & ACTUALIZACIONES
                </p>

                <h1 className="text-white drop-shadow-lg text-[2.6rem] sm:text-[3rem] md:text-[3rem] font-bold w-full tracking-tight leading-[1.05]">
                    ANÁLISIS PARA MEJORES DECISIONES
                </h1>

                <p className="text-gray-200 mt-6 text-[1.05rem] sm:text-[1.15rem] md:text-[1.25rem] w-full leading-relaxed drop-shadow-md text-left font-light max-w-2xl">
                    Publicamos actualizaciones tributarias, financieras y regulatorias y explicamos su impacto práctico en las empresas.
                </p>

            </div>
        </ScrollReveal>
    )
}