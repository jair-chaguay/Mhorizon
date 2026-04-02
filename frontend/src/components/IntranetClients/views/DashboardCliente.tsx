import React, { useEffect, useState } from 'react';
import { type ViewClienteID } from '../type';
import { ScrollReveal } from '../../ScrollReveal';

interface Props {
    onNavigate: (viewId: ViewClienteID, title: string) => void;
}

const DashboardCliente: React.FC<Props> = ({ onNavigate }) => {
    const [gaugeOffset, setGaugeOffset] = useState(180);

    useEffect(() => {
        setTimeout(() => {
            setGaugeOffset(14.4);
        }, 100);
    }, []);

    return (
        <ScrollReveal>
            <div className="max-w-350 mx-auto space-y-6 reveal-element">
                <h1 className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-blue-200 tracking-tight leading-tight">
                    Resumen Ejecutivo
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
                        <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center border-4 border-orange-100 shrink-0">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-[0.75rem] text-gray-500 font-bold uppercase tracking-widest leading-none mb-1">Días restantes</p>
                            <p className="text-5xl font-black text-blue-200 leading-none mb-1">7 Días</p>
                            <p className="text-sm font-semibold text-gray-700 truncate">Vence: Abril 15, 2026</p>
                            <p className="text-xs text-gray-500 truncate">Declaración de IVA - Marzo</p>
                        </div>
                    </div>

                    {/* Card Score Tributario */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6 relative">
                        <div className="w-20 h-20 shrink-0 flex items-center justify-center">
                            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="54" fill="none" stroke="#E5E7EB" strokeWidth="12"></circle>
                                <circle
                                    className="gauge-arc-green transition-all duration-1000 ease-out"
                                    cx="60" cy="60" r="54" fill="none" strokeWidth="12" strokeLinecap="round"
                                    style={{ strokeDasharray: 180, strokeDashoffset: gaugeOffset }}
                                ></circle>
                            </svg>
                            <span className="absolute text-2xl font-black text-blue-200">92</span>
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-[0.75rem] text-gray-500 font-bold uppercase tracking-widest leading-none mb-1">Score Tributario</p>
                            <p className="text-sm font-semibold text-gray-700">Estado: <span className="text-emerald-600">Óptimo</span></p>
                            <p className="text-xs text-gray-500">Calculado con catastro tributario.</p>
                            <button
                                onClick={() => onNavigate('historial-view', 'Historial Fiscal')}
                                className="text-xs text-orange-500 font-bold hover:underline mt-1 flex items-center gap-1"
                            >
                                Ver detalles <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>

                {/* Biblioteca Resumen */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 space-y-5">
                    <h2 className="text-xl font-extrabold text-blue-200">Biblioteca de Archivos (Resumen)</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div onClick={() => onNavigate('biblioteca-view', 'Biblioteca de Archivos')} className="bg-blue-50 border border-blue-100/10 rounded-xl p-4 text-center cursor-pointer hover:shadow-md transition-shadow group flex flex-col items-center justify-center">
                            <svg className="w-8 h-8 text-blue-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6C4 4.89543 4.89543 4 6 4H10C10.7411 4 11.4116 4.41243 11.7645 5.05943L12.2355 5.94057C12.5884 6.58757 13.2589 7 14 7H18C19.1046 7 20 7.89543 20 9V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15 11L15 17M18 14L12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="text-[0.8rem] font-bold text-blue-900 mt-2 truncate w-full">Declaraciones</p>
                        </div>

                        <div onClick={() => onNavigate('biblioteca-view', 'Biblioteca de Archivos')} className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center cursor-pointer hover:shadow-md transition-shadow group flex flex-col items-center justify-center">
                            <svg className="w-8 h-8 text-emerald-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6C4 4.89543 4.89543 4 6 4H10C10.7411 4 11.4116 4.41243 11.7645 5.05943L12.2355 5.94057C12.5884 6.58757 13.2589 7 14 7H18C19.1046 7 20 7.89543 20 9V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 12V16M15 14V16M18 10V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="text-[0.8rem] font-bold text-emerald-900 mt-2 truncate w-full">Estados Finan.</p>
                        </div>

                        <div onClick={() => onNavigate('biblioteca-view', 'Biblioteca de Archivos')} className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-center cursor-pointer hover:shadow-md transition-shadow group flex flex-col items-center justify-center">
                            <svg className="w-8 h-8 text-amber-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6C4 4.89543 4.89543 4 6 4H10C10.7411 4 11.4116 4.41243 11.7645 5.05943L12.2355 5.94057C12.5884 6.58757 13.2589 7 14 7H18C19.1046 7 20 7.89543 20 9V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 12H18M12 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="text-[0.8rem] font-bold text-amber-900 mt-2 truncate w-full">Anexos Mens.</p>
                        </div>

                        <div onClick={() => onNavigate('biblioteca-view', 'Biblioteca de Archivos')} className="bg-purple-50 border border-purple-100 rounded-xl p-4 text-center cursor-pointer hover:shadow-md transition-shadow group flex flex-col items-center justify-center">
                            <svg className="w-8 h-8 text-purple-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6C4 4.89543 4.89543 4 6 4H10C10.7411 4 11.4116 4.41243 11.7645 5.05943L12.2355 5.94057C12.5884 6.58757 13.2589 7 14 7H18C19.1046 7 20 7.89543 20 9V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15 12V16M15 12C15 10.8954 14.1046 10 13 10V10C11.8954 10 11 10.8954 11 12V12M15 16H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="text-[0.8rem] font-bold text-purple-900 mt-2 truncate w-full">Docs. Legales</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <p className="text-sm font-bold text-gray-700 mb-3">Últimos archivos añadidos:</p>
                        <div className="text-[0.8rem] space-y-2">
                            <div className="flex items-center gap-2 text-gray-600">
                                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <span className="truncate font-medium text-blue-200">Certificado Cumplimiento Scvs.pdf</span>
                                <span className="ml-auto font-medium text-gray-400">Abril 01, 2026</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>                            <span className="truncate font-medium text-blue-200">IVA Marzo 2026 Borrador.pdf</span>
                                <span className="ml-auto font-medium text-gray-400">Marzo 28, 2026</span>
                            </div>
                        </div>
                        <button
                            onClick={() => onNavigate('biblioteca-view', 'Biblioteca de Archivos')}
                            className="w-full text-center bg-gray-100 border border-gray-200 text-blue-200 text-[0.8rem] font-bold uppercase tracking-widest p-3 rounded-lg hover:bg-orange-500 hover:text-white mt-5 transition-colors"
                        >
                            Ir a la Biblioteca Completa
                        </button>
                    </div>
                </div>
            </div>
        </ScrollReveal>
    );
};

export default DashboardCliente;