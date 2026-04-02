import React from 'react';
import { type DeclaracionCliente } from '../type';
import { ScrollReveal } from '../../ScrollReveal';

const HistorialFiscal: React.FC = () => {
    const declaraciones: DeclaracionCliente[] = [
        { id: '1', periodo: 'Febrero 2026', impuesto: 'IVA (Formulario 104)', estado: 'Pagada', fechaPresentacion: '12 Mar 2026', gestionadoPor: 'Milton Montecé Q.' },
        { id: '2', periodo: 'Enero 2026', impuesto: 'Retención en la Fuente', estado: 'Pagada', fechaPresentacion: '15 Feb 2026', gestionadoPor: 'Violeta Rodríguez' },
        { id: '3', periodo: 'Año 2025', impuesto: 'Impuesto a la Renta Sociedades', estado: 'Borrador', fechaPresentacion: '--', gestionadoPor: 'Pendiente' },
    ];

    return (
        <ScrollReveal className="max-w-350 mx-auto space-y-6">
            <div className='reveal-element'>
                <h1 className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-blue-200 tracking-tight leading-tight mb-2">
                    Historial de Declaraciones
                </h1>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-225">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-[0.70rem] font-bold uppercase tracking-widest text-gray-500">
                                    <th className="px-6 py-4">Periodo</th>
                                    <th className="px-6 py-4">Tipo de Impuesto</th>
                                    <th className="px-6 py-4">Estado</th>
                                    <th className="px-6 py-4">Gestionado Por</th>
                                    <th className="px-6 py-4">Fecha Presentación</th>
                                    <th className="px-6 py-4 text-center">Comprobante</th>
                                </tr>
                            </thead>
                            <tbody className="text-[0.85rem] divide-y divide-gray-50">
                                {declaraciones.map((decl) => (
                                    <tr key={decl.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-blue-200">{decl.periodo}</td>
                                        <td className="px-6 py-4 text-gray-600">{decl.impuesto}</td>
                                        <td className="px-6 py-4">
                                            {decl.estado === 'Pagada' ? (
                                                <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                                                    Presentada y Pagada
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                                                    Borrador
                                                </span>
                                            )}
                                        </td>
                                        <td className={`px-6 py-4 ${decl.gestionadoPor === 'Pendiente' ? 'text-gray-400 italic' : 'text-blue-200 font-medium'}`}>
                                            {decl.gestionadoPor}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{decl.fechaPresentacion}</td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                className={`${decl.estado === 'Pagada' ? 'text-gray-400 cursor-pointer hover:text-orange-500 transition-colors' : 'text-gray-300 cursor-not-allowed'}`}
                                                title="Descargar Comprobante"
                                                disabled={decl.estado !== 'Pagada'}
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                                                </svg>

                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ScrollReveal>
    );
};

export default HistorialFiscal;