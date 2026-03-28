import React from 'react'

export const Integrales = () => {
    return (
        <section className="bg-[url('/images/Integrales.png')] bg-cover bg-bottom relative flex gap-4 px-5 sm:px-8 md:px-20 w-full h-auto md:h-[500px] pt-10 md:pt-0 pb-28 md:pb-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>

            <div className='w-full md:w-[50%] relative mt-0 md:mt-10 z-10'>
                <p className='w-[160px] bg-white/70 py-1 text-blue-200 text-center rounded-sm text-[0.82rem] sm:text-[0.88rem] md:text-[0.88rem]'>
                    EXPERTISE GLOBAL
                </p>

                <div className='w-[220px] sm:w-[260px] md:w-[80px] mt-5'>
                    <h2 className='font-bold text-white text-[2rem] sm:text-[2.2rem] md:text-[2.5rem] leading-tight'>
                        SOLUCIONES{" "}
                        <span className='text-orange-500'>
                            <span className='underline underline-offset-10 md:underline-offset-14 decoration-4 md:decoration-5 decoration-orange-500'>
                                INTE
                            </span>
                            GRALES
                        </span>
                    </h2>
                </div>

                <p className='mt-8 md:mt-10 text-[1rem] sm:text-[1.1rem] md:text-[1.2rem] text-white w-full md:w-[700px] leading-relaxed'>
                    Potenciamos la arquitectura financiera de su empresa con estrategias de alto impacto,
                    precisión técnica y visión de futuro en el mercado global.
                </p>
            </div>

            <div className='flex gap-5 bg-white/70 absolute w-[90%] sm:w-[85%] md:w-[48%] p-4 sm:p-5 md:p-5 items-center rounded-sm bottom-6 sm:bottom-8 md:bottom-15 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 z-10'>
                <img className='w-12 h-12 md:size-14 bg-white rounded-lg object-contain p-1 md:p-0' src="images/Recurso29.png" alt="29" />
                <div>
                    <p className='text-[0.7rem] sm:text-xs md:text-xs text-black/60'>CRECIMIENTO 2026</p>
                    <p className='font-medium text-[0.95rem] sm:text-[1rem] md:text-base'>+45% Eficiencia Operativa</p>
                </div>
            </div>

        </section>
    )
}