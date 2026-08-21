/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';
import { Header, Footer, AnalisisBoletin, Frase, InfoRelaci } from '../../components'
import { Helmet} from 'react-helmet-async';

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
        <main className='m-auto '>
            <Header />
            {informativo && (
                <Helmet>
                    <title>{informativo.titulo} | MHORIZON</title>
                    <meta name="description" content={informativo.descripcion_portada} />
                    <meta property="og:title" content={informativo.titulo} />
                    <meta property="og:description" content={informativo.descripcion_portada} />
                </Helmet>
            )}

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
                <Frase blanco='ELEVE EL ESTÁNDAR DE SU' naranja='GESTIÓN CORPORATIVA' styles='font-extrabold text-[2.2rem] sm:text-[2.8rem] md:text-[3rem] leading-[1.1] mb-6 uppercase' />
                <Footer />
            </section>
        </main>
    )
}