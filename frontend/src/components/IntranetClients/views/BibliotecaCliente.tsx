import React, { useState } from 'react';
import { type DocumentoCliente } from '../type';
import { ScrollReveal } from '../../ScrollReveal';

const BibliotecaCliente: React.FC = () => {
  // Mock de datos
  const documentos: DocumentoCliente[] = [
    { id: '1', nombre: 'Certificado Cumplimiento Scvs.pdf', carpeta: 'Docs. Legales', fecha: 'Abr 01, 2026', subidoPor: 'Violeta Rodríguez', tipo: 'pdf' },
    { id: '2', nombre: 'IVA Marzo 2026 Borrador.pdf', carpeta: 'Declaraciones', fecha: 'Mar 28, 2026', subidoPor: 'Milton Montecé Q.', tipo: 'pdf' },
    { id: '3', nombre: 'Matriz_Anexos_Feb.xlsx', carpeta: 'Anexos Mens.', fecha: 'Mar 10, 2026', subidoPor: 'Violeta Rodríguez', tipo: 'excel' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCarpeta, setFilterCarpeta] = useState('all');

  return (
    <ScrollReveal>
      <div className="max-w-350 mx-auto space-y-6 reveal-element">
        <h1 className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-blue-200 tracking-tight leading-tight mb-2">
          Biblioteca de Archivos
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center w-full sm:w-auto bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus-within:border-orange-500 transition-colors">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar documento..."
              className="bg-transparent border-none outline-none w-full sm:w-64 text-sm text-blue-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-auto">
            <select
              className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-orange-500"
              value={filterCarpeta}
              onChange={(e) => setFilterCarpeta(e.target.value)}
            >
              <option value="all">Todas las carpetas</option>
              <option value="declaraciones">Declaraciones</option>
              <option value="financieros">Estados Financieros</option>
              <option value="anexos">Anexos Mensuales</option>
              <option value="legales">Documentos Legales</option>
            </select>
          </div>
        </div>

        {/* Tabla de Documentos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-212.5">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-[0.70rem] font-bold uppercase tracking-widest text-gray-500">
                  <th className="px-6 py-4">Nombre del Archivo</th>
                  <th className="px-6 py-4">Carpeta</th>
                  <th className="px-6 py-4">Añadido Por</th>
                  <th className="px-6 py-4">Fecha</th>
                  <th className="px-6 py-4 text-center">Descargar</th>
                </tr>
              </thead>
              <tbody className="text-[0.85rem] divide-y divide-gray-50">
                {documentos.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-blue-200 flex items-center gap-3">
                      {doc.tipo === 'pdf' ? (
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                      {doc.nombre}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${doc.carpeta === 'Docs. Legales' ? 'bg-purple-50 text-purple-700' :
                        doc.carpeta === 'Declaraciones' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                        {doc.carpeta}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-blue-200 font-medium">{doc.subidoPor}</td>
                    <td className="px-6 py-4 text-gray-500">{doc.fecha}</td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-gray-400 hover:text-orange-500 transition-colors" title="Descargar">
                        <span className="material-symbols-outlined">download</span>
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

export default BibliotecaCliente;