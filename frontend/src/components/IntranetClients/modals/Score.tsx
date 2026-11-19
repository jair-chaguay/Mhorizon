import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom"; 
import api from '../../../api/axios'; 

interface Pregunta {
    id: number;
    enunciado: string;
    peso_maximo: number;
}

interface ModalScoreProps {
    onClose: () => void;
    clienteId: number; 
    onScoreActualizado: () => void; 
}

const Score: React.FC<ModalScoreProps> = ({ onClose, clienteId, onScoreActualizado }) => {
    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
    const [respuestas, setRespuestas] = useState<Record<number, number>>({});
    const [comentario, setComentario] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const cargarPreguntas = async () => {
            try {
                const response = await api.get('/preguntas-score');
                setPreguntas(response.data.preguntas);
            } catch (error) {
                console.error("Error al cargar las preguntas:", error);
            } finally {
                setIsLoading(false);
            }
        };

        cargarPreguntas();
    }, []);

    const manejarCambio = (preguntaId: number, valor: number) => {
        setRespuestas(prev => ({
            ...prev,
            [preguntaId]: valor
        }));
    };

    const manejarEnvio = async (evento: React.FormEvent) => {
        evento.preventDefault();
        
        const formatoRespuestas = Object.entries(respuestas).map(([id, valor]) => ({
            pregunta_id: Number(id),
            valor: valor
        }));

        setIsSubmitting(true);
        try {
            await api.post(`/clientes/${clienteId}/evaluar-score`, {
                respuestas: formatoRespuestas,
                comentario: comentario
            });
            onScoreActualizado(); 
            onClose(); 
            
        } catch (error) {
            console.error("Error al enviar la evaluación:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const todasRespondidas = preguntas.length > 0 && Object.keys(respuestas).length === preguntas.length;
    const tieneComentario = comentario.trim().length > 0;

    const modalContent = (
        <div className="font-intranet antialiased fixed inset-0 bg-slate-900/50 z-100 flex justify-center items-center p-4 transition-opacity duration-300 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 relative my-8">
                
                <button onClick={onClose} type="button" className="cursor-pointer absolute top-4 right-4 h-8 w-8 grid place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                <div className="mb-6 border-b border-slate-100 pb-4">
                    <span className="text-slate-500 font-medium text-xs mb-0.5 block">
                        Evaluación de Servicio
                    </span>
                    <h2 className="text-slate-900 font-semibold text-base">
                        Encuesta de Satisfacción 
                    </h2>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-600"></div>
                    </div>
                ) : (
                    <form onSubmit={manejarEnvio} className="space-y-6">
                        
                        <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                            {preguntas.map((pregunta, index) => (
                                <div key={pregunta.id} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <p className="font-semibold text-slate-900 mb-3 text-sm">
                                        {index + 1}. {pregunta.enunciado}
                                    </p>
                                    <div className="flex gap-2 sm:gap-4 justify-center sm:justify-start">
                                        {[1, 2, 3, 4, 5].map((numero) => {
                                            const estaSeleccionada = respuestas[pregunta.id] === numero;
                                            return (
                                                <label 
                                                    key={numero} 
                                                    className={`cursor-pointer w-8 h-8 text-[12px] flex items-center justify-center rounded-full border-2 transition-all duration-200 ${
                                                        estaSeleccionada 
                                                        ? "border-brand-600 bg-brand-600 text-white" 
                                                        : "border-slate-200 text-slate-500 hover:border-brand-200 hover:bg-brand-50"
                                                    }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name={`pregunta_${pregunta.id}`}
                                                        value={numero}
                                                        checked={estaSeleccionada}
                                                        onChange={() => manejarCambio(pregunta.id, numero)}
                                                        className="hidden"
                                                    />
                                                    <span className="font-semibold">{numero}</span>
                                                </label>
                                            )
                                        })}
                                    </div>
                                   
                                </div>
                            ))}
                            <div className= "mt-4">
                                <label className="mb-2.5 text-sm font-medium block text-slate-700">Escribe tu recomendación</label>
                                <textarea 
                                    required
                                    value={comentario}
                                    onChange={(e) => setComentario(e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                                    placeholder="Déjanos tus comentarios o sugerencias..." 
                                    rows={3}
                                ></textarea>
                            </div>
                             
                        </div>

                        <button
                            type="submit"
                            disabled={!todasRespondidas || !tieneComentario ||isSubmitting}
                            className="w-full h-11 bg-brand-600 text-white text-sm font-semibold px-4 rounded-lg hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                            {isSubmitting ? "Calculando Score..." : "Enviar Evaluación"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
}

export default Score;