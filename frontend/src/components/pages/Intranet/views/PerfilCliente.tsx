/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { ScrollReveal } from '../../../ScrollReveal';
import { type Cliente } from '../types';
import api from '../../../../api/axios';

export interface ObligacionTributaria {
    id: number;
    cliente_id: number;
    tipo_impuesto: string;
    fecha_presentacion: string;
    fecha_vencimiento_exacta: string;
    estado: 'Pendiente' | 'Presentado';
    creador?: {
        id: number;
        nombre: string;
        apellido: string;
    };
}

interface PerfilClienteProps {
    cliente: Cliente;
    refreshSignal?: number;
    onBack: () => void;
    onOpenDeclaracion: () => void;
    onOpenSubir: (obligacionId: number, tipoImpuesto: string) => void;
    onOpenEliminar: (id: number | string, title: string) => void;
    onUpdateSuccess: (updatedCliente: Cliente) => void;
    onJumpToBiblioteca: (clienteId: number, periodoId: number) => void;
    onOpenCrearPeriodo: () => void;
    onOpenEditarObligacion: (obligacion: ObligacionTributaria) => void;
}

const validarModulo10 = (cedula: string): boolean => {
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const verificador = parseInt(cedula.charAt(9), 10);
    let suma = 0;

    for (let i = 0; i < 9; i++) {
        let valor = parseInt(cedula.charAt(i), 10) * coeficientes[i];
        if (valor >= 10) valor -= 9;
        suma += valor;
    }

    const modulo = suma % 10;
    const digitoCalculado = modulo === 0 ? 0 : 10 - modulo;
    return digitoCalculado === verificador;
};

const validarModulo11Sociedades = (ruc: string): boolean => {
    const coeficientes = [4, 3, 2, 7, 6, 5, 4, 3, 2];
    const verificador = parseInt(ruc.charAt(9), 10);
    let suma = 0;

    for (let i = 0; i < 9; i++) {
        suma += parseInt(ruc.charAt(i), 10) * coeficientes[i];
    }

    const modulo = suma % 11;
    const digitoCalculado = modulo === 0 ? 0 : 11 - modulo;
    return digitoCalculado === verificador;
};

const validarModulo11Publicas = (ruc: string): boolean => {
    if (ruc.charAt(9) !== '0') return false;

    const coeficientes = [3, 2, 7, 6, 5, 4, 3, 2];
    const verificador = parseInt(ruc.charAt(8), 10);
    let suma = 0;

    for (let i = 0; i < 8; i++) {
        suma += parseInt(ruc.charAt(i), 10) * coeficientes[i];
    }

    const modulo = suma % 11;
    const digitoCalculado = modulo === 0 ? 0 : 11 - modulo;
    return digitoCalculado === verificador;
};

interface ValidacionResult {
    valido: boolean;
    mensaje?: string;
    tipo?: "Persona Natural" | "Sociedad Privada" | "Entidad Pública";
}

const validarEstructuraRUC = (ruc: string): ValidacionResult => {
    if (!ruc || ruc.length !== 13) return { valido: false, mensaje: "El RUC debe tener exactamente 13 dígitos numéricos." };
    if (ruc.substring(10, 13) !== "001") return { valido: false, mensaje: "Todo RUC debe terminar invariablemente en 001." };

    const provincia = parseInt(ruc.substring(0, 2), 10);
    if (provincia < 1 || provincia > 24) return { valido: false, mensaje: "Los dos primeros dígitos (código de provincia) son inválidos." };

    const tercerDigito = parseInt(ruc.charAt(2), 10);

    if (tercerDigito < 6) {
        if (!validarModulo10(ruc.substring(0, 10))) return { valido: false, mensaje: "Fallo en la validación de Cédula/Persona Natural (Módulo 10)." };
        return { valido: true, tipo: "Persona Natural" };
    } else if (tercerDigito === 9) {
        if (!validarModulo11Sociedades(ruc)) return { valido: false, mensaje: "Fallo en la validación de Sociedad Privada (Módulo 11)." };
        return { valido: true, tipo: "Sociedad Privada" };
    } else if (tercerDigito === 6) {
        if (!validarModulo11Publicas(ruc)) return { valido: false, mensaje: "Fallo en la validación de Entidad Pública (Módulo 11)." };
        return { valido: true, tipo: "Entidad Pública" };
    } else {
        return { valido: false, mensaje: "El tercer dígito del RUC es inválido." };
    }
};


const PerfilCliente: React.FC<PerfilClienteProps> = ({
    cliente,
    onBack,
    onOpenDeclaracion,
    onOpenSubir,
    refreshSignal,
    onOpenEliminar,
    onUpdateSuccess,
    onJumpToBiblioteca,
    onOpenCrearPeriodo,
    onOpenEditarObligacion
}) => {

    const usuarioAsociado = cliente.usuarios && cliente.usuarios.length > 0 ? cliente.usuarios[0] : null;

    const [formData, setFormData] = useState({
        razon_social_nombres: cliente.razon_social_nombres || '',
        identificacion: cliente.identificacion || '',
        tipo_persona: cliente.tipo_persona || 'Persona Natural',
        score_tributario: cliente.score_tributario || 100,
        correo: usuarioAsociado ? usuarioAsociado.correo : '',
        password: ''
    });

    const [carpetasRaiz, setCarpetasRaiz] = useState<any[]>([]);
    const [obligaciones, setObligaciones] = useState<ObligacionTributaria[]>([]);
    const [isLoadingObligaciones, setIsLoadingObligaciones] = useState(true);
    const [usuariosGestores, setUsuariosGestores] = useState<any[]>([]);
    const [gestoresSeleccionados, setGestoresSeleccionados] = useState<number[]>(
        cliente.gestores?.map((g => g.id)) || []
    );
    const [isSaving, setIsSaving] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const { data } = await api.get('/user');
                setCurrentUser(data);
            } catch (error) {
                console.error("Error al obtener el usuario actual:", error);
            }
        };
        fetchCurrentUser();
    }, []);

    const isSuperAdmin = currentUser?.rol_id === 3;
    const isGestorAsignado = gestoresSeleccionados.includes(currentUser?.id);
    const canEdit = isSuperAdmin || isGestorAsignado;

    useEffect(() => {
        const loadPerfilData = async () => {
            try {
                setIsLoadingObligaciones(true);

                const [resArbol, resObligaciones, resUsuarios] = await Promise.all([
                    api.get(`/biblioteca/arbol/${cliente.id}`),
                    api.get(`/cliente/${cliente.id}/obligaciones`),
                    api.get('/usuario')
                ]);

                setCarpetasRaiz(resArbol.data.biblioteca || []);
                setObligaciones(resObligaciones.data.obligaciones || []);

                const filtrados = resUsuarios.data.usuarios.filter(
                    (u: any) => u.rol_id === 1 || u.rol_id === 3
                );
                setUsuariosGestores(filtrados);

            } catch (error) {
                console.error("Error al cargar los datos del perfil del cliente:", error);
            } finally {
                setIsLoadingObligaciones(false);
            }
        };

        loadPerfilData();
    }, [cliente.id, refreshSignal]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'score_tributario' ? Number(value) : value
        }));
    };

    const handleGuardarPerfil = async () => {
        setErrorMsg('');
        const identificacionClean = formData.identificacion.trim();

        const validacion = validarEstructuraRUC(identificacionClean);
        if (!validacion.valido) {
            setErrorMsg("RUC Inválido: " + validacion.mensaje);
            return;
        }

        let regimenIncorrecto = false;
        let mensajeErrorRegimen = "";

        if (validacion.tipo === "Persona Natural") {
            if (formData.tipo_persona === "Régimen General" || formData.tipo_persona === "Entidad Pública") {
                regimenIncorrecto = true;
                mensajeErrorRegimen = `Conflicto: El RUC ingresado es de una Persona Natural (3er dígito menor a 6). No puedes seleccionarlo como "${formData.tipo_persona}".`;
            }
        } else if (validacion.tipo === "Sociedad Privada") {
            if (formData.tipo_persona === "Persona Natural" || formData.tipo_persona === "Entidad Pública") {
                regimenIncorrecto = true;
                mensajeErrorRegimen = `Conflicto: El RUC ingresado es de una Sociedad (3er dígito es 9). No puedes seleccionarlo como "${formData.tipo_persona}".`;
            }
        } else if (validacion.tipo === "Entidad Pública") {
            if (formData.tipo_persona === "Persona Natural" || formData.tipo_persona === "Régimen General") {
                regimenIncorrecto = true;
                mensajeErrorRegimen = `Conflicto: El RUC ingresado es de una Entidad Pública (3er dígito es 6). No puedes seleccionarlo como "${formData.tipo_persona}".`;
            }
        }

        if (regimenIncorrecto) {
            setErrorMsg(mensajeErrorRegimen);
            return;
        }

        setIsSaving(true);
        try {
            const { data } = await api.put(`/cliente/${cliente.id}`, {
                ...formData,
                gestores: gestoresSeleccionados
            });
            alert('Perfil Actualizado Exitosamente.');
            onUpdateSuccess(data.cliente);
        } catch (error: any) {
            console.error("Error al actualizar el perfil:", error);
            const msg = error?.response?.data?.message || "Hubo un error al intentar actualizar el perfil.";
            setErrorMsg(msg);
        } finally {

            setIsSaving(false);
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
                <div className="flex items-center gap-4 mb-2">
                    <button onClick={onBack} className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-orange-500 transition-colors shadow-sm cursor-pointer">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </button>
                    <div className="flex items-center text-sm font-medium text-gray-500 truncate">
                        <span className="cursor-pointer hover:text-orange-500 transition-colors" onClick={onBack}>Directorio de Clientes</span>
                        <svg className="w-4 h-4 mx-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        <span className="text-blue-200 font-bold">{canEdit ? 'Perfil Editable' : 'Perfil (Modo Lectura)'}</span>
                    </div>
                </div>

                <div className="bg-blue-200 rounded-2xl p-6 lg:p-8 shadow-lg relative overflow-hidden mt-5">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l7-3 7 3z"></path></svg>
                    </div>
                    <div className="relative z-10">
                        <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.75rem] uppercase mb-2 block">Datos del Perfil</span>

                        {errorMsg && (
                            <div className="bg-red-500/20 text-red-200 p-3 rounded-lg text-sm font-bold border border-red-500/50 flex items-start gap-2 mb-4">
                                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77(1.333.192 3 1.732 3z"></path></svg>
                                <span>{errorMsg}</span>
                            </div>
                        )}

                        <input
                            type="text"
                            name="razon_social_nombres"
                            value={formData.razon_social_nombres}
                            onChange={handleInputChange}
                            disabled={!canEdit}
                            className="w-full bg-transparent border-b-2 border-white/20 text-[2rem] sm:text-[2.5rem] font-extrabold text-white tracking-tight leading-none mb-6 outline-none focus:border-orange-500 transition-colors pb-1 disabled:opacity-60"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">

                            <div className="bg-white/10 rounded-xl p-4 border border-white/5">
                                <p className="text-gray-400 text-[0.70rem] font-bold uppercase tracking-widest mb-1">RUC/Cédula</p>
                                <input type="text" maxLength={13} name="identificacion" value={formData.identificacion} onChange={handleInputChange} disabled={!canEdit} className="w-full bg-transparent text-white font-mono text-[1rem] outline-none border-b border-transparent focus:border-orange-500 pb-1 disabled:opacity-60" />
                            </div>

                            <div className="bg-white/10 rounded-xl p-4 border border-white/5">
                                <p className="text-gray-400 text-[0.70rem] font-bold uppercase tracking-widest mb-1">Correo (Acceso)</p>
                                <input type="email" name="correo" value={formData.correo} onChange={handleInputChange} placeholder="Asignar correo..." disabled={!canEdit} className="w-full bg-transparent text-white font-semibold text-[0.95rem] outline-none border-b border-transparent focus:border-orange-500 pb-1 disabled:opacity-60" />
                            </div>

                            <div className="bg-white/10 rounded-xl p-4 border border-white/5">
                                <p className="text-gray-400 text-[0.70rem] font-bold uppercase tracking-widest mb-1">Cambiar Clave</p>
                                <input type="text" name="password" value={formData.password} onChange={handleInputChange} placeholder="Escribir nueva clave..." disabled={!canEdit} className="w-full bg-transparent text-white font-mono text-[1rem] outline-none border-b border-transparent focus:border-orange-500 pb-1 disabled:opacity-60" />
                            </div>

                            <div className="bg-white/10 rounded-xl p-4 border border-white/5">
                                <p className="text-gray-400 text-[0.70rem] font-bold uppercase tracking-widest mb-1">Tipo de contribuyente</p>
                                <select name="tipo_persona" value={formData.tipo_persona} onChange={handleInputChange} disabled={!canEdit} className="w-full bg-[#2D353E] text-white font-semibold text-[0.95rem] outline-none border-b border-transparent focus:border-orange-500 pb-1 appearance-none cursor-pointer disabled:opacity-60">
                                    <option value="Régimen General">Régimen General</option>
                                    <option value="RIMPE">RIMPE</option>
                                    <option value="Contribuyente Especial">Contribuyente Especial</option>
                                    <option value="Persona Natural">Persona Natural</option>
                                    <option value="Entidad Pública">Entidad Pública</option>
                                </select>
                            </div>

                            <div className="bg-white/10 rounded-xl p-4 border border-white/5 sm:col-span-2">
                                <p className="text-gray-400 text-[0.70rem] font-bold uppercase tracking-widest mb-2">Gestionado por (Múltiple)</p>
                                <div className="max-h-24 overflow-y-auto space-y-2 pr-2">
                                    {usuariosGestores.map((u) => (
                                        <label key={u.id} className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={gestoresSeleccionados.includes(u.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) setGestoresSeleccionados([...gestoresSeleccionados, u.id]);
                                                    else setGestoresSeleccionados(gestoresSeleccionados.filter(id => id !== u.id));
                                                }}
                                                disabled={!canEdit}
                                                className="react-custom-checkbox disabled:opacity-50"
                                            />
                                            <span className="text-white font-semibold text-[0.85rem] group-hover:text-orange-400 transition-colors">
                                                {u.nombre} {u.apellido}
                                            </span>
                                        </label>
                                    ))}
                                    {usuariosGestores.length === 0 && (
                                        <p className="text-xs text-gray-400">No hay gestores disponibles.</p>
                                    )}
                                </div>
                            </div>

                            

                            {canEdit && (
                                <div className="sm:col-span-2 lg:col-span-3 xl:col-span-6 flex flex-col sm:flex-row gap-4 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => onOpenEliminar(`/cliente/${cliente.id}`, `Cliente ${cliente.razon_social_nombres} y su usuario`)}
                                        className="flex-1 bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white text-red-400 transition-all cursor-pointer group shadow-sm"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        <span className="font-bold text-[0.90rem] uppercase tracking-wider">Eliminar Cliente</span>
                                    </button>

                                    <button
                                        onClick={handleGuardarPerfil}
                                        disabled={isSaving}
                                        className={`flex-2 bg-orange-500/20 rounded-xl p-4 border border-orange-500/50 flex flex-col justify-center transition-colors group shadow-sm ${isSaving ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-orange-500'}`}
                                    >
                                        <div className="flex items-center justify-center gap-3 w-full">
                                            <span className="text-white font-bold text-[0.90rem] uppercase tracking-wider">{isSaving ? 'Guardando...' : 'Guardar Perfil'}</span>
                                            {!isSaving && <svg className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>}
                                        </div>
                                    </button>
                                </div>
                            )}
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
                            {canEdit && (
                                <button onClick={onOpenDeclaracion} className="cursor-pointer bg-orange-50 text-orange-600 border border-orange-200 text-[0.75rem] font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg hover:bg-orange-500 hover:text-white transition-all flex items-center gap-2 shrink-0">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                    Añadir Obligación
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="overflow-x-auto border border-gray-100 rounded-xl">
                        <table className="w-full text-left border-collapse min-w-175">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-[0.70rem] font-bold uppercase tracking-widest text-gray-500">
                                    <th className="px-5 py-4">Tipo de Impuesto</th>
                                    <th className="px-5 py-4">Periodo / Fecha Límite</th>
                                    <th className="px-5 py-4">Estado Actual</th>
                                    {canEdit && <th className="px-5 py-4 text-center">Acciones</th>}
                                </tr>
                            </thead>
                            <tbody className="text-[0.85rem] divide-y divide-gray-50">
                                {isLoadingObligaciones ? (
                                    <tr>
                                        <td colSpan={canEdit ? 4 : 3} className="text-center py-8 text-gray-400 font-bold uppercase tracking-widest text-[0.75rem]">Cargando obligaciones...</td>
                                    </tr>
                                ) : obligaciones.length === 0 ? (
                                    <tr>
                                        <td colSpan={canEdit ? 4 : 3} className="text-center py-8 text-gray-400 italic">No hay obligaciones registradas para este cliente.</td>
                                    </tr>
                                ) : (
                                    obligaciones.map((ob) => (
                                        <tr key={ob.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-5 py-4 font-bold text-blue-200">{ob.tipo_impuesto}</td>

                                            <td className="px-10 py-4 text-gray-600">
                                                <div className='flex flex-col'>
                                                    <span className='font-semibold text-gray-700'>
                                                        {new Date(ob.fecha_vencimiento_exacta + 'T00:00:00').toLocaleDateString('es-ES', {
                                                            day: '2-digit',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                {ob.estado === 'Presentado' ? (
                                                    <span className="bg-green-50 text-green-600 border border-green-200 px-2.5 py-1 rounded-md text-[0.70rem] font-bold uppercase tracking-widest flex items-center w-max gap-1">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                                        Presentado
                                                    </span>
                                                ) : (
                                                    <span className="bg-yellow-50 text-yellow-600 border border-yellow-200 px-2.5 py-1 rounded-md text-[0.70rem] font-bold uppercase tracking-widest flex items-center w-max gap-1">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                        Pendiente
                                                    </span>
                                                )}
                                            </td>

                                            {canEdit && (
                                                <td className="px-5 py-4 text-center flex justify-center items-center gap-2">
                                                    {ob.estado === 'Pendiente' && (
                                                        <button
                                                            // MODIFICADO: Pasamos el tipo_impuesto al manejador
                                                            onClick={() => onOpenSubir(ob.id, ob.tipo_impuesto)}
                                                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all cursor-pointer"
                                                            title="Subir Anexos y Presentar"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                                            </svg>
                                                        </button>
                                                    )}

                                                    <button
                                                        onClick={() => onOpenEditarObligacion(ob)}
                                                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all cursor-pointer"
                                                        title="Cambiar Encargado"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                                    </button>

                                                    <button
                                                        onClick={() => onOpenEliminar(`/obligacion/${ob.id}`, `Obligacion ${ob.tipo_impuesto}`)}
                                                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all cursor-pointer"
                                                        title="Eliminar Obligación"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8 mt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-[1.4rem] font-extrabold text-blue-200 tracking-tight">Biblioteca Operativa</h2>
                            <p className="text-gray-500 text-[0.85rem] mt-1">Seleccione la Carpeta Principal para saltar al gestor documental.</p>
                        </div>

                        {canEdit && (
                            <button onClick={onOpenCrearPeriodo} className="cursor-pointer bg-[#151E28] text-white text-[0.75rem] font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg hover:bg-orange-500 transition-all flex items-center gap-2 shrink-0 shadow-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                Añadir Carpeta Raíz
                            </button>
                        )}
                    </div>

                    {carpetasRaiz.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                            {carpetasRaiz.map(carpeta => (
                                <div key={carpeta.id} onClick={() => onJumpToBiblioteca(cliente.id, carpeta.id)} className="border border-orange-200 bg-orange-50 rounded-xl p-5 hover:bg-orange-100 transition-all cursor-pointer group flex flex-col items-center text-center shadow-sm">
                                    <svg className="w-10 h-10 text-orange-500 mb-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></svg>
                                    <h3 className="font-extrabold text-orange-700 text-[1rem] leading-tight">{carpeta.nombre}</h3>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-8 text-center border-2 border-dashed border-gray-200 rounded-xl">
                            <p className="text-gray-400 italic text-sm">Este cliente aún no tiene directorios en la biblioteca.</p>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8 mt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-[1.4rem] font-extrabold text-blue-200 tracking-tight">Score Tributario</h2>
                            <p className="text-gray-500 text-[0.85rem] mt-1">Calificación de las preguntas respondidas por el cliente</p>
                        </div>
                        <div className="text-right">
                            <span className="block text-[2.5rem] font-black text-orange-500 leading-none">
                                {cliente.score_tributario ?? 0}
                            </span>
                            <span className="text-gray-400 text-[0.70rem] font-bold uppercase tracking-widest">
                                Puntaje Total
                            </span>
                        </div>
                    </div>

                    {cliente.detalle_score && cliente.detalle_score.length > 0 ? (
                        <div className="space-y-4">
                            <div className="overflow-hidden border border-gray-100 rounded-xl">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100 text-[0.70rem] font-bold uppercase tracking-widest text-gray-500">
                                            <th className="px-5 py-3">Pregunta Evaluada</th>
                                            <th className="px-5 py-3 text-center">Escala (1-5)</th>
                                            <th className="px-5 py-3 text-right">Puntos Calculados</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[0.85rem] divide-y divide-gray-50">
                                        {cliente.detalle_score.map((detalle, index) => (
                                            <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-5 py-3 text-gray-700 font-medium">
                                                    {detalle.enunciado}
                                                </td>
                                                <td className="px-5 py-3 text-center">
                                                    <span className="bg-blue-50 text-blue-600 font-bold px-2 py-1 rounded text-xs">
                                                        {detalle.valor_seleccionado} / 5
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3 text-right font-semibold text-orange-500">
                                                    {detalle.puntos_obtenidos.toFixed(2)} pts
                                                    <span className="text-gray-400 text-xs font-normal block sm:inline sm:ml-1">
                                                        (de {detalle.peso_maximo})
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {cliente.comentario_score && (
                                <div className="bg-orange-50/50 rounded-xl p-4 border border-orange-100 mt-4">
                                    <span className="block text-[0.70rem] font-bold uppercase tracking-widest text-orange-500 mb-1">
                                        Comentario de la Evaluación
                                    </span>
                                    <p className="text-gray-700 text-sm italic">
                                        "{cliente.comentario_score}"
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="py-8 text-center border-2 border-dashed border-gray-200 rounded-xl">
                            <p className="text-gray-400 italic text-sm">Este cliente aún no tiene un detalle de evaluación de Score Tributario registrado.</p>
                        </div>
                    )}
                </div>





            </div>
        </ScrollReveal>
    );
};

export default PerfilCliente;