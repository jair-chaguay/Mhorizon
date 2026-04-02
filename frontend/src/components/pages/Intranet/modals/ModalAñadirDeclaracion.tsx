import React, { useState, useRef } from 'react';
import { ScrollReveal } from '../../../ScrollReveal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onBackToGestion: () => void; // Función para regresar al modal de gestión
}

const ModalAñadirDeclaracion: React.FC<Props> = ({ isOpen, onClose, onBackToGestion }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

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
  };

  const handleClickZone = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCancelar = () => {
      onClose();
      setTimeout(() => onBackToGestion(), 300);
  };

  return (
    <ScrollReveal className="fixed inset-0 bg-black/80 backdrop-blur-sm z-130 flex justify-center items-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative scale-100 transition-transform duration-300 reveal-element ">
        
        <button 
          onClick={handleCancelar} 
          className="absolute top-5 right-5 text-gray-400 hover:text-orange-500 focus:outline-none transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <div className="mb-5 border-b border-gray-100 pb-4">
          <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.70rem] uppercase mb-1 block">Historial de Declaraciones</span>
          <h2 className="text-blue-200 font-extrabold text-[1.4rem] tracking-tight">Cargar / Editar Declaración</h2>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[0.70rem] font-bold text-blue-200 uppercase tracking-widest mb-1">Periodo Fiscal</label>
              <input type="month" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.85rem] outline-none focus:border-orange-500 transition-colors" required />
            </div>
            <div>
              <label className="block text-[0.70rem] font-bold text-blue-200 uppercase tracking-widest mb-1">Tipo de Impuesto</label>
              <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.85rem] outline-none focus:border-orange-500 transition-colors">
                <option>IVA (104)</option>
                <option>Retención en la Fuente</option>
                <option>Impuesto a la Renta</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-[0.70rem] font-bold text-blue-200 uppercase tracking-widest mb-1">Estado</label>
            <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.85rem] outline-none focus:border-orange-500 transition-colors">
              <option>Presentada y Pagada</option>
              <option>Borrador</option>
              <option>Pendiente de Pago</option>
            </select>
          </div>

          <div 
            onClick={handleClickZone}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center text-center cursor-pointer transition-colors duration-200 ${isDragOver ? 'border-orange-500 bg-orange-50/50' : 'border-gray-300 bg-gray-50 hover:border-orange-400'}`}
          >
            <svg className={`w-6 h-6 mb-2 transition-colors ${isDragOver ? 'text-orange-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p className="text-[0.75rem] font-bold text-blue-200">Comprobante / Factura (PDF)</p>
            <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" />
          </div>

          <div>
            <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Observación / Nota</label>
            <textarea rows={2} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.85rem] outline-none focus:border-orange-500 resize-none transition-colors" placeholder="Opcional..." ></textarea>
          </div>

          <div className="flex gap-3 pt-2 border-t border-gray-100">
            <button type="button" onClick={handleCancelar} className="flex-1 py-3 mt-2 border border-gray-200 rounded-md text-gray-600 font-bold uppercase tracking-wider text-[0.80rem] hover:bg-gray-50 transition-colors">Cancelar</button>
            <button type="submit" onClick={handleCancelar} className="flex-1 py-3 mt-2 bg-blue-200 text-white rounded-md font-bold uppercase tracking-wider text-[0.80rem] hover:bg-orange-500 transition-colors">Guardar Declaración</button>
          </div>
        </form>

      </div>
    </ScrollReveal>
  );
};

export default ModalAñadirDeclaracion;