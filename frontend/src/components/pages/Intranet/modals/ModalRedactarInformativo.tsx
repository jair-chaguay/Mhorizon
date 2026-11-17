import React, { useEffect, useState } from 'react';
import { ScrollReveal } from '../../../ScrollReveal';
import EditorRichText from '../views/EditorRichText';
import api from '../../../../api/axios';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  datosEdicion?: any;
}

const ModalRedactarInformativo: React.FC<Props> = ({ isOpen, onClose, onSuccess, datosEdicion }) => {

  const [titulo, setTitulo] = useState("");
  const [resolucion, setResolucion] = useState("");

  const [descripcionPortada, setDescripcionPortada] = useState("");
  const [contenido, setContenido] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (datosEdicion && isOpen) {
      setTitulo(datosEdicion.titulo || "");
      setResolucion(datosEdicion.resolucion_oficial || "");
      setDescripcionPortada(datosEdicion.descripcion_portada || ""); // <-- Cargar descripción
      setContenido(datosEdicion.contenido || "");
    } else {
      resetForm();
    }
  }, [datosEdicion, isOpen])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('resolucion_oficial', resolucion);
    formData.append('descripcion_portada', descripcionPortada); // <-- Append
    formData.append('contenido', contenido);

    if (imagen) {
      formData.append('imagen', imagen);
    }
    if (pdf) {
      formData.append('archivo_pdf', pdf); 
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }

      if (datosEdicion) {
        formData.append('_method', 'PUT');
        await api.post(`/informativo/${datosEdicion.id}`, formData, config);
      } else {
        await api.post('/informativo', formData, config);
      }

      if (typeof onSuccess === 'function') {
        onSuccess();
      }
      onClose();
      resetForm();
    } catch (error) {
      console.error("Error al subir informativo:", error);
      alert("Error al publicar el informativo. Verifique los campos.");
    } finally {
      setLoading(false);
    }
  }


  const resetForm = () => {
    setTitulo("");
    setResolucion("");
    setDescripcionPortada(""); 
    setContenido("");
    setImagen(null);
    setPdf(null); 
  };

  if (!isOpen) return null;

  return (
    <ScrollReveal className="fixed inset-0 bg-slate-900/50 z-110 flex justify-center items-center p-4 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl relative flex flex-col max-h-[90vh] reveal-element">
        <div className="bg-white border-b border-slate-200 px-6 py-4 pr-12 relative shrink-0 rounded-t-xl">
          <span className="text-slate-500 font-medium text-xs mb-0.5 block">Gestor de Contenidos</span>
          <h2 className="text-slate-900 font-semibold text-base leading-tight">
            {datosEdicion ? 'Editar Informativo' : 'Redactar Informativo'}
          </h2>
          <button onClick={onClose} className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-4 h-8 w-8 grid place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto no-scrollbar bg-slate-50 flex-1">
          <form id="form-informativo" onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Título del Informativo</label>
                <input
                  type="text"
                  required
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Resolución Oficial</label>
                <input
                  type="text"
                  value={resolucion}
                  onChange={(e) => setResolucion(e.target.value)}
                  placeholder="Ej: NAC-001-2026"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Descripción de Portada</label>
                <input
                  type="text"
                  required
                  value={descripcionPortada}
                  onChange={(e) => setDescripcionPortada(e.target.value)}
                  placeholder="Resumen corto..."
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Contenido Completo
              </label>
              <EditorRichText
                value={contenido}
                onChange={setContenido}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Imagen</label>
                <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg p-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImagen(e.target.files ? e.target.files[0] : null)}
                    className="w-full text-[13px] text-slate-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Documento PDF</label>
                <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg p-2">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setPdf(e.target.files ? e.target.files[0] : null)}
                    className="w-full text-[13px] text-slate-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:bg-brand-100 file:text-brand-700 hover:file:bg-brand-200 cursor-pointer"
                  />
                </div>
              </div>
            </div>

          </form>
        </div>

        <div className="p-6 border-t border-slate-100 bg-white shrink-0 flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-md cursor-pointer text-slate-600 font-semibold text-[13px] hover:bg-slate-50">Cancelar</button>
          <button
            type="submit"
            form="form-informativo"
            disabled={loading}
            className="flex-1 py-2.5 bg-brand-600 text-white rounded-md font-semibold cursor-pointer text-[13px] hover:bg-brand-700 transition-all disabled:opacity-50"
          >
            {loading ? "Procesando..." : "Guardar y Publicar"}
          </button>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default ModalRedactarInformativo;