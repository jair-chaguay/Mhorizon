/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef, type ChangeEvent, type KeyboardEvent, type ClipboardEvent } from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import api from '../../api/axios';
const OTPVerification: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Recuperar correo de la ruta anterior. Si no existe, regresarlo al paso 1.
    const email = location.state?.email;

    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [timeLeft, setTimeLeft] = useState<number>(59);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    // Protección de ruta
    if (!email) return <Navigate to="/login/recover-credentials" replace />;

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        if (!value) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (index < 5) inputRefs.current[index + 1]?.focus();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            if (!otp[index] && index > 0) {
                const newOtp = [...otp];
                newOtp[index - 1] = "";
                setOtp(newOtp);
                inputRefs.current[index - 1]?.focus();
            } else {
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            }
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const data = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);
        const newOtp = [...otp];
        data.split("").forEach((char, idx) => { newOtp[idx] = char; });
        setOtp(newOtp);
        const nextIndex = data.length < 6 ? data.length : 5;
        inputRefs.current[nextIndex]?.focus();
    };

    const handleResend = async () => {
        setTimeLeft(59);
        setError("");
        try {
            await api.post('/auth/forgot-password', { email });
        } catch (err: any) {
            console.error(err)
            setError("Error al reenviar el código.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = otp.join("");
        if (code.length < 6) return;

        setLoading(true);
        setError("");

        try {
            const response = await api.post('/auth/verify-otp', { email, code });
            navigate("/login/resetPassword", {
                state: { email, token: response.data.token }
            });
        } catch (err: any) {
            setError(err.response?.data?.message || "Código inválido o expirado.");
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
    };

    return (
        <div className="bg-blue-200 text-blue-200 overflow-x-hidden min-h-screen flex flex-col relative font-sans">
            <div className="absolute inset-0 bg-[url('/images/Recurso38.avif')] bg-cover bg-center opacity-40 mix-blend-luminosity z-0"></div>
            <div className="absolute inset-0 bg-linear-to-b from-blue-200/95 via-blue-200/90 to-blue-200 z-0"></div>

            <header className="relative z-10 w-full py-6 px-5 sm:px-8 md:px-12 flex justify-between items-center">
                <Link className="w-36 sm:w-44 md:w-35 h:6 transition-transform hover:scale-105 duration-300" to="/">
                    <svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2820.91 386.29"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1-2"><path d="M0,1.41H107.09l100,188.1h1.63l99-188.1H415.33V386.29H347.38V77h-1.09L229.41,301H181.57L66.32,77H65.23V386.29H0Z" fill="#fff" /><path d="M468.91,1.41h68.5V156.88H717.35V1.41h68.49V386.29H717.35V215.59H537.41v170.7h-68.5Z" fill="#fff" /><path d="M1270.19,0h133.74a241,241,0,0,1,52.73,5.71,135.73,135.73,0,0,1,45.39,18.75,97.85,97.85,0,0,1,31.8,34.25q12,21.21,12,51.65,0,41.87-23.65,68.22t-64.41,35.61l102.74,170.7H1477.9L1388.7,221.8h-50V384.89h-68.5Zm124.49,165.81a199,199,0,0,0,29.36-2.18,84.46,84.46,0,0,0,26.37-8.15,51.42,51.42,0,0,0,19.29-17.13q7.62-11.13,7.62-28.54,0-15.75-7.07-25.82a53,53,0,0,0-17.94-16,75.15,75.15,0,0,0-24.74-8.15,174.5,174.5,0,0,0-26.91-2.17h-62V165.81Z" fill="#fff" /><path d="M1605.07,0h68.5V384.89h-68.5Z" fill="#fff" /><path d="M1721.77,323.13,1931.06,60H1725V.21h287.58v62l-210.38,262h213.64V385.1h-294.1Z" fill="#fff" /><path d="M2045.45,191.62q0-44,14.74-79.41t40.87-60.27q26.11-24.82,62.08-38.28T2241.51.21q42.94,0,79.15,13.45t62.6,38.28q26.38,24.84,41.13,60.27t14.74,79.41q0,42.94-14.74,78.38a180.65,180.65,0,0,1-41.13,61q-26.39,25.61-62.6,39.83t-79.15,14.23q-42.42,0-78.37-14.23A184.47,184.47,0,0,1,2101.06,331a182.66,182.66,0,0,1-40.87-61Q2045.45,234.57,2045.45,191.62Zm70.87,0q0,29.49,9.06,54.06a125.68,125.68,0,0,0,25.86,42.68,118.5,118.5,0,0,0,39.84,28.19q23,10.09,51,10.09t51.22-10.09a118,118,0,0,0,40.09-28.19,126,126,0,0,0,25.87-42.68q9-24.57,9-54.06a150.23,150.23,0,0,0-9-52.77,128.87,128.87,0,0,0-25.61-42.42A118.69,118.69,0,0,0,2293.76,68Q2270.48,57.65,2242,57.63T2190.56,68A119.34,119.34,0,0,0,2151,96.43a128.68,128.68,0,0,0-25.6,42.42A150,150,0,0,0,2116.32,191.62Z" fill="#fff" /><path d="M2481.69.19h90.78l178.86,288.12h1.08V.19h68.5V385.08h-87L2551.27,87.71h-1.08V385.08h-68.5Z" fill="#fff" /><path d="M911.37,138.64A128.65,128.65,0,0,1,937,96.22a119.23,119.23,0,0,1,39.58-28.45q23-10.35,51.47-10.35t51.74,10.35a118.55,118.55,0,0,1,39.83,28.45,129,129,0,0,1,25.61,42.42,144.48,144.48,0,0,1,8.29,36.77h71.13q-2.24-34.53-14.24-63.41-14.75-35.43-41.13-60.27t-62.59-38.28Q1070.44,0,1027.51,0q-42.43,0-78.38,13.45T887.05,51.73Q860.92,76.57,846.19,112q-12,28.88-14.24,63.41h71.12A143.65,143.65,0,0,1,911.37,138.64Z" fill="#D4681C" /><path d="M1145.2,245.47a126,126,0,0,1-25.87,42.68,118,118,0,0,1-40.09,28.19Q1056,326.44,1028,326.43t-51-10.09a118.5,118.5,0,0,1-39.84-28.19,125.84,125.84,0,0,1-25.86-42.68,146.28,146.28,0,0,1-8.16-36H832.13a194.5,194.5,0,0,0,14.06,60.3,182.43,182.43,0,0,0,40.86,61.05,184.47,184.47,0,0,0,62.08,39.83q36,14.22,78.38,14.23,42.93,0,79.15-14.23a186.75,186.75,0,0,0,62.59-39.83,180.76,180.76,0,0,0,41.13-61.05,194.42,194.42,0,0,0,14-60.3H1153.3A147.2,147.2,0,0,1,1145.2,245.47Z" fill="#fff" /></g></g></svg>
                </Link>
            </header>

            <ScrollReveal as={"main"} className="relative z-10 grow flex items-center justify-center px-4 sm:px-6 py-12">
                <div className="w-full max-w-120 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10 relative reveal-element">
                    <div className="h-1.5 w-full bg-linear-to-r from-orange-400 to-orange-600"></div>

                    <div className="p-8 sm:p-10 md:p-12">
                        <div className="text-center mb-8">
                            <span className="inline-block bg-orange-500/10 text-orange-500 border border-orange-500/20 px-3 py-1 rounded text-[0.70rem] font-bold tracking-widest uppercase mb-4">
                                Paso 2 de 3
                            </span>
                            <h1 className="text-blue-200 font-extrabold text-[1.8rem] sm:text-[2.2rem] tracking-tight leading-tight">
                                Verificación OTP
                            </h1>
                            <p className="text-blue-200/60 font-light mt-3 text-[0.95rem] leading-relaxed">
                                Hemos enviado un código de seguridad de 6 dígitos a <span className="font-semibold text-blue-200">{email}</span>. Ingréselo para continuar.
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-3 bg-red-50 text-red-600 text-[0.85rem] rounded-lg border border-red-100 text-center font-medium">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex justify-between items-center gap-2 sm:gap-3">
                                {otp.map((digit, index) => (
                                    <React.Fragment key={index}>
                                        <input
                                            ref={(el) => { inputRefs.current[index] = el; }}
                                            type="text" maxLength={1} value={digit}
                                            onChange={(e) => handleChange(e, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            onPaste={index === 0 ? handlePaste : undefined}
                                            className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold text-blue-200 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-300"
                                            inputMode="numeric" pattern="[0-9]*" autoFocus={index === 0}
                                        />
                                        {index === 2 && <span className="text-gray-300 font-bold">-</span>}
                                    </React.Fragment>
                                ))}
                            </div>

                            <div className="text-center pt-2">
                                <p className="text-[0.85rem] text-blue-200/60 font-light">
                                    ¿No recibió el código?{" "}
                                    <button type="button" disabled={timeLeft > 0} onClick={handleResend} className={`font-semibold transition-colors ml-1 ${timeLeft > 0 ? "text-gray-400 cursor-not-allowed" : "text-orange-500 hover:text-blue-200"}`}>
                                        {timeLeft > 0 ? `Reenviar en ${formatTime(timeLeft)}` : "Reenviar código ahora"}
                                    </button>
                                </p>
                            </div>

                            <div className="pt-2">
                                <button type='submit' disabled={loading || otp.join("").length < 6} className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-lg shadow-orange-500/20 text-[0.95rem] font-bold tracking-[0.15em] uppercase text-white bg-orange-500 hover:bg-blue-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50">
                                    {loading ? "Validando..." : "Validar Identidad"}
                                </button>
                            </div>

                            <div className="text-center pt-2">
                                <Link to={"/login/recover-credentials"} className="inline-flex items-center gap-2 text-[0.80rem] font-medium text-gray-400 hover:text-orange-500 transition-colors duration-300 group uppercase tracking-widest">
                                    <svg className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                                    Corregir Correo
                                </Link>
                            </div>
                        </form>
                    </div>

                    <div className="bg-gray-50 px-8 py-5 border-t border-gray-100 text-center">
                        <p className="text-[0.70rem] text-gray-500 font-light flex items-center justify-center gap-2 uppercase tracking-widest">
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                            Doble Factor de Autenticación
                        </p>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
};

export default OTPVerification;