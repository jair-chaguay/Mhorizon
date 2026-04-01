import { ScrollReveal } from "../ScrollReveal"

export const Methodology = () => {
    return (
        <section className="py-24 bg-gray-800 border-b border-gray-200 overflow-hidden">
            <ScrollReveal className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">

                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 reveal-element">
                    <div className="max-w-2xl w-full">
                        <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
                            Nuestra Metodología
                        </span>
                        <h2 className="text-blue-200 font-extrabold text-[2rem] sm:text-[2.5rem] tracking-tight leading-tight">
                            ESTABILIDAD ESTRUCTURAL
                        </h2>
                    </div>
                    <p className="text-gray-600 text-[1.1rem] max-w-xl text-balance leading-relaxed">
                        Integramos auditoría profunda con ejecución táctica en terreno para asegurar la estabilidad estructural de sus operaciones portuarias y logísticas.
                    </p>
                </div>



                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12 mt-12">


                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-10 relative reveal-element hover:shadow-2xl transition-shadow mt-6 md:mt-0 group">
                        <div className='absolute -top-6 bg-orange-500 w-14 h-14 flex items-center justify-center rounded-xl shadow-lg group-hover:-translate-y-2 transition-transform duration-300'>
                            <img className="w-7" src="/images/Recurso63.png" alt="Recurso63" />
                        </div>

                        <h3 className="text-blue-200 font-extrabold text-[1.4rem] mt-6 mb-4 leading-tight group-hover:text-orange-500 transition-colors">
                            Optimización Integral de Flujos
                        </h3>
                        <p className="text-gray-600 text-[1.05rem] leading-relaxed">
                            Rediseñamos redes de suministro, control de inventarios y logística para reducir fricción y maximizar la resiliencia ante las volatilidades del mercado.
                        </p>
                    </div>




                    <div className="bg-blue-200 rounded-2xl shadow-xl p-8 sm:p-10 relative reveal-element delay-100 hover:shadow-2xl transition-shadow mt-6 md:mt-0 group">

                        <div className='absolute -top-6 bg-orange-500 w-14 h-14 flex items-center justify-center rounded-xl shadow-lg group-hover:-translate-y-2 transition-transform duration-300'>
                            <img className='w-7 text-orange-500' src="/images/Recurso64.png" alt="Recurso64" />
                        </div>

                        <h3 className="text-white font-extrabold text-[1.4rem] mt-6 mb-4 leading-tight">
                            Confianza Corporativa
                        </h3>
                        <p className="text-gray-300 text-[1.05rem] leading-relaxed mb-6">
                            Nuestra experiencia está respaldada por la gestión y consultoría a líderes del sector portuario, agroindustrial y marítimo en la región.
                        </p>
                        <span className="inline-block px-3 py-1 bg-white/10 text-white border border-white/20 text-[0.70rem] font-bold uppercase tracking-widest rounded-sm">MARCAS LÍDERES</span>

                    </div>


                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-10 relative reveal-element delay-200 hover:shadow-2xl transition-shadow mt-6 md:mt-0 group">
                        <div className="absolute -top-6 bg-orange-500 w-14 h-14 flex items-center justify-center rounded-xl shadow-lg group-hover:-translate-y-2 transition-transform duration-300">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        </div>
                        <h3 className="text-blue-200 font-extrabold text-[1.4rem] mt-6 mb-4 leading-tight group-hover:text-orange-500 transition-colors">Gestión de Riesgos Operativos</h3>
                        <p className="text-gray-600 text-[1.05rem] leading-relaxed">
                            Identificación proactiva de cuellos de botella para blindar la continuidad del negocio. Anticipamos interrupciones en la cadena de abastecimiento.
                        </p>
                    </div>

                </div>
            </ScrollReveal>
        </section>
    )
}