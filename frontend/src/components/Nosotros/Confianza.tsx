import { ScrollReveal } from "../ScrollReveal"

export const Confianza = () => {
    return (
        <section className="py-20 md:py-28 bg-white border-b border-gray-100 overflow-hidden">
            <ScrollReveal className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    <div className="reveal-element text-center lg:text-left">
                        <div className="border-l-6 border-l-orange-500 pl-4">
                            <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-3 block">
                                DESCRIPCIÓN DE LA EMPRESA
                            </span>
                            <h2 className="text-blue-200 font-extrabold text-[2.2rem] sm:text-[2.8rem] md:text-[2.4rem] tracking-tight leading-tight">
                                CONSTRUYENDO CONFIANZA 
                            </h2>
                        </div>
                        <p className="mt-6 text-blue-200/80  text-[1.1rem] leading-relaxed">
                            Acompañamos a empresas nacionales y multinacionales con servicios tributarios, financieros, contables, de outsourcing y auditoría, combinando experiencia técnica y conocimiento del entorno ecuatoriano
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 reveal-element delay-200">
                        <div className="bg-blue-200 p-8 rounded-2xl border border-gray-200/50 shadow-sm text-center lg:text-left flex flex-col justify-center transition-transform hover:-translate-y-1 duration-300">
                            <span className="text-orange-500 text-5xl md:text-6xl font-black tracking-tighter block mb-2">+20</span>
                            <span className="text-white font-bold text-[0.85rem] uppercase tracking-widest block">Años de Experiencia</span>
                            <p className="text-white/60 text-[0.9rem] font-light mt-3">Liderando el mercado con integridad y visión.</p>
                        </div>
                        <div className="bg-blue-200 p-8 rounded-2xl border border-gray-200/50 shadow-sm text-center lg:text-left flex flex-col justify-center transition-transform hover:-translate-y-1 duration-300">
                            <span className="text-orange-500 text-5xl md:text-6xl font-black tracking-tighter block mb-2">100%</span>
                            <span className="text-white font-bold text-[0.85rem] uppercase tracking-widest block">Cumplimiento Legal</span>
                            <p className="text-white/60 text-[0.9rem] font-light mt-3">Revisión técnica de obligaciones y procesos frente al SRI, la SCVS y otras entidades aplicables.</p>
                        </div>
                    </div>

                </div>
            </ScrollReveal>
        </section>)
}
