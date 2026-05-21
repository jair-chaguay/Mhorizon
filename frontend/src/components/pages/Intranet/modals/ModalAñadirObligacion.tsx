/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import api from '../../../../api/axios'; 

interface ModalAñadirObligacionProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    clienteId?: number;
}

const ModalAñadirObligacion: React.FC<ModalAñadirObligacionProps> = ({ isOpen, onClose, onSuccess, clienteId }) => {
    const [formData, setFormData] = useState({
        tipo_impuesto: 'IR (Régimen Sociedad)',
        dia_vencimiento: '',
        usuario_id: '' 
    });
    
    const [usuariosGestores, setUsuariosGestores] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const { data } = await api.get('/usuario');
                const filtrados = data.usuarios.filter((u: any) => u.rol_id === 1 || u.rol_id === 3);
                setUsuariosGestores(filtrados);
                if (filtrados.length > 0) {
                    setFormData(prev => ({ ...prev, usuario_id: filtrados[0].id.toString() }));
                }
            } catch (error) {
                console.error("Error al cargar usuarios gestores:", error);
            }
        };

        if (isOpen) {
            fetchUsuarios();
            setFormData({ tipo_impuesto: 'IR (Régimen Sociedad)', dia_vencimiento: '', usuario_id: '' });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!clienteId) {
            alert("Error: No se ha seleccionado un cliente.");
            return;
        }

        if (!formData.usuario_id) {
            alert("Error: Debes asignar un encargado.");
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
                            <option value="IR (Régimen Emprendedor)">IR (Régimen Emprendedor)</option>
                            <option value="IR (Régimen Sociedad)">IR (Régimen Sociedad)</option>
                            <option value="IR (Régimen NP)">IR (Régimen NP)</option>
                            <option value="IVA (Mensual)">IVA (Mensual)</option>
                            <option value="IVA (Semestral)">IVA (Semestral)</option>
                            <option value="ICE">ICE</option>
                            <option value="ISD (MENSUAL)">ISD (Mensual)</option>
                            <option value="IRBP">IRBP</option>
                            <option value="ISD (ANUAL)">ISD (Anual)</option>
                            <option value="RETENCIONES FUENTE">RETENCIONES FUENTE</option>
                            <option value="ANTICIPO UTILIDADES ACUMULADAS">ANTICIPO UTILIDADES ACUMULADAS</option>
                            <option value="ACTIVOS EN EL EXTERIOR">ACTIVOS EN EL EXTERIOR</option>
                            <option value="IRBP-ANEXO">IRBP-ANEXO</option>
                            <option value="ROTEF">ROTEF</option>
                            <option value="OPRE">OPRE</option>
                            <option value="ICT">ICT</option>
                            <option value="ADI">ADI</option>
                            <option value="DECLARACIÓN PATRIMONIAL/APP">DECLARACIÓN PATRIMONIAL/APP</option>
                            <option value="APS-REBEFICS">APS-REBEFICS</option>
                            <option value="RDEP">RDEP</option>
                            <option value="ATS">ATS</option>
                            <option value="PRECIOS VENTA ICE">PRECIOS VENTA ICE</option>                        
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
                                {usuariosGestores.map((u) => (
                                    <option key={u.id} value={u.id}>{u.nombre} {u.apellido}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} disabled={isSubmitting} className="flex-1 py-3 border border-gray-200 rounded-md text-gray-600 font-bold uppercase tracking-wider text-[0.80rem] hover:bg-gray-50 transition-colors cursor-pointer">
                            Cancelar
                        </button>
                        <button type="submit" disabled={isSubmitting} className={`flex-1 py-3 bg-blue-200 text-white rounded-md font-bold uppercase tracking-wider text-[0.80rem] transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-500 cursor-pointer'}`}>
                            {isSubmitting ? 'Guardando...' : 'Guardar Obligación'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalAñadirObligacion;