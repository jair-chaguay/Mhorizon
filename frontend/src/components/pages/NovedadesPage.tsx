import { useState, useEffect } from 'react';
import { Header, Footer, HeroNovedades, Filters, Boletin, Frase } from '../../components';
import api from '../../api/axios'; // Importamos tu API

export const NovedadesPage = () => {
    // 1. Estados para almacenar los datos y la interacción
    const [informativos, setInformativos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    
    // Límite de tarjetas por página
    const ITEMS_PER_PAGE = 8;

    // 2. Traer los datos al cargar la página
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

    // 3. Función para buscar (reinicia a la página 1 cuando escribes)
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
        <main className='m-auto overflow-hidden'>
            <Header />
            <HeroNovedades />
            
            <Filters searchTerm={searchTerm} onSearchChange={handleSearch} />
            
            {/* Pasamos los datos cortados y la paginación al contenedor de boletines */}
            <Boletin 
                boletines={informativosPaginados} 
                loading={loading}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
            
            <section className='bg-blue-200'>
                <Frase blanco='Impulsa tu empresa con' naranja='asesoría experta' styles='font-bold text-[2rem] sm:text-[2.8rem] md:text-[3.2rem] leading-[1.1] mb-6 tracking-tight'/>
                <Footer />
            </section>
        </main>
    )
}