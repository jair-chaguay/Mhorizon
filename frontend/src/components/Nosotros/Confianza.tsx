import { ScrollReveal } from "../ScrollReveal"

export const Confianza = () => {
    return (
        <section className="py-20 md:py-28 bg-white border-b border-gray-100 overflow-hidden">
            <ScrollReveal className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    <div className="reveal-element text-center lg:text-left">
                        <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-3 block">
                            Firm Overview
                        </span>
                        <h2 className="text-blue-200 font-extrabold text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] tracking-tight leading-tight">
                            CONSTRUYENDO CONFIANZA <br className="hidden lg:block" /> INSTITUCIONAL
                        </h2>
                        <p className="mt-6 text-blue-200/70  text-[1.1rem] leading-relaxed">
                            MHORIZON ECUADOR se consolida como el aliado estratégico de las corporaciones más dinámicas del país. Entendemos que en el entorno empresarial actual, el rigor técnico y la innovación no son opcionales, son el estándar.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 reveal-element delay-200">
                        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-200/50 shadow-sm text-center lg:text-left flex flex-col justify-center transition-transform hover:-translate-y-1 duration-300">
                            <span className="text-orange-500 text-5xl md:text-6xl font-black tracking-tighter block mb-2">+20</span>
                            <span className="text-blue-200 font-bold text-[0.85rem] uppercase tracking-widest block">Años de Experiencia</span>
                            <p className="text-blue-200/60 text-[0.9rem] font-light mt-3">Liderando el mercado con integridad y visión.</p>
                        </div>
                        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-200/50 shadow-sm text-center lg:text-left flex flex-col justify-center transition-transform hover:-translate-y-1 duration-300">
                            <span className="text-orange-500 text-5xl md:text-6xl font-black tracking-tighter block mb-2">100%</span>
                            <span className="text-blue-200 font-bold text-[0.85rem] uppercase tracking-widest block">Cumplimiento Legal</span>
                            <p className="text-blue-200/60 text-[0.9rem] font-light mt-3">Rigor absoluto ante el SRI y la SCVS.</p>
                        </div>
                    </div>

                </div>
            </ScrollReveal>
        </section>)
}
