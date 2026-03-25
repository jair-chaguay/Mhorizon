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
        <section className=' bg-blue-200 py-16 mt-10'>
            <div className='max-w-6xl mx-auto grid grid-cols-3 gap-15'>
                <div className="col-span-2 space-y-10">
                    {
                        fases.map((fase: faseProps) => (
                            <FaseCard key={fase.title} {...fase} />
                        ))
                    }
                </div>
                <div className="relative bg-white rounded-md py-6 px-10 w-[250px] overflow-hidden flex flex-col justify-between">
                    <div>
                        <p className="text-[0.95rem] text-blue-200/70 font-light">Fase 02</p>
                        <h3 className="text-xl font-bold text-blue-200">
                            Cumplimiento Estructural
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Mapeamos sus controles internos frente a marcos internacionales
                            (NIIF/GAAP) para asegurar una solidez legal total.
                        </p>

                        <ul className="list-disc pl-5 mt-4 space-y-2 text-sm text-blue-200
                     marker:text-orange-500 mb-20">
                        <li>Mapeo Regulatorio</li>
                        <li>Verificación Forense</li>
                        <li>Prueba de Control</li>
                    </ul>
                    </div>
                    
                    <div className="absolute -bottom-20 -left-6 opacity-30">
                        <span className="text-[160px] font-bold">
                            02
                        </span>
                    </div>
                </div>

            </div>
        </section>
    )
}
