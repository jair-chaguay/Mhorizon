import { ScrollReveal } from "../ScrollReveal"

export const Propuesta = () => {
  return (
    <ScrollReveal as={"section"} className="bg-gray-800 py-24 overflow-hidden border-b border-gray-200">
            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12">
                <div className="text-center mb-16 reveal-element">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block font-jakarta">
                        La propuesta MHORIZON
                    </span>
                    <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[2.8rem] text-[#151E28] font-extrabold leading-tight tracking-tight">
                        RESPALDO TRIBUTARIO RECURRENTE
                    </h2>
                    <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-[1.05rem] md:text-[1.1rem] font-light leading-relaxed">
                        Convertimos el conocimiento técnico senior de la firma en un servicio organizado, estructurado y altamente accesible para pequeñas y medianas empresas.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 reveal-element delay-100">
                    
                    <div className="relative bg-[#151E28] border border-white/10 rounded-2xl p-8 hover:bg-[#1A2530] hover:border-orange-500/50 transition-colors group overflow-hidden shadow-xl hover:shadow-2xl">
                        <div className="absolute -right-6 -top-6 text-[100px] font-extrabold text-white/5 group-hover:text-orange-500/10 transition-colors select-none leading-none z-0 font-jakarta">
                            10
                        </div>
                        <div className="relative z-10 flex flex-col h-full">
                            <h4 className="text-orange-500 font-bold mb-1 uppercase tracking-wider text-sm font-jakarta">Alcance</h4>
                            <h3 className="text-white text-[1.3rem] font-bold mb-4">Absolución de Consultas tributarias</h3>
                            <p className="text-gray-300 font-light text-[0.95rem] leading-relaxed flex-1">
                                Consultas tributarias puntuales disponibles para ser utilizadas en cada período mensual facturado, cubriendo las dudas operativas.
                            </p>
                        </div>
                    </div>

                    <div className="relative bg-[#151E28] border border-white/10 rounded-2xl p-8 hover:bg-[#1A2530] hover:border-orange-500/50 transition-colors group overflow-hidden shadow-xl hover:shadow-2xl">
                        <div className="absolute -right-2 -top-6 text-[100px] font-extrabold text-white/5 group-hover:text-orange-500/10 transition-colors select-none leading-none z-0 font-jakarta">
                            §
                        </div>
                        <div className="relative z-10 flex flex-col h-full">
                            <h4 className="text-orange-500 font-bold mb-1 uppercase tracking-wider text-sm font-jakarta">Respaldo</h4>
                            <h3 className="text-white text-[1.3rem] font-bold mb-4">Sustento Normativo</h3>
                            <p className="text-gray-300 font-light text-[0.95rem] leading-relaxed flex-1">
                                Respuestas escritas detalladas con base legal firme, análisis técnico profundo y opinión profesional conclusiva que blinda su decisión.
                            </p>
                        </div>
                    </div>

                    <div className="relative bg-[#151E28] border border-white/10 rounded-2xl p-8 hover:bg-[#1A2530] hover:border-orange-500/50 transition-colors group overflow-hidden shadow-xl hover:shadow-2xl">
                        <div className="absolute -right-6 -top-6 text-[100px] font-extrabold text-white/5 group-hover:text-orange-500/10 transition-colors select-none leading-none z-0 font-jakarta">
                            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M20 22.621l-3.521-6.792c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.82-2.106 1.039c-1.339.654-3.518 3.516-1.583 8.016l7.986 18.529c2.25 5.223 6.136 3.011 7.425 2.378l2.066-1.021-2.184-6.32z"/></svg>
                        </div>
                        <div className="relative z-10 flex flex-col h-full">
                            <h4 className="text-orange-500 font-bold mb-1 uppercase tracking-wider text-sm font-jakarta">Servicio</h4>
                            <h3 className="text-white text-[1.3rem] font-bold mb-4">Aclaración Incluida</h3>
                            <p className="text-gray-300 font-light text-[0.95rem] leading-relaxed flex-1">
                                Una aclaración telefónica coordinada sobre cada respuesta emitida para resolver de inmediato cualquier detalle operativo.
                            </p>
                        </div>
                    </div>

                    <div className="relative bg-[#151E28] border border-white/10 rounded-2xl p-8 hover:bg-[#1A2530] hover:border-orange-500/50 transition-colors group overflow-hidden shadow-xl hover:shadow-2xl">
                        <div className="absolute -right-6 -top-6 text-[100px] font-extrabold text-white/5 group-hover:text-orange-500/10 transition-colors select-none leading-none z-0 font-jakarta">
                            EC
                        </div>
                        <div className="relative z-10 flex flex-col h-full">
                            <h4 className="text-orange-500 font-bold mb-1 uppercase tracking-wider text-sm font-jakarta">Soporte en</h4>
                            <h3 className="text-white text-[1.3rem] font-bold mb-4">Todo el Ecuador</h3>
                            <p className="text-gray-300 font-light text-[0.95rem] leading-relaxed flex-1">
                                Atención 100% remota diseñada para un solo RUC, garantizando la misma excelencia sin importar en qué provincia opere.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </ScrollReveal>
  )
}
