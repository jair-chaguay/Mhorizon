import React, { useEffect, useState } from 'react';
import { ScrollReveal } from '../../../ScrollReveal';
import api from '../../../../api/axios';
import { toggleEstadoUsuarioAPI } from '../hooks/usuarioService';

interface UsuarioProps {
    refreshSignal?: number;
    onOpenCrear: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onOpenEditar: (usuario: any) => void;
    onOpenEliminar: (endpoint: string, title: string) => void;
}


interface UsuarioData {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    correo_personal?: string;
    cargo: string | null;
    activo: boolean;
    rol_id: number;
    cliente?: {
        razon_social_nombres: string;
    };
}

export const Usuario: React.FC<UsuarioProps> = ({ refreshSignal, onOpenCrear, onOpenEditar, onOpenEliminar }) => {
    const [usuarios, setUsuarios] = useState<UsuarioData[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsuarios = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/usuario');
            const filtrados = data.usuarios.filter((u: UsuarioData) => [1, 2, 3].includes(u.rol_id));
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

    const handleToggleEstado = async (usuario: UsuarioData) => {
        const estadoAnterior = usuario.activo;
        const nuevoEstado = !estadoAnterior;

        setUsuarios(prev => prev.map(u =>
            u.id === usuario.id ? { ...u, activo: nuevoEstado } : u
        ));

        try {
            await toggleEstadoUsuarioAPI(usuario.id, estadoAnterior);
        } catch (error) {
            console.error("Error al actualizar el estado:", error);
            setUsuarios(prev => prev.map(u =>
                u.id === usuario.id ? { ...u, activo: estadoAnterior } : u
            ));
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-64 gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                <p className="text-gray-400 text-sm animate-pulse uppercase tracking-widest">Cargando Usuarios...</p>
            </div>
        );
    }

    const renderTablaRol = (titulo: string, rolId: number, badgeClasses: string, rolNombre: string) => {
        const usuariosDelRol = usuarios.filter(u => u.rol_id === rolId);

        return (
            <div className="mb-8">
                <h2 className="text-[1.3rem] font-bold text-blue-200 mb-3 ml-1 tracking-tight">
                    {titulo}
                </h2>
                <div className="bg-white reveal-element rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-225">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-[0.70rem] font-bold uppercase tracking-widest text-gray-500">
                                    <th className="px-6 py-4">Nombre Completo</th>
                                    <th className="px-6 py-4">Correo Electrónico</th>
                                    {rolId === 1 || rolId === 3 ? (
                                        <th className="px-6 py-4">Cargo</th>
                                    ):null}
                                    <th className="px-6 py-4">Estado</th>
                                    
                                    <th className="px-6 py-4 flex items-center justify-center">Rol</th>
                                        <th className="px-6 py-4 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="text-[0.85rem] divide-y divide-gray-100">
                                {usuariosDelRol.length > 0 ? (
                                    usuariosDelRol.map((u) => (
                                        <tr key={u.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-5 font-medium text-blue-200">
                                                {u.rol_id === 2 && u.cliente ? (
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-[0.95rem] leading-none mb-1">
                                                            {u.cliente.razon_social_nombres}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span>{u.nombre} {u.apellido}</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-5 text-gray-500 font-mono text-[0.75rem]">
                                                {u.correo}
                                            </td>
                                            {rolId === 1 || rolId === 3 ? (
                                                <td className="px-6 py-5 text-gray-500 font-mono text-[0.75rem]">
                                                    {u.cargo ? u.cargo : 'No asignado'}
                                                </td>
                                            ): null }
                                            <td className="px-6 py-5">
                                                <button
                                                    onClick={() => handleToggleEstado(u)}
                                                    title={u.activo ? 'Click para Desactivar' : 'Click para Activar'}
                                                    className={`cursor-pointer px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase transition-all duration-300 border focus:outline-none ${u.activo
                                                        ? 'bg-green-100 text-green-600 border-green-200 hover:bg-red-100 hover:text-red-600 hover:border-red-200'
                                                        : 'bg-red-100 text-red-600 border-red-200 hover:bg-green-100 hover:text-green-600 hover:border-green-200'
                                                        }`}
                                                >
                                                    {u.activo ? 'Activo' : 'Inactivo'}
                                                </button>
                                            </td>
                                            <td className="px-6 py-5 items-center justify-center flex">
                                                <span className={`px-2 py-1 text-[0.65rem] rounded-full ${badgeClasses}`}>
                                                    {rolNombre}
                                                </span>
                                            </td>
                                            
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center justify-center gap-2">
                                                        {u.rol_id ===1 || u.rol_id === 3 ?(
                                                            <button
                                                            onClick={() => onOpenEditar(u)}
                                                            className="cursor-pointer w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition-all"
                                                            title='Editar'
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                            </svg>
                                                        </button>
                                                        ) : null}
                                                        <button
                                                            onClick={() => onOpenEliminar(`/usuario/${u.id}`, `${u.nombre} ${u.apellido}`)}
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
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                                            No hay usuarios asignados a este rol.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <ScrollReveal className="max-w-350 mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 reveal-element mb-8">
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

            {renderTablaRol("Administradores del Sistema", 3, "bg-blue-200 text-white", "Creador")}
            {renderTablaRol("Colaboradores", 1, "bg-gray-300 text-gray-700", "Colaborador")}
            {renderTablaRol("Lista de Clientes", 2, "bg-orange-100 text-orange-600", "Cliente")}

        </ScrollReveal>
    );
};