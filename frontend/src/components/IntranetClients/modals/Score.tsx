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

    const modalContent = (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-100 flex justify-center items-center p-4 transition-opacity duration-300 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative my-8">
                
                <button onClick={onClose} type="button" className="cursor-pointer absolute top-5 right-5 text-gray-400 hover:text-orange-500 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                <div className="mb-6 border-b border-gray-100 pb-4">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.70rem] uppercase mb-1 block">
                        Evaluación de Servicio
                    </span>
                    <h2 className="text-blue-200 font-extrabold text-[1.4rem] tracking-tight">
                        Encuesta de Satisfacción 
                    </h2>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
                    </div>
                ) : (
                    <form onSubmit={manejarEnvio} className="space-y-6">
                        
                        <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                            {preguntas.map((pregunta, index) => (
                                <div key={pregunta.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <p className="font-semibold text-blue-200 mb-3 text-sm">
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
                                                        ? "border-orange-500 bg-orange-500 text-white shadow-md transform scale-110" 
                                                        : "border-gray-200 text-gray-500 hover:border-orange-300 hover:bg-orange-50"
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
                                                    <span className="font-bold">{numero}</span>
                                                </label>
                                            )
                                        })}
                                    </div>
                                   
                                </div>
                            ))}
                            <div className= "mt-4">
                                <label className="mb-2.5 text-sm font-medium block text-gray-700">Escribe tu recomendación (Opcional)</label>
                                <textarea 
                                    value={comentario}
                                    onChange={(e) => setComentario(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                    placeholder="Déjanos tus comentarios o sugerencias..." 
                                    rows={3}
                                ></textarea>
                            </div>
                             
                        </div>

                        <button
                            type="submit"
                            disabled={!todasRespondidas || isSubmitting}
                            className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-xl hover:bg-orange-600 focus:ring-4 focus:ring-orange-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md"
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