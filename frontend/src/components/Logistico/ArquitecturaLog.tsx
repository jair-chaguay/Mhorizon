import { ScrollReveal } from "../ScrollReveal"

export const ArquitecturaLog = () => {
    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            <ScrollReveal className="max-w-350 mx-auto px-5 sm:px-8 md:px-12 relative z-10">

                <div className="mb-16 reveal-element">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
                        Eficiencia en Comercio Exterior
                    </span>
                    <h2 className="text-blue-200 font-extrabold text-[2rem] sm:text-[2.5rem] tracking-tight leading-tight max-w-2xl">
                        NUESTRA ARQUITECTURA DE  <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">SERVICIO</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    <div className="lg:col-span-8 bg-white rounded-xl p-8 sm:p-12 shadow-lg border border-gray-100 flex flex-col justify-between reveal-element hover:shadow-2xl transition-shadow group overflow-hidden relative">
                        <div className="absolute right-0 top-0 w-1/2 h-full bg-linear-to-l from-orange-50/50 to-transparent pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-blue-200 text-white rounded-xl flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                            </div>
                            <h3 className="text-blue-200 font-extrabold text-[1.5rem] sm:text-[1.8rem] leading-tight mb-4">Auditoría de Costos Logísticos y Flotas</h3>
                            <p className="text-gray-600 font-light text-[1.05rem] leading-relaxed max-w-2xl mb-8">
                                Implementamos revisiones rigurosas sobre costos operativos, fletes internacionales y aplicación estricta de las NIIF a flotas de transporte y activos fijos portuarios. Aseguramos total transparencia financiera para el SRI y la SCVS.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-800 border border-gray-100 p-4 rounded-xl">
                                    <p className="text-orange-500 font-black text-2xl mb-1">NIIF</p>
                                    <p className="text-[0.75rem] font-bold text-blue-200 uppercase tracking-wider">Cumplimiento Activos</p>
                                </div>
                                <div className="bg-gray-800 border border-gray-100 p-4 rounded-xl">
                                    <p className="text-orange-500 font-black text-2xl mb-1">SCVS</p>
                                    <p className="text-[0.75rem] font-bold text-blue-200 uppercase tracking-wider">Auditoría Aprobada</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 bg-blue-200 rounded-xl p-8 sm:p-10 shadow-xl reveal-element delay-100 hover:shadow-2xl transition-shadow relative overflow-hidden group">

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="w-14 h-14 bg-white/10 text-orange-500 rounded-xl flex items-center justify-center mb-6">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <h3 className="text-white font-extrabold text-[1.4rem] leading-tight mb-4">Tributación y Aduanas</h3>
                                <p className="text-gray-300 font-light text-[0.95rem] leading-relaxed mb-6">
                                    Gestión experta sobre IVA en comercio exterior, retenciones aplicables al sector transporte, y planeación fiscal internacional mediante convenios para evitar la doble tributación.
                                </p>
                            </div>
                            <span className="inline-block px-4 py-2 border border-white text-white text-[0.70rem] font-bold uppercase tracking-widest rounded-lg text-center w-fit">Mitigación SENAE/SRI</span>
                        </div>
                    </div>

                    <div className="lg:col-span-12 bg-white rounded-xl p-8 sm:p-12 shadow-lg border border-gray-100 flex flex-col md:flex-row items-center gap-10 reveal-element delay-200 hover:shadow-2xl">
                        <div className="md:w-2/3">
                            <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.75rem] uppercase mb-2 block">Delegación Operativa</span>
                            <h3 className="text-blue-200 font-extrabold text-[1.5rem] sm:text-[1.8rem] leading-tight mb-4">Outsourcing Contable (BPO)</h3>
                            <p className="text-gray-600 font-light text-[1.05rem] leading-relaxed">
                                Asumimos el procesamiento contable de alto volumen y la gestión de nómina para transportistas y personal portuario. Garantizamos el estricto cumplimiento de las regulaciones laborales (MDT, IESS), liberando recursos para que su empresa se enfoque en su core business.
                            </p>
                        </div>
                        <div className="md:w-1/3 w-full flex justify-center md:justify-end">
                            <button className="w-full cursor-pointer md:w-auto text-center border-2 border-blue-200 text-blue-200 font-bold uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-blue-200 hover:text-white transition-colors">
                                Delegar Back-Office
                            </button>
                        </div>
                    </div>

                </div>
            </ScrollReveal>
        </section>
    )
}
