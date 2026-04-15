/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { ScrollReveal } from '../../ScrollReveal';
import api from '../../../api/axios';

const AjustesCliente: React.FC = () => {
    // Estados de información del usuario
    const [userId, setUserId] = useState<number | null>(null);
    const [userData, setUserData] = useState({ correo: '' });
    const [razonSocial, setRazonSocial] = useState('Cargando...');
    const [identificacion, setIdentificacion] = useState('');
    const [tipoPersona, setTipoPersona] = useState('');

    // Estados para el cambio de contraseña
    const [passwords, setPasswords] = useState({
        actual: '',
        nueva: '',
        confirmar: ''
    });

    // Estados para la visibilidad de las contraseña
    const [showPassword, setShowPassword] = useState({
        actual: false,
        nueva: false,
        confirmar: false
    });

    // Estados para feedback visual (carga y mensajes)
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' }); // tipo: 'error' | 'exito'

    useEffect(() => {
        const fetchInformacionUsuario = async () => {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                setUserId(user.id); 
                setUserData({
                    correo: user.correo || ''
                });

                if (user.cliente_id) {
                    try {
                        const res = await api.get(`/cliente/${user.cliente_id}`);
                        if (res.data && res.data.cliente) {
                            setRazonSocial(res.data.cliente.razon_social_nombres);
                            setIdentificacion(res.data.cliente.identificacion);
                            setTipoPersona(res.data.cliente.tipo_persona);
                        }
                    } catch (error) {
                        console.error("Error al obtener datos", error);
                        setRazonSocial('Datos no encontrados');
                        setIdentificacion('Datos no encontrados');
                        setTipoPersona('Datos no encontrados');
                    }
                }
            }
        }
        fetchInformacionUsuario();
    }, []);

    // Manejador del formulario de contraseñas
    const handleActualizarPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setMensaje({ texto: '', tipo: '' });

        // Validaciones en el frontend
        if (passwords.nueva.length < 8) {
            setMensaje({ texto: 'La nueva contraseña debe tener al menos 8 caracteres.', tipo: 'error' });
            return;
        }
        if (passwords.nueva !== passwords.confirmar) {
            setMensaje({ texto: 'Las contraseñas nuevas no coinciden.', tipo: 'error' });
            return;
        }
        if (!userId) {
            setMensaje({ texto: 'Error de sesión. Por favor inicie sesión nuevamente.', tipo: 'error' });
            return;
        }

        try {
            setLoading(true);
            const response = await api.put(`/usuario/${userId}`, {
                password: passwords.nueva
            });

            if (response.status === 200) {
                setMensaje({ texto: 'Contraseña actualizada correctamente.', tipo: 'exito' });
                setPasswords({ actual: '', nueva: '', confirmar: '' });
            }
        } catch (error) {
            console.error("Error al actualizar contraseña:", error);
            setMensaje({ texto: 'Ocurrió un error al actualizar la contraseña.', tipo: 'error' });
        } finally {
            setLoading(false);
        }
    };

    // Función auxiliar para actualizar los inputs de contraseña
    const handlePasswordChange = (field: keyof typeof passwords, value: string) => {
        setPasswords(prev => ({ ...prev, [field]: value }));
    };

    // Función auxiliar para el "ojito"
    const toggleShowPassword = (field: keyof typeof showPassword) => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
    };

    // SVG para los ojitos
    const EyeIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
    );
    const EyeSlashIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
    );

    return (
        <ScrollReveal>
            <div className="max-w-350 mx-auto space-y-6 reveal-element">
                <h1 className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-blue-200 tracking-tight leading-tight mb-6">
                    Ajustes de Cuenta
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-blue-200 font-bold text-lg mb-4 flex items-center gap-2">
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                Perfil Corporativo
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[0.7rem] text-gray-400 font-bold uppercase tracking-widest">Razón Social</p>
                                    <p className="text-blue-200 font-medium text-sm" title={razonSocial}>{razonSocial}</p>
                                </div>
                                <div>
                                    <p className="text-[0.7rem] text-gray-400 font-bold uppercase tracking-widest">Correo</p>
                                    <p className="text-blue-200 font-medium text-sm">{userData.correo}</p>
                                </div>
                                <div>
                                    <p className="text-[0.7rem] text-gray-400 font-bold uppercase tracking-widest">RUC</p>
                                    <p className="text-blue-200 font-medium text-sm" title={identificacion}>{identificacion}</p>
                                </div>
                                <div>
                                    <p className="text-[0.7rem] text-gray-400 font-bold uppercase tracking-widest">Tipo Contribuidor</p>
                                    <p className="text-blue-200 font-medium text-sm" title={tipoPersona}>{tipoPersona}</p>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <p className="text-xs text-gray-500 italic">Para modificar la información corporativa o de facturación, comuníquese con su Gerente de Cuenta en MHorizon.</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
                            <h2 className="text-blue-200 font-bold text-lg mb-4 flex items-center gap-2">
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Seguridad de la Cuenta
                            </h2>
                            
                            {mensaje.texto && (
                                <div className={`p-3 rounded-lg text-sm mb-4 font-medium ${mensaje.tipo === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                                    {mensaje.texto}
                                </div>
                            )}

                            <form className="space-y-4 max-w-lg" onSubmit={handleActualizarPassword}>
                                <div>
                                    <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Contraseña Actual</label>
                                    <div className="relative">
                                        <input 
                                            type={showPassword.actual ? "text" : "password"} 
                                            placeholder="••••••••" 
                                            value={passwords.actual}
                                            onChange={(e) => handlePasswordChange('actual', e.target.value)}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500 transition-colors pr-10" 
                                        />
                                        <button 
                                            type="button" 
                                            onClick={() => toggleShowPassword('actual')}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                        >
                                            {showPassword.actual ? <EyeSlashIcon /> : <EyeIcon />}
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Nueva Contraseña</label>
                                        <div className="relative">
                                            <input 
                                                type={showPassword.nueva ? "text" : "password"} 
                                                placeholder="••••••••" 
                                                value={passwords.nueva}
                                                onChange={(e) => handlePasswordChange('nueva', e.target.value)}
                                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500 transition-colors pr-10" 
                                                required
                                            />
                                            <button 
                                                type="button" 
                                                onClick={() => toggleShowPassword('nueva')}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                            >
                                                {showPassword.nueva ? <EyeSlashIcon /> : <EyeIcon />}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Confirmar Contraseña</label>
                                        <div className="relative">
                                            <input 
                                                type={showPassword.confirmar ? "text" : "password"} 
                                                placeholder="••••••••" 
                                                value={passwords.confirmar}
                                                onChange={(e) => handlePasswordChange('confirmar', e.target.value)}
                                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500 transition-colors pr-10" 
                                                required
                                            />
                                            <button 
                                                type="button" 
                                                onClick={() => toggleShowPassword('confirmar')}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                            >
                                                {showPassword.confirmar ? <EyeSlashIcon /> : <EyeIcon />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        className="bg-blue-200 text-white text-[0.8rem] font-bold uppercase tracking-widest px-6 py-2.5 rounded-lg shadow hover:bg-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Actualizando...
                                            </>
                                        ) : (
                                            "Actualizar Contraseña"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollReveal>
    );
};

export default AjustesCliente;