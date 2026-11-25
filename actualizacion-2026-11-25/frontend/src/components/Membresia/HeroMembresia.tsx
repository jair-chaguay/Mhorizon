import { ScrollReveal } from "../ScrollReveal";
import { useState } from 'react'
import { ModalMembresia } from './ModalMembresia'

export const HeroMembresia = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <ScrollReveal
                as={"section"}
                className="relative flex items-center px-5 sm:px-8 md:px-20 w-full min-h-137.5 md:min-h-162.5 py-16 lg:py-20 bg-[url('/images/HomeHero.webp')] bg-cover bg-center overflow-hidden"
            >
                <div className="absolute inset-0 bg-linear-to-r from-[#151E28]/95 via-[#151E28]/80 to-transparent"></div>

                <div className="relative z-10 w-full max-w-350 mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 ">

                    <div className="w-full lg:w-[55%] reveal-element">

                        <div className="inline-flex items-center gap-2 bg-white/10 border border-orange-500/30 px-4 py-1.5 rounded-sm mb-6 backdrop-blur-sm shadow-lg">

                            <p className="text-orange-500 font-bold tracking-widest uppercase text-[0.75rem] font-jakarta">
                                MEMBRESÍA DE CONSULTORÍA TRIBUTARIA
                            </p>
                        </div>

                        <h1 className="text-white drop-shadow-2xl text-[2.6rem] sm:text-[3rem] md:text-[3.8rem] font-extrabold w-full tracking-tight leading-[1.05]">
                            La experiencia tributaria de las grandes empresas, <span className="text-orange-500">ahora al alcance de la suya.</span>

                        </h1>

                        <p className="text-gray-200 mt-6 text-[1.05rem] sm:text-[1.15rem] md:text-[1.25rem] w-full texto-desc drop-shadow-md text-left font-light max-w-2xl">
                            Antes de firmar, pagar o declarar, consulte a especialistas. Reciba criterio tributario senior por escrito, con base legal y una recomendación aplicable a su caso, desde cualquier ciudad del Ecuador y por una cuota mensual fija.
                        </p>



                        <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 font-jakarta">
                            <a href="#planes" id="agenda-hero-btn" className="cursor-pointer bg-orange-500 text-white font-bold tracking-wider uppercase w-full sm:w-auto px-8 py-4 rounded-sm hover:bg-white hover:text-orange-600 shadow-xl hover:shadow-orange-500/20 transition-all duration-300 text-center">
                                VER LA MEMBRESÍA
                            </a>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="cursor-pointer bg-transparent text-white border border-white/30 font-bold tracking-wider uppercase w-full sm:w-auto px-8 py-4 rounded-sm hover:bg-white/10 transition-all duration-300 text-center">
                                HABLAR CON UN ESPECIALISTA
                            </button>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.98rem] text-gray-300 font-light texto-desc">
                            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>Lanzamiento: USD 110 + IVA al mes</span>
                            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>Sin penalidad por cancelar</span>
                            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>100% remoto</span>
                        </div>
                    </div>

                    <div className="w-full lg:w-[60%] max-w-125 reveal-element delay-300 hidden lg:block animate-float">
                        <div className="bg-white rounded-2xl shadow-2xl p-10 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-orange-500 group-hover:h-2 transition-all"></div>

                            <p className="text-orange-500 font-bold text-[0.8rem] uppercase tracking-widest mb-2 font-jakarta">
                                Precio de lanzamiento
                            </p>
                            <p className="text-gray-500 text-[0.9rem] font-jakarta mb-1">
                                Precio regular <span className="line-through decoration-orange-500 decoration-2">USD 150 + IVA</span>
                            </p>
                            <div className="flex items-end gap-2 mb-2 font-jakarta">
                                <h2 className="text-[#151E28] text-[4.5rem] font-extrabold leading-none tracking-tighter">110</h2>
                                <div className="pb-2">
                                    <span className="block text-[#151E28] font-bold text-xl leading-none">USD</span>
                                    <span className="block text-orange-500 font-bold text-md mt-1">+ IVA / mes</span>
                                </div>
                            </div>

                            <p className="text-blue-200 text-[0.98rem] font-light mb-8 pb-6 border-b border-gray-200 texto-desc">
                                Pensado para PYMES con dudas tributarias todos los meses. Pago mensual anticipado, sin penalidad por cancelar.

                            </p>

                            <ul className="space-y-4 mb-2 font-inter">
                                <li className="flex items-center gap-3">
                                    <div className="bg-orange-50 text-orange-500 rounded-full p-1 mt-0.5 border border-orange-100">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[#151E28] font-medium text-[1rem]">Hasta 10 consultas tributarias o contables al mes</p>
                                        <span className="text-[0.92rem] text-gray-500 tracking-[0.01em]">Renta, IVA, retenciones, ISD, ICE, comprobantes y anexos.</span>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="bg-orange-50 text-orange-500 rounded-full p-1 mt-0.5 border border-orange-100">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[#151E28] font-medium text-[1rem]">Respuesta escrita con sustento legal</p>
                                        <span className="text-[0.92rem] text-gray-500 tracking-[0.01em]">Base legal, análisis y recomendación práctica.</span>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="bg-orange-50 text-orange-500 rounded-full p-1 mt-0.5 border border-orange-100">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[#151E28] font-medium text-[1rem]">Aclaración telefónica de 15 minutos</p>
                                        <span className="text-[0.92rem] text-gray-500 tracking-[0.01em]">Sobre cada respuesta emitida.</span>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="bg-orange-50 text-orange-500 rounded-full p-1 mt-0.5 border border-orange-100">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>

                                    <div>
                                        <p className="text-[#151E28] font-medium text-[1rem]">Historial en su Portal Cliente</p>
                                        <span className="text-[0.92rem] text-gray-500 tracking-[0.01em]">Sus respuestas archivadas y listas para una revisión.</span>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="bg-orange-50 text-orange-500 rounded-full p-1 mt-0.5 border border-orange-100">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>

                                    <div>
                                        <p className="text-[#151E28] font-medium text-[1rem]">Alertas de reformas tributarias</p>
                                        <span className="text-[0.92rem] text-gray-500 tracking-[0.01em]">Cambios normativos que afectan a su empresa.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </ScrollReveal>

            <ModalMembresia
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};