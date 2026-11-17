import React, { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, subtitle, children }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-slate-900/50 z-[110] flex justify-center items-center p-4 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white rounded-xl shadow-2xl w-full max-w-4xl relative transform transition-transform duration-300 flex flex-col max-h-[90vh] ${show ? 'scale-100' : 'scale-95'}`}>
        <div className="bg-white border-b border-slate-200 px-6 py-4 pr-14 relative shrink-0 rounded-t-xl">
          {subtitle && <span className="text-slate-500 font-medium text-xs mb-0.5 block">{subtitle}</span>}
          <h2 className="text-slate-900 font-semibold text-base leading-tight">{title}</h2>
          <button onClick={onClose} className="absolute top-1/2 -translate-y-1/2 right-4 h-8 w-8 grid place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto no-scrollbar bg-white flex-1 rounded-b-xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;