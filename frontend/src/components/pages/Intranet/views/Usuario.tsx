import React, { useEffect, useState } from 'react';
import { ScrollReveal } from '../../../ScrollReveal';
import api from '../../../../api/axios';

interface UsuarioProps {
    refreshSignal?: number;
    onOpenCrear: () => void;
    onOpenEliminar: (endpoint: string, title: string) => void;
}

interface UsuarioData {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    cargo: string | null;
    activo: boolean;
    rol_id: number;
}

export const Usuario: React.FC<UsuarioProps> = ({ refreshSignal, onOpenCrear, onOpenEliminar }) => {
    const [usuarios, setUsuarios] = useState<UsuarioData[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsuarios = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/usuario');
            // Filtramos para mostrar solo los que tienen rol_id 1 (Clientes/Usuarios)
            const filtrados = data.usuarios.filter((u: UsuarioData) => u.rol_id === 1);
            setUsuarios(filtrados);
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, [refreshSignal]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-64 gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                <p className="text-gray-400 text-sm animate-pulse uppercase tracking-widest">Cargando Usuarios...</p>
            </div>
        );
    }

    return (
        <ScrollReveal className="max-w-350 mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 reveal-element">
                <div>
                    <h1 className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-blue-200 tracking-tight leading-tight">
                        Gestor de Usuarios
                    </h1>
                    <p className="text-gray-500 font-light mt-1">Administre los accesos de clientes al sistema.</p>
                </div>
                <button
                    onClick={onOpenCrear}
                    className="bg-orange-500 cursor-pointer text-white text-[0.8rem] font-bold uppercase tracking-widest px-6 py-3.5 rounded-lg shadow-lg hover:bg-blue-200 transition-all flex items-center justify-center gap-2 shrink-0"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Añadir Usuario
                </button>
            </div>

            <div className="bg-white reveal-element rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-225">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-[0.70rem] font-bold uppercase tracking-widest text-gray-500">
                                <th className="px-6 py-4">Nombre Completo</th>
                                <th className="px-6 py-4">Correo Electrónico</th>
                                <th className="px-6 py-4">Cargo</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-[0.85rem] divide-y divide-gray-100">
                            {usuarios.map((u) => (
                                <tr key={u.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-5 font-medium text-blue-200">
                                        {u.nombre} {u.apellido}
                                    </td>
                                    <td className="px-6 py-5 text-gray-500 font-mono text-[0.75rem]">
                                        {u.correo}
                                    </td>
                                    <td className="px-6 py-5 text-gray-600">
                                        {u.cargo || 'No asignado'}
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase ${u.activo ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                            {u.activo ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => onOpenEliminar(`/usuarios/${u.id}`, `${u.nombre} ${u.apellido}`)}
                                                className="cursor-pointer w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all"
                                                title="Eliminar"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </ScrollReveal>
    );
};