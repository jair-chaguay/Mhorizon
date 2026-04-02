import React from 'react';
import { ScrollReveal } from '../../ScrollReveal';

const InformativosCliente: React.FC = () => {
    const informativos = [
        { id: 1, categoria: 'Tributario', color: 'bg-blue-600', fecha: 'Abril 01, 2026', titulo: 'Nuevos Porcentajes de Retención en la Fuente', extracto: 'El SRI ha emitido la resolución NAC-00000009 que actualiza los porcentajes de retención aplicables para el segundo trimestre del año.', imagen: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop', hasIcon: false },
        { id: 2, categoria: 'Legal Societario', color: 'bg-emerald-600', fecha: 'Marzo 15, 2026', titulo: 'Reporte de Beneficiarios Finales SCVS', extracto: 'Recordatorio sobre la obligación de reporte de nómina de accionistas y beneficiarios finales ante la Superintendencia de Compañías.', imagen: '', hasIcon: true, icon: 'gavel' },
        { id: 3, categoria: 'Auditoría', color: 'bg-amber-600', fecha: 'Enero 20, 2026', titulo: 'Cierre Fiscal y NIIF 2025', extracto: 'Actualización sobre los principales impactos de las NIIF en el cierre contable y conciliación tributaria para el ejercicio fiscal 2025.', imagen: 'https://images.unsplash.com/photo-1450101499163-c8848c66cb85?q=80&w=800&auto=format&fit=crop', hasIcon: false },
    ];

    return (
        <ScrollReveal className="max-w-350 mx-auto space-y-6">
            <h1 className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-blue-200 tracking-tight leading-tight mb-2">
                Informativos MHorizon
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-element">
                {informativos.map((info) => (
                    <div key={info.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                        <div className="h-40 bg-gray-200 overflow-hidden relative">
                            {info.hasIcon ? (
                                <div className="w-full h-full bg-blue-200 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white/20 text-6xl">{info.icon}</span>
                                </div>
                            ) : (
                                <img src={info.imagen} className="w-full h-full object-cover" alt={info.categoria} />
                            )}
                            <div className={`absolute top-3 left-3 ${info.color} text-white text-[0.65rem] font-bold uppercase tracking-widest px-2 py-1 rounded`}>
                                {info.categoria}
                            </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                            <p className="text-[0.7rem] text-gray-400 font-bold uppercase tracking-widest mb-1">{info.fecha}</p>
                            <h3 className="text-blue-200 font-bold text-lg leading-tight mb-2">{info.titulo}</h3>
                            <p className="text-gray-500 text-sm flex-1">{info.extracto}</p>
                            <button className="mt-4 text-left text-orange-500 font-bold text-sm hover:underline flex items-center gap-1 w-max">
                                Leer completo 
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </ScrollReveal>
    );
};

export default InformativosCliente;