import React, { useEffect, useState } from 'react';
import { ScrollReveal } from '../../../ScrollReveal';
import api from '../../../../api/axios';

interface Cliente {
  id: number;
  tipo_persona: 'Natural' | 'Jurídica';
  razon_social_nombres: string;
  identificacion: string;
  score_tributario: number;
  creador?: {
    id: number;
    nombre: string;
    apellido: string;
  };
}

interface DirectorioProps {
  onOpenGestion: (cliente: Cliente) => void;
  onOpenAñadir: () => void;
  refreshSignal?: number;
}

const Directorio: React.FC<DirectorioProps> = ({ onOpenGestion, onOpenAñadir, refreshSignal }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [busqueda, setBusqueda] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/cliente');
      setClientes(data.clientes);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, [refreshSignal]);

  const handleBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value);
    setCurrentPage(1); 
  };

  // 1. Filtrar todos los clientes basados en la búsqueda
  const clientesFiltrados = clientes.filter(c => 
    c.razon_social_nombres.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.identificacion.includes(busqueda)
  );

  const totalPages = Math.ceil(clientesFiltrados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  
  const clientesActuales = clientesFiltrados.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        <p className="text-gray-400 text-sm animate-pulse uppercase tracking-widest">Cargando Directorio...</p>
      </div>
    );
  }

  return (
    <ScrollReveal>
      <div className="max-w-350 mx-auto space-y-6 reveal-element delay-300">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-blue-200 tracking-tight leading-tight">
              Directorio de Clientes
            </h1>
            <p className="text-gray-500 font-light mt-1">
              Gestión de {clientes.length} entidades registradas en el sistema.
            </p>
          </div>

          <button onClick={onOpenAñadir} className="bg-blue-200 cursor-pointer text-white text-[0.8rem] font-bold uppercase tracking-widest px-6 py-3.5 rounded-lg shadow-lg hover:bg-orange-500 transition-all flex items-center justify-center gap-2 shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Añadir Cliente
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="relative w-full lg:w-96">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={busqueda}
                onChange={handleBusqueda}
                placeholder="Buscar por Razón Social, Nombres o RUC/Cédula..."
                className="pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[0.85rem] focus:ring-1 focus:ring-orange-500 outline-none w-full transition-all text-blue-200"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-225">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-[0.70rem] font-bold uppercase tracking-widest text-gray-500">
                  <th className="px-6 py-4">Empresa / Cliente</th>
                  <th className="px-6 py-4 text-center">Tipo</th>
                  <th className="px-6 py-4">Score Tributario</th>
                  <th className="px-6 py-4">Gestionado por</th>
                  <th className="px-6 py-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-[0.85rem] divide-y divide-gray-100">
                {clientesActuales.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-black text-white ${cliente.tipo_persona === 'Jurídica' ? 'bg-blue-200' : 'bg-orange-400'}`}>
                          {cliente.razon_social_nombres.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-blue-200 text-[0.95rem] leading-none mb-1">
                            {cliente.razon_social_nombres}
                          </p>
                          <span className="text-xs text-gray-400 font-medium">ID: {cliente.identificacion}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`px-2 py-1 rounded text-[0.65rem] font-bold uppercase ${cliente.tipo_persona === 'Jurídica' ? 'bg-blue-50 text-blue-200' : 'bg-orange-50 text-orange-600'}`}>
                        {cliente.tipo_persona}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full max-w-15 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${cliente.score_tributario > 80 ? 'bg-green-500' : 'bg-orange-500'}`}
                            style={{ width: `${cliente.score_tributario}%` }}
                          ></div>
                        </div>
                        <span className="text-blue-200 font-black">{cliente.score_tributario}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-gray-500 italic text-xs">
                        {cliente.creador ? `${cliente.creador.nombre} ${cliente.creador.apellido}` : 'Sistema'}
                      </p>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => onOpenGestion(cliente)}
                        className="cursor-pointer inline-flex items-center gap-2 bg-orange-50 text-orange-500 border border-orange-200 px-4 py-2 rounded-lg font-bold uppercase tracking-widest text-[0.70rem] hover:bg-orange-500 hover:text-white transition-all shadow-sm active:scale-95"
                      >
                        Gestionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {clientesFiltrados.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-400 italic">No se encontraron clientes que coincidan con la búsqueda.</p>
            </div>
          )}

          {clientesFiltrados.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">
                Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, clientesFiltrados.length)} de {clientesFiltrados.length} resultados
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={goToPreviousPage} 
                  disabled={currentPage === 1}
                  className="p-2 cursor-pointer rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <span className="text-xs font-bold text-gray-600 px-2">
                  Página {currentPage} de {totalPages || 1}
                </span>
                <button 
                  onClick={goToNextPage} 
                  disabled={currentPage >= totalPages}
                  className="p-2 cursor-pointer rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </ScrollReveal>
  );
};

export default Directorio;