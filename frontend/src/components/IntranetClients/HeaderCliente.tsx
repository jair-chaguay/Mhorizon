import React from 'react';

interface Props {
    title: string;
    onOpenSidebar: () => void;
    onGoHome: () => void;
}

const HeaderCliente: React.FC<Props> = ({ title, onOpenSidebar, onGoHome }) => {
    return (
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-10 shrink-0 shadow-sm z-30 relative">
            <button onClick={onOpenSidebar} className="lg:hidden text-blue-200 hover:text-orange-500 transition-colors focus:outline-none mr-4">
                <span className="material-symbols-outlined">menu</span>
            </button>

            <div className="flex items-center text-sm font-medium text-gray-500 truncate">
                <span className="cursor-pointer hover:text-orange-500 transition-colors" onClick={onGoHome}>
                    MHorizon
                </span>

                <svg className="w-4 h-4 mx-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>

                <span className="text-blue-200 font-bold">
                    {title}
                </span>
            </div>

            <div className="flex items-center gap-5 ml-auto">
                <div className="text-right hidden sm:block">
                    <p className="text-[0.75rem] font-bold text-blue-200 leading-none mb-1">MHorizon Portal</p>
                    <p className="text-[0.65rem] text-orange-500 uppercase tracking-widest leading-none font-bold">Acceso Cliente</p>
                </div>
            </div>
        </header>
    );
};

export default HeaderCliente;