import React, { useState } from 'react';
import api from '../../../../api/axios';


interface ModalAñadirClienteProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void; 
}

export const ModalAñadirCliente: React.FC<ModalAñadirClienteProps> = ({ isOpen, onClose, onSuccess }) => {
    
    // Estados del formulario
    const [razonSocial, setRazonSocial] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [score, setScore] = useState<number>(100);
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [tipoPersona, setTipoPersona] = useState('Persona Natural');
    
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        try {
            const payload = {
                tipo_persona: tipoPersona,
                razon_social_nombres: razonSocial,
                identificacion: identificacion,
                score_tributario: score,
                correo: correo,
                password: password
            };

            await api.post('/cliente', payload); 
            
            setRazonSocial('');
            setIdentificacion('');
            setScore(100);
            setCorreo('');
            setPassword('');
            setTipoPersona('Persona Natural');
            
            onSuccess(); 
            onClose();   
            alert("Cliente añadido exitosamente");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const msg = error?.response?.data?.message || "Error al crear cliente";
            setErrorMsg(msg);
            console.error(error?.response?.data?.errors); 
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div id="add-client-modal" className="fixed inset-0 bg-black/80 backdrop-blur-sm z-150 flex justify-center items-center p-4 transition-opacity duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative transform scale-100 transition-transform duration-300 max-h-[90vh] overflow-y-auto no-scrollbar">
                
                <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-orange-500 focus:outline-none cursor-pointer">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                
                <div className="mb-5 border-b border-gray-100 pb-4">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.70rem] uppercase mb-1 block">Directorio</span>
                    <h2 className="text-blue-200 font-extrabold text-[1.4rem] tracking-tight">Añadir Nuevo Cliente</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {errorMsg && (
                        <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm font-medium border border-red-100">
                            {errorMsg}
                        </div>
                    )}

                    <div>
                        <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Datos del Perfil (Razón Social)</label>
                        <input type="text" value={razonSocial} onChange={(e) => setRazonSocial(e.target.value)} placeholder="Ej. Empresa S.A." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500" required />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">RUC / Cédula</label>
                            <input type="text" value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} placeholder="Ej. 1790000000001" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500" required />
                        </div>
                        <div>
                            <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Score Tributario</label>
                            <input type="number" value={score} onChange={(e) => setScore(Number(e.target.value))} max="100" min="0" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500" required />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Correo Electrónico (Acceso)</label>
                        <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="correo@empresa.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500" required />
                    </div>
                    
                    <div>
                        <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Contraseña (Acceso)</label>
                        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Clave de acceso" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500" required minLength={8} />
                    </div>
                    
                    <div>
                        <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Tipo de Contribuyente</label>
                        <select value={tipoPersona} onChange={(e) => setTipoPersona(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500">
                            <option value="Régimen General">Régimen General</option>
                            <option value="Rimpe">Rimpe</option>
                            <option value="Contribuyente Especial">Contribuyente Especial</option>
                            <option value="Persona Natural">Persona Natural</option>
                        </select>
                    </div>
                    
                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                        <button type="button" onClick={onClose} disabled={loading} className="flex-1 py-3 border border-gray-200 rounded-md text-gray-600 font-bold uppercase tracking-wider text-[0.80rem] hover:bg-gray-50 transition-colors cursor-pointer">
                            Cancelar
                        </button>
                        
                        <button type="submit" disabled={loading} className={`flex-1 py-3 text-white rounded-md font-bold uppercase tracking-wider text-[0.80rem] transition-colors cursor-pointer ${loading ? 'bg-gray-400' : 'bg-blue-200 hover:bg-orange-500'}`}>
                            {loading ? 'Creando...' : 'Añadir Cliente'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};