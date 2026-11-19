import React from 'react';

interface Props {
    title: string;
    onOpenSidebar: () => void;
    onGoHome: () => void;
}

const HeaderCliente: React.FC<Props> = ({ title, onOpenSidebar, onGoHome }) => {
    return (
        <header className="h-16 bg-white border-b border-slate-200/80 flex items-center justify-between gap-3 px-4 lg:px-8 shrink-0 z-30 relative">
            <button onClick={onOpenSidebar} className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
                <span className="material-symbols-outlined">menu</span>
            </button>

            <div className="min-w-0 flex items-center text-sm text-slate-500 truncate">
                <span className="cursor-pointer hover:text-brand-600 transition-colors" onClick={onGoHome}>
                    MHORIZON
                </span>

                <svg className="w-4 h-4 mx-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>

                <span className="text-slate-900 font-semibold truncate">
                    {title}
                </span>
            </div>

            <div className="flex items-center gap-5 ml-auto">
                <div className="text-right hidden sm:block leading-tight">
                    <p className="text-sm font-semibold text-slate-900">MHorizon Portal</p>
                    <p className="text-xs text-slate-500">Acceso Cliente</p>
                </div>
            </div>
        </header>
    );
};

export default HeaderCliente;