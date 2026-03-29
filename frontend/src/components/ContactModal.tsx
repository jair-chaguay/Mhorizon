import { Call, Location } from "./IconosSVG"

interface ContactModalProps {
    isOpen: boolean,
    onClose: () => void;
}

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative overflow-hidden flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-orange-500 transition-colors z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="overflow-y-auto p-8">
                    <div className="text-center mb-8">
                        <h3 className="font-bold text-3xl text-blue-200 leading-none uppercase tracking-tighter">
                            Agendar <span className="text-orange-500">Asesoría</span>
                        </h3>
                        <p className="text-gray-500 mt-2">Déjanos tus datos y nos pondremos en contacto contigo.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        <div>
                            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="block text-sm font-bold text-blue-200 uppercase tracking-widest mb-2 text-[10px]">Nombre Completo</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-slate-50 transition-colors"
                                        placeholder="Ej. Juan Pérez"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-blue-200 uppercase tracking-widest mb-2 text-[10px]">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-slate-50 transition-colors"
                                        placeholder="tu@correo.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-blue-200 uppercase tracking-widest mb-2 text-[10px]">Asunto</label>
                                    <input
                                        type="string"
                                        className="w-full px-4 py-3 bprder border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-slate-50 transition-colors"
                                        placeholder="Escribe el asunto aquí..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-blue-200 uppercase tracking-widest mb-2 text-[10px]">¿En qué podemos ayudarte?</label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-slate-50 transition-colors resize-none"
                                        placeholder="Escribe tu mensaje aquí...">
                                    </textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-orange-500 text-white font-bold uppercase tracking-[0.2em] text-[12px] rounded-sm hover:bg-blue-200 transition-all duration-300 shadow-xl shadow-orange-500/20 mt-4">
                                    Enviar Mensaje
                                </button>
                            </form>
                        </div>

                        <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 flex flex-col justify-center">
                            <h4 className="font-bold text-2xl text-blue-200 mb-8 leading-none uppercase tracking-tighter">
                                Sede <br />
                                <span className="text-orange-500">Central</span>
                            </h4>

                            <div className="space-y-8">
                                <div className="flex items-center group">
                                    <div className="w-14 h-14 shrink-0 bg-gray-800 rounded-xl flex items-center justify-center border border-slate-200 group-hover:bg-blue-200 transition-colors duration-300">
                                        <Location className="text-orange-500 group-hover:text-white w-8" />
                                    </div>
                                    <div className="ml-6">
                                        <h6 className="font-bold text-blue-200 uppercase text-[12px] tracking-[0.2em] mb-2">
                                            Dirección
                                        </h6>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            Carchi 601 y Quisquís,<br />Edificio Quil 1, Piso 12.<br />
                                            Guayaquil, Ecuador.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center group">
                                    <div className="w-14 h-14 shrink-0 bg-gray-800 rounded-xl flex items-center justify-center border border-slate-200 group-hover:bg-blue-200 transition-colors duration-300">
                                        <Call className="text-orange-500 group-hover:text-white w-8" />
                                    </div>
                                    <div className="ml-6">
                                        <h6 className="font-bold text-blue-200 uppercase text-[12px] tracking-[0.2em] mb-2">
                                            Contacto Directo
                                        </h6>
                                        <p className="text-gray-500 text-sm mb-1">Telf: 04 269 1453</p>
                                        <a className="text-gray-500 hover:text-orange-500 transition-colors text-sm"
                                            href="mailto:news@mhorizon.com.ec">
                                            Email: news@mhorizon.com.ec
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
