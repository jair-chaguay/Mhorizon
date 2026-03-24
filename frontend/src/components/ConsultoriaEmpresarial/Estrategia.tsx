import React from 'react'

export const Estrategia = () => {
    return (
        <div>
            <h2 className='text-blue-200 text-[1.63rem] text-center font-bold mt-15'>
                Estrategia de valor
            </h2>

            <div className='flex gap-16 mt-15 px-12'>
                <div className='w-[65%] relative'>
                    <img
                        className='w-full h-full object-cover'
                        src="/images/Recurso36.png"
                        alt="recurso_36"
                    />

                    <div className='absolute inset-0 bg-linear-to-t from-black/70 to-transparent'></div>

                    <div className='absolute bottom-0 left-0 w-full p-10'>
                        <p className='bg-orange-500 text-white text-[0.80rem] py-1 shadow-2xl rounded-sm w-fit px-2'>
                            Ventaja Central
                        </p>

                        <h4 className='text-white font-medium mt-2 text-[1.6rem]'>
                            Transformación institucional
                        </h4>

                        <p className='text-white font-light text-[0.95rem] w-[70%]'>
                            No solo ofrecemos asesoramiento; rediseñamos la forma en que tu empresa interactúa
                            con su mercado para asegurar un dominio a largo plazo
                        </p>
                    </div>
                </div>

                {/* DERECHA */}
                <div className='flex flex-col gap-10 w-[35%]'>

                    <div className='bg-orange-500 text-white py-10 px-12 rounded-md'>
                        <h2 className='font-bold text-[2.2rem] pt-5'>42%</h2>
                        <p>de aumento en la eficiencia</p>

                        <p className='mt-4 font-light w-[98%] text-[0.93rem] mb-10'>
                            Benchmarks operativos propietarios
                            que superan los estándares de la industria por márgenes significativos.
                        </p>
                    </div>

                    <div className='flex flex-col gap-3 py-10 px-12 shadow-2xl rounded-md'>
                        <p className='font-medium'>Informe de Mercado 2026</p>

                        <p className='text-blue-200/90 font-light'>
                            Descargue nuestro último análisis sobre las tendencias coorporativas
                            globales.
                        </p>

                        <img
                            className='size-7 self-end'
                            src="/images/Recurso37.png"
                            alt="recurso_37"
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}