import { ScrollReveal } from "../ScrollReveal"

type Columna = {
    titulo: string
    subtitulo: string
    filas: { k: string; v: string; ok: boolean }[]
    destacada?: boolean
}

const columnas: Columna[] = [
    {
        titulo: 'Decidir sin consultar',
        subtitulo: 'La opción más común',
        filas: [
            { k: 'Costo', v: 'Parece USD 0, hasta que llega una multa, un interés o una glosa', ok: false },
            { k: 'Sustento', v: 'Ninguno por escrito', ok: false },
            { k: 'Criterio', v: 'Internet, un colega o la intuición', ok: false },
            { k: 'Tranquilidad', v: 'La duda queda abierta', ok: false },
        ],
    },
    {
        titulo: 'Membresía MHORIZON',
        subtitulo: 'Respaldo recurrente y previsible',
        destacada: true,
        filas: [
            { k: 'Costo', v: 'Cuota fija desde USD 90 + IVA al mes', ok: true },
            { k: 'Sustento', v: 'Respuesta escrita con base legal', ok: true },
            { k: 'Criterio', v: 'Equipo senior con dirección técnica', ok: true },
            { k: 'Tranquilidad', v: 'Consulta cuando la necesita, sin cotizar cada vez', ok: true },
        ],
    },
    {
        titulo: 'Consultoría por proyecto',
        subtitulo: 'Ideal para casos grandes',
        filas: [
            { k: 'Costo', v: 'Cotización por cada caso', ok: false },
            { k: 'Sustento', v: 'Informe completo', ok: true },
            { k: 'Criterio', v: 'Senior', ok: true },
            { k: 'Tranquilidad', v: 'Propuesta y aprobación antes de empezar', ok: false },
        ],
    },
]

export const Comparativa = () => {
    return (
        <ScrollReveal as={"section"} className="py-24 bg-white border-b border-gray-200 overflow-hidden">
            <div className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">
                <div className="text-center mb-16 reveal-element">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block font-jakarta">
                        Compare sus opciones
                    </span>
                    <h2 className="text-[#151E28] font-extrabold text-[2rem] sm:text-[2.5rem] tracking-tight leading-tight">
                        ¿CÓMO RESUELVE HOY SUS DUDAS TRIBUTARIAS?
                    </h2>
                    <p className="mt-4 text-gray-600 font-light text-[1.05rem] leading-relaxed max-w-3xl mx-auto">
                        La membresía cubre el espacio entre su contador y un proyecto de consultoría: las decisiones del día a día que no pueden esperar una cotización.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch reveal-element delay-100">
                    {columnas.map((c) => (
                        <div
                            key={c.titulo}
                            className={c.destacada
                                ? 'relative bg-[#151E28] rounded-2xl p-8 md:p-10 shadow-2xl border-t-4 border-orange-500 order-first lg:order-0 lg:scale-[1.03]'
                                : 'relative bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-200'}
                        >
                            <h3 className={`font-extrabold text-[1.35rem] ${c.destacada ? 'text-white' : 'text-[#151E28]'}`}>{c.titulo}</h3>
                            <p className={`text-[0.9rem] font-light mt-1 mb-8 ${c.destacada ? 'text-orange-500 font-bold' : 'text-gray-500'}`}>{c.subtitulo}</p>
                            <dl className="space-y-5">
                                {c.filas.map((f) => (
                                    <div key={f.k} className="flex items-start gap-3">
                                        <span className={`rounded-full p-1 mt-0.5 shrink-0 ${f.ok
                                            ? (c.destacada ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-500 border border-orange-100')
                                            : 'bg-gray-200 text-gray-500'}`}>
                                            {f.ok
                                                ? <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                                : <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>}
                                        </span>
                                        <div>
                                            <dt className={`text-[0.75rem] font-bold uppercase tracking-widest font-jakarta ${c.destacada ? 'text-gray-400' : 'text-gray-400'}`}>{f.k}</dt>
                                            <dd className={`text-[0.98rem] leading-snug mt-0.5 ${c.destacada ? 'text-white font-medium' : 'text-gray-700 font-light'}`}>{f.v}</dd>
                                        </div>
                                    </div>
                                ))}
                            </dl>
                            {c.destacada && (
                                <a href="#planes" className="mt-10 block text-center bg-orange-500 text-white font-bold tracking-wider uppercase px-8 py-4 rounded-sm hover:bg-white hover:text-orange-600 shadow-xl transition-all duration-300 font-jakarta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">
                                    Ver planes
                                </a>
                            )}
                        </div>
                    ))}
                </div>

                <p className="text-center text-gray-500 text-[0.9rem] font-light mt-12 max-w-2xl mx-auto reveal-element delay-200">
                    ¿Su caso es un proyecto completo? MHORIZON también ofrece <a href="/soluciones/gestion-tributaria" className="text-orange-500 font-bold hover:underline">estrategia y defensa fiscal</a>. Si una consulta resulta ser un proyecto, se lo decimos antes y le enviamos una propuesta aparte.
                </p>
            </div>
        </ScrollReveal>
    )
}
