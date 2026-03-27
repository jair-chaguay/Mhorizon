import React from 'react'
import { Button } from '../Button'

export const HeroMercado = () => {
    return (
        <section className="px-20 flex gap-6 items-center relative 
                bg-[url('/images/Recurso01.jpg')] bg-cover bg-center min-h-[500px]">
            <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/80 
                        to-transparent">
            </div>

            <div className="relative max-w-7xl mx-auto px-8 w-full">
                <div className="max-w-3xl">
                    <span className="inline-block px-4 py-1 mb-6 text-blue-200  tracking-wide 
                        text-xs uppercase bg-gray-800/60 rounded-sm">
                        MERCADO & CONSUMIDOR
                    </span>
                    <h1 className="text-5xl md:text-5xl font-headline font-bold text-white tracking-
                        tighter leading-[1.1] mb-5 block">
                        Consumo, Tecnología &
                        <span className="text-orange-500 block">Bienestar</span>
                    </h1>
                    <p className="text-xl md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl text-balance">
                        Respaldamos el área comercial y el crecimiento de marcas globales, asegurando estructuras contables, 
                        tributarias y financieras sólidas y escalables.
                    </p>
                    <Button text='AGENDAR CONSULTORIA'
                        styles='text-white font-bold bg-orange-500 min-w-[240px] mt-5 rounded-sm' />
                </div>
            </div>
        </section>
    )
}
