import { EstructuraCard } from "./EstructuraCard"

interface estructurasProp {
    numero: string,
    title: string,
    content: string
}

const estructuras: estructurasProp[] = [
    {
        numero: '01',
        title: 'Auditoría de Procesos e Inventarios',
        content: 'Implementación de controles rigurosos para la gestión exacta de stocks y reducción de mermas en la agroindustria y manufactura.',
    },
    {
        numero: '02',
        title: 'Eficiencia en Operaciones Portuarias',
        content: 'Optimización granular de los flujos de carga y descarga para agilizar el comercio exterior y reducir costos de almacenamiento.',
    },
    {
        numero: '03',
        title: 'Cumplimiento y Normativa Aduanera',
        content: 'Alineación estricta con las regulaciones logísticas y navieras para garantizar un tránsito fluido y sin contingencias legales',
    }
]

export const Estructura = () => {
    return (
        <section className="bg-blue-200 relative overflow-hidden border-b border-b-gray-100/10 py-12 lg:py-0">
            <div className="relative z-10">
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    
                    <div className="px-6 md:px-12 lg:px-0 lg:pl-20 mt-0 lg:mt-20 lg:mb-20">
                        <h2 className="text-[2rem] md:text-4xl font-bold text-white tracking-tighter mb-8 md:mb-10 leading-tight">
                            Estructura <br className="hidden sm:block" />
                            <span className="text-orange-500">Estratégica</span>
                        </h2>
                        
                        <ul className="space-y-8 md:space-y-12">
                            {
                                estructuras.map((estructura: estructurasProp) => (
                                    <EstructuraCard key={estructura.numero} {...estructura} />
                                ))
                            }
                        </ul>
                    </div>

                    <div className="relative h-full">
                        <div className="aspect-4/5 md:aspect-square lg:h-full overflow-hidden">
                            <img alt="Contenedores portuarios"
                                className="w-full h-full object-cover"
                                src="/images/Recurso62.jpg" />
                        </div>

                        <div className="absolute inset-0 bg-linear-to-t from-blue-200 via-black/40 lg:via-black/10 to-transparent"></div>

                        <div className="absolute bottom-0 left-0 md:left-4 p-6 md:p-8 max-w-lg w-full">
                            <p className="text-white italic text-[1.05rem] md:text-lg leading-relaxed text-shadow-md">
                                "La eficiencia operativa no es un objetivo, es el cimiento de nuestra
                                estructura."
                            </p>
                            <div className="mt-4 flex flex-col gap-2">
                                <div className="h-1 w-8 bg-orange-500"></div>
                                <span className="text-orange-500 text-sm md:text-md uppercase tracking-widest font-bold">
                                    Dirección Técnica
                                </span>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
    )
}