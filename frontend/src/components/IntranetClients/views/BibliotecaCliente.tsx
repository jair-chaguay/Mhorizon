/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { ScrollReveal } from '../../ScrollReveal';
import api from '../../../api/axios';

const BibliotecaCliente: React.FC = () => {
    const BASE_URL = 'https://api.mhorizon.com.ec';
    
    const [loading, setLoading] = useState(false);
    const [clienteName, setClienteName] = useState<string>('');
    const [rootTree, setRootTree] = useState<any[]>([]); // El árbol completo que viene del backend
    const [folderPath, setFolderPath] = useState<any[]>([]); // Historial de navegación (Breadcrumb)

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                if (user.cliente_id) {
                    fetchBiblioteca(user.cliente_id);
                }
            } catch (error) {
                console.error("Error al parsear el usuario", error);
            }
        }
    }, []);

    const fetchBiblioteca = async (cId: number) => {
        try {
            setLoading(true);
            const { data } = await api.get(`/biblioteca/arbol/${cId}`);
            setRootTree(data.biblioteca || []);
            setClienteName(data.cliente || 'Mi Biblioteca');
        } catch (error) {
            console.error("Error al cargar biblioteca: ", error);
        } finally {
            setLoading(false);
        }
    };

    // Calculamos qué mostrar en base a dónde estamos parados en el historial
    const currentFolder = folderPath.length > 0 ? folderPath[folderPath.length - 1] : null;
    const currentSubcarpetas = currentFolder ? (currentFolder.subcarpetas || []) : rootTree;
    const currentArchivos = currentFolder ? (currentFolder.documentos || []) : [];

    const handleFolderClick = (carpeta: any) => {
        setFolderPath([...folderPath, carpeta]);
    };

    const handleBack = () => {
        if (folderPath.length > 0) {
            const newPath = [...folderPath];
            newPath.pop(); 
            setFolderPath(newPath);
        }
    };

    const jumpToBreadcrumb = (index: number) => {
        setFolderPath(folderPath.slice(0, index + 1));
    };

    if (loading) return <div className="p-20 text-center text-blue-200 animate-pulse">Cargando Gestor Documental...</div>;

    const isRoot = folderPath.length === 0;

    return (
        <ScrollReveal>
            <div className='max-w-350 mx-auto space-y-6 reveal-element'>

                <div className="flex items-center gap-4 mb-2 animate-fadeIn flex-wrap">
                    {!isRoot && (
                        <button onClick={handleBack} className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-orange-500 transition-colors shadow-sm cursor-pointer shrink-0">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        </button>
                    )}
                    
                    <div className='flex items-center text-sm font-medium text-gray-500 flex-wrap gap-2'>
                        <span className={`transition-colors ${isRoot ? 'text-blue-200 font-bold' : 'cursor-pointer hover:text-orange-500'}`} onClick={() => setFolderPath([])}>
                            {clienteName}
                        </span>

                        {folderPath.map((folder, index) => (
                            <React.Fragment key={folder.id}>
                                <svg className="w-4 h-4 text-gray-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                <span className={`transition-colors ${index === folderPath.length - 1 ? 'text-blue-200 font-bold' : 'cursor-pointer hover:text-orange-500'}`} onClick={() => jumpToBreadcrumb(index)}>
                                    {folder.nombre}
                                </span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-blue-200 tracking-tight leading-tight">
                            {isRoot ? 'Biblioteca Operativa' : 'Directorio de Archivos'}
                        </h1>
                        <p className="text-gray-500 font-light mt-1 text-[1rem]">
                            {isRoot ? 'Navegue por sus carpetas principales.' : 'Visualice y descargue sus documentos.'}
                        </p>
                    </div>
                </div>

                <div className={`bg-white rounded-2xl pt-10 pl-10 shadow-sm border border-gray-200 overflow-hidden ${folderPath.length > 0 ? 'p-0 border-none bg-transparent shadow-none' : 'p-6 lg:p-8'} animate-fadeIn delay-100`}>

                    {/* Mostrar Subcarpetas si existen */}
                    {currentSubcarpetas.length > 0 && (
                        <div className="grid grid-cols-1 w-300 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                            {currentSubcarpetas.map((sub: any) => (
                                <div key={sub.id} onClick={() => handleFolderClick(sub)} className="relative border border-orange-200 bg-orange-50 rounded-xl p-5 hover:bg-orange-100 hover:shadow-md transition-all cursor-pointer group flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-lg shadow-sm border border-orange-100 flex items-center justify-center text-orange-500 transition-colors shrink-0">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></svg>
                                    </div>
                                    <h3 className="font-extrabold text-[#151E28] text-[0.95rem] leading-tight">{sub.nombre}</h3>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Mostrar Archivos si existen (Solo visible si estás dentro de una carpeta) */}
                    {!isRoot && currentArchivos.length > 0 && (
                        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
                            <table className="w-full text-left border-collapse min-w-237.5">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200 text-[0.70rem] font-bold uppercase tracking-widest text-gray-500">
                                        <th className="px-6 py-4 w-[25%]">Archivo</th>
                                        <th className="px-6 py-4 w-[20%]">Subido Por</th>
                                        <th className="px-6 py-4 w-[15%]">Fecha</th>
                                        <th className="px-6 py-4 w-[30%]">Observación</th>
                                        <th className="px-6 py-4 text-center w-[10%]">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[0.85rem] divide-y divide-gray-100">
                                    {currentArchivos.map((archivo: any) => (
                                        <tr key={archivo.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4 font-bold text-blue-200 flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded flex items-center justify-center border shrink-0 ${archivo.tipo === 'pdf' ? 'bg-red-50 text-red-500 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                                                    {archivo.tipo === 'pdf' ? (
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 384 512"><path d="M181.9 256.1c-5-16-4.9-46.9-2-46.9 8.4 0 7.6 36.9 2 46.9zm-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7 18.3-7 39-17.2 62.9-41.9-22.7-1-40.4-8.8-34.5-20.8zm-78.8 115.3c-.5-1.1 1-3 1-3 11.1-20.9 25.9-46.4 46.3-80.1-15.6 15-32 30-47.3 83.1zM384 121.9v358.1c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V32C0 14.3 14.3 0 32 0h224l128 121.9zM250.6 318.5c-20.4-10-43.2-22.5-66.9-36.2-12.7-36.4-23.7-65.3-26.6-83-2.3-14-11.4-38.6-29.2-38.6-11.6 0-21.7 9-21.7 25 0 20.5 15.3 54.4 29.5 86.8-19.1 44.9-38.8 83-58 116.1-22.1 48-35.3 75-23.2 86.2 3.6 3.4 9 5.2 16.5 5.2 25.6 0 54.2-38.8 88.5-121.3 26.6 20.8 54 39.4 78 54.6 27.5 17.3 56.6 29.8 77.2 29.8 11 0 19.3-5.2 23-14 3.7-8.8 1.1-22.8-13.6-35.2-17.2-14.1-46.1-15.4-73.5-15.4z" /></svg>
                                                    ) : (
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 384 512"><path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm60.1 106.5L224 336l60.1 93.5c5.1 8-.6 18.5-10.1 18.5h-34.9c-4.4 0-8.5-2.4-10.6-6.3C208.9 405.5 192 373 192 373c-6.4 14.8-10 20-36.6 68.8-2.1 3.9-6.1 6.3-10.5 6.3H110c-9.5 0-15.2-10.5-10.1-18.5l60.3-93.5-60.3-93.5c-5.2-8 .6-18.5 10.1-18.5h34.8c4.4 0 8.5 2.4 10.6 6.3 19.6 35.5 31.7 57.5 31.7 57.5 6.1-14.5 9.7-19.6 36.8-68.9 2.1-3.9 6.2-6.3 10.6-6.3H294c9.5 0 15.3 10.5 10.2 18.5zM384 121.9v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" /></svg>
                                                    )}
                                                </div>
                                                <span className="cursor-pointer group-hover:text-orange-500 transition-colors truncate">{archivo.nombre_archivo}</span>
                                            </td>
                                            <td className="px-6 py-4 text-blue-200 font-semibold">{archivo.subido_por?.nombre} {archivo.subido_por?.apellido}</td>
                                            <td className="px-6 py-4 text-gray-600 font-medium">{new Date(archivo.created_at).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-gray-500 text-[0.8rem] italic">{archivo.observacion_cliente || 'Sin observación'}</td>
                                            <td className="px-6 py-4 text-center">
                                                {/* AQUÍ ESTÁ LA SOLUCIÓN DEL ENLACE DE DESCARGA */}
                                                <a href={`${BASE_URL}/storage/${archivo.url_archivo}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:bg-orange-500 hover:text-white transition-all cursor-pointer" title="Descargar Documento">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Mostrar Estado Vacío */}
                    {currentSubcarpetas.length === 0 && currentArchivos.length === 0 && (
                        <div className="py-20 bg-white text-center border-2 border-dashed border-gray-200 rounded-2xl shadow-sm">
                            <p className="text-gray-400 italic mb-2">Esta carpeta está vacía.</p>
                            <p className="text-gray-500 text-sm font-medium">Aún no se han subido documentos a este directorio.</p>
                        </div>
                    )}

                </div>
            </div>
        </ScrollReveal>
    );
};

export default BibliotecaCliente;