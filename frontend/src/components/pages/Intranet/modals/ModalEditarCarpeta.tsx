import React, { useState, useEffect } from 'react';
import api from '../../../../api/axios';
import { ScrollReveal } from '../../../ScrollReveal';

interface ModalEditarCarpetaProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  config: { endpoint: string; currentName: string; title: string } | null;
}

const ModalEditarCarpeta: React.FC<ModalEditarCarpetaProps> = ({ isOpen, onClose, onSuccess, config }) => {
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && config) {
      setNombre(config.currentName);
    }
  }, [isOpen, config]);

  if (!isOpen || !config) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(config.endpoint, { nombre });
      onSuccess();
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.status === 403) {
        alert("Acceso denegado: Solo los usuarios autorizados pueden modificar el nombre de las carpetas.");
      } else {
        console.error("Error al actualizar la carpeta:", error);
        alert("Ocurrió un error al intentar actualizar el nombre.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollReveal className="fixed inset-0 bg-black/80 backdrop-blur-sm z-130 flex justify-center items-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative scale-100 transition-transform duration-300 reveal-element">
        
        {/* Botón Cerrar */}
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 text-gray-400 hover:text-orange-500 focus:outline-none transition-colors cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        {/* Cabecera */}
        <div className="mb-5 border-b border-gray-100 pb-4">
          <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.70rem] uppercase mb-1 block">Gestión de Directorio</span>
          <h2 className="text-blue-200 font-extrabold text-[1.4rem] tracking-tight">{config.title}</h2>
        </div>

        {/* Formulario */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[0.70rem] font-bold text-blue-200 uppercase tracking-widest mb-1">
              Nombre de la Carpeta / Periodo
            </label>
            <input 
              type="text" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.85rem] outline-none focus:border-orange-500 transition-colors" 
              required 
              autoFocus
            />
          </div>

          {/* Botones de Acción */}
          <div className="flex gap-3 pt-4 border-t border-gray-100 mt-6">
            <button 
              type="button" 
              onClick={onClose} 
              disabled={loading}
              className="flex-1 py-3 mt-2 border border-gray-200 rounded-md text-gray-600 font-bold uppercase tracking-wider text-[0.80rem] hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={loading || nombre.trim() === '' || nombre === config.currentName}
              className="flex-1 py-3 mt-2 bg-blue-200 text-white rounded-md font-bold uppercase tracking-wider text-[0.80rem] hover:bg-orange-500 transition-colors cursor-pointer disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </>
              ) : (
                'Guardar Cambios'
              )}
            </button>
          </div>
        </form>

      </div>
    </ScrollReveal>
  );
};

export default ModalEditarCarpeta;