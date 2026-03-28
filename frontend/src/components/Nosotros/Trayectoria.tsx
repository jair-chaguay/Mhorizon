import React from 'react'

export const Trayectoria = () => {
    return (
        <section className="py-30 bg-blue-200 text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div className="text-center mb-32">
                    <span className="text-orange-500 font-medium text-xs tracking-[0.4em] uppercase mb-4 block">
                        Nuestra Trayectoria
                    </span>
                    <h2 className="font-bold text-4xl md:text-5xl text-white uppercase tracking-tighter">
                        Décadas de Respaldo
                    </h2>
                </div>

                <div className="relative">
                    <div className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block 
                        bg-[linear-gradient(to_bottom,transparent,rgba(217,128,5,0.0),rgba(217,128,5,0.4)_15%,rgba(217,128,5,0.4)_85%,rgba(217,128,5,0.0))]">
                    </div>
                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center mb-32 group
                        cursor-pointer">
                        <div className="md:text-right">
                            <h4 className="font-bold text-3xl mb-4 text-orange-500">
                                Consolidación en Guayaquil
                            </h4>
                            <p className="text-white/80 leading-relaxed max-w-md md:ml-auto">
                                Establecimos nuestra sede central en el Edificio Quil 1, integrando servicios contables,
                                preparación de impuestos y consultoría corporativa para responder a la creciente demanda
                                empresarial de la ciudad.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="absolute left-0 top-1/2 -translate-x-[calc(50%+1px)] w-4 h-4 rounded-full 
                        bg-orange-500 shadow-[0_0_15px_rgba(217,128,5,0.8)] hidden md:block z-20"></div>
                            <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                                <img className="w-full h-72 object-cover grayscale opacity-70 group-hover:grayscale-0 
                                    group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                                    alt="Oficinas Guayaquil" src="/images/Recurso09.jpeg" 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center 
                        mb-32 group">
                        <div className="md:order-2">
                            <h4 className="font-bold text-3xl mb-4 text-orange-500">
                                Expansión de Servicios
                            </h4>
                            <p className="text-white/80 leading-relaxed max-w-md">
                                Ampliamos nuestro portafolio para incluir auditorías externas avanzadas y teneduría de libros, convirtiéndonos en un aliado integral para la toma de decisiones gerenciales.
                            </p>
                        </div>
                        <div className="relative md:order-1">
                            <div className="absolute right-0 top-1/2 translate-x-[calc(50%+1px)] w-4 h-4 
                                rounded-full bg-orange-500 shadow-[0_0_15px_rgba(217,128,5,0.8)] 
                                hidden md:block z-20">
                            </div>
                            <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                                <img className="w-full h-72 object-cover grayscale opacity-70 
                                    group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 
                                    group-hover:scale-105" alt="Reunión Corporativa"
                                    src="/images/Recurso11.jpeg"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center group">
                        <div className="md:text-right">
                            <h4 className="font-headline font-bold text-3xl mb-4 text-orange-500">
                                Innovación Tecnológica
                            </h4>
                            <p className="text-white/80 leading-relaxed max-w-md md:ml-auto">
                                Modernizamos nuestras plataformas de análisis tributario y financiero, garantizando
                                a nuestros clientes agilidad, seguridad de datos y proyecciones fiscales en
                                tiempo real.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="absolute left-0 top-1/2 -translate-x-[calc(50%+1px)] w-4 h-4 rounded-full
                             bg-orange-500 shadow-[0_0_15px_rgba(217,128,5,0.8)] hidden md:block z-20">
                            </div>
                            <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                                <img className="w-full h-72 object-cover grayscale opacity-70 
                                group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 
                                group-hover:scale-105" alt="Tecnología Financiera"
                                    src="/images/Recurso65.jpeg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
