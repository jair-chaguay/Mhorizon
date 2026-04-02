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
    <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[110] flex justify-center items-center p-4 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative transform transition-transform duration-300 flex flex-col max-h-[90vh] ${show ? 'scale-100' : 'scale-95'}`}>
        <div className="bg-[#151E28] p-6 pr-12 relative shrink-0 rounded-t-2xl">
          {subtitle && <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.70rem] uppercase mb-1 block">{subtitle}</span>}
          <h2 className="text-white font-extrabold text-[1.4rem] leading-tight">{title}</h2>
          <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors bg-white/10 rounded-full p-1.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="p-6 md:p-8 overflow-y-auto no-scrollbar bg-gray-50 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;