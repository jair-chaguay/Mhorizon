import React, { useState, useEffect } from 'react';
import api from "../../../../api/axios"

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
        alert("Acceso denegado: Solo los usuarios autorizados (Rol asignado) pueden modificar el nombre de las carpetas.");
      } else {
        console.error("Error al actualizar la carpeta:", error);
        alert("Ocurrió un error al intentar actualizar el nombre.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">{config.title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || nombre.trim() === ''}
              className="px-5 py-2.5 text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
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
    </div>
  );
};

export default ModalEditarCarpeta;