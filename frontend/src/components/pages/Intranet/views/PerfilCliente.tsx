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
    cliente: Cliente | any; // Usamos any de respaldo si el type no tiene las nuevas propiedades
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
        const pasaModulo11 = validarModulo11Sociedades(ruc);
        if (!pasaModulo11) {
            console.warn(`El RUC ${ruc} no pasa el Módulo 11 clásico, pero se acepta por flexibilización del SRI.`);
        }
        return { valido: true, tipo: "Sociedad Privada" }
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
        score_tributario: cliente.score_tributario ,
        telefono_contacto: cliente.telefono_contacto || '',
        sector: cliente.sector || '',
        tipo_contribuyente: cliente.tipo_contribuyente || '',
        regimen_tributario: cliente.regimen_tributario || '',
        agente_retencion: cliente.agente_retencion || false,
        actividad_economica: cliente.actividad_economica || '',
        correos_adicionales: cliente.correos ? cliente.correos.map((c: any) => c.correo).join(', ') : '',
        correo: usuarioAsociado ? usuarioAsociado.correo : '',
        correo_personal: usuarioAsociado?.correo_personal || '',
        cargo: usuarioAsociado?.cargo || '',
        activo: usuarioAsociado?.activo !== undefined ? usuarioAsociado.activo : true,
        password: ''
    });

    // NUEVOS ESTADOS PARA ARREGLOS
    const [tiposServicioSeleccionados, setTiposServicioSeleccionados] = useState<string[]>([]);
    const [representantes, setRepresentantes] = useState<any[]>([{ nombre: '', correo: '', cargo: '', telefono: '' }]);

    const [carpetasRaiz, setCarpetasRaiz] = useState<any[]>([]);
    const [obligaciones, setObligaciones] = useState<ObligacionTributaria[]>([]);
    const [isLoadingObligaciones, setIsLoadingObligaciones] = useState(true);
    const [usuariosGestores, setUsuariosGestores] = useState<any[]>([]);
    const [gestoresSeleccionados, setGestoresSeleccionados] = useState<number[]>(
        cliente.gestores?.map((g: any) => g.id) || []
    );
    const [isSaving, setIsSaving] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [currentUser, setCurrentUser] = useState<any>(null);

    // INICIALIZAR ARREGLOS CUANDO CAMBIE EL CLIENTE
    useEffect(() => {
        if (cliente) {
            // Inicializar servicios
            if (Array.isArray(cliente.tipo_servicio)) {
                setTiposServicioSeleccionados(cliente.tipo_servicio);
            } else {
                setTiposServicioSeleccionados([]);
            }

            // Inicializar representantes
            if (cliente.representantes && cliente.representantes.length > 0) {
                setRepresentantes(cliente.representantes);
            } else {
                setRepresentantes([{ nombre: '', correo: '', cargo: '', telefono: '' }]);
            }
        }
    }, [cliente, refreshSignal]);

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
        const { name, value, type } = e.target;

        let targetValue: any = value;
        if (type === 'checkbox') {
            targetValue = (e.target as HTMLInputElement).checked;
        } else if (name === 'score_tributario') {
            targetValue = Number(value);
        } else if (name === 'activo') {
            targetValue = value === 'true';
        }

        setFormData(prev => ({
            ...prev,
            [name]: targetValue
        }));
    };

    // HANDLERS PARA ARREGLOS
    const handleServicioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTiposServicioSeleccionados(prev =>
            e.target.checked ? [...prev, value] : prev.filter(s => s !== value)
        );
    };

    const handleRepresentanteChange = (index: number, field: string, value: string) => {
        const nuevos = [...representantes];
        nuevos[index] = { ...nuevos[index], [field]: value };
        setRepresentantes(nuevos);
    };

    const agregarRepresentante = () => {
        setRepresentantes([...representantes, { nombre: '', correo: '', cargo: '', telefono: '' }]);
    };

    const eliminarRepresentante = (index: number) => {
        const nuevos = representantes.filter((_, i) => i !== index);
        setRepresentantes(nuevos);
    };


    const handleGuardarPerfil = async () => {
        setErrorMsg('');
        const identificacionClean = formData.identificacion.trim();

        // Validación estricta únicamente matemática del RUC
        const validacion = validarEstructuraRUC(identificacionClean);
        if (!validacion.valido) {
            setErrorMsg("RUC Inválido: " + validacion.mensaje);
            return;
        }

        // Validar contactos
        const representantesInvalidos = representantes.some(rep => rep.nombre.trim() === '');
        if (representantesInvalidos) {
            setErrorMsg("Todos los contactos añadidos deben tener al menos un nombre.");
            return;
        }

        setIsSaving(true);
        try {
            const correosArray = formData.correos_adicionales
                .split(',')
                .map((str: string) => str.trim())
                .filter((str: string) => str.length > 0)
                .map((correo: string) => ({ correo }));

            const payload = {
                ...formData,
                correos: correosArray,
                gestores: gestoresSeleccionados,
                tipo_servicio: tiposServicioSeleccionados,
                representantes: representantes
            };

            if (!payload.password) {
                delete (payload as any).password;
            }

            const { data } = await api.put(`/cliente/${cliente.id}`, payload);
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
                    appearance: none; width: 1.25rem; height: 1.25rem; border: 2px solid #D1D5DB; border-radius: 0.25rem;
                    background-color: white; cursor: pointer; position: relative; transition: all 0.2s;
                }
                .react-custom-checkbox:checked { background-color: #D98005; border-color: #D98005; }
                .react-custom-checkbox:checked::after {
                    content: ''; position: absolute; left: 6px; top: 2px; width: 5px; height: 10px;
                    border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg);
                }
            `}</style>

            <div className="max-w-350 mx-auto space-y-6 reveal-element active">
                <div className="flex items-center gap-4 mb-2">
                    <button onClick={onBack} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-brand-600 transition-colors cursor-pointer">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </button>
                    <div className="flex items-center text-sm font-medium text-slate-500 truncate">
                        <span className="cursor-pointer hover:text-brand-600 transition-colors" onClick={onBack}>Directorio de Clientes</span>
                        <svg className="w-4 h-4 mx-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        <span className="text-slate-900 font-semibold">{canEdit ? 'Perfil Editable' : 'Perfil (Modo Lectura)'}</span>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 lg:p-8 relative overflow-hidden mt-5">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.04] pointer-events-none">
                        <svg className="w-32 h-32 text-slate-900" fill="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l7-3 7 3z"></path></svg>
                    </div>
                    <div className="relative z-10">
                        <span className="text-brand-600 font-medium text-xs mb-2 block">Datos del Perfil</span>

                        {errorMsg && (
                            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm font-semibold border border-red-200 flex items-start gap-2 mb-4">
                                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77(1.333.192 3 1.732 3z"></path></svg>
                                <span>{errorMsg}</span>
                            </div>
                        )}

                        <input
                            type="text"
                            name="razon_social_nombres"
                            value={formData.razon_social_nombres}
                            onChange={handleInputChange}
                            disabled={!canEdit}
                            className="w-full bg-transparent border-b-2 border-slate-200 text-2xl sm:text-[2.5rem] font-bold text-slate-900 tracking-tight leading-none mb-6 outline-none focus:border-brand-600 transition-colors pb-1 disabled:opacity-60 focus:ring-2 focus:ring-brand-600/20"
                        />
                        <h3 className="text-slate-500 font-semibold text-xs mb-3 mt-2">1. Configuración Fiscal y Tributaria</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                <p className="text-slate-400 text-xs font-medium mb-1">RUC/Cédula</p>
                                <input type="text" maxLength={13} name="identificacion" value={formData.identificacion} onChange={handleInputChange} disabled={!canEdit} className="w-full bg-transparent text-slate-900 font-mono text-base outline-none border-b border-transparent focus:border-brand-600 pb-1 disabled:opacity-60 focus:ring-2 focus:ring-brand-600/20" />
                            </div>

                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                <p className="text-slate-400 text-xs font-medium mb-1">Tipo de Contribuyente</p>
                                <select name="tipo_contribuyente" value={formData.tipo_contribuyente} onChange={handleInputChange} disabled={!canEdit} className="w-full bg-white text-slate-900 font-semibold text-sm outline-none border-b border-transparent focus:border-brand-600 pb-1 appearance-none cursor-pointer disabled:opacity-60 focus:ring-2 focus:ring-brand-600/20">
                                    <option value="Persona Natural">Persona Natural</option>
                                    <option value="Sociedad">Sociedad</option>
                                </select>
                            </div>

                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                <p className="text-slate-400 text-xs font-medium mb-1">Regimen Tributario</p>
                                <select name="regimen_tributario" value={formData.regimen_tributario} onChange={handleInputChange} disabled={!canEdit} className="w-full bg-white text-slate-900 font-semibold text-sm outline-none border-b border-transparent focus:border-brand-600 pb-1 appearance-none cursor-pointer disabled:opacity-60 focus:ring-2 focus:ring-brand-600/20">
                                    <option value="General">General</option>
                                    <option value="RIMPE">RIMPE</option>
                                    <option value="Grande Contribuyente">Grande Contribuyente</option>
                                    <option value="Contribuyente Especial">Contribuyente Especial</option>
                                    <option value="Exportador habitual">Exportador habitual</option>
                                </select>
                            </div>

                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                <p className="text-slate-400 text-xs font-medium mb-1">Score Tirbutario</p>
                                <input type="text" maxLength={3} name="score_tributario" value={formData.score_tributario} onChange={handleInputChange} disabled={!canEdit} className="font-semibold w-full bg-transparent text-slate-900 font-mono text-base outline-none border-b border-transparent focus:border-brand-600 pb-1 disabled:opacity-60 focus:ring-2 focus:ring-brand-600/20" />
                            </div>

                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center justify-between col-span-1 sm:col-span-2 lg:col-span-1">
                                <div>
                                    <p className="text-slate-400 text-xs font-medium mb-0.5">Agente de Retención</p>
                                    <span className="text-xs text-slate-500">¿Designación por el SRI?</span>
                                </div>
                                <input
                                    type="checkbox"
                                    name="agente_retencion"
                                    checked={formData.agente_retencion}
                                    onChange={handleInputChange}
                                    disabled={!canEdit}
                                    className="react-custom-checkbox scale-125 mr-2 disabled:opacity-50"
                                />
                            </div>

                            

                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 sm:col-span-2 xl:col-span-5">
                                <p className="text-slate-400 text-xs font-medium mb-1">Actividad Económica Principal</p>
                                <input type="text" name="actividad_economica" value={formData.actividad_economica} onChange={handleInputChange} placeholder="Detalle de actividades comerciales..." disabled={!canEdit} className="w-full bg-transparent text-slate-900 font-medium text-sm outline-none border-b border-transparent focus:border-brand-600 pb-1 disabled:opacity-60 focus:ring-2 focus:ring-brand-600/20" />
                            </div>
                        </div>

                        <h3 className="text-slate-500 font-semibold text-xs mb-3">2. Información Operativa y Comercial</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                            
                            {/* SERVICIOS DINÁMICOS */}
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                <p className="text-slate-400 text-xs font-medium mb-3">Tipos de Servicio Contratados</p>
                                <div className="flex flex-wrap gap-3">
                                    {['Impuestos', 'Outsourcing contable', 'Auditoria', 'Trabajos especiales', 'Outsourcing de Nomina'].map(servicio => (
                                        <label key={servicio} className={`flex items-center gap-2 text-slate-900 text-sm ${canEdit ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}>
                                            <input
                                                type="checkbox"
                                                value={servicio}
                                                checked={tiposServicioSeleccionados.includes(servicio)}
                                                onChange={handleServicioChange}
                                                disabled={!canEdit}
                                                className="react-custom-checkbox w-4 h-4 disabled:opacity-50"
                                            />
                                            {servicio}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                <p className="text-slate-400 text-xs font-medium mb-1">Sector y Teléfono Empresarial</p>
                                <div className="space-y-4 mt-2">
                                    <select name="sector" value={formData.sector} onChange={handleInputChange} disabled={!canEdit} className="w-full bg-white text-slate-900 font-semibold text-sm outline-none border-b border-transparent focus:border-brand-600 pb-1 appearance-none cursor-pointer disabled:opacity-60 focus:ring-2 focus:ring-brand-600/20">
                                        <option value="Servicios">Servicios</option>
                                        <option value="Comercial">Comercial</option>
                                        <option value="Industrial">Industrial</option>
                                        <option value="Turismo">Turismo</option>
                                        <option value="Financiero">Financiero</option>
                                        <option value="Otros">Otros</option>
                                    </select>
                                    <input type="text" name="telefono_contacto" value={formData.telefono_contacto} onChange={handleInputChange} placeholder="Teléfono general (Ej. 022999999)" disabled={!canEdit} className="w-full bg-transparent text-slate-900 font-mono text-base outline-none border-b border-transparent focus:border-brand-600 pb-1 disabled:opacity-60 focus:ring-2 focus:ring-brand-600/20" />
                                </div>
                            </div>
                        </div>

                        {/* REPRESENTANTES DINÁMICOS */}
                        <div className="flex justify-between items-center mb-3 mt-6">
                            <h3 className="text-slate-500 font-semibold text-xs">3. Directorio de Contactos</h3>
                            {canEdit && (
                                <button type="button" onClick={agregarRepresentante} className="text-xs font-semibold text-brand-700 hover:text-white bg-brand-50 hover:bg-brand-600 px-3 py-1 rounded border border-brand-200 transition-colors cursor-pointer">
                                    + Añadir Contacto
                                </button>
                            )}
                        </div>

                        <div className="space-y-4 mb-6">
                            {representantes.map((rep, index) => (
                                <div key={index} className="bg-slate-50 rounded-xl p-4 border border-slate-200 relative">
                                    {canEdit && index > 0 && (
                                        <button type="button" onClick={() => eliminarRepresentante(index)} className="absolute top-2 right-4 text-red-600 hover:text-red-500 text-xs font-semibold">
                                            Eliminar
                                        </button>
                                    )}
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-slate-400 text-xs font-medium mb-1">Nombre Completo</p>
                                            <input type="text" value={rep.nombre} onChange={(e) => handleRepresentanteChange(index, 'nombre', e.target.value)} placeholder="Nombre del contacto..." disabled={!canEdit} className="w-full bg-transparent text-slate-900 font-medium text-sm outline-none border-b border-transparent focus:border-brand-600 pb-1 disabled:opacity-60 focus:ring-2 focus:ring-brand-600/20" />
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-xs font-medium mb-1">Cargo</p>
                                            <input type="text" value={rep.cargo || ''} onChange={(e) => handleRepresentanteChange(index, 'cargo', e.target.value)} placeholder="Ej. Gerente General" disabled={!canEdit} className="w-full bg-transparent text-slate-900 font-medium text-sm outline-none border-b border-transparent focus:border-brand-600 pb-1 disabled:opacity-60 focus:ring-2 focus:ring-brand-600/20" />
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-xs font-medium mb-1">Correo de Contacto</p>
                                            <input type="email" value={rep.correo || ''} onChange={(e) => handleRepresentanteChange(index, 'correo', e.target.value)} placeholder="contacto@empresa.com" disabled={!canEdit} className="w-full bg-transparent text-slate-900 font-medium text-sm outline-none border-b border-transparent focus:border-brand-600 pb-1 disabled:opacity-60 focus:ring-2 focus:ring-brand-600/20" />
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-xs font-medium mb-1">Teléfono Personal/Móvil</p>
                                            <input type="text" value={rep.telefono || ''} onChange={(e) => handleRepresentanteChange(index, 'telefono', e.target.value)} placeholder="Ej: 0998765432" disabled={!canEdit} className="w-full bg-transparent text-slate-900 font-mono text-base outline-none border-b border-transparent focus:border-brand-600 pb-1 disabled:opacity-60 focus:ring-2 focus:ring-brand-600/20" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h3 className="text-slate-500 font-semibold text-xs mb-3">4. Cuenta de Acceso del Cliente</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
                            <div className="bg-slate-50 col-span-1 rounded-xl p-4 border border-slate-200">
                                <p className="text-slate-400 text-xs font-medium mb-1">Correo (Usuario 1)</p>
                                <input type="email" name="correo" value={formData.correo} onChange={handleInputChange} placeholder="Asignar correo corporativo..." disabled={!canEdit} className="w-full bg-transparent text-slate-900 font-semibold text-sm outline-none border-b border-transparent focus:border-brand-600 pb-1 disabled:opacity-60 focus:ring-2 focus:ring-brand-600/20" />
                            </div>

                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                <p className="text-slate-400 text-xs font-medium mb-1">Contraseña de Acceso</p>
                                <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Dejar en blanco para no cambiar..." disabled={!canEdit} className="w-full bg-transparent text-slate-900 font-mono text-base outline-none border-b border-transparent focus:border-brand-600 pb-1 disabled:opacity-60 focus:ring-2 focus:ring-brand-600/20" />
                            </div>


                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                <p className="text-slate-400 text-xs font-medium mb-1">Estado del Acceso</p>
                                <select name="activo" value={formData.activo ? 'true' : 'false'} onChange={handleInputChange} disabled={!canEdit} className="w-full bg-white text-slate-900 font-semibold text-sm outline-none border-b border-transparent focus:border-brand-600 pb-1 appearance-none cursor-pointer disabled:opacity-60 focus:ring-2 focus:ring-brand-600/20">
                                    <option value="true">Usuario Activo</option>
                                    <option value="false">Usuario Inactivo</option>
                                </select>
                            </div>

                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 sm:col-span-2 lg:col-span-3 xl:col-span-1">
                                <p className="text-slate-400 text-xs font-medium mb-2">Gestionado por</p>
                                <div className="max-h-16 overflow-y-auto flex flex-col gap-2 pr-2 custom-scrollbar">
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
                                                className="react-custom-checkbox min-w-4 disabled:opacity-50"
                                            />
                                            <span className="text-slate-900 font-semibold text-sm leading-tight group-hover:text-brand-500 transition-colors truncate">
                                                {u.nombre} {u.apellido}
                                            </span>
                                        </label>
                                    ))}
                                    {usuariosGestores.length === 0 && (
                                        <p className="text-xs text-slate-400">No hay gestores disponibles.</p>
                                    )}
                                </div>
                            </div>

                            {canEdit && (
                                <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 flex flex-col sm:flex-row gap-4 mt-4 w-full">
                                    <button
                                        type="button"
                                        onClick={() => onOpenEliminar(`/cliente/${cliente.id}`, `Cliente ${cliente.razon_social_nombres} y su usuario`)}
                                        className="flex-1 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white text-red-600 transition-all cursor-pointer group"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        <span className="font-semibold text-sm">Eliminar Cliente</span>
                                    </button>

                                    <button
                                        onClick={handleGuardarPerfil}
                                        disabled={isSaving}
                                        className={`flex-2 bg-brand-50 rounded-xl p-4 border border-brand-200 flex flex-col justify-center transition-colors group ${isSaving ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-brand-600'}`}
                                    >
                                        <div className="flex items-center justify-center gap-3 w-full">
                                            <span className="text-brand-700 group-hover:text-white font-semibold text-sm">{isSaving ? 'Guardando...' : 'Guardar Perfil'}</span>
                                            {!isSaving && <svg className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>}
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>



                <div className="bg-white rounded-xl border border-slate-200 p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 tracking-tight">Obligaciones Tributarias</h2>
                            <p className="text-slate-500 text-sm mt-1">Se guardan automáticamente al marcar la casilla.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            {canEdit && (
                                <button onClick={onOpenDeclaracion} className="cursor-pointer bg-brand-50 text-brand-700 border border-brand-200 text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-brand-600 hover:text-white transition-all flex items-center gap-2 shrink-0">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                    Añadir Obligación
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="overflow-x-auto border border-slate-100 rounded-xl">
                        <table className="w-full text-left border-collapse min-w-175">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500">
                                    <th className="px-5 py-4">Tipo de Impuesto</th>
                                    <th className="px-5 py-4">Periodo / Fecha Límite</th>
                                    <th className="px-5 py-4">Estado Actual</th>
                                    {canEdit && <th className="px-5 py-4 text-center">Acciones</th>}
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-slate-50">
                                {isLoadingObligaciones ? (
                                    <tr>
                                        <td colSpan={canEdit ? 4 : 3} className="text-center py-8 text-slate-400 font-medium text-xs">Cargando obligaciones...</td>
                                    </tr>
                                ) : obligaciones.length === 0 ? (
                                    <tr>
                                        <td colSpan={canEdit ? 4 : 3} className="text-center py-8 text-slate-400 italic">No hay obligaciones registradas para este cliente.</td>
                                    </tr>
                                ) : (
                                    obligaciones.map((ob) => (
                                        <tr key={ob.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-5 py-4 font-semibold text-slate-900">{ob.tipo_impuesto}</td>

                                            <td className="px-10 py-4 text-slate-600">
                                                <div className='flex flex-col'>
                                                    <span className='font-semibold text-slate-700'>
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
                                                    <span className="bg-green-50 text-green-600 border border-green-200 px-2.5 py-1 rounded-md text-xs font-medium flex items-center w-max gap-1">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                                        Presentado
                                                    </span>
                                                ) : (
                                                    <span className="bg-yellow-50 text-yellow-600 border border-yellow-200 px-2.5 py-1 rounded-md text-xs font-medium flex items-center w-max gap-1">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                        Pendiente
                                                    </span>
                                                )}
                                            </td>

                                            {canEdit && (
                                                <td className="px-5 py-4 text-center flex justify-center items-center gap-2">
                                                    {ob.estado === 'Pendiente' && (
                                                        <button
                                                            onClick={() => onOpenSubir(ob.id, ob.tipo_impuesto)}
                                                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all cursor-pointer"
                                                            title="Subir Anexos y Presentar"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                                            </svg>
                                                        </button>
                                                    )}

                                                    <button
                                                        onClick={() => onOpenEditarObligacion(ob)}
                                                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all cursor-pointer"
                                                        title="Cambiar Encargado"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                                    </button>

                                                    <button
                                                        onClick={() => onOpenEliminar(`/obligacion/${ob.id}`, `Obligacion ${ob.tipo_impuesto}`)}
                                                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all cursor-pointer"
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

                <div className="bg-white rounded-xl border border-slate-200 p-6 lg:p-8 mt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 tracking-tight">Biblioteca Operativa</h2>
                            <p className="text-slate-500 text-sm mt-1">Seleccione la Carpeta Principal para saltar al gestor documental.</p>
                        </div>

                        {canEdit && (
                            <button onClick={onOpenCrearPeriodo} className="cursor-pointer bg-brand-600 text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-brand-700 transition-all flex items-center gap-2 shrink-0">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                Añadir Carpeta Raíz
                            </button>
                        )}
                    </div>

                    {carpetasRaiz.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                            {carpetasRaiz.map(carpeta => (
                                <div key={carpeta.id} onClick={() => onJumpToBiblioteca(cliente.id, carpeta.id)} className="border border-brand-200 bg-brand-50 rounded-xl p-5 hover:bg-brand-100 transition-all cursor-pointer group flex flex-col items-center text-center">
                                    <svg className="w-10 h-10 text-brand-600 mb-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></svg>
                                    <h3 className="font-semibold text-brand-700 text-base leading-tight">{carpeta.nombre}</h3>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-8 text-center border-2 border-dashed border-slate-200 rounded-xl">
                            <p className="text-slate-400 italic text-sm">Este cliente aún no tiene directorios en la biblioteca.</p>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 lg:p-8 mt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 tracking-tight">Score Tributario</h2>
                            <p className="text-slate-500 text-sm mt-1">Calificación de las preguntas respondidas por el cliente</p>
                        </div>
                        <div className="text-right">
                            <span className="block text-3xl font-bold text-brand-600 leading-none">
                                {cliente.score_tributario ?? 0}
                            </span>
                            <span className="text-slate-400 text-xs font-medium">
                                Puntaje Total
                            </span>
                        </div>
                    </div>

                    {cliente.detalle_score && cliente.detalle_score.length > 0 ? (
                        <div className="space-y-4">
                            <div className="overflow-hidden border border-slate-100 rounded-xl">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500">
                                            <th className="px-5 py-3">Pregunta Evaluada</th>
                                            <th className="px-5 py-3 text-center">Escala (1-5)</th>
                                            <th className="px-5 py-3 text-right">Puntos Calculados</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-slate-50">
                                        {cliente.detalle_score.map((detalle: any, index: number) => (
                                            <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-5 py-3 text-slate-700 font-medium">
                                                    {detalle.enunciado}
                                                </td>
                                                <td className="px-5 py-3 text-center">
                                                    <span className="bg-blue-50 text-blue-600 font-semibold px-2 py-1 rounded text-xs">
                                                        {detalle.valor_seleccionado} / 5
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3 text-right font-semibold text-brand-600">
                                                    {detalle.puntos_obtenidos.toFixed(2)} pts
                                                    <span className="text-slate-400 text-xs font-normal block sm:inline sm:ml-1">
                                                        (de {detalle.peso_maximo})
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {cliente.comentario_score && (
                                <div className="bg-brand-50/50 rounded-xl p-4 border border-brand-100 mt-4">
                                    <span className="block text-xs font-medium text-brand-600 mb-1">
                                        Comentario de la Evaluación
                                    </span>
                                    <p className="text-slate-700 text-sm italic">
                                        "{cliente.comentario_score}"
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="py-8 text-center border-2 border-dashed border-slate-200 rounded-xl">
                            <p className="text-slate-400 italic text-sm">Este cliente aún no tiene un detalle de evaluación de Score Tributario registrado.</p>
                        </div>
                    )}
                </div>

            </div>
        </ScrollReveal>
    );
};

export default PerfilCliente;