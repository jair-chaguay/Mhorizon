import { useEffect, useState } from "react";
import api from "../api/axios";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}



export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const datosContacto = {
            nombre,
            apellido,
            correo,
            mensaje
        };

        try {
            const response = await api.post('/contacto', datosContacto);
            if (response.status === 201) {
                alert(response.data.message); // "Tu mensaje ha sido enviado..."
                resetForm();
                onClose();
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }

    }

    const resetForm = () => {
        setNombre("");
        setApellido("");
        setCorreo("");
        setMensaje("");
    }

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            setTimeout(() => {
                setIsAnimating(true);
                document.body.style.overflow = "hidden";
            }, 10);
        } else {
            setIsAnimating(false);
            setTimeout(() => {
                setIsMounted(false);
                document.body.style.overflow = "";
            }, 300);
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isMounted) return null;

    return (
        <div
            className={`fixed inset-0 z-110 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300 ${isAnimating ? "opacity-100" : "opacity-0"
                }`}
            onClick={onClose}
        >
            <div
                className={`bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8 sm:p-10 relative transform transition-transform duration-300 ${isAnimating ? "scale-100" : "scale-95"
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-400 hover:text-orange-500 transition-colors focus:outline-none"
                    aria-label="Cerrar formulario"
                >
                    <svg className="w-7 h-7 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.8rem] uppercase mb-2 block text-center sm:text-left">
                    Formulario de Contacto
                </span>
                <h2 className="text-blue-200 font-extrabold text-[1.8rem] sm:text-[2.2rem] leading-tight text-center sm:text-left mb-8 tracking-tight">
                    AGENDAR CITA O CONSULTA
                </h2>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="modal_nombre" className="text-blue-200 font-semibold text-sm">Nombre</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                id="modal_nombre"
                                name="nombre"
                                required
                                placeholder="Ej: Juan"
                                className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="modal_apellido" className="text-blue-200 font-semibold text-sm">Apellido</label>
                            <input
                                type="text"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                id="modal_apellido"
                                name="apellido"
                                required
                                placeholder="Ej: Pérez"
                                className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="modal_correo" className="text-blue-200 font-semibold text-sm">Correo Electrónico</label>
                        <input
                            type="email"
                            id="modal_correo"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            name="correo"
                            required
                            placeholder="Ej: juan.perez@empresa.com"
                            className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="modal_mensaje" className="text-blue-200 font-semibold text-sm">Mensaje (Opcional)</label>
                        <textarea
                            id="modal_mensaje"
                            name="mensaje"
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                            rows={4}
                            placeholder="Cuéntanos brevemente sobre tu consulta o disponibilidad..."
                            className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all resize-none"
                        ></textarea>
                    </div>

                    <div className="mt-4 flex justify-center sm:justify-start">
                        <button
                            type="submit"
                            className="bg-orange-500 text-white font-bold tracking-wider uppercase px-10 py-4 rounded-md hover:bg-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
                        >
                            ENVIAR
                        </button>
                    </div>
                </form>

                <p className="text-center sm:text-left text-gray-400 mt-6 font-medium text-[0.8rem] tracking-wider">
                    ✓ Responderemos su mensaje en la brevedad posible.
                </p>
            </div>
        </div>
    );
};