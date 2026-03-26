import React from 'react'
import { Link } from 'react-router-dom'

export const Mercado = () => {
  return (
    <div className='flex gap-2 bg-white shadow-xl border border-gray-400/10 items-center'>
        <div className='p-10 w-[60%]'>
            <div className='flex flex-col gap-2 px-15'>
                <p className='text-orange-500  tracking-wider'>
                    MERCADO & CONSUMIDOR
                </p>
                <h4 className='text-blue-200 font-bold text-[1.4rem]'>
                    Consumo, Tecnología y Bienestar
                </h4>
                <p className='text-blue-200 font-light mt-2'>
                    Respaldamos la agilidad y el crecimiento de marcas globales y organizaciones 
                    orientadas al consumidor final, asegurando estructuras sólidas y escalables. 
                </p>
                <div className='grid grid-cols-3 mt-2 gap-3 text-blue-200 font-light text-[0.8rem]'>
                    <p className='bg-gray-800 rounded-sm text-center py-1'>Consumo Masivo (FMCG)</p>
                    <p className='bg-gray-800 rounded-sm text-center py-1'>Tecnología y Electrónica</p>
                    <p className='bg-gray-800 rounded-sm text-center py-1'>Farmaceútica y Salud</p>
                    <p className='bg-gray-800 rounded-sm text-center py-1'>Hospitalidad y ONGs</p>
                </div>
                <Link className='text-orange-500 text-[1.2rem} mt-4' to={"/"}>Conocer más →</Link>
            </div>
        </div>
        <div className='w-[40%]'>
            <img className='w-full h-full object-cover' src="/images/Recurso55.png" alt="" />
        </div>
    </div>
  )
}
