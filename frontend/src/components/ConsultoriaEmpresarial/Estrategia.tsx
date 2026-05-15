import { ScrollReveal } from "../ScrollReveal"

export const Estrategia = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <ScrollReveal className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
                <div className="text-center mb-16 reveal-element">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
                        Resultados Comprobables
                    </span>
                    <h2 className="relative inline-block text-blue-200 font-extrabold text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] tracking-tight leading-tight pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-orange-500 after:rounded-full">
                        ESTRATEGIA DE VALOR
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch">

                    <div className="w-full lg:w-[60%] relative rounded-2xl overflow-hidden shadow-2xl group reveal-element">
                        <img
                            className="w-full h-100 sm:h-125 object-cover group-hover:scale-105 transition-transform duration-700"
                            src="/images/Recurso36.avif"
                            alt="recurso_36"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-[#0f172a] via-[#0f172a]/50 to-transparent"></div>

                        <div className="absolute bottom-0 left-0 w-full p-8 sm:p-10">
                            <p className="bg-orange-500 text-white text-[0.75rem] md:text-[0.80rem] py-1.5 px-4 font-medium uppercase tracking-widest rounded-sm w-fit mb-4">
                                Ventaja Central
                            </p>

                            <h4 className="text-white font-bold text-[1.6rem] sm:text-[2rem] leading-tight">
                                Transformación institucional
                            </h4>

                            <p className="text-gray-300 font-light text-[1rem] sm:text-[1.1rem] w-full md:w-[85%] mt-4 leading-relaxed">
                                No solo asesoramos; reconfiguramos el ADN operativo de su empresa para maximizar la rentabilidad y asegurar el cumplimiento normativo.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 lg:gap-8 w-full lg:w-[40%] justify-center reveal-element delay-200">

                        <div className="bg-blue-200 text-white py-10 px-8 sm:px-10 rounded-2xl shadow-xl transform hover:-translate-y-2 transition-transform duration-300">
                            <h3 className="font-bold text-[3rem] sm:text-[3.5rem] leading-none">
                                42%
                            </h3>
                            <p className="text-[1.1rem] font-bold uppercase tracking-wide mt-2">Aumento en Eficiencia</p>

                            <p className="mt-4 text-white/90 text-[0.95rem] leading-relaxed">
                                Benchmarks operativos propietarios que superan los estándares de la industria por márgenes significativos, reduciendo la carga de costos fijos.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 py-8 px-8 sm:px-10 shadow-xl rounded-2xl bg-gray-50 border border-gray-100 hover:border-orange-500/50 transition-colors cursor-pointer group">
                            <p className="font-medium text-[1.1rem] text-blue-200">
                                Delegación Operativa (BPO)
                            </p>

                            <p className="text-gray-500 leading-relaxed text-[0.95rem]">
                                Asumimos la gestión integral de su back-office contable para que su empresa escale sus operaciones sin fricciones administrativas.
                            </p>
                        </div>

                    </div>
                </div>
            </ScrollReveal>
        </section>
    )
}