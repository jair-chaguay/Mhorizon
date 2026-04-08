import React, { useState, useRef } from 'react';
import { ScrollReveal } from '../../../ScrollReveal';
import api from '../../../../api/axios'; // Importar tu instancia de Axios

interface Props {
  isOpen: boolean;
  onClose: () => void;
  subcarpetaId?: number | null;
  onSuccess: () => void; // NUEVO: Para actualizar la tabla al terminar
}

const ModalSubirArchivo: React.FC<Props> = ({ isOpen, onClose, subcarpetaId, onSuccess }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [archivo, setArchivo] = useState<File | null>(null); // NUEVO: Estado del archivo
  const [observacion, setObservacion] = useState(''); // NUEVO: Estado de la observación
  const [isSubmitting, setIsSubmitting] = useState(false); // NUEVO: Estado de carga
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Funciones Drag & Drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setArchivo(e.dataTransfer.files[0]); // Guardamos el archivo soltado
    }
  };

  const handleClickZone = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setArchivo(e.target.files[0]); // Guardamos el archivo seleccionado
    }
  };

  // POST: Subir Archivo
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!archivo) {
      alert("Por favor, selecciona un archivo.");
      return;
    }
    if (!subcarpetaId) {
      alert("Error interno: No se ha detectado la carpeta destino.");
      return;
    }

    const formData = new FormData();
    formData.append('subcarpeta_id', subcarpetaId.toString());
    formData.append('archivo', archivo);
    if (observacion) formData.append('observacion_cliente', observacion);

    try {
      setIsSubmitting(true);
      // ATENCIÓN: Asegúrate que esta ruta coincide con tu web.php / api.php de Laravel
      await api.post('/biblioteca/upload-documento', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      // Limpiamos los campos y cerramos
      setArchivo(null);
      setObservacion('');
      onSuccess(); // Dispara el GET (refreshSignal)
      onClose();
    } catch (error) {
      console.error("Error al subir archivo:", error);
      alert("Hubo un error al intentar subir el archivo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollReveal className="fixed inset-0 bg-black/80 backdrop-blur-sm z-130 flex justify-center items-center p-4 ">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative scale-100 transition-all reveal-element delay-300">
        
        <button onClick={onClose} className="cursor-pointer absolute top-5 right-5 text-gray-400 hover:text-orange-500 transition-colors focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="mb-5 border-b border-gray-100 pb-4">
          <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.70rem] uppercase mb-1 block">Repositorio</span>
          <h2 className="text-blue-200 font-extrabold text-[1.4rem] tracking-tight">Cargar Documento</h2>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          
          <div 
            onClick={handleClickZone}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center text-center cursor-pointer transition-colors duration-200 ${
              isDragOver ? 'border-orange-500 bg-orange-50/50' : 'border-gray-300 bg-gray-50 hover:border-orange-400'
            }`}
          >
            <svg className={`w-8 h-8 mb-2 transition-colors ${isDragOver || archivo ? 'text-orange-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {archivo ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              )}
            </svg>
            <p className="text-[0.85rem] font-bold text-blue-200">
              {archivo ? archivo.name : "Haga clic o arrastre un archivo aquí"}
            </p>
            <p className="text-[0.7rem] text-gray-400 mt-1">
               {archivo ? `${(archivo.size / 1024 / 1024).toFixed(2)} MB` : "Archivo (PDF, Excel, Word)"}
            </p>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              className="hidden" 
              accept=".pdf,.xls,.xlsx,.doc,.docx"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[0.70rem] font-bold text-gray-500 uppercase tracking-widest mb-1">Subido por (Auto)</label>
              <input type="text" className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded text-gray-500 text-[0.80rem]" value="Usuario Autenticado" disabled />
            </div>
            <div>
              <label className="block text-[0.70rem] font-bold text-gray-500 uppercase tracking-widest mb-1">Fecha (Auto)</label>
              <input type="text" className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded text-gray-500 text-[0.80rem]" value="Hoy" disabled />
            </div>
          </div>

          <div>
            <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Observación para el cliente</label>
            <textarea 
              rows={2} 
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-blue-200 text-[0.85rem] outline-none focus:border-orange-500 resize-none transition-colors" 
              placeholder="El cliente verá este mensaje en su portal..." 
            ></textarea>
          </div>

          <div className="flex gap-3 pt-2 border-t border-gray-100 mt-4">
            <button type="button" onClick={onClose} disabled={isSubmitting} className="cursor-pointer flex-1 py-3 border border-gray-200 rounded-md text-gray-600 font-bold uppercase tracking-wider text-[0.80rem] hover:bg-gray-50 transition-colors disabled:opacity-50">
              Cancelar
            </button>
            <button type="submit" disabled={isSubmitting} className="cursor-pointer flex-1 py-3 bg-blue-200 text-white rounded-md font-bold uppercase tracking-wider text-[0.80rem] hover:bg-orange-500 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Subiendo...
                </>
              ) : 'Añadir Archivo'}
            </button>
          </div>

        </form>
      </div>
    </ScrollReveal>
  );
};

export default ModalSubirArchivo;