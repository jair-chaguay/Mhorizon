import React from 'react';
import { type ViewClienteID } from './type'; 
import { Link } from 'react-router-dom';

interface Props {
  activeView: ViewClienteID;
  onViewChange: (id: ViewClienteID, title: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SidebarCliente: React.FC<Props> = ({ activeView, onViewChange, isOpen, setIsOpen }) => {
  const menuItems = [
    { 
      id: 'dashboard-view', 
      label: 'Panel de Control', 
      icon: (className: string) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    { 
      id: 'biblioteca-view', 
      label: 'Biblioteca Completa', 
      icon: (className: string) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2zM9 12h6" />
        </svg>
      )
    },
    { 
      id: 'historial-view', 
      label: 'Historial Fiscal', 
      icon: (className: string) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    { 
      id: 'informativos-view', 
      label: 'Informativos', 
      icon: (className: string) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14M9 12a1 1 0 11-2 0 1 1 0 012 0zm5-1a1 1 0 100 2h3a1 1 0 100-2h-3z" />
        </svg>
      )
    },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsOpen(false)}
      />

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-blue-200 text-white flex flex-col transform transition-transform duration-300 ease-in-out border-r border-white/5 shadow-2xl lg:shadow-none ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
          <img src="images/MHORIZONBOCETO.png" alt="Logo" className="w-36" />
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-400 hover:text-orange-500">
            {/* SVG Cerrar */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 no-scrollbar">
          <p className="px-2 text-[0.65rem] font-bold text-gray-500 uppercase tracking-widest mb-2 mt-2">Menú Principal</p>
          
          {menuItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button 
                key={item.id}
                onClick={() => onViewChange(item.id as ViewClienteID, item.label)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all cursor-pointer duration-200 group ${isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-orange-500'}`}
              >
                {item.icon(`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'group-hover:text-orange-500'}`)}
                {item.label}
              </button>
            );
          })}

          <p className="px-2 text-[0.65rem] font-bold text-gray-500 uppercase tracking-widest mb-2 mt-8">Configuración</p>
          
          <button 
            onClick={() => onViewChange('ajustes-view', 'Ajustes de Cuenta')}
            className={`w-full flex items-center cursor-pointer gap-3 px-3 py-3 rounded-lg font-medium transition-all duration-200 group ${activeView === 'ajustes-view' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-orange-500'}`}
          >
            <svg className={`w-5 h-5 transition-colors ${activeView === 'ajustes-view' ? 'text-white' : 'group-hover:text-orange-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Ajustes de Cuenta
          </button>

          <Link to="/loginPage" className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-orange-500 font-medium transition-colors mt-2 group">
            <svg className="w-5 h-5 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar Sesión
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10 bg-white/5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center overflow-hidden shadow-inner">
              <img src="https://ui-avatars.com/api/?name=Cliente+1&background=D98005&color=fff" alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">Cliente 1</p>
              <p className="text-xs text-orange-500 truncate font-medium">Empresa Activa</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarCliente;