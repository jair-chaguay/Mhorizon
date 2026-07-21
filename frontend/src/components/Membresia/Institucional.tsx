import { ScrollReveal } from "../ScrollReveal"

export const Institucional = () => {
    return (
        <ScrollReveal as={"section"} className="py-24 bg-blue-200 relative overflow-hidden" id="respaldo">
            <div className="max-w-350 mx-auto px-5 sm:px-8 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    <div className="lg:w-[50%] reveal-element">
                        <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block font-jakarta">
                            RESPALDO INSTITUCIONAL
                        </span>
                        <h2 className="text-white font-extrabold text-[2rem] sm:text-[2.5rem] tracking-tight leading-tight mb-6">
                            TRANSFORMAMOS EXPERIENCIA SENIOR EN UN SERVICIO ACCESIBLE.
                        </h2>

                        <p className="text-gray-300 font-light text-[1.05rem] leading-relaxed mb-6">
                            La membresía es prestada por el equipo profesional de MHORIZON bajo una rigurosa metodología uniforme y dirección técnica institucional.
                        </p>
                        <p className="text-gray-300 font-light text-[1.05rem] leading-relaxed mb-10">
                            La dirección técnica es liderada por <strong className="font-bold text-white">Milton Montecé</strong>, Magíster en Tributación y socio fundador, con más de 26 años de experiencia, trayectoria comprobada en firmas globales, y sólida experiencia como Director Regional encargado del Servicio de Rentas Internas (SRI).
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className=" group flex items-center gap-5 bg-white  hover:bg-gray-100 border border-white/5 p-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
                                <div className="bg-orange-500 w-15 group-hover:bg-blue-200 transition-colors duration-300 h-12 rounded-lg flex items-center justify-center text-white font-extrabold text-xl shadow-sm font-jakarta">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-route-icon lucide-route"><circle cx="6" cy="19" r="3" /><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" /><circle cx="18" cy="5" r="3" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-blue-200 text-[1.05rem] mb-2">Trayectoria</h4>
                                    <p className="text-[0.9rem] text-gray-700 font-light">Consultoría, auditoría y planificación.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5 group bg-white hover:bg-gray-100 border border-white/5 p-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
                                <div className="bg-orange-500 group-hover:bg-blue-200 duration-300 transition-colors w-15 h-12 rounded-lg flex items-center justify-center text-white font-extrabold text-xl shadow-sm font-jakarta">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe-icon lucide-globe"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-blue-200 text-[1.05rem] mb-2">Firmas Globales</h4>
                                    <p className="text-[0.9rem] text-gray-700 font-light">Experiencia en Deloitte y Moore EC.</p>
                                </div>
                            </div>
                            <div className="flex items-center group gap-5 bg-white hover:bg-gray-100 border border-white/5 p-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
                                <div className="bg-orange-500 w-15 group-hover:bg-blue-200 transition-colors duration-300 h-12 rounded-lg flex items-center justify-center text-white font-extrabold text-xl shadow-sm font-jakarta">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">

                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />

                                        <line x1="8" y1="6" x2="10" y2="6" />
                                        <line x1="8" y1="9" x2="16" y2="9" />
                                        <line x1="7" y1="19" x2="17" y2="19" />

                                        <line x1="8" y1="19" x2="8" y2="15" />
                                        <line x1="12" y1="19" x2="12" y2="15" />
                                        <line x1="16" y1="19" x2="16" y2="15" />

                                        <line x1="7" y1="15" x2="17" y2="15" />

                                        <polygon points="12 12, 7 15, 17 15" fill="currentColor" />
                                    </svg>

                                </div>
                                <div>
                                    <h4 className="font-bold text-blue-200 text-[1.05rem] mb-2">Institucional</h4>
                                    <p className="text-[0.9rem] text-gray-700 font-light">Cargos directivos en Administración.</p>
                                </div>
                            </div>
                            <div className="flex items-center group gap-5 bg-white hover:bg-gray-100 border border-white/5 p-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
                                <div className="bg-orange-500 w-15 h-12 group-hover:bg-blue-200 transition-colors duration-300 rounded-lg flex items-center justify-center text-white font-extrabold text-xl shadow-sm font-jakarta">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building2-icon lucide-building-2"><path d="M10 12h4" /><path d="M10 8h4" /><path d="M14 21v-3a2 2 0 0 0-4 0v3" /><path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" /><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-blue-200 text-[1.05rem] mb-2">Empresarial</h4>
                                    <p className="text-[0.9rem] text-gray-700 font-light">Sectores corporativos diversos.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-[50%] reveal-element delay-200 mt-10 lg:mt-0 lg:pl-10">
                        <div className="group bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border  hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 relative">
                            <div className="relative h-80 sm:h-112 lg:h-150 overflow-hidden">
                                <img className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700  opacity-97  group-hover:opacity-100"
                                    alt="Milton Montecé Q." src="images/MILTON.png" onError={(e) => { e.currentTarget.src = '/images/Milton_Montece.webp' }} />
                                <div className="absolute inset-0 "></div>
                            </div>
                            <div className="absolute bottom-0 inset-x-0 p-8 md:p-10 flex flex-col justify-end text-white">
                                <div className="w-16 h-1 bg-orange-500 mb-4"></div>
                                <p className="text-orange-500 font-bold text-[0.85rem] uppercase tracking-widest mb-1 font-jakarta">Presidente y Socio</p>
                                <h4 className="font-extrabold text-[2rem] tracking-tight">Milton Montecé Q.</h4>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </ScrollReveal>
    )
}
