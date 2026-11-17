import React, { useState } from 'react';
import api from '../../../../api/axios';


interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    config: {
        title: string;
        placeholder: string;
        type: 'ROOT' | 'PERIODOS' | 'SUBCARPETAS' | 'ARCHIVOS';
        parentId: number | null;
    };
}

const ModalCrearCarpeta: React.FC<Props> = ({ isOpen, onClose, onSuccess, config }) => {
    const [nombre, setNombre] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (config.type === 'PERIODOS') {
                await api.post('/biblioteca/periodo', {
                    cliente_id: config.parentId,
                    anio: nombre
                });
            } else if (config.type === 'SUBCARPETAS') {
                await api.post('/biblioteca/subcarpeta', {
                    periodo_id: config.parentId,
                    nombre: nombre
                });
            } else if (config.type === 'ROOT') {
                await api.post('/cliente', {
                    razon_social_nombres: nombre,
                    tipo_persona: 'Jurídica',
                    identificacion: 'TEMP-' + Date.now(), 
                });
            }

            setNombre("");
            onSuccess();
            onClose();
        } catch (error) {
            alert("Error al crear carpeta. Verifique que no exista.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/50 z-150 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl">
                <h2 className="text-slate-900 font-semibold text-xl mb-4">{config.title}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        autoFocus
                        className="w-full p-3 bg-white border rounded-lg outline-none focus:border-brand-600 border-slate-200 focus:ring-2 focus:ring-brand-600/20"
                        placeholder={config.placeholder}
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <div className="flex gap-2">
                        <button type="button" onClick={onClose} className="cursor-pointer flex-1 py-2.5 text-slate-500 font-semibold text-sm">Cancelar</button>
                        <button type="submit" disabled={loading} className="cursor-pointer flex-1 py-2.5 bg-brand-600 text-white rounded-lg font-semibold text-sm hover:bg-brand-700">
                            {loading ? 'Creando...' : 'Confirmar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalCrearCarpeta;