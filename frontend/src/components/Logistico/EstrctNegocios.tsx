import { ScrollReveal } from '../ScrollReveal'

export const EstrctNegocios = () => {
    return (
        <section className="py-24  overflow-hidden">

            <ScrollReveal>
                <div className="px-5 sm:px-8 md:px-12 flex flex-col bg-blue-200 lg:flex-row items-center gap-12 lg:gap-20 mb-20 py-12 reveal-element ">
                    <div className="w-full lg:w-1/2 order-2 lg:order-1">
                        <h3 className="text-white font-extrabold text-[1.8rem] sm:text-[2.2rem] tracking-tight leading-tight mb-6 border-l-4 border-l-orange-500 pl-4">
                            ARQUITECTURA PARA LA EXPANSIÓN LOGÍSTICA
                        </h3>
                        <p className="text-white font-light text-[1.05rem] leading-relaxed mb-6">
                            Asesoría integral para la viabilidad y expansión de flotas de transporte, desarrollo de nuevos centros de distribución y estrategias de inversión en infraestructura de almacenamiento.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <svg className="w-6 h-6 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                <span className="text-gray-300 font-medium text-[0.95rem]">Modelado financiero para nuevas rutas operativas.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-6 h-6 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                <span className="text-gray-300 font-medium text-[0.95rem]">Evaluación fiscal para importación de flotas pesadas.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full lg:w-1/2 order-1 lg:order-2">
                        <div className=" group relative rounded-2xl overflow-hidden shadow-2xl aspect-4/3">
                            <img src="/images/ExpansionLogistica.jpeg" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Logística y Transporte" />
                        </div>
                    </div>
                </div>

            </ScrollReveal>
            <ScrollReveal className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 reveal-element delay-100">
                    <div className="w-full lg:w-1/2">
                        <div className="group relative rounded-2xl overflow-hidden shadow-2xl aspect-4/3">
                            <img src="/images/blindaje.webp" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Consultoría Portuaria" />
                            <div className="absolute inset-0 bg-blue-200/10"></div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <h3 className="text-blue-200 font-extrabold text-[1.8rem] sm:text-[2.2rem] tracking-tight leading-tight mb-6 border-l-orange-500 border-l-4 pl-4">
                            BLINDAJE Y DEFENSA EN COMERCIO EXTERIOR
                        </h3>
                        <p className="text-blue-200 font-light text-[1.05rem] leading-relaxed mb-6">
                            Mapeamos y mitigamos las contingencias inherentes a los procesos aduaneros, contables y de facturación internacional, protegiendo a su agencia frente a multas, glosas o clausuras.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <svg className="w-6 h-6 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                <span className="text-blue-200 font-medium text-[0.95rem]">Defensa técnica en procesos de determinación del SRI.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-6 h-6 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                <span className="text-blue-200 font-medium text-[0.95rem]">Revisión preventiva de declaraciones y retenciones.</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </ScrollReveal>
        </section>
    )
}
