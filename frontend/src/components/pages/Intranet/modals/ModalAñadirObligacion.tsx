/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import api from '../../../../api/axios'; 

interface ModalAñadirObligacionProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    clienteId?: number;
    gestoresCliente?: Array<{id: number, nombre: string, apellido: string}>; 
}

const ModalAñadirObligacion: React.FC<ModalAñadirObligacionProps> = ({ 
    isOpen, 
    onClose, 
    onSuccess, 
    clienteId,
    gestoresCliente = [] 
}) => {
    const [formData, setFormData] = useState({
        tipo_impuesto: 'IVA (MENSUAL)', 
        dia_vencimiento: '',
        usuario_id: '' 
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const defaultGestor = gestoresCliente.length > 0 ? gestoresCliente[0].id.toString() : '';
            
            setFormData({ 
                tipo_impuesto: 'IVA (MENSUAL)', 
                dia_vencimiento: '', 
                usuario_id: defaultGestor 
            });
        }
    }, [isOpen, gestoresCliente]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!clienteId) {
            alert("Error: No se ha seleccionado un cliente.");
            return;
        }

        if (!formData.usuario_id) {
            alert("Error: Debes asignar un encargado de la lista de gestores.");
            return;
        }

        setIsSubmitting(true);
        try {
            await api.post('/obligacion', {
                tipo_impuesto: formData.tipo_impuesto,
                dia_vencimiento: Number(formData.dia_vencimiento), 
                cliente_id: clienteId,
                usuario_id: Number(formData.usuario_id)
            });
            
            onSuccess(); 
            onClose();
        } catch (error: any) {
            console.error("Error al guardar la obligación:", error);
            const msg = error.response?.data?.message || "No se pudo guardar la obligación.";
            alert(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-130 flex justify-center items-center p-4 transition-opacity duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative transform transition-transform duration-300">
                <button onClick={onClose} type="button" className="absolute top-5 right-5 text-gray-400 hover:text-orange-500 focus:outline-none cursor-pointer">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                
                <div className="mb-5 border-b border-gray-100 pb-4">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.70rem] uppercase mb-1 block">Gestor Tributario</span>
                    <h2 className="text-blue-200 font-extrabold text-[1.4rem] tracking-tight">Añadir Obligación</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Tipo de Obligación</label>
                        <select 
                            value={formData.tipo_impuesto}
                            onChange={(e) => setFormData({...formData, tipo_impuesto: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500"
                        >
                            <optgroup label="Mensuales">
                                <option value="IVA (MENSUAL)">IVA (Mensual)</option>
                                <option value="RETENCIONES FUENTE IR (MENSUAL)">Retenciones Fuente IR (Mensual)</option>
                                <option value="RETENCIONES IVA">Retenciones IVA</option>
                                <option value="IRBP">IRBP</option>
                                <option value="ATS (MENSUAL)">ATS (Mensual)</option>
                                <option value="ANEXO ICE">Anexo ICE</option>
                                <option value="ANEXO IRBP">Anexo IRBP</option>
                                <option value="PAGO APORTES IESS">Pago Aportes IESS</option>
                                <option value="FONDOS DE RESERVA">Fondos de Reserva</option>
                                <option value="ANEXO REOC">Anexo REOC</option>
                                <option value="ICE (MENSUAL)">ICE (Mensual)</option>
                                <option value="ISD (MENSUAL)">ISD (Mensual)</option>
                            </optgroup>
                            <optgroup label="Semestrales">
                                <option value="IVA (RÉGIMEN RIMPE)">IVA (Régimen RIMPE)</option>
                                <option value="IR (RÉGIMEN RIMPE SEMESTRAL)">IR (Régimen RIMPE Semestral)</option>
                                <option value="RETENCIONES IR (RÉGIMEN RIMPE)">Retenciones IR (Régimen RIMPE)</option>
                                <option value="ATS (RÉGIMEN RIMPE)">ATS (Régimen RIMPE)</option>
                                <option value="ICE (SEMESTRAL)">ICE (Semestral)</option>
                            </optgroup>
                            <optgroup label="Anuales">
                                <option value="ICE - PVP">ICE - PVP</option>
                                <option value="ANEXO GASTOS PERSONALES">Anexo Gastos Personales</option>
                                <option value="APS">APS</option>
                                <option value="RDEP">RDEP</option>
                                <option value="ROTEF">ROTEF</option>
                                <option value="IR (PERSONAS NATURALES)">IR (Personas Naturales)</option>
                                <option value="DÉCIMO CUARTO SUELDO (COSTA)">Décimo Cuarto Sueldo (Costa)</option>
                                <option value="DÉCIMO CUARTO SUELDO (SIERRA)">Décimo Cuarto Sueldo (Sierra)</option>
                                <option value="IR (SOCIEDADES)">IR (Sociedades)</option>
                                <option value="ISD (ANUAL)">ISD (Anual)</option>
                                <option value="PRESENTACIÓN ESTADOS FINANCIEROS">Presentación Estados Financieros</option>
                                <option value="PARTICIPACIÓN DE UTILIDADES">Participación de Utilidades</option>
                                <option value="IR (RIMPE ANUAL)">IR (RIMPE Anual)</option>
                                <option value="ADI">ADI</option>
                                <option value="DECLARACIÓN PATRIMONIAL">Declaración Patrimonial</option>
                                <option value="PATENTE MUNICIPAL">Patente Municipal</option>
                                <option value="IMPUESTO 1.5 POR MIL">Impuesto 1.5 por mil</option>
                                <option value="LUAE">LUAE / Tasa de habilitación</option>
                                <option value="PERMISO DE FUNCIONAMIENTO">Permiso de Funcionamiento</option>
                                <option value="TASA DE BOMBEROS">Tasa de Bomberos</option>
                                <option value="ANEXO PARTES RELACIONADAS">Anexo Partes Relacionadas</option>
                                <option value="INFORME PRECIOS DE TRANSFERENCIA">Informe Precios de Transferencia</option>
                                <option value="IMPUESTO PREDIAL URBANO">Impuesto Predial Urbano</option>
                                <option value="IMPUESTO PREDIAL RURAL">Impuesto Predial Rural</option>
                                <option value="PAGO A CUENTA">Pago a Cuenta</option>
                                <option value="ANTICIPO UTILIDADES ACUMULADAS">Anticipo Utilidades Acumuladas</option>
                                <option value="CONTRIBUCIÓN SOCIETARIA">Contribución Societaria</option>
                                <option value="IMPUESTO PUBLICIDAD EXTERIOR">Impuesto Publicidad Exterior</option>
                                <option value="DÉCIMO TERCER SUELDO">Décimo Tercer Sueldo</option>
                            </optgroup>                      
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Día Límite (1-31)</label>
                            <input 
                                type="number" 
                                min="1" max="31"
                                placeholder="Ej. 15" 
                                value={formData.dia_vencimiento}
                                onChange={(e) => setFormData({...formData, dia_vencimiento: e.target.value})}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Encargado (Notificar a)</label>
                            <select 
                                value={formData.usuario_id}
                                onChange={(e) => setFormData({...formData, usuario_id: e.target.value})}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500"
                                required
                            >
                                <option value="">Seleccionar Gestor...</option>
                                {gestoresCliente.map((u) => (
                                    <option key={u.id} value={u.id}>{u.nombre} {u.apellido}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} disabled={isSubmitting} className="flex-1 py-3 border border-gray-200 rounded-md text-gray-600 font-bold uppercase tracking-wider text-[0.80rem] hover:bg-gray-50 transition-colors cursor-pointer">
                            Cancelar
                        </button>
                        <button type="submit" disabled={isSubmitting || gestoresCliente.length === 0} className={`flex-1 py-3 text-white rounded-md font-bold uppercase tracking-wider text-[0.80rem] transition-colors ${isSubmitting || gestoresCliente.length === 0 ? 'bg-gray-400 opacity-50 cursor-not-allowed' : 'bg-blue-200 hover:bg-orange-500 cursor-pointer'}`}>
                            {isSubmitting ? 'Guardando...' : 'Guardar Obligación'}
                        </button>
                    </div>
                    {gestoresCliente.length === 0 && (
                        <p className="text-red-500 text-xs text-center font-semibold mt-2">
                             Este cliente no tiene gestores asignados. Asigna un gestor en el perfil antes de añadir obligaciones.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ModalAñadirObligacion;