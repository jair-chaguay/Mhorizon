import React, { useState } from 'react';
import Sidebar from './SideBar'; // Verifica si tu archivo es SideBar.tsx o Sidebar.tsx
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

const IntranetLayout: React.FC = () => {
    // Estados principales de navegación
    const [activeView, setActiveView] = useState<ViewID>('view-directorio');
    const [viewTitle, setViewTitle] = useState('Directorio de Clientes');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Estados de los Modales
    const [isGestionModalOpen, setIsGestionModalOpen] = useState(false);
    const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);
    const [isDeclaracionModalOpen, setIsDeclaracionModalOpen] = useState(false);
    const [isCrearFolderOpen, setIsCrearFolderOpen] = useState(false);
    const [crearFolderConfig, setCrearFolderConfig] = useState({ title: '', placeholder: '' });

    const [isRedactarModalOpen, setIsRedactarModalOpen] = useState(false);

    const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false);
    const [itemAEliminar, setItemAEliminar] = useState({ id: '', title: '' });

    // NUEVO: Estado para el modal de subir archivo
    const [isSubirArchivoOpen, setIsSubirArchivoOpen] = useState(false);
    const [isRedactarNoticiaOpen, setIsRedactarNoticiaOpen] = useState(false);

    // Handlers
    const handleOpenCrearFolder = (title: string, placeholder: string) => {
        setCrearFolderConfig({ title, placeholder });
        setIsCrearFolderOpen(true);
    };

    const handleOpenGestion = (cliente: Cliente) => {
        setClienteSeleccionado(cliente);
        setIsGestionModalOpen(true);
    };

    const handleOpenEliminar = (id: string, title: string) => {
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
                                onOpenCrear={handleOpenCrearFolder}
                                onOpenSubir={() => setIsSubirArchivoOpen(true)} // <-- Conectado
                            />
                        )}

                        {activeView === 'view-informativos' && (
                            <Informativos
                                onOpenRedactar={() => setIsRedactarModalOpen(true)}
                                onOpenEliminar={handleOpenEliminar}
                            />
                        )}

                        {activeView === 'view-noticias' && (
                            <Noticias
                                onOpenRedactar={() => setIsRedactarNoticiaOpen(true)}
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
                title={crearFolderConfig.title}
                placeholder={crearFolderConfig.placeholder}
            />

            <ModalRedactarInformativo
                isOpen={isRedactarModalOpen}
                onClose={() => setIsRedactarModalOpen(false)}
            />
            <ModalAñadirDeclaracion
                isOpen={isDeclaracionModalOpen}
                onClose={() => setIsDeclaracionModalOpen(false)}
                onBackToGestion={() => setIsGestionModalOpen(true)} // Para regresar al cerrar
            />

            <ModalEliminar
                isOpen={isEliminarModalOpen}
                onClose={() => setIsEliminarModalOpen(false)}
                onConfirm={() => {
                    console.log(`Eliminando el item ${itemAEliminar.title}...`);
                    setIsEliminarModalOpen(false);
                }}
                itemTitle={itemAEliminar.title}
            />

            <ModalSubirArchivo
                isOpen={isSubirArchivoOpen}
                onClose={() => setIsSubirArchivoOpen(false)}
            />

            <ModalRedactarNoticia
                isOpen={isRedactarNoticiaOpen}
                onClose={() => setIsRedactarNoticiaOpen(false)}
            />

        </div>
    );
};

export default IntranetLayout;