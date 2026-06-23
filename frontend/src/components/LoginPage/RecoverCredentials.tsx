/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ScrollReveal } from "../ScrollReveal";
import api
    from "../../api/axios";
export const RecoverCredentials = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await api.post('/auth/forgot-password', { email });

            navigate("/login/OTP", { state: { email } });
        } catch (err: any) {
            setError(err.response?.data?.message || "Error al enviar las instrucciones. Verifique el correo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollReveal className="bg-blue-200 text-blue-200 overflow-x-hidden min-h-screen flex flex-col relative">

            <header className="relative z-10 w-full py-6 px-5 sm:px-8 md:px-12 flex justify-between items-center reveal-element">
                <Link className="w-36 sm:w-44 md:w-35 h:6 transition-transform hover:scale-105 duration-300" to="/">
                    <img src="/images/LOGOTIPO.svg" alt="Logotipo" />
                </Link>
                <div className="hidden sm:flex items-center gap-2 text-white/70 text-[0.8rem] tracking-widest uppercase font-semibold border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                    Entorno Seguro
                </div>
            </header>

            <main className="relative z-10 grow flex items-center justify-center px-4 sm:px-6 py-12">
                <div className="w-full max-w-120 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden reveal-element delay-100 border border-white/10 relative">
                    <div className="h-1.5 w-full bg-linear-to-r from-orange-400 to-orange-600"></div>

                    <div className="p-8 sm:p-10 md:p-12">
                        <div className="text-center mb-10">
                            <span className="inline-block bg-orange-500/10 text-orange-500 border border-orange-500/20 px-3 py-1 rounded text-[0.70rem] font-bold tracking-widest uppercase mb-4">
                                Soporte de Acceso
                            </span>
                            <h1 className="text-blue-200 font-extrabold text-[1.8rem] sm:text-[2.2rem] tracking-tight leading-tight">
                                Recuperar Credenciales
                            </h1>
                            <p className="text-blue-200/60 font-light mt-3 text-[0.95rem] leading-relaxed">
                                Ingrese su correo electrónico institucional. Le enviaremos las instrucciones de seguridad para restablecer su contraseña.
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-3 bg-red-50 text-red-600 text-[0.85rem] rounded-lg border border-red-100 text-center font-medium">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-[0.80rem] font-bold text-blue-200 uppercase tracking-widest mb-2">
                                    Correo Institucional
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors duration-300">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                                        </svg>
                                    </div>
                                    <input
                                        id="email" type="email" required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 font-medium focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-300"
                                        placeholder="ejemplo@corporacion.com"
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <button type="submit" disabled={loading} className="cursor-pointer w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-lg shadow-orange-500/20 text-[0.95rem] font-bold tracking-[0.15em] uppercase text-white bg-orange-500 hover:bg-blue-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                                    {loading ? "Enviando..." : "Enviar Instrucciones"}
                                </button>
                            </div>

                            <div className="text-center pt-4">
                                <Link to="/loginPage" className="inline-flex items-center gap-2 text-[0.85rem] font-medium text-gray-500 hover:text-orange-500 transition-colors duration-300 group">
                                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
                                    </svg>
                                    Volver al Inicio de Sesión
                                </Link>
                            </div>
                        </form>
                    </div>

                    <div className="bg-gray-50 px-8 py-5 border-t border-gray-100 text-center">
                        <p className="text-[0.75rem] text-gray-500 font-light flex items-center justify-center gap-2 uppercase tracking-widest">
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                            </svg>
                            Soporte Técnico 24/7
                        </p>
                    </div>
                </div>
            </main>

            <footer className="relative z-10 w-full py-6 px-5 border-t border-white/10 reveal-element delay-200">
                <div className="max-w-350 mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[0.75rem] text-white/50 font-light">
                    <p>&copy; 2026 MHORIZON ECUADOR. Todos los derechos reservados.</p>
                </div>
            </footer>
        </ScrollReveal>
    );
};