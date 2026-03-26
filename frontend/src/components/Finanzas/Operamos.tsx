import { IconosSVG, Recurso67, Recurso68 } from "../IconosSVG"

export const Operamos = () => {
    return (
        <section className='py-21 bg-gray-800'>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end 
                    mb-16 gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-4xl font-bold  text-blue-200 
                    mb-4 tracking-tight">
                            Cómo Operamos
                        </h2>
                        <div className="h-1.5 w-24 bg-orange-500 mb-6"></div>
                        <p className="text-blue-200 font-light  text-lg">
                            Nuestro modelo operativo integra rigor analítico institucional
                            con tecnología de punta para blindar el capital y maximizar el
                            rendimiento.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    <div className="md:col-span-8 group relative overflow-hidden bg-white 
                rounded-xl px-12  flex flex-col justify-between transition-all 
                duration-500 hover:-translate-y-1 shadow-xl ">


                        <div className="bg-orange-500 p-4 rounded-r-lg w-30 absolute left-0 top-6
                        flex justify-center *: text-white">

                            <IconosSVG className="w-11 h-11" />

                        </div>

                        <div className="mt-30">
                            <h3 className="text-2xl font-bold text-blue-200 mb-4">
                                Auditoría y Cumplimiento Normativo
                            </h3>
                            <p className="text-blue-200 font-light leading-relaxed max-w-2xl">
                                Implementamos protocolos de auditoría exhaustiva alineados a
                                estándares internacionales (NIIF/GAAP), asegurando la total
                                transparencia y solidez de sus estados financieros ante
                                reguladores.
                            </p>
                        </div>
                    </div>

                    <div className="md:col-span-4 bg-blue-200 text-white rounded-xl p-10 flex 
                    flex-col justify-center items-center text-center shadow-lg relative 
                    overflow-hidden">

                        <div className="bg-orange-500 text-white p-4 absolute -top-1 right-10">
                            <Recurso67 className="w-11 h-11" />
                        </div>

                        <h3 className="text-xl font-medium mb-4 mt-14 relative z-10">
                            Confianza Institucional
                        </h3>
                        <p className="text-white/80 font-light text-md leading-relaxed 
                    mb-6 relative z-10">
                            Respaldamos la gestión de riesgo y auditoría de las principales
                            entidades financieras de la región.
                        </p>

                        <div className="flex flex-wrap justify-center gap-2 relative z-10 Etiquetas Clientes">
                            <span>IMAGEN</span>
                        </div>
                    </div>

                </div>

                <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 bg-white 
                rounded-xl overflow-hidden shadow-lg border border-gray-100 mt-10">
                    <div className="p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-6 text-orange-500">
                            <Recurso68 />
                            <span className="font-bold tracking-widest text-xs uppercase">
                                Risk Management
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-blue-200 mb-4 tracking-tight">
                            Gestión Integral de Riesgos
                        </h3>
                        <p className="text-blue-200 font-light leading-relaxed mb-8 max-w-lg">
                            Sistemas avanzados de detección predictiva y mitigación de
                            exposición en mercados volátiles. Evaluamos y optimizamos los
                            controles internos para prevenir irregularidades y proteger el
                            capital de su institución.
                        </p>

                    </div>
                    <div className="relative min-h-[300px]">
                        <img alt="Datos Financieros"
                            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                            src="/images/Recurso66.webp" />
                    </div>
                </div>

            </div>





        </section>
    )
}
