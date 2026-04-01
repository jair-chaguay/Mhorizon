import { ScrollReveal } from "../ScrollReveal"

export const HeroSubNov = () => {
    return (
        <ScrollReveal as={"section"} className="relative flex items-center px-5 sm:px-8 md:px-20 w-full min-h-137.5 bg-[url('/images/Recurso05.avif')] bg-cover bg-center overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-blue-200/95 via-blue-200/80 to-transparent">
            </div>
            <div className="relative z-10 w-full md:w-[75%] lg:w-[65%] pt-10 pb-20 reveal-element">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="inline-block bg-white/10 text-orange-500 border border-orange-500/30 px-4 py-1 text-center rounded-sm text-[0.75rem] font-bold tracking-widest uppercase backdrop-blur-sm">
                        TRIBUTARIO
                    </span>
                    <span className="text-gray-300 text-[0.85rem] font-medium tracking-wide flex items-center gap-2">
                        <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        27 DE FEBRERO, 2026
                    </span>
                </div>

                <h1 className="text-white drop-shadow-lg text-[2.4rem] sm:text-[3rem] md:text-[3.8rem] font-extrabold w-full tracking-tight leading-[1.05]">
                    Actualización SRI: Nuevos <br className="hidden md:block" />
                    <span className="text-orange-500">Porcentajes de Retención 2026</span>
                </h1>

                <p className="text-gray-300 mt-6 text-[1.05rem] sm:text-[1.15rem] leading-relaxed max-w-2xl">
                    Análisis técnico sobre la Resolución NAC-00000009 que redefine el cumplimiento tributario para el presente ejercicio fiscal y su impacto directo en la caja corporativa.
                </p>
            </div>
        </ScrollReveal>
    )
}