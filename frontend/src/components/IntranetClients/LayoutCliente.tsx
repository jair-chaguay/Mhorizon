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
        <ScrollReveal className="bg-gray-800 text-blue-200 h-screen overflow-hidden flex font-inter relative">
            <SidebarCliente
                activeView={activeView}
                onViewChange={handleViewChange}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />

            <div className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-800 relative">
                <HeaderCliente
                    title={viewTitle}
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                    onGoHome={() => handleViewChange('dashboard-view', 'Dashboard')}
                />

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 no-scrollbar relative z-10 bg-gray-50">
                    <div className="animate-fadeIn">
                        {activeView === 'dashboard-view' && <DashboardCliente onNavigate={handleViewChange} />}
                        {activeView === 'biblioteca-view' && <BibliotecaCliente />}
                        {activeView === 'informativos-view' && <InformativosCliente />}
                        {activeView === 'ajustes-view' && <AjustesCliente />}
                    </div>

                    <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-400 text-[0.75rem] font-light max-w-350 mx-auto pb-4">
                        &copy; 2026 MHORIZON ECUADOR. Intranet Confidencial Clientes.
                    </footer>
                </main>
            </div>
        </ScrollReveal>
    );
};

export default LayoutCliente;