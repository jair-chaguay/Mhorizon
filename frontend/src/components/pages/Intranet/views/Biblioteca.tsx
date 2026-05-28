/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { ScrollReveal } from '../../../ScrollReveal';
import api from '../../../../api/axios';

type NavLevel = 'ROOT' | 'PERIODOS' | 'SUBCARPETAS' | 'SUBCARPETAS_HIJAS' | 'ARCHIVOS';


interface BibliotecaProps {
  onOpenCrear: (config: { title: string; placeholder: string; type: 'ROOT' | 'PERIODOS' | 'SUBCARPETAS'; parentId: number | null }) => void;
  onOpenSubir: (subcarpetaId: number) => void;
  refreshSignal: number;
  directTo?: { clienteId: number; periodoId: number } | null;
  onOpenEliminar?: (endpoint: string, titulo: string) => void;
  onOpenEditar?: (config: { endpoint: string; currentName: string; title: string }) => void;
}

const Biblioteca: React.FC<BibliotecaProps> = ({ onOpenCrear, onOpenSubir, refreshSignal, directTo, onOpenEliminar, onOpenEditar }) => {
  const [navLevel, setNavLevel] = useState<NavLevel>('ROOT');
  const [path, setPath] = useState({ cliente: '', periodo: '', subcarpeta: '', subcarpetaHija: '' });

  const BASE_URL = 'https://api.miltonmontece.com';
  const [selectionIds, setSelectionIds] = useState({
    clienteId: null as number | null,
    periodoId: null as number | null,
    subcarpetaId: null as number | null
  });

  const [clientes, setClientes] = useState<any[]>([]);
  const [periodos, setPeriodos] = useState<any[]>([]);
  const [subcarpetas, setSubcarpetas] = useState<any[]>([]);
  const [subcarpetasHijas, setSubcarpetasHijas] = useState<any[]>([]);
  const [archivos, setArchivos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/clientes/biblioteca');
      const arrayDeClientes = Array.isArray(data) ? data : data.clientes || [];
      setClientes(arrayDeClientes);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
    } finally {
      setLoading(false);
    }
  };


  const refreshTree = async (cId: number) => {
    try {
      const { data } = await api.get(`/biblioteca/arbol/${cId}`);
      const tree = data.biblioteca || []
      setPeriodos(tree);

      if (selectionIds.periodoId) {
        const currentPeriodo = tree.find((p: any) => p.id === selectionIds.periodoId);
        if (currentPeriodo) {
          setSubcarpetas(currentPeriodo.subcarpetas || []);

          if (selectionIds.subcarpetaId) {
            const currentSub = (currentPeriodo.subcarpetas || []).find((s: any) => s.id === selectionIds.subcarpetaId);
            if (currentSub) {
              setArchivos(currentSub.documentos || []);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error al cargar periodos:", error)
    }
  }

  useEffect(() => {
    if (navLevel === 'ROOT') fetchClientes();
  }, [navLevel]);


  useEffect(() => {
    if (refreshSignal > 0) {
      if (navLevel === 'ROOT') {
        fetchClientes();
      } else if (selectionIds.clienteId) {
        refreshTree(selectionIds.clienteId);
      }
    }
  }, [refreshSignal]);


  useEffect(() => {
    if (directTo) {
      const jumpToPeriod = async () => {
        try {
          setLoading(true);
          const { data } = await api.get(`/biblioteca/arbol/${directTo.clienteId}`);
          const tree = data.biblioteca || [];

          setPeriodos(tree);

          const targetPeriod = tree.find((p: any) => p.id === directTo.periodoId);

          if (targetPeriod) {
            setSelectionIds({ clienteId: directTo.clienteId, periodoId: targetPeriod.id, subcarpetaId: null });
            setPath({ cliente: data.cliente, periodo: targetPeriod.anio, subcarpeta: '', subcarpetaHija: '' });
            setSubcarpetas(targetPeriod.subcarpetas || []);
            setNavLevel('SUBCARPETAS');
          }
        } catch (error) {
          console.error("Error en salto directo:", error);
        } finally {
          setLoading(false);
        }
      };

      jumpToPeriod();
    }
  }, [directTo]);


  const handleClientClick = async (cliente: any) => {
    setSelectionIds(prev => ({ ...prev, clienteId: cliente.id }));
    setPath({ ...path, cliente: cliente.razon_social_nombres });

    try {
      setLoading(true);
      const { data } = await api.get(`/biblioteca/arbol/${cliente.id}`);

      setPeriodos(data.biblioteca || []);
      setNavLevel('PERIODOS');
    } catch (error) {
      console.error("Error al cargar la biblioteca:", error);
      setNavLevel('PERIODOS');
    } finally {
      setLoading(false);
    }
  };

  const handlePeriodoClick = (periodo: any) => {
    setPath({ ...path, periodo: periodo.anio });
    setSelectionIds({ ...selectionIds, periodoId: periodo.id });
    setSubcarpetas(periodo.subcarpetas);
    setNavLevel('SUBCARPETAS');
  };

  const handleSubcarpetaClick = (sub: any) => {
    setPath({ ...path, subcarpeta: sub.nombre });
    setSelectionIds({ ...selectionIds, subcarpetaId: sub.id });
    if (sub.subcarpetas && sub.subcarpetas.length > 0) {
      setSubcarpetasHijas(sub.subcarpetas);
      setNavLevel('SUBCARPETAS_HIJAS');
    } else {
      setArchivos(sub.documentos || []);
      setNavLevel('ARCHIVOS');
    }
  };

  const handleSubcarpetaHijaClick = (hija: any) => {
    setPath({ ...path, subcarpetaHija: hija.nombre });
    setSelectionIds({ ...selectionIds, subcarpetaId: hija.id });
    setArchivos(hija.documentos || []);
    setNavLevel('ARCHIVOS');
  };

  const handleBack = () => {
    if (navLevel === 'PERIODOS') {
      setNavLevel('ROOT');
    }
    else if (navLevel === 'SUBCARPETAS') {
      setNavLevel('PERIODOS');
    }
    else if (navLevel === 'SUBCARPETAS_HIJAS') {
      setPath({ ...path, subcarpeta: '', subcarpetaHija: '' });
      setNavLevel('SUBCARPETAS');
    }
    else if (navLevel === 'ARCHIVOS') {
      if (path.subcarpetaHija !== '') {
        setPath({ ...path, subcarpetaHija: '' });
        setNavLevel('SUBCARPETAS_HIJAS');
      } else {
        setPath({ ...path, subcarpeta: '' });
        setNavLevel('SUBCARPETAS');
      }
    }
  };

  const handleActionClick = () => {
    if (navLevel === 'ROOT') onOpenCrear({ title: 'Nuevo Cliente', placeholder: 'Razón Social...', type: 'ROOT', parentId: null });
    if (navLevel === 'PERIODOS') onOpenCrear({ title: 'Nuevo Periodo Fiscal', placeholder: 'Ej. 2026', type: 'PERIODOS', parentId: selectionIds.clienteId });
    if (navLevel === 'SUBCARPETAS') onOpenCrear({ title: 'Nueva Subcarpeta', placeholder: 'Ej. Declaraciones', type: 'SUBCARPETAS', parentId: selectionIds.periodoId });
    if (navLevel === 'ARCHIVOS' && selectionIds.subcarpetaId) onOpenSubir(selectionIds.subcarpetaId);
  };

  if (loading && navLevel === 'ROOT') return <div className="p-20 text-center text-blue-200 animate-pulse">Cargando Directorio...</div>;

  return (
    <ScrollReveal>
      <div className="max-w-350 mx-auto space-y-6 reveal-element">

        {navLevel !== 'ROOT' && (
          <div className="flex items-center gap-4 mb-2 animate-fadeIn">
            <button onClick={handleBack} className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-orange-500 transition-colors shadow-sm cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>
            <div className="flex items-center text-sm font-medium text-gray-500 truncate">
              <span className="cursor-pointer hover:text-orange-500 transition-colors" onClick={() => setNavLevel('ROOT')}>Biblioteca</span>

              {path.cliente && (
                <>
                  <svg className="w-4 h-4 mx-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  <span className={`transition-colors ${navLevel === 'PERIODOS' ? 'text-blue-200 font-bold' : 'cursor-pointer hover:text-orange-500'}`} onClick={() => setNavLevel('PERIODOS')}>
                    {path.cliente}
                  </span>
                </>
              )}

              {(navLevel === 'SUBCARPETAS' || navLevel === 'SUBCARPETAS_HIJAS' || navLevel === 'ARCHIVOS') && (
                <>
                  <svg className="w-4 h-4 mx-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  <span className={`transition-colors ${navLevel === 'SUBCARPETAS' ? 'text-blue-200 font-bold' : 'cursor-pointer hover:text-orange-500'}`} onClick={() => setNavLevel('SUBCARPETAS')}>
                    {path.periodo}
                  </span>
                </>
              )}

              {(navLevel === 'SUBCARPETAS_HIJAS' || (navLevel === 'ARCHIVOS' && path.subcarpetaHija)) && (
                <>
                  <svg className="w-4 h-4 mx-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  <span className={`transition-colors ${navLevel === 'SUBCARPETAS_HIJAS' ? 'text-blue-200 font-bold' : 'cursor-pointer hover:text-orange-500'}`} onClick={() => setNavLevel('SUBCARPETAS_HIJAS')}>
                    {path.subcarpeta}
                  </span>
                </>
              )}

              {navLevel === 'ARCHIVOS' && (
                <>
                  <svg className="w-4 h-4 mx-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  <span className="text-blue-200 font-bold">
                    {path.subcarpetaHija || path.subcarpeta}
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-blue-200 tracking-tight leading-tight">
              {navLevel === 'ROOT' ? 'Biblioteca de Operatividad' :
                navLevel === 'PERIODOS' ? 'Periodos Fiscales' :
                  navLevel === 'SUBCARPETAS' ? 'Áreas Operativas' : 'Documentos'}
            </h1>
            <p className="text-gray-500 font-light mt-1 text-[1rem]">
              {navLevel === 'ROOT' ? 'Nivel 1: Seleccione el Directorio del Cliente.' :
                navLevel === 'PERIODOS' ? 'Nivel 2: Seleccione el año fiscal.' :
                  navLevel === 'SUBCARPETAS' ? 'Nivel 3: Seleccione la subcarpeta operativa.' :
                    'Nivel 4: Lista de archivos con detalles exigidos.'}
            </p>
          </div>
          <button onClick={handleActionClick} className="bg-blue-200 cursor-pointer text-white text-[0.8rem] font-bold uppercase tracking-widest px-6 py-3.5 rounded-lg shadow-lg hover:bg-orange-500 transition-all flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={navLevel === 'ARCHIVOS' ? "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" : "M12 6v6m0 0v6m0-6h6m-6 0H6"} /></svg>
            {navLevel === 'ROOT' ? 'Crear Carpeta Cliente' : navLevel === 'PERIODOS' ? 'Crear Periodo' : navLevel === 'SUBCARPETAS' ? 'Crear Subcarpeta' : 'Subir Archivo'}
          </button>
        </div>

        <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden ${navLevel !== 'ARCHIVOS' ? 'p-6 lg:p-8' : ''} animate-fadeIn`}>

          {navLevel === 'ROOT' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {clientes?.map((cliente) => (
                <div key={cliente.id} onClick={() => handleClientClick(cliente)} className="relative border border-gray-200 rounded-2xl p-6 hover:border-orange-500 hover:shadow-lg transition-all cursor-pointer group bg-gray-50 hover:bg-white flex flex-col items-center text-center">

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenEliminar && onOpenEliminar(`/cliente/${cliente.id}`, `Directorio de ${cliente.razon_social_nombres}`);
                    }}
                    className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                    title="Eliminar Cliente"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>

                  <svg className="w-16 h-16 text-gray-400 group-hover:text-orange-500 mb-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></svg>
                  <h3 className="font-extrabold text-blue-200 text-[1.05rem] leading-tight">{cliente.razon_social_nombres}</h3>
                  <p className="text-[0.70rem] text-gray-500 font-medium mt-2 uppercase tracking-widest">Carpeta Raíz</p>
                </div>
              ))}
            </div>
          )}

          {navLevel === 'PERIODOS' && (
            <div className="flex flex-col h-full">
              {periodos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 p-8">
                  {periodos.map(p => (
                    <div key={p.id} className="relative border border-orange-200 bg-orange-50 rounded-2xl p-5 hover:bg-orange-100 transition-all group flex flex-col items-center text-center shadow-sm">
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all flex gap-2 z-10">
                        <button
                          onClick={(e) => { e.stopPropagation(); onOpenEditar && onOpenEditar({ endpoint: `/biblioteca/carpeta/periodo/${p.id}`, currentName: p.anio.toString(), title: 'Editar Periodo' }); }}
                          className="text-orange-300 hover:text-blue-500 cursor-pointer transition-all"
                          title="Editar Periodo"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); onOpenEliminar && onOpenEliminar(`/biblioteca/carpeta/periodo/${p.id}`, `Periodo ${p.anio}`); }}
                          className="text-orange-300 hover:text-red-500 cursor-pointer transition-all"
                          title="Eliminar Periodo"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </div>
                      <div onClick={() => handlePeriodoClick(p)} className="cursor-pointer w-full flex flex-col items-center">
                        <svg className="w-12 h-12 text-orange-500 mb-2 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></svg>
                        <h3 className="font-extrabold text-orange-700 text-[1.1rem]">{p.anio}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                  <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-4 border border-orange-100">
                    <svg className="w-10 h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-blue-200 font-bold text-lg">No hay periodos fiscales</h3>
                  <p className="text-gray-400 text-sm max-w-xs mt-2 mb-6">
                    Aún no se han registrado años de operatividad para <span className="text-orange-500 font-semibold">{path.cliente}</span>.
                  </p>
                  <button
                    onClick={handleActionClick}
                    className="bg-blue-200 text-white px-6 py-3 rounded-xl font-bold uppercase text-[0.7rem] tracking-widest hover:bg-orange-500 transition-all shadow-md"
                  >
                    + Crear Primer Periodo
                  </button>
                </div>
              )}
            </div>
          )}

          {navLevel === 'SUBCARPETAS' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {subcarpetas.map((sub) => (
                <div key={sub.id} className="relative border border-gray-200 bg-gray-50 rounded-xl p-5 hover:bg-white hover:border-orange-500 hover:shadow-md transition-all group flex items-center gap-4">
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all flex gap-2 z-10">
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenEditar && onOpenEditar({ endpoint: `/biblioteca/carpeta/subcarpeta/${sub.id}`, currentName: sub.nombre, title: 'Editar Subcarpeta' }); }}
                      className="text-gray-300 hover:text-blue-500 cursor-pointer transition-all"
                      title="Editar Carpeta"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenEliminar && onOpenEliminar(`/biblioteca/carpeta/subcarpeta/${sub.id}`, `Carpeta ${sub.nombre}`); }}
                      className="text-gray-300 hover:text-red-500 cursor-pointer transition-all"
                      title="Eliminar Carpeta"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                  <div onClick={() => handleSubcarpetaClick(sub)} className="cursor-pointer w-full flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-orange-500 transition-colors shrink-0">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></svg>
                    </div>
                    <h3 className="font-extrabold text-blue-200 text-[0.95rem] leading-tight">{sub.nombre}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}

          {navLevel === 'SUBCARPETAS_HIJAS' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {subcarpetasHijas.map((hija) => (
                <div key={hija.id} onClick={() => handleSubcarpetaHijaClick(hija)} className="relative border border-orange-200 bg-orange-50 rounded-xl p-5 hover:bg-orange-100 hover:shadow-md transition-all cursor-pointer group flex items-center gap-4">

                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all flex gap-2 z-10">
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenEditar && onOpenEditar({ endpoint: `/biblioteca/carpeta/subcarpeta/${hija.id}`, currentName: hija.nombre, title: 'Editar Subcarpeta' }); }}
                      className="text-orange-300 hover:text-blue-500 cursor-pointer transition-all"
                      title="Editar Carpeta"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenEliminar && onOpenEliminar(`/biblioteca/carpeta/subcarpeta/${hija.id}`, `Carpeta ${hija.nombre}`); }}
                      className="text-orange-300 hover:text-red-500 cursor-pointer transition-all"
                      title="Eliminar Carpeta"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>

                  <div className="w-12 h-12 bg-white rounded-lg shadow-sm border border-orange-100 flex items-center justify-center text-orange-500 transition-colors shrink-0">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></svg>
                  </div>
                  <h3 className="font-extrabold text-[#151E28] text-[0.95rem] leading-tight">{hija.nombre}</h3>
                </div>
              ))}
            </div>
          )}

          {navLevel === 'ARCHIVOS' && (
            <div className="overflow-x-auto">
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
                  {archivos.map(archivo => (
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

                        <button onClick={() => onOpenEliminar && onOpenEliminar(`/deleteDocumento/${archivo.id}`, `Archivo ${archivo.nombre_archivo}`)} className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all cursor-pointer" title="Eliminar">
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
              {archivos.length === 0 && <div className="py-20 text-center text-gray-400 italic">No hay documentos en esta carpeta.</div>}
            </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default Biblioteca;