import { ScrollReveal } from "../ScrollReveal"

export const Institucional = () => {
    return (
        <ScrollReveal as={"section"} className="py-24 bg-gray-50 relative overflow-hidden" id="respaldo">
            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    <div className="lg:w-[50%] reveal-element">
                        <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block font-jakarta">
                            RESPALDO INSTITUCIONAL
                        </span>
                        <h2 className="text-[#151E28] font-extrabold text-[2rem] sm:text-[2.5rem] tracking-tight leading-tight mb-6">
                            TRANSFORMAMOS EXPERIENCIA SENIOR EN UN SERVICIO ACCESIBLE.
                        </h2>

                        <p className="text-gray-600 font-light text-[1.05rem] leading-relaxed mb-6">
                            La membresía es prestada por el equipo profesional de MHORIZON bajo una rigurosa metodología uniforme y dirección técnica institucional.
                        </p>
                        <p className="text-gray-600 font-light text-[1.05rem] leading-relaxed mb-10">
                            La dirección técnica es liderada por <strong className="font-bold text-[#151E28]">Milton Montecé</strong>, Magíster en Tributación y socio fundador, con más de 26 años de experiencia, trayectoria comprobada en firmas globales (Deloitte, Moore), y sólida experiencia como Director Regional encargado del Servicio de Rentas Internas (SRI).
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col bg-[#151E28] border border-white/5 p-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
                                <div className="bg-orange-500 w-12 h-12 rounded-lg flex items-center justify-center text-white font-extrabold text-xl mb-4 shadow-sm font-jakarta">26+</div>
                                <h4 className="font-bold text-white text-[1.05rem] mb-2">Trayectoria</h4>
                                <p className="text-[0.9rem] text-gray-400 font-light">Consultoría, auditoría y planificación.</p>
                            </div>
                            <div className="flex flex-col bg-[#151E28] border border-white/5 p-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
                                <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center text-[#151E28] font-extrabold text-xl mb-4 shadow-sm font-jakarta">D/M</div>
                                <h4 className="font-bold text-white text-[1.05rem] mb-2">Firmas Globales</h4>
                                <p className="text-[0.9rem] text-gray-400 font-light">Experiencia en Deloitte y Moore EC.</p>
                            </div>
                            <div className="flex flex-col bg-[#151E28] border border-white/5 p-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
                                <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center text-[#151E28] font-extrabold text-xl mb-4 shadow-sm font-jakarta">SRI</div>
                                <h4 className="font-bold text-white text-[1.05rem] mb-2">Institucional</h4>
                                <p className="text-[0.9rem] text-gray-400 font-light">Cargos directivos en Administración.</p>
                            </div>
                            <div className="flex flex-col bg-[#151E28] border border-white/5 p-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
                                <div className="bg-orange-500 w-12 h-12 rounded-lg flex items-center justify-center text-white font-extrabold text-xl mb-4 shadow-sm font-jakarta">B2B</div>
                                <h4 className="font-bold text-white text-[1.05rem] mb-2">Empresarial</h4>
                                <p className="text-[0.9rem] text-gray-400 font-light">Sectores corporativos diversos.</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-[50%] reveal-element delay-200 mt-10 lg:mt-0 lg:pl-10">
                        <div className="group bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 relative">
                            <div className="relative h-[600px] overflow-hidden bg-[#151E28]">
                                <img className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 mix-blend-luminosity opacity-90 group-hover:mix-blend-normal group-hover:opacity-100"
                                    alt="Milton Montecé Q." src="images/MILTON.png" onError={(e)=> {e.currentTarget.src='https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop'}} />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#151E28] via-[#151E28]/50 to-transparent"></div>
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
