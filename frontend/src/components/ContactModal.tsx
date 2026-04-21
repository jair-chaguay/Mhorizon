import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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

    const isWhatsAppReady = nombre.trim() !== "" && correo.trim() !== "";
    const phoneNumber = "593999836015";
    const whatsappMessage = encodeURIComponent(
        `Hola, soy ${nombre} ${apellido}.
        Correo: ${correo}
        ${mensaje ? `Mensaje: ${mensaje}` : ""}`
    );
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;


    const handleWhatsAppClick = () => {
        if (!isWhatsAppReady) {
            alert("Por favor completa al menos tu nombre y correo.");
            return;
        }

        window.open(whatsappLink, "_blank");
    };


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
                alert(response.data.message);
                resetForm();
                onClose();
            }
        } catch (error) {
            console.log("Error:", error)
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
            }, 50);
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

    return createPortal(
        <div className={`fixed inset-0 z-999 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300 ${isAnimating ? "opacity-100" : "opacity-0"}`}
            onClick={onClose}>
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

                    <div className="mt-4 flex justify-center sm:justify-start gap-12">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-orange-500 cursor-pointer text-white font-bold tracking-wider uppercase px-10 py-4 rounded-md hover:bg-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
                        >
                            {loading ? "ENVIANDO..." : "ENVIAR"}
                        </button>
                        <button
                            type="button"
                            onClick={handleWhatsAppClick}
                            disabled={!isWhatsAppReady}
                            className={`cursor-pointer font-bold tracking-wider uppercase px-6 py-4 rounded-md shadow-xl transition-all duration-300 transform w-full sm:w-auto flex items-center justify-center gap-3
    ${isWhatsAppReady
                                    ? "bg-green-500 hover:bg-green-600 hover:shadow-2xl hover:-translate-y-1 text-white"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"}
    `}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                className="w-6 h-6 fill-current"
                            >
                                <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 2.893.758 5.72 2.197 8.21L0 32l7.6-2.16a15.93 15.93 0 0 0 8.4 2.44c8.836 0 16-7.164 16-16S24.836.396 16 .396zm0 29.2c-2.5 0-4.94-.66-7.08-1.92l-.5-.3-4.52 1.28 1.2-4.4-.32-.52A13.8 13.8 0 0 1 2.4 16.4c0-7.5 6.1-13.6 13.6-13.6s13.6 6.1 13.6 13.6-6.1 13.6-13.6 13.6zm7.44-10.16c-.4-.2-2.36-1.16-2.72-1.28-.36-.14-.62-.2-.88.2s-1 1.28-1.22 1.54c-.22.26-.44.3-.82.1-.4-.2-1.66-.6-3.16-1.9-1.16-1.04-1.94-2.32-2.16-2.72-.22-.4-.02-.62.18-.82.18-.18.4-.44.6-.66.2-.22.26-.38.4-.64.14-.26.08-.48-.04-.68-.12-.2-.88-2.12-1.2-2.9-.32-.78-.64-.68-.88-.7h-.76c-.26 0-.68.1-1.04.48-.36.38-1.36 1.34-1.36 3.26 0 1.92 1.4 3.78 1.6 4.04.2.26 2.76 4.22 6.68 5.76.94.4 1.68.64 2.26.82.94.3 1.8.26 2.48.16.76-.12 2.36-.96 2.7-1.88.34-.92.34-1.7.24-1.88-.1-.18-.36-.28-.76-.48z" />
                            </svg>

                            WhatsApp
                        </button>
                    </div>
                </form>

                <p className="text-center sm:text-left text-gray-400 mt-6 font-medium text-[0.8rem] tracking-wider">
                    ✓ Responderemos su mensaje en la brevedad posible.
                </p>
            </div>
        </div>,
        document.body
    );
};