/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import api from '../../../../api/axios';

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

interface ModalAñadirClienteProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void; 
}

export const ModalAñadirCliente: React.FC<ModalAñadirClienteProps> = ({ isOpen, onClose, onSuccess }) => {
    
    const [razonSocial, setRazonSocial] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [score, setScore] = useState<number>(100);
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [tipoServicio, setTipoServicio] = useState('');
    const [tipoContribuyente, setTipoContribuyente] = useState('Persona Natural');
    const [regimenTributario, setRegimenTributario] = useState('General');
    const [agenteRetencion, setAgenteRetencion] = useState(false);
    const [actividadEconomica, setActividadEconomica] = useState('');
    const [sector, setSector] = useState('Servicios');
    const [telefonoContacto, setTelefonoContacto] = useState('');
    const [gestoresSeleccionados, setGestoresSeleccionados] = useState<number[]>([]);
    const [usuariosGestores, setUsuariosGestores] = useState<any[]>([]);
    
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const { data } = await api.get('/usuario');
                const filtrados = data.usuarios.filter((u: any) => u.rol_id === 1 || u.rol_id === 3);
                setUsuariosGestores(filtrados);
            } catch (error) {
                console.error("Error al cargar usuarios gestores:", error);
            }
        };

        if (isOpen) {
            fetchUsuarios();
            setRazonSocial('');
            setIdentificacion('');
            setScore(100);
            setCorreo('');
            setPassword('');
            setGestoresSeleccionados([]);
            setTipoServicio('Impuestos');
            setTipoContribuyente('Persona Natural');
            setRegimenTributario('General');
            setAgenteRetencion(false);
            setActividadEconomica('');
            setSector('Servicios');
            setTelefonoContacto('');
            setErrorMsg('');
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMsg('');

        if (gestoresSeleccionados.length === 0) {
            setErrorMsg("Debes seleccionar al menos un gestor para el cliente.");
            return;
        }

        const identificacionClean = identificacion.trim();

        const validacion = validarEstructuraRUC(identificacionClean);
        if (!validacion.valido) {
            setErrorMsg("RUC Inválido: " + validacion.mensaje);
            return; 
        }

        setLoading(true);
        try {
            const payload = {
                razon_social_nombres: razonSocial,
                identificacion: identificacionClean,
                score_tributario: score,
                correo: correo,
                password: password,
                gestores: gestoresSeleccionados,
                tipo_servicio: tipoServicio,
                tipo_contribuyente: tipoContribuyente,
                regimen_tributario: regimenTributario,
                agente_retencion: agenteRetencion,
                actividad_economica: actividadEconomica,
                sector: sector,
                telefono_contacto: telefonoContacto
            };

            await api.post('/cliente', payload); 
            
            onSuccess(); 
            onClose();   
            alert("Cliente añadido exitosamente");

        } catch (error: any) {
            const msg = error?.response?.data?.message || "Error al crear cliente";
            setErrorMsg(msg);
            console.error(error?.response?.data?.errors); 
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div id="add-client-modal" className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150] flex justify-center items-center p-4 transition-opacity duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative transform scale-100 transition-transform duration-300 max-h-[90vh] overflow-y-auto no-scrollbar">
                
                <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-orange-500 focus:outline-none cursor-pointer">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                
                <div className="mb-5 border-b border-gray-100 pb-4">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.70rem] uppercase mb-1 block">Directorio</span>
                    <h2 className="text-blue-200 font-extrabold text-[1.4rem] tracking-tight">Añadir Nuevo Cliente</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {errorMsg && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100 flex items-start gap-2">
                            <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                            <span>{errorMsg}</span>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Razón Social</label>
                            <input type="text" value={razonSocial} onChange={(e) => setRazonSocial(e.target.value)} placeholder="Ej. Empresa S.A." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500" required />
                        </div>
                        <div>
                            <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">No. Teléfono Contacto</label>
                            <input type="text" value={telefonoContacto} onChange={(e) => setTelefonoContacto(e.target.value)} placeholder="Ej. 0999999999" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500" />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">RUC / Cédula</label>
                            <input type="text" maxLength={13} value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} placeholder="Ej. 1790000000001" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500" required />
                        </div>
                        <div>
                            <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Score Tributario</label>
                            <input type="number" value={score} onChange={(e) => setScore(Number(e.target.value))} max="100" min="0" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500" required />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Tipo de Servicio</label>
                            <select value={tipoServicio} onChange={(e) => setTipoServicio(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500">
                                <option value="Impuestos">Impuestos</option>
                                <option value="Outsourcing contable">Outsourcing contable</option>
                                <option value="Auditoria">Auditoría</option>
                                <option value="Trabajos especiales">Trabajos especiales</option>
                                <option value="Outsourcing de Nomina">Outsourcing de Nómina</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Sector</label>
                            <select value={sector} onChange={(e) => setSector(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500">
                                <option value="Servicios">Servicios</option>
                                <option value="Comercial">Comercial</option>
                                <option value="Industrial">Industrial</option>
                                <option value="Turismo">Turismo</option>
                                <option value="Financiero">Financiero</option>
                                <option value="Otros">Otros</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Tipo Contribuyente</label>
                            <select value={tipoContribuyente} onChange={(e) => setTipoContribuyente(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500">
                                <option value="Persona Natural">Persona Natural</option>
                                <option value="Sociedad">Sociedad</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Régimen Tributario</label>
                            <select value={regimenTributario} onChange={(e) => setRegimenTributario(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500">
                                <option value="General">General</option>
                                <option value="RIMPE">RIMPE</option>
                                <option value="Grande Contribuyente">Grande Contribuyente</option>
                                <option value="Contribuyente Especial">Contribuyente Especial</option>
                                <option value="Exportador habitual">Exportador habitual</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Agente de Retención</label>
                            <select value={agenteRetencion ? "true" : "false"} onChange={(e) => setAgenteRetencion(e.target.value === "true")} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500">
                                <option value="false">NO</option>
                                <option value="true">SI</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Correo <span className="text-gray-400 font-normal normal-case tracking-normal">(Usuario 1)</span></label>
                            <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="correo@empresa.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500" required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Contraseña (Acceso)</label>
                        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Clave de acceso" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500" required minLength={8} />
                    </div>

                    <div>
                        <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Actividad Económica</label>
                        <textarea value={actividadEconomica} onChange={(e) => setActividadEconomica(e.target.value)} placeholder="Describa brevemente la actividad económica principal..." rows={2} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500 resize-none" />
                    </div>

                    <div>
                        <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Gestionado Por (Selecciona uno o más)</label>
                        <div className="w-full border border-gray-200 rounded-lg max-h-36 overflow-y-auto bg-gray-50 p-2 space-y-1">
                            {usuariosGestores.map((u) => (
                                <label key={u.id} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors">
                                    <input 
                                        type="checkbox"
                                        checked={gestoresSeleccionados.includes(u.id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setGestoresSeleccionados([...gestoresSeleccionados, u.id]);
                                            } else {
                                                setGestoresSeleccionados(gestoresSeleccionados.filter(id => id !== u.id));
                                            }
                                        }}
                                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                                    />
                                    <span className="text-[0.85rem] font-medium text-blue-200">{u.nombre} {u.apellido}</span>
                                </label>
                            ))}
                            {usuariosGestores.length === 0 && (
                                <p className="text-xs text-gray-400 p-2">No hay gestores disponibles.</p>
                            )}
                        </div>
                    </div>
                    
                    
                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                        <button type="button" onClick={onClose} disabled={loading} className="flex-1 py-3 border border-gray-200 rounded-md text-gray-600 font-bold uppercase tracking-wider text-[0.80rem] hover:bg-gray-50 transition-colors cursor-pointer">
                            Cancelar
                        </button>
                        
                        <button type="submit" disabled={loading} className={`flex-1 py-3 text-white rounded-md font-bold uppercase tracking-wider text-[0.80rem] transition-colors cursor-pointer ${loading ? 'bg-gray-400' : 'bg-blue-200 hover:bg-orange-500'}`}>
                            {loading ? 'Creando...' : 'Añadir Cliente'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};