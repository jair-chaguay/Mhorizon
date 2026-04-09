import React, { useEffect, useState } from 'react';
import { ScrollReveal } from '../../../ScrollReveal';
import { type Cliente } from '../types';
import api from '../../../../api/axios';

export interface ObligacionTributaria {
    id: number;
    cliente_id: number;
    tipo_impuesto: string;
    fecha_presentacion: string;
    estado: 'Pendiente' | 'Presentado';
}


interface PerfilClienteProps {
    cliente: Cliente;
    refreshSignal?: number;
    onBack: () => void;
    onOpenDeclaracion: () => void;
    onOpenSubir: () => void;
    onOpenEliminar: (id: number | string, title: string) => void;
    onUpdateSuccess: () => void;
}

const PerfilCliente: React.FC<PerfilClienteProps> = ({
    cliente,
    onBack,
    onOpenDeclaracion,
    onOpenSubir,
    refreshSignal,
    onOpenEliminar,
    onUpdateSuccess
}) => {

    // Verificamos si existe el usuario asociado para extraer su correo
    const usuarioAsociado = cliente.usuarios && cliente.usuarios.length > 0 ? cliente.usuarios[0] : null;

    // --- ESTADO LIMPIO (Sin datos que no se usan) ---
    const [formData, setFormData] = useState({
        razon_social_nombres: cliente.razon_social_nombres || '',
        identificacion: cliente.identificacion || '',
        tipo_persona: cliente.tipo_persona || 'Persona Natural',
        score_tributario: cliente.score_tributario || 100,
        correo: usuarioAsociado ? usuarioAsociado.correo : '', // Extrae el correo
        password: ''
    });


    const [obligaciones, setObligaciones] = useState<ObligacionTributaria[]>([]);
    const [isLoadingObligaciones, setIsLoadingObligaciones] = useState(true);

    const [isSaving, setIsSaving] = useState(false);


    const fetchObligaciones = async () => {
        try {
            setIsLoadingObligaciones(true);
            const { data } = await api.get(`/cliente/${cliente.id}/obligaciones`);
            setObligaciones(data.obligaciones || []);
        } catch (error) {
            console.error("Error al cargar obligaciones:", error);
        } finally {
            setIsLoadingObligaciones(false);
        }
    };

    useEffect(() => {
        fetchObligaciones();
    }, [cliente.id, refreshSignal]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'score_tributario' ? Number(value) : value
        }));
    };

    const handleGuardarPerfil = async () => {
        setIsSaving(true);
        try {
            await api.put(`/cliente/${cliente.id}`, formData);
            alert('Perfil Actualizado Exitosamente.');
            onUpdateSuccess();
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
            alert("Hubo un error al intentar actualizar el perfil.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleGuardarEstados = () => {
        alert("Estados de obligaciones actualizados (Simulación).");
    };


    const handleToggleObligacion = async (id: number) => {
        // Actualizamos visualmente al instante para que se sienta rápido
        setObligaciones(prev => prev.map(ob =>
            ob.id === id ? { ...ob, estado: ob.estado === 'Pendiente' ? 'Presentado' : 'Pendiente' } : ob
        ));

        try {
            await api.put(`/obligacion/${id}/toggle`);
        } catch (error) {
            console.error("Error al cambiar estado:", error);
            // Si falla, revertimos el estado visualmente (opcional)
            fetchObligaciones();
            alert("Hubo un error al actualizar el estado de la obligación.");
        }
    };


    return (
        <ScrollReveal>
            <style>{`
                .react-custom-checkbox {
                    appearance: none;
                    width: 1.25rem;
                    height: 1.25rem;
                    border: 2px solid #D1D5DB;
                    border-radius: 0.25rem;
                    background-color: white;
                    cursor: pointer;
                    position: relative;
                    transition: all 0.2s;
                }
                .react-custom-checkbox:checked {
                    background-color: #D98005;
                    border-color: #D98005;
                }
                .react-custom-checkbox:checked::after {
                    content: '';
                    position: absolute;
                    left: 6px;
                    top: 2px;
                    width: 5px;
                    height: 10px;
                    border: solid white;
                    border-width: 0 2px 2px 0;
                    transform: rotate(45deg);
                }
            `}</style>

            <div className="max-w-350 mx-auto space-y-6 reveal-element active">

                {/* --- 1. BOTÓN DE RETROCESO --- */}
                <div className="flex items-center gap-4 mb-2">
                    <button onClick={onBack} className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-orange-500 transition-colors shadow-sm cursor-pointer">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </button>
                    <div className="flex items-center text-sm font-medium text-gray-500 truncate">
                        <span className="cursor-pointer hover:text-orange-500 transition-colors" onClick={onBack}>Directorio de Clientes</span>
                        <svg className="w-4 h-4 mx-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        <span className="text-blue-200 font-bold">Perfil Editable</span>
                    </div>
                </div>

                {/* --- 2. TARJETA DE DATOS DEL PERFIL --- */}
                <div className="bg-blue-200 rounded-2xl p-6 lg:p-8 shadow-lg relative overflow-hidden mt-5">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l7-3 7 3z"></path></svg>
                    </div>
                    <div className="relative z-10">
                        <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.75rem] uppercase mb-2 block">Datos del Perfil (Modificable)</span>

                        <input
                            type="text"
                            name="razon_social_nombres"
                            value={formData.razon_social_nombres}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b-2 border-white/20 text-[2rem] sm:text-[2.5rem] font-extrabold text-white tracking-tight leading-none mb-6 outline-none focus:border-orange-500 transition-colors pb-1"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">

                            <div className="bg-white/10 rounded-xl p-4 border border-white/5">
                                <p className="text-gray-400 text-[0.70rem] font-bold uppercase tracking-widest mb-1">RUC/Cédula</p>
                                <input type="text" name="identificacion" value={formData.identificacion} onChange={handleInputChange} className="w-full bg-transparent text-white font-mono text-[1rem] outline-none border-b border-transparent focus:border-orange-500 pb-1" />
                            </div>

                            <div className="bg-white/10 rounded-xl p-4 border border-white/5">
                                <p className="text-gray-400 text-[0.70rem] font-bold uppercase tracking-widest mb-1">Correo (Acceso)</p>
                                <input type="email" name="correo" value={formData.correo} onChange={handleInputChange} placeholder="Asignar correo..." className="w-full bg-transparent text-white font-semibold text-[0.95rem] outline-none border-b border-transparent focus:border-orange-500 pb-1" />
                            </div>

                            <div className="bg-white/10 rounded-xl p-4 border border-white/5">
                                <p className="text-gray-400 text-[0.70rem] font-bold uppercase tracking-widest mb-1">Cambiar Clave</p>
                                <input type="text" name="password" value={formData.password} onChange={handleInputChange} placeholder="Escribir nueva clave..." className="w-full bg-transparent text-white font-mono text-[1rem] outline-none border-b border-transparent focus:border-orange-500 pb-1" />
                            </div>

                            <div className="bg-white/10 rounded-xl p-4 border border-white/5">
                                <p className="text-gray-400 text-[0.70rem] font-bold uppercase tracking-widest mb-1">Tipo de contribuyente</p>
                                <select name="tipo_persona" value={formData.tipo_persona} onChange={handleInputChange} className="w-full bg-transparent text-white font-semibold text-[0.95rem] outline-none border-b border-transparent focus:border-orange-500 pb-1 appearance-none cursor-pointer">
                                    <option value="Régimen General">Régimen General</option>
                                    <option value="Rimpe">RIMPE</option>
                                    <option value="Contribuyente Especial">Contribuyente Especial</option>
                                    <option value="Persona Natural">Persona Natural</option>
                                </select>
                            </div>

                            <div className="bg-white/10 rounded-xl p-4 border border-white/5">
                                <p className="text-gray-400 text-[0.70rem] font-bold uppercase tracking-widest mb-1">Score Tributario</p>
                                <div className="flex items-center gap-1 border-b border-transparent focus-within:border-orange-500 pb-1">
                                    <input type="number" name="score_tributario" value={formData.score_tributario} onChange={handleInputChange} min="0" max="100" className="w-full bg-transparent text-white font-black text-[1rem] outline-none" />
                                    <span className="text-gray-400 text-[0.75rem] font-bold">/100</span>
                                </div>
                            </div>

                            {/* Botón Guardar Perfil (Ahora ocupa todo el ancho abajo) */}
                            <button onClick={handleGuardarPerfil} disabled={isSaving} className={`bg-orange-500/20 rounded-xl p-4 border border-orange-500/50 flex flex-col justify-center transition-colors group sm:col-span-2 lg:col-span-3 xl:col-span-5 ${isSaving ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-orange-500'}`}>
                                <div className="flex items-center justify-center gap-3 w-full">
                                    <span className="text-white font-bold text-[0.90rem] uppercase tracking-wider">{isSaving ? 'Guardando...' : 'Guardar Perfil'}</span>
                                    {!isSaving && <svg className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-[1.4rem] font-extrabold text-blue-200 tracking-tight">Obligaciones Tributarias</h2>
                            <p className="text-gray-500 text-[0.85rem] mt-1">Se guardan automáticamente al marcar la casilla.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Eliminamos el botón de Guardar Estados porque ahora es automático por cada check */}
                            <button onClick={onOpenDeclaracion} className="cursor-pointer bg-orange-50 text-orange-600 border border-orange-200 text-[0.75rem] font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg hover:bg-orange-500 hover:text-white transition-all flex items-center gap-2 shrink-0">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                Añadir Obligación
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto border border-gray-100 rounded-xl">
                        <table className="w-full text-left border-collapse min-w-175">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-[0.70rem] font-bold uppercase tracking-widest text-gray-500">
                                    <th className="px-5 py-4 w-12 text-center">Check</th>
                                    <th className="px-5 py-4">Tipo de Impuesto</th>
                                    <th className="px-5 py-4">Fecha de Presentación</th>
                                    <th className="px-5 py-4">Estado Actual</th>
                                    <th className="px-5 py-4 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="text-[0.85rem] divide-y divide-gray-50">
                                {isLoadingObligaciones ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-8 text-gray-400 font-bold uppercase tracking-widest text-[0.75rem]">Cargando obligaciones...</td>
                                    </tr>
                                ) : obligaciones.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-8 text-gray-400 italic">No hay obligaciones registradas para este cliente.</td>
                                    </tr>
                                ) : (
                                    obligaciones.map((ob) => (
                                        <tr key={ob.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-5 py-4 text-center">
                                                <input
                                                    type="checkbox"
                                                    className="react-custom-checkbox"
                                                    checked={ob.estado === 'Presentado'}
                                                    onChange={() => handleToggleObligacion(ob.id)}
                                                />
                                            </td>
                                            <td className="px-5 py-4 font-bold text-blue-200">{ob.tipo_impuesto}</td>
                                            <td className="px-5 py-4 text-gray-600">{ob.fecha_presentacion}</td>
                                            <td className="px-5 py-4">
                                                {ob.estado === 'Presentado' ? (
                                                    <span className="bg-green-50 text-green-600 border border-green-200 px-2.5 py-1 rounded-md text-[0.70rem] font-bold uppercase tracking-widest">
                                                        Presentado
                                                    </span>
                                                ) : (
                                                    <span className="bg-yellow-50 text-yellow-600 border border-yellow-200 px-2.5 py-1 rounded-md text-[0.70rem] font-bold uppercase tracking-widest">
                                                        Pendiente
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-5 py-4 text-center">
                                                <button
                                                    onClick={() => onOpenEliminar(ob.id, ob.tipo_impuesto)}
                                                    className="text-gray-400 hover:text-red-500 mx-1 cursor-pointer"
                                                    title="Eliminar"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- 4. SECCIÓN BIBLIOTECA DOCUMENTAL --- */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-[1.4rem] font-extrabold text-blue-200 tracking-tight">Biblioteca Documental [Q]</h2>
                            <p className="text-gray-500 text-[0.85rem] mt-1">Seleccione el Periodo Fiscal.</p>
                        </div>
                        <button onClick={() => alert("Abrir Modal de Crear Periodo (Simulación)")} className="cursor-pointer bg-blue-200 text-white text-[0.75rem] font-bold uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-orange-500 transition-all flex items-center gap-2 shrink-0">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path></svg>
                            Crear Periodo
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                        <div onClick={() => alert("Navegar a subcarpetas de 2026")} className="border border-orange-200 bg-orange-50 rounded-xl p-5 hover:bg-orange-100 transition-all cursor-pointer group flex flex-col items-center text-center shadow-sm">
                            <svg className="w-10 h-10 text-orange-500 mb-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></svg>
                            <h3 className="font-extrabold text-orange-700 text-[1rem]">2026</h3>
                        </div>

                        <div onClick={() => alert("Navegar a subcarpetas de 2025")} className="border border-gray-200 bg-gray-50 rounded-xl p-5 hover:bg-white hover:border-orange-500 hover:shadow-md transition-all cursor-pointer group flex flex-col items-center text-center">
                            <svg className="w-10 h-10 text-gray-400 group-hover:text-orange-500 mb-2 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></svg>
                            <h3 className="font-extrabold text-blue-200 text-[1rem]">2025</h3>
                        </div>
                    </div>
                </div>

            </div>
        </ScrollReveal>
    );
};

export default PerfilCliente;