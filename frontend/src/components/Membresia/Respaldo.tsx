import { ScrollReveal } from "../ScrollReveal"

export const Respaldo = () => {
  return (
    <ScrollReveal as={"section"} className="py-24 bg-gray-50 border-b border-gray-200 overflow-hidden" id="problema">
            <div className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    
                    <div className="lg:col-span-5 sticky top-32 reveal-element">
                        <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block font-jakarta">
                            El problema que resolvemos
                        </span>
                        <h2 className="text-[#151E28] font-extrabold text-[2rem] sm:text-[2.2rem] md:text-[2.5rem] tracking-tight leading-tight mb-6">
                            RESPALDO TRIBUTARIO OPORTUNO
                        </h2>
                        
                        <div className="rounded-xl overflow-hidden shadow-2xl mb-10 relative group">
                            <img src="/images/Resplado.avif" alt="Consultoría" className="w-full h-84 object-cover group-hover:scale-105 transition-transform duration-700"/>
                            <div className="absolute inset-0 bg-[#151E28]/40"></div>
                        </div>

                        <div className="bg-white border-l-4 border-orange-500 p-6 rounded-r-xl shadow-lg relative">
                            <p className="text-[1.1rem] font-light leading-relaxed text-gray-600">
                                Su empresa puede tener contador y, aun así, necesitar <strong className="font-bold text-[#151E28]">criterio tributario especializado</strong> antes de tomar una decisión financiera crítica.
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-7 flex flex-col gap-8 pt-4">
                        
                        <div className="bg-[#151E28] pt-10 pb-8 px-8 md:px-10 shadow-xl rounded-2xl relative border border-white/10 reveal-element hover:-translate-y-1 transition-transform group">
                            <div className="absolute -top-6 left-8 bg-orange-500 w-14 h-14 flex items-center justify-center rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                                <span className="text-white font-extrabold text-2xl font-jakarta">?</span>
                            </div>
                            <div className="mt-2 text-white">
                                <h3 className="font-bold text-[1.25rem] md:text-[1.35rem]">Dudas que exceden el cumplimiento rutinario</h3>
                                <p className="mt-3 font-light text-gray-300 text-[1rem] leading-relaxed">
                                    Retenciones, IVA, deducibilidad, pagos al exterior, anexos o aplicación de nuevas normas pueden requerir una segunda opinión especializada que un contador de planta no siempre posee.
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#151E28] pt-10 pb-8 px-8 md:px-10 shadow-xl rounded-2xl relative border border-white/10 reveal-element delay-100 hover:-translate-y-1 transition-transform group">
                            <div className="absolute -top-6 left-8 bg-orange-500 w-14 h-14 flex items-center justify-center rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>
                            </div>
                            <div className="mt-2 text-white">
                                <h3 className="font-bold text-[1.25rem] md:text-[1.35rem]">Decisiones con efectos tributarios</h3>
                                <p className="mt-3 font-light text-gray-300 text-[1rem] leading-relaxed">
                                    Una operación mal interpretada puede generar pagos innecesarios, contingencias ocultas o posteriores observaciones costosas por parte de la Administración Tributaria.
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#151E28] pt-10 pb-8 px-8 md:px-10 shadow-xl rounded-2xl relative border border-white/10 reveal-element delay-200 hover:-translate-y-1 transition-transform group">
                            <div className="absolute -top-6 left-8 bg-orange-500 w-14 h-14 flex items-center justify-center rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            </div>
                            <div className="mt-2 text-white">
                                <h3 className="font-bold text-[1.25rem] md:text-[1.35rem]">Acceso limitado fuera de grandes ciudades</h3>
                                <p className="mt-3 font-light text-gray-300 text-[1rem] leading-relaxed">
                                    La modalidad remota permite que empresas de provincia accedan a una firma especializada de élite sin necesidad de desplazamientos ni pago de costosos viáticos.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </ScrollReveal>
  )
}
