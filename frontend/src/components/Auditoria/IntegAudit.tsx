import { ScrollReveal } from "../ScrollReveal"
import { IntegCard } from "./IntegCard"

interface inteProps {
    image: string,
    title: string,
    content: string
}

const integridad: inteProps[] = [
    {
        image: "/images/ProtocoloTransparencia.png",
        title: "Procedimientos de auditoría",
        content: "Diseñamos procedimientos basados en riesgos, pruebas de control y pruebas sustantivas, utilizando herramientas tecnológicas cuando resultan apropiadas."
    },
    {
        image: "/images/MitigacionRiesgos.png",
        title: "Identificación de Riesgos",
        content: "Comunicamos hallazgos y recomendaciones para fortalecer controles, calidad de información y procesos financieros."
    }
]

export const IntegAudit = () => {
    return (
        <section className='py-24 bg-gray-800 border-b border-gray-200 overflow-hidden'>
            <ScrollReveal className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">

                <div className="mb-16 reveal-element text-center lg:text-left">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
                        Prevención y Control
                    </span>
                    <h2 className="text-blue-200 border-l-6 border-l-orange-500 pl-4 font-bold text-[2rem] sm:text-[2.2rem] md:text-[2.5rem] tracking-tight leading-tight">
                        CONFIANZA EN LA INFORMACIÓN
                    </h2>
                    <p className="mt-4 text-gray-600  text-[1.05rem] leading-relaxed max-w-3xl lg:mx-0 mx-auto">
                        Aplicamos procedimientos de auditoría y revisión para identificar riesgos, debilidades de control y asuntos que requieren atención de la administración.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10">
                    {
                        integridad.map((props: inteProps, index) => (
                            <IntegCard key={index} {...props} />
                        ))
                    }
                </div>
            </ScrollReveal>
        </section>
    )
}