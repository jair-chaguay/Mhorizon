import React from 'react'
import { Link } from 'react-router-dom'

export const Logistica = () => {
    return (
        <div className='flex gap-2 bg-white shadow-xl border border-gray-400/10 items-center rounded-md'>
            <div className='w-[35%]'>
                <img className='w-full h-full object-cover' src="/images/Recurso56.png" alt="" />
            </div>
            <div className='p-10 w-[60%]'>
                <div className='flex flex-col gap-3'>
                    <p className='text-orange-500  tracking-wider'>
                        LOGÍSTICA & INDUSTRIA
                    </p>
                    <h4 className='text-blue-200 font-bold text-[1.4rem]'>
                        Cadena de Suministro y Operaciones
                    </h4>
                    <p className='text-blue-200 font-light mt-2'>
                        Aportamos rigor analítico y optimización a los procesos críticos de empresas
                        que sostienen la infraestructura, la producción y el comercio exterior a gran
                        escala.
                    </p>
                    <div className='grid grid-cols-3 gap-3 text-blue-200 font-light text-[0.8rem]'>
                        <p className='bg-gray-800 rounded-sm text-center py-1'>Logística y Puertos</p>
                        <p className='bg-gray-800 rounded-sm text-center py-1'>Agroindustria</p>
                        <p className='bg-gray-800 rounded-sm text-center py-1'>Acuacultura</p>
                        <p className='bg-gray-800 rounded-sm text-center py-1'>Industria Química</p>
                    </div>
                    <Link className='text-orange-500 text-[1.2rem} mt-4' to={"/sectores/cadena-suminsitros"}>
                        Conocer más →
                    </Link>
                </div>
            </div>

        </div>
    )
}
