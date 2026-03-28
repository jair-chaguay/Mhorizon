
export const AnalisisBoletin = () => {
    return (
        <article className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-24 text-center bg-white mt-8 md:mt-10">
            <div className='bg-white'>

                <p className="text-xl md:text-3xl text-blue-200 leading-relaxed mb-10 md:mb-16 font-headline tracking-tight">
                    Análisis técnico sobre la Resolución NAC-00000009 que redefine el cumplimiento tributario
                    para el presente ejercicio fiscal.
                </p>

                <div className="max-w-none text-blue-200/80 text-[1.05rem] md:text-lg leading-relaxed space-y-10 md:space-y-12">
                    
                    <div className="space-y-4 md:space-y-6">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-blue-200 uppercase tracking-tighter">
                            Impacto en la Operación Corporativa
                        </h2>
                        <p className='font-light text-blue-200 text-left sm:text-center'>
                            A partir del <strong>1 de marzo de 2026</strong>, entra en vigencia la actualización obligatoria
                            de retenciones en la fuente para Impuesto a la Renta. Este cambio afecta principalmente a las
                            transacciones no especificadas bajo la regla general.
                        </p>
                    </div>

                    <div className="py-10 md:py-16 bg-blue-200 rounded-xl shadow-inner relative overflow-hidden my-10 md:my-16 mx-auto w-full">
                        <div className="absolute inset-0 bg-orange-500 opacity-5 pointer-events-none"></div>
                        
                        <span className="block text-xs md:text-[14px] font-black tracking-widest md:tracking-[0.5em] text-orange-500 uppercase mb-6 md:mb-8 relative z-10 px-4">
                            Nueva Tasa General de Retención
                        </span>
                        
                        <div className="flex items-center justify-center gap-5 md:gap-8 relative z-10">
                            <span className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                                3.00%
                            </span>
                            <div className="text-left border-l border-white/20 pl-5 md:pl-8">
                                <span className="block text-slate-500 line-through text-xl md:text-2xl font-bold italic">
                                    2.75%
                                </span>
                                <span className="block text-orange-500 text-[10px] md:text-[12px] font-bold uppercase tracking-widest mt-1 md:mt-2">
                                    Tasa Anterior
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 md:space-y-8">
                        <h3 className="text-2xl md:text-3xl font-bold text-blue-200 uppercase tracking-tight">
                            Acciones Recomendadas
                        </h3>
                        <p className='text-blue-200 font-light text-left sm:text-center'>
                            Es imperativo que los departamentos financieros y contables parametricen sus sistemas ERP para reflejar estos porcentajes. Emitir comprobantes con tasas desactualizadas podría invalidar la deducibilidad del gasto ante futuras auditorías del SRI.
                        </p>
                        <p className='text-blue-200 font-light text-left sm:text-center'>
                            Para una transición sin riesgos, nuestro equipo de consultoría ha desarrollado una matriz de validación que asegura el cumplimiento normativo total de su organización.
                        </p>
                    </div>
                </div>
            </div>
        </article>
    )
}