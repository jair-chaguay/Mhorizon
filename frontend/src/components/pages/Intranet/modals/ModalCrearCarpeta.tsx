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
                // Asegúrate de enviar los campos mínimos requeridos por tu base de datos
                await api.post('/cliente', {
                    razon_social_nombres: nombre,
                    tipo_persona: 'Jurídica', // Valor por defecto para evitar error 400
                    identificacion: 'TEMP-' + Date.now(), // Identificación temporal o pide este dato
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
        <div className="fixed inset-0 bg-black/80 z-150 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl">
                <h2 className="text-blue-200 font-black text-xl mb-4 uppercase">{config.title}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        autoFocus
                        className="w-full p-3 bg-gray-50 border rounded-lg outline-none focus:border-orange-500"
                        placeholder={config.placeholder}
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <div className="flex gap-2">
                        <button type="button" onClick={onClose} className="cursor-pointer flex-1 py-3 text-gray-500 font-bold uppercase text-xs">Cancelar</button>
                        <button type="submit" disabled={loading} className="cursor-pointer flex-1 py-3 bg-blue-200 text-white rounded-lg font-bold uppercase text-xs hover:bg-orange-500">
                            {loading ? 'Creando...' : 'Confirmar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalCrearCarpeta;