import { useState } from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleImageError = (e: any) => {
        e.target.src = 'https://via.placeholder.com/200x50?text=MHORIZON&bg=151E28&text_color=ffffff';
    };

    return (
        <div className="bg-blue-200 text-blue-200 overflow-x-hidden min-h-screen flex flex-col relative">

            <div className="absolute inset-0 bg-[url('/images/Recurso38.avif')] bg-cover bg-center opacity-40 mix-blend-luminosity z-0"></div>
            <div className="absolute inset-0 bg-linear-to-b from-blue-200/95 via-blue-200/90 to-blue-200 z-0"></div>

            <header className="relative z-10 w-full py-6 px-5 sm:px-8 md:px-12 flex justify-between items-center reveal-element">
                <a href="/home" className="inline-block transition-transform hover:scale-105 duration-300">
                    <img
                        src="images/MHORIZONBOCETO.png"
                        alt="MHorizon Logo"
                        className="w-36 sm:w-44"
                        onError={handleImageError}
                    />
                </a>

                <div className="hidden sm:flex items-center gap-2 text-white/70 text-[0.8rem] tracking-widest uppercase font-semibold border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    Conexión Cifrada
                </div>
            </header>

            <ScrollReveal as={"main"} className="relative z-10 grow flex items-center justify-center px-4 sm:px-6 py-12">
                <div className="w-full max-w-120 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden reveal-element delay-100 border border-white/10 relative">

                    <div className="h-1.5 w-full bg-linear-to-r from-orange-400 to-orange-600"></div>

                    <div className="p-8 sm:p-10 md:p-12">
                        <div className="text-center mb-8">
                            <span className="inline-block bg-orange-500/10 text-orange-500 border border-orange-500/20 px-3 py-1 rounded text-[0.70rem] font-bold tracking-widest uppercase mb-4">
                                Actualización de Seguridad
                            </span>
                            <h1 className="text-blue-200 font-extrabold text-[1.8rem] sm:text-[2.2rem] tracking-tight leading-tight">
                                Nueva Contraseña
                            </h1>
                            <p className="text-blue-200/60 font-light mt-3 text-[0.95rem] leading-relaxed">
                                Cree sus nuevas credenciales corporativas asegurándose de cumplir con los requisitos mínimos del sistema.
                            </p>
                        </div>

                        <form action="#" method="POST" className="space-y-5">

                            <div>
                                <label htmlFor="new_password" className="block text-[0.80rem] font-bold text-blue-200 uppercase tracking-widest mb-2">
                                    Nueva Contraseña
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors duration-300">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                        </svg>
                                    </div>
                                    <input
                                        id="new_password"
                                        name="new_password"
                                        type={showNewPassword ? "text" : "password"}
                                        required
                                        className="block w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 font-medium focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-300"
                                        placeholder="••••••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-orange-500 focus:outline-none transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {showNewPassword ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                                            ) : (
                                                <>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                                </>
                                            )}
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirm_password" className="block text-[0.80rem] font-bold text-blue-200 uppercase tracking-widest mb-2">
                                    Confirmar Contraseña
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors duration-300">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                        </svg>
                                    </div>
                                    <input
                                        id="confirm_password"
                                        name="confirm_password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        className="block w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 font-medium focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-300"
                                        placeholder="••••••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-orange-500 focus:outline-none transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {showConfirmPassword ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                                            ) : (
                                                <>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                                </>
                                            )}
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                <p className="text-[0.75rem] font-bold text-blue-200 mb-2 uppercase tracking-wide">Requisitos del Sistema:</p>
                                <ul className="text-[0.75rem] text-gray-500 space-y-1">
                                    <li className="flex items-center gap-2"><svg className="w-3 h-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> Mínimo 8 caracteres</li>
                                    <li className="flex items-center gap-2"><svg className="w-3 h-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> Al menos una letra mayúscula</li>
                                    <li className="flex items-center gap-2"><svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> Al menos un número o símbolo</li>
                                </ul>
                            </div>

                            <div className="pt-2">
                                <Link to={"/login/success"} type="submit" className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-lg shadow-orange-500/20 text-[0.95rem] font-bold tracking-[0.15em] uppercase text-white bg-orange-500 hover:bg-blue-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                    Actualizar Contraseña
                                </Link>
                            </div>
                        </form>
                    </div>

                    <div className="bg-gray-50 px-8 py-5 border-t border-gray-100 text-center">
                        <Link to="/loginPage" className="text-[0.75rem] text-gray-500 hover:text-orange-500 font-medium flex items-center justify-center gap-2 uppercase tracking-widest transition-colors duration-300">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            Cancelar y Volver
                        </Link>
                    </div>
                </div>
            </ScrollReveal>

            <footer className="relative z-10 w-full py-6 px-5 border-t border-white/10 reveal-element delay-200">
                <div className="max-w-350 mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[0.75rem] text-white/50 font-light">
                    <p>&copy; 2026 MHORIZON ECUADOR. Todos los derechos reservados.</p>
                    <div className="flex gap-6 uppercase tracking-wider">
                        <a href="#" className="hover:text-orange-500 transition-colors duration-300">Privacidad</a>
                        <a href="#" className="hover:text-orange-500 transition-colors duration-300">Términos Legales</a>
                        <a href="#" className="hover:text-orange-500 transition-colors duration-300">Contactar Soporte</a>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default ResetPassword;