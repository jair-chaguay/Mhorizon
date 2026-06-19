import { ScrollReveal } from "../ScrollReveal"

export const Experiencia = () => {
    return (
        <ScrollReveal as={"section"} className="relative h-112.5 sm:h-125 bg-[url('/images/Experiencia.avif')] bg-cover bg-fixed bg-center flex items-center">
            <div className="absolute inset-0 bg-linear-to-r from-blue-200/95 via-blue-200/80 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full relative z-10 reveal-element">
                <div className="bg-white/10 border-l-4 border-l-orange-500 px-8 py-10 sm:py-12 md:py-14 w-full md:w-[60%] lg:w-[50%] rounded-r-xl backdrop-blur-md shadow-2xl">
                    <h2 className="text-white font-bold text-[1.8rem] sm:text-[2.2rem] leading-tight">
                        EXPERIENCIA QUE ESCALA <br/><span className="text-orange-500">CON SU AMBICIÓN.</span>
                    </h2>

                    <p className="text-gray-300  mt-6 text-[1.05rem] sm:text-[1.15rem] leading-relaxed">
                        "En <span className="font-bold text-white">MHORIZON</span> nos encargamos de proporcionar la claridad estratégica que necesita su negocio para navegar una reestructuración corporativa compleja, resultando en una optimización inmediata."
                    </p>
                    
                    <p className="text-orange-500 font-bold uppercase tracking-widest text-[0.8rem] mt-6">
                        — Equipo MHORIZON
                    </p>
                </div>
            </div>

        </ScrollReveal>
    )
}