import React, { useEffect, useState } from 'react';
import { ScrollReveal } from '../../../ScrollReveal';
import api from '../../../../api/axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toggleEstadoUsuarioAPI } from '../hooks/usuarioService';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';



export interface Cliente {
  id: number;
  tipo_persona: 'Régimen General' | 'RIMPE' | 'Contribuyente Especial' | 'Persona Natural' | 'Entidad Pública';
  razon_social_nombres: string;
  identificacion: string;
  score_tributario: number;
  tipo_servicio?: string;
  tipo_contribuyente?: string;
  regimen_tributario?: string;
  agente_retencion?: boolean;
  actividad_economica?: string;
  sector?: string;
  telefono_contacto?: string;
  usuarios?: Array<{
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    correo_personal?: string;
    cargo?: string;
    activo?: boolean;
    rol_id?: number;
  }>;
  correos?: Array<{
    id: number;
    correo: string;
  }>;
  gestores?: Array<{
    id: number;
    nombre: string;
    apellido: string;
  }>;
}

interface DirectorioProps {
  onOpenGestion: (cliente: Cliente) => void;
  onOpenAñadir: () => void;
  refreshSignal?: number;
}

const Directorio: React.FC<DirectorioProps> = ({ onOpenGestion, onOpenAñadir, refreshSignal }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  const [busqueda, setBusqueda] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;



  const handleToggleEstadoUsuario = async (clienteId: number, usuario: NonNullable<Cliente['usuarios']>[0]) => {
    const estadoAnterior = usuario.activo !== false;
    const nuevoEstado = !estadoAnterior;

    // 1. Actualización optimista en la estructura de clientes
    setClientes(prevClientes => prevClientes.map(c => {
      if (c.id === clienteId && c.usuarios) {
        return {
          ...c,
          usuarios: c.usuarios.map(u => u.id === usuario.id ? { ...u, activo: nuevoEstado } : u)
        };
      }
      return c;
    }));

    try {
      await toggleEstadoUsuarioAPI(usuario.id, estadoAnterior);
    } catch (error) {
      console.error("Error al actualizar el estado del usuario desde el directorio:", error);
      setClientes(prevClientes => prevClientes.map(c => {
        if (c.id === clienteId && c.usuarios) {
          return {
            ...c,
            usuarios: c.usuarios.map(u => u.id === usuario.id ? { ...u, activo: estadoAnterior } : u)
          };
        }
        return c;
      }));
    }
  };


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

  const exportarPDF = () => {
    const doc = new jsPDF('landscape', 'pt', 'a4');
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total registrados: ${clientes.length} clientes`, 40, 60);
    const tableData = clientes.map((c) => {
      const contactoPrincipal = c.usuarios && c.usuarios.length > 0 ? c.usuarios[0] : null;
      const nombreContacto = contactoPrincipal ? `${contactoPrincipal.nombre} ${contactoPrincipal.apellido}` : 'N/A';
      const correoContacto = contactoPrincipal ? contactoPrincipal.correo : 'N/A';
      const infoContacto = `${nombreContacto}\n${correoContacto}\nTel: ${c.telefono_contacto || 'N/A'}`;

      const responsables = c.gestores && c.gestores.length > 0
        ? c.gestores.map(g => `${g.nombre} ${g.apellido}`).join(', ')
        : 'Sin Asignar';

      return [
        c.razon_social_nombres || 'N/A',
        c.identificacion || 'N/A',
        c.tipo_servicio || 'N/A',
        c.tipo_contribuyente || 'N/A',
        c.regimen_tributario || 'N/A',
        c.agente_retencion ? 'SI' : 'NO',
        c.actividad_economica ? c.actividad_economica.substring(0, 30) + '...' : 'N/A', // Se corta para que no desborde la tabla
        c.sector || 'N/A',
        infoContacto,
        responsables
      ];
    });

    const tableHeaders = [
      'Razón Social',
      'RUC / Cédula',
      'Tipo Servicio',
      'Tipo Contrib.',
      'Régimen',
      'Retención',
      'Actividad Económica',
      'Sector',
      'Contacto Cliente',
      'Responsable Int.'
    ];

    autoTable(doc, {
      startY: 80,
      head: [tableHeaders],
      body: tableData,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 3,
        overflow: 'linebreak',
        halign: 'center'
      },
      headStyles: {
        fillColor: [23, 30, 39],
        textColor: 255,
        fontStyle: 'bold',
        halign: 'center'
      },
      columnStyles: {
        0: { cellWidth: 80 },  // Razón Social
        1: { cellWidth: 65 },  // RUC
        8: { cellWidth: 100 }, // Contacto
        9: { cellWidth: 70 }   // Responsable
      }
    });

    doc.save('Base_Datos_Clientes_Mhorizon.pdf');
  }

  const exportarExcel = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Clientes');

  worksheet.columns = [
    { header: 'Razón Social', key: 'razonSocial', width: 35 },
    { header: 'RUC / Cédula', key: 'ruc', width: 15 },
    { header: 'Tipo Servicio', key: 'tipoServicio', width: 20 },
    { header: 'Tipo Contrib.', key: 'tipoContrib', width: 20 },
    { header: 'Régimen', key: 'regimen', width: 20 },
    { header: 'Retención', key: 'retencion', width: 10 },
    { header: 'Actividad Económica', key: 'actividad', width: 40 },
    { header: 'Sector', key: 'sector', width: 20 },
    { header: 'Contacto Cliente', key: 'contacto', width: 50 },
    { header: 'Responsable Int.', key: 'responsable', width: 30 }
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

  clientes.forEach((c) => {
    const contactoPrincipal = c.usuarios && c.usuarios.length > 0 ? c.usuarios[0] : null;
    const nombreContacto = contactoPrincipal ? `${contactoPrincipal.nombre} ${contactoPrincipal.apellido}` : 'N/A';
    const correoContacto = contactoPrincipal ? contactoPrincipal.correo : 'N/A';
    const infoContacto = `${nombreContacto}\n${correoContacto}\nTel: ${c.telefono_contacto || 'N/A'}`; 

    const responsables = c.gestores && c.gestores.length > 0
      ? c.gestores.map(g => `${g.nombre} ${g.apellido}`).join(', ')
      : 'Sin Asignar';

    const row = worksheet.addRow({
      razonSocial: c.razon_social_nombres || 'N/A',
      ruc: c.identificacion || 'N/A',
      tipoServicio: c.tipo_servicio || 'N/A',
      tipoContrib: c.tipo_contribuyente || 'N/A',
      regimen: c.regimen_tributario || 'N/A',
      retencion: c.agente_retencion ? 'SI' : 'NO',
      actividad: c.actividad_economica || 'N/A',
      sector: c.sector || 'N/A',
      contacto: infoContacto,
      responsable: responsables
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
  saveAs(blob, 'Base_Datos_Clientes_Mhorizon.xlsx');
};

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
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">

            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                className="bg-blue-200 cursor-pointer text-white text-[0.8rem] font-bold uppercase tracking-widest px-5 py-3.5 rounded-lg shadow-lg hover:bg-orange-500 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Descargar
                <svg className={`w-4 h-4 transition-transform duration-200 ${showDownloadMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {showDownloadMenu && (
                <div className=" absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
                  <button
                    onClick={() => {
                      exportarPDF();
                      setShowDownloadMenu(false); 
                    }}
                    className="cursor-pointer w-full text-left px-4 py-3 text-[0.8rem] font-bold text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                    Formato PDF
                  </button>
                  <button
                    onClick={() => {
                      exportarExcel();
                      setShowDownloadMenu(false); 
                    }}
                    className="cursor-pointer w-full text-left px-4 py-3 text-[0.8rem] font-bold text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors border-t border-gray-50 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    Formato Excel
                  </button>
                </div>
              )}
            </div>

            <button onClick={onOpenAñadir} className="bg-blue-200 cursor-pointer text-white text-[0.8rem] font-bold uppercase tracking-widest px-6 py-3.5 rounded-lg shadow-lg hover:bg-orange-500 transition-all flex items-center justify-center gap-2 shrink-0 w-full sm:w-auto">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              Añadir Cliente
            </button>
          </div>
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
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-[0.85rem] divide-y divide-gray-100">
                {clientesActuales.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-black text-white ${cliente.tipo_persona !== 'Persona Natural' ? 'bg-blue-200' : 'bg-orange-400'}`}>
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
                      <span className={`py-1 rounded text-[0.65rem] font-bold uppercase ${cliente.tipo_persona !== 'Persona Natural' ? 'bg-blue-50 text-blue-200' : 'bg-orange-50 text-orange-600'}`}>
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
                      <div className="flex flex-wrap gap-1">
                        {cliente.gestores && cliente.gestores.length > 0 ? (
                          cliente.gestores.map(gestor => (
                            <span key={gestor.id} className="text-gray-600 font-medium text-xs bg-gray-100 px-2 py-1 rounded w-max">
                              {gestor.nombre} {gestor.apellido}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 italic text-xs">Sin Asignar</span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      {cliente.usuarios && cliente.usuarios.length > 0 ? (
                        <div className="flex flex-col items-start gap-1.5">
                          <button
                            onClick={() => handleToggleEstadoUsuario(cliente.id, cliente.usuarios![0])}
                            title={cliente.usuarios[0].activo !== false ? 'Click para Desactivar' : 'Click para Activar'}
                            className={`cursor-pointer px-3 py-1 rounded-full text-[0.60rem] font-bold uppercase transition-all duration-300 border focus:outline-none ${cliente.usuarios[0].activo !== false
                              ? 'bg-green-100 text-green-600 border-green-200 hover:bg-red-100 hover:text-red-600 hover:border-red-200'
                              : 'bg-red-100 text-red-600 border-red-200 hover:bg-green-100 hover:text-green-600 hover:border-green-200'
                              }`}
                          >
                            {cliente.usuarios[0].activo !== false ? 'Activo' : 'Inactivo'}
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic text-xs">Sin asignar</span>
                      )}
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
                <button onClick={goToPreviousPage} disabled={currentPage === 1} className="p-2 cursor-pointer rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <span className="text-xs font-bold text-gray-600 px-2">
                  Página {currentPage} de {totalPages || 1}
                </span>
                <button onClick={goToNextPage} disabled={currentPage >= totalPages} className="p-2 cursor-pointer rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
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