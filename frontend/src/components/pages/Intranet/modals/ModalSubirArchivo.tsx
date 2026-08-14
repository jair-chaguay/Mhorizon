/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { ScrollReveal } from '../../../ScrollReveal';
import api from '../../../../api/axios';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  targetId?: number | null;
  uploadType: 'archivo' | 'obligacion';
  tipoImpuesto?: string;
  onSuccess: () => void;
}

interface SlotDef {
  name: string;
  required: boolean;
}

interface ExtraFile {
  id: string;
  name: string;
  file: File | null;
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

  return [
    { name: 'Formulario de declaración, Anexo o informe de presentación', required: true },
    { name: 'Otros papeles de trabajo', required: false },
  ];
};

const ModalSubirArchivo: React.FC<Props> = ({ isOpen, onClose, uploadType, targetId, tipoImpuesto, onSuccess }) => {
  const [observacion, setObservacion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // NUEVO: Estado para saber si el usuario eligió una plantilla manual en la biblioteca
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState<string>('');

  const [slotFiles, setSlotFiles] = useState<Record<string, File>>({});
  const [extraFiles, setExtraFiles] = useState<ExtraFile[]>([]);

  useEffect(() => {
    if (isOpen) {
      setSlotFiles({});
      setObservacion('');
      setPlantillaSeleccionada('');
      
      // Si es repositorio libre, iniciamos con un recuadro vacío por defecto
      if (uploadType === 'archivo') {
        setExtraFiles([{ id: Date.now().toString(), name: '', file: null }]);
      } else {
        setExtraFiles([]);
      }
    }
  }, [isOpen, uploadType]);

  if (!isOpen) return null;

  const slots = uploadType === 'obligacion' 
    ? getSlotsForImpuesto(tipoImpuesto) 
    : (plantillaSeleccionada ? getSlotsForImpuesto(plantillaSeleccionada) : []);

  const handleSlotFileChange = (slotName: string, file: File | undefined) => {
    if (file) setSlotFiles(prev => ({ ...prev, [slotName]: file }));
  };

  const addExtraFileSlot = () => {
    setExtraFiles(prev => [...prev, { id: Date.now().toString(), name: '', file: null }]);
  };

  const updateExtraFile = (id: string, field: 'name' | 'file', value: any) => {
    setExtraFiles(prev => prev.map(ef => ef.id === id ? { ...ef, [field]: value } : ef));
  };

  const removeExtraFileSlot = (id: string) => {
    setExtraFiles(prev => prev.filter(ef => ef.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!targetId) {
      alert("Error interno: No se ha detectado la carpeta destino.");
      return;
    }

    try {
      setIsSubmitting(true);

      if (uploadType === 'obligacion') {
        // VERIFICACIÓN DE OBLIGACIÓN FORMAL (Con ID)
        const missing = slots.filter(s => s.required && !slotFiles[s.name]);
        if (missing.length > 0) {
          alert(`Faltan documentos obligatorios:\n\n${missing.map(m => `- ${m.name}`).join('\n')}`);
          setIsSubmitting(false);
          return;
        }

        const formData = new FormData();
        if (observacion) formData.append('observacion_cliente', observacion);
        formData.append('obligacion_id', targetId.toString());

        Object.keys(slotFiles).forEach((slotName) => {
          formData.append('archivos[]', slotFiles[slotName]);
          formData.append('nombres_slots[]', slotName);
        });

        extraFiles.forEach((ef, index) => {
          if (ef.file) {
            formData.append('archivos[]', ef.file);
            formData.append('nombres_slots[]', ef.name.trim() || `Documento Adicional ${index + 1}`);
          }
        });

        await api.post('/biblioteca/upload-obligacion', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

      } else {
        // LÓGICA DE REPOSITORIO (Incluyendo validación de plantilla)
        const filesToUpload: { file: File, finalName: string }[] = [];

        // 1. Si eligió plantilla, verificamos que cumpla los requisitos
        if (plantillaSeleccionada) {
          const missing = slots.filter(s => s.required && !slotFiles[s.name]);
          if (missing.length > 0) {
            alert(`Faltan documentos obligatorios de la plantilla:\n\n${missing.map(m => `- ${m.name}`).join('\n')}`);
            setIsSubmitting(false);
            return;
          }
          Object.keys(slotFiles).forEach((slotName) => {
            filesToUpload.push({ file: slotFiles[slotName], finalName: slotName });
          });
        }

        // 2. Agregamos los archivos extras / libres
        extraFiles.forEach((ef, index) => {
          if (ef.file) {
            filesToUpload.push({ file: ef.file, finalName: ef.name.trim() || `Documento Libre ${index + 1}` });
          }
        });

        if (filesToUpload.length === 0) {
          alert("Por favor, adjunta al menos un archivo.");
          setIsSubmitting(false);
          return;
        }

        // 3. Enviamos los archivos a la carpeta general, manteniendo el nombre del slot en la observación
        const uploadPromises = filesToUpload.map(item => {
          const formData = new FormData();
          
          let finalObs = observacion;
          if (item.finalName) {
            finalObs = `[${item.finalName}] ${observacion ? '- ' + observacion : ''}`;
          }

          if (finalObs) formData.append('observacion_cliente', finalObs);
          formData.append('subcarpeta_id', targetId.toString());
          formData.append('archivo', item.file);
          
          return api.post('/biblioteca/upload-documento', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        });

        await Promise.all(uploadPromises);
      }

      onSuccess();
      onClose();
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
            {uploadType === 'obligacion' ? 'Gestión de Obligación' : 'Repositorio Histórico'}
          </span>
          <h2 className="text-blue-200 font-extrabold text-[1.4rem] tracking-tight">
            {uploadType === 'obligacion' ? `Subir Anexos: ${tipoImpuesto}` : 'Cargar Documentos'}
          </h2>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* NUEVO: Dropdown de Plantillas solo visible si estás en el Repositorio Libre */}
          {uploadType === 'archivo' && (
            <div className="p-4 bg-orange-50/50 border border-orange-100 rounded-xl">
              <label className="block text-[0.75rem] font-bold text-orange-500 uppercase tracking-widest mb-2">
                ¿Desea usar una plantilla de obligación? (Opcional)
              </label>
              <select 
                value={plantillaSeleccionada}
                onChange={(e) => {
                  setPlantillaSeleccionada(e.target.value);
                  setSlotFiles({});
                  // Si elige plantilla, vaciamos los extras. Si quita la plantilla, le damos un cuadro libre.
                  if (e.target.value !== '') {
                    setExtraFiles([]);
                  } else {
                    setExtraFiles([{ id: Date.now().toString(), name: '', file: null }]);
                  }
                }}
                className="w-full px-3 py-2 bg-white border border-orange-200 rounded-lg text-blue-200 text-[0.85rem] outline-none focus:border-orange-500 font-medium cursor-pointer"
              >
                <option value="">No, subir archivos libres</option>
                <option value="IVA">Declaración de IVA</option>
                <option value="RENTA">Impuesto a la Renta</option>
                <option value="RETENCION">Retenciones en la Fuente</option>
                <option value="ATS">Anexo Transaccional (ATS)</option>
                <option value="ESTADOS FINANCIEROS">Estados Financieros</option>
              </select>
            </div>
          )}

          <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <p className="text-[0.75rem] font-bold text-gray-500 uppercase tracking-widest mb-3">
              {slots.length > 0 ? 'Documentos Requeridos de la Plantilla' : 'Documentos a Subir'}
            </p>
            
            {slots.map((slot) => {
              const isUploaded = !!slotFiles[slot.name];
              return (
                <div key={slot.name} className={`p-3 border rounded-xl flex items-center justify-between transition-colors ${isUploaded ? 'border-green-500 bg-green-50/30' : 'border-gray-200 bg-white'}`}>
                  <div className="flex-1 pr-4">
                    <p className="text-[0.80rem] font-bold text-blue-200 leading-tight">
                      {slot.name}
                      {slot.required && <span className="text-red-500 ml-1" title="Obligatorio">*</span>}
                    </p>
                    {isUploaded && <p className="text-[0.7rem] text-gray-500 mt-1 truncate max-w-50 sm:max-w-75">{slotFiles[slot.name].name}</p>}
                  </div>
                  <div>
                    <label className={`cursor-pointer border px-3 py-2 rounded-lg text-[0.7rem] font-bold transition-colors whitespace-nowrap ${isUploaded ? 'bg-white border-green-200 text-green-600 hover:bg-green-50' : 'bg-white border-gray-200 text-gray-600 hover:text-orange-500 hover:border-orange-500'}`}>
                      {isUploaded ? 'Cambiar' : 'Adjuntar'}
                      <input type="file" className="hidden" accept=".pdf,.xls,.xlsx,.doc,.docx" onChange={(e) => handleSlotFileChange(slot.name, e.target.files?.[0])} />
                    </label>
                  </div>
                </div>
              );
            })}

            {extraFiles.map((ef, _index) => (
              <div key={ef.id} className="p-3 border border-dashed border-orange-300 rounded-xl flex items-center justify-between bg-white relative">
                <div className="flex-1 pr-4">
                  <input 
                    type="text" 
                    placeholder={slots.length > 0 ? "Nombre del anexo (Ej. Sustento extra)" : "Nombre descriptivo del documento..."}
                    value={ef.name}
                    onChange={(e) => updateExtraFile(ef.id, 'name', e.target.value)}
                    className="w-full text-[0.80rem] font-bold text-blue-200 border-b border-gray-200 focus:border-orange-500 outline-none pb-1 mb-1"
                  />
                  {ef.file && <p className="text-[0.7rem] text-gray-500 truncate max-w-50 sm:max-w-75">{ef.file.name}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <label className={`cursor-pointer border px-3 py-2 rounded-lg text-[0.7rem] font-bold transition-colors whitespace-nowrap ${ef.file ? 'bg-white border-green-200 text-green-600' : 'hover:border-orange-500 border-gray-300 text-gray-600 hover:text-orange-500'}`}>
                    {ef.file ? 'Cambiar' : 'Adjuntar'}
                    <input type="file" className="hidden" accept=".pdf,.xls,.xlsx,.doc,.docx" onChange={(e) => updateExtraFile(ef.id, 'file', e.target.files?.[0])} />
                  </label>
                  
                  {/* Solo permitimos borrar si hay otros slots o si ya hay una plantilla cargada */}
                  {(slots.length > 0 || extraFiles.length > 1) && (
                    <button type="button" onClick={() => removeExtraFileSlot(ef.id)} className="cursor-pointer text-red-400 hover:text-red-600 p-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button type="button" onClick={addExtraFileSlot} className="cursor-pointer w-full mt-2 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold text-[0.75rem] hover:border-orange-400 hover:text-orange-500 transition-colors flex justify-center items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              {slots.length > 0 ? 'Agregar otro archivo opcional' : 'Agregar otro documento'}
            </button>
          </div>

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
              {isSubmitting ? 'Procesando...' : 'Subir Archivos'}
            </button>
          </div>

        </form>
      </div>
    </ScrollReveal>
  );
};

export default ModalSubirArchivo;