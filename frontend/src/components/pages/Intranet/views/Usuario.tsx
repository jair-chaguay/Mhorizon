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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
                <p className="text-slate-400 text-sm animate-pulse">Cargando Usuarios...</p>
            </div>
        );
    }

    const renderTablaRol = (titulo: string, rolId: number, badgeClasses: string, rolNombre: string) => {
        const usuariosDelRol = usuarios.filter(u => u.rol_id === rolId);

        return (
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-slate-900 mb-3 ml-1 tracking-tight">
                    {titulo}
                </h2>
                <div className="bg-white reveal-element rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-225">
                            <thead>
                                <tr className="bg-slate-50/60 border-b border-slate-100 text-xs font-medium text-slate-500">
                                    <th className="px-5 py-2.5 whitespace-nowrap">Nombre Completo</th>
                                    <th className="px-5 py-2.5 whitespace-nowrap">Correo Electrónico</th>
                                    {rolId === 1 || rolId === 3 ? (
                                        <th className="px-5 py-2.5 whitespace-nowrap">Cargo</th>
                                    ):null}
                                    <th className="px-5 py-2.5 whitespace-nowrap">Estado</th>
                                    
                                    <th className="px-5 py-2.5 flex items-center justify-center">Rol</th>
                                        <th className="px-5 py-2.5 text-center whitespace-nowrap">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-slate-100">
                                {usuariosDelRol.length > 0 ? (
                                    usuariosDelRol.map((u) => (
                                        <tr key={u.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-5 py-3 font-medium text-slate-800">
                                                {u.rol_id === 2 && u.cliente ? (
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-[15px] leading-none mb-1">
                                                            {u.cliente.razon_social_nombres}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span>{u.nombre} {u.apellido}</span>
                                                )}
                                            </td>
                                            <td className="px-5 py-3 text-slate-500 font-mono text-xs">
                                                {u.correo}
                                            </td>
                                            {rolId === 1 || rolId === 3 ? (
                                                <td className="px-5 py-3 text-slate-500 font-mono text-xs">
                                                    {u.cargo ? u.cargo : 'No asignado'}
                                                </td>
                                            ): null }
                                            <td className="px-5 py-3">
                                                <button
                                                    onClick={() => handleToggleEstado(u)}
                                                    title={u.activo ? 'Click para Desactivar' : 'Click para Activar'}
                                                    className={`cursor-pointer px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 border focus:outline-none ${u.activo
                                                        ? ' border-green-200 rounded-md px-1.5 py-0.5 text-xs  bg-emerald-50 text-emerald-700 hover:bg-red-100 hover:text-red-600 hover:border-red-200'
                                                        : 'bg-red-100 text-red-600 border-red-200 hover:bg-green-100 hover:text-green-600 hover:border-green-200'
                                                        }`}
                                                >
                                                    {u.activo ? 'Activo' : 'Inactivo'}
                                                </button>
                                            </td>
                                            <td className="px-5 py-3 justify-center flex">
                                                <span className={`px-2 py-2 text-xs rounded-md ${badgeClasses}`}>
                                                    {rolNombre}
                                                </span>
                                            </td>
                                            
                                                <td className="px-5 py-3">
                                                    <div className="flex items-center justify-center gap-2">
                                                        {u.rol_id ===1 || u.rol_id === 3 ?(
                                                            <button
                                                            onClick={() => onOpenEditar(u)}
                                                            className="cursor-pointer w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-all"
                                                            title='Editar'
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                            </svg>
                                                        </button>
                                                        ) : null}
                                                        <button
                                                            onClick={() => onOpenEliminar(`/usuario/${u.id}`, `${u.nombre} ${u.apellido}`)}
                                                            className="cursor-pointer w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-red-50 text-slate-400 hover:text-red-600 transition-all"
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
                                        <td colSpan={6} className="px-5 py-8 text-center text-slate-400">
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
                    <h1 className="text-xl sm:text-[22px] font-medium text-slate-900 tracking-tight leading-tight">
                        Gestor de Usuarios
                    </h1>
                    <p className="text-slate-500 mt-1">Administre los accesos de clientes al sistema.</p>
                </div>
                <button
                    onClick={onOpenCrear}
                    className="bg-brand-600 cursor-pointer text-white text-[13px] font-medium px-6 py-2.5 rounded-lg hover:bg-brand-700 transition-all flex items-center justify-center gap-2 shrink-0"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Añadir Usuario
                </button>
            </div>

            {renderTablaRol("Administradores del Sistema", 3, "bg-blue-200/96 text-white", "Creador")}
            {renderTablaRol("Colaboradores", 1, "bg-gray-300 text-gray-700", "Colaborador")}
            {renderTablaRol("Lista de Clientes", 2, "bg-orange-100 text-orange-600", "Cliente")}

        </ScrollReveal>
    );
};