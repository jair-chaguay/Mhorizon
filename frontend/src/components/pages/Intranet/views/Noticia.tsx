import React from 'react';
import { ScrollReveal } from '../../../ScrollReveal';

interface NoticiasProps {
  onOpenRedactar: () => void;
  onOpenEliminar: (id: string, title: string) => void;
}

const Noticias: React.FC<NoticiasProps> = ({ onOpenRedactar, onOpenEliminar }) => {
  // Datos mock para la tabla de noticias
  const noticiasList = [
    {
      id: '1',
      imagen: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=200&auto=format&fit=crop',
      titulo: 'SRI incrementa al 3% la retención sobre rendimientos',
      fuente: 'AENA',
      url: 'https://aena.com.ec/ecuador-sri...'
    },
    {
      id: '2',
      imagen: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=200&auto=format&fit=crop',
      titulo: 'SRI amplía plazo para declaraciones de impuestos',
      fuente: 'Lexis',
      url: 'https://www.lexis.com.ec/noticias...'
    },
    {
      id: '3',
      imagen: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=200&auto=format&fit=crop',
      titulo: 'Deuda al SRI asciende a USD 2.388 millones',
      fuente: 'Primicias',
      url: 'https://www.primicias.ec/economia...'
    }
  ];

  return (
    <ScrollReveal className="max-w-350 mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 reveal-element">
        <div>
          <h1 className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-blue-200 tracking-tight leading-tight">
            Gestor de Noticias Home
          </h1>
          <p className="text-gray-500 font-light mt-1 text-[1rem]">Administre las noticias que aparecen en el carrusel de Radar Financiero.</p>
        </div>
        <button 
          onClick={onOpenRedactar} 
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
                <th className="px-6 py-4">Título de la Noticia</th>
                <th className="px-6 py-4">Fuente</th>
                <th className="px-6 py-4">URL Destino</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-[0.85rem] divide-y divide-gray-100">
              {noticiasList.map((noticia) => (
                <tr key={noticia.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <img src={noticia.imagen} className="w-12 h-12 object-cover rounded-md border border-gray-200" alt="Thumb" />
                  </td>
                  <td className="px-6 py-4 font-bold text-blue-200 max-w-62.5 truncate" title={noticia.titulo}>
                    {noticia.titulo}
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">
                    {noticia.fuente}
                  </td>
                  <td className="px-6 py-4 text-blue-500 hover:underline max-w-50 truncate">
                    <a href="#" target="_blank" rel="noreferrer">{noticia.url}</a>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={onOpenRedactar} 
                        className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200 text-gray-500 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-all flex items-center justify-center" 
                        title="Editar"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                      </button>
                      <button 
                        onClick={() => onOpenEliminar(noticia.id, 'Noticia')} 
                        className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center justify-center" 
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
      </div>
    </ScrollReveal>
  );
};

export default Noticias;