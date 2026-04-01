import { ScrollReveal } from "../ScrollReveal"

export const HeroCalculadora = () => {
    return (
        <ScrollReveal as={"section"} className="relative flex items-center px-5 sm:px-8 md:px-20 w-full min-h-137.5 bg-[url('/images/Recurso03.jpeg')] bg-cover bg-center overflow-hidden">

            <div className="absolute inset-0 bg-linear-to-r from-blue-200/95 via-blue-200/70 to-transparent">
            </div>

            <div className="relative z-10 w-full md:w-[75%] lg:w-[60%] pt-0 reveal-element">
                <p className="inline-block bg-white/10 text-orange-500 border border-orange-500/30 px-4 py-1 text-center rounded-sm text-[0.75rem] fon-medium tracking-widest uppercase mb-4 backdrop-blur-sm">
                    HERRAMIENTAS PROFESIONALES
                </p>
                <h1 className="text-white drop-shadow-lg text-[2.6rem] sm:text-[3rem] md:text-[4rem] font-bold w-full tracking-tight leading-[1.05]">
                    Simulador Fiscal <br className="hidden md:block" />
                    <span className="text-orange-500">Avanzado</span>
                </h1>

                <p className="text-gray-200 mt-6 text-[1.05rem] sm:text-[1.15rem] md:text-[1.3rem] w-full leading-relaxed drop-shadow-md text-left max-w-2xl">
                    Proyecte el impacto tributario de su empresa para el ejercicio actual con nuestro análisis algorítmico de alta precisión, desarrollado por especialistas corporativos.
                </p>

            </div>
        </ScrollReveal>
    )
}