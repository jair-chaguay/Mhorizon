import React, { type MouseEventHandler, type ReactNode } from 'react';
import { type ViewID } from './types';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axios';

interface SidebarProps {
  activeView: ViewID;
  onViewChange: (id: ViewID, title: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const nombreCompleto = userData.nombre + " " + userData.apellido
  const handleLogout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error("Error en logout backend:", error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate("/loginPage");
      setIsOpen(false);
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsOpen(false)}
      />

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-blue-200 text-white flex flex-col transform transition-transform duration-300 ease-in-out border-r border-white/5 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
          <img src="images/MHORIZONBOCETO.png" alt="Logo" className="w-36" />
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-400 hover:text-orange-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 no-scrollbar">
          <p className="px-2 text-[0.65rem] font-bold text-gray-500 uppercase tracking-widest mb-2 mt-2">Gestión Operativa</p>

          <NavButton
            label="Directorio de Clientes"
            isActive={activeView === 'view-directorio'}
            onClick={() => onViewChange('view-directorio', 'Directorio de Clientes')}
            icon={<path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />}
          />

          <NavButton
            label="Biblioteca Operativa"
            isActive={activeView === 'view-repositorio-root'}
            onClick={() => onViewChange('view-repositorio-root', 'Biblioteca Operativa')}
            icon={<path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />}
          />

          <NavButton
            label="Gestor Informativos"
            isActive={activeView === 'view-informativos'}
            onClick={() => onViewChange('view-informativos', 'Gestor de Informativos')}
            icon={<path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />}
          />

          <NavButton
            label="Gestor de Noticias"
            isActive={activeView === 'view-noticias'}
            onClick={() => onViewChange('view-noticias', 'Gestor de Noticias')}
            icon={<path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />}
          />

          <p className="px-2 text-[0.65rem] font-bold text-gray-500 uppercase tracking-widest mb-2 mt-8">Sesión</p>
          <button
            onClick={handleLogout}
            className="cursor-pointer w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-orange-500 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar Sesión
          </button>
        </nav>

        <div className="p-4 border-t border-white/10 bg-white/5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center overflow-hidden">
              <p className="text-white font-bold text-sm uppercase">
                {userData?.nombre?.charAt(0)}
                {userData?.apellido?.charAt(0)}
              </p>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{nombreCompleto}</p>
              <p className="text-xs text-orange-500 truncate font-medium">{userData.cargo}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

interface NavButtonProps {
  label: string;
  isActive: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon: ReactNode;
}


const NavButton = ({ label, isActive, onClick, icon }: NavButtonProps) => (
  <button
    onClick={onClick}
    className={`cursor-pointer w-full flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all duration-200 group ${
      isActive 
        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
        : 'text-gray-400 hover:bg-white/5 hover:text-orange-500'
    }`}
  >
    <svg 
      className={`w-5 h-5 ${isActive ? 'text-white' : 'group-hover:text-orange-500'}`} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      strokeWidth="2"
    >
      {icon}
    </svg>
    {label}
  </button>
);

export default Sidebar;