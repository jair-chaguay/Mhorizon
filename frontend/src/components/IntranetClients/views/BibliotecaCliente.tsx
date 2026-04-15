/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { ScrollReveal } from '../../ScrollReveal';
import api from '../../../api/axios';

type NavLevel = 'ROOT' | 'PERIODOS' | 'SUBCARPETAS' | 'SUBCARPETAS_HIJAS' | 'ARCHIVOS';




const BibliotecaCliente: React.FC = () => {
  const [navLevel, setNavLevel] = useState<NavLevel>('PERIODOS');
  const [path, setPath] = useState({ cliente: '', periodo: '', subcarpeta: '', subcarpetaHija: '' });

  const [periodos, setPeriodos] = useState<any[]>([]);
  const [subcarpetas, setSubcarpetas] = useState<any[]>([]);
  const [subcarpetasHijas, setSubcarpetasHijas] = useState<any[]>([]);
  const [archivos, setArchivos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectionIds, setSelectionIds] = useState({
    clienteId: null as number | null,
    periodoId: null as number | null,
    subcarpetaId: null as number | null
  });

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.cliente_id) {
        setSelectionIds(prev => ({ ...prev, clienteId: user.cliente_id }));
        fetchBiblioteca(user.cliente_id);
      }
    }
  }, []);

  const fetchBiblioteca = async (cId: number) => {
    try {
      setLoading(true);
      const { data } = await api.get(`/biblioteca/arbol/${cId}`)
      const tree = data.biblioteca || [];
      setPeriodos(tree);
      setPath(prev => ({ ...prev, cliente: data.cliente }));

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
      console.error("Error al cargar periodos: ", error);
    } finally {
      setLoading(false);
    }
  }

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
  }

  const handleBack = () => {
    if (navLevel === 'SUBCARPETAS') {
      setNavLevel('PERIODOS');
    } else if (navLevel === 'SUBCARPETAS_HIJAS') {
      setPath({ ...path, subcarpeta: '', subcarpetaHija: '' });
      setNavLevel('SUBCARPETAS')
    } else if (navLevel === 'ARCHIVOS') {
      if (path.subcarpetaHija !== '') {
        setPath({ ...path, subcarpetaHija: '' });
        setNavLevel('SUBCARPETAS_HIJAS');
      } else {
        setPath({ ...path, subcarpeta: '' });
        setNavLevel('SUBCARPETAS');
      }
    }
  };

  if (loading && navLevel === 'PERIODOS') return <div className="p-20 text-center text-blue-200 animate-pulse">Cargando Directorio...</div>;




  return (
    <ScrollReveal>
      <div className='max-w-350 mx-auto space-y-6 reveal-element'>

        {navLevel !== 'PERIODOS' && (
          <div className="flex items-center gap-4 mb-2 animate-fadeIn">
            <button onClick={handleBack} className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-orange-500 transition-colors shadow-sm cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>
            <div className='flex items-center text-sm font-medium text-gray-500 truncate'>
              <span className="cursor-pointer hover:text-orange-500 transition-colors" onClick={() => setNavLevel('PERIODOS')}>Biblioteca</span>

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
              {navLevel === 'PERIODOS' ? 'Periodos Fiscales' :
                navLevel === 'SUBCARPETAS' ? 'Áreas Operativas' : 'Documentos'}
            </h1>
            <p className="text-gray-500 font-light mt-1 text-[1rem]">
              {navLevel === 'PERIODOS' ? 'Nivel 1: Seleccione el año fiscal.' :
                navLevel === 'SUBCARPETAS' ? 'Nivel 2: Seleccione la subcarpeta donde desea observar sus documentos.' :
                  'Nivel 3: Lista de archivos con detalles exigidos.'}
            </p>
          </div>
        </div>

        <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden ${navLevel !== 'ARCHIVOS' ? 'p-6 lg:p-8' : ''} animate-fadeIn delay-100`}>

          {navLevel === 'PERIODOS' && (
            <ScrollReveal className="flex flex-col">
              {periodos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
                  {periodos.map(periodo => (
                    <div key={periodo.id} onClick={() => handlePeriodoClick(periodo)} className="reveal-element border border-orange-200 bg-orange-50 rounded-2xl p-5 hover:bg-orange-100 transition-all cursor-pointer flex flex-col items-center text-center shadow-sm group">
                      <svg className="w-12 h-12 text-orange-500 mb-2 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></svg>
                      <h3 className="font-extrabold text-orange-700 text-[1.1rem]">{periodo.anio}</h3>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center text-gray-400">
                  <p>Aún no hay periodos fiscales registrados en su biblioteca.</p>
                </div>
              )}
            </ScrollReveal>
          )}

          {navLevel === 'SUBCARPETAS' && (
            <ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 reveal-element">
                {subcarpetas.map((sub) => (
                  <div key={sub.id} onClick={() => handleSubcarpetaClick(sub)} className="border border-gray-200 bg-gray-50 rounded-xl p-5 hover:bg-white hover:border-orange-500 hover:shadow-md transition-all cursor-pointer group flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-orange-500 transition-colors shrink-0">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></svg>
                    </div>
                    <h3 className="font-extrabold text-blue-200 text-[0.95rem] leading-tight">{sub.nombre}</h3>
                  </div>
                ))}
                {subcarpetas.length === 0 && <p className="text-gray-400 italic">No hay carpetas creadas en este periodo.</p>}
              </div>
            </ScrollReveal>
          )}

          {navLevel === 'SUBCARPETAS_HIJAS' && (
            <ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {subcarpetasHijas.map((hija) => (
                  <div key={hija.id} onClick={() => handleSubcarpetaHijaClick(hija)} className="border border-orange-200 bg-orange-50 rounded-xl p-5 hover:bg-orange-100 hover:shadow-md transition-all cursor-pointer group flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg shadow-sm border border-orange-100 flex items-center justify-center text-orange-500 transition-colors shrink-0">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></svg>
                    </div>
                    <h3 className="font-extrabold text-[#151E28] text-[0.95rem] leading-tight">{hija.nombre}</h3>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}

          {navLevel === 'ARCHIVOS' && (
            <ScrollReveal className="flex flex-col">
              <div className="px-6 py-5 border-b reveal-element border-gray-100 flex items-center justify-between bg-white">
                <div className="relative w-full lg:w-72">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  <input type="text" placeholder="Buscar archivo..." className="pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[0.85rem] focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none w-full transition-all text-blue-200" />
                </div>
              </div>
              <div className="overflow-x-auto reveal-element">
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
                          {/* Botón de descarga con el href dinámico a la URL del archivo */}
                          <a href={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/storage/${archivo.url_archivo}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:bg-orange-500 hover:text-white transition-all cursor-pointer" title="Descargar">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {archivos.length === 0 && <div className="py-20 text-center text-gray-400 italic">No hay documentos en esta carpeta.</div>}
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default BibliotecaCliente;