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
}

const ModalEditarObligacion: React.FC<ModalEditarObligacionProps> = ({ isOpen, onClose, onSuccess, obligacionId, currentUserId, tipoImpuesto }) => {
    const [usuarioId, setUsuarioId] = useState<string>('');
    const [usuariosGestores, setUsuariosGestores] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            setUsuarioId(currentUserId ? currentUserId.toString() : '');
        }
    }, [isOpen, currentUserId]);

    if (!isOpen || !obligacionId) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!usuarioId) {
            alert("Error: Debes asignar un encargado.");
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-130 flex justify-center items-center p-4 transition-opacity duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative transform transition-transform duration-300">
                <button onClick={onClose} type="button" className="absolute top-5 right-5 text-gray-400 hover:text-orange-500 focus:outline-none cursor-pointer">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                
                <div className="mb-5 border-b border-gray-100 pb-4">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.70rem] uppercase mb-1 block">Editar Asignación</span>
                    <h2 className="text-blue-200 font-extrabold text-[1.4rem] tracking-tight">{tipoImpuesto}</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Nuevo Encargado (Notificar a)</label>
                        <select 
                            value={usuarioId}
                            onChange={(e) => setUsuarioId(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500"
                            required
                        >
                            <option value="">Seleccionar Gestor...</option>
                            {usuariosGestores.map((u) => (
                                <option key={u.id} value={u.id}>{u.nombre} {u.apellido}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} disabled={isSubmitting} className="flex-1 py-3 border border-gray-200 rounded-md text-gray-600 font-bold uppercase tracking-wider text-[0.80rem] hover:bg-gray-50 transition-colors cursor-pointer">
                            Cancelar
                        </button>
                        <button type="submit" disabled={isSubmitting} className={`flex-1 py-3 bg-orange-50 text-orange-600 border border-orange-200 rounded-md font-bold uppercase tracking-wider text-[0.80rem] transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-500 hover:text-white cursor-pointer'}`}>
                            {isSubmitting ? 'Actualizando...' : 'Actualizar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalEditarObligacion;