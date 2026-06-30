/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react';
import { type ViewClienteID } from '../type';
import { ScrollReveal } from '../../ScrollReveal';
import api from '../../../api/axios';

import Score from '../modals/Score';

interface Props {
    onNavigate: (viewId: ViewClienteID, title: string) => void;
}

const DashboardCliente: React.FC<Props> = ({ onNavigate }) => {
    
    const [score, setScore] = useState<number>(0);
    const [days, setDays] = useState<number | string>('-');
    const [declaracion, setDeclaracion] = useState<string>('Cargando...');
    const [vence, setVence] = useState<string>('Cargando...');
    const [loading, setLoading] = useState<boolean>(true);
    const [isScoreOpen, setIsScoreOpen] = useState(false);

    const [clienteId, setClienteId] = useState<number | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

    const [carpetasActuales, setCarpetasActuales] = useState<any[]>([]);
    const [ultimosArchivos, setUltimosArchivos] = useState<any[]>([]);

    const circumference = 339.292;
    const [gaugeOffset, setGaugeOffset] = useState<number>(circumference);

    useEffect(() => {
        const fetchDashboardData = async () => {
            const userStr = localStorage.getItem('user');
            if (!userStr) return;
            const user = JSON.parse(userStr);
            const currentClienteId = user.cliente_id;
            
            if (!currentClienteId) return;
            
            setClienteId(currentClienteId); // Guardamos el ID en el estado

            try {
                setLoading(true);
                
                const clienteRes = await api.get(`/cliente/${currentClienteId}`);
                const scoreReal = clienteRes.data.cliente.score_tributario || 0;
                setScore(scoreReal);

                setTimeout(() => {
                    const offset = circumference - (scoreReal / 100) * circumference;
                    setGaugeOffset(offset);
                }, 100);

                const obligacionRes = await api.get(`/cliente/${currentClienteId}/obligaciones`);
                const obligaciones = obligacionRes.data.obligaciones || [];

                const pendientes = obligaciones
                    .filter((o: any) => o.estado === 'Pendiente')
                    .map((o: any) => ({
                        ...o,
                        dateObj: new Date(o.fecha_vencimiento_exacta)
                    }))
                    .sort((a: any, b: any) => a.dateObj.getTime() - b.dateObj.getTime());

                if (pendientes.length > 0) {
                    const proxima = pendientes[0];
                    setDeclaracion(proxima.tipo_impuesto);

                    const opcionesFecha: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
                    const fechaFormateada = new Date(proxima.fecha_vencimiento_exacta + 'T00:00:00').toLocaleDateString('es-ES', opcionesFecha);
                    setVence(fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1));

                    const hoy = new Date();
                    hoy.setHours(0, 0, 0, 0);
                    const fechaVencimiento = new Date(proxima.fecha_vencimiento_exacta + 'T00:00:00');
                    const diffTime = fechaVencimiento.getTime() - hoy.getTime();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    
                    setDays(diffDays >= 0 ? diffDays : 'Vencido');
                } else {
                    setDeclaracion('No hay obligaciones pendientes');
                    setVence('N/A');
                    setDays('-');
                }

                const arbolRes = await api.get(`/biblioteca/arbol/${currentClienteId}`);
                const tree = arbolRes.data.biblioteca || [];

                const currentYear = new Date().getFullYear().toString();
                const periodoActual = tree.find((p: any) => p.anio.toString() === currentYear);
                
                setCarpetasActuales(periodoActual?.subcarpetas?.slice(0, 4) || []);

                const allDocs: any[] = [];
                tree.forEach((periodo: any) => {
                    const traverseFolders = (folders: any[]) => {
                        if (!folders) return;
                        folders.forEach(sub => {
                            if (sub.documentos && sub.documentos.length > 0) {
                                allDocs.push(...sub.documentos);
                            }
                            if (sub.subcarpetas && sub.subcarpetas.length > 0) {
                                traverseFolders(sub.subcarpetas);
                            }
                        });
                    };
                    traverseFolders(periodo.subcarpetas);
                });

                allDocs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                setUltimosArchivos(allDocs.slice(0, 2));

            } catch (error) {
                console.error("Error al cargar datos del dashboard:", error);
                setDeclaracion('Error al cargar');
                setVence('Error');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [refreshTrigger]); // <-- Se volverá a ejecutar si refreshTrigger cambia

    const getScoreStatus = () => {
        if (score >= 80) return <span className="text-emerald-600">Óptimo</span>;
        if (score >= 50) return <span className="text-amber-500">Regular</span>;
        return <span className="text-red-600">Crítico</span>;
    };

    const themeColors = [
        { bg: 'bg-blue-50', border: 'border-blue-100/10', text: 'text-blue-700', textDark: 'text-blue-900' },
        { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-700', textDark: 'text-emerald-900' },
        { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-700', textDark: 'text-amber-900' },
        { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-700', textDark: 'text-purple-900' }
    ];

    const handleScoreActualizado = useCallback(() => {
        setRefreshTrigger(prev => prev + 1);
    }, []);

    return (
        <ScrollReveal>
            <div className="max-w-350 mx-auto space-y-6 reveal-element">
                <h1 className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-blue-200 tracking-tight leading-tight">
                    Resumen Ejecutivo
                </h1>

                {loading ? (
                    <div className="animate-pulse flex gap-6">
                        <div className="h-32 bg-gray-200 rounded-2xl w-full"></div>
                        <div className="h-32 bg-gray-200 rounded-2xl w-full"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 shrink-0 ${typeof days === 'number' && days <= 3 ? 'bg-red-50 text-red-600 border-red-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-[0.75rem] text-gray-500 font-bold uppercase tracking-widest leading-none mb-1">Días restantes</p>
                                <p className={`text-5xl font-black leading-none mb-1 ${typeof days === 'number' && days <= 3 ? 'text-red-500' : 'text-blue-200'}`}>
                                    {days} {typeof days === 'number' && (days === 1 ? 'Día' : 'Días')}
                                </p>
                                <p className="text-sm font-semibold text-gray-700 truncate">Vence: {vence}</p>
                                <p className="text-xs text-gray-500 truncate">{declaracion}</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6 relative">
                            <div className="w-20 h-20 shrink-0 flex items-center justify-center">
                                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 120 120">
                                    <circle cx="60" cy="60" r="54" fill="none" stroke="#E5E7EB" strokeWidth="12"></circle>
                                    <circle
                                        className={`${score >= 80 ? 'stroke-emerald-500' : score >= 50 ? 'stroke-amber-400' : 'stroke-red-500'} transition-all duration-1000 ease-out`}
                                        cx="60" cy="60" r="54" fill="none" strokeWidth="12" strokeLinecap="round"
                                        style={{ strokeDasharray: circumference, strokeDashoffset: gaugeOffset }}
                                    ></circle>
                                </svg>
                                <span className="absolute text-2xl font-black text-blue-200">{score}</span>
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-[0.75rem] text-gray-500 font-bold uppercase tracking-widest leading-none mb-1">Score Tributario</p>
                                <p className="text-sm font-semibold text-gray-700">Estado: {getScoreStatus()}</p>
                                <button 
                                    onClick={()=> setIsScoreOpen(true)}
                                    className='bg-blue-200 hover:bg-orange-500 transition-colors duration-300 cursor-pointer py-1 px-3 rounded-sm  mt-2 text-white'>
                                        Calificar
                                </button>
                            </div>
                        </div>

                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 space-y-5">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                        <h2 className="text-xl font-extrabold text-blue-200">
                            Biblioteca de Archivos ({new Date().getFullYear()})
                        </h2>
                    </div>

                    {loading ? (
                        <div className="h-24 bg-gray-100 animate-pulse rounded-xl"></div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {carpetasActuales.length > 0 ? (
                                carpetasActuales.map((carpeta, index) => {
                                    const theme = themeColors[index % themeColors.length];
                                    return (
                                        <div 
                                            key={carpeta.id} 
                                            onClick={() => onNavigate('biblioteca-view', 'Biblioteca de Archivos')} 
                                            className={`${theme.bg} border ${theme.border} rounded-xl p-4 text-center cursor-pointer hover:shadow-md transition-shadow group flex flex-col items-center justify-center`}
                                        >
                                            <svg className={`w-8 h-8 ${theme.text}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 6C4 4.89543 4.89543 4 6 4H10C10.7411 4 11.4116 4.41243 11.7645 5.05943L12.2355 5.94057C12.5884 6.58757 13.2589 7 14 7H18C19.1046 7 20 7.89543 20 9V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <p className={`text-[0.8rem] font-bold ${theme.textDark} mt-2 truncate w-full`} title={carpeta.nombre}>
                                                {carpeta.nombre}
                                            </p>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="col-span-2 md:col-span-4 text-center py-6 text-gray-400 text-sm">
                                    Aún no hay carpetas registradas para este año fiscal.
                                </div>
                            )}
                        </div>
                    )}

                    <div className="pt-4 border-t border-gray-100">
                        <p className="text-sm font-bold text-gray-700 mb-3">Últimos archivos añadidos:</p>
                        
                        {loading ? (
                            <div className="space-y-2">
                                <div className="h-6 bg-gray-100 animate-pulse rounded w-3/4"></div>
                                <div className="h-6 bg-gray-100 animate-pulse rounded w-1/2"></div>
                            </div>
                        ) : (
                            <div className="text-[0.8rem] space-y-2">
                                {ultimosArchivos.length > 0 ? (
                                    ultimosArchivos.map(archivo => (
                                        <div key={archivo.id} className="flex items-center gap-2 text-gray-600">
                                            <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                            <span className="truncate font-medium text-blue-200" title={archivo.nombre_archivo}>
                                                {archivo.nombre_archivo}
                                            </span>
                                            <span className="ml-auto font-medium text-gray-400 shrink-0">
                                                {new Date(archivo.created_at).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-400 italic text-sm">No hay archivos subidos recientemente.</div>
                                )}
                            </div>
                        )}

                        <button
                            onClick={() => onNavigate('biblioteca-view', 'Biblioteca de Archivos')}
                            className="w-full cursor-pointer text-center bg-gray-100 border border-gray-200 text-blue-200 text-[0.8rem] font-bold uppercase tracking-widest p-3 rounded-lg hover:bg-orange-500 hover:text-white mt-5 transition-colors duration-400"
                        >
                            Ir a la Biblioteca Completa
                        </button>
                    </div>
                </div>
            </div>


            {isScoreOpen && clienteId !== null && (
                <Score onClose={()=>setIsScoreOpen(false)}
                clienteId={clienteId}
                    onScoreActualizado={handleScoreActualizado}/>
                
            )}
        </ScrollReveal>
    );
};

export default DashboardCliente;