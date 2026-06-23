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

            <header className="relative z-10 w-full py-6 px-5 sm:px-8 md:px-12 flex justify-between items-center">
                <Link className="w-36 sm:w-44 md:w-35 h:6 transition-transform hover:scale-105 duration-300" to="/">
                    <img src="/images/LOGOTIPO.svg" alt="Logotipo" />
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