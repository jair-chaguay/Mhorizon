import { IconosSVG, Recurso67, Recurso68 } from "../IconosSVG"
import { ScrollReveal } from "../ScrollReveal"

export const Operamos = () => {
    return (
        <section className='py-24 bg-gray-50 border-b border-gray-200 overflow-hidden'>
            <ScrollReveal className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">

                <div className="mb-14 reveal-element text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="max-w-3xl">
                        <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
                            Metodología de Acción
                        </span>
                        <h2 className="text-blue-200 font-extrabold text-[2rem] sm:text-[2.2rem] md:text-[2.5rem] tracking-tight leading-tight">
                            CÓMO OPERAMOS
                        </h2>
                    </div>
                    <div className="max-w-xl lg:text-right">
                        <p className="text-gray-600 text-[1.05rem] leading-relaxed">
                            Nuestro modelo operativo integra rigor analítico institucional con tecnología de punta para blindar el capital y maximizar el rendimiento.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-2 bg-white p-10 md:p-12 shadow-lg rounded-xl border border-gray-100 reveal-element delay-100 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute -right-10 -top-10 bg-gray-50 rounded-full w-40 h-40 group-hover:scale-150 transition-transform duration-700 ease-in-out opacity-50 z-0"></div>

                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-blue-200 text-white flex items-center justify-center rounded-lg shadow-md mb-8">
                                <IconosSVG className="w-7 h-7" />
                            </div>

                            <h3 className="font-bold text-blue-200 text-[1.4rem] md:text-[1.6rem] mb-4">
                                Auditoría y Cumplimiento Normativo
                            </h3>
                            <p className="text-gray-600 text-[1rem] leading-relaxed max-w-xl">
                                Implementamos protocolos de auditoría exhaustiva alineados a estándares internacionales (NIIF/GAAP), asegurando la total transparencia y solidez de sus estados financieros ante reguladores.
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-1 bg-blue-200 p-10 md:p-12 shadow-xl rounded-xl border border-blue-200 reveal-element delay-200 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 bg-orange-500 w-2 h-full"></div>

                        <div className="relative z-10 flex flex-col h-full justify-center">
                            <div className="w-14 h-14 bg-white/10 text-orange-500 flex items-center justify-center rounded-lg shadow-md mb-8">
                                <Recurso67 className="w-7 h-7" />
                            </div>

                            <h3 className="font-bold text-white text-[1.4rem] mb-4">
                                Confianza Institucional
                            </h3>
                            <p className=" text-gray-300 text-[0.95rem] leading-relaxed">
                                Respaldamos la gestión de riesgo y auditoría de las principales
                                entidades financieras de la región.
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-3 bg-white shadow-lg rounded-xl border border-gray-100 flex flex-col md:flex-row overflow-hidden reveal-element delay-300 hover:shadow-2xl transition-shadow">

                        <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                            <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.75rem] uppercase mb-4 block items-center gap-2">
                                <span className="w-4 h-0.5 bg-orange-500"></span> Risk Management
                            </span>
                            <h3 className="font-bold text-[#151E28] text-[1.6rem] md:text-[2rem] mb-4 leading-tight">
                                Gestión Integral de Riesgos
                            </h3>
                            <p className=" text-gray-600 text-[1rem] leading-relaxed">
                                Sistemas avanzados de detección predictiva y mitigación de
                                exposición en mercados volátiles. Evaluamos y optimizamos los
                                controles internos para prevenir irregularidades y proteger el
                                capital de su institución.
                            </p>

                        </div>
                        <div className="md:w-1/2 relative min-h-75">
                            <img alt="Datos Financieros"
                                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                                src="/images/Recurso66.webp" />
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    )
}