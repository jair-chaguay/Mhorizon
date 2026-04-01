import { Analytics } from '../IconosSVG'
import { Headset } from 'lucide-react'

export const CardCalculadora = () => {
    return (
        <div className="lg:col-span-4 flex flex-col gap-8 h-full">
            <div className="bg-blue-200 rounded-2xl p-8 md:p-10 text-white relative overflow-hidden shadow-2xl reveal-element delay-100 border border-white/5 grow">
                <div className="absolute -right-16 -top-16 w-48 h-48 bg-orange-500/20 rounded-full blur-[60px] pointer-events-none"></div>

                <div className="relative z-10">
                    <div className='w-14 h-14 bg-white/10 text-orange-500 flex items-center justify-center rounded-lg mb-8 border border-white/10'>
                        <Analytics className="w-8 h-8" />
                    </div>

                    <h4 className="font-bold text-[1.5rem] mb-3 tracking-tight">
                        Análisis en Tiempo Real
                    </h4>

                    <p className="text-gray-400 font-light text-[0.95rem] leading-relaxed mb-10">
                        Proyección estimada basada en las normativas tributarias vigentes para el 2026.
                    </p>

                    <div className="space-y-8 border-t border-white/10 pt-8">
                        <div className="flex justify-between items-end">
                            <span className="text-gray-400 text-[0.70rem] uppercase font-bold tracking-[0.15em]">
                                Tasa Proyectada
                            </span>
                            <span className="text-2xl font-bold text-white tracking-tight leading-none">
                                24.5%
                            </span>
                        </div>

                        <div className="flex flex-col gap-3">
                            <span className="text-gray-400 text-[0.70rem] uppercase font-bold tracking-[0.15em]">
                                Estimación de Impuesto
                            </span>
                            <span className="text-5xl font-black text-orange-500 tracking-tighter leading-none">
                                $ 30,625
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 flex items-center gap-5 group cursor-pointer hover:border-orange-500 transition-all shadow-lg hover:shadow-xl reveal-element delay-200">
                <div className="w-14 h-14 bg-blue-200 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-orange-500 transition-colors shadow-md">
                    <Headset className="text-white w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div>
                    <p className="text-[0.7rem] font-bold text-orange-500 uppercase tracking-widest mb-1">
                        Soporte Estratégico
                    </p>
                    <p className="text-[1.05rem] font-extrabold text-blue-200 group-hover:text-orange-500 transition-colors">
                        Hablar con un Asesor Senior
                    </p>
                </div>
            </div>
        </div>
    )
}
