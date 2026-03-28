import React from 'react'
import { Button } from '../Button'

export const HeroNosotros = () => {
    return (
        // Unificamos el padding lateral (px-6 en móvil, hasta px-20 en desktop)
        // Agregamos py-16 en móvil para darle espacio vertical
        <section className="px-6 md:px-12 lg:px-20 flex items-center relative bg-[url('/images/Recurso01.jpg')] bg-cover bg-center min-h-[500px] py-16 lg:py-0">
            
            {/* Overlay: De abajo hacia arriba en móvil, de izquierda a derecha en escritorio */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/70 to-black/30 lg:bg-linear-to-r lg:from-black/90 lg:via-black/80 lg:to-transparent">
            </div>

            {/* Quitamos el px-8 para evitar el doble padding. z-10 para asegurar visibilidad */}
            <div className="relative max-w-7xl mx-auto lg:mx-0 w-full z-10">
                <div className="max-w-6xl">
                    
                    {/* Etiqueta */}
                    <span className="inline-block px-3 md:px-4 py-1 mb-4 md:mb-6 text-blue-200 tracking-wide text-[0.65rem] md:text-xs uppercase bg-gray-800/60 rounded-sm font-semibold">
                        NUESTRA IDENTIDAD
                    </span>
                    
                    {/* Título Principal */}
                    {/* Corregido el "tracking- tighter". Escalado de texto: 3xl -> 4xl -> 5xl */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold text-white tracking-tighter leading-[1.1] mb-4 md:mb-5 block">
                        Mejores prácticas
                        <span className="text-orange-500 block mt-1 md:mt-0">tributarias, legales y financieras</span>
                    </h1>
                    
                    {/* Contenedor del Párrafo y Estadística */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-6 items-center">
                        <p className="text-slate-300 text-[1.05rem] md:text-[1.1rem] font-light leading-relaxed">
                            Somos una firma consultora con sede en Guayaquil conformada por profesionales especializados. Transformamos la complejidad regulatoria del mercado ecuatoriano en estrategias de crecimiento seguro.
                        </p>
                        
                        {/* MAGIA RESPONSIVE AQUÍ:
                            En móvil: border-t (borde superior), pt-6 (padding top), pl-0 (sin padding izquierdo).
                            En tablet/desktop: border-t-0 (quitamos borde superior), md:border-l (borde izquierdo), md:pt-0 (sin padding top), md:pl-12 (padding izquierdo).
                        */}
                        <div className="flex items-center border-t md:border-t-0 md:border-l border-white/20 pt-6 md:pt-0 pl-0 md:pl-12">
                            <div className="text-white text-center md:text-left w-full md:w-auto">
                                <div className="text-4xl md:text-5xl font-extrabold mb-1 md:mb-2 text-orange-500 md:text-white">+20</div>
                                <div className="text-[11px] md:text-[12px] text-white/70 md:text-orange-500 uppercase tracking-widest font-black">
                                    Años de Experiencia
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Botón */}
                    {/* w-full en móvil, recupera tamaño fijo en sm/md. Separado del grid con mt-10 en móviles */}
                    <div className="mt-10 md:mt-8">
                        <Button text='AGENDAR CONSULTORIA'
                            styles='text-white font-bold bg-orange-500 w-full sm:w-[240px] py-3 md:py-2 rounded-sm' />
                    </div>
                </div>
            </div>
        </section>
    )
}