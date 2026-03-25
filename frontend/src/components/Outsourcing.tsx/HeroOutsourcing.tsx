import React from 'react'
import { Button } from '../Button'

export const HeroOutsourcing = () => {
    return (
        <section className="px-20 flex gap-6 items-center relative h-[500px] 
        bg-[url('/images/Recurso45.png')] bg-cover bg-center opacity-95">
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 
                to-transparent">
            </div>
            <div className="relative">
                <p className='bg-white/60 text-blue-200  w-[160px] rounded-sm text-center p-1 
                                text-[0.75rem]'>
                    EFICIENCIA ESTRATÉGICA
                </p>

                <h1 className='text-white text-shadow-lg text-[2.9rem] font-bold mt-5 w-[400px] tracking-wide'>
                    Outsourcing <span className='text-orange-500'><span className='underline underline-offset-12 decoration-4 decoration-orange-500'>Estr</span>atégico</span>
                </h1>
                
                <p className='text-white mt-6 font-light text-shadow-md text-[1.2rem] w-[45%] text-justify'>
                    Transformamos su back-office através de processos inteligentes, soporte especializado y 
                    tecnologia de punta para impulsionar y agilitar tu negocio. 
                </p>
                <Button text="Agenda una asesoría"
                    styles="bg-orange-500 text-white font-medium mt-4 w-[220px] rounded-sm" />
            </div>

            <div className='absolute bg-white/40 bottom-0 right-33 px-10 py-6 text-center'>
                <h2 className='text-orange-500 text-shadow-lg text-[2.5rem] font-extrabold'>35%</h2>
                <p className='font-extralight italic text-blue-200/80 text-[1.5rem] mb-2'>Reducción media de costos</p>
            </div>
        </section>
    )
}
