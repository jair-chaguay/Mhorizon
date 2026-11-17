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
        const pasaModulo11 = validarModulo11Sociedades(ruc);
        if (!pasaModulo11) {
            console.warn(`El RUC ${ruc} no pasa el Módulo 11 clásico, pero se acepta por flexibilización del SRI.`)
        }
        return { valido: true, tipo: "Sociedad Privada" }
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
    const [tiposServicioSeleccionados, setTiposServicioSeleccionados] = useState<string[]>([]);
    const [representantes, setRepresentantes] = useState([
        { nombre: '', correo: '', cargo: '', telefono: '' }
    ]);
    const [tipoContribuyente, setTipoContribuyente] = useState('Persona Natural');
    const [regimenTributario, setRegimenTributario] = useState('General');
    const [agenteRetencion, setAgenteRetencion] = useState(false);
    const [actividadEconomica, setActividadEconomica] = useState('');
    const [sector, setSector] = useState('Servicios');
    const [telefonoContacto, setTelefonoContacto] = useState(''); // Teléfono de la empresa en general
    const [gestoresSeleccionados, setGestoresSeleccionados] = useState<number[]>([]);
    const [usuariosGestores, setUsuariosGestores] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const handleServicioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTiposServicioSeleccionados(prev =>
            e.target.checked ? [...prev, value] : prev.filter(s => s !== value)
        );
    };
    const handleRepresentanteChange = (index: number, field: string, value: string) => {
        const nuevosRepresentantes = [...representantes];
        (nuevosRepresentantes[index] as any)[field] = value;
        setRepresentantes(nuevosRepresentantes);
    };
    const agregarRepresentante = () => {
        setRepresentantes([...representantes, { nombre: '', correo: '', cargo: '', telefono: '' }]);
    };
    const eliminarRepresentante = (index: number) => {
        const nuevos = representantes.filter((_, i) => i !== index);
        setRepresentantes(nuevos);
    };



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
            setTiposServicioSeleccionados([]);
            setRepresentantes([{ nombre: '', correo: '', cargo: '', telefono: '' }]);
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


        const representantesInvalidos = representantes.some(rep => rep.nombre.trim() === '');
        if (representantesInvalidos) {
            setErrorMsg("Todos los representantes añadidos deben tener al menos un nombre.");
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

                tipo_servicio: tiposServicioSeleccionados,
                representantes: representantes,
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
        <div id="add-client-modal" className="fixed inset-0 bg-slate-900/50 z-[150] flex justify-center items-center p-4 transition-opacity duration-300">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 relative transform scale-100 transition-transform duration-300 max-h-[90vh] overflow-y-auto no-scrollbar">

                <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-brand-600 focus:outline-none cursor-pointer">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                <div className="mb-5 border-b border-slate-100 pb-4">
                    <span className="text-brand-600 font-medium text-xs mb-1 block">Directorio</span>
                    <h2 className="text-slate-900 font-semibold text-lg tracking-tight">Añadir Nuevo Cliente</h2>
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
                            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Razón Social</label>
                            <input type="text" value={razonSocial} onChange={(e) => setRazonSocial(e.target.value)} placeholder="Ej. Empresa S.A." className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20" required />
                        </div>
                        <div>
                            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">RUC / Cédula</label>
                            <input type="text" maxLength={13} value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} placeholder="Ej. 1790000000001" className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20" required />
                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Score Tributario</label>
                            <input type="number" value={score} onChange={(e) => setScore(Number(e.target.value))} max="100" min="0" className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20" required />
                        </div>
                        <div>
                            <label className="block text-[13px] font-semibold text-slate-700 mb-2">Tipos de Servicio Contratados</label>
                            <div className="flex flex-wrap gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                                {['Impuestos', 'Outsourcing contable', 'Auditoria', 'Trabajos especiales', 'Outsourcing de Nomina'].map(servicio => (
                                    <label key={servicio} className="flex items-center gap-2 cursor-pointer text-slate-700 text-sm">
                                        <input
                                            type="checkbox"
                                            value={servicio}
                                            checked={tiposServicioSeleccionados.includes(servicio)}
                                            onChange={handleServicioChange}
                                            className="w-4 h-4 text-brand-600 border-slate-300 rounded focus:ring-brand-600/20"
                                        />
                                        {servicio}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>
                            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Sector</label>
                            <select value={sector} onChange={(e) => setSector(e.target.value)} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20">
                                <option value="Servicios">Servicios</option>
                                <option value="Comercial">Comercial</option>
                                <option value="Industrial">Industrial</option>
                                <option value="Turismo">Turismo</option>
                                <option value="Financiero">Financiero</option>
                                <option value="Otros">Otros</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Tipo Contribuyente</label>
                            <select value={tipoContribuyente} onChange={(e) => setTipoContribuyente(e.target.value)} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20">
                                <option value="Persona Natural">Persona Natural</option>
                                <option value="Sociedad">Sociedad</option>
                            </select>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Régimen Tributario</label>
                            <select value={regimenTributario} onChange={(e) => setRegimenTributario(e.target.value)} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20">
                                <option value="General">General</option>
                                <option value="RIMPE">RIMPE</option>
                                <option value="Grande Contribuyente">Grande Contribuyente</option>
                                <option value="Contribuyente Especial">Contribuyente Especial</option>
                                <option value="Exportador habitual">Exportador habitual</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Agente de Retención</label>
                            <select value={agenteRetencion ? "true" : "false"} onChange={(e) => setAgenteRetencion(e.target.value === "true")} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20">
                                <option value="false">NO</option>
                                <option value="true">SI</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>
                            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Correo <span className="text-slate-400 font-normal normal-case tracking-normal">(Usuario 1)</span></label>
                            <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="correo@empresa.com" className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20" required />
                        </div>
                        <div>
                            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Contraseña (Acceso)</label>
                            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Clave de acceso" className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20" required minLength={8} />
                        </div>
                    </div>



                    <div>
                        <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Actividad Económica</label>
                        <textarea value={actividadEconomica} onChange={(e) => setActividadEconomica(e.target.value)} placeholder="Describa brevemente la actividad económica principal..." rows={2} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 resize-none focus:ring-2 focus:ring-brand-600/20" />
                    </div>

                    <div>
                        <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Gestionado Por (Selecciona uno o más)</label>
                        <div className="w-full border border-slate-200 rounded-lg max-h-36 overflow-y-auto bg-slate-50 p-2 space-y-1">
                            {usuariosGestores.map((u) => (
                                <label key={u.id} className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-md cursor-pointer transition-colors">
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
                                        className="w-4 h-4 text-brand-600 border-slate-300 rounded focus:ring-brand-600/20"
                                    />
                                    <span className="text-sm font-medium text-slate-900">{u.nombre} {u.apellido}</span>
                                </label>
                            ))}
                            {usuariosGestores.length === 0 && (
                                <p className="text-xs text-slate-400 p-2">No hay gestores disponibles.</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                            <h3 className="text-[13px] font-semibold text-slate-900">2. Directorio de Contactos</h3>
                            <button type="button" onClick={agregarRepresentante} className="text-xs text-white bg-brand-600 px-3 py-2.5 cursor-pointer rounded hover:bg-brand-700 transition-colors">
                                + Añadir Contacto
                            </button>
                        </div>

                        {representantes.map((rep, index) => (
                            <div key={index} className="space-y-4 pb-4 border-b border-slate-200 border-dashed relative pt-2">
                                {index > 0 && (
                                    <button type="button" onClick={() => eliminarRepresentante(index)} className="cursor-pointer absolute top-2 right-0 text-red-500 hover:text-red-700 text-xs font-semibold">
                                        Eliminar
                                    </button>
                                )}
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Nombre Completo</label>
                                        <input type="text" value={rep.nombre} onChange={(e) => handleRepresentanteChange(index, 'nombre', e.target.value)} placeholder="Nombre del contacto..." className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20" required />
                                    </div>
                                    <div>
                                        <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Cargo</label>
                                        <input type="text" value={rep.cargo} onChange={(e) => handleRepresentanteChange(index, 'cargo', e.target.value)} placeholder="Ej. Gerente General" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Correo de Contacto</label>
                                        <input type="email" value={rep.correo} onChange={(e) => handleRepresentanteChange(index, 'correo', e.target.value)} placeholder="contacto@empresa.com" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20" />
                                    </div>
                                    <div>
                                        <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Teléfono Personal/Móvil</label>
                                        <input type="text" value={rep.telefono} onChange={(e) => handleRepresentanteChange(index, 'telefono', e.target.value)} placeholder="Ej. 0999999999" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className="flex gap-3 pt-4 border-t border-slate-100">
                        <button type="button" onClick={onClose} disabled={loading} className="flex-1 py-2.5 border border-slate-200 rounded-md text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer">
                            Cancelar
                        </button>

                        <button type="submit" disabled={loading} className={`flex-1 py-2.5 text-white rounded-md font-semibold text-sm transition-colors cursor-pointer ${loading ? 'bg-slate-400' : 'bg-brand-600 hover:bg-brand-700'}`}>
                            {loading ? 'Creando...' : 'Añadir Cliente'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

