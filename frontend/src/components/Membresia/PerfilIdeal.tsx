import { ScrollReveal } from "../ScrollReveal"

export const PerfilIdeal = () => {
    return (
        <ScrollReveal as={"section"} className="py-24 bg-white border-b border-gray-200 relative">
            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 relative z-10">
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

                    <div className="bg-[#151E28] rounded-2xl shadow-xl border border-white/10 overflow-hidden reveal-element hover:-translate-y-2 transition-transform duration-300 flex flex-col group">
                        <div className="h-48 relative overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" alt="PYMES" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#151E28] via-[#151E28]/40 to-transparent"></div>
                        </div>
                        <div className="px-8 pb-8 pt-2 flex-1 flex flex-col text-center">
                            <div className="w-14 h-14 rounded-xl bg-orange-500 text-white flex items-center justify-center font-extrabold text-xl mx-auto mb-4 shadow-lg -mt-10 relative z-10 border-4 border-[#151E28] font-jakarta">PY</div>
                            <h3 className="font-bold text-white text-[1.25rem] mb-3">PYMES</h3>
                            <p className="text-gray-300 text-[0.95rem] font-light leading-relaxed">
                                Empresas que necesitan criterio tributario corporativo sin el costo de contratar una asesoría integral permanente de planta.
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#151E28] rounded-2xl shadow-xl border border-white/10 overflow-hidden reveal-element delay-100 hover:-translate-y-2 transition-transform duration-300 flex flex-col group">
                        <div className="h-48 relative overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1554200876-56c2f25224fa?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" alt="Gerentes" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#151E28] via-[#151E28]/40 to-transparent"></div>
                        </div>
                        <div className="px-8 pb-8 pt-2 flex-1 flex flex-col text-center">
                            <div className="w-14 h-14 rounded-xl bg-gray-200 text-[#151E28] flex items-center justify-center font-extrabold text-xl mx-auto mb-4 shadow-lg -mt-10 relative z-10 border-4 border-[#151E28] font-jakarta">GE</div>
                            <h3 className="font-bold text-white text-[1.25rem] mb-3">Gerentes</h3>
                            <p className="text-gray-300 text-[0.95rem] font-light leading-relaxed">
                                Propietarios y administradores que desean validar decisiones críticas financieras y operativas antes de ejecutarlas.
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#151E28] rounded-2xl shadow-xl border border-white/10 overflow-hidden reveal-element delay-200 hover:-translate-y-2 transition-transform duration-300 flex flex-col group">
                        <div className="h-48 relative overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" alt="Contadores" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#151E28] via-[#151E28]/40 to-transparent"></div>
                        </div>
                        <div className="px-8 pb-8 pt-2 flex-1 flex flex-col text-center">
                            <div className="w-14 h-14 rounded-xl bg-orange-500 text-white flex items-center justify-center font-extrabold text-xl mx-auto mb-4 shadow-lg -mt-10 relative z-10 border-4 border-[#151E28] font-jakarta">CP</div>
                            <h3 className="font-bold text-white text-[1.25rem] mb-3">Contadores</h3>
                            <p className="text-gray-300 text-[0.95rem] font-light leading-relaxed">
                                Equipos internos o asesores externos que requieren una segunda opinión experta de respaldo frente a casos inusuales.
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#151E28] rounded-2xl shadow-xl border border-white/10 overflow-hidden reveal-element delay-300 hover:-translate-y-2 transition-transform duration-300 flex flex-col group">
                        <div className="h-48 relative overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" alt="Provincias" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#151E28] via-[#151E28]/40 to-transparent"></div>
                        </div>
                        <div className="px-8 pb-8 pt-2 flex-1 flex flex-col text-center">
                            <div className="w-14 h-14 rounded-xl bg-gray-200 text-[#151E28] flex items-center justify-center font-extrabold text-xl mx-auto mb-4 shadow-lg -mt-10 relative z-10 border-4 border-[#151E28] font-jakarta">EC</div>
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
