import { ScrollReveal } from '../ScrollReveal'

export const Trayectoria = () => {
    return (
        <section className="py-24 bg-blue-200 relative overflow-hidden border-b border-white/5">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

            <ScrollReveal className="max-w-300 mx-auto px-5 sm:px-8 md:px-12 relative z-10">
                <div className="text-center mb-24 reveal-element">
                    <span className="text-orange-500 font-bold text-[0.85rem] tracking-[0.2em] uppercase mb-4 block">
                        Nuestra Trayectoria
                    </span>
                    <h2 className="font-bold text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] text-white uppercase tracking-tight leading-tight">
                        Décadas de Respaldo
                    </h2>
                </div>

                <div className="relative">
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-orange-500/0 via-orange-500/50 to-orange-500/0 md:-translate-x-1/2"></div>

                    <div className="relative flex flex-col md:flex-row items-center md:justify-between mb-20 group reveal-element">
                        <div className="md:w-[45%] w-full pl-12 md:pl-0 md:text-right order-2 md:order-1 mt-6 md:mt-0 pr-0 md:pr-12">
                            <h4 className="font-bold text-[1.6rem] mb-3 text-orange-500 tracking-tight">
                                Consolidación en Guayaquil
                            </h4>
                            <p className="text-gray-300 font-light leading-relaxed text-[1.05rem]">
                                Establecimos nuestra sede central en el Edificio Quil 1, integrando servicios contables, estructuración de impuestos y consultoría corporativa para responder a la creciente demanda de cumplimiento empresarial.
                            </p>
                        </div>

                        <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(217,128,5,0.8)] transform -translate-x-1.75 md:-translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 z-20 transition-transform group-hover:scale-150"></div>


                        <div className="md:w-[45%] w-full pl-12 md:pl-12 order-1 md:order-2">
                            <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                                <img className="w-full h-full object-cover  transition-transform duration-700 group-hover:scale-110 opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 grayscale group-hover:grayscale-0 group-hover:opacity-100 "
                                    alt="Oficinas Guayaquil" src="/images/Recurso09.jpeg"
                                />
                                <div className="absolute inset-0 bg-blue-200/40 group-hover:bg-transparent transition-colors duration-500"></div>
                            </div>
                        </div>

                    </div>

                    <div className="relative flex flex-col md:flex-row items-center md:justify-between mb-20 group reveal-element delay-100">
                        <div className="md:w-[45%] w-full pl-12 md:pl-12 order-2 mt-6 md:mt-0">
                            <h4 className="font-bold text-[1.6rem] mb-3 text-orange-500 tracking-tight">
                                Expansión de Servicios
                            </h4>
                            <p className="text-gray-300 font-light leading-relaxed text-[1.05rem]">
                                Ampliamos nuestro portafolio especializado para incluir auditorías externas avanzadas y normativas NIIF, convirtiéndonos en un aliado integral ineludible para la toma de decisiones de la Alta Gerencia.
                            </p>
                        </div>
                        <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(217,128,5,0.8)] transform -translate-x-1.75 md:-translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 z-20 transition-transform group-hover:scale-150"></div>


                        <div className="md:w-[45%] w-full pl-12 md:pl-0 pr-0 md:pr-12 order-1">
                            <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                                <img className="w-full h-72 object-cover grayscale opacity-70 
                                    group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 
                                    group-hover:scale-105" alt="Reunión Corporativa"
                                    src="/images/Recurso11.jpeg"
                                />
                                <div className="absolute inset-0 bg-blue-200/40 group-hover:bg-transparent transition-colors duration-500"></div>

                            </div>
                        </div>
                    </div>

                    <div className="relative flex flex-col md:flex-row items-center md:justify-between group reveal-element delay-200">
                        <div className="md:w-[45%] w-full pl-12 md:pl-0 md:text-right order-2 md:order-1 mt-6 md:mt-0 pr-0 md:pr-12">
                            <h4 className="font-bold text-[1.6rem] mb-3 text-orange-500 tracking-tight">
                                Innovación Analítica
                            </h4>
                            <p className="text-gray-300 font-light leading-relaxed text-[1.05rem]">
                                Modernizamos nuestras plataformas de análisis tributario e inteligencia financiera, garantizando a nuestros clientes confidencialidad, seguridad de datos y proyecciones fiscales de altísima precisión.
                            </p>
                        </div>
                        <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(217,128,5,0.8)] transform -translate-x-1.75 md:-translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 z-20 transition-transform group-hover:scale-150"></div>

                        <div className="md:w-[45%] w-full pl-12 md:pl-12 order-1 md:order-2">
                            <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl relative aspect-video">
                                <img className="w-full h-72 object-cover grayscale opacity-70 
                                    group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 
                                    group-hover:scale-105" alt="Tecnología Financiera"
                                    src="/images/Recurso65.jpeg"
                                />
                                <div className="absolute inset-0 bg-blue-200/40 group-hover:bg-transparent transition-colors duration-500"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    )
}
