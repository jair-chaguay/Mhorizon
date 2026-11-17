import React from 'react';

interface HeaderProps {
  title: string;
  onOpenSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onOpenSidebar }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200/80 flex items-center justify-between gap-3 px-4 lg:px-8 shrink-0 z-30 relative">
      <button 
        onClick={onOpenSidebar} 
        className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
      >
        <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        
      </button>

      <div className="min-w-0 flex items-center truncate">
        <span className="text-sm font-semibold text-slate-900 truncate">
          {title}
        </span>
      </div>

      <div className="flex items-center gap-5 ml-auto">
        <div className="text-right hidden sm:block leading-tight">
          <p className="text-sm font-semibold text-slate-900">MHorizon Admin</p>
          <p className="text-xs text-slate-500">Colaborador</p>
        </div>
      </div>
    </header>
  );
};

export default Header;