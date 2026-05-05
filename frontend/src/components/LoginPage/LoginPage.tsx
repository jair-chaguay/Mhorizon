import { ScrollReveal } from '../ScrollReveal'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../../api/axios';

export const LoginPage = () => {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");
        try {
            const { data } = await api.post("/login", { correo, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.usuario));
            const user = data.usuario;
            if(user.rol_id==2 || user.cliente_id !== null){
                navigate("/intranetClientes");
            }else{
                navigate("/intranet")
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const msg =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                "Error al Iniciar Sesión"
            setErrorMsg(msg);
        } finally {
            setLoading(false)
        }
    }



    return (
        <ScrollReveal as={"section"} className="bg-blue-200 text-blue-200 overflow-x-hidden min-h-screen flex flex-col relative">

            <div className="absolute inset-0 bg-[url('/images/Recurso38.avif')] bg-cover bg-center opacity-40 mix-blend-luminosity z-0"></div>
            <div className="absolute inset-0 bg-linear-to-b from-blue-200/95 via-blue-200/90 to-blue-200 z-0"></div>

            <header className="relative z-10 w-full py-6 px-5 sm:px-8 md:px-12 flex justify-between items-center reveal-element">
                <Link to={"/"} className="inline-block transition-transform hover:scale-105 duration-300">
                    <img src="images/MHORIZONBOCETO.png" alt="MHorizon Logo" className="w-36 sm:w-44" onError={(e) => { e.currentTarget.src = '...'; }} />
                </Link>

                <div className="hidden sm:flex items-center gap-2 text-white/70 text-[0.8rem] tracking-widest uppercase font-semibold border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    Entorno Seguro
                </div>
            </header>

            <main className="relative z-10 grow flex items-center justify-center px-4 sm:px-6 py-12">

                <div className="w-full max-w-120 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden reveal-element delay-100 border border-white/10 relative">

                    <div className="h-1.5 w-full bg-linear-to-r from-orange-400 to-orange-600"></div>

                    <div className="p-8 sm:p-10 md:p-12">

                        <div className="text-center mb-10">
                            <span className="inline-block bg-orange-500/10 text-orange-500 border border-orange-500/20 px-3 py-1 rounded text-[0.70rem] font-bold tracking-widest uppercase mb-4">
                                Acceso Restringido
                            </span>
                            <h1 className="text-blue-200 font-extrabold text-[1.8rem] sm:text-[2.2rem] tracking-tight leading-tight">
                                Portal Clientes
                            </h1>
                            <p className="text-blue-200/60 font-light mt-3 text-[0.95rem] leading-relaxed">
                                Ingrese sus credenciales para acceder a su panel de gestión corporativa y reportes confidenciales.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <label htmlFor="email" className="block text-[0.80rem] font-bold text-blue-200 uppercase tracking-widest mb-2">
                                    Correo Institucional
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors duration-300">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
                                    </div>
                                    <input
                                        id="email"
                                        onChange={(e) => setCorreo(e.target.value)}
                                        name="email"
                                        type="email"
                                        required autoComplete="email"
                                        className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 font-medium focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-300" placeholder="ejemplo@corporacion.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-[0.80rem] font-bold text-blue-200 uppercase tracking-widest mb-2">
                                    Contraseña
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors duration-300">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg text-blue-200] font-medium focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-300" placeholder="••••••••••••"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-2 pt-1">
                                <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 custom-checkbox border-gray-300 rounded" />
                                    <label htmlFor="remember-me" className="ml-2 block text-[0.85rem] text-blue-200/70 font-light cursor-pointer select-none">
                                        Recordar sesión
                                    </label>
                                </div>

                                <div className="text-[0.85rem]">
                                    <Link to={"/login/recover-credentials"} className="font-medium text-gray-500 hover:text-orange-500 transition-colors duration-300">
                                        ¿Olvidó su clave?
                                    </Link>
                                </div>
                            </div>
                            {
                                errorMsg && (
                                    <p className='text-red-500 text-sm mt-4 text-center'>
                                        {errorMsg}
                                    </p>
                                )
                            }
                            <div className="pt-6 border-t border-gray-100">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="cursor-pointer w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-lg shadow-orange-500/20 text-[0.95rem] font-bold tracking-[0.15em] uppercase text-white bg-orange-500 hover:bg-blue-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                    {loading ? "Ingresando..." : "Iniciar Sesión"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="bg-gray-50 px-8 py-5 border-t border-gray-100 text-center">
                        <p className="text-[0.75rem] text-gray-500 font-light flex items-center justify-center gap-2 uppercase tracking-widest">
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                            Auditoría & Consultoría
                        </p>
                    </div>
                </div>

            </main>

            <footer className="relative z-10 w-full py-6 px-5 border-t border-white/10 reveal-element delay-200">
                <div className="max-w-350 mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[0.75rem] text-white/50 font-light">
                    <p>&copy; 2026 MHORIZON ECUADOR. Todos los derechos reservados.</p>
                    <div className="flex gap-6 uppercase tracking-wider">
                        <a href="#" className="hover:text-orange-500 transition-colors duration-300">Privacidad</a>
                        <a href="#" className="hover:text-orange-500 transition-colors duration-300">Términos Legales</a>
                        <a href="#" className="hover:text-orange-500 transition-colors duration-300">Soporte Corporativo</a>
                    </div>
                </div>
            </footer>
        </ScrollReveal>
    )
}
