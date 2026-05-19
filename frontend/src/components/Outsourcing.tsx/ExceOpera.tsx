import { ScrollReveal } from "../ScrollReveal"

export const ExceOpera = () => {
    return (
        <section className='py-24 bg-gray-800 border-b border-gray-200 overflow-hidden'>
            <ScrollReveal className='max-w-350 mx-auto px-5 sm:px-8 md:px-12'>
                <div className='mb-16 reveal-element text-center lg:text-left'>
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
                        Eficiencia del Back-Office
                    </span>
                    <h2 className="text-blue-200 border-l-6 border-l-orange-500 pl-3 font-bold text-[2rem] sm:text-[2.2rem] md:text-[2.5rem] tracking-tight leading-tight">
                        EXCELENCIA OPERACIONAL
                    </h2>
                    <p className="mt-4 text-gray-600 text-[1.05rem] leading-relaxed max-w-3xl lg:mx-0 mx-auto">
                        Enfoque toda su energía en el núcleo de su negocio mientras nuestros especialistas administran su operatividad financiera y de talento humano bajo los más altos estándares normativos.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10">
                    <div className="bg-white py-12 px-8 md:px-10 shadow-lg rounded-xl relative border border-gray-200 reveal-element delay-100 hover:shadow-2xl transition-shadow group">
                        <div className="absolute -top-6 left-8 bg-orange-500 w-14 h-14 flex items-center justify-center rounded-lg shadow-lg group-hover:scale-110 transition-transform">
                            <img className="w-7 h-7 object-contain invert brightness-0" src="/images/BPOContable.png" alt="Soporte contable" />
                        </div>
                        <div className="mt-4 text-blue-200">
                            <h3 className="font-bold text-[1.3rem] md:text-[1.4rem]">
                                BPO Contable y Financiero
                            </h3>
                            <p className="mt-5 font-light text-gray-600 text-[1rem] leading-relaxed">
                                Procesamos su contabilidad bajo estrictas normativas <span className="font-semibold">NIIF</span>. Asumimos el control del registro de transacciones, emisión de estados financieros, y la preparación y envío de declaraciones mensuales y anexos transaccionales (ATS) al <span className="font-semibold">SRI</span>, garantizando solidez ante inspecciones de la <span className="font-semibold">Superintendencia de Compañías (SCVS)</span>.
                            </p>
                        </div>
                    </div>

                    <div className="bg-blue-200 py-12 px-8 md:px-10 shadow-xl rounded-xl relative border border-white/5 reveal-element delay-200 hover:shadow-2xl transition-shadow group">
                        <div className="absolute -top-6 left-8 bg-orange-500 w-14 h-14 flex items-center justify-center rounded-lg shadow-lg group-hover:scale-110 transition-transform">
                            <img className="w-7 h-7 object-contain invert brightness-0" src="/images/GestionNomina.png" alt="Gestión de Nómina" />
                        </div>

                        <div className="mt-4 text-white">
                            <h3 className="font-bold text-[1.3rem] md:text-[1.4rem]">
                                Gestión de Nómina y Talento
                            </h3>
                            <p className="mt-5 font-light text-gray-300 text-[1rem] leading-relaxed">
                                Administramos el rol de pagos de su corporación asegurando el cumplimiento milimétrico de las normativas del <span className="font-semibold text-white">Ministerio del Trabajo</span> y el <span className="font-semibold text-white">IESS</span>. Gestionamos avisos de entrada/salida, cálculo de horas extras, beneficios sociales, utilidades, liquidaciones y actas de finiquito con absoluta confidencialidad y puntualidad.
                            </p>
                        </div>
                    </div>
                </div>

            </ScrollReveal>
        </section>
    )
}