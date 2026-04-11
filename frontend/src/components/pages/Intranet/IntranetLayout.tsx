import React, { useState } from 'react';
import Sidebar from './SideBar';
import Header from './Header';
import Directorio from './views/Directorio';
import Biblioteca from './views/Biblioteca';
import Informativos from './views/Informativos';
import Noticias from './views/Noticia';

import ModalCrearCarpeta from './modals/ModalCrearCarpeta';
import ModalRedactarInformativo from './modals/ModalRedactarInformativo';
import ModalRedactarNoticia from './modals/ModalRedactarNoticia';
import ModalEliminar from './modals/ModalEliminar';
import ModalSubirArchivo from './modals/ModalSubirArchivo';

import { type ViewID, type Cliente } from './types';
import api from '../../../api/axios';
import { ModalAñadirCliente } from './modals/ModalAñadirCliente';
import PerfilCliente from './views/PerfilCliente';
import ModalAñadirObligacion from './modals/ModalAñadirObligacion';

const IntranetLayout: React.FC = () => {
    const [crearConfig, setCrearConfig] = useState<any>({ title: '', placeholder: '', type: 'ROOT', parentId: null });
    const [refreshSignal, setRefreshSignal] = useState(0);    
    const triggerRefresh = () => setRefreshSignal(prev => prev + 1);
    const [activeView, setActiveView] = useState<ViewID>('view-directorio');
    const [bibliotecaDirectTo, setBibliotecaDirectTo] = useState<{ clienteId: number; periodoId: number } | null>(null); const [viewTitle, setViewTitle] = useState('Directorio de Clientes');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [infoAEditar, setInfoAEditar] = useState<any>(null);

    const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);
    const [isDeclaracionModalOpen, setIsDeclaracionModalOpen] = useState(false);
    const [isCrearFolderOpen, setIsCrearFolderOpen] = useState(false);
    const [crearFolderConfig, setCrearFolderConfig] = useState({ title: '', placeholder: '' });

    const [isRedactarModalOpen, setIsRedactarModalOpen] = useState(false);

    const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false);
    const [itemAEliminar, setItemAEliminar] = useState<{ id: number | string; title: string }>({
        id: 0,
        title: ''
    });
    const [isSubirArchivoOpen, setIsSubirArchivoOpen] = useState(false);
    const [subcarpetaDestinoId, setSubcarpetaDestinoId] = useState<number | null>(null);
    const [isRedactarNoticiaOpen, setIsRedactarNoticiaOpen] = useState(false);
    const [isAñadirClienteOpen, setIsAñadirClienteOpen] = useState(false);


    const handleConfirmEliminar = async () => {
        try {
            let endpoint = typeof itemAEliminar.id === 'string' ? itemAEliminar.id : "";

            if (!endpoint) {
                if (activeView === 'view-informativos') {
                    endpoint = `/informativo/${itemAEliminar.id}`;
                } else if (activeView === 'view-noticias') {
                    endpoint = `/noticia/${itemAEliminar.id}`;
                }
            }

            if (endpoint) {
                await api.delete(endpoint);
                triggerRefresh();
                setIsEliminarModalOpen(false);

                if (endpoint.includes('/cliente/')) {
                    handleViewChange('view-directorio', 'Directorio de Clientes');
                    setClienteSeleccionado(null); 
                }
            }
        } catch (error) {
            console.error("Error al eliminar:", error);
            alert("No se pudo eliminar el registro.");
        }
    }


    const handleJumpToBiblioteca = (clienteId: number, periodoId: number) => {
        setBibliotecaDirectTo({ clienteId, periodoId });
        handleViewChange('view-repositorio-root', 'Biblioteca Operativa', true);
    };


    // Handlers
    const handleOpenCrearFolder = (title: string, placeholder: string) => {
        setCrearFolderConfig({ title, placeholder });
        setIsCrearFolderOpen(true);
    };

    const handleOpenRedactar = (info?: any) => {
        setInfoAEditar(info || null); 
        setIsRedactarModalOpen(true);
    };

    const handleOpenRedactarNoticia = (noticia?: any) => {
        setInfoAEditar(noticia || null);
        setIsRedactarNoticiaOpen(true);
    };


    const handleOpenGestion = (cliente: Cliente) => {
        setClienteSeleccionado(cliente);
        handleViewChange('view-perfil-cliente', 'Perfil Editable');
    };

    const handleOpenEliminar = (id: number | string, title: string) => {
        setItemAEliminar({ id, title });
        setIsEliminarModalOpen(true);
    };

    const handleViewChange = (viewId: ViewID, title: string, isJump:boolean = false) => {
        setActiveView(viewId);
        setViewTitle(title);
        setIsSidebarOpen(false);
        if (!isJump) {
            setBibliotecaDirectTo(null);
        }
    };

    return (
        <div className="bg-gray-800 text-blue-200 h-screen overflow-hidden flex font-inter relative">
            <Sidebar
                activeView={activeView}
                onViewChange={handleViewChange}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />

            <div className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-800 relative">
                <Header
                    title={viewTitle}
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                />

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 no-scrollbar relative z-10 bg-gray-50">
                    <div className="animate-fadeIn">
                        {activeView === 'view-directorio' && (
                            <Directorio onOpenGestion={handleOpenGestion}
                                onOpenAñadir={() => setIsAñadirClienteOpen(true)}
                                refreshSignal={refreshSignal}
                            />
                        )}

                        {activeView === 'view-perfil-cliente' && clienteSeleccionado && (
                            <PerfilCliente
                                cliente={clienteSeleccionado}
                                refreshSignal={refreshSignal}
                                onBack={() => handleViewChange('view-directorio', 'Directorio de Clientes')}
                                onOpenDeclaracion={() => setIsDeclaracionModalOpen(true)}
                                onOpenSubir={() => setIsSubirArchivoOpen(true)}
                                onOpenEliminar={handleOpenEliminar}
                                onUpdateSuccess={triggerRefresh}
                                onJumpToBiblioteca={handleJumpToBiblioteca}
                                onOpenCrearPeriodo={() => {
                                    setCrearConfig({ title: 'Nuevo Periodo Fiscal', placeholder: 'Ej. 2026', type: 'PERIODOS', parentId: clienteSeleccionado.id });
                                    setIsCrearFolderOpen(true);
                                }}
                            />
                        )}

                        {activeView === 'view-repositorio-root' && (
                            <Biblioteca
                                onOpenCrear={(conf) => { setCrearConfig(conf); setIsCrearFolderOpen(true); }}
                                onOpenSubir={(id) => {
                                    setSubcarpetaDestinoId(id); 
                                    setIsSubirArchivoOpen(true);
                                }}
                                refreshSignal={refreshSignal}
                                directTo={bibliotecaDirectTo}
                                onOpenEliminar={(endpoint, title) => {
                                    setItemAEliminar({ id: endpoint, title: title });
                                    setIsEliminarModalOpen(true);
                                }}
                            />
                        )}

                        {activeView === 'view-informativos' && (
                            <Informativos
                                key={`info-${refreshSignal}`}
                                onOpenRedactar={handleOpenRedactar}
                                onOpenEliminar={handleOpenEliminar}
                            />
                        )}

                        {activeView === 'view-noticias' && (
                            <Noticias
                                key={`info-${refreshSignal}`}
                                onOpenRedactar={handleOpenRedactarNoticia}
                                onOpenEliminar={handleOpenEliminar} 
                            />
                        )}

                    </div>

                    <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-400 text-[0.75rem] font-light max-w-350 mx-auto pb-4">
                        &copy; 2026 MHORIZON ECUADOR. Intranet Confidencial Operativa.
                    </footer>
                </main>
            </div>

            <ModalCrearCarpeta
                isOpen={isCrearFolderOpen}
                onClose={() => setIsCrearFolderOpen(false)}
                onSuccess={triggerRefresh}
                config={crearConfig}
            />

            <ModalRedactarInformativo
                isOpen={isRedactarModalOpen}
                onClose={() => setIsRedactarModalOpen(false)}
                onSuccess={triggerRefresh}
                datosEdicion={infoAEditar}

            />
            <ModalAñadirObligacion
                isOpen={isDeclaracionModalOpen}
                onClose={() => setIsDeclaracionModalOpen(false)}
                clienteId={clienteSeleccionado?.id}
                onSuccess={triggerRefresh} 
            />

            <ModalEliminar
                isOpen={isEliminarModalOpen}
                onClose={() => setIsEliminarModalOpen(false)}
                onConfirm={handleConfirmEliminar}
                itemTitle={itemAEliminar.title}
            />

            <ModalAñadirCliente
                isOpen={isAñadirClienteOpen}
                onClose={() => setIsAñadirClienteOpen(false)}
                onSuccess={triggerRefresh}
            />

            <ModalSubirArchivo
                isOpen={isSubirArchivoOpen}
                onClose={() => setIsSubirArchivoOpen(false)}
                subcarpetaId={subcarpetaDestinoId}
                onSuccess={() => {
                    triggerRefresh(); 
                }}
            />

            <ModalRedactarNoticia
                isOpen={isRedactarNoticiaOpen}
                onClose={() => setIsRedactarNoticiaOpen(false)}
                onSuccess={triggerRefresh}
                datosEdicion={infoAEditar}
            />

        </div>
    );
};

export default IntranetLayout;