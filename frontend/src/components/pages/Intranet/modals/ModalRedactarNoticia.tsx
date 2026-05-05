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
    <ScrollReveal className="fixed inset-0 bg-black/80 backdrop-blur-sm z-110 flex justify-center items-center p-4 animate-fadeIn">
      <div className="bg-white reveal-element delay-200 rounded-2xl shadow-2xl w-full max-w-2xl relative flex flex-col max-h-[90vh] scale-100 transition-transform duration-300">

        <div className="bg-blue-200 p-6 pr-12 relative shrink-0 rounded-t-2xl">
          <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.70rem] uppercase mb-1 block">Radar Financiero (Home)</span>
          <h2 className="text-white font-extrabold text-[1.4rem] leading-tight">Cargar / Editar Noticia</h2>
          <button onClick={onClose} className="cursor-pointer absolute top-5 right-5 text-gray-400 hover:text-white transition-colors bg-white/10 rounded-full p-1.5 focus:outline-none">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto no-scrollbar bg-gray-50 flex-1">
          <form id='form-noticia' className="space-y-5" onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Título de la Noticia</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-blue-200 text-[0.95rem] outline-none focus:border-orange-500"
                  placeholder="Ej. SRI incrementa al 3% la retención..."
                />
              </div>

              <div>
                <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Categoría</label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-blue-200 text-[0.95rem] outline-none focus:border-orange-500"
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
                <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Fuente (Medio)</label>
                <input
                  type="text"
                  value={fuente}
                  onChange={(e) => setFuente(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-blue-200 text-[0.95rem] outline-none focus:border-orange-500"
                  placeholder="Ej. Primicias, Lexis..."
                />
              </div>
              <div>
                <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">URL de Redirección</label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-blue-200 text-[0.95rem] outline-none focus:border-orange-500"
                  placeholder="https://..."
                />
              </div>
            </div>
            <div>
              <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Descripción Corta</label>
              <textarea
                rows={3}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none resize-none focus:border-orange-500"
                placeholder="Aparecerá en la franja del Home..."></textarea>
            </div>
            <div>
              <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Imagen de Portada</label>
              <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-2 focus-within:border-orange-500 transition-colors">
                <div className="w-10 h-10 bg-gray-50 rounded-md flex items-center justify-center text-gray-400 shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <input type="file"
                  accept="image/*"
                  onChange={(e) => setImagen(e.target.files ? e.target.files[0] : null)}
                  className=" w-full text-[0.8rem] text-gray-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-[0.75rem] file:font-bold file:uppercase file:tracking-widest file:bg-blue-200 file:text-white hover:file:bg-orange-500 transition-all cursor-pointer outline-none" />
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-gray-100 bg-white shrink-0 flex gap-3">
          <button onClick={onClose} className=" cursor-pointer flex-1 py-3.5 border border-gray-200 rounded-md text-gray-600 font-bold uppercase tracking-wider text-[0.80rem] hover:bg-gray-50 transition-colors">Cancelar</button>

          <button
            type="submit"
            form='form-noticia'
            disabled={loading}
            className="flex-1 py-3.5 cursor-pointer bg-orange-500 text-white rounded-md font-bold uppercase tracking-wider text-[0.80rem] hover:bg-blue-200 shadow-md transition-all duration-300">
            {loading ? "Publicando..." : "Guardar y Publicar"}
          </button>
        </div>

      </div>
    </ScrollReveal>
  );
};

export default ModalRedactarNoticia;