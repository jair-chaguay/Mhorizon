import { ScrollReveal } from "../ScrollReveal"

export const PreguntasFre = () => {
    return (
        <ScrollReveal as={"section"} className="py-24 bg-white border-t border-gray-200" id="preguntas">
            <div className="max-w-[1000px] mx-auto px-5 sm:px-8">
                <div className="text-center mb-16 reveal-element">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block font-jakarta">
                        Preguntas Frecuentes
                    </span>
                    <h2 className="text-[#151E28] font-extrabold text-[2rem] sm:text-[2.5rem] tracking-tight leading-tight">
                        INFORMACIÓN CLARA ANTES DE ACTIVAR.
                    </h2>
                </div>

                <div className="space-y-4 reveal-element delay-100">

                    <details className="group bg-[#151E28] border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden" open>
                        <summary className="flex items-center justify-between cursor-pointer p-6 sm:p-8 font-bold text-white text-[1.1rem]">
                            ¿La membresía es mensual o anual?
                            <span className="transition-transform duration-300 group-open:rotate-180 text-orange-500 bg-white/10 p-2 rounded-full shrink-0">
                                <svg fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <div className="px-6 sm:px-8 pb-8 text-gray-300 font-light text-[1rem] leading-relaxed border-t border-white/5 pt-5 mt-2">
                            La membresía tiene vigencia anual como acuerdo marco, pero se maneja con facturación y pago mensual anticipado de USD 110 más IVA. No requiere el desembolso del año completo por adelantado.
                        </div>
                    </details>

                    <details className="group bg-[#151E28] border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden">
                        <summary className="flex items-center justify-between cursor-pointer p-6 sm:p-8 font-bold text-white text-[1.1rem]">
                            ¿Puedo suspender el servicio?
                            <span className="transition-transform duration-300 group-open:rotate-180 text-orange-500 bg-white/10 p-2 rounded-full shrink-0">
                                <svg fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <div className="px-6 sm:px-8 pb-8 text-gray-300 font-light text-[1rem] leading-relaxed border-t border-white/5 pt-5 mt-2">
                            Sí. La suspensión del servicio puede solicitarse sin cargos ocultos ni penalidades, siempre y cuando se comunique a la firma antes de la emisión de la factura correspondiente al siguiente período mensual.
                        </div>
                    </details>

                    <details className="group bg-[#151E28] border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden">
                        <summary className="flex items-center justify-between cursor-pointer p-6 sm:p-8 font-bold text-white text-[1.1rem]">
                            ¿Las consultas no utilizadas se acumulan para el mes siguiente?
                            <span className="transition-transform duration-300 group-open:rotate-180 text-orange-500 bg-white/10 p-2 rounded-full shrink-0">
                                <svg fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <div className="px-6 sm:px-8 pb-8 text-gray-300 font-light text-[1rem] leading-relaxed border-t border-white/5 pt-5 mt-2">
                            No. El volumen asignado de hasta 10 consultas corresponde exclusivamente a cada período mensual facturado. No son acumulables ni transferibles a meses posteriores.
                        </div>
                    </details>

                    <details className="group bg-[#151E28] border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden">
                        <summary className="flex items-center justify-between cursor-pointer p-6 sm:p-8 font-bold text-white text-[1.1rem]">
                            ¿Puede utilizarse la misma membresía para varias compañías?
                            <span className="transition-transform duration-300 group-open:rotate-180 text-orange-500 bg-white/10 p-2 rounded-full shrink-0">
                                <svg fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <div className="px-6 sm:px-8 pb-8 text-gray-300 font-light text-[1rem] leading-relaxed border-t border-white/5 pt-5 mt-2">
                            No. Cada membresía ampara y cubre la operación de un solo contribuyente (un RUC específico). Las compañías relacionadas o grupos empresariales requerirán membresías independientes por cada entidad.
                        </div>
                    </details>

                    <details className="group bg-[#151E28] border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden">
                        <summary className="flex items-center justify-between cursor-pointer p-6 sm:p-8 font-bold text-white text-[1.1rem]">
                            ¿Todas las consultas son respondidas directamente por Milton Montecé?
                            <span className="transition-transform duration-300 group-open:rotate-180 text-orange-500 bg-white/10 p-2 rounded-full shrink-0">
                                <svg fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <div className="px-6 sm:px-8 pb-8 text-gray-300 font-light text-[1rem] leading-relaxed border-t border-white/5 pt-5 mt-2">
                            El servicio es prestado por el equipo profesional altamente capacitado de MHORIZON bajo la estricta metodología y dirección técnica institucional. Los casos se asignan y revisan según su nivel de complejidad.
                        </div>
                    </details>

                </div>
            </div>
        </ScrollReveal>
    )
}
