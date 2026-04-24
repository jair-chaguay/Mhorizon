/* eslint-disable @typescript-eslint/no-explicit-any */
import { Analytics } from '../IconosSVG'
import { Headset } from 'lucide-react'
import { ContactModal } from '../ContactModal'
import { useState } from 'react'

export const CardCalculadora = ({resultados}: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const formatoMoneda = (valor: any) => `$ ${Number(valor).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Identificar si es Saldo a favor (valor negativo)
    const isSaldoAFavor = resultados?.pagar < 0;
    const valorPagarVisual = Math.abs(resultados?.pagar || 0);

    return (
        <>
            <div className="flex flex-col gap-6">
                <div className="bg-blue-200 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl reveal-element delay-100 border border-white/5">
                    <div className="absolute -right-16 -top-16 w-48 h-48 bg-orange-500/20 rounded-full blur-[60px] pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className='w-10 h-10 bg-white/10 text-orange-500 flex items-center justify-center rounded-lg border border-white/10'>
                                <Analytics className="w-5 h-5" />
                            </div>
                            <h3 className="font-medium text-lg tracking-tight">Resumen Ejecutivo</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                <span className="text-gray-400 text-[0.65rem] font-medium uppercase tracking-widest">Base Imponible:</span>
                                <span className="font-medium text-sm">{formatoMoneda(resultados?.base || 0)}</span>
                            </div>
                            
                            <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                <span className="text-gray-400 text-[0.65rem] font-medium uppercase tracking-widest">Impuesto Causado:</span>
                                <span className="font-bold text-sm">{formatoMoneda(resultados?.causado || 0)}</span>
                            </div>
                            
                            {(resultados?.rebaja > 0) && (
                                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                    <span className="text-gray-400 text-[0.65rem] font-medium uppercase tracking-widest">Rebaja Gastos:</span>
                                    <span className="font-bold text-sm text-green-400">- {formatoMoneda(resultados?.rebaja)}</span>
                                </div>
                            )}

                            {(resultados?.creditos > 0) && (
                                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                    <span className="text-gray-400 text-[0.65rem] font-medium uppercase tracking-widest">Créditos Tributarios:</span>
                                    <span className="font-bold text-sm text-orange-400">- {formatoMoneda(resultados?.creditos)}</span>
                                </div>
                            )}

                            <div className="pt-4">
                                <span className="text-white text-[0.70rem] uppercase font-bold tracking-[0.2em] block mb-1">
                                    {isSaldoAFavor ? 'Saldo a Favor:' : 'Impuesto a Pagar:'}
                                </span>
                                <span className={`text-4xl font-black tracking-tighter block mb-2 ${isSaldoAFavor ? 'text-green-400' : 'text-orange-500'}`}>
                                    {formatoMoneda(valorPagarVisual)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={() => setIsModalOpen(true)} className="bg-white p-5 rounded-2xl border border-gray-200 flex items-center gap-4 group cursor-pointer hover:border-orange-500 transition-all shadow-lg hover:shadow-xl reveal-element delay-200 text-left">
                    <div className="w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-orange-500 transition-colors shadow-md">
                        <Headset className="text-white w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div>
                        <p className="text-[0.65rem] font-bold text-orange-500 uppercase tracking-widest mb-0.5">Soporte Estratégico</p>
                        <p className="text-[0.95rem] font-extrabold text-blue-200 group-hover:text-orange-500 transition-colors">Hablar con un Asesor</p>
                    </div>
                </button>
            </div>
            
            <ContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    )
}