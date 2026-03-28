import React from 'react'

export const ExceOpera = () => {
    return (
        // Redujimos el padding a p-6 en móvil, p-12 en tablet, y tu p-24 original en desktop
        <div className='bg-gray-800 p-6 md:p-12 lg:p-24 rounded-sm'>
            <h2 className='font-bold text-blue-200 text-[1.5rem] md:text-[1.7rem] border-l-4 border-l-orange-500 px-4 md:px-10'>
                Excelencia Operacional
            </h2>
            
            {/* Pasamos a grid-cols-1 en móvil/tablet y a grid-cols-2 en desktop (lg) */}
            <div className='mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10'>
                
                {/* Tarjeta 1 (Blanca) */}
                <div className='bg-white py-10 px-6 md:px-10 shadow-2xl relative border-gray-400/40 border'>
                    
                    {/* Etiqueta Naranja */}
                    <div className='flex flex-col items-center bg-orange-500 absolute w-[72px] h-[88px] md:w-18 md:h-22 -top-1 justify-items-end shadow-xl'>
                        <img className='w-10 h-10 mt-auto mb-4 object-contain'
                            src="/images/Recurso47.png"
                            alt="Recurso47" />
                    </div>

                    <div className='mt-[72px] md:mt-18 text-blue-200'>
                        {/* El título ahora toma todo el ancho en móvil y vuelve a 50% en desktop */}
                        <h3 className='font-bold text-[1.2rem] md:text-[1.26rem] w-full lg:w-[50%]'>
                            Soporte administrativo especializado
                        </h3>
                        <p className='mt-4 md:mt-5 font-light text-blue-200/80 text-[0.95rem] md:text-base'>
                            Nuestro equipo se encarga de las tareas administrativas y burocráticas, permitiendo
                            que su equipo se concentre al 100% en la actividad principal. Utilizamos
                            metodologías ágiles para garantizar la ejecución precisa de cada tarea.
                        </p>
                    </div>

                    <img className='mt-6 md:mt-3 max-w-[150px] md:max-w-full' src="/images/Recurso48.png" alt="Recurso48" />
                </div>

                {/* Tarjeta 2 (Azul) */}
                {/* En móvil: ancho 100%, altura auto y sin margen. En desktop: recupera tus tamaños */}
                <div className='bg-blue-200 py-10 px-6 md:px-10 shadow-xl relative h-auto lg:h-[350px] w-full lg:w-[80%] ml-0 lg:ml-14'>
                    
                    {/* Etiqueta Naranja */}
                    <div className='flex flex-col items-center bg-orange-500 absolute w-[72px] h-[88px] md:w-18 md:h-22 -top-1 justify-items-end shadow-xl'>
                        <img className='w-10 mt-auto mb-4 object-contain'
                            src="/images/Recurso46.png"
                            alt="Recurso46" />
                    </div>
                    
                    <div className='text-white mt-[72px] md:mt-18'>
                        <h3 className='font-bold text-[1.2rem] md:text-[1.26rem]'>
                            Eficiencia de procesos
                        </h3>
                        <p className='mt-4 md:mt-5 font-light text-white/90 text-[0.95rem] md:text-base'>
                            Mapeamos y optimizamos los flujos de trabajo heredados, eliminando redundancias
                            y automatizando procesos manuales repetitivos con tecnología RPA de última
                            generación.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}