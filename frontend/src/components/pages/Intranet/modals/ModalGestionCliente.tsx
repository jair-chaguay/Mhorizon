import React from 'react';
import { type Cliente } from '../types';
import { ScrollReveal } from '../../../ScrollReveal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cliente: Cliente | null;
  onOpenSubir: () => void;
  onOpenDeclaracion: () => void; 
  onOpenEliminar: (id: string, title: string) => void;
}

const ModalGestionCliente: React.FC<Props> = ({ isOpen, onClose, cliente, onOpenSubir, onOpenDeclaracion, onOpenEliminar }) => {
  if (!isOpen || !cliente) return null;

  const handleSubirDocumento = () => {
    onClose(); 
    setTimeout(() => {
      onOpenSubir(); 
    },20);
  };

  const handleAñadirDeclaracion = () => {
    onClose();
     onOpenDeclaracion();
  };

  return (
    <ScrollReveal className="fixed inset-0 bg-black/80 backdrop-blur-sm z-110 flex justify-center items-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative flex flex-col max-h-[90vh] overflow-hidden scale-100 transition-transform reveal-element delay-200">

        <div className="bg-blue-200 p-6 pr-12 relative shrink-0 rounded-t-2xl">
          <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.70rem] uppercase mb-1 block">
            Gestión de Perfil
          </span>
          <h2 className="text-white font-extrabold text-[1.4rem] leading-tight">
            {cliente.nombre}
          </h2>
          <p className="text-gray-400 text-[0.8rem] mt-1 font-mono">
            RUC: {cliente.ruc}
          </p>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-white cursor-pointer bg-white/10 rounded-full p-1.5 transition-colors focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto no-scrollbar bg-gray-50 flex-1">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-blue-200 font-bold text-[0.85rem] uppercase tracking-wide mb-3">
                  Score Tributario
                </h4>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    defaultValue={cliente.score}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 font-bold outline-none focus:border-orange-500"
                    min="0"
                    max="100"
                  />
                  <span className="text-gray-400 font-bold">/ 100</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-blue-200 font-bold text-[0.85rem] uppercase tracking-wide mb-3">
                  Próximo Vencimiento
                </h4>
                <input
                  type="text"
                  defaultValue={cliente.vencimiento}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 font-bold outline-none focus:border-orange-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h4 className="text-blue-200 font-bold text-[0.95rem] uppercase tracking-wide">Historial de Declaraciones</h4>
                  <p className="text-gray-500 text-[0.75rem] font-light">Gestione los pagos y presentaciones de impuestos.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAñadirDeclaracion}
                  className="bg-blue-200 cursor-pointer text-white text-[0.70rem] font-bold uppercase tracking-widest px-4 py-2.5 rounded shadow hover:bg-orange-500 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                  Añadir Declaración
                </button>
              </div>

              <div className="overflow-x-auto border border-gray-100 rounded-lg">
                <table className="w-full text-left border-collapse min-w-175">
                  <thead className="bg-gray-50 border-b border-gray-100 text-[0.65rem] font-bold uppercase tracking-widest text-gray-500">
                    <tr>
                      <th className="px-4 py-3">Periodo</th>
                      <th className="px-4 py-3">Impuesto</th>
                      <th className="px-4 py-3">Estado</th>
                      <th className="px-4 py-3">Gestionado Por</th>
                      <th className="px-4 py-3 text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="text-[0.8rem] divide-y divide-gray-50">
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 font-bold text-blue-200">Feb 2026</td>
                      <td className="px-4 py-3 text-gray-600">IVA (104)</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-[0.60rem] font-bold uppercase tracking-widest text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-200">Pagada</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">Milton Montecé Q.</td>
                      <td className="px-4 py-3 text-center flex justify-center gap-2">
                        <button type="button" onClick={handleAñadirDeclaracion} className="text-gray-400 hover:text-orange-500 transition-colors" title="Editar"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button>
                        <button type="button" onClick={() => onOpenEliminar('decl-1', 'Declaración')} className="text-gray-400 hover:text-red-500 transition-colors" title="Eliminar"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mt-6">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h4 className="text-blue-200 font-bold text-[0.95rem] uppercase tracking-wide">
                    Biblioteca del Cliente
                  </h4>
                  <p className="text-gray-500 text-[0.75rem] font-light">
                    Gestione los reportes visibles para este cliente.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSubirDocumento}
                  className="cursor-pointer bg-blue-200 text-white text-[0.70rem] font-bold uppercase tracking-widest px-4 py-2.5 rounded shadow hover:bg-orange-500 transition-colors flex items-center justify-center gap-2 shrink-0"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                  </svg>
                  Subir Documento
                </button>
              </div>

              <div className="overflow-x-auto border border-gray-100 rounded-lg">
                <table className="w-full text-left border-collapse min-w-150">
                  <thead className="bg-gray-50 border-b border-gray-100 text-[0.65rem] font-bold uppercase tracking-widest text-gray-500">
                    <tr>
                      <th className="px-4 py-3">Archivo</th>
                      <th className="px-4 py-3">Fecha</th>
                      <th className="px-4 py-3 text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="text-[0.8rem] divide-y divide-gray-50">
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 font-bold text-blue-200">Dictamen_Final_2025.pdf</td>
                      <td className="px-4 py-3 text-gray-600">15 Mar 2026</td>
                      <td className="px-4 py-3 text-center">
                        <button type="button" className="text-gray-400 hover:text-red-500 transition-colors" title="Eliminar">
                          <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 font-bold text-blue-200">Matriz_Tributaria.xlsx</td>
                      <td className="px-4 py-3 text-gray-600">10 Mar 2026</td>
                      <td className="px-4 py-3 text-center">
                        <button type="button" className="text-gray-400 hover:text-red-500 transition-colors" title="Eliminar">
                          <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-gray-100 bg-white shrink-0 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 cursor-pointer py-3.5 border border-gray-200 rounded-md text-gray-600 font-bold uppercase tracking-wider text-[0.80rem] hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            className=" cursor-pointer flex-1 py-3.5 bg-orange-500 text-white rounded-md font-bold uppercase tracking-wider text-[0.80rem] hover:bg-blue-200 shadow-md transition-all"
          >
            Guardar Perfil
          </button>
        </div>

      </div>
    </ScrollReveal>
  );
};

export default ModalGestionCliente;