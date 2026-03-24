import { MethodCard } from "./MethodCard"

interface methodProp{
    fase: string,
    title: string,
    content: string
}

const method : methodProp[] = [
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
    <div className="px-20 mt-10">
        <div className="flex gap-50 items-center mb-10">
            <div className="w-[48%]">
                <h2 className="font-bold text-[1.65rem]">Nuestra metodología</h2>
                <p className="mt-5 text-blue-200/70 w-[580px]">
                    Combinamos el pensamiento analítico riguroso con la resolución creativa de problemas 
                    para ofrecer un impacto medible en cada etapa del ciclo de vida del negocio. 
                </p>
            </div>
            <div className="text-orange-500/30 w-[52%]">
                <p className="text-[7rem] font-bold w-full">01 - 03</p>
            </div>
        </div>
        <div className="grid grid-cols-3 gap-14 mb-15">
            {
                method.map((met: methodProp)=>(
                    <MethodCard key={met.title} {...met} />
                ))
            }
        </div>
    </div>
  )
}
