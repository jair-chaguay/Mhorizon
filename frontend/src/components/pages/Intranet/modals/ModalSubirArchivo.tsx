import React, { useState, useEffect } from 'react';
import { ScrollReveal } from '../../../ScrollReveal';
import api from '../../../../api/axios';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  targetId?: number | null;
  uploadType: 'archivo' | 'obligacion';
  tipoImpuesto?: string; // Nuevo: Necesario para saber qué slots mostrar
  onSuccess: () => void; 
}

interface SlotDef {
  name: string;
  required: boolean;
}

const getSlotsForImpuesto = (tipo: string = ''): SlotDef[] => {
  const t = tipo.toUpperCase();

  if (t.includes('IVA')) {
    return [
      { name: 'Formulario de declaración, Anexo o Informe de presentación', required: true },
      { name: 'Cruce saldos contables vs declaración', required: true },
      { name: 'Cruce ingresos declaración vs estado de resultados', required: true },
      { name: 'Cruce facturación electrónica vs formulario de declaración', required: true },
      { name: 'Reporte retenciones en la fuente electrónicas vs formulario de declaración', required: true },
      { name: 'Otros papeles de trabajo', required: false },
    ];
  }
  if (t.includes('ANEXO TRANSACCIONAL') || t.includes('ATS')) {
    return [
      { name: 'Formulario de declaración, Anexo o Informe de presentación', required: true },
      { name: 'Cruce ATS vs declaraciones', required: true },
      { name: 'Otros papeles de trabajo', required: false },
    ];
  }
  if (t.includes('RETENCION')) {
    return [
      { name: 'Formulario de declaración, Anexo o Informe de presentación', required: true },
      { name: 'Cruce saldos contables vs declaración', required: true },
      { name: 'Cruce retenciones en la fuente electrónicas vs formulario de declaración', required: true },
      { name: 'Otros papeles de trabajo', required: false },
    ];
  }
  if (t.includes('RENTA')) {
    return [
      { name: 'Formulario de declaración, Anexo o informe de presentación', required: true },
      { name: 'Estados financieros', required: true },
      { name: 'Mapeo', required: true },
      { name: 'Conciliación tributaria', required: true },
      { name: 'Cruce de ingresos estados financieros vs formulario de impuesto a la renta', required: true },
      { name: 'Impuestos diferidos', required: false },
      { name: 'Otros papeles de trabajo', required: false },
    ];
  }
  if (t.includes('ESTADOS FINANCIEROS')) {
    return [
      { name: 'Estados financieros', required: true },
      { name: 'Acta de junta de accionistas', required: true },
      { name: 'Informe de Gerente General', required: true },
      { name: 'Informe de auditoria', required: false },
      { name: 'Informe de comisario', required: false },
      { name: 'Otros papeles de trabajo', required: false },
    ];
  }
  
  // Por defecto (Resto de obligaciones)
  return [
    { name: 'Formulario de declaración, Anexo o informe de presentación', required: true },
    { name: 'Otros papeles de trabajo', required: false },
  ];
};

const ModalSubirArchivo: React.FC<Props> = ({ isOpen, onClose, uploadType, targetId, tipoImpuesto, onSuccess }) => {
  const [observacion, setObservacion] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  
  // Estado para la subida múltiple (Obligaciones)
  const [slotFiles, setSlotFiles] = useState<Record<string, File>>({});
  
  // Estado para subida simple (Archivos genéricos en la biblioteca)
  const [archivoGenerico, setArchivoGenerico] = useState<File | null>(null);

  // Limpiar estados al abrir/cerrar
  useEffect(() => {
    if (isOpen) {
      setSlotFiles({});
      setArchivoGenerico(null);
      setObservacion('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const slots = uploadType === 'obligacion' ? getSlotsForImpuesto(tipoImpuesto) : [];

  const handleSlotFileChange = (slotName: string, file: File | undefined) => {
    if (file) {
      setSlotFiles(prev => ({ ...prev, [slotName]: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!targetId) {
      alert("Error interno: No se ha detectado la carpeta destino.");
      return;
    }

    const formData = new FormData();
    if (observacion) formData.append('observacion_cliente', observacion);

    let endpoint = '';

    if (uploadType === 'obligacion') {
      // 1. Validar que los slots requeridos estén llenos
      const missing = slots.filter(s => s.required && !slotFiles[s.name]);
      if (missing.length > 0) {
        alert(`Faltan documentos obligatorios:\n\n${missing.map(m => `- ${m.name}`).join('\n')}`);
        return;
      }
      
      formData.append('obligacion_id', targetId.toString());
      
      // Añadir cada archivo junto con su categoría (nombre del slot)
      Object.keys(slotFiles).forEach((slotName) => {
        formData.append('archivos[]', slotFiles[slotName]);
        formData.append('nombres_slots[]', slotName);
      });

      endpoint = '/biblioteca/upload-obligacion';
      
    } else {
      // Lógica de archivo genérico
      if (!archivoGenerico) {
        alert("Por favor, selecciona un archivo.");
        return;
      }
      formData.append('subcarpeta_id', targetId.toString());
      formData.append('archivo', archivoGenerico);
      endpoint = '/biblioteca/upload-documento';
    }

    try {
      setIsSubmitting(true);
      await api.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onSuccess();
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.response?.data);
      alert(error.response?.data?.message || "Ocurrió un error al subir los archivos.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollReveal className="fixed inset-0 bg-black/80 backdrop-blur-sm z-130 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative scale-100 transition-all reveal-element delay-100 max-h-[90vh] overflow-y-auto no-scrollbar">
        
        <button onClick={onClose} className="cursor-pointer absolute top-5 right-5 text-gray-400 hover:text-orange-500 transition-colors focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="mb-5 border-b border-gray-100 pb-4">
          <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.70rem] uppercase mb-1 block">
            {uploadType === 'obligacion' ? 'Gestión de Obligación' : 'Repositorio'}
          </span>
          <h2 className="text-blue-200 font-extrabold text-[1.4rem] tracking-tight">
            {uploadType === 'obligacion' ? `Subir Anexos: ${tipoImpuesto}` : 'Cargar Documento Libre'}
          </h2>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* RENDERIZADO CONDICIONAL DE SLOTS O ZONA SIMPLE */}
          {uploadType === 'obligacion' ? (
            <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
              <p className="text-[0.75rem] font-bold text-gray-500 uppercase tracking-widest mb-3">Documentos Requeridos</p>
              {slots.map((slot) => {
                const isUploaded = !!slotFiles[slot.name];
                return (
                  <div key={slot.name} className={`p-3 border rounded-xl flex items-center justify-between transition-colors ${isUploaded ? 'border-green-500 bg-green-50/30' : 'border-gray-200 bg-white'}`}>
                    <div className="flex-1 pr-4">
                      <p className="text-[0.80rem] font-bold text-blue-200 leading-tight">
                        {slot.name}
                        {slot.required && <span className="text-red-500 ml-1" title="Obligatorio">*</span>}
                      </p>
                      {isUploaded && <p className="text-[0.7rem] text-gray-500 mt-1 truncate max-w-[200px] sm:max-w-[300px]">{slotFiles[slot.name].name}</p>}
                    </div>
                    <div>
                      <label className={`cursor-pointer border px-3 py-2 rounded-lg text-[0.7rem] font-bold transition-colors whitespace-nowrap ${isUploaded ? 'bg-white border-green-200 text-green-600 hover:bg-green-50' : 'bg-white border-gray-200 text-gray-600 hover:text-orange-500 hover:border-orange-500'}`}>
                        {isUploaded ? 'Cambiar Archivo' : 'Adjuntar'}
                        <input type="file" className="hidden" accept=".pdf,.xls,.xlsx,.doc,.docx" onChange={(e) => handleSlotFileChange(slot.name, e.target.files?.[0])} />
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Subida simple para la biblioteca general
            <div className="border-2 border-dashed border-gray-300 bg-gray-50 hover:border-orange-400 rounded-xl p-5 flex flex-col items-center text-center cursor-pointer transition-colors duration-200">
              <label className="w-full flex flex-col items-center cursor-pointer">
                <svg className={`w-8 h-8 mb-2 transition-colors ${archivoGenerico ? 'text-orange-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {archivoGenerico ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  )}
                </svg>
                <p className="text-[0.85rem] font-bold text-blue-200">
                  {archivoGenerico ? archivoGenerico.name : "Haga clic para seleccionar un archivo"}
                </p>
                <input type="file" className="hidden" accept=".pdf,.xls,.xlsx,.doc,.docx" onChange={(e) => setArchivoGenerico(e.target.files?.[0] || null)} />
              </label>
            </div>
          )}

          <div>
            <label className="block text-[0.75rem] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Observación para el cliente</label>
            <textarea 
              rows={2} 
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-blue-200 text-[0.85rem] outline-none focus:bg-white focus:border-orange-500 resize-none transition-colors" 
              placeholder="El cliente verá este mensaje en su portal..." 
            ></textarea>
          </div>

          <div className="flex gap-3 pt-2 border-t border-gray-100 mt-4">
            <button type="button" onClick={onClose} disabled={isSubmitting} className="cursor-pointer flex-1 py-3 border border-gray-200 rounded-md text-gray-600 font-bold uppercase tracking-wider text-[0.80rem] hover:bg-gray-50 transition-colors disabled:opacity-50">
              Cancelar
            </button>
            <button type="submit" disabled={isSubmitting} className="cursor-pointer flex-1 py-3 bg-blue-200 text-white rounded-md font-bold uppercase tracking-wider text-[0.80rem] hover:bg-orange-500 transition-all shadow-md disabled:opacity-50 flex justify-center items-center gap-2">
              {isSubmitting ? 'Procesando...' : (uploadType === 'obligacion' ? 'Finalizar Obligación' : 'Subir Archivo')}
            </button>
          </div>

        </form>
      </div>
    </ScrollReveal>
  );
};

export default ModalSubirArchivo;