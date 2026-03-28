import React from 'react'
import { Analytics } from '../IconosSVG'
import { Headset } from 'lucide-react'

export const CardCalculadora = () => {
    return (
        <div className="space-y-8 lg:my-20">
            <div className="bg-blue-200 rounded-xl p-10 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full -mr-16 -mt-16 
                blur-2xl"></div>
                <div className="relative z-10">
                    <Analytics className="text-orange-500 w-10 mb-6 rounded" />
                    <h4 className="font-medium text-xl mb-3 tracking-tight">
                        Análisis en Tiempo Real
                    </h4>
                    <p className="text-white/70 font-light text-sm leading-relaxed mb-10">
                        Proyección estimada basada en las normativas tributarias vigentes para el 2026.
                    </p>

                    <div className="space-y-8 border-t border-white/10 pt-8">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 text-[0.65rem] uppercase font-medium tracking-[0.2em]">
                                Tasa Proyectada
                            </span>
                            <span className="text-lg font-medium text-white tracking-tighter">
                                24.5%
                            </span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-gray-500 text-[0.65rem] uppercase font-medium tracking-[0.2em]">
                                Estimación de Impuesto
                            </span>
                            <span className="text-5xl font-medium text-orange-500 tracking-tighter">
                                $ 30,625
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center gap-5 
                group cursor-pointer hover:border-orange-500 transition-all shadow-sm hover:bg-orange-500">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center shrink-0 
                    group-hover:bg-orange-500 transition-colors">
                    <Headset className="text-blue-200 text-2xl group-hover:text-white transition-colors duration-300"/>
                </div>
                <div>
                    <p className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-widest group-hover:text-white">
                        Soporte Estratégico
                    </p>
                    <p className="text-sm font-bold text-blue-200 group-hover:text-white transition-colors">
                        Hablar con un Asesor Senior
                    </p>
                </div>
            </div>
        </div>
    )
}
