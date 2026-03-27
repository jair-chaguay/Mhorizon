import React from 'react'

export const AnalisisBoletin = () => {
  return (
    <article className="max-w-4xl mx-auto px-18 py-24 text-center bg-white mt-10">
      <div className='bg-white '>
        

        <p className="text-2xl md:text-3xl text-blue-200 leading-relaxed mb-16 font-headline tracking-tight">
          Análisis técnico sobre la Resolución NAC-00000009 que redefine el cumplimiento tributario
          para el presente ejercicio fiscal.
        </p>

        <div className="max-w-none text-blue-200/80 text-lg leading-relaxed space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-800 text-blue-200 uppercase tracking-tighter">
              Impacto en la Operación Corporativa
            </h2>
            <p className='font-light text-blue-200'>
              A partir del <strong>1 de marzo de 2026</strong>, entra en vigencia la actualización obligatoria
              de retenciones en la fuente para Impuesto a la Renta. Este cambio afecta principalmente a las
              transacciones no especificadas bajo la regla general.
            </p>
          </div>

          <div className="py-16 bg-blue-200 rounded-xl shadow-inner relative overflow-hidden my-16">
            <div className="absolute inset-0 bg-orange-500 opacity-5 pointer-events-none"></div>
            <span className="block text-[14px] font-black tracking-[0.5em] text-orange-500 uppercase mb-6 
            relative z-10">
              Nueva Tasa General de Retención
            </span>
            <div className="flex items-center justify-center gap-8 relative z-10">
              <span className="text-7xl font-black text-white tracking-tighter">
                3.00%
              </span>
              <div className="text-left border-l border-white/20 pl-8">
                <span className="block text-slate-500 line-through text-2xl font-bold italic">
                  2.75%
                </span>
                <span className="block text-orange-500 text-[12px] font-bold uppercase tracking-widest mt-1">
                  Tasa Anterior
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-3xl text-blue-200 uppercase tracking-tight">
              Acciones Recomendadas
            </h3>
            <p className='text-blue-200 font-light'>
              Es imperativo que los departamentos financieros y contables parametrizen sus sistemas ERP para reflejar estos porcentajes. Emitir comprobantes con tasas desactualizadas podría invalidar la deducibilidad del gasto ante futuras auditorías del SRI.
            </p>
            <p className='text-blue-200 font-light'>
              Para una transición sin riesgos, nuestro equipo de consultoría ha desarrollado una matriz de validación que asegura el cumplimiento normativo total de su organización.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
