import { useFormMembresia } from './useFormMembresia'; 

const CloseIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

interface ModalMembresiaProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ModalMembresia = ({ isOpen, onClose }: ModalMembresiaProps) => {
    const { isLoading, isSuccess, errorMessage, handleSubmit, resetForm } = useFormMembresia();

    if (!isOpen) return null;

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-[6px] transition-all duration-300 antialiased font-inter"
            onClick={handleClose} 
        >
            <div 
                className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 overflow-hidden animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={handleClose}
                    className="cursor-pointer absolute top-4 right-4 bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100 text-gray-500 hover:text-orange-500 hover:bg-orange-50 p-2.5 rounded-full transition-all duration-200 z-20"
                    aria-label="Cerrar modal"
                >
                    <CloseIcon />
                </button>

                <div className="overflow-y-auto w-full flex-1 custom-scrollbar">
                    <form onSubmit={handleSubmit} className="p-7 sm:p-10 lg:p-12 flex flex-col gap-6 relative">
                        
                        <div className="mb-4 border-b border-gray-100 pb-6 pr-10">
                            <p className="text-orange-500 font-bold text-[0.8rem] uppercase tracking-widest mb-2 font-jakarta">SOLICITUD DE RESPALDO</p>
                            <h2 className="text-[#151E28] text-3xl sm:text-4xl font-extrabold tracking-tighter leading-tight">Activar Membresía</h2>
                            <p className="text-gray-500 mt-2.5 text-[0.95rem] font-light max-w-xl leading-relaxed">Por favor complete el siguiente formulario. Un especialista tributario senior revisará su solicitud y se contactará para coordinar la activación de su servicio recurrente.</p>
                        </div>

                        {/* INPUTS (Simplificados aquí por espacio, deja los mismos que ya tenías) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-[#151E28] font-semibold text-sm">Nombre y apellido</label>
                                <input type="text" name="nombre" required placeholder="Ej: Juan Pérez" className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl p-3.5 text-[0.9rem] focus:border-orange-500/80 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-[#151E28] placeholder:text-gray-400"/>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[#151E28] font-semibold text-sm">Empresa</label>
                                <input type="text" name="empresa" required placeholder="Ej: CorpSoluciones S.A." className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl p-3.5 text-[0.9rem] focus:border-orange-500/80 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-[#151E28] placeholder:text-gray-400"/>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-[#151E28] font-semibold text-sm">Correo corporativo</label>
                                <input type="email" name="correo" required placeholder="Ej: juan.perez@empresa.com" className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl p-3.5 text-[0.9rem] focus:border-orange-500/80 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-[#151E28] placeholder:text-gray-400"/>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[#151E28] font-semibold text-sm">WhatsApp / teléfono</label>
                                <input type="tel" name="telefono" required placeholder="Ej: +593 99 123 4567" className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl p-3.5 text-[0.9rem] focus:border-orange-500/80 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-[#151E28] placeholder:text-gray-400"/>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-[#151E28] font-semibold text-sm">Ciudad</label>
                                <select required name="ciudad" defaultValue="" className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl p-3.5 text-[0.9rem] focus:border-orange-500/80 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-[#151E28] placeholder:text-gray-400">
                                    <option value="" disabled>Seleccione...</option>
                                    <option value="Guayaquil">Guayaquil</option><option value="Quito">Quito</option><option value="Cuenca">Cuenca</option>
                                    <option value="Manta">Manta / Portoviejo</option><option value="Machala">Machala</option><option value="Ambato">Ambato</option>
                                    <option value="Loja">Loja</option><option value="Santo Domingo">Santo Domingo</option><option value="Otra">Otra ciudad</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[#151E28] font-semibold text-sm">Perfil / Cargo</label>
                                <select required name="perfil" defaultValue="" className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl p-3.5 text-[0.9rem] focus:border-orange-500/80 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-[#151E28] placeholder:text-gray-400">
                                    <option value="" disabled>Seleccione...</option>
                                    <option value="Gerente">Propietario / Gerente</option><option value="Contador">Contador interno</option>
                                    <option value="Contador Ext">Contador independiente</option><option value="Administrativo">Responsable administrativo</option><option value="Otro">Otro</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[#151E28] font-semibold text-sm">Mensaje (Opcional)</label>
                            <textarea name="mensaje" rows={3} placeholder="Cuéntenos brevemente qué tipo de respaldo tributario necesita" className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl p-3.5 text-[0.9rem] focus:border-orange-500/80 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-[#151E28] placeholder:text-gray-400 resize-none"></textarea>
                        </div>

                        {errorMessage && (
                            <div className="bg-red-50 text-red-600 border border-red-200 p-3 rounded-xl text-sm font-medium text-center animate-fade-in">
                                {errorMessage}
                            </div>
                        )}

                        {isSuccess && (
                            <div className="bg-green-50 text-green-700 border border-green-200 p-4 rounded-xl text-sm font-medium text-center animate-fade-in">
                                ✓ Gracias. Su solicitud fue registrada. Un asesor se pondrá en contacto a la brevedad.
                            </div>
                        )}

                        {/* 5. Actualizamos el botón para que reaccione a los estados */}
                        <div className="mt-2 border-t border-gray-100 pt-5">
                            <button 
                                type="submit" 
                                disabled={isLoading || isSuccess}
                                className={`w-full text-white font-bold tracking-wider uppercase py-4.5 rounded-xl transition-all duration-300 text-[0.95rem] font-jakarta group flex items-center justify-center
                                    ${isLoading || isSuccess 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-orange-500/20 cursor-pointer'
                                    }`}
                            >
                                {isLoading ? 'ENVIANDO...' : isSuccess ? 'ENVIADO ✓' : (
                                    <>SOLICITAR ACTIVACIÓN <span className="inline-block transition-transform group-hover:translate-x-1 ml-1.5">→</span></>
                                )}
                            </button>
                        </div>
                        
                        <p className="text-center text-gray-400 text-[0.8rem] mt-2 leading-tight max-w-sm mx-auto">
                            Al enviar sus datos declara haber leído el aviso de privacidad de la firma.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};