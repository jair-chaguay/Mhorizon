import React, { useEffect, useState } from 'react';
import { ScrollReveal } from '../../../ScrollReveal';
import api from '../../../../api/axios';

interface InformativosProps {
  onOpenRedactar: (info?: Informativo) => void;
  onOpenEliminar: (id: number, title: string) => void; 
}

interface Informativo {
  id: number;
  titulo: string;
  resolucion_oficial: string | null;
  descripcion_portada: string;
  contenido: string;
  imagen_portada_url: string | null;
  pdf_url: string | null;
  created_at: string;
  creador?: {
    id: number;
    nombre: string;
    apellido: string;
  };
}

const Informativos: React.FC<InformativosProps> = ({ onOpenRedactar, onOpenEliminar }) => {
  const [informativos, setInformativos] = useState<Informativo[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  const fetchInformativos = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/informativo');
      setInformativos(data.informativos);
    } catch (error) {
      console.error("Error al cargar informativos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInformativos();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const filteredInformativos = informativos.filter((info) => {
    const tituloMatch = info.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const resolucionMatch = info.resolucion_oficial?.toLowerCase().includes(searchTerm.toLowerCase());
    return tituloMatch || resolucionMatch;
  });

  const totalPages = Math.ceil(filteredInformativos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentInformativos = filteredInformativos.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        <p className="text-gray-400 text-sm animate-pulse uppercase tracking-widest">Cargando Informativos...</p>
      </div>
    );
  }

  return (
    <ScrollReveal className="max-w-350 mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 reveal-element">
        <div>
          <h1 className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-blue-200 tracking-tight leading-tight">
            Gestor de Informativos
          </h1>
          <p className="text-gray-500 font-light mt-1">Administre los boletines y publicaciones fiscales.</p>
        </div>
        <button
          onClick={() => onOpenRedactar()}
          className="bg-orange-500 cursor-pointer text-white text-[0.8rem] font-bold uppercase tracking-widest px-6 py-3.5 rounded-lg shadow-lg hover:bg-blue-200 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Redactar Informativo
        </button>
      </div>

      <div className="reveal-element bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-3">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          type="text" 
          placeholder="Buscar por título o resolución..." 
          value={searchTerm}
          onChange={handleSearch}
          className="w-full outline-none text-sm text-gray-600 placeholder-gray-400 bg-transparent"
        />
      </div>

      <div className="bg-white reveal-element rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left min-w-225">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[0.70rem] font-bold uppercase tracking-widest text-gray-500">
                <th className="px-6 py-4">Título del Informativo</th>
                <th className="px-6 py-4">Resolución</th>
                <th className="px-6 py-4 hidden md:table-cell">Archivos Adjuntos</th>
                <th className="px-6 py-4">Fecha Creada</th>
                <th className="px-6 py-4">Creado Por</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-[0.85rem] divide-y divide-gray-100">
              {currentInformativos.map((info) => (
                <tr key={info.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="font-medium text-blue-200 truncate max-w-xs" title={info.titulo}>
                      {info.titulo}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-gray-500 font-mono text-[0.75rem]">
                    {info.resolucion_oficial || 'N/A'}
                  </td>
                  <td className="px-6 py-5 text-[0.75rem] hidden md:table-cell text-gray-400">
                    <div className="flex flex-col gap-1.5">
                      {info.imagen_portada_url && (
                        <div className="flex items-center gap-2 text-orange-500">
                          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <span className="font-medium italic">Imagen</span>
                        </div>
                      )}
                      {info.pdf_url && (
                        <div className="flex items-center gap-2 text-red-500">
                          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                          <span className="font-medium italic">Documento PDF</span>
                        </div>
                      )}
                      {!info.imagen_portada_url && !info.pdf_url && (
                        <span className="italic">Sin adjuntos</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-gray-600 font-medium">
                    {new Date(info.created_at).toLocaleDateString('es-EC', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-5 font-medium text-blue-200">
                    {info.creador ? `${info.creador.nombre} ${info.creador.apellido}` : 'Sistema'}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="cursor-pointer w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-orange-50 text-gray-400 hover:text-orange-600 transition-all"
                        title="Editar"
                        onClick={() => onOpenRedactar(info)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button
                        onClick={() => onOpenEliminar(info.id, info.titulo)}
                        className="cursor-pointer w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all"
                        title="Eliminar"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInformativos.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredInformativos.length)} de {filteredInformativos.length} resultados
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={goToPreviousPage} 
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <span className="text-xs font-bold text-gray-600 px-2">
                Página {currentPage} de {totalPages || 1}
              </span>
              <button 
                onClick={goToNextPage} 
                disabled={currentPage >= totalPages}
                className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        )}

        {filteredInformativos.length === 0 && (
          <div className="py-20 text-center text-gray-400 italic">
            No se encontraron informativos.
          </div>
        )}
      </div>
    </ScrollReveal>
  );
};

export default Informativos;