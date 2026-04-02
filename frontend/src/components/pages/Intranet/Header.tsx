import React from 'react';

interface HeaderProps {
  title: string;
  onOpenSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onOpenSidebar }) => {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-10 shrink-0 shadow-sm z-30 relative">
      <button 
        onClick={onOpenSidebar} 
        className="lg:hidden text-blue-200 hover:text-orange-500 transition-colors mr-4"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        
      </button>

      <div className="hidden sm:flex items-center text-sm font-medium text-gray-500 truncate">
        <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span className="text-blue-200 font-bold tracking-widest uppercase text-[0.75rem]">
          {title}
        </span>
      </div>

      <div className="flex items-center gap-5 ml-auto">
        <div className="text-right hidden sm:block">
          <p className="text-[0.75rem] font-bold text-blue-200 leading-none mb-1">MHorizon Admin</p>
          <p className="text-[0.65rem] text-orange-500 uppercase tracking-widest leading-none font-bold">Colaborador</p>
        </div>
      </div>
    </header>
  );
};

export default Header;