/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import api from '../../../../api/axios'; 

interface ModalEditarObligacionProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    obligacionId: number | null;
    currentUserId?: number | string;
    tipoImpuesto?: string;
    gestoresCliente?: Array<{id: number, nombre: string, apellido: string}>;
}



const ModalEditarObligacion: React.FC<ModalEditarObligacionProps> = ({ 
    isOpen, 
    onClose, 
    onSuccess, 
    obligacionId, 
    currentUserId, 
    tipoImpuesto,
    gestoresCliente = [] // Inicializamos por seguridad
}) => {
    const [usuarioId, setUsuarioId] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setUsuarioId(currentUserId ? currentUserId.toString() : '');
        }
    }, [isOpen, currentUserId]);

    if (!isOpen || !obligacionId) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!usuarioId) {
            alert("Error: Debes asignar un encargado de la lista de gestores.");
            return;
        }

        setIsSubmitting(true);
        try {
            await api.put(`/obligacion/${obligacionId}`, {
                usuario_id: Number(usuarioId)
            });
            
            onSuccess(); 
            onClose();
        } catch (error: any) {
            console.error("Error al actualizar la obligación:", error);
            alert(error.response?.data?.message || "No se pudo actualizar la obligación.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 z-130 flex justify-center items-center p-4 transition-opacity duration-300">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative transform transition-transform duration-300">
                <button onClick={onClose} type="button" className="absolute top-5 right-5 text-slate-400 hover:text-brand-600 focus:outline-none cursor-pointer">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                
                <div className="mb-5 border-b border-slate-100 pb-4">
                    <span className="text-brand-600 font-medium text-xs mb-1 block">Editar Asignación</span>
                    <h2 className="text-slate-900 font-semibold text-lg tracking-tight">{tipoImpuesto}</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Nuevo Encargado (Notificar a)</label>
                        <select 
                            value={usuarioId}
                            onChange={(e) => setUsuarioId(e.target.value)}
                            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                            required
                        >
                            <option value="">Seleccionar Gestor...</option>
                            {gestoresCliente.map((u) => (
                                <option key={u.id} value={u.id}>{u.nombre} {u.apellido}</option>
                            ))}
                        </select>
                    </div>

                    {gestoresCliente.length === 0 && (
                        <p className="text-red-500 text-xs text-center font-medium mt-2">
                            Este cliente no tiene gestores. Asigna uno antes de cambiar el encargado.
                        </p>
                    )}

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} disabled={isSubmitting} className="flex-1 py-2.5 border border-slate-200 rounded-md text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer">
                            Cancelar
                        </button>
                        <button type="submit" disabled={isSubmitting || gestoresCliente.length === 0} className={`flex-1 py-2.5 bg-brand-50 text-brand-700 border border-brand-200 rounded-md font-semibold text-sm transition-colors ${isSubmitting || gestoresCliente.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-600 hover:text-white cursor-pointer'}`}>
                            {isSubmitting ? 'Actualizando...' : 'Actualizar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalEditarObligacion;