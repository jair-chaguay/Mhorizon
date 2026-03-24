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
        <div className="flex gap-20 mx-20 ">
            <div className="bg-blue-200 flex flex-col items-center justify-center rounded-md
            p-18 w-[40%] ml-20">
                <img src="/images/Recurso43.png" alt="Recurso43" />
            </div>
            <div className="w-[50%]">
                <h2 className="text-blue-200 font-bold text-[1.7rem]">
                    Cumplimiento normativo
                </h2>
                <p className="text-blue-200 font-light mt-5 text-[1.14rem]">
                    En un entorno de transparencia fiscal total (OECD/BEPS), el cumplimiento normativo
                    es la base de la reputación corporativa. Actuamos como su escudo institucional
                    frente a las autoridades.
                </p>

                <div className="grid grid-cols-1 gap-6 mt-4 w-[90%]">
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
