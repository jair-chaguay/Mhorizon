/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import api from '../../../../api/axios';

interface ModalCrearUsuarioProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    usuarioAEditar?: any; 
}

const ModalCrearUsuario: React.FC<ModalCrearUsuarioProps> = ({ isOpen, onClose, onSuccess, usuarioAEditar }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        correo_personal: '',
        password: '',
        cargo: '',
        activo: true,
        rol_id: 1
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (usuarioAEditar) {
                setFormData({
                    nombre: usuarioAEditar.nombre || '',
                    apellido: usuarioAEditar.apellido || '',
                    correo: usuarioAEditar.correo || '',
                    correo_personal: usuarioAEditar.correo_personal || '',
                    password: '', 
                    cargo: usuarioAEditar.cargo || '',
                    activo: usuarioAEditar.activo !== undefined ? usuarioAEditar.activo : true,
                    rol_id: usuarioAEditar.rol_id || 1
                });
            } else {
                setFormData({ nombre: '', apellido: '', correo: '', correo_personal: '', password: '', cargo: '', activo: true, rol_id:1 });
            }
        }
    }, [isOpen, usuarioAEditar]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const payload: any = {
                ...formData,
                rol_id: Number(formData.rol_id)
            };

            if (usuarioAEditar && !payload.password) {
                delete payload.password;
            }

            if (usuarioAEditar) {
                await api.put(`/usuario/${usuarioAEditar.id}`, payload);
            } else {
                await api.post('/usuario', payload);
            }
            
            onSuccess();
            onClose();
        } catch (error: any) {
            const msg = error.response?.data?.message || "No se pudo procesar la solicitud.";
            alert(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 z-[100] flex justify-center items-center p-4 transition-opacity duration-300">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 relative transform transition-transform duration-300">
                <button onClick={onClose} type="button" className="absolute top-5 right-5 text-slate-400 hover:text-brand-600 focus:outline-none cursor-pointer">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                
                <div className="mb-5 border-b border-slate-100 pb-4">
                    <span className="text-brand-600 font-medium text-xs mb-1 block">Control de Accesos</span>
                    <h2 className="text-slate-900 font-semibold text-lg tracking-tight">
                        {usuarioAEditar ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
                    </h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Nombre</label>
                            <input 
                                type="text" required
                                value={formData.nombre}
                                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20" 
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Apellido</label>
                            <input 
                                type="text" required
                                value={formData.apellido}
                                onChange={(e) => setFormData({...formData, apellido: e.target.value})}
                                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20" 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Correo Corporativo</label>
                            <input 
                                type="email" required
                                value={formData.correo}
                                onChange={(e) => setFormData({...formData, correo: e.target.value})}
                                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20" 
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Correo Personal <span className="text-slate-400 font-normal normal-case tracking-normal">(Opcional)</span></label>
                            <input 
                                type="email"
                                value={formData.correo_personal}
                                onChange={(e) => setFormData({...formData, correo_personal: e.target.value})}
                                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20" 
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                            Contraseña {usuarioAEditar && <span className="text-slate-400 font-normal normal-case tracking-normal">(Dejar en blanco para no cambiar)</span>}
                        </label>
                        <input 
                            type="password" 
                            required={!usuarioAEditar} // Obligatorio solo al crear
                            minLength={8}
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20" 
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Cargo / Título</label>
                            <input 
                                type="text"
                                placeholder="Ej: Gerente Financiero"
                                value={formData.cargo}
                                onChange={(e) => setFormData({...formData, cargo: e.target.value})}
                                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20" 
                            />
                        </div>

                        {usuarioAEditar && (
                            <div>
                                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Estado</label>
                                <select
                                    value={formData.activo ? 'true' : 'false'}
                                    onChange={(e) => setFormData({...formData, activo: e.target.value === 'true'})}
                                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                                >
                                    <option value="true">Activo</option>
                                    <option value="false">Inactivo</option>
                                </select>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Rol de Usuario</label>
                        <select 
                            value={formData.rol_id}
                            onChange={(e) => setFormData({...formData, rol_id: Number(e.target.value)})}
                            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                        >
                            <option value="1">Colaborador</option>
                            <option value="3">Creador</option>
                        </select>
                    </div>
                    

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} disabled={isSubmitting} className="flex-1 py-2.5 border border-slate-200 rounded-md text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer">
                            Cancelar
                        </button>
                        <button type="submit" disabled={isSubmitting} className={`flex-1 py-2.5 bg-brand-600 text-white rounded-md font-semibold text-sm transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-700 cursor-pointer'}`}>
                            {isSubmitting ? 'Guardando...' : (usuarioAEditar ? 'Guardar Cambios' : 'Crear Usuario')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalCrearUsuario;