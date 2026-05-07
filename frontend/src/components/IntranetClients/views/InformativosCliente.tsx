/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { ScrollReveal } from '../../ScrollReveal';
import { Navegacion } from '../../Novedades/Navegacion';
import api from '../../../api/axios';
import { Link } from 'react-router-dom';

const InformativosCliente: React.FC = () => {
    const [informativos, setInformativos] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 6;

    useEffect(() => {
        const fetchInformativos = async () => {
            try {
                setLoading(true);
                const response = await api.get('/informativo');
                setInformativos(response.data.informativos || []);
            } catch (error) {
                console.error("Error al cargar informativos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInformativos();
    }, []);

    const formatearFecha = (fechaIso: string) => {
        if (!fechaIso) return '';
        const fecha = new Date(fechaIso);
        return fecha.toLocaleDateString('es-EC', {
            day: '2-digit', month: 'long', year: 'numeric'
        }).toUpperCase();
    };

    const obtenerUrlImagen = (ruta: string | null) => {
        return ruta ||'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop'
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Volver a la página 1 al buscar
    };

    const filteredInformativos = informativos.filter((info) => {
        const tituloMatch = info.titulo.toLowerCase().includes(searchTerm.toLowerCase());
        const resolucionMatch = info.resolucion_oficial?.toLowerCase().includes(searchTerm.toLowerCase());
        return tituloMatch || resolucionMatch;
    });

    const totalPages = Math.ceil(filteredInformativos.length / ITEMS_PER_PAGE);
    const informativosPaginados = filteredInformativos.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <ScrollReveal className="max-w-350 mx-auto space-y-6">
            <h1 className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-blue-200 tracking-tight leading-tight mb-2">
                Informativos MHorizon
            </h1>

            <div className="reveal-element bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    placeholder="Buscar por título o resolución..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full outline-none text-sm text-gray-600 placeholder-gray-400 bg-transparent"
                />
            </div>

            {loading ? (
                <div className="py-20 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
            ) : filteredInformativos.length === 0 ? (
                <div className="py-20 text-center text-gray-500 text-lg font-medium">
                    {searchTerm !== '' 
                        ? `No se encontraron resultados para "${searchTerm}".` 
                        : "No se encontraron informativos publicados."}
                </div>
            ) : (
                <>
                    <ScrollReveal>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-element mt-10">
                            {informativosPaginados.map((info) => (
                                <div key={info.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                                    <div className="h-40 bg-gray-200 overflow-hidden relative">
                                        <img
                                            src={obtenerUrlImagen(info.imagen_portada_url)}
                                            className="w-full h-full object-cover"
                                            alt={info.titulo}
                                        />
                                        <div className="absolute top-3 left-3 bg-blue-600 text-white text-[0.65rem] font-bold uppercase tracking-widest px-2 py-1 rounded shadow-sm">
                                            {info.resolucion_oficial || 'Informativo'}
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col flex-1">
                                        <p className="text-[0.7rem] text-gray-400 font-bold uppercase tracking-widest mb-1">
                                            {formatearFecha(info.created_at)}
                                        </p>
                                        <h3 className="text-blue-200 font-bold text-lg leading-tight mb-2 line-clamp-2">
                                            {info.titulo}
                                        </h3>
                                        <p className="text-gray-500 text-sm flex-1 line-clamp-3">
                                            {info.descripcion_portada}
                                        </p>
                                        <Link to={`/novedades-sub/${info.id}`} className="inline-flex items-center gap-2 mt-8 text-blue-200 font-medium text-sm group/link hover:text-orange-500 transition-colors">
                                            Leer completo
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>

                    {totalPages > 1 && (
                        <Navegacion
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </>
            )}
        </ScrollReveal>
    );
};

export default InformativosCliente;