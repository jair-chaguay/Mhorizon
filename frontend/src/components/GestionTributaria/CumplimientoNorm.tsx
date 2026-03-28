import React from 'react'
import { CumplimientoCard } from "./CumplimientoCard"

interface cumplimientoProp {
    title: string,
    content: string
}

const normativos: cumplimientoProp[] = [
    {
        title: "Auditoría Preventiva",
        content: "Detección proactiva de inconsistencias antes de notificaciones oficiales."
    },
    {
        title: "Informes de Transparencia",
        content: "Preparación técnica de reportes país por país y archivos maestros."
    }
]

export const CumplimientoNorm = () => {
    return (
        // Cambiamos mx-20 por paddings (px) y pasamos a flex-col en móvil
        <div className="flex flex-col md:flex-row gap-10 md:gap-12 lg:gap-20 px-6 md:px-12 lg:px-20 py-12 md:py-20 items-center md:items-start">
            
            {/* Contenedor de la Imagen */}
            {/* Quitamos el ml-20 en móvil para que no se salga de la pantalla, w-full para aprovechar espacio */}
            <div className="bg-blue-200 flex flex-col items-center justify-center rounded-md p-10 md:p-16 w-full md:w-[45%] lg:w-[40%] lg:ml-10">
                <img 
                    className="w-full max-w-[200px] md:max-w-full object-contain" 
                    src="/images/Recurso43.png" 
                    alt="Recurso43" 
                />
            </div>
            
            {/* Contenedor del Texto */}
            <div className="w-full md:w-[55%] lg:w-[50%] mt-2 md:mt-0">
                <h2 className="text-blue-200 font-bold text-[1.5rem] md:text-[1.7rem] text-center md:text-left">
                    Cumplimiento normativo
                </h2>
                <p className="text-blue-200 font-light mt-4 md:mt-5 text-[1rem] md:text-[1.14rem] text-justify md:text-left">
                    En un entorno de transparencia fiscal total (OECD/BEPS), el cumplimiento normativo
                    es la base de la reputación corporativa. Actuamos como su escudo institucional
                    frente a las autoridades.
                </p>

                {/* Grid de las Tarjetas */}
                <div className="grid grid-cols-1 gap-4 md:gap-6 mt-8 w-full md:w-[90%]">
                    {
                        normativos.map((prop: cumplimientoProp) => (
                            <CumplimientoCard key={prop.title} {...prop} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}