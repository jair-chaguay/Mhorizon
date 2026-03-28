import React from 'react'
import { Button } from '../Button'

export const HeroGestion = () => {
  return (
    <section className="px-6 md:px-12 lg:px-20 flex gap-6 items-center relative h-[500px] md:h-[450px] bg-[url('/images/Recurso39.png')] bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-mist-950 via-mist-800/50 to-transparent"></div>

      <div className="relative z-10 w-full">
        {/* Etiqueta Expertise */}
        <p className='bg-white/50 text-blue-200 w-[140px] md:w-[160px] rounded-sm text-center p-1 text-[0.65rem] md:text-[0.75rem] uppercase tracking-wider'>
          Expertice Global
        </p>

        {/* Título Principal */}
        <h1 className='text-white text-shadow-lg text-[2rem] md:text-[2.5rem] lg:text-[2.8rem] font-bold mt-5 w-full md:w-[450px] lg:w-[400px] tracking-wide leading-tight'>
          Gestion <span className='text-orange-500'>
            <span className='underline underline-offset-8 md:underline-offset-12 decoration-4 decoration-orange-500'>Trib</span>utaria.
          </span>
        </h1>

        {/* Descripción */}
        <p className='text-white mt-6 font-light text-shadow-md text-[1rem] md:text-[1.1rem] lg:text-[1.15rem] w-full md:w-[70%] lg:w-[45%]'>
          Impulsar el crecimiento institucional mediante una estrategia empresarial sofisticada, 
          excelencia operativa y liderazgo transformador. 
        </p>

        {/* Botón */}
        <div className="mt-8 md:mt-4">
          <Button 
            text="Agenda una asesoría" 
            styles="bg-orange-500 text-white font-medium w-full md:w-[220px] py-3 md:py-2 rounded-sm"
          />
        </div>
      </div>
    </section>
  )
}