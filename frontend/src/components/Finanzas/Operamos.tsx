import { IconosSVG, Recurso67, Recurso68 } from "../IconosSVG"

export const Operamos = () => {
    return (
        <section className='py-16 md:py-20 bg-gray-800'>
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8">
                    <div className="max-w-xl w-full">
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-200 mb-3 md:mb-4 tracking-tight text-center md:text-left">
                            Cómo Operamos
                        </h2>
                        <div className="h-1.5 w-24 bg-orange-500 mb-5 md:mb-6 mx-auto md:mx-0"></div>
                        <p className="text-blue-200 font-light text-[0.95rem] md:text-lg text-center md:text-left text-balance md:max-w-none mx-auto">
                            Nuestro modelo operativo integra rigor analítico institucional
                            con tecnología de punta para blindar el capital y maximizar el
                            rendimiento.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">

                    <div className="md:col-span-8 group relative overflow-hidden bg-white rounded-xl px-6 md:px-12 py-10 md:py-12 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 shadow-xl">
                        
                        <div className="bg-orange-500 p-4 rounded-br-lg w-18 absolute left-0 top-0 flex justify-center *:text-white z-10">
                            <IconosSVG className="w-10 h-10 md:w-11 md:h-11" />
                        </div>

                        <div className="mt-16 md:mt-20">
                            <h3 className="text-xl md:text-2xl font-bold text-blue-200 mb-3 md:mb-4">
                                Auditoría y Cumplimiento Normativo
                            </h3>
                            <p className="text-blue-200 font-light leading-relaxed max-w-2xl text-[0.95rem] md:text-base">
                                Implementamos protocolos de auditoría exhaustiva alineados a
                                estándares internacionales (NIIF/GAAP), asegurando la total
                                transparencia y solidez de sus estados financieros ante
                                reguladores.
                            </p>
                        </div>
                    </div>

                    <div className="md:col-span-4 bg-blue-200 text-white rounded-xl p-8 md:p-10 flex flex-col justify-center items-center text-center shadow-lg relative overflow-hidden">
                        <div className="bg-orange-500 text-white p-3 md:p-4 absolute top-0 right-4 md:right-10 rounded-b-md z-10">
                            <Recurso67 className="w-8 h-8 md:w-11 md:h-11" />
                        </div>

                        <h3 className="text-xl font-medium mb-3 md:mb-4 mt-12 md:mt-14 relative z-10">
                            Confianza Institucional
                        </h3>
                        <p className="text-white/80 font-light text-[0.95rem] md:text-md leading-relaxed mb-6 relative z-10">
                            Respaldamos la gestión de riesgo y auditoría de las principales
                            entidades financieras de la región.
                        </p>

                        <div className="flex flex-wrap justify-center gap-2 relative z-10">
                            <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-sm tracking-wider">IMAGEN</span>
                        </div>
                    </div>

                    <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
                        
                        <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 text-orange-500">
                                <Recurso68 className="w-8 h-8 shrink-0" />
                                <span className="font-bold tracking-widest text-[0.70rem] md:text-xs uppercase">
                                    Risk Management
                                </span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-blue-200 mb-3 md:mb-4 tracking-tight">
                                Gestión Integral de Riesgos
                            </h3>
                            <p className="text-blue-200 font-light leading-relaxed mb-0 md:mb-8 max-w-lg text-[0.95rem] md:text-base">
                                Sistemas avanzados de detección predictiva y mitigación de
                                exposición en mercados volátiles. Evaluamos y optimizamos los
                                controles internos para prevenir irregularidades y proteger el
                                capital de su institución.
                            </p>
                        </div>
                        
                        <div className="relative min-h-50 md:min-h-75 order-1 md:order-2">
                            <img alt="Datos Financieros"
                                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                                src="/images/Recurso66.webp" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}