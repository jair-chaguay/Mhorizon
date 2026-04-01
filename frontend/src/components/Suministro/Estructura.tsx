import { ScrollReveal } from "../ScrollReveal"
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
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">

                <ScrollReveal className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">

                    <div className="w-full lg:w-[45%] relative reveal-element">
                        <div className="rounded-2xl overflow-hidden shadow-2xl relative aspect-4/5 lg:aspect-square">
                            <img alt="Contenedores portuarios"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                src="/images/Recurso62.jpg" />
                            <div className="absolute inset-0 bg-blue-200/10 mix-blend-multiply"></div>
                        </div>

                        <div className="absolute -bottom-8 -right-4 sm:-right-8 bg-blue-200 p-8 sm:p-10 rounded-2xl shadow-2xl max-w-[320px] border-t-4 border-orange-500 hidden sm:block">
                            <p className="text-white font-light italic text-[1.1rem] leading-relaxed drop-shadow-md">
                                "La eficiencia operativa no es un objetivo, es el cimiento de nuestra estructura."
                            </p>
                            <p className="text-orange-500 font-bold text-[0.75rem] uppercase tracking-widest mt-6">Dirección Técnica</p>
                        </div>
                    </div>

                    <div className="w-full lg:w-[55%] reveal-element delay-100 mt-8 lg:mt-0">
                        <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
                            Procesos Clave
                        </span>
                        <h2 className="text-blue-200 font-extrabold text-[2rem] sm:text-[2.5rem] tracking-tight leading-tight mb-12">
                            ESTRUCTURA ESTRATÉGICA
                        </h2>

                        <ul className="flex flex-col gap-10">
                            {
                                estructuras.map((estructura: estructurasProp) => (
                                    <EstructuraCard key={estructura.numero} {...estructura} />
                                ))
                            }
                        </ul>
                    </div>


                </ScrollReveal>
            </div>
        </section>
    )
}