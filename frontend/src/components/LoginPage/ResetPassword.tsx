/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import api from '../../api/axios';
const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;
    const token = location.state?.token;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!email || !token) return <Navigate to="/login/recover-credentials" replace />;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if(password.length < 8) return setError("La contraseña debe tener al menos 8 caracteres.");
        if(password !== confirmPassword) return setError("Las contraseñas no coinciden.");

        setLoading(true);
        try {
            await api.post('/auth/reset-password', {
                email,
                token,
                password,
                password_confirmation: confirmPassword
            });
            // Si todo sale bien, vamos al mensaje de éxito
            navigate("/login/success");
        } catch (err: any) {
            setError(err.response?.data?.message || "Error al restablecer la contraseña. Intente nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-blue-200 text-blue-200 overflow-x-hidden min-h-screen flex flex-col relative">
            <div className="absolute inset-0 bg-[url('/images/Recurso38.avif')] bg-cover bg-center opacity-40 mix-blend-luminosity z-0"></div>
            <div className="absolute inset-0 bg-linear-to-b from-blue-200/95 via-blue-200/90 to-blue-200 z-0"></div>

            <header className="relative z-10 w-full py-6 px-5 sm:px-8 md:px-12 flex justify-between items-center reveal-element">
                <a href="/" className="inline-block transition-transform hover:scale-105 duration-300">
                    <img src="images/MHORIZONBOCETO.png" alt="MHorizon Logo" className="w-36 sm:w-44" 
                    onError={(e) => {
                            e.currentTarget.src = 'https://placehold.co/200x50/151E28/ffffff?text=MHORIZON';
                        }}
                    />
                </a>
            </header>

            <ScrollReveal as={"main"} className="relative z-10 grow flex items-center justify-center px-4 sm:px-6 py-12">
                <div className="w-full max-w-120 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden reveal-element delay-100 border border-white/10 relative">
                    <div className="h-1.5 w-full bg-linear-to-r from-orange-400 to-orange-600"></div>

                    <div className="p-8 sm:p-10 md:p-12">
                        <div className="text-center mb-8">
                            <span className="inline-block bg-orange-500/10 text-orange-500 border border-orange-500/20 px-3 py-1 rounded text-[0.70rem] font-bold tracking-widest uppercase mb-4">
                                Paso 3 de 3
                            </span>
                            <h1 className="text-blue-200 font-extrabold text-[1.8rem] sm:text-[2.2rem] tracking-tight leading-tight">
                                Nueva Contraseña
                            </h1>
                        </div>

                        {error && (
                            <div className="mb-6 p-3 bg-red-50 text-red-600 text-[0.85rem] rounded-lg border border-red-100 text-center font-medium">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-[0.80rem] font-bold text-blue-200 uppercase tracking-widest mb-2">Nueva Contraseña</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg></div>
                                    <input type={showNewPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 font-medium focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-300" placeholder="••••••••••••" />
                                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-orange-500 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{showNewPassword ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path> : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></>}</svg>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[0.80rem] font-bold text-blue-200 uppercase tracking-widest mb-2">Confirmar Contraseña</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg></div>
                                    <input type={showConfirmPassword ? "text" : "password"} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="block w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 font-medium focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-300" placeholder="••••••••••••" />
                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-orange-500 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{showConfirmPassword ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path> : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></>}</svg>
                                    </button>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button type="submit" disabled={loading} className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-lg shadow-orange-500/20 text-[0.95rem] font-bold tracking-[0.15em] uppercase text-white bg-orange-500 hover:bg-blue-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50">
                                    {loading ? "Actualizando..." : "Actualizar Contraseña"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="bg-gray-50 px-8 py-5 border-t border-gray-100 text-center">
                        <Link to="/loginPage" className="text-[0.75rem] text-gray-500 hover:text-orange-500 font-medium flex items-center justify-center gap-2 uppercase tracking-widest transition-colors duration-300">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            Cancelar y Volver
                        </Link>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
};

export default ResetPassword;