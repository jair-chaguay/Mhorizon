import { Button } from "../Button"
import { ScrollReveal } from "../ScrollReveal"
import { HeroExCard } from "./HeroExCard"

interface HeroProps {
    img: string
    title: string
    content: string
}

const hero: HeroProps[] = [

    {
        img: "/images/DominacionFinanciera.png",
        title: "Dominancia financiera",
        content: "Mejoramiento de la huella corporativa a través de estrategias basadas en datos financieros."
    },
    {
        img: "/images/AgilidadCorporativa.png",
        title: "Agilidad operativa",
        content: "Reestructuración de los procesos principales para lograr la máxima eficiencia y reducción de costos."
    },
    {
        img: "/images/Aceleracion.png",
        title: "Aceleración del crecimiento",
        content: "Hoja de ruta estratégica para un valor sostenido a largo plazo ante accionistas y organismos de control."
    }
]

export const HeroEx = () => {
    return (
        <ScrollReveal as={"section"} className="px-5 sm:px-8 md:px-20 flex flex-col md:flex-row gap-10 md:gap-10 items-center relative h-auto min-h-137.5 bg-[url('/images/ConsultoriaHero.jpeg')] bg-cover bg-center py-16 md:py-0">

            <div className="absolute inset-0 bg-linear-to-r from-[#0f172a]/95 via-[#0f172a]/70 to-[#0f172a]/30"></div>

            <div className="relative z-10 w-full md:w-[50%] lg:w-[60%] reveal-element">
                <h3 className="inline-block bg-white/10 text-orange-500 border border-orange-500/30 px-4 py-1 text-center rounded-sm text-[0.75rem] md:text-[0.85rem] font-medium tracking-widest uppercase mb-4 backdrop-blur-sm">
                    EXCELENCIA EMPRESARIAL
                </h3>

                <h1 className="text-white drop-shadow-lg text-[2.3rem] sm:text-[2.8rem] md:text-[2.8rem] font-bold w-full tracking-tight leading-[1.1]">
                    CONSULTORÍA EMPRESARIAL
                    
                </h1>

                <p className="text-gray-300 font-light mt-6 text-[1.05rem] sm:text-[1.15rem] md:text-[1.2rem] w-full md:w-[90%] leading-relaxed">
                    Transformamos la estructura de su organización para asegurar resiliencia, eficiencia operativa y un dominio sostenible en el mercado ecuatoriano y global.
                </p>

                <Button texto="Agendar asesoría" estilosPersonalizados="cursor-pointer bg-orange-500 text-white font-bold tracking-wider uppercase mt-8 py-4 px-8 w-full sm:w-auto rounded-md hover:bg-white hover:text-orange-600 shadow-xl hover:shadow-2xl transition-all duration-300"/>

            </div>

            <div className="relative z-10 w-full md:w-[50%] lg:w-[40%] flex justify-end reveal-element delay-200">
                <div className="flex flex-col gap-6 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-xl p-6 sm:p-8 md:p-10 w-full max-w-112.5">
                    {
                        hero.map((heroPr: HeroProps) => (
                            <HeroExCard key={heroPr.title} {...heroPr} />
                        ))
                    }
                </div>
            </div>

        </ScrollReveal>
    )
}