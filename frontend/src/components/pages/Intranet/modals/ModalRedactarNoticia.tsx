import React, { useEffect, useState } from 'react';
import { ScrollReveal } from '../../../ScrollReveal';
import api from '../../../../api/axios';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  datosEdicion?: any,
}
const ModalRedactarNoticia: React.FC<Props> = ({ isOpen, onClose, onSuccess, datosEdicion }) => {
  const [titulo, setTitulo] = useState("");
  const [fuente, setFuente] = useState("");
  const [url, setUrl] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("Impuesto");
  const [imagen, setImagen] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (datosEdicion && isOpen) {
      setTitulo(datosEdicion.titulo || "");
      setFuente(datosEdicion.fuente || "");
      setUrl(datosEdicion.url_destino || "");
      setDescripcion(datosEdicion.descripcion_corta || "");
      setCategoria(datosEdicion.categoria || "Impuesto");
    } else {
      resetForm();
    }

  }, [datosEdicion, isOpen])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('fuente', fuente);
    formData.append('categoria', categoria);
    formData.append('descripcion_corta', descripcion);
    formData.append('url_destino', url);
    if (imagen) {
      formData.append('imagen', imagen);
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }

      if (datosEdicion) {
        formData.append('_method', 'PUT');
        await api.post(`/noticia/${datosEdicion.id}`, formData, config);
      } else {
        await api.post('/noticia', formData, config);
      }

      if (typeof onSuccess === 'function') {
        onSuccess(); 
      }
      onClose();
      resetForm();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      if (error.response && error.response.data.errors) {
            console.table(error.response.data.errors); 
            const primerError = Object.values(error.response.data.errors)[0];
            alert(`Error de validación: ${primerError}`);}
    } finally {
      setLoading(false);
    }
  }

  const resetForm = () => {
    setTitulo("");
    setFuente("");
    setUrl("");
    setDescripcion("");
    setImagen(null);
  };

  if (!isOpen) return null;


  return (
    <ScrollReveal className="fixed inset-0 bg-slate-900/50 z-110 flex justify-center items-center p-4 animate-fadeIn">
      <div className="bg-white reveal-element delay-200 rounded-xl shadow-2xl w-full max-w-2xl relative flex flex-col max-h-[90vh] scale-100 transition-transform duration-300">

        <div className="bg-white border-b border-slate-200 px-6 py-4 pr-12 relative shrink-0 rounded-t-xl">
          <span className="text-slate-500 font-medium text-xs mb-0.5 block">Radar Financiero (Home)</span>
          <h2 className="text-slate-900 font-semibold text-base leading-tight">Cargar / Editar Noticia</h2>
          <button onClick={onClose} className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-4 h-8 w-8 grid place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto no-scrollbar bg-slate-50 flex-1">
          <form id='form-noticia' className="space-y-5" onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Título de la Noticia</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                  placeholder="Ej. SRI incrementa al 3% la retención..."
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Categoría</label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                >
                  <option value="Impuesto">Impuesto</option>
                  <option value="Finanzas">Finanzas</option>
                  <option value="Economía">Economía</option>
                  <option value="Laboral">Laboral</option>
                  <option value="Societario">Societario</option>
                </select>
              </div>


            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Fuente (Medio)</label>
                <input
                  type="text"
                  value={fuente}
                  onChange={(e) => setFuente(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                  placeholder="Ej. Primicias, Lexis..."
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">URL de Redirección</label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                  placeholder="https://..."
                />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Descripción Corta</label>
              <textarea
                rows={3}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none resize-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                placeholder="Aparecerá en la franja del Home..."></textarea>
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Imagen de Portada</label>
              <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg p-2 focus-within:border-brand-600 transition-colors">
                <div className="w-10 h-10 bg-slate-50 rounded-md flex items-center justify-center text-slate-400 shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <input type="file"
                  accept="image/*"
                  onChange={(e) => setImagen(e.target.files ? e.target.files[0] : null)}
                  className=" w-full text-[13px] text-slate-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 transition-all cursor-pointer outline-none" />
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-slate-100 bg-white shrink-0 flex gap-3">
          <button onClick={onClose} className=" cursor-pointer flex-1 py-2.5 border border-slate-200 rounded-md text-slate-600 font-semibold text-[13px] hover:bg-slate-50 transition-colors">Cancelar</button>

          <button
            type="submit"
            form='form-noticia'
            disabled={loading}
            className="flex-1 py-2.5 cursor-pointer bg-brand-600 text-white rounded-md font-semibold text-[13px] hover:bg-brand-700 transition-all duration-300">
            {loading ? "Publicando..." : "Guardar y Publicar"}
          </button>
        </div>

      </div>
    </ScrollReveal>
  );
};

export default ModalRedactarNoticia;