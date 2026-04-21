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
                <div className="w-full lg:w-1/2 relative min-h-112.5 lg:min-h-full reveal-element group">
                    <div className="absolute inset-0 p-6 sm:p-10 lg:p-14">
                        <div className="relative w-full h-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">

                            {/* Imagen */}
                            <img
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                src="/images/Recurso49.avif"
                                alt="Recurso49"
                            />

                            {/* Degradado */}
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-200 via-blue-200/50 to-transparent"></div>

                        </div>
                    </div>
                    <div className="absolute bottom-11 left-6 p-8 lg:p-18 w-full">
                        <h4 className='text-white shadow-2xl font-extrabold text-[1.6rem] md:text-[1.8rem] leading-tight'>
                            REDUCCIÓN DE COSTOS ESTRUCTURALES
                        </h4>
                        <p className="text-gray-200 font-light mt-3 w-full lg:w-[90%] text-[0.9rem] leading-relaxed">
                            Transformamos los altos costos fijos de un departamento interno en costos variables eficientes, reduciendo la carga operativa y los riesgos laborales sin comprometer la excelencia de la información.
                        </p>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 bg-white px-6 sm:px-12 lg:px-16 py-16 md:py-24 reveal-element delay-200">
                    <div className="border-l-6 border-l-orange-500 px-6">
                        <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
                            NUESTRO ENFOQUE BPO
                        </span>
                        <h2 className="text-blue-200 font-extrabold text-[2rem] md:text-[2.1rem] leading-tight">
                            CONSULTORÍA & EJECUCIÓN
                        </h2>
                    </div>

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