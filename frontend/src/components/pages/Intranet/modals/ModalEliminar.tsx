import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemTitle: string;
}

const ModalEliminar: React.FC<Props> = ({ isOpen, onClose, onConfirm, itemTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-140 flex justify-center items-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center relative scale-100 transition-all">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </div>
        <h2 className="text-blue-200 font-extrabold text-[1.4rem] mb-2">¿Eliminar {itemTitle}?</h2>
        <p className="text-gray-500 text-[0.9rem] mb-6">Esta acción no se puede deshacer y los datos se borrarán permanentemente.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 border border-gray-200 rounded-lg text-gray-600 font-bold uppercase text-[0.80rem] hover:bg-gray-50">Cancelar</button>
          <button onClick={onConfirm} className="flex-1 py-3 bg-red-500 text-white rounded-lg font-bold uppercase text-[0.80rem] hover:bg-red-600 shadow-md">Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalEliminar;