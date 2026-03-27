import React from 'react'

export const HeroSubNov = () => {
    return (
        <section className="px-20 flex gap-6 items-center relative 
                bg-[url('/images/Recurso03.jpeg')] bg-cover bg-center min-h-[350px]">
            <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/80 
                        to-transparent">
            </div>

            <div className="relative max-w-7xl mx-auto px-8 w-full">
                <div className="max-w-3xl">
                    <span className="inline-block px-4 py-1 mb-6 text-blue-200  tracking-wide 
                        text-xs uppercase bg-gray-800/60 rounded-sm">
                        TRIBUTARIO
                    </span>
                    <h1 className="text-5xl md:text-5xl font-headline font-bold text-white tracking-
                        tighter leading-[1.1] mb-5 block">
                        Actualización SRI: Nuevos
                        <span className="text-orange-500 block">Porcentajes de Retención 2026</span>
                    </h1>
                    <div className="flex items-center gap-4 mt-4">
                    <div className="w-12 h-1 bg-orange-500"></div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Publicado: 27 Feb, 2026</span>
                </div>
                </div>
            </div>
        </section>
    )
}
