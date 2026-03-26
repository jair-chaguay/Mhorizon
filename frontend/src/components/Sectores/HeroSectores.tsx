import React from 'react'
import { Button } from '../Button'

export const HeroSectores = () => {
    return (
        <section className="px-20 flex gap-6 items-center relative h-[500px] 
            bg-[url('/images/Recurso60.png')] bg-cover bg-center">
            <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 
                    to-transparent">
            </div>
            <div className="relative">
                <p className='bg-white/60 text-blue-200  w-[210px] rounded-sm text-center p-1 
                                    text-[0.75rem]'>
                    SECTORES DE ESPECIALIZACIÓN
                </p>

                <h1 className='text-white text-shadow-lg text-[2.9rem] font-bold mt-5 w-[530px] 
                tracking-wide'>
                    Impulsando el Éxito
                    <span className='text-orange-500'>
                        <span className='underline underline-offset-18'>
                            <span className='text-white'> en
                            </span> C
                        </span>ada industria
                    </span>
                </h1>

                <p className='text-white mt-6 font-light text-shadow-md text-[1.2rem] w-[45%] 
                text-justify'>
                    Nuestra visión estratégica se adapta a los desafíos específicos de los mercados
                    más dinámicos, ofreciendo soluciones a medida que garantizan competitividad y
                    cumplimiento.
                </p>
                <Button text="AGENDAR CONSULTORÍA"
                    styles="bg-orange-500 text-white font-medium mt-4 w-[240px] rounded-sm" />
            </div>
        </section>
    )
}
