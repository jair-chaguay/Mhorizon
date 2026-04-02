import React, { useState } from 'react';
import { ScrollReveal } from '../../ScrollReveal';

const AjustesCliente: React.FC = () => {
    return (
        <ScrollReveal>
            <div className="max-w-350 mx-auto space-y-6 reveal-element">
                <h1 className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-blue-200 tracking-tight leading-tight mb-6">
                    Ajustes de Cuenta
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-blue-200 font-bold text-lg mb-4 flex items-center gap-2">
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                Perfil Corporativo
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[0.7rem] text-gray-400 font-bold uppercase tracking-widest">Razón Social</p>
                                    <p className="text-blue-200 font-medium text-sm">Cliente 1 S.A.</p>
                                </div>
                                <div>
                                    <p className="text-[0.7rem] text-gray-400 font-bold uppercase tracking-widest">RUC</p>
                                    <p className="text-blue-200 font-medium text-sm">0991234567001</p>
                                </div>
                                <div>
                                    <p className="text-[0.7rem] text-gray-400 font-bold uppercase tracking-widest">Dirección Matriz</p>
                                    <p className="text-blue-200 font-medium text-sm">Av. Francisco de Orellana, Edificio World Trade Center, Guayaquil</p>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <p className="text-xs text-gray-500 italic">Para modificar la información corporativa o de facturación, comuníquese con su Gerente de Cuenta en MHorizon.</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-6">

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-blue-200 font-bold text-lg mb-4 flex items-center gap-2">
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Seguridad de la Cuenta
                            </h2>
                            <form className="space-y-4 max-w-lg" onSubmit={e => e.preventDefault()}>
                                <div>
                                    <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Contraseña Actual</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500 transition-colors" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Nueva Contraseña</label>
                                        <input type="password" placeholder="••••••••" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Confirmar Nueva Contraseña</label>
                                        <input type="password" placeholder="••••••••" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500 transition-colors" />
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <button type="submit" className="bg-blue-200 text-white text-[0.8rem] font-bold uppercase tracking-widest px-6 py-2.5 rounded-lg shadow hover:bg-orange-500 transition-colors">
                                        Actualizar Contraseña
                                    </button>
                                </div>
                            </form>
                        </div>



                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-blue-200 font-bold text-lg mb-4 flex items-center gap-2">
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                Preferencias de Notificación
                            </h2>
                            <div className="space-y-5">

                                <div className="flex items-start justify-between gap-4 border-b border-gray-50 pb-4">
                                    <div>
                                        <p className="text-blue-200 font-bold text-sm mb-1">Nuevos Archivos en Biblioteca</p>
                                        <p className="text-gray-500 text-xs">Recibir un correo cuando el equipo de MHorizon suba un documento a su repositorio.</p>
                                    </div>
                                    <ToggleSwitch initialChecked={true} />
                                </div>

                                <div className="flex items-start justify-between gap-4 border-b border-gray-50 pb-4">
                                    <div>
                                        <p className="text-blue-200 font-bold text-sm mb-1">Alertas de Vencimiento Fiscal</p>
                                        <p className="text-gray-500 text-xs">Recordatorios automáticos 5 días antes de la fecha límite de presentación.</p>
                                    </div>
                                    <ToggleSwitch initialChecked={true} />
                                </div>

                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-blue-200 font-bold text-sm mb-1">Informativos y Boletines</p>
                                        <p className="text-gray-500 text-xs">Recibir notificaciones sobre nuevas reformas y publicaciones de la firma.</p>
                                    </div>
                                    <ToggleSwitch initialChecked={false} />
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </ScrollReveal>
    );
};

const ToggleSwitch = ({ initialChecked = false }) => {
    const [isChecked, setIsChecked] = useState(initialChecked);

    return (
        <button
            type="button"
            onClick={() => setIsChecked(!isChecked)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isChecked ? 'bg-orange-500' : 'bg-gray-200'}`}
        >
            <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isChecked ? 'translate-x-5' : 'translate-x-0'}`}
            />
        </button>
    );
};

export default AjustesCliente;