import React from 'react'
import { Button } from '../Button'

export const Integrales = () => {
    return (
        <section className="bg-[url('/images/Integrales.png')] bg-cover bg-bottom relative flex gap-4 px-20 w-full h-[500px]">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>

            <div className='w-[50%] relative mt-10'>
                <p className='w-[160px] bg-white/70 py-1 text-blue-200 text-center rounded-sm text-[0.88rem]'>EXPERTISE GLOBAL</p>

                <div className='w-[80px] mt-5'>
                    <h2 className='font-bold text-white text-[2.5rem]'>SOLUCIONES{" "}
                        <span className='text-orange-500'>
                            <span className='underline underline-offset-14 decoration-5 decoration-orange-500'>
                                INTE</span>GRALES</span>
                    </h2>
                </div>
                <p className='mt-10 text-[1.2rem] text-white w-[700px]'>
                    Potenciamos la arquitectura financiera de su empresa con estrategias de alto impacto,
                    precisión técnica y visión de futuro en el mercado global.
                </p>

            </div>
            <div className='flex gap-5 bg-white/70 absolute w-[48%] p-5 items-center rounded-sm bottom-15'>
                <img className='size-14 bg-white rounded-lg' src="images/Recurso29.png" alt="29" />
                <div>
                    <p className='text-xs text-black/60'>CRECIMIENTO 2026</p>
                    <p className='font-medium'>+45% Eficiencia Operativa</p>
                </div>
            </div>

        </section>
    )
}
