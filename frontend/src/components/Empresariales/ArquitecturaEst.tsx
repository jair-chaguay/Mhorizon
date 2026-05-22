import { ScrollReveal } from "../ScrollReveal"
import { ArquitecturaCard } from "./ArquitecturaCard"

interface arquitecturaProps {
    numero: string,
    title: string,
    content: string
}

const arquitecturas: arquitecturaProps[] = [
    {
        numero: "01",
        title: "Inteligencia Tributaria B2B",
        content: "Optimizamos su carga tributaria, el manejo de retenciones y la declaración de IVA, diseñando planeaciones fiscales eficientes y adaptadas a la naturaleza intangible de sus servicios."
    },
    {
        numero: "02",
        title: "Rigor Analítico bajo Estándares Internacionales",
        content: "Evaluamos la salud económica de su empresa con rigor internacional (NIIF). Garantizamos la máxima transparencia de su gestión ante socios directores, inversionistas y la SCVS."
    }
]

export const ArquitecturaEst = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">
                <ScrollReveal className="flex flex-col lg:flex-row gap-16 items-center">

                    <div className="w-full lg:w-1/2 relative reveal-element">
                        <div className="aspect-4/3 rounded-xl overflow-hidden relative shadow-2xl z-10 group">
                            <img alt="Arquitectura Estratégica" className="w-full h-full object-cover group-hover:scale-105 transform-all duration-300 " src="/images/ARQUITECTURA.webp" />
                            <div className="absolute inset-0 bg-blue-200/20 mix-blend-multiply"></div>

                            <div className="absolute bottom-6 right-6 left-6 sm:left-auto bg-white/10 backdrop-blur-md p-6 sm:p-8 text-white rounded-lg shadow-2xl border border-white/10">

                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-orange-500 text-3xl sm:text-4xl font-extrabold mb-1">
                                            100%
                                        </p>
                                        <p className="text-[0.65rem] sm:text-[0.7rem] uppercase tracking-widest font-bold text-gray-300">
                                            Cumplimiento Tributario
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-orange-500 text-3xl sm:text-4xl font-extrabold mb-1">
                                            +45%
                                        </p>
                                        <p className="text-[0.65rem] sm:text-[0.7rem] uppercase tracking-widest font-bold text-gray-300">
                                            Eficiencia Financiera
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gray-50 rounded-xl z-0"></div>
                    </div>

                    <div className="w-full lg:w-1/2 reveal-element delay-200">
                        <div className="border-l-orange-500 border-l-4 pl-3">
                            <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
                            Estructura Sólida
                        </span>
                        <h2 className="text-blue-200 font-extrabold text-[2rem] sm:text-[2.2rem] md:text-[2.5rem] tracking-tight leading-tight mb-10">
                            ARQUITECTURA ESTRATÉGICA
                        </h2>
                        </div>

                        <div className="flex flex-col gap-10">
                            {
                                arquitecturas.map((arquitectura: arquitecturaProps) => (
                                    <ArquitecturaCard key={arquitectura.title} {...arquitectura} />
                                ))
                            }
                        </div>

                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}
