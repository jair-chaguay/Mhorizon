import React, { useEffect, useState } from 'react';
import { ScrollReveal } from '../../../ScrollReveal';
import api from '../../../../api/axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver';


interface InformativosProps {
  onOpenRedactar: (info?: Informativo) => void;
  onOpenEliminar: (id: number, title: string) => void;
}

export interface Correos {
  id: number;
  email: string;
  nombres: string;
}

interface Informativo {
  id: number;
  titulo: string;
  resolucion_oficial: string | null;
  descripcion_portada: string;
  contenido: string;
  imagen_portada_url: string | null;
  pdf_url: string | null;
  created_at: string;
  creador?: {
    id: number;
    nombre: string;
    apellido: string;
  };
}

const Informativos: React.FC<InformativosProps> = ({ onOpenRedactar, onOpenEliminar }) => {
  const [informativos, setInformativos] = useState<Informativo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [correos, setCorreos] = useState<Correos[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchInformativos = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/informativo');
      setInformativos(data.informativos);
    } catch (error) {
      console.error("Error al cargar informativos:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCorreos = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/correo-informativo');
      setCorreos(data.correos || data.data);
    } catch (error) {
      console.error("Error al cargar correos:", error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInformativos();
    fetchCorreos();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredInformativos = informativos.filter((info) => {
    const tituloMatch = info.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const resolucionMatch = info.resolucion_oficial?.toLowerCase().includes(searchTerm.toLowerCase());
    return tituloMatch || resolucionMatch;
  });


  const exportarPDF = () => {
    const doc = new jsPDF('landscape', 'pt', 'a4');
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total de correos de Informativos registrados: ${correos.length}`, 40, 60);
    const tableData = correos.map((c, index) => {
      return [
        index + 1,
        c.nombres || 'N/A',
        c.email || 'N/A'
      ];
    });

    autoTable(doc, {
      startY: 90,
      head: [['#', 'Nombres', 'Correo Electrónico']],
      body: tableData,
      theme: 'striped',
      headStyles: {
        fillColor: [249, 115, 22],
        textColor: 255
      },
      styles: {
        fontSize: 10,
        cellPadding: 6,
      }
    });
    doc.save('Base_Correos_Informativos.pdf');
  }

  const exportarExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Correos Informativos');

    worksheet.columns = [
      { header: '#', key: 'id', width: 8 },
      { header: 'Nombres / Empresa', key: 'nombres', width: 35 },
      { header: 'Correo Electrónico', key: 'email', width: 35 }
    ];

    const headerRow = worksheet.getRow(1);
    headerRow.height = 25;

    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF171E27' }
      };

      cell.font = {
        color: { argb: 'FFFFFFFF' },
        bold: true,
        size: 11
      };

      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center'
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    correos.forEach((c) => {
      const row = worksheet.addRow({
        id: c.id || 'N/A',
        nombres: c.nombres || 'N/A',
        email: c.email || 'N/A'
      });

      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'left',
          wrapText: true
        };
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'Base_Correos_Informativos.xlsx');
  }

  const totalPages = Math.ceil(filteredInformativos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentInformativos = filteredInformativos.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
        <p className="text-slate-400 text-sm animate-pulse">Cargando Informativos...</p>
      </div>
    );
  }

  return (
    <ScrollReveal className="max-w-350 mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 reveal-element relative z-20">
        
        <div>
          <h1 className="text-xl sm:text-[22px] font-medium text-slate-900 tracking-tight leading-tight">
            Gestor de Informativos
          </h1>
          <p className="text-slate-500 mt-1">Administre los boletines y publicaciones fiscales.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          
          <div className='relative w-full sm:w-auto'>
            <button
              onClick={() => setShowDownloadMenu(!showDownloadMenu)}
              className='cursor-pointer bg-brand-600 text-white text-[13px] font-medium px-5 py-2.5 rounded-lg hover:bg-brand-700 transition-all flex items-center justify-center gap-2 w-full sm:w-auto'
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Descargar Correos Inf.
              <svg className={`w-4 h-4 transition-transform duration-200 ${showDownloadMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            {showDownloadMenu && (
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden z-50'>
                <button
                  onClick={() => {
                    exportarPDF();
                    setShowDownloadMenu(false);
                  }}
                  className='cursor-pointer w-full text-left px-4 py-3 text-[13px] font-medium text-slate-600 hover:bg-red-50 hover:text-red-500 transition-colors flex items-center gap-2'
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                  Formato PDF
                </button>

                <button
                  onClick={() => {
                    exportarExcel();
                    setShowDownloadMenu(false);
                  }}
                  className='cursor-pointer w-full text-left px-4 py-3 text-[13px] font-medium text-slate-600 hover:bg-green-50 hover:text-green-600 transition-colors border-t border-slate-50 flex items-center gap-2'
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                  Formato Excel
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => onOpenRedactar()}
            className="bg-brand-600 cursor-pointer text-white text-[13px] font-medium px-6 py-2.5 rounded-lg hover:bg-brand-700 transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Redactar Informativo
          </button>

        </div>
      </div>

      <div className="reveal-element bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Buscar por título o resolución..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full outline-none text-sm text-slate-600 placeholder-slate-400 bg-transparent"
        />
      </div>

      <div className="bg-white reveal-element rounded-xl border border-slate-200 overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left min-w-225">
            <thead>
              <tr className="bg-slate-50/60 border-b border-slate-100 text-xs font-semibold text-slate-500">
                <th className="px-5 py-2.5 whitespace-nowrap">Título del Informativo</th>
                <th className="px-5 py-2.5 whitespace-nowrap">Resolución</th>
                <th className="px-5 py-2.5 hidden md:table-cell whitespace-nowrap">Archivos Adjuntos</th>
                <th className="px-5 py-2.5 whitespace-nowrap">Fecha Creada</th>
                <th className="px-5 py-2.5 whitespace-nowrap">Creado Por</th>
                <th className="px-5 py-2.5 text-center whitespace-nowrap">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {currentInformativos.map((info) => (
                <tr key={info.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-5 py-3">
                    <div className="font-medium text-slate-900 truncate max-w-xs" title={info.titulo}>
                      {info.titulo}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-500 font-mono text-xs">
                    {info.resolucion_oficial || 'N/A'}
                  </td>
                  <td className="px-5 py-3 text-xs hidden md:table-cell text-slate-400">
                    <div className="flex flex-col gap-1.5">
                      {info.imagen_portada_url && (
                        <div className="flex items-center gap-2 text-brand-600">
                          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <span className="font-medium italic">Imagen</span>
                        </div>
                      )}
                      {info.pdf_url && (
                        <div className="flex items-center gap-2 text-red-500">
                          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                          <span className="font-medium italic">Documento PDF</span>
                        </div>
                      )}
                      {!info.imagen_portada_url && !info.pdf_url && (
                        <span className="italic">Sin adjuntos</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-600">
                    {new Date(info.created_at).toLocaleDateString('es-EC', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-3 font-medium text-slate-900">
                    {info.creador ? `${info.creador.nombre} ${info.creador.apellido}` : 'Sistema'}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="cursor-pointer w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-brand-50 text-slate-400 hover:text-brand-700 transition-all"
                        title="Editar"
                        onClick={() => onOpenRedactar(info)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button
                        onClick={() => onOpenEliminar(info.id, info.titulo)}
                        className="cursor-pointer w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-red-50 text-slate-400 hover:text-red-600 transition-all"
                        title="Eliminar"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInformativos.length > 0 && (
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredInformativos.length)} de {filteredInformativos.length} resultados
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="h-8 w-8 grid place-items-center bg-white rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <span className="text-xs font-medium text-slate-600 px-2">
                Página {currentPage} de {totalPages || 1}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage >= totalPages}
                className="h-8 w-8 grid place-items-center bg-white rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        )}

        {filteredInformativos.length === 0 && (
          <div className="py-20 text-center text-slate-400 italic">
            No se encontraron informativos.
          </div>
        )}
      </div>
    </ScrollReveal>
  );
};

export default Informativos;