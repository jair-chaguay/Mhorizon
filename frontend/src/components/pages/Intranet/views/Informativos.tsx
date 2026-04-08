import React, { useEffect, useState } from 'react';
import { ScrollReveal } from '../../../ScrollReveal';
import api from '../../../../api/axios';

interface InformativosProps {
  onOpenRedactar: (info?: Informativo) => void;
  onOpenEliminar: (id: number, title: string) => void; 
}

interface Informativo {
  id: number;
  categoria: string;
  titulo: string;
  resolucion_oficial: string | null;
  contenido: string;
  imagen_portada_url: string | null;
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
          onClick={()=>onOpenRedactar()}
          className="bg-orange-500 cursor-pointer text-white text-[0.8rem] font-bold uppercase tracking-widest px-6 py-3.5 rounded-lg shadow-lg hover:bg-blue-200 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Redactar Informativo
        </button>
      </div>

      <div className="bg-white reveal-element rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-225">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[0.70rem] font-bold uppercase tracking-widest text-gray-500">
                <th className="px-6 py-4">Título del Informativo</th>
                <th className="px-6 py-4">Resolución</th>
                <th className="px-6 py-4 hidden md:table-cell">Imagen Portada</th>
                <th className="px-6 py-4">Fecha Creada</th>
                <th className="px-6 py-4">Creado Por</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-[0.85rem] divide-y divide-gray-100">
              {informativos.map((info) => (
                <tr key={info.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div>
                        <p className="font-bold text-blue-200">{info.titulo}</p>
                        <span className="text-[0.65rem] bg-blue-50 text-blue-500 px-2 py-0.5 rounded uppercase font-bold tracking-tighter">
                            {info.categoria}
                        </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-gray-500 font-mono text-[0.75rem]">
                    {info.resolucion_oficial || 'N/A'}
                  </td>

                  <td className="px-6 py-5 text-[0.75rem] hidden md:table-cell text-gray-400">
                    {info.imagen_portada_url ? (
                      <div className="flex items-center gap-2 text-orange-500">
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="truncate max-w-30 font-medium italic">Imagen adjunta</span>
                      </div>
                    ) : (
                      <span className="italic">Sin imagen</span>
                    )}
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
                        onClick={()=>onOpenRedactar(info)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onOpenEliminar(info.id, info.titulo)}
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
              ))}
            </tbody>
          </table>
        </div>
        {informativos.length === 0 && (
            <div className="py-20 text-center text-gray-400 italic">
                No hay informativos publicados actualmente.
            </div>
        )}
      </div>
    </ScrollReveal>
  );
};

export default Informativos;