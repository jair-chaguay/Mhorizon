import React, { useState } from 'react';
import api from '../../../../api/axios'; 

interface ModalAñadirObligacionProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    clienteId?: number;
}

const ModalAñadirObligacion: React.FC<ModalAñadirObligacionProps> = ({ isOpen, onClose, onSuccess, clienteId }) => {
    const [formData, setFormData] = useState({
        tipo_impuesto: 'Impuesto a la Renta',
        fecha_presentacion: '',
        fecha_vencimiento_exacta: '' 
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!clienteId) {
            alert("Error: No se ha seleccionado un cliente.");
            return;
        }

        setIsSubmitting(true);
        try {
            await api.post('/obligacion', {
                ...formData,
                cliente_id: clienteId
            });
            
            setFormData({ tipo_impuesto: 'Impuesto a la Renta', fecha_presentacion: '', fecha_vencimiento_exacta: '' });
            onSuccess(); 
            onClose();
        } catch (error) {
            console.error("Error al guardar la obligación:", error);
            alert("No se pudo guardar la obligación.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[130] flex justify-center items-center p-4 transition-opacity duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative transform transition-transform duration-300">
                <button onClick={onClose} type="button" className="absolute top-5 right-5 text-gray-400 hover:text-orange-500 focus:outline-none cursor-pointer">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                
                <div className="mb-5 border-b border-gray-100 pb-4">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.70rem] uppercase mb-1 block">Gestor Tributario</span>
                    <h2 className="text-[#151E28] font-extrabold text-[1.4rem] tracking-tight">Añadir Obligación</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[0.75rem] font-bold text-[#151E28] uppercase tracking-widest mb-1.5">Tipo de Obligación</label>
                        <select 
                            value={formData.tipo_impuesto}
                            onChange={(e) => setFormData({...formData, tipo_impuesto: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[#151E28] text-[0.90rem] outline-none focus:border-orange-500"
                        >
                            <option value="Impuesto a la Renta">Impuesto a la Renta</option>
                            <option value="IVA (Mensual)">IVA (Mensual)</option>
                            <option value="IVA (Semestral)">IVA (Semestral)</option>
                            <option value="ICE">ICE</option>
                            <option value="ISD">ISD</option>
                            <option value="Activos Mantenidos en el Exterior">Activos Mantenidos en el Exterior</option>
                            <option value="Anexo Transaccional (ATS)">Anexo Transaccional (ATS)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-[0.75rem] font-bold text-[#151E28] uppercase tracking-widest mb-1.5">Periodo (Detalle en Texto)</label>
                        <input 
                            type="text" 
                            placeholder="Ej. Abril 2026..." 
                            value={formData.fecha_presentacion}
                            onChange={(e) => setFormData({...formData, fecha_presentacion: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[#151E28] text-[0.90rem] outline-none focus:border-orange-500" 
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-[0.75rem] font-bold text-[#151E28] uppercase tracking-widest mb-1.5">Día Límite de Subida (Activa las Alertas)</label>
                        <input 
                            type="date" 
                            value={formData.fecha_vencimiento_exacta}
                            onChange={(e) => setFormData({...formData, fecha_vencimiento_exacta: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[#151E28] text-[0.90rem] outline-none focus:border-orange-500" 
                            required 
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} disabled={isSubmitting} className="flex-1 py-3 border border-gray-200 rounded-md text-gray-600 font-bold uppercase tracking-wider text-[0.80rem] hover:bg-gray-50 transition-colors cursor-pointer">
                            Cancelar
                        </button>
                        <button type="submit" disabled={isSubmitting} className={`flex-1 py-3 bg-[#151E28] text-white rounded-md font-bold uppercase tracking-wider text-[0.80rem] transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-500 cursor-pointer'}`}>
                            {isSubmitting ? 'Guardando...' : 'Guardar Obligación'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalAñadirObligacion;