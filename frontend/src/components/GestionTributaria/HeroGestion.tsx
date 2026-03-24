import React from 'react'
import { Button } from '../Button'

export const HeroGestion = () => {
  return (
    <section className="px-20 flex gap-6 items-center relative h-[450px] bg-[url('/images/Recurso39.png')] 
    bg-cover bg-center">
                <div className="absolute inset-0 bg-linear-to-t from-mist-950 via-mist-800/50 
                to-transparent">
                </div>
                <div className="relative">
                    <p className='bg-white/50 text-blue-200  w-[160px] rounded-sm text-center p-1 
                    text-[0.75rem]'>
                    EXPERTICE GLOBAL
                    </p>
                    <h1 className='text-white text-shadow-lg text-[2.8rem] font-bold mt-5 w-[400px] tracking-wide'>
                        Gestion <span className='text-orange-500'><span className='underline underline-offset-12 decoration-4 decoration-orange-500'>Trib</span>utaria.</span>
                    </h1>
                    <p className='text-white mt-6 font-light text-shadow-md text-[1.15rem] w-[45%]'>
                        Impulsar el crecimiento institucional mediante una estrategia empresarial sofisticada, 
                        excelencia operativa y liderazgo transformador. 
                    </p>
                    <Button text="Agenda una asesoría" 
                                    styles="bg-orange-500 text-white font-medium mt-4 w-[220px] rounded-sm"/>
                </div>
            </section>
    
  )
}
