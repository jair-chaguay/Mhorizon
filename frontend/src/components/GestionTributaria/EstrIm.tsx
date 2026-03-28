import React from 'react'

export const EstrIm = () => {
    return (
        // Cambiamos mx-20 por padding (px) para evitar desbordes. Flex-col para móvil, flex-row para md/desktop
        <div className='px-6 md:px-12 lg:px-20 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-16 md:gap-8 lg:gap-0'>
            
            {/* Contenedor de la Imagen */}
            <div className='w-full md:w-[50%] h-[320px] sm:h-[400px] md:h-[420px] relative flex flex-col items-center'>
                <img className='w-[95%] md:w-[80%] h-full object-cover relative rounded-md'
                    src="/images/Recurso42.png" alt="Recurso42"
                />
                
                {/* Caja Flotante Naranja */}
                {/* En móvil se centra horizontalmente (left-1/2 -translate-x-1/2) y en desktop vuelve a la izquierda */}
                <div className='absolute bg-orange-500 py-4 px-6 text-white rounded-md w-[85%] sm:w-[340px] shadow-xl -bottom-10 md:-bottom-8 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 md:ml-4 lg:ml-0 z-10'>
                    <h3 className='font-bold text-[1.5rem] md:text-[1.8rem] leading-tight'>15%</h3>
                    <p className='font-light text-[0.9rem] md:text-base mt-1'>EN OPTIMIZACIÓN DE IMPUESTOS</p>
                </div>
            </div>

            {/* Contenedor de Texto */}
            <div className='text-white w-full md:w-[45%] lg:w-[40%] mt-4 md:mt-0'>
                <h2 className='text-[1.6rem] md:text-[1.75rem] font-medium'>
                    Estrategia de <span className='text-orange-500'>impuestos</span>
                </h2>
                <p className='font-light mt-4 text-[0.95rem] md:text-base text-justify md:text-left'>
                    Nuestra metodología de Tax Strategy no se limita al ahorro; buscamos la creación
                    de valor sostenible. Diseñamos planes que resisten el escrutinio regulatorio
                    mientras potencian el flujo de caja.
                </p>
                
                <ul className='flex flex-col gap-5 md:gap-6 mt-8 md:mt-10'>
                    {/* Items de la lista: alineación superior (items-start) en móvil por si el texto salta a 2 líneas */}
                    <li className='flex items-start md:items-center gap-3 font-light'>
                        <img className='w-6 h-6 object-contain mt-1 md:mt-0 shrink-0'
                            src="/images/Recurso10.png" alt="Recurso10" />
                        <p className='text-[0.95rem] md:text-base'>Planificación de Precios de Transferencia.</p>
                    </li>
                    <li className='flex items-start md:items-center gap-3 font-light'>
                        <img className='w-6 h-6 object-contain mt-1 md:mt-0 shrink-0'
                            src="/images/Recurso10.png" alt="Recurso10" />
                        <p className='text-[0.95rem] md:text-base'>Reestructuración Corporativa Internacional.</p>
                    </li>
                    <li className='flex items-start md:items-center gap-3 font-light'>
                        <img className='w-6 h-6 object-contain mt-1 md:mt-0 shrink-0'
                            src="/images/Recurso10.png" alt="Recurso10" />
                        <p className='text-[0.95rem] md:text-base'>Incentivos a la I+D y Deducciones Especiales.</p>
                    </li>
                </ul>
            </div>
            
        </div>
    )
}