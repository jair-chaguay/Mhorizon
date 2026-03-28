
export const Methodology = () => {
    return (
        <section className="py-16 md:py-24 bg-gray-800">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
                
                <div className="flex flex-col mb-12 md:mb-16 gap-6 md:gap-8">
                    <div className="max-w-2xl mx-auto md:mx-0 w-full">
                        <h2 className="text-2xl md:text-3xl font-headline font-bold text-blue-200 tracking-tight mb-4 text-center md:text-left">
                            Nuestra Metodología
                        </h2>
                        <div className="h-1.5 w-24 md:w-74 bg-orange-500 mx-auto md:mx-0"></div>
                    </div>
                    <p className="text-base md:text-lg text-blue-200 font-light text-center md:text-left text-balance md:max-w-none mx-auto">
                        Integramos auditoría profunda con ejecución táctica en terreno para asegurar
                        la estabilidad estructural de sus operaciones.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                    
                    {/* Tarjeta 1: Blanca (Ocupa 8 columnas en md) */}
                    <div className="md:col-span-8 bg-white border-gray-200 border p-8 md:p-12 shadow-xl relative group overflow-hidden rounded-lg">
                        
                        {/* Etiqueta Naranja */}
                        <div className='bg-orange-500 absolute p-3 w-15 h-15 md:w-18 md:h-18 -top-1 items-end flex rounded-sm z-20'>
                            <img className="object-contain" src="/images/Recurso63.png" alt="Recurso63" />
                        </div>
                        
                        <div className="relative z-10 mt-10 md:mt-12">
                            <h3 className="text-xl md:text-2xl font-headline font-medium text-blue-200 mb-3 md:mb-4">
                                Optimización Integral de Flujos
                            </h3>
                            <p className="text-blue-200 font-light text-[0.95rem] md:text-lg leading-relaxed max-w-xl">
                                Rediseñamos redes de suministro, control de inventarios y logística
                                portuaria para reducir fricción y maximizar la resiliencia ante las
                                volatilidades del mercado ecuatoriano e internacional.
                            </p>
                        </div>
                        
                        {/* Figura decorativa de la esquina */}
                        <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-orange-200 -mr-12 -mt-12 md:-mr-16 md:-mt-16 rotate-45 group-hover:bg-orange-500/80 transition-colors duration-500 z-0">
                        </div>
                    </div>


                    {/* Tarjeta 2: Azul (Ocupa 4 columnas en md) */}
                    <div className="md:col-span-4 bg-blue-200 p-8 md:p-10 text-white flex flex-col justify-between rounded-lg relative overflow-hidden shadow-xl">
                        
                        {/* Etiqueta Naranja */}
                        <div className='bg-orange-500 absolute p-3 w-15 h-18 md:w-15 md:h-18 -top-1 items-end flex rounded-sm justify-center z-20'>
                            <img className='w-6 md:w-8 object-contain' src="/images/Recurso64.png" alt="Recurso64" />
                        </div>
                        
                        <div className="relative z-10 mt-10 md:mt-12">
                            <h3 className="text-xl md:text-2xl font-medium mb-3 md:mb-4">
                                Confianza Corporativa
                            </h3>
                            <p className="text-white/80 text-sm md:text-[0.95rem] leading-relaxed mb-6">
                                Nuestra experiencia está respaldada por la gestión y consultoría a
                                líderes del sector portuario, agroindustrial y marítimo en la región.
                            </p>
                            
                            {/* Ajusté un poco el "MARCAS" por si luego le quieres poner logos o etiquetas */}
                            <div className="flex flex-wrap gap-2">
                                <div className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-sm tracking-wider">MARCAS</div>
                            </div>
                        </div>
                    </div>


                    {/* Tarjeta 3: Larga de abajo (Ocupa 12 columnas en md) */}
                    {/* Ajusté el borde naranja para que se vea bien en celulares (border-l-4 vs border-l-8) */}
                    <div className="md:col-span-12 bg-white shadow-xl p-8 md:p-12 border-l-4 md:border-l-8 border-orange-500 rounded-r-lg rounded-l-sm md:rounded-l-none">
                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center">
                            <div className="flex-1">
                                <h3 className="text-xl md:text-2xl text-blue-200 font-bold mb-3 md:mb-4">
                                    Gestión de Riesgos Operativos
                                </h3>
                                <p className="text-blue-200 font-light text-[0.95rem] md:text-lg">
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