import { MethodCard } from "./MethodCard"

interface methodProp {
    fase: string
    title: string
    content: string
}

const method: methodProp[] = [
    {
        fase: "Fase 01",
        title: "AUDITORÍA & PROPUESTA",
        content: "Profundizar en las estructuras organizativas, la salud financiera y el posicionamiento en el mercado."
    },
    {
        fase: "Fase 02",
        title: "ARQUITECTURA ESTRATÉGICA",
        content: "Diseñar modelos operativos a medida que alineen la asignación de recursos con objetivos de crecimiento de alto impacto."
    },
    {
        fase: "Fase 03",
        title: "EJECUCIÓN Y ESCALA",
        content: "Apoyo práctico en la implementación y monitorización continua para asegurar que se cumplan los objetivos."
    }
]

export const Method = () => {
    return (
        <div className="px-5 sm:px-8 md:px-20 mt-14 md:mt-10 py-6 md:py-0">
            <div className="flex flex-col md:flex-row gap-10 md:gap-50 items-start md:items-center mb-12 md:mb-10">
                <div className="w-full md:w-[48%]">
                    <h2 className="font-bold text-[1.8rem] sm:text-[2rem] md:text-[1.65rem] text-center md:text-left">
                        Nuestra metodología
                    </h2>

                    <p className="mt-5 text-blue-200/70 w-full md:w-[580px] text-[1rem] sm:text-[1.05rem] md:text-base text-center md:text-left leading-relaxed">
                        Combinamos el pensamiento analítico riguroso con la resolución creativa de problemas
                        para ofrecer un impacto medible en cada etapa del ciclo de vida del negocio.
                    </p>
                </div>

                <div className="text-orange-500/30 w-full md:w-[52%] flex justify-center md:justify-start">
                    <p className="text-[4rem] sm:text-[5rem] md:text-[7rem] font-bold w-full text-center md:text-left leading-none">
                        01 - 03
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-14 mb-15">
                {
                    method.map((met: methodProp) => (
                        <MethodCard key={met.title} {...met} />
                    ))
                }
            </div>
        </div>
    )
}