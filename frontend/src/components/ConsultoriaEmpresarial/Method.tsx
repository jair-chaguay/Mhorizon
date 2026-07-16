import { ScrollReveal } from "../ScrollReveal"
import { MethodCard } from "./MethodCard"

interface methodProp {
    fase: string
    title: string
    content: string
}

const method: methodProp[] = [
    {
        fase: "1",
        title: "DIAGNÓSTICO & PROPUESTA",
        content: "Revisamos la situación financiera, los procesos y las principales brechas de información o control relacionadas con el alcance contratado.  "
    },
    {
        fase: "2",
        title: "DISEÑO DE SOLUCIONES",
        content: "Diseñamos alternativas de trabajo alineadas con las necesidades, recursos y objetivos de la empresa."
    },
    {
        fase: "3",
        title: "IMPLEMENTACIÓN Y SEGUIMIENTO",
        content: "Acompañamos la implementación de controles, procesos o herramientas y definimos indicadores cuando el proyecto lo requiere."
    }
]

export const Method = () => {
    return (
        <section className="bg-white py-20 border-b border-gray-200">
            <ScrollReveal className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start lg:items-center mb-16 reveal-element">
                    <div className="w-full lg:w-[60%]">
                        <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
                            Marco de Trabajo
                        </span>


                        <div className="relative pl-6 flex items-center">
                            <div className="absolute left-0 w-1 h-1/2 bg-orange-500 rounded-full"></div>
                            <h2 className="font-bold text-[2rem] sm:text-[2.5rem] md:text-[2.8rem] text-blue-200 leading-tight">
                                NUESTRA <br />
                                METODOLOGÍA
                            </h2>
                        </div>
                        <p className="mt-6 text-gray-600 text-[1.05rem] sm:text-[1.1rem] leading-relaxed">
                            Combinamos el pensamiento analítico riguroso con la ejecución táctica para ofrecer un impacto financiero y operativo medible en cada etapa del ciclo de vida de su negocio.
                        </p>
                    </div>

                    <div className="w-full lg:w-[40%] flex justify-start lg:justify-end">
                        <p className="text-[5rem] sm:text-[6rem] md:text-[7rem] font-black text-gray-100 leading-none select-none">
                            01<span className="text-orange-500/50">-</span>03
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {
                        method.map((met: methodProp) => (
                            <MethodCard key={met.title} {...met} />
                        ))
                    }
                </div>
            </ScrollReveal>
        </section>
    )
}