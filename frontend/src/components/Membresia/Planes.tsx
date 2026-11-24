import { useState } from 'react'
import { ScrollReveal } from "../ScrollReveal"
import { ModalMembresia } from './ModalMembresia'

type PlanId = 'basico' | 'estandar' | 'corporativo'

type Plan = {
    id: PlanId
    nombre: string
    opcion: string
    para: string
    precio: number
    consultas: string
    base?: string
    incluye: string[]
    noIncluye?: string[]
    cta: string
}

const planes: Plan[] = [
    {
        id: 'basico',
        nombre: 'Básico',
        opcion: 'Básico (USD 90)',
        para: 'Para empresas con dudas tributarias ocasionales.',
        precio: 90,
        consultas: '4 consultas al mes',
        incluye: [
            '4 consultas tributarias al mes',
            'Respuesta escrita con base legal',
            '1 contacto autorizado',
            'Atención remota en todo el Ecuador',
        ],
        noIncluye: [
            'Aclaración telefónica por respuesta',
            'Alertas de reformas tributarias',
            'Historial en Portal Cliente',
        ],
        cta: 'Elegir Básico',
    },
    {
        id: 'estandar',
        nombre: 'Estándar',
        opcion: 'Estándar (USD 110)',
        para: 'Para PYMES que toman decisiones tributarias todos los meses.',
        precio: 110,
        consultas: '10 consultas al mes',
        base: 'Todo lo del Básico, y además:',
        incluye: [
            '10 consultas tributarias al mes',
            'Aclaración telefónica de 15 min por cada respuesta',
            '2 contactos autorizados',
            'Alertas de reformas tributarias',
            'Historial de respuestas en su Portal Cliente',
        ],
        cta: 'Activar plan Estándar',
    },
    {
        id: 'corporativo',
        nombre: 'Corporativo',
        opcion: 'Corporativo (USD 150)',
        para: 'Para empresas con alto volumen u operaciones complejas.',
        precio: 150,
        consultas: '15 consultas al mes',
        base: 'Todo lo del Estándar, y además:',
        incluye: [
            '15 consultas tributarias al mes',
            'Prioridad en la asignación de sus consultas',
            'Hasta 3 contactos autorizados',
            '1 capacitación online trimestral para su equipo',
        ],
        cta: 'Elegir Corporativo',
    },
]

const opcionesVolumen: { id: PlanId; label: string }[] = [
    { id: 'basico', label: 'Hasta 4' },
    { id: 'estandar', label: 'Entre 5 y 10' },
    { id: 'corporativo', label: 'Más de 10' },
]

const filasComparativa: { label: string; valores: [string, string, string] }[] = [
    { label: 'Consultas tributarias al mes', valores: ['4', '10', '15'] },
    { label: 'Respuesta escrita con base legal', valores: ['✓', '✓', '✓'] },
    { label: 'Aclaración telefónica de 15 min', valores: ['—', '✓', '✓'] },
    { label: 'Contactos autorizados', valores: ['1', '2', '3'] },
    { label: 'Alertas de reformas tributarias', valores: ['—', '✓', '✓'] },
    { label: 'Historial en Portal Cliente', valores: ['—', '✓', '✓'] },
    { label: 'Prioridad en la asignación', valores: ['—', '—', '✓'] },
    { label: 'Capacitación online trimestral', valores: ['—', '—', '✓'] },
    { label: 'Cobertura en todo el Ecuador', valores: ['✓', '✓', '✓'] },
]

const Check = () => (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
    </svg>
)

const Cross = () => (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
    </svg>
)

export const Planes = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [planElegido, setPlanElegido] = useState<string | undefined>()
    const [sugerido, setSugerido] = useState<PlanId>('estandar')

    const abrir = (opcion: string) => {
        setPlanElegido(opcion)
        setIsModalOpen(true)
    }

    return (
        <>
            <ScrollReveal as={"section"} id="planes" className="bg-[#151E28] py-24 px-5 sm:px-8 md:px-12 overflow-hidden border-b border-white/5 relative scroll-mt-20">
                <div className="absolute -left-32 top-20 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute -right-32 bottom-20 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-350 mx-auto relative z-10">
                    <div className="text-center mb-12 reveal-element">
                        <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block font-jakarta">
                            PLANES DE MEMBRESÍA
                        </span>
                        <h2 className="text-white font-extrabold text-[2rem] sm:text-[2.5rem] tracking-tight leading-tight">
                            ELIJA CUÁNTO RESPALDO NECESITA SU EMPRESA
                        </h2>
                        <p className="mt-4 text-gray-300 font-light text-[1.05rem] leading-relaxed max-w-3xl mx-auto">
                            El mismo criterio senior en los tres planes. Cambia el número de consultas al mes y el nivel de acompañamiento.
                        </p>
                    </div>

                    {/* Selector: ayuda a decidir y refuerza el plan objetivo */}
                    <div className="reveal-element delay-100 max-w-3xl mx-auto mb-20 bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6">
                        <p className="text-white font-bold text-[0.95rem] text-center md:text-left md:flex-1 font-jakarta">
                            ¿Cuántas dudas tributarias tiene su empresa al mes?
                        </p>
                        <div className="flex gap-2 w-full md:w-auto" role="radiogroup" aria-label="Dudas tributarias al mes">
                            {opcionesVolumen.map((op) => (
                                <button
                                    key={op.id}
                                    type="button"
                                    role="radio"
                                    aria-checked={sugerido === op.id}
                                    onClick={() => setSugerido(op.id)}
                                    className={`cursor-pointer flex-1 md:flex-none px-4 py-2.5 rounded-sm text-[0.85rem] font-bold tracking-wide transition-all duration-300 font-jakarta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${sugerido === op.id
                                        ? 'bg-orange-500 text-white shadow-lg'
                                        : 'bg-transparent text-gray-300 border border-white/20 hover:border-white/50'}`}
                                >
                                    {op.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6 items-stretch reveal-element delay-100 max-w-xl lg:max-w-none mx-auto">
                        {planes.map((plan) => {
                            const destacado = plan.id === 'estandar'
                            const recomendado = plan.id === sugerido
                            return (
                                <div
                                    key={plan.id}
                                    className={`relative rounded-2xl p-8 md:p-10 flex flex-col transition-all duration-300
                                        ${destacado ? 'bg-white shadow-2xl order-first lg:order-0 lg:-translate-y-5' : 'bg-[#1A2530] border border-white/10 shadow-xl'}
                                        ${recomendado ? 'ring-4 ring-orange-500' : destacado ? 'ring-1 ring-white/20' : 'hover:border-orange-500/50'}`}
                                >
                                    {destacado && <div className="absolute top-0 left-0 w-full h-1.5 bg-orange-500 rounded-t-2xl"></div>}
                                    {(destacado || recomendado) && (
                                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-orange-500 text-white font-bold tracking-widest uppercase text-[0.72rem] px-5 py-2 rounded-sm shadow-lg whitespace-nowrap font-jakarta">
                                            {recomendado && sugerido !== 'estandar' ? 'Recomendado para usted' : 'Recomendado'}
                                        </span>
                                    )}

                                    <h3 className={`font-bold uppercase tracking-widest text-[0.95rem] font-jakarta ${destacado ? 'text-orange-500' : 'text-white'}`}>
                                        {plan.nombre}
                                    </h3>
                                    <p className={`mt-2 text-[0.95rem] font-light leading-relaxed min-h-12 ${destacado ? 'text-gray-600' : 'text-gray-400'}`}>
                                        {plan.para}
                                    </p>

                                    <div className="flex items-end gap-2 mt-6 font-jakarta">
                                        <span className={`text-[4rem] font-extrabold leading-none tracking-tighter ${destacado ? 'text-[#151E28]' : 'text-white'}`}>{plan.precio}</span>
                                        <div className="pb-2">
                                            <span className={`block font-bold text-lg leading-none ${destacado ? 'text-[#151E28]' : 'text-white'}`}>USD</span>
                                            <span className="block text-orange-500 font-bold text-sm mt-1">+ IVA / mes</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex flex-wrap items-center gap-2">
                                        <span className={`text-[0.85rem] font-bold rounded-sm px-3 py-1.5 ${destacado ? 'bg-orange-50 text-orange-500 border border-orange-100' : 'bg-white/5 text-gray-300'}`}>
                                            {plan.consultas}
                                        </span>
                                    </div>

                                    {destacado && (
                                        <p className="mt-4 text-[0.92rem] text-[#151E28] font-medium leading-relaxed">
                                            Por solo <strong>USD 20 más</strong> que el Básico, recibe <strong className="text-orange-500">6 consultas adicionales</strong>, aclaración telefónica y alertas de reformas.
                                        </p>
                                    )}

                                    <div className={`mt-8 pt-8 border-t flex-1 ${destacado ? 'border-gray-200' : 'border-white/10'}`}>
                                        {plan.base && (
                                            <p className={`text-[0.8rem] font-bold uppercase tracking-wider mb-4 font-jakarta ${destacado ? 'text-gray-500' : 'text-gray-400'}`}>{plan.base}</p>
                                        )}
                                        <ul className="space-y-4 mb-10">
                                            {plan.incluye.map((item) => (
                                                <li key={item} className="flex items-start gap-3">
                                                    <span className={`rounded-full p-1 border ${destacado ? 'bg-orange-50 text-orange-500 border-orange-100' : 'bg-orange-500/10 text-orange-500 border-orange-500/20'}`}>
                                                        <Check />
                                                    </span>
                                                    <span className={`text-[0.95rem] leading-snug pt-0.5 ${destacado ? 'text-[#151E28] font-medium' : 'text-gray-200 font-light'}`}>{item}</span>
                                                </li>
                                            ))}
                                            {plan.noIncluye?.map((item) => (
                                                <li key={item} className="flex items-start gap-3 opacity-50">
                                                    <span className="rounded-full p-1 border border-white/10 text-gray-400"><Cross /></span>
                                                    <span className="text-[0.95rem] leading-snug pt-0.5 text-gray-400 font-light line-through decoration-white/30">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => abrir(plan.opcion)}
                                        className={destacado
                                            ? 'cursor-pointer bg-orange-500 text-white font-bold tracking-wider uppercase w-full px-8 py-4 rounded-sm hover:bg-[#151E28] shadow-xl hover:shadow-orange-500/20 transition-all duration-300 font-jakarta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500'
                                            : 'cursor-pointer bg-transparent text-white border border-white/30 font-bold tracking-wider uppercase w-full px-8 py-4 rounded-sm hover:bg-white/10 transition-all duration-300 font-jakarta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500'}
                                    >
                                        {plan.cta}
                                    </button>
                                    <p className={`mt-3 text-center text-[0.8rem] font-light ${destacado ? 'text-gray-500' : 'text-gray-400'}`}>
                                        Sin permanencia · Cancele antes del siguiente ciclo
                                    </p>
                                </div>
                            )
                        })}
                    </div>

                    {/* Comparativa detallada */}
                    <details className="group mt-16 reveal-element delay-200 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                        <summary className="flex items-center justify-between cursor-pointer p-6 sm:p-8 font-bold text-white text-[1.05rem] font-jakarta list-none">
                            Comparar los tres planes en detalle
                            <span className="transition-transform duration-300 group-open:rotate-180 text-orange-500 bg-white/10 p-2 rounded-full shrink-0">
                                <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" aria-hidden="true"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <div className="overflow-x-auto px-4 sm:px-8 pb-8">
                            <table className="w-full min-w-[560px] text-left text-[0.92rem]">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="py-4 pr-4 text-gray-400 font-light">Incluye</th>
                                        <th className="py-4 px-3 text-white font-bold text-center font-jakarta">Básico<span className="block text-gray-400 font-light text-[0.8rem]">USD 90</span></th>
                                        <th className="py-4 px-3 text-orange-500 font-bold text-center font-jakarta bg-orange-500/10 rounded-t-lg">Estándar<span className="block text-orange-300 font-light text-[0.8rem]">USD 110</span></th>
                                        <th className="py-4 px-3 text-white font-bold text-center font-jakarta">Corporativo<span className="block text-gray-400 font-light text-[0.8rem]">USD 150</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filasComparativa.map((fila) => (
                                        <tr key={fila.label} className="border-b border-white/5">
                                            <td className="py-3.5 pr-4 text-gray-300 font-light">{fila.label}</td>
                                            {fila.valores.map((v, i) => (
                                                <td key={i} className={`py-3.5 px-3 text-center ${i === 1 ? 'bg-orange-500/10 text-white font-bold' : 'text-gray-300'} ${v === '✓' ? 'text-orange-500' : ''} ${v === '—' ? 'text-gray-600' : ''}`}>{v}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </details>

                    <p className="text-center text-gray-400 text-[0.85rem] font-light mt-8">
                        Precios más IVA · Pago mensual anticipado · Un RUC por membresía · Las consultas no se acumulan
                    </p>
                </div>
            </ScrollReveal>

            <ModalMembresia isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} plan={planElegido} />
        </>
    )
}
