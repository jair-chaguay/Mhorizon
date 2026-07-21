import { ScrollReveal } from "../ScrollReveal"

export const PerfilIdeal = () => {
    return (
        <ScrollReveal as={"section"} className="py-24 bg-white border-b border-gray-200 relative">
            <div className="max-w-350 mx-auto px-5 sm:px-8 md:px-12 relative z-10">
                <div className="text-center mb-16 reveal-element">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block font-jakarta">
                        ¿PARA QUIÉN ES?
                    </span>
                    <h2 className="text-[#151E28] font-extrabold text-[2rem] sm:text-[2.5rem] tracking-tight leading-tight">
                        PERFIL DEL CLIENTE IDEAL
                    </h2>
                    <p className="mt-4 text-gray-600 font-light text-[1.05rem] leading-relaxed max-w-3xl mx-auto">
                        Una membresía estructuralmente pensada para entidades, empresarios y profesionales que requieren un nivel superior de certeza fiscal antes de actuar.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    <div className="bg-[#151E28] rounded-2xl shadow-xl  overflow-hidden reveal-element hover:-translate-y-2 transition-transform duration-300 flex flex-col group">
                        <div className="h-48 relative overflow-hidden">
                            <img src="/images/Pyme.avif" className="w-full h-full object-cover transition-transform duration-700 opacity-80" alt="PYMES" />
                            <div className="absolute inset-0 bg-linear-to-t from-[#151E28] via-[#151E28]/40 to-transparent"></div>
                        </div>
                        <div className="px-8 pb-8 pt-2 flex-1 flex flex-col text-center">
                            <div className="w-14 h-14 rounded-xl bg-orange-500 text-white flex items-center justify-center font-extrabold text-xl mx-auto mb-4 shadow-lg -mt-10 relative z-10 border-4 border-[#151E28] font-jakarta">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-store-icon lucide-store"><path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5"/><path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244"/><path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05"/></svg>


                            </div>
                            <h3 className="font-bold text-white text-[1.25rem] mb-3">PYMES</h3>
                            <p className="text-gray-300 text-[0.95rem] font-light leading-relaxed">
                                Empresas que necesitan criterio tributario corporativo sin el costo de contratar una asesoría integral permanente de planta.
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#151E28] rounded-2xl shadow-xl overflow-hidden reveal-element delay-100 hover:-translate-y-2 transition-transform duration-300 flex flex-col group">
                        <div className="h-48 relative overflow-hidden">
                            <img src="/images/gerente.avif" className="w-full h-full object-cover  transition-transform duration-700 opacity-80" alt="Gerentes" />
                            <div className="absolute inset-0 bg-linear-to-t from-[#151E28] via-[#151E28]/40 to-transparent"></div>
                        </div>
                        <div className="px-8 pb-8 pt-2 flex-1 flex flex-col text-center">
                            <div className="w-14 h-14 rounded-xl bg-gray-200 text-[#151E28] flex items-center justify-center font-extrabold text-xl mx-auto mb-4 shadow-lg -mt-10 relative z-10 border-4 border-[#151E28] font-jakarta">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>
                            </div>
                            <h3 className="font-bold text-white text-[1.25rem] mb-3">Gerentes</h3>
                            <p className="text-gray-300 text-[0.95rem] font-light leading-relaxed">
                                Propietarios y administradores que desean validar decisiones críticas financieras y operativas antes de ejecutarlas.
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#151E28] rounded-2xl shadow-xl overflow-hidden reveal-element delay-200 hover:-translate-y-2 transition-transform duration-300 flex flex-col group">
                        <div className="h-48 relative overflow-hidden">
                            <img src="/images/Resplado.avif" className="w-full h-full object-cover transition-transform duration-700 opacity-80" alt="Contadores" />
                            <div className="absolute inset-0 bg-linear-to-t from-[#151E28] via-[#151E28]/40 to-transparent"></div>
                        </div>
                        <div className="px-8 pb-8 pt-2 flex-1 flex flex-col text-center">
                            <div className="w-14 h-14 rounded-xl bg-orange-500 text-white flex items-center justify-center font-extrabold text-xl mx-auto mb-4 shadow-lg -mt-10 relative z-10 border-4 border-[#151E28] font-jakarta">

                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-receipt-icon lucide-receipt"><path d="M12 17V7" /><path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8" /><path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" /></svg>
                            </div>
                            <h3 className="font-bold text-white text-[1.25rem] mb-3">Contadores</h3>
                            <p className="text-gray-300 text-[0.95rem] font-light leading-relaxed">
                                Equipos internos o asesores externos que requieren una segunda opinión experta de respaldo frente a casos inusuales.
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#151E28] rounded-2xl shadow-xl border border-white/10 overflow-hidden reveal-element delay-300 hover:-translate-y-2 transition-transform duration-300 flex flex-col group">
                        <div className="h-48 relative overflow-hidden">
                            <img src="/images/provincias.avif" className="w-full h-full object-cover  transition-transform duration-700 opacity-80" alt="Provincias" />
                            <div className="absolute inset-0 bg-linear-to-t from-[#151E28] via-[#151E28]/40 to-transparent"></div>
                        </div>
                        <div className="px-8 pb-8 pt-2 flex-1 flex flex-col text-center">
                            <div className="w-14 h-14 rounded-xl bg-gray-200 text-[#151E28] flex items-center justify-center font-extrabold text-xl mx-auto mb-4 shadow-lg -mt-10 relative z-10 border-4 border-[#151E28] font-jakarta">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M9 3L3 6v15l6-3 6 3 6-3V3l-6 3-6-3z" />
                                    <path d="M9 3v15" />
                                    <path d="M15 6v15" />
                                </svg>

                            </div>
                            <h3 className="font-bold text-white text-[1.25rem] mb-3">Provincias</h3>
                            <p className="text-gray-300 text-[0.95rem] font-light leading-relaxed">
                                Organizaciones fuera de urbes principales que buscan acceso remoto a especialistas top sin incurrir en viáticos.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </ScrollReveal>
    )
}
