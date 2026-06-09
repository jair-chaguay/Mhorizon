/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { ScrollReveal } from '../../../ScrollReveal';
import api from '../../../../api/axios';

interface BibliotecaProps {
  onOpenCrear: (config: { title: string; placeholder: string; type: 'ROOT' | 'PERIODOS' | 'SUBCARPETAS'; parentId: number | null }) => void;
  onOpenSubir: (subcarpetaId: number) => void;
  refreshSignal: number;
  directTo?: { clienteId: number; periodoId: number } | null;
  onOpenEliminar?: (endpoint: string, titulo: string) => void;
  onOpenEditar?: (config: { endpoint: string; currentName: string; title: string }) => void;
}

const Biblioteca: React.FC<BibliotecaProps> = ({ onOpenCrear, onOpenSubir, refreshSignal, directTo, onOpenEliminar, onOpenEditar }) => {
  const BASE_URL = 'https://api.miltonmontece.com';
  const [userRole, setUserRole] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [clientes, setClientes] = useState<any[]>([]);
  const [clienteActual, setClienteActual] = useState<any | null>(null);
  const [pathStack, setPathStack] = useState<any[]>([]);
  const [currentItems, setCurrentItems] = useState<{ carpetas: any[], archivos: any[] }>({ carpetas: [], archivos: [] });

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/clientes/biblioteca');
      setClientes(Array.isArray(data) ? data : data.clientes || []);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
    } finally {
      setLoading(false);
    }
  };


  const refreshTree = async (cId: number, currentPath: any[] = pathStack) => {
    try {
      const { data } = await api.get(`/biblioteca/arbol/${cId}`);
      const arbolCompleto = data.biblioteca || [];

      let carpetasNivelActual = arbolCompleto;
      let archivosNivelActual: any[] = [];
      const nuevoStack = [];

      for (const step of currentPath) {
        const encontrada = carpetasNivelActual.find((c: any) => c.id === step.id);
        if (encontrada) {
          nuevoStack.push(encontrada);
          carpetasNivelActual = encontrada.subcarpetas || [];
          archivosNivelActual = encontrada.documentos || [];
        } else {
          break;
        }
      }

      setPathStack(nuevoStack);
      setCurrentItems({ carpetas: carpetasNivelActual, archivos: archivosNivelActual });
    } catch (error) {
      console.error("Error al refrescar el árbol:", error);
    }
  };


  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUserRole(parsedUser.rol_id);
      } catch (error) {
        console.error("Error al parsear el usuario del localStorage:", error);
      }
    }
  }, []);


  useEffect(() => {
    if (!clienteActual) fetchClientes();
  }, [clienteActual]);


  useEffect(() => {
    if (refreshSignal > 0) {
      if (!clienteActual) {
        fetchClientes();
      } else {
        refreshTree(clienteActual.id);
      }
    }
  }, [refreshSignal]);


  useEffect(() => {
    if (directTo && directTo.clienteId) {
      const jump = async () => {
        setLoading(true);
        try {
          const { data } = await api.get(`/biblioteca/arbol/${directTo.clienteId}`);
          setClienteActual({ id: directTo.clienteId, razon_social_nombres: data.cliente });

          const arbolCompleto = data.biblioteca || [];
          const targetCarpeta = arbolCompleto.find((c: any) => c.id === directTo.periodoId);

          if (targetCarpeta) {
            setPathStack([targetCarpeta]);
            setCurrentItems({ carpetas: targetCarpeta.subcarpetas || [], archivos: targetCarpeta.documentos || [] });
          } else {
            setPathStack([]);
            setCurrentItems({ carpetas: arbolCompleto, archivos: [] });
          }
        } catch (error) {
          console.error("Error en salto directo:", error);
        } finally {
          setLoading(false);
        }
      };
      jump();
    }
  }, [directTo]);


  const handleClientClick = async (cliente: any) => {
    setClienteActual(cliente);
    setPathStack([]);
    setLoading(true);
    try {
      const { data } = await api.get(`/biblioteca/arbol/${cliente.id}`);
      setCurrentItems({ carpetas: data.biblioteca || [], archivos: [] });
    } catch (error) {
      console.error("Error al cargar la biblioteca:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFolderClick = (carpeta: any) => {
    const newStack = [...pathStack, carpeta];
    setPathStack(newStack);
    setCurrentItems({ carpetas: carpeta.subcarpetas || [], archivos: carpeta.documentos || [] });
  };

  const handleBack = () => {
    if (pathStack.length > 0) {
      const newStack = [...pathStack];
      newStack.pop(); // Sacamos la última carpeta
      refreshTree(clienteActual.id, newStack);
    } else {
      setClienteActual(null); // Volver a la lista de clientes
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    const newStack = pathStack.slice(0, index + 1);
    refreshTree(clienteActual.id, newStack);
  };

  const handleGoToRootClient = () => {
    setPathStack([]);
    refreshTree(clienteActual.id, []);
  };

  const handleActionClick = () => {
    if (!clienteActual) {
      onOpenCrear({ title: 'Nuevo Cliente', placeholder: 'Razón Social...', type: 'ROOT', parentId: null });
    } else if (pathStack.length === 0) {
      // Estamos en la raíz del cliente
      onOpenCrear({ title: 'Nueva Carpeta Principal', placeholder: 'Ej. Obligaciones 2026', type: 'PERIODOS', parentId: clienteActual.id });
    } else {
      // Estamos dentro de una carpeta, podemos crear subcarpeta o subir archivo
      const currentFolder = pathStack[pathStack.length - 1];
      onOpenCrear({ title: 'Nueva Subcarpeta', placeholder: 'Ej. Enero', type: 'SUBCARPETAS', parentId: currentFolder.id });
    }
  };

  if (loading && !clienteActual) return <div className="p-20 text-center text-blue-200 animate-pulse">Cargando Directorio...</div>;


  return (
    <ScrollReveal>
      <div className="max-w-350 mx-auto space-y-6 reveal-element">

        {clienteActual && (
          <div className="flex items-center gap-4 mb-2 animate-fadeIn flex-wrap">
            <button onClick={handleBack} className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-orange-500 transition-colors shadow-sm cursor-pointer shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>

            <div className="flex items-center text-sm font-medium text-gray-500 flex-wrap gap-y-2">
              <span className="cursor-pointer hover:text-orange-500 transition-colors" onClick={() => setClienteActual(null)}>Biblioteca</span>

              <svg className="w-4 h-4 mx-1 text-gray-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              <span className={`transition-colors ${pathStack.length === 0 ? 'text-blue-200 font-bold' : 'cursor-pointer hover:text-orange-500'}`} onClick={handleGoToRootClient}>
                {clienteActual.razon_social_nombres}
              </span>

              {pathStack.map((folder, index) => (
                <React.Fragment key={folder.id}>
                  <svg className="w-4 h-4 mx-1 text-gray-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  <span
                    className={`transition-colors truncate max-w-[150px] ${index === pathStack.length - 1 ? 'text-blue-200 font-bold' : 'cursor-pointer hover:text-orange-500'}`}
                    onClick={() => handleBreadcrumbClick(index)}
                    title={folder.nombre}
                  >
                    {folder.nombre}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-blue-200 tracking-tight leading-tight">
              {!clienteActual ? 'Biblioteca de Operatividad' :
                pathStack.length === 0 ? 'Directorios Principales' :
                  pathStack[pathStack.length - 1].nombre}
            </h1>
            <p className="text-gray-500 font-light mt-1 text-[1rem]">
              {!clienteActual ? 'Nivel 1: Seleccione el Directorio del Cliente.' :
                pathStack.length === 0 ? 'Nivel 2: Seleccione la carpeta raíz operativa.' :
                  'Navegando en los archivos del cliente.'}
            </p>
          </div>

          <div className="flex gap-2">
            {clienteActual && pathStack.length > 0 && (
              <button
                onClick={() => onOpenSubir(pathStack[pathStack.length - 1].id)}
                className="bg-green-600 cursor-pointer text-white text-[0.8rem] font-bold uppercase tracking-widest px-6 py-3.5 rounded-lg shadow-lg hover:bg-green-500 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                Subir Archivo
              </button>
            )}
            <button onClick={handleActionClick} className="bg-blue-200 cursor-pointer text-white text-[0.8rem] font-bold uppercase tracking-widest px-6 py-3.5 rounded-lg shadow-lg hover:bg-orange-500 transition-all flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              {!clienteActual ? 'Crear Cliente' : 'Crear Carpeta'}
            </button>
          </div>
        </div>

        <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden ${(!clienteActual || currentItems.carpetas.length > 0) ? 'p-6 lg:p-8' : ''} animate-fadeIn`}>
          {!clienteActual && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {clientes?.map((cliente) => (
                <div key={cliente.id} onClick={() => handleClientClick(cliente)} className="relative border border-gray-200 rounded-2xl p-6 hover:border-orange-500 hover:shadow-lg transition-all cursor-pointer group bg-gray-50 hover:bg-white flex flex-col items-center text-center">
                  <svg className="w-16 h-16 text-gray-400 group-hover:text-orange-500 mb-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></svg>
                  <h3 className="font-extrabold text-blue-200 text-[1.05rem] leading-tight">{cliente.razon_social_nombres}</h3>
                  <p className="text-[0.70rem] text-gray-500 font-medium mt-2 uppercase tracking-widest">Carpeta Raíz</p>
                </div>
              ))}
            </div>
          )}

          {clienteActual && (
            <div className="flex flex-col gap-8">
              
              {/* Render de Carpetas */}
              {currentItems.carpetas.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Carpetas</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {currentItems.carpetas.map((carpeta) => (
                      <div key={carpeta.id} className="relative border border-gray-200 bg-gray-50 rounded-xl p-4 hover:bg-white hover:border-orange-500 hover:shadow-md transition-all group flex items-center gap-3">
                        
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all flex gap-2 z-10">
                          {userRole === 3 && (
                            <button onClick={(e) => { e.stopPropagation(); onOpenEditar && onOpenEditar({ endpoint: `/biblioteca/carpeta/subcarpeta/${carpeta.id}`, currentName: carpeta.nombre, title: 'Editar Carpeta' }); }} className="text-gray-300 hover:text-blue-500 cursor-pointer transition-all" title="Editar">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                            </button>
                          )}
                          <button onClick={(e) => { e.stopPropagation(); onOpenEliminar && onOpenEliminar(`/biblioteca/carpeta/subcarpeta/${carpeta.id}`, `Carpeta ${carpeta.nombre}`); }} className="text-gray-300 hover:text-red-500 cursor-pointer transition-all" title="Eliminar">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                        </div>

                        <div onClick={() => handleFolderClick(carpeta)} className="cursor-pointer w-full flex items-center gap-3">
                          <svg className="w-8 h-8 text-orange-400 group-hover:text-orange-500 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></svg>
                          <h3 className="font-extrabold text-[#151E28] text-[0.90rem] leading-tight truncate" title={carpeta.nombre}>{carpeta.nombre}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Render de Archivos */}
              {(currentItems.archivos.length > 0 || (currentItems.carpetas.length === 0 && pathStack.length > 0)) && (
                <div className="overflow-x-auto mt-4">
                  {currentItems.archivos.length > 0 && <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 px-6 lg:px-8">Archivos en esta carpeta</h3>}
                  <table className="w-full text-left border-collapse min-w-237.5">
                    {currentItems.archivos.length > 0 && (
                      <thead>
                        <tr className="bg-gray-50 border-y border-gray-200 text-[0.70rem] font-bold uppercase tracking-widest text-gray-500">
                          <th className="px-6 py-4 w-[35%]">Archivo</th>
                          <th className="px-6 py-4 w-[20%]">Subido Por</th>
                          <th className="px-6 py-4 w-[15%]">Fecha</th>
                          <th className="px-6 py-4 w-[20%]">Observación</th>
                          <th className="px-6 py-4 text-center w-[10%]">Acciones</th>
                        </tr>
                      </thead>
                    )}
                    <tbody className="text-[0.85rem] divide-y divide-gray-100">
                      {currentItems.archivos.map(archivo => (
                        <tr key={archivo.id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-6 py-4 font-bold text-blue-200 flex items-center gap-3">
                            <div className={`w-8 h-8 rounded flex items-center justify-center border shrink-0 ${archivo.tipo === 'pdf' ? 'bg-red-50 text-red-500 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 384 512"><path d="M181.9 256.1c-5-16-4.9-46.9-2-46.9 8.4 0 7.6 36.9 2 46.9zm-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7 18.3-7 39-17.2 62.9-41.9-22.7-1-40.4-8.8-34.5-20.8zm-78.8 115.3c-.5-1.1 1-3 1-3 11.1-20.9 25.9-46.4 46.3-80.1-15.6 15-32 30-47.3 83.1zM384 121.9v358.1c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V32C0 14.3 14.3 0 32 0h224l128 121.9z" /></svg>
                            </div>
                            <span className="cursor-pointer group-hover:text-orange-500 transition-colors truncate">{archivo.nombre_archivo}</span>
                          </td>
                          <td className="px-6 py-4 text-blue-200 font-semibold">{archivo.subido_por?.nombre} {archivo.subido_por?.apellido}</td>
                          <td className="px-6 py-4 text-gray-600 font-medium">{new Date(archivo.created_at).toLocaleDateString()}</td>
                          <td className="px-6 py-4 text-gray-500 text-[0.8rem] italic">{archivo.observacion_cliente || 'Sin observación.'}</td>
                          <td className="px-6 py-4 text-center">
                            <button onClick={() => onOpenEliminar && onOpenEliminar(`/deleteDocumento/${archivo.id}`, `Archivo ${archivo.nombre_archivo}`)} className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all cursor-pointer mr-2" title="Eliminar">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                            <a href={`${BASE_URL}/storage/${archivo.url_archivo}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:bg-orange-500 hover:text-white transition-all" title="Descargar">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {currentItems.archivos.length === 0 && currentItems.carpetas.length === 0 && (
                    <div className="py-20 text-center text-gray-400 italic">Carpeta vacía. No hay documentos ni subcarpetas.</div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </ScrollReveal>
  );
};

export default Biblioteca;