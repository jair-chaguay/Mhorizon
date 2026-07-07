import api from "../../../../api/axios"
/**
 * Invierte el estado 'activo' de un usuario en la base de datos.
 * @param usuarioId ID del usuario a modificar
 * @param activoActual Estado 'activo' actual del usuario
 * @returns Promesa con el nuevo estado booleano
 */
export const toggleEstadoUsuarioAPI = async (usuarioId: number, activoActual: boolean): Promise<boolean> => {
    const nuevoEstado = !activoActual;
    await api.put(`/usuario/${usuarioId}`, { activo: nuevoEstado });
    return nuevoEstado;
};