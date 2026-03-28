import React from 'react'

export const Estrategia = () => {
    return (
        <div className="mt-14 md:mt-0">
            <h2 className="text-blue-200 text-[1.45rem] sm:text-[1.55rem] md:text-[1.63rem] text-center font-bold mt-12 md:mt-15 px-4">
                Estrategia de valor
            </h2>

            <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-10 md:mt-15 px-4 sm:px-6 md:px-12">

                {/* IZQUIERDA */}
                <div className="w-full md:w-[65%] relative rounded-md overflow-hidden">
                    <img
                        className="w-full h-[460px] sm:h-[540px] md:h-full object-cover"
                        src="/images/Recurso36.png"
                        alt="recurso_36"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 md:p-10">
                        <p className="bg-orange-500 text-white text-[0.75rem] md:text-[0.80rem] py-1 shadow-2xl rounded-sm w-fit px-2">
                            Ventaja Central
                        </p>

                        <h4 className="text-white font-medium mt-3 text-[1.45rem] sm:text-[1.6rem] md:text-[1.6rem] leading-tight">
                            Transformación institucional
                        </h4>

                        <p className="text-white font-light text-[0.98rem] sm:text-[1rem] w-full md:w-[70%] mt-3 leading-relaxed">
                            No solo ofrecemos asesoramiento; rediseñamos la forma en que tu empresa interactúa
                            con su mercado para asegurar un dominio a largo plazo
                        </p>
                    </div>
                </div>

                {/* DERECHA */}
                <div className="flex flex-col gap-6 md:gap-10 w-full md:w-[35%]">

                    <div className="bg-orange-500 text-white py-8 sm:py-10 md:py-10 px-7 sm:px- md:px-12 rounded-md">
                        <h2 className="font-bold text-[2.2rem] sm:text-[2.4rem] md:text-[2.2rem] pt-2 md:pt-5">
                            42%
                        </h2>
                        <p className="text-[1rem] sm:text-[1.05rem]">de aumento en la eficiencia</p>

                        <p className="mt-4 font-light w-full md:w-[98%] text-[0.97rem] mb-2 md:mb-10 leading-relaxed">
                            Benchmarks operativos propietarios
                            que superan los estándares de la industria por márgenes significativos.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 py-8 sm:py-10 md:py-10 px-7 sm:px-9 md:px-12 shadow-2xl rounded-md bg-white">
                        <p className="font-medium text-[1rem] sm:text-[1.05rem]">
                            Informe de Mercado 2026
                        </p>

                        <p className="text-blue-200/90 font-light leading-relaxed text-[0.98rem]">
                            Descargue nuestro último análisis sobre las tendencias corporativas
                            globales.
                        </p>

                        <img
                            className="size-7 self-end"
                            src="/images/Recurso37.png"
                            alt="recurso_37"
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}