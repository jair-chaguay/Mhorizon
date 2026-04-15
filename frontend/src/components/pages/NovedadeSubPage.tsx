/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios'; 
import { Header, Footer, AnalisisBoletin, Frase, InfoRelaci } from '../../components'

export const NovedadeSubPage = () => {
    const { id } = useParams(); 
    const [informativo, setInformativo] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBoletin = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/informativo/${id}`);
                setInformativo(response.data.informativo || response.data); 
            } catch (error) {
                console.error("Error al cargar el boletín detallado:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBoletin();
        }
    }, [id]);

    return (
        <main className='m-auto overflow-hidden'>
            <Header />

            {loading ? (
                <div className="py-32 flex justify-center items-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
            ) : informativo ? (
                <>
                    
                    
                    <AnalisisBoletin informativo={informativo} />
                </>
            ) : (
                <div className="py-32 text-center text-gray-500 font-bold text-xl min-h-screen flex items-center justify-center">
                    Boletín no encontrado.
                </div>
            )}
            
            <InfoRelaci />
            <section className='bg-blue-200'>
                <Frase blanco='¿Necesitas soporte con esta'
                    naranja='implementación?' styles='font-extrabold text-[2rem] sm:text-[2.6rem] md:text-[3rem] leading-[1.1] mb-6 tracking-tight' />
                <Footer />
            </section>
        </main>
    )
}