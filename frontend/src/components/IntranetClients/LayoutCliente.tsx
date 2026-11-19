import React, { useState } from 'react';
import SidebarCliente from './SidebarCliente';
import HeaderCliente from './HeaderCliente';
import DashboardCliente from './views/DashboardCliente';
import BibliotecaCliente from './views/BibliotecaCliente';
import InformativosCliente from './views/InformativosCliente';
import AjustesCliente from './views/AjustesCliente';
import { type ViewClienteID } from './type';
import { ScrollReveal } from '../ScrollReveal';

const LayoutCliente: React.FC = () => {
    const [activeView, setActiveView] = useState<ViewClienteID>('dashboard-view');
    const [viewTitle, setViewTitle] = useState('Dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleViewChange = (viewId: ViewClienteID, title: string) => {
        setActiveView(viewId);
        setViewTitle(title);
        setIsSidebarOpen(false);
    };

    return (
        <ScrollReveal className="font-intranet antialiased bg-[#f4f5f7] text-slate-800 h-screen overflow-hidden flex relative">
            <SidebarCliente
                activeView={activeView}
                onViewChange={handleViewChange}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />

            <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden bg-[#f4f5f7] relative">
                <HeaderCliente
                    title={viewTitle}
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                    onGoHome={() => handleViewChange('dashboard-view', 'Dashboard')}
                />

                <main className="flex-1 overflow-y-auto p-4 lg:p-8 no-scrollbar relative z-10 bg-[#f4f5f7]">
                    <div className="animate-fadeIn">
                        {activeView === 'dashboard-view' && <DashboardCliente onNavigate={handleViewChange} />}
                        {activeView === 'biblioteca-view' && <BibliotecaCliente />}
                        {activeView === 'informativos-view' && <InformativosCliente />}
                        {activeView === 'ajustes-view' && <AjustesCliente />}
                    </div>

                    <footer className="mt-10 pt-5 border-t border-slate-200/80 text-center text-slate-400 text-xs max-w-350 mx-auto pb-2">
                        &copy; 2026 MHORIZON ECUADOR. Intranet Confidencial Clientes.
                    </footer>
                </main>
            </div>
        </ScrollReveal>
    );
};

export default LayoutCliente;