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
                                <option value="DECLARACIÓN DE AUTORETENCIONES EN LA FUENTE DEL IR">Declaración de Autoretenciones en la FUente del IR</option>
                                <option value="DECLARACIÓN DEL IMPUESTO REDIMIBLE A LAS BOTELLAS PLÁSTICAS">Declaración del Impuesto Redimible a las Botellas Plásticas</option>
                                <option value="ANEXO TRANSACCIONAL SIMPLIFICADO - ATS (MENSUAL)">Anexo Transaccional Simplificado - ATS (Mensual)</option>
                                <option value="ANEXO IMPUESTO CONSUMOS ESPECIALES (ICE)">Anexo Impuesto Consumos Especiales ICE</option>
                                <option value="ANEXO IMPUESTO REDIMIBLE A LAS BOTELLAS PLÁSTICAS">Anexo Impuesto Redimible a las Botellas Plásticas</option>
                                <option value="PAGO DE APORTE AL IESS">Pago de Aporte al IESS</option>
                                <option value="FONDOS DE RESERVA">Fondos de Reserva</option>
                                <option value="IMPUESTO A LOS CONSUMOS ESPECIALES - ICE (MENSUAL)">Impuesto a los Consumos Especiales - ICE (Mensual)</option>
                                <option value="IMPUESTO A LA SALIDA DE DIVISAS - ISD (MENSUAL)">Impuesto a la Salida de Divisas - ISD (Mensual)</option>
                                <option value="IMPUESTO A LOS ACTIVOS EN EL EXTERIOR">Impuesto a los Activos en el Exterior </option>
                                <option value="REPORTE OPERACIONES INUSUALES INJUSTIFICADAS (ROI)">Reporte Operaciones Inusuales Injustificadas (ROI)</option>
                                <option value="REPORTE OPERACIONES IGUALES O SUPERIORES AL UMBRAL LEGAL">Reporte Operaciones Iguales o Superiores al Umbral Legal</option>
                                <option value="REPORTE VENTAS A CRÉDITO">Reporte Ventas a Crédito</option>
                            </optgroup>
                            <optgroup label="Semestrales">
                                <option value="IVA (RÉGIMEN RIMPE)">IVA (Régimen RIMPE)</option>
                                <option value="IMPUESTO A LA RENTA (RÉGIMEN RIMPE SEMESTRAL)">Impuesto a la Renta (Régimen RIMPE Semestral)</option>
                                <option value="RETENCIONES EN LA FUENTE DEL IR (RÉGIMEN RIMPE)">Retenciones en la Fuente del IR (Régimen RIMPE)</option>
                                <option value="ANEXO TRANSACCIONAL SIMPLIFICADO - ATS (RÉGIMEN RIMPE)">Anexo Transaccional Simplificado - ATS (Régimen RIMPE)</option>
                            </optgroup>
                            <optgroup label="Anuales">
                                <option value="ANEXO DE PRECIOS DE VENTA AL PÚBLICO (ICE - PVP)">ICE - PVP</option>
                                <option value="ANEXO DE GASTOS PERSONALES">Anexo Gastos Personales</option>
                                <option value="REPORTE BENEFICIARIOS FINALES Y COMPOSICIÓN SOCIETARIA (REBEFICS)">APS</option>
                                <option value="ANEXO DE RELACION DE DEPENDENCIA (RDEP)">RDEP</option>
                                <option value="ANEXO DE OPERACIONES Y TRANSACCIONES ECONÓMICAS FINANCIERAS (ROTEF)">ROTEF</option>
                                <option value="IMPUESTO A LA RENTA (PERSONAS NATURALES)">IR (Personas Naturales)</option>
                                <option value="DÉCIMO CUARTO SUELDO (COSTA)">Décimo Cuarto Sueldo (Costa)</option>
                                <option value="DÉCIMO CUARTO SUELDO (SIERRA)">Décimo Cuarto Sueldo (Sierra)</option>
                                <option value="IMPUESTO A LA RENTA (SOCIEDADES)">Impuesto a la Renta (Sociedades)</option>
                                <option value="IMPUESTO A LA SALIDA DE DIVISAS - ISD TARJETAS DE CRÉDITO">Impuesto a la Salida de Divisas - ISD Tarjetas de Crédito</option>
                                <option value="IMPUESTO A LA SALIDA DE DIVISAS - ISD PRESUNTIVO">Impuesto a la Salida de Divisas - ISD Presuntivo</option>
                                <option value="PRESENTACIÓN ESTADOS FINANCIEROS">Presentación Estados Financieros</option>
                                <option value="PARTICIPACIÓN DE UTILIDADES (15%)">Participación de Utilidades (15%)</option>
                                <option value="IMPUESTO A LA RENTA (PERSONAS NATURALES RÉGIMEN RIMPE ANUAL)">Impuesto a la Renta (Personas Naturales Régimen Rimpe Anual)</option>
                                <option value="ANEXO DE DIVIDENDOS (ADI)">Anexo de Dividendos (ADI)</option>
                                <option value="DECLARACIÓN PATRIMONIAL PERSONAS NATURALES">Declaración Patrimonial Personas Naturales</option>
                                <option value="PATENTE MUNICIPAL">Patente Municipal</option>
                                <option value="IMPUESTO 1.5 POR MIL SOBRE ACTIVOS">Impuesto 1.5 por Mil Sobre Activos</option>
                                <option value="TASA DE HABILITACIÓN/LUAE">Tasa de Habilitación/LUAE</option>
                                <option value="PERMISO DE FUNCIONAMIENTO">Permiso de Funcionamiento</option>
                                <option value="TASA DE BOMBEROS">Tasa de Bomberos</option>
                                <option value="ANEXO DE OPERACIONES CON PARTES RELACIONADAS">Anexo de Operaciones con Partes Relacionadas</option>
                                <option value="INFORME DE PRECIOS DE TRANSFERENCIA">Informe de Precios de Transferencia</option>
                                <option value="IMPUESTO PREDIAL URBANO">Impuesto Predial Urbano</option>
                                <option value="IMPUESTO PREDIAL RURAL">Impuesto Predial Rural</option>
                                <option value="DECLARACIÓN DEL PAGO A CUENTA SOBRE UTILIDADES NO DISTRIBUIDAS">Declaración del Pago a Cuenta sobre Utilidades No Distribuidas</option>
                                <option value="CONTRIBUCIÓN SOCIETARIA">Contribución Societaria</option>
                                <option value="TASA MUNICIPAL POR PUBLICIDAD EXTERIOR">Tasa Municipal por Publicidad Exterior</option>
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

