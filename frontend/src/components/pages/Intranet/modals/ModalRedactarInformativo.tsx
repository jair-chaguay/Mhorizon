import React, { useEffect, useState } from 'react';
import { ScrollReveal } from '../../../ScrollReveal';
import api from '../../../../api/axios';
import StarterKit from '@tiptap/starter-kit'

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  datosEdicion?: any;
}

const ModalRedactarInformativo: React.FC<Props> = ({ isOpen, onClose, onSuccess, datosEdicion }) => {

  const [titulo, setTitulo] = useState("");
  const [resolucion, setResolucion] = useState("");
  
  // 1. ACTUALIZACIÓN: Nuevos estados
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
    
    // 2. ACTUALIZACIÓN: Añadir campos al FormData
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('resolucion_oficial', resolucion);
    formData.append('descripcion_portada', descripcionPortada); // <-- Append
    formData.append('contenido', contenido);
    
    if (imagen) {
      formData.append('imagen', imagen);
    }
    if (pdf) {
      formData.append('archivo_pdf', pdf); // <-- Append (debe coincidir con el backend)
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
    setDescripcionPortada(""); // <-- Reset
    setContenido("");
    setImagen(null);
    setPdf(null); // <-- Reset
  };

  if (!isOpen) return null;

  return (
    <ScrollReveal className="fixed inset-0 bg-black/80 backdrop-blur-sm z-110 flex justify-center items-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative flex flex-col max-h-[90vh] reveal-element">
        <div className="bg-blue-200 p-6 pr-12 relative shrink-0 rounded-t-2xl">
          <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.70rem] uppercase mb-1 block">Gestor de Contenidos</span>
          <h2 className="text-white font-extrabold text-[1.4rem] leading-tight">
            {datosEdicion ? 'Editar Informativo' : 'Redactar Informativo'}
          </h2>
          <button onClick={onClose} className="cursor-pointer absolute top-5 right-5 text-gray-400 hover:text-white transition-colors bg-white/10 rounded-full p-1.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto no-scrollbar bg-gray-50 flex-1">
          <form id="form-informativo" onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Título del Informativo</label>
                <input
                  type="text"
                  required
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-blue-200 text-[0.95rem] outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Resolución Oficial</label>
                <input
                  type="text"
                  value={resolucion}
                  onChange={(e) => setResolucion(e.target.value)}
                  placeholder="Ej: NAC-001-2026"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-blue-200 text-[0.95rem] outline-none focus:border-orange-500"
                />
              </div>

              {/* 3. ACTUALIZACIÓN: Campo de Descripción Portada */}
              <div>
                <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Descripción de Portada</label>
                <input
                  type="text"
                  required
                  value={descripcionPortada}
                  onChange={(e) => setDescripcionPortada(e.target.value)}
                  placeholder="Resumen corto..."
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-blue-200 text-[0.95rem] outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Contenido Completo</label>
              <textarea
                rows={4}
                required
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none resize-none focus:border-orange-500"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Imagen</label>
                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImagen(e.target.files ? e.target.files[0] : null)}
                    className="w-full text-[0.8rem] text-gray-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:bg-blue-200 file:text-white hover:file:bg-orange-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* 4. ACTUALIZACIÓN: Campo de Archivo PDF */}
              <div>
                <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Documento PDF</label>
                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-2">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setPdf(e.target.files ? e.target.files[0] : null)}
                    className="w-full text-[0.8rem] text-gray-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:bg-orange-100 file:text-orange-600 hover:file:bg-orange-200 cursor-pointer"
                  />
                </div>
              </div>
            </div>

          </form>
        </div>

        <div className="p-6 border-t border-gray-100 bg-white shrink-0 flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 py-3.5 border border-gray-200 rounded-md cursor-pointer text-gray-600 font-bold uppercase text-[0.80rem] hover:bg-gray-50">Cancelar</button>
          <button
            type="submit"
            form="form-informativo"
            disabled={loading}
            className="flex-1 py-3.5 bg-orange-500 text-white rounded-md font-bold cursor-pointer uppercase text-[0.80rem] hover:bg-blue-200 shadow-md transition-all disabled:opacity-50"
          >
            {loading ? "Procesando..." : "Guardar y Publicar"}
          </button>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default ModalRedactarInformativo;