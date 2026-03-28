import { Button } from "../Button"
import { HeroExCard } from "./HeroExCard"

interface HeroProps {
    img: string
    title: string
    content: string
}

const hero: HeroProps[] = [
    {
        img: "/images/Recurso32.png",
        title: "Dominancia del mercado",
        content: "Ampliación de la huella global a través de la visión basada en datos. Fabricación de ventajas."
    },
    {
        img: "/images/Recurso33.png",
        title: "Agilidad operativa",
        content: "Optimización de los procesos principales para lograr la máxima eficiencia."
    },
    {
        img: "/images/Recurso34.png",
        title: "Aceleración del crecimiento",
        content: "Hoja de ruta estratégica para un valor sostenido a largo plazo."
    }
]

export const HeroEx = () => {
    return (
        <section className="px-5 sm:px-8 md:px-20 flex flex-col md:flex-row gap-10 md:gap-6 items-center relative h-auto md:h-[500px] bg-[url('/images/Recurso35.png')] bg-cover bg-center py-12 md:py-0">

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent"></div>

            <div className="relative z-10 w-full md:w-auto">
                <h3 className="bg-blue-200 text-white text-[0.72rem] sm:text-[0.75rem] font-light p-1 text-center w-[170px] md:w-[180px] rounded-sm">
                    EXCELENCIA EMPRESARIAL
                </h3>

                <h1 className="text-white font-extrabold text-[2rem] sm:text-[2.4rem] md:text-[2.9rem] text-shadow-lg w-full md:w-[500px] mt-5 leading-tight">
                    Consultoría{" "}
                    <span className="text-orange-500">
                        <span className="underline underline-offset-10 md:underline-offset-12 decoration-4 decoration-orange-500">
                            Emp
                        </span>
                        resarial
                    </span>
                </h1>

                <p className="text-white font-light mt-5 text-[1rem] sm:text-[1.1rem] md:text-[1.2rem] w-full md:w-[510px] leading-relaxed">
                    Impulsar el crecimiento institucional mediante una estrategia empresarial
                    sofisticada, excelencia operativa y liderazgo transformador.
                </p>

                <Button
                    text="Agenda una asesoría"
                    styles="bg-orange-500 text-white font-medium mt-6 w-full sm:w-[220px] rounded-sm"
                />
            </div>

            <div className="relative z-10 w-full md:w-auto">
                <div className="flex flex-col gap-6 bg-white/50 shadow-2xl rounded-md p-5 sm:p-7 md:p-10 w-full md:w-[80%] md:ml-20">
                    {
                        hero.map((heroPr: HeroProps) => (
                            <HeroExCard key={heroPr.title} {...heroPr} />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}