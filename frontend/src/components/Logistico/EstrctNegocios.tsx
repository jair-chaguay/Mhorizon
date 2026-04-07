import { ScrollReveal } from '../ScrollReveal'

export const EstrctNegocios = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <ScrollReveal className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-20 reveal-element">
                    <div className="w-full lg:w-1/2 order-2 lg:order-1">
                        <span className="w-12 h-1 bg-orange-500 block mb-6"></span>
                        <h3 className="text-blue-200 font-extrabold text-[1.8rem] sm:text-[2.2rem] tracking-tight leading-tight mb-6">
                            Estructuración de Negocios <span className='text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600'>Logísticos</span>
                        </h3>
                        <p className="text-blue-200 font-light text-[1.05rem] leading-relaxed mb-6">
                            Asesoría integral para la viabilidad y expansión de flotas de transporte, desarrollo de nuevos centros de distribución y estrategias de inversión en infraestructura de almacenamiento.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <svg className="w-6 h-6 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                <span className="text-blue-200 font-medium text-[0.95rem]">Modelado financiero para nuevas rutas operativas.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-6 h-6 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                <span className="text-blue-200 font-medium text-[0.95rem]">Evaluación fiscal para importación de flotas pesadas.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full lg:w-1/2 order-1 lg:order-2">
                        <div className=" group relative rounded-2xl overflow-hidden shadow-2xl aspect-4/3">
                            <img src="/images/Recurso08.avif" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Logística y Transporte" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 reveal-element delay-100">
                    <div className="w-full lg:w-1/2">
                        <div className="group relative rounded-2xl overflow-hidden shadow-2xl aspect-4/3">
                            <img src="/images/Recurso03.avif" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Consultoría Portuaria"/>
                                <div className="absolute inset-0 bg-blue-200/10"></div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <span className="w-12 h-1 bg-orange-500 block mb-6"></span>
                        <h3 className="text-blue-200 font-extrabold text-[1.8rem] sm:text-[2.2rem] tracking-tight leading-tight mb-6">
                            Control de Riesgos en  <span className='text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-600'>Comercio Exterior</span>
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
