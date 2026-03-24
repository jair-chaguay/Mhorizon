import React from 'react'

export const EstrIm = () => {
    return (
        <div className='mx-20 flex'>
            <div className='w-[50%] h-[420px] relative flex flex-col items-center'>
                <img className='w-[80%] h-full object-cover relative'
                    src="/images/Recurso42.png" alt="Recurso42"
                />
                <div className='absolute  bg-orange-500 py-4 px-6 text-white rounded-md
                 w-[340px] shadow-xl -bottom-8 left-0'>
                    <h3 className='font-bold text-[1.8rem] '>15%</h3>
                    <p className='font-light'>EN OPTIMIZACIÓN DE IMPUESTOS</p>
                </div>
            </div>
            <div className='text-white w-[40%]'>
                <h2 className='text-[1.75rem] font-medium'>
                    Estrategia de <span className='text-orange-500'>impuestos</span>
                </h2>
                <p className='font-light mt-3'>
                    Nuestra metodología de Tax Strategy no se limita al ahorro; buscamos la creación
                    de valor sostenible. Diseñamos planes que resisten el escrutinio regulatorio
                    mientras potencian el flujo de caja.
                </p>
                <ul className='flex flex-col gap-6 mt-10'>
                    <li className='flex items-center gap-2 font-light'>
                        <img className='size-6'
                            src="/images/Recurso10.png" alt="Recurso10" />
                        <p>Planificación de Precios de Transferencia.</p>
                    </li>
                    <li className='flex items-center gap-2 font-light'>
                        <img className='size-6'
                            src="/images/Recurso10.png" alt="Recurso10" />
                        <p>Reestructuración Coporativa Internacional.</p>
                    </li>
                    <li className='flex items-center gap-2 font-light'>
                        <img className='size-6'
                            src="/images/Recurso10.png" alt="Recurso10" />
                        <p>Incentivos a la I+D y Deducciones Especiales</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}
