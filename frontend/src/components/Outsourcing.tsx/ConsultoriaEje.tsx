import { ScrollReveal } from "../ScrollReveal"
import { ConsultoríaCard } from "./ConsultoríaCard"

interface consultoriaProp {
    num: string,
    title: string,
    content: string
}

const consultoria: consultoriaProp[] = [
    {
        num: "01",
        title: "Diagnóstico en Profundidad",
        content: "Analizamos su estructura actual para identificar cuellos de botella y oportunidades de automatización inmediata."
    },
    {
        num: "02",
        title: "Configuración Personalizada",
        content: "Implementamos equipos y tecnologías específicamente alineados con la cultura y las necesidades de su empresa."
    },
    {
        num: "03",
        title: "Gestión de Indicadores Clave (KPI)",
        content: "Los paneles de control en tiempo real garantizan total transparencia sobre el rendimiento y la calidad de los entregables."
    }
]

export const ConsultoriaEje = () => {
    return (
        <section className="bg-white overflow-hidden">
            <ScrollReveal className='flex flex-col lg:flex-row min-h-150'>
                <div className="w-full lg:w-1/2 relative min-h-112.5 lg:min-h-full reveal-element">
                    <img className="absolute inset-0 w-full h-full object-cover" src="/images/Recurso49.avif" alt="Recurso49" />

                    <div className="absolute inset-0 bg-linear-to-t from-blue-200 via-blue-200/50 to-transparent">
                    </div>
                    <div className="absolute bottom-0 left-0 p-8 lg:p-12 w-full">
                        <h4 className='text-white shadow-2xl font-extrabold text-[1.6rem] md:text-[2rem] leading-tight'>
                            REDUCCIÓN DE COSTOS ESTRUCTURALES
                        </h4>
                        <p className="text-gray-200 font-light mt-3 w-full lg:w-[90%] text-[1.05rem] leading-relaxed">
                            Transformamos los altos costos fijos de un departamento interno en costos variables eficientes, reduciendo la carga operativa y los riesgos laborales sin comprometer la excelencia de la información.
                        </p>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 bg-blue-200 px-6 sm:px-12 lg:px-16 py-16 md:py-24 reveal-element delay-200">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
                        NUESTRO ENFOQUE BPO
                    </span>
                    <h2 className="text-white font-extrabold text-[2rem] md:text-[2.4rem] leading-tight">
                        CONSULTORÍA & EJECUCIÓN
                    </h2>

                    <div className="grid grid-cols-1 gap-10 mt-12">
                        {
                            consultoria.map((prop: consultoriaProp) => (
                                <ConsultoríaCard key={prop.title} {...prop} />
                            ))
                        }
                    </div>
                </div>

            </ScrollReveal>
        </section>
    )
}