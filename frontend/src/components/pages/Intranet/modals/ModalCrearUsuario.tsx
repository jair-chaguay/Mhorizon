/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import api from '../../../../api/axios';

interface ModalCrearUsuarioProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const ModalCrearUsuario: React.FC<ModalCrearUsuarioProps> = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        password: '',
        cargo: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await api.post('/usuario', {
                ...formData,
                rol_id: 1, // Rol de Cliente forzado
                activo: true
            });
            
            setFormData({ nombre: '', apellido: '', correo: '', password: '', cargo: '' });
            onSuccess();
            onClose();
        } catch (error: any) {
            const msg = error.response?.data?.message || "No se pudo crear el usuario.";
            alert(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex justify-center items-center p-4 transition-opacity duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative transform transition-transform duration-300">
                <button onClick={onClose} type="button" className="absolute top-5 right-5 text-gray-400 hover:text-orange-500 focus:outline-none cursor-pointer">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                
                <div className="mb-5 border-b border-gray-100 pb-4">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.70rem] uppercase mb-1 block">Control de Accesos</span>
                    <h2 className="text-blue-200 font-extrabold text-[1.4rem] tracking-tight">Crear Nuevo Usuario</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Nombre</label>
                            <input 
                                type="text" required
                                value={formData.nombre}
                                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Apellido</label>
                            <input 
                                type="text" required
                                value={formData.apellido}
                                onChange={(e) => setFormData({...formData, apellido: e.target.value})}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500" 
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Correo Electrónico</label>
                        <input 
                            type="email" required
                            value={formData.correo}
                            onChange={(e) => setFormData({...formData, correo: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500" 
                        />
                    </div>

                    <div>
                        <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Contraseña</label>
                        <input 
                            type="password" required minLength={8}
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500" 
                        />
                    </div>

                    <div>
                        <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Cargo / Título</label>
                        <input 
                            type="text"
                            placeholder="Ej: Gerente Financiero"
                            value={formData.cargo}
                            onChange={(e) => setFormData({...formData, cargo: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500" 
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} disabled={isSubmitting} className="flex-1 py-3 border border-gray-200 rounded-md text-gray-600 font-bold uppercase tracking-wider text-[0.80rem] hover:bg-gray-50 transition-colors cursor-pointer">
                            Cancelar
                        </button>
                        <button type="submit" disabled={isSubmitting} className={`flex-1 py-3 bg-blue-200 text-white rounded-md font-bold uppercase tracking-wider text-[0.80rem] transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-500 cursor-pointer'}`}>
                            {isSubmitting ? 'Guardando...' : 'Crear Usuario'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalCrearUsuario;