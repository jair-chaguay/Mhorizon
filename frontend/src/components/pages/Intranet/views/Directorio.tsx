import React from 'react';
import { type Cliente } from '../types';
import { ScrollReveal } from '../../../ScrollReveal';

interface DirectorioProps {
  onOpenGestion: (cliente: Cliente) => void;
}


const Directorio: React.FC<DirectorioProps> = ({ onOpenGestion }) => {
  const clientes: Cliente[] = [
    { id: '1', nombre: 'Sony Group Corporation', ruc: '1790012345001', score: 92, vencimiento: '25 Mar 2026' },
    { id: '2', nombre: 'Exolum Ecuador S.A.', ruc: '0998877665001', score: 88, vencimiento: '10 Abr 2026' },
  ];

  return (
    <ScrollReveal>
      <div className="max-w-350 mx-auto space-y-6 reveal-element delay-300">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-blue-200 tracking-tight leading-tight">
              Directorio de Clientes
            </h1>
            <p className="text-gray-500 font-light mt-1">Gestione perfiles, score tributario y vencimientos fiscales.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="relative w-full lg:w-72">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar Razón Social o RUC..."
                className="pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[0.85rem] focus:ring-1 focus:ring-orange-500 outline-none w-full transition-all text-blue-200"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-237.5">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-[0.70rem] font-bold uppercase tracking-widest text-gray-500">
                  <th className="px-6 py-4">Empresa / Razón Social</th>
                  <th className="px-6 py-4">Score Tributario</th>
                  <th className="px-6 py-4">Vencimiento Fiscal</th>
                  <th className="px-6 py-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-[0.85rem] divide-y divide-gray-100">
                {clientes.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-200 text-white flex items-center justify-center shrink-0 font-black tracking-wider uppercase">
                          {cliente.nombre.substring(0, 2)}
                        </div>
                        <div>
                          <p className="font-bold text-blue-200 text-[0.95rem]">{cliente.nombre}</p>
                          <span className="text-xs text-gray-400 font-medium">RUC: {cliente.ruc}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <span className="text-blue-200 font-black text-xl">
                          {cliente.score}<span className="text-xs text-gray-400">/100</span>
                        </span>
                        <span className={`w-2 h-2 rounded-full ${cliente.score > 90 ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-gray-600 font-bold bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-lg text-[0.75rem]">
                        {cliente.vencimiento}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => onOpenGestion(cliente)}
                        className="cursor-pointer inline-flex items-center gap-2 bg-orange-50 text-orange-500 border border-orange-200 px-4 py-2 rounded-lg font-bold uppercase tracking-widest text-[0.70rem] hover:bg-orange-500 hover:text-white transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        </svg>
                        Gestionar Perfil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ScrollReveal>

  );
};

export default Directorio;