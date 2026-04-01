import { ScrollReveal } from "../ScrollReveal"

export const AnalisisBoletin = () => {
    return (
        <article className="max-w-225 mx-auto px-5 sm:px-8 py-16 md:py-20 bg-gray-50">
            <ScrollReveal className='prose prose-lg max-w-none text-gray-700 font-light leading-relaxed'>

                <p className="text-[1.2rem] md:text-[1.3rem] text-blue-200 leading-relaxed mb-10 reveal-element">
                    A partir de las recientes disposiciones del Gobierno Central, el Servicio de Rentas Internas (SRI) ha emitido la Resolución NAC-00000009. Este documento normativo establece las nuevas directrices obligatorias para los agentes de retención a nivel nacional.
                </p>

                <div className="max-w-none text-blue-200/80 text-[1.05rem] md:text-lg leading-relaxed space-y-10 md:space-y-12">

                    <div className="space-y-6 mb-16 reveal-element delay-100">
                        <h2 className="text-2xl md:text-[1.8rem] font-extrabold text-blue-200 tracking-tight">
                            Impacto en la Operación Corporativa
                        </h2>
                        <p>
                            A partir del <strong className="text-blue-200 font-bold">1 de marzo de 2026</strong>, entra en vigencia la actualización obligatoria de retenciones en la fuente para el Impuesto a la Renta. Este cambio estructural afecta principalmente a todas las transacciones comerciales que no se encuentren especificadas bajo ninguna regla especial, modificando el esquema de flujo de caja para proveedores y contratistas.
                        </p>
                    </div>

                    <div className="my-16 bg-blue-200 rounded-2xl shadow-2xl relative overflow-hidden reveal-element delay-200">
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-500/20 rounded-full blur-[60px] pointer-events-none"></div>

                        <div className="p-8 md:p-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                            <div className="w-full md:w-1/2">
                                <span className="inline-block bg-orange-500/10 text-orange-500 border border-orange-500/30 px-3 py-1 rounded-sm text-[0.70rem] font-bold tracking-widest uppercase mb-4">
                                    KPI TRIBUTARIO
                                </span>
                                <h3 className="text-white text-[1.4rem] font-bold leading-tight">
                                    Nueva Tasa General de Retención
                                </h3>
                                <p className="text-gray-400 text-[0.95rem] mt-2">
                                    Aplicable a la adquisición de todo tipo de bienes muebles de naturaleza corporal.
                                </p>
                            </div>

                            <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end gap-6">
                                <div className="text-right">
                                    <span className="block text-gray-500 line-through text-2xl font-bold italic">2.75%</span>
                                    <span className="block text-gray-400 text-[0.7rem] uppercase tracking-widest mt-1">Tasa Anterior</span>
                                </div>
                                <div className="w-px h-16 bg-white/20"></div>
                                <div>
                                    <span className="block text-orange-500 text-6xl md:text-7xl font-black tracking-tighter leading-none">3.00%</span>
                                    <span className="block text-white text-[0.7rem] uppercase tracking-widest mt-2 ml-1">Vigente 2026</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 reveal-element delay-300">
                        <h3 className="text-2xl md:text-[1.8rem] font-extrabold text-blue-200 tracking-tight">
                            Acciones Recomendadas Inmediatas
                        </h3>
                        <p>
                            Es imperativo que los departamentos financieros y contables parametricen sus sistemas ERP (Enterprise Resource Planning) para reflejar estos nuevos porcentajes antes de la fecha límite. Emitir comprobantes de retención con tasas desactualizadas podría generar multas, intereses y la invalidación de la deducibilidad del gasto ante futuras auditorías de control del SRI.
                        </p>
                        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg mt-8">
                            <p className='text-blue-200 font-bold m-0'>
                                Para una transición sin riesgos, nuestro equipo de consultoría ha desarrollado una matriz de validación que asegura el cumplimiento normativo total de su organización.
                            </p>
                        </div>

                    </div>
                </div>
            </ScrollReveal>
        </article>
    )
}