import React from 'react';
import { ScrollReveal } from '../../../ScrollReveal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  placeholder: string;
}

const ModalCrearCarpeta: React.FC<Props> = ({ isOpen, onClose, title, placeholder }) => {
  if (!isOpen) return null;

  return (
    <ScrollReveal className="fixed inset-0 bg-black/80 backdrop-blur-sm z-120 flex justify-center items-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative reveal-element delay-200 scale-100 transition-all">
        <button onClick={onClose} className="cursor-pointer absolute top-5 right-5 text-gray-400 hover:text-orange-500 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <div className="mb-6">
          <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.70rem] uppercase mb-1 block">Biblioteca Operativa</span>
          <h2 className="text-blue-200 font-extrabold text-[1.4rem] tracking-tight">{title}</h2>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Nombre / Identificador</label>
            <input type="text" placeholder={placeholder} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.90rem] outline-none focus:border-orange-500" required />
          </div>
          <div className="flex gap-3 pt-3 border-t border-gray-100">
            <button type="button" onClick={onClose} className="flex-1 py-3 border cursor-pointer border-gray-200 rounded-md text-gray-600 font-bold uppercase tracking-wider text-[0.80rem] hover:bg-gray-50">Cancelar</button>
            <button type="submit" className="flex-1 py-3 bg-blue-200 text-white cursor-pointer rounded-md font-bold uppercase tracking-wider text-[0.80rem] hover:bg-orange-500 transition-all">Crear</button>
          </div>
        </form>
      </div>
    </ScrollReveal>
  );
};

export default ModalCrearCarpeta;