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
                        ACTÍVELA HOY, CONSULTE ESTA SEMANA
                    </h2>
                    <p className="mt-4 text-gray-300 font-light text-[1.15rem] texto-desc max-w-3xl mx-auto">
                        Solicítela en línea, envíe sus dudas y reciba una respuesta escrita con sustento técnico.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal-element delay-100">
                    
                    <div className="relative bg-white rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 group overflow-hidden shadow-2xl border-b-4 border-white hover:border-orange-500">
                        <div className="absolute -right-4 -bottom-8 text-[120px] font-extrabold text-gray-100 group-hover:text-orange-50 transition-colors select-none leading-none z-0 font-jakarta">
                            1
                        </div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-orange-500 text-white rounded-xl flex items-center justify-center font-extrabold text-2xl mb-6 shadow-lg font-jakarta group-hover:bg-blue-200 transition-colors duration-300">1</div>
                            <h3 className="text-[#151E28] text-[1.3rem] font-bold mb-4">Solicite su membresía</h3>
                            <p className="text-gray-600 font-light text-[1.05rem] texto-desc">
                                Complete el formulario con sus datos. Nuestro equipo se pondrá en contacto con usted para coordinar la contratación y la activación de su membresía.
                            </p>
                        </div>
                    </div>

                    <div className="relative bg-white rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 group overflow-hidden shadow-2xl border-b-4 border-white hover:border-[#151E28]">
                        <div className="absolute -right-4 -bottom-8 text-[120px] font-extrabold text-gray-100 group-hover:text-gray-200 transition-colors select-none leading-none z-0 font-jakarta ">
                            2
                        </div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-orange-500 text-white rounded-xl flex items-center justify-center font-extrabold text-2xl mb-6 shadow-lg font-jakarta group-hover:bg-blue-200 transition-colors duration-300">2</div>
                            <h3 className="text-[#151E28] text-[1.3rem] font-bold mb-4">Envíe sus consultas</h3>
                            <p className="text-gray-600 font-light text-[1.05rem] texto-desc">
                                Con la membresía activa, envíe sus dudas tributarias o contables junto con la información o los documentos del caso.
                            </p>
                        </div>
                    </div>

                    <div className="relative bg-white rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 group overflow-hidden shadow-2xl border-b-4 border-white hover:border-orange-500">
                        <div className="absolute -right-4 -bottom-8 text-[120px] font-extrabold text-gray-100 group-hover:text-orange-50 transition-colors select-none leading-none z-0 font-jakarta">
                            3
                        </div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-orange-500 text-white rounded-xl flex items-center justify-center font-extrabold text-2xl mb-6 shadow-lg font-jakarta group-hover:bg-blue-200 transition-colors duration-300">3</div>
                            <h3 className="text-[#151E28] text-[1.3rem] font-bold mb-4">Reciba su respuesta</h3>
                            <p className="text-gray-600 font-light text-[1.05rem] texto-desc">
                                Le respondemos por escrito y con sustento técnico dentro de los 2 días hábiles siguientes. Si es una urgencia, contáctenos y la atendemos de inmediato.
                            </p>
                        </div>
                    </div>

                </div>

                <div className="mt-14 text-center reveal-element delay-200">
                    <a href="#planes" className="inline-block bg-orange-500 text-white font-bold tracking-wider uppercase px-10 py-4 rounded-sm hover:bg-white hover:text-orange-600 shadow-xl hover:shadow-orange-500/20 transition-all duration-300 font-jakarta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">
                        Ver precio de lanzamiento
                    </a>
                    <p className="mt-4 text-gray-400 text-[0.92rem] font-light texto-desc">Sin permanencia · Pago mensual anticipado · Atención en todo el Ecuador</p>
                </div>
            </div>
        </ScrollReveal>
  )
}
