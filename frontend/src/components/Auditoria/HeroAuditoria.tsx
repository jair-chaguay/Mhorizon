import React from 'react'
import { Button } from '../Button'

export const HeroAuditoria = () => {
    return (
        <section className="px-20 flex gap-6 items-center relative h-[500px] 
        bg-[url('/images/Recurso52.png')] bg-cover bg-center opacity-95">
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 
                to-transparent">
            </div>
            <div className="relative">
                <p className='bg-white/60 text-blue-200  w-[180px] rounded-sm text-center p-1 
                                text-[0.75rem]'>
                    AUTORIDAD ESTRATÉGICA
                </p>

                <h1 className='text-white text-shadow-lg text-[2.9rem] font-bold mt-5 w-[400px] tracking-wide'>
                    Auditoría <span className='text-orange-500'><span className='underline underline-offset-12 decoration-4 decoration-orange-500'>Fina</span>nciera</span>
                </h1>
                
                <p className='text-white mt-6 font-light text-shadow-md text-[1.2rem]  text-justify'>
                    Integridad absoluta en cada registro contable.
                </p>
                <Button text="AGENDAR CONSULTORÍA"
                    styles="bg-orange-500 text-white font-medium mt-4 w-[220px] rounded-sm" />
            </div>

            <div className='absolute bg-white/40 bottom-4 right-0 px-10 py-4 text-center'>
                <h2 className='text-orange-500 text-shadow-lg text-[2.5rem] font-extrabold'>99.8%</h2>
                <p className='font-extralight italic text-blue-200/80 text-[1.5rem] mb-2'>Precisión de los informes</p>
            </div>
        </section>
    )
}
