import { AuditoriaCard } from "./AuditoriaCard"

interface autProps{
    icon: string,
    title: string,
    content: string,
}

const aut : autProps[] = [
    {
        icon: "/images/Recurso40.png",
        title: "Compliance Total",
        content: "Aseguramos la integridad de sus operaciones frente a marcos normativos internacionales, mitigando riesgos antes de que surjan.",
    },
    {
        icon: "/images/Recurso41.png",
        title: "Optimización estructural",
        content: "Analizamos y rediseñamos arquitecturas fiscales para maximizar la eficiencia en la cadena de valor global de su organización.",
    }
]

export const AuditoriaPlan = () => {
  return (
    <div className="flex bg-gray-800 py-20">
        <div className="flex flex-col gap-10 w-[50%]">
            <div className="border-l-4 border-l-orange-500 px-8 ml-20">
                <h2 className="text-blue-200 text-[2rem] font-bold tracking-wide w-[70%]">
                    Autoridad en Planificación Fiscal
                </h2>
                <p className="mt-3 text-blue-200 font-light text-justify w-[]">
                    En MHORIZON, redefinimos la consultoría tributaria al trascender el 
                    cumplimiento básico. A través de un enfoque verdaderamente holístico, 
                    combinamos una profunda inteligencia regulatoria con una visión corporativa 
                    a largo plazo. 
                </p>
            </div>
            <div className="bg-blue-200 rounded-br-sm rounded-tr-sm py-5 shadow-2xl mt-10 w-[96%]">
                <p className="text-white italic font-extralight px-20 text-[1.4rem]">
                    Creando oportunidades estratégicas.
                </p>
            </div>
        </div>
        <div className='grid grid-cols-1 gap-6 mx-20 w-[50%]'>
            {
                aut.map((auditoria: autProps) => (
                    <AuditoriaCard key={auditoria.title} {...auditoria}/>
                ))
            }
        </div>
    </div>
  )
}
