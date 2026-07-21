import { ScrollReveal } from "../ScrollReveal"

export const ExperienciaS = () => {
  return (
    <ScrollReveal as={"section"} className="bg-[#151E28] py-24 px-5 sm:px-8 md:px-12 overflow-hidden border-b border-white/5">
            <div className="max-w-350 mx-auto">
                <div className="text-center mb-16 reveal-element">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block font-jakarta">
                        CÓMO FUNCIONA
                    </span>
                    <h2 className="text-white font-extrabold text-[2rem] sm:text-[2.5rem] tracking-tight leading-tight">
                        UNA EXPERIENCIA SENCILLA
                    </h2>
                    <p className="mt-4 text-gray-300 font-light text-[1.05rem] leading-relaxed max-w-3xl mx-auto">
                        El cliente activa su membresía, envía sus consultas a través del canal corporativo y recibe el criterio profesional estructurado de MHORIZON.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal-element delay-100">
                    
                    <div className="relative bg-white rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 group overflow-hidden shadow-2xl border-b-4 border-white hover:border-orange-500">
                        <div className="absolute -right-4 -bottom-8 text-[120px] font-extrabold text-gray-100 group-hover:text-orange-50 transition-colors select-none leading-none z-0 font-jakarta">
                            1
                        </div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-orange-500 text-white rounded-xl flex items-center justify-center font-extrabold text-2xl mb-6 shadow-lg font-jakarta group-hover:bg-blue-200 transition-colors duration-300">1</div>
                            <h3 className="text-[#151E28] text-[1.3rem] font-bold mb-4">Active su membresía</h3>
                            <p className="text-gray-600 font-light text-[0.95rem] leading-relaxed">
                                Complete sus datos en nuestra plataforma, acepte las condiciones de nivel de servicio y realice el pago mensual anticipado para dar inicio.
                            </p>
                        </div>
                    </div>

                    <div className="relative bg-white rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 group overflow-hidden shadow-2xl border-b-4 border-white hover:border-[#151E28]">
                        <div className="absolute -right-4 -bottom-8 text-[120px] font-extrabold text-gray-100 group-hover:text-gray-200 transition-colors select-none leading-none z-0 font-jakarta ">
                            2
                        </div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-orange-500 text-white rounded-xl flex items-center justify-center font-extrabold text-2xl mb-6 shadow-lg font-jakarta group-hover:bg-blue-200 transition-colors duration-300">2</div>
                            <h3 className="text-[#151E28] text-[1.3rem] font-bold mb-4">Envíe su consulta</h3>
                            <p className="text-gray-600 font-light text-[0.95rem] leading-relaxed">
                                Describa el hecho económico, la operación y la pregunta específica, adjuntando la documentación o información de respaldo necesaria.
                            </p>
                        </div>
                    </div>

                    <div className="relative bg-white rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 group overflow-hidden shadow-2xl border-b-4 border-white hover:border-orange-500">
                        <div className="absolute -right-4 -bottom-8 text-[120px] font-extrabold text-gray-100 group-hover:text-orange-50 transition-colors select-none leading-none z-0 font-jakarta">
                            3
                        </div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-orange-500 text-white rounded-xl flex items-center justify-center font-extrabold text-2xl mb-6 shadow-lg font-jakarta group-hover:bg-blue-200 transition-colors duration-300">3</div>
                            <h3 className="text-[#151E28] text-[1.3rem] font-bold mb-4">Reciba criterio</h3>
                            <p className="text-gray-600 font-light text-[0.95rem] leading-relaxed">
                                Obtenga una respuesta escrita detallada y sustentada; y cuando sea necesario, coordine de inmediato una llamada para aclaraciones finales.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </ScrollReveal>
  )
}
