import { ScrollReveal } from "../ScrollReveal"

export const Methodology = () => {
    return (
        <section className="py-24 bg-gray-800 border-b border-gray-200 overflow-hidden">
            <ScrollReveal className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">

                <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8 reveal-element">
                    <div className="max-w-2xl w-full">
                        <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
                            Enfoque estratégico
                        </span>
                        <h2 className="text-blue-200 border-l-6 border-l-orange-500 pl-4 font-extrabold text-[2rem] sm:text-[2.5rem] tracking-tight leading-tight">
                            CUMPLIMIENTO Y RENTABILIDAD
                        </h2>
                    </div>
                    <p className="text-gray-600 text-[1.1rem] max-w-xl text-balance leading-relaxed">
                        Integramos auditoría financiera rigurosa con planificación tributaria y outsourcing especializado para blindar el patrimonio de su institución frente al SRI, la Superintendencia de Bancos y la SCVS.
                    </p>
                </div>



                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12 mt-12">


                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-10 relative reveal-element hover:shadow-2xl transition-shadow mt-6 md:mt-0 group">
                        <div className='absolute -top-6 bg-orange-500 w-14 h-14 flex items-center justify-center rounded-xl shadow-lg group-hover:-translate-y-2 transition-all group-hover:bg-blue-200 duration-300'>
                            <img className="w-7" src="/images/Fortalecimiento.png" alt="Fortalecimiento" />
                        </div>

                        <h3 className="text-blue-200 font-extrabold text-[1.4rem] mt-6 mb-4 leading-tight group-hover:text-orange-500 transition-colors">
                            Fortalecimiento y Control Interno
                        </h3>
                        <p className="text-gray-600 text-[1.05rem] leading-relaxed">
                             Fortalecemos la estructura interna de su institución mediante trabajos técnicos especializados. Ejecutamos análisis profundos de cuentas, levantamiento riguroso de inventarios y revisiones especiales enfocadas tanto en el área contable como en sus procesos operativos.
                        </p>
                    </div>




                    <div className="bg-blue-200 rounded-2xl shadow-xl p-8 sm:p-10 relative reveal-element delay-100 hover:shadow-2xl transition-shadow mt-6 md:mt-0 group">

                        <div className='absolute -top-6 bg-orange-500 w-14 h-14 flex items-center justify-center rounded-xl shadow-lg group-hover:-translate-y-2 transition-transform duration-300'>
                            <img className='w-7 text-orange-500' src="/images/OptimizacionTributaria.png" alt="OptimizacionTributaria" />
                        </div>

                        <h3 className="text-white font-extrabold text-[1.4rem] mt-6 mb-4 leading-tight">
                            Estrategia de Optimización Tributaria
                        </h3>
                        <p className="text-gray-300 text-[1.05rem] leading-relaxed mb-6">
                            Brindamos asesoría fiscal permanente diseñada para el sector financiero. Estructuramos estrategias de optimización tributaria de alto nivel, asegurando la máxima eficiencia impositiva de sus productos financieros en estricto cumplimiento legal.
                        </p>

                    </div>


                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-10 relative reveal-element delay-200 hover:shadow-2xl transition-shadow mt-6 md:mt-0 group">
                        <div className="absolute -top-6 bg-orange-500 w-14 h-14 flex items-center justify-center rounded-xl shadow-lg group-hover:-translate-y-2 transition-all duration-300 group-hover:bg-blue-200">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        </div>
                        <h3 className="text-blue-200 font-extrabold text-[1.4rem] mt-6 mb-4 leading-tight group-hover:text-orange-500 transition-colors">Protección Patrimonial ante Entes de Control</h3>
                        <p className="text-gray-600 text-[1.05rem] leading-relaxed">
                            Protegemos el patrimonio de su entidad ante los entes de control. Lideramos el acompañamiento integral en procesos de determinación con el SRI y gestionamos de manera técnica los reclamos formales y las devoluciones tributarias.
                        </p>
                    </div>

                </div>
            </ScrollReveal>
        </section>
    )
}