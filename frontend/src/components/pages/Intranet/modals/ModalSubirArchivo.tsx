import React, { useState, useRef } from 'react';
import { ScrollReveal } from '../../../ScrollReveal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ModalSubirArchivo: React.FC<Props> = ({ isOpen, onClose }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Funciones para manejar el Drag & Drop en React
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
    // Aquí puedes acceder a los archivos con: e.dataTransfer.files
    // if (e.dataTransfer.files && e.dataTransfer.files.length > 0) { ... }
  };

  const handleClickZone = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <ScrollReveal className="fixed inset-0 bg-black/80 backdrop-blur-sm z-130 flex justify-center items-center p-4 ">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative scale-100 transition-all reveal-element delay-300">
        
        {/* Botón Cerrar */}
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 text-gray-400 hover:text-orange-500 transition-colors focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Header Modal */}
        <div className="mb-5 border-b border-gray-100 pb-4">
          <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.70rem] uppercase mb-1 block">
            Repositorio
          </span>
          <h2 className="text-blue-200 font-extrabold text-[1.4rem] tracking-tight">
            Cargar Documento
          </h2>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          
          {/* Drag & Drop Zone */}
          <div 
            onClick={handleClickZone}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center text-center cursor-pointer transition-colors duration-200 ${
              isDragOver ? 'border-orange-500 bg-orange-50/50' : 'border-gray-300 bg-gray-50 hover:border-orange-400'
            }`}
          >
            <svg className={`w-8 h-8 mb-2 transition-colors ${isDragOver ? 'text-orange-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p className="text-[0.85rem] font-bold text-blue-200">Haga clic o arrastre un archivo aquí</p>
            <p className="text-[0.7rem] text-gray-400 mt-1">Archivo (PDF, Excel, Word)</p>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".pdf,.xls,.xlsx,.doc,.docx"
            />
          </div>
          
          {/* Metadata Inputs (Autofill) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[0.70rem] font-bold text-gray-500 uppercase tracking-widest mb-1">
                Subido por (Auto)
              </label>
              <input 
                type="text" 
                className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded text-gray-500 text-[0.80rem]" 
                value="Violeta Rodríguez" 
                disabled 
              />
            </div>
            <div>
              <label className="block text-[0.70rem] font-bold text-gray-500 uppercase tracking-widest mb-1">
                Fecha (Auto)
              </label>
              <input 
                type="text" 
                className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded text-gray-500 text-[0.80rem]" 
                value="Hoy" 
                disabled 
              />
            </div>
          </div>

          {/* Observación */}
          <div>
            <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">
              Observación para el cliente
            </label>
            <textarea 
              rows={2} 
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-blue-200 text-[0.85rem] outline-none focus:border-orange-500 resize-none transition-colors" 
              placeholder="El cliente verá este mensaje en su portal..." 
              required
            ></textarea>
          </div>

          {/* Footer Botones */}
          <div className="flex gap-3 pt-2 border-t border-gray-100 mt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 py-3 border border-gray-200 rounded-md text-gray-600 font-bold uppercase tracking-wider text-[0.80rem] hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3 bg-blue-200 text-white rounded-md font-bold uppercase tracking-wider text-[0.80rem] hover:bg-orange-500 transition-all shadow-md"
            >
              Añadir Archivo
            </button>
          </div>

        </form>
      </div>
    </ScrollReveal>
  );
};

export default ModalSubirArchivo;