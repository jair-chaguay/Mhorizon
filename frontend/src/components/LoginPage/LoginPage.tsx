import { ScrollReveal } from '../ScrollReveal'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../../api/axios';
import { SupportModal } from '../SupportModal';

export const LoginPage = () => {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [isSupportOpen, setIsSupportOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");
        try {
            const { data } = await api.post("/login", { correo, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.usuario));
            const user = data.usuario;
            if (user.rol_id == 2 || user.cliente_id !== null) {
                navigate("/intranetClientes");
            } else {
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



            <header className="relative z-10 w-full py-6 px-5 sm:px-8 md:px-12 flex justify-between items-center reveal-element">
                <Link className="w-36 sm:w-44 md:w-35 h:6 transition-transform hover:scale-105 duration-300" to="/">
                    <svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2820.91 386.29"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1-2"><path d="M0,1.41H107.09l100,188.1h1.63l99-188.1H415.33V386.29H347.38V77h-1.09L229.41,301H181.57L66.32,77H65.23V386.29H0Z" fill="#fff" /><path d="M468.91,1.41h68.5V156.88H717.35V1.41h68.49V386.29H717.35V215.59H537.41v170.7h-68.5Z" fill="#fff" /><path d="M1270.19,0h133.74a241,241,0,0,1,52.73,5.71,135.73,135.73,0,0,1,45.39,18.75,97.85,97.85,0,0,1,31.8,34.25q12,21.21,12,51.65,0,41.87-23.65,68.22t-64.41,35.61l102.74,170.7H1477.9L1388.7,221.8h-50V384.89h-68.5Zm124.49,165.81a199,199,0,0,0,29.36-2.18,84.46,84.46,0,0,0,26.37-8.15,51.42,51.42,0,0,0,19.29-17.13q7.62-11.13,7.62-28.54,0-15.75-7.07-25.82a53,53,0,0,0-17.94-16,75.15,75.15,0,0,0-24.74-8.15,174.5,174.5,0,0,0-26.91-2.17h-62V165.81Z" fill="#fff" /><path d="M1605.07,0h68.5V384.89h-68.5Z" fill="#fff" /><path d="M1721.77,323.13,1931.06,60H1725V.21h287.58v62l-210.38,262h213.64V385.1h-294.1Z" fill="#fff" /><path d="M2045.45,191.62q0-44,14.74-79.41t40.87-60.27q26.11-24.82,62.08-38.28T2241.51.21q42.94,0,79.15,13.45t62.6,38.28q26.38,24.84,41.13,60.27t14.74,79.41q0,42.94-14.74,78.38a180.65,180.65,0,0,1-41.13,61q-26.39,25.61-62.6,39.83t-79.15,14.23q-42.42,0-78.37-14.23A184.47,184.47,0,0,1,2101.06,331a182.66,182.66,0,0,1-40.87-61Q2045.45,234.57,2045.45,191.62Zm70.87,0q0,29.49,9.06,54.06a125.68,125.68,0,0,0,25.86,42.68,118.5,118.5,0,0,0,39.84,28.19q23,10.09,51,10.09t51.22-10.09a118,118,0,0,0,40.09-28.19,126,126,0,0,0,25.87-42.68q9-24.57,9-54.06a150.23,150.23,0,0,0-9-52.77,128.87,128.87,0,0,0-25.61-42.42A118.69,118.69,0,0,0,2293.76,68Q2270.48,57.65,2242,57.63T2190.56,68A119.34,119.34,0,0,0,2151,96.43a128.68,128.68,0,0,0-25.6,42.42A150,150,0,0,0,2116.32,191.62Z" fill="#fff" /><path d="M2481.69.19h90.78l178.86,288.12h1.08V.19h68.5V385.08h-87L2551.27,87.71h-1.08V385.08h-68.5Z" fill="#fff" /><path d="M911.37,138.64A128.65,128.65,0,0,1,937,96.22a119.23,119.23,0,0,1,39.58-28.45q23-10.35,51.47-10.35t51.74,10.35a118.55,118.55,0,0,1,39.83,28.45,129,129,0,0,1,25.61,42.42,144.48,144.48,0,0,1,8.29,36.77h71.13q-2.24-34.53-14.24-63.41-14.75-35.43-41.13-60.27t-62.59-38.28Q1070.44,0,1027.51,0q-42.43,0-78.38,13.45T887.05,51.73Q860.92,76.57,846.19,112q-12,28.88-14.24,63.41h71.12A143.65,143.65,0,0,1,911.37,138.64Z" fill="#D4681C" /><path d="M1145.2,245.47a126,126,0,0,1-25.87,42.68,118,118,0,0,1-40.09,28.19Q1056,326.44,1028,326.43t-51-10.09a118.5,118.5,0,0,1-39.84-28.19,125.84,125.84,0,0,1-25.86-42.68,146.28,146.28,0,0,1-8.16-36H832.13a194.5,194.5,0,0,0,14.06,60.3,182.43,182.43,0,0,0,40.86,61.05,184.47,184.47,0,0,0,62.08,39.83q36,14.22,78.38,14.23,42.93,0,79.15-14.23a186.75,186.75,0,0,0,62.59-39.83,180.76,180.76,0,0,0,41.13-61.05,194.42,194.42,0,0,0,14-60.3H1153.3A147.2,147.2,0,0,1,1145.2,245.47Z" fill="#fff" /></g></g></svg>
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
                        <Link to="/politicas-de-privacidad" target='_blank' className="hover:text-orange-500 transition-colors duration-300">Políticas de Privacidad</Link>
                        <Link to="/terminos-de-uso" target='_blank' className="hover:text-orange-500 transition-colors duration-300">Términos de uso</Link>
                        <button
                            onClick={() => setIsSupportOpen(true)}
                            className="hover:text-orange-500 upppercase transition-colors duration-300 text-left bg-transparent border-none p-0 cursor-pointer font-inherit text-inherit"
                        >
                            SOPORTE CORPORATIVO
                        </button>
                        <SupportModal
                            isOpen={isSupportOpen}
                            onClose={() => setIsSupportOpen(false)}
                        />
                    </div>
                </div>
            </footer>
        </ScrollReveal>
    )
}
