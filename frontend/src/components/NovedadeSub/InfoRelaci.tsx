import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BoletinCard, type boletinesProps } from "../Novedades/BoletinCard";
import { ScrollReveal } from "../ScrollReveal";
import api from "../../api/axios"; // <-- AJUSTA ESTA RUTA según la ubicación de tu archivo axios

export const InfoRelaci = () => {
    const [boletines, setBoletines] = useState<boletinesProps[]>([]);
    const [loading, setLoading] = useState(true);

    // Función para formatear la fecha estilo "27 DE FEBRERO, 2026"
    const formatearFecha = (fechaIso: string) => {
        const fecha = new Date(fechaIso);
        return fecha.toLocaleDateString('es-EC', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }).toUpperCase();
    };

    useEffect(() => {
    const fetchInformativos = async () => {
        try {
            setLoading(true);
            const response = await api.get('/informativo');
            
            const lista = response.data.informativos || [];
            
            const mapeados = lista.slice(0, 3).map((info: any) => ({
                id: info.id,
                fecha: formatearFecha(info.created_at),
                image: info.imagen_portada_url,
                titulo: info.titulo,
                content: info.descripcion_portada
            }));

            setBoletines(mapeados);
        } catch (error) {
            console.error("Error capturado:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchInformativos();
}, []);

    return (
        <ScrollReveal as={"section"} className="py-24 bg-white border-b border-gray-200 overflow-hidden">
            <ScrollReveal className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">

                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
                            Thought Leadership
                        </span>
                        <h2 className="text-blue-200 font-bold text-[2.2rem] sm:text-[2.6rem] uppercase tracking-tight leading-tight">
                            INFORMATIVOS MHORIZON
                        </h2>
                    </div>
                    <Link to={"/novedades"} className="inline-flex items-center gap-2 text-blue-200 font-bold uppercase tracking-wider text-[0.9rem] border-b-2 border-blue-200 hover:text-orange-500 hover:border-orange-500 transition-colors pb-1">
                        Ver todos los informativos
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {boletines.length > 0 ? (
                            boletines.map((boletin) => (
                                <BoletinCard key={boletin.id} {...boletin} />
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-400 italic">
                                No hay informativos publicados aún.
                            </p>
                        )}
                    </div>
                )}
            </ScrollReveal>
        </ScrollReveal>
    )
}