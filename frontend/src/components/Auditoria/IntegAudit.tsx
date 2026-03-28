import React from 'react'
import { IntegCard } from "./IntegCard"

interface inteProps {
    image: string,
    title: string,
    content: string
}

const integridad: inteProps[] = [
    {
        image: "/images/Recurso50.png",
        title: "Protocolo de Transparencia",
        content: "Implementamos sistemas avanzados de verificación que van más allá de los métodos de muestreo tradicionales."
    },
    {
        image: "/images/Recurso51.png",
        title: "Mitigación de Riesgos", // Nota: Verifica si este título se repite o si era otro
        content: "Análisis predictivo diseñado para identificar debilidades estructurales antes de que se conviertan en pasivos financieros."
    }
]

export const IntegAudit = () => {
    return (
        <div className="py-12 md:py-20 bg-gray-800 px-6 md:px-12 lg:px-20">
            
            <div className="px-4 md:px-5 border-l-4 border-l-orange-500 w-full md:w-[70%] lg:w-[40%] mb-8 md:mb-10">
                <h1 className="text-blue-200 font-bold text-[1.5rem] md:text-[1.8rem]">
                    <span className="text-orange-500">Integridad</span> absoluta en cada registro contable.
                </h1>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                
                <div className="grid grid-cols-1 gap-6 md:gap-8 w-full lg:w-[55%]">
                    {
                        integridad.map((props: inteProps, index) => (
                            <IntegCard key={index} {...props} />
                        ))
                    }
                </div>
                
                <div className="w-full lg:w-[45%] flex justify-center lg:justify-end">
                    <img 
                        className="w-[80%] md:w-[60%] lg:w-full max-w-[400px] lg:max-w-none object-contain" 
                        src="/images/Recurso53.png" 
                        alt="Recurso53" 
                    />
                </div>
            </div>
        </div>
    )
}