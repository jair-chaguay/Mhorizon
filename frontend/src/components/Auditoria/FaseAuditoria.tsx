import React from 'react'
import { FaseCard } from "./FaseCard"

interface faseProps {
    num: string,
    fase: string,
    title: string,
    content: string
}

const fases: faseProps[] = [
    {
        num: "01",
        fase: "Fase 01",
        title: "Diagnóstico de Escaneo Profundo",
        content: "Utilizamos algoritmos patentados impulsados por inteligencia artificial para procesar y categorizar patrones de datos históricos en todas las entidades globales de forma simultánea.",
    },

    {
        num: "03",
        fase: "Fase 03",
        title: "Perspectivas de Rendimiento",
        content: "Transformamos los hallazgos de la auditoría en oportunidades estratégicas para la optimización del capital y la reducción de costos.",
    }
]

export const FaseAuditoria = () => {
    return (
        <section className='bg-blue-200 py-12 md:py-16 mt-10'>
            <div className='max-w-6xl mx-auto px-6 md:px-12 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-15'>
                
                <div className="col-span-1 lg:col-span-2 space-y-6 lg:space-y-10">
                    {
                        fases.map((fase: faseProps) => (
                            <FaseCard key={fase.title} {...fase} />
                        ))
                    }
                </div>

                <div className="relative bg-white rounded-md py-6 px-8 md:px-10 w-full md:max-w-sm lg:max-w-none lg:w-[250px] mx-auto lg:mx-0 overflow-hidden flex flex-col justify-between shadow-xl lg:shadow-none">
                    <div className="relative z-10">
                        <p className="text-[0.95rem] text-blue-200/70 font-light">Fase 02</p>
                        <h3 className="text-xl font-bold text-blue-200">
                            Cumplimiento Estructural
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Mapeamos sus controles internos frente a marcos internacionales
                            (NIIF/GAAP) para asegurar una solidez legal total.
                        </p>

                        <ul className="list-disc pl-5 mt-4 space-y-2 text-sm text-blue-200 marker:text-orange-500 mb-16 lg:mb-20">
                            <li>Mapeo Regulatorio</li>
                            <li>Verificación Forense</li>
                            <li>Prueba de Control</li>
                        </ul>
                    </div>
                    
                    <div className="absolute -bottom-16 md:-bottom-20 -left-4 md:-left-6 opacity-30">
                        <span className="text-[120px] md:text-[160px] font-bold leading-none text-gray-300 md:text-blue-200">
                            02
                        </span>
                    </div>
                </div>

            </div>
        </section>
    )
}