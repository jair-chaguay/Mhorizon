import React, { useState } from 'react';
import Sidebar from './SideBar';
import Header from './Header';
import Directorio from './views/Directorio';
import Biblioteca from './views/Biblioteca';
import Informativos from './views/Informativos';
import Noticias from './views/Noticia';

// Importación de todos los modales
import ModalGestionCliente from './modals/ModalGestionCliente';
import ModalCrearCarpeta from './modals/ModalCrearCarpeta';
import ModalRedactarInformativo from './modals/ModalRedactarInformativo';
import ModalRedactarNoticia from './modals/ModalRedactarNoticia';
import ModalEliminar from './modals/ModalEliminar';
import ModalSubirArchivo from './modals/ModalSubirArchivo';

import { type ViewID, type Cliente } from './types';
import ModalAñadirDeclaracion from './modals/ModalAñadirDeclaracion';
import api from '../../../api/axios';

const IntranetLayout: React.FC = () => {
    const [crearConfig, setCrearConfig] = useState<any>({ title: '', placeholder: '', type: 'ROOT', parentId: null });
    const [refreshSignal, setRefreshSignal] = useState(0);    // Estados principales de navegación
    const triggerRefresh = () => setRefreshSignal(prev => prev + 1);
    const [activeView, setActiveView] = useState<ViewID>('view-directorio');
    const [viewTitle, setViewTitle] = useState('Directorio de Clientes');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [infoAEditar, setInfoAEditar] = useState<any>(null);
    // Estados de los Modales
    const [isGestionModalOpen, setIsGestionModalOpen] = useState(false);
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
    // NUEVO: Estado para el modal de subir archivo
    const [isSubirArchivoOpen, setIsSubirArchivoOpen] = useState(false);
    const [isRedactarNoticiaOpen, setIsRedactarNoticiaOpen] = useState(false);

    const handleConfirmEliminar = async () => {
        try {
            let endpoint = "";
            if (activeView === 'view-informativos') {
                endpoint = `/informativo/${itemAEliminar.id}`;
            } else if (activeView === 'view-noticias') {
                endpoint = `/noticia/${itemAEliminar.id}`;
            }

            if (endpoint) {
                await api.delete(endpoint);

                triggerRefresh();
                setIsEliminarModalOpen(false);
            }
        } catch (error) {
            console.error("Error al eliminar:", error);
            alert("No se pudo eliminar el registro.");
        }
    }

    // Handlers
    const handleOpenCrearFolder = (title: string, placeholder: string) => {
        setCrearFolderConfig({ title, placeholder });
        setIsCrearFolderOpen(true);
    };

    const handleOpenRedactar = (info?: any) => {
        setInfoAEditar(info || null); // Si viene info, es editar; si no, es nuevo.
        setIsRedactarModalOpen(true);
    };

    const handleOpenRedactarNoticia = (noticia?: any) => {
        setInfoAEditar(noticia || null);
        setIsRedactarNoticiaOpen(true);
    };


    const handleOpenGestion = (cliente: Cliente) => {
        setClienteSeleccionado(cliente);
        setIsGestionModalOpen(true);
    };

    const handleOpenEliminar = (id: number | string, title: string) => {
        setItemAEliminar({ id, title });
        setIsEliminarModalOpen(true);
    };

    const handleViewChange = (viewId: ViewID, title: string) => {
        setActiveView(viewId);
        setViewTitle(title);
        setIsSidebarOpen(false); // Cierra el sidebar en móvil al cambiar de vista
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
                        {/* Renderizado de vistas pasando las funciones (props) necesarias */}
                        {activeView === 'view-directorio' && (
                            <Directorio onOpenGestion={handleOpenGestion} />
                        )}

                        {activeView === 'view-repositorio-root' && (
                            <Biblioteca
                                onOpenCrear={(conf) => { setCrearConfig(conf); setIsCrearFolderOpen(true); }}
                                onOpenSubir={(id) => { /* Tu lógica de modal subir archivo usando ese id */ }}
                                refreshSignal={refreshSignal}
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
                                onOpenEliminar={handleOpenEliminar} // Reusamos el modal eliminar
                            />
                        )}

                    </div>

                    <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-400 text-[0.75rem] font-light max-w-350 mx-auto pb-4">
                        &copy; 2026 MHORIZON ECUADOR. Intranet Confidencial Operativa.
                    </footer>
                </main>
            </div>

            {/* --- ZONA DE MODALES GLOBALES --- */}

            <ModalGestionCliente
                isOpen={isGestionModalOpen}
                onClose={() => setIsGestionModalOpen(false)}
                cliente={clienteSeleccionado}
                onOpenSubir={() => setIsSubirArchivoOpen(true)} // <-- Conectado
                onOpenDeclaracion={() => setIsDeclaracionModalOpen(true)} // <-- CONECTADO
                onOpenEliminar={handleOpenEliminar}
            />

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
            <ModalAñadirDeclaracion
                isOpen={isDeclaracionModalOpen}
                onClose={() => setIsDeclaracionModalOpen(false)}
                onBackToGestion={() => setIsGestionModalOpen(true)} // Para regresar al cerrar
            />

            <ModalEliminar
                isOpen={isEliminarModalOpen}
                onClose={() => setIsEliminarModalOpen(false)}
                onConfirm={handleConfirmEliminar}
                itemTitle={itemAEliminar.title}
            />

            <ModalSubirArchivo
                isOpen={isSubirArchivoOpen}
                onClose={() => setIsSubirArchivoOpen(false)}
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