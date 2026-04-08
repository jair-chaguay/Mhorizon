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

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        <p className="text-gray-400 text-sm animate-pulse uppercase tracking-widest">Cargando Noticias...</p>
      </div>
    );
  }

  return (
    <ScrollReveal className="max-w-350 mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 reveal-element">
        <div>
          <h1 className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-blue-200 tracking-tight leading-tight">
            Gestor de Noticias Home
          </h1>
          <p className="text-gray-500 font-light mt-1 text-[1rem]">Administre las noticias del Radar Financiero.</p>
        </div>
        <button
          onClick={() => onOpenRedactar()}
          className="bg-orange-500 cursor-pointer text-white text-[0.8rem] font-bold uppercase tracking-widest px-6 py-3.5 rounded-lg shadow-lg hover:bg-blue-200 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          Añadir Noticia
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border reveal-element border-gray-200 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-250">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[0.70rem] font-bold uppercase tracking-widest text-gray-500">
                <th className="px-6 py-4 w-16">Imagen</th>
                <th className="px-6 py-4">Título</th>
                <th className="px-6 py-4">Fuente</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Enlace</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-[0.85rem] divide-y divide-gray-100">
              {noticias.map((noticia) => (
                <tr key={noticia.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    {noticia.imagen_url ? (
                      <img
                        src={`http://localhost:8000/storage/${noticia.imagen_url}`}
                        className="w-12 h-12 object-cover rounded-md border border-gray-200"
                        alt="Preview"
                        onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/150?text=No+Image"; }}
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-[0.6rem] text-gray-400">N/A</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-62.5">
                      <p className="font-bold text-blue-200 truncate" title={noticia.titulo}>{noticia.titulo}</p>
                      <p className="text-[0.7rem] text-gray-400 truncate">{noticia.descripcion_corta}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">
                    <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded text-[0.7rem] font-bold uppercase">
                      {noticia.fuente}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">
                    <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded text-[0.7rem] font-bold uppercase">
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
                        className="cursor-pointer w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-orange-50 text-gray-400 hover:text-orange-600 transition-all"
                        title="Editar"
                        onClick={() => onOpenRedactar(noticia)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onOpenEliminar(noticia.id, noticia.titulo)}
                        className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center justify-center"
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
        {noticias.length === 0 && (
          <div className="py-12 text-center text-gray-400 italic">No hay noticias registradas.</div>
        )}
      </div>
    </ScrollReveal>
  );
};

export default Noticias;