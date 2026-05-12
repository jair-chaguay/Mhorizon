/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Header, Footer, HeroNovedades, Filters, Boletin, Frase } from '../../components';
import api from '../../api/axios';

export const NovedadesPage = () => {
    const [informativos, setInformativos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Límite de tarjetas por página
    const ITEMS_PER_PAGE = 8;

    useEffect(() => {
        const fetchInformativos = async () => {
            try {
                setLoading(true);
                const response = await api.get('/informativo');
                setInformativos(response.data.informativos || []);
            } catch (error) {
                console.error("Error al cargar novedades:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInformativos();
    }, []);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };


    const informativosFiltrados = informativos.filter(info =>
        info.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (info.descripcion_portada && info.descripcion_portada.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (info.resolucion_oficial && info.resolucion_oficial.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const totalPages = Math.ceil(informativosFiltrados.length / ITEMS_PER_PAGE);
    const informativosPaginados = informativosFiltrados.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <main className='m-auto'>
            <Header />
            <HeroNovedades />

            <Filters searchTerm={searchTerm} onSearchChange={handleSearch} />

            <Boletin
                boletines={informativosPaginados}
                loading={loading}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            <section className='bg-blue-200'>
                <Frase blanco='ELEVE EL ESTÁNDAR DE SU' naranja='GESTIÓN CORPORATIVA' styles='font-extrabold text-[2.2rem] sm:text-[2.8rem] md:text-[3rem] leading-[1.1] mb-6 uppercase' />
                <Footer />
            </section>
        </main>
    )
}