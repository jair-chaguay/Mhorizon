import React from 'react'

export const Methodology = () => {
    return (
        <section className="py-24 bg-gray-800">
            <div className="max-w-7xl mx-auto px-20">
                <div className="flex flex-col  mb-16 gap-8">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl font-headline font-bold text-blue-200 
                        tracking-tight mb-4">
                            Nuestra Metodología
                        </h2>
                        <div className="h-1.5 w-74 bg-orange-500"></div>
                    </div>
                    <p className="text-lg text-blue-200 font-light mx-auto">
                        Integramos auditoría profunda con ejecución táctica en terreno para asegurar
                        la estabilidad estructural de sus operaciones.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-8 bg-white border-gray-200 border p-12 
                    shadow-xl relative group overflow-hidden rounded-lg">
                        <div className='bg-orange-500 absolute p-3 w-18 h-18 -top-1
                        items-end flex rounded-sm'>
                            <img src="/images/Recurso63.png" alt="Recurso63" />
                        </div>
                        <div className="relative z-10 mt-12">

                            <h3 className="text-2xl font-headline font-medium text-blue-200 mb-4">
                                Optimización Integral de Flujos
                            </h3>
                            <p className="text-blue-200 font-light text-lg leading-relaxed max-w-xl">
                                Rediseñamos redes de suministro, control de inventarios y logística
                                portuaria para reducir fricción y maximizar la resiliencia ante las
                                volatilidades del mercado ecuatoriano e internacional.
                            </p>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200 -mr-16 -mt-16 
                    rotate-45 group-hover:bg-orange-500/80 transition-colors duration-500">
                        </div>
                    </div>


                    <div className="md:col-span-4 bg-blue-200 p-10 text-white flex flex-col 
                        justify-between rounded-lg relative">
                        <div className='bg-orange-500 absolute p-3 w-15 h-18 -top-1
                        items-end flex rounded-sm justify-center'>
                            <img className='w-8' src="/images/Recurso64.png" alt="Recurso64" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-medium mb-4 mt-12">
                                Confianza Corporativa
                            </h3>

                            <p className="text-white/70 text-2sm leading-relaxed mb-6">
                                Nuestra experiencia está respaldada por la gestión y consultoría a
                                líderes del sector portuario, agroindustrial y marítimo en la región.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <div>MARCAS</div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-12 bg-white shadow-xl p-12 border-l-8 
                border-orange-500 rounded-r-lg">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1">
                                <h3 className="text-2xl text-blue-200 
                            font-bold mb-4">
                                    Gestión de Riesgos Operativos
                                </h3>
                                <p className="text-blue-200 font-light text-lg">
                                    Identificación proactiva de cuellos de botella para blindar
                                    la continuidad del negocio. Anticipamos interrupciones en la
                                    cadena de frío, transporte y abastecimiento antes de que afecten
                                    su rentabilidad.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
