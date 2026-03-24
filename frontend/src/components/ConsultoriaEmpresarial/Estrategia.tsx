import React from 'react'

export const Estrategia = () => {
    return (
        <div>
            <h2 className='text-blue-200 text-[1.63rem] text-center font-bold mt-15'>
                Estrategia de valor
            </h2>
            <div className='flex gap-10 mt-15'>
                <div className='w-[55%]'>
                    <img className='w-full h-ful object-cover relative' src="/images/Recurso36.png" alt="recurso_36" />
                    <div></div>
                    <div className='absolute'>
                        <p className='bg-orange-500 text-white rounded-sm text-center'>
                            Ventaja Central
                        </p>
                        <h4 className='text-white font-bold'>Transformación institucional</h4>
                        <p className='text-white text-light'>
                            No solo ofrecemos asesoramiento; rediseñamos la forma en que tu empresa interactúa
                            con su mercado para asegurar un dominio a largo plazo
                        </p>
                    </div>
                </div>
                <div className='flex flex-col gap-10 w-[40%]'>
                    <div className='bg-orange-500 text-white py-10 px-12 rounded-md w-[70%]'>
                        <h2 className='font-bold text-[2.2rem] pt-5'>42%</h2>
                        <p>de aumento en la eficiencia</p>
                        <p className='mt-4 font-light w-[85%] mb-10'>
                            Benchmarks operativos propietarios
                            que superan los estándares de la industria por márgenes significativos.
                        </p>
                    </div>
                    <div className='flex flex-col gap-3 py-10 px-12 shadow-2xl rounded-md w-[70%]'>
                        <p className='font-medium'>Informe de Mercado 2026</p>
                        <p className='text-blue-200/90 font-light'>
                            Descargue nuestro último análisis sobre las tendencias coorporativas
                            globales.
                        </p>
                        <img className='size-7 self-end' src="/images/Recurso37.png" alt="recurso_37" />
                    </div>
                </div>
            </div>
        </div>
    )
}
