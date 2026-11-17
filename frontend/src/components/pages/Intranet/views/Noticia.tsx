import React, { useEffect, useState } from 'react';
import { ScrollReveal } from '../../../ScrollReveal';
import api from '../../../../api/axios';

interface Noticia {
  id: number;
  titulo: string;
  fuente: string;
  categoria: string
  descripcion_corta: string;
  url_destino: string;
  imagen_url: string | null;
  creador?: {
    id: number;
    nombre: string;
    apellido: string;
  };
}

interface NoticiasProps {
  onOpenRedactar: (info?: Noticia) => void;
  onOpenEliminar: (id: number, title: string) => void;
}

const Noticias: React.FC<NoticiasProps> = ({ onOpenRedactar, onOpenEliminar }) => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = 'https://api.mhorizon.com.ec';
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchNoticias = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/noticia');
      setNoticias(data.noticias || data);
    } catch (error) {
      console.error("Error al cargar noticias:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Volver a la página 1 cuando el usuario busca algo
  };

  const filteredNoticias = noticias.filter((info) => {
    const tituloMatch = info.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const descripcionMatch = info.descripcion_corta.toLowerCase().includes(searchTerm.toLowerCase());
    const fuenteMatch = info.fuente.toLowerCase().includes(searchTerm.toLowerCase());
    return tituloMatch || descripcionMatch || fuenteMatch
  })

  const totalPages = Math.ceil(filteredNoticias.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNoticias = filteredNoticias.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    if(currentPage < totalPages) setCurrentPage(currentPage+1);
  }

    const goToPreviousPage = () => {
    if(currentPage > 1) setCurrentPage(currentPage - 1);
  }



  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
        <p className="text-slate-400 text-sm animate-pulse">Cargando Noticias...</p>
      </div>
    );
  }

  return (
    <ScrollReveal className="max-w-350 mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 reveal-element">
        <div>
          <h1 className="text-xl sm:text-[22px] font-medium text-slate-900 tracking-tight leading-tight">
            Gestor de Noticias
          </h1>
          <p className="text-slate-500 mt-1 text-base">Administre las noticias del Radar Financiero (mínimo 4/5).</p>
        </div>
        <button
          onClick={() => onOpenRedactar()}
          className="bg-brand-600 cursor-pointer text-white text-[13px] font-medium px-6 py-2.5 rounded-lg hover:bg-brand-700 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          Añadir Noticia
        </button>
      </div>

      <div className='reveal-element bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3'>
        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" placeholder='Buscar noticia...' value={searchTerm} onChange={handleSearch}
            className="w-full outline-none text-sm text-slate-600 placeholder-slate-400 bg-transparent"
        />
      </div>

      <div className="bg-white rounded-xl border reveal-element border-slate-200 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-250">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-medium text-slate-500">
                <th className="px-6 py-4 w-16">Imagen</th>
                <th className="px-6 py-4">Título</th>
                <th className="px-6 py-4">Fuente</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Enlace</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {currentNoticias.map((noticia) => (
                <tr key={noticia.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    {noticia.imagen_url ? (
                      <img
                        src={`${BASE_URL}/storage/${noticia.imagen_url}`}
                        className="w-12 h-12 object-cover rounded-md border border-slate-200"
                        alt="Preview"
                        onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/150?text=No+Image"; }}
                      />
                    ) : (
                      <div className="w-12 h-12 bg-slate-100 rounded-md flex items-center justify-center text-xs text-slate-400">N/A</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-62.5">
                      <p className="font-medium text-slate-900 truncate" title={noticia.titulo}>{noticia.titulo}</p>
                      <p className="text-xs text-slate-400 truncate">{noticia.descripcion_corta}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">
                    <span className="bg-brand-50 text-brand-700 px-2 py-0.5 rounded text-xs font-medium">
                      {noticia.fuente}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">
                    <span className="bg-brand-50 text-brand-700 px-2 py-0.5 rounded text-xs font-medium">
                      {noticia.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-blue-500">
                    <a href={noticia.url_destino} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                      Link <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </a>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="cursor-pointer w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-brand-50 text-slate-400 hover:text-brand-700 transition-all"
                        title="Editar"
                        onClick={() => onOpenRedactar(noticia)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onOpenEliminar(noticia.id, noticia.titulo)}
                        className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200 text-slate-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center justify-center"
                        title="Eliminar"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredNoticias.length > 0 && (
          <div className='px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between'>
            <span className="text-xs text-slate-500 font-medium">
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredNoticias.length)} de {filteredNoticias.length} resultados
            </span>
            <div className='flex items-center gap-2'>
              <button 
                onClick={goToPreviousPage} 
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <span className="text-xs font-medium text-slate-600 px-2">
                Página {currentPage} de {totalPages || 1}
              </span>
              <button 
                onClick={goToNextPage} 
                disabled={currentPage >= totalPages}
                className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        )}


        {filteredNoticias.length === 0 && (
          <div className="py-12 text-center text-slate-400 italic">No hay noticias registradas.</div>
        )}
      </div>
    </ScrollReveal>
  );
};

export default Noticias;