import React, { useState, useRef } from 'react';
import { ScrollReveal } from '../../../ScrollReveal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onBackToGestion: () => void; 
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
    <ScrollReveal className="fixed inset-0 bg-slate-900/50 z-130 flex justify-center items-center p-4 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 relative scale-100 transition-transform duration-300 reveal-element ">
        
        <button 
          onClick={handleCancelar} 
          className="absolute top-5 right-5 text-slate-400 hover:text-brand-600 focus:outline-none transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <div className="mb-5 border-b border-slate-100 pb-4">
          <span className="text-brand-600 font-medium text-xs mb-1 block">Historial de Declaraciones</span>
          <h2 className="text-slate-900 font-semibold text-lg tracking-tight">Cargar / Editar Declaración</h2>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1">Periodo Fiscal</label>
              <input type="month" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 transition-colors focus:ring-2 focus:ring-brand-600/20" required />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1">Tipo de Impuesto</label>
              <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 transition-colors focus:ring-2 focus:ring-brand-600/20">
                <option>IVA (104)</option>
                <option>Retención en la Fuente</option>
                <option>Impuesto a la Renta</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1">Estado</label>
            <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 transition-colors focus:ring-2 focus:ring-brand-600/20">
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
            className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center text-center cursor-pointer transition-colors duration-200 ${isDragOver ? 'border-brand-600 bg-brand-50/50' : 'border-slate-300 bg-slate-50 hover:border-brand-500'}`}
          >
            <svg className={`w-6 h-6 mb-2 transition-colors ${isDragOver ? 'text-brand-600' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p className="text-xs font-semibold text-slate-900">Comprobante / Factura (PDF)</p>
            <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Observación / Nota</label>
            <textarea rows={2} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-brand-600 resize-none transition-colors focus:ring-2 focus:ring-brand-600/20" placeholder="Opcional..." ></textarea>
          </div>

          <div className="flex gap-3 pt-2 border-t border-slate-100">
            <button type="button" onClick={handleCancelar} className="flex-1 py-2.5 mt-2 border border-slate-200 rounded-md text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors">Cancelar</button>
            <button type="submit" onClick={handleCancelar} className="flex-1 py-2.5 mt-2 bg-brand-600 text-white rounded-md font-semibold text-sm hover:bg-brand-700 transition-colors">Guardar Declaración</button>
          </div>
        </form>

      </div>
    </ScrollReveal>
  );
};

export default ModalAñadirDeclaracion;