import React from 'react'
import { AuditoriaCard } from "./AuditoriaCard"

interface autProps {
  icon: string,
  title: string,
  content: string,
}

const aut: autProps[] = [
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
    // Agregamos flex-col para móviles y flex-row para desktop (md). Ajustamos el padding vertical.
    <div className="flex flex-col md:flex-row bg-gray-800 py-12 md:py-20 gap-12 md:gap-0">
      
      {/* Columna Izquierda */}
      <div className="flex flex-col gap-10 w-full md:w-[50%]">
        <div className="border-l-4 border-l-orange-500 px-4 md:px-8 ml-6 md:ml-20">
          <h2 className="text-blue-200 text-[1.6rem] md:text-[2rem] font-bold tracking-wide w-full md:w-[70%]">
            Autoridad en Planificación Fiscal
          </h2>
          {/* Eliminé el "w-[]" que es inválido en Tailwind */}
          <p className="mt-3 text-blue-200 font-light text-justify w-full md:pr-10">
            En MHORIZON, redefinimos la consultoría tributaria al trascender el
            cumplimiento básico. A través de un enfoque verdaderamente holístico,
            combinamos una profunda inteligencia regulatoria con una visión corporativa
            a largo plazo.
          </p>
        </div>
        
        <div className="bg-blue-200 rounded-br-sm rounded-tr-sm py-5 shadow-2xl mt-2 md:mt-10 w-[90%] md:w-[96%]">
          <p className="text-white italic font-extralight px-6 md:px-20 text-[1.2rem] md:text-[1.4rem]">
            Creando oportunidades estratégicas.
          </p>
        </div>
      </div>

      {/* Columna Derecha (Tarjetas) */}
      <div className='grid grid-cols-1 gap-6 mx-6 md:mx-20 w-auto md:w-[50%]'>
        {
          aut.map((auditoria: autProps) => (
            <AuditoriaCard key={auditoria.title} {...auditoria} />
          ))
        }
      </div>
    </div>
  )
}