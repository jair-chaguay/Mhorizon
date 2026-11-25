import { useState } from 'react'
import { ScrollReveal } from "../ScrollReveal"
import { ModalMembresia } from './ModalMembresia'

// Una sola opción, igual que el flyer: precio de lanzamiento USD 110 + IVA (regular USD 150 + IVA).
const incluye = [
    'Hasta 10 consultas tributarias o contables al mes',
    'Respuesta escrita con base legal',
    'Aclaración telefónica de 15 minutos por cada respuesta',
    '2 contactos autorizados',
    'Alertas de reformas tributarias',
    'Historial de respuestas en su Portal Cliente',
    'Atención remota en todo el Ecuador',
]

type Volumen = 'hasta4' | 'entre5y10' | 'mas10'

const opcionesVolumen: { id: Volumen; label: string }[] = [
    { id: 'hasta4', label: 'Hasta 4' },
    { id: 'entre5y10', label: 'Entre 5 y 10' },
    { id: 'mas10', label: 'Más de 10' },
]

const respuestaVolumen: Record<Volumen, string> = {
    hasta4: 'La membresía cubre hasta 10 consultas al mes, así que tiene margen para los meses de más movimiento.',
    entre5y10: 'La membresía cubre hasta 10 consultas al mes. Está pensada justamente para empresas como la suya.',
    mas10: 'Si su empresa necesita más de 10 consultas al mes, conversemos y le proponemos la mejor forma de atenderla.',
}

const Check = () => (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
    </svg>
)

export const Planes = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [volumen, setVolumen] = useState<Volumen | null>(null)

    return (
        <>
            <ScrollReveal as={"section"} id="planes" className="bg-[#151E28] py-24 px-5 sm:px-8 md:px-12 overflow-hidden border-b border-white/5 relative scroll-mt-20">
                <div className="absolute -left-32 top-20 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute -right-32 bottom-20 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-350 mx-auto relative z-10">
                    <div className="text-center mb-12 reveal-element">
                        <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block font-jakarta">
                            Membresía MHORIZON
                        </span>
                        <h2 className="text-white font-extrabold text-[2rem] sm:text-[2.5rem] tracking-tight leading-tight">
                            RESPALDO TRIBUTARIO CON UNA CUOTA FIJA AL MES
                        </h2>
                    </div>

                    {/* Pregunta en una sola línea desde tablet; en móvil los botones bajan */}
                    <div className="reveal-element delay-100 max-w-4xl mx-auto mb-14">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                            <p className="text-white font-bold text-[0.95rem] text-center md:text-left md:whitespace-nowrap md:flex-1 font-jakarta">
                                ¿Cuántas consultas tributarias o contables necesita al mes?
                            </p>
                            <div className="flex gap-2 w-full md:w-auto shrink-0" role="radiogroup" aria-label="Consultas al mes">
                                {opcionesVolumen.map((op) => (
                                    <button
                                        key={op.id}
                                        type="button"
                                        role="radio"
                                        aria-checked={volumen === op.id}
                                        onClick={() => setVolumen(op.id)}
                                        className={`cursor-pointer flex-1 md:flex-none px-4 py-2.5 rounded-sm text-[0.85rem] font-bold tracking-wide whitespace-nowrap transition-all duration-300 font-jakarta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${volumen === op.id
                                            ? 'bg-orange-500 text-white shadow-lg'
                                            : 'bg-transparent text-gray-300 border border-white/20 hover:border-white/50'}`}
                                    >
                                        {op.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div aria-live="polite" className="min-h-0">
                            {volumen && (
                                <p className="mt-4 text-center text-gray-300 font-light text-[1.05rem] texto-desc px-2">
                                    {respuestaVolumen[volumen]}
                                    {volumen === 'mas10' && (
                                        <button type="button" onClick={() => setIsModalOpen(true)} className="cursor-pointer ml-1 text-orange-400 font-bold underline underline-offset-4 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">
                                            Hablar con un especialista
                                        </button>
                                    )}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Oferta única */}
                    <div className="group reveal-element delay-200 max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/20 relative">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-orange-500"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr]">

                            <div className="p-8 sm:p-10 lg:p-12 flex flex-col">
                                <span className="self-start bg-orange-500 text-white font-bold tracking-widest uppercase text-[0.72rem] px-4 py-2 rounded-sm font-jakarta">
                                    Precio de lanzamiento
                                </span>
                                <p className="mt-6 text-gray-600 font-light text-[1.06rem] texto-desc">
                                    Para PYMES que toman decisiones tributarias todos los meses y quieren hacerlo con respaldo.
                                </p>

                                <p className="mt-8 text-gray-500 text-[0.95rem] font-jakarta">
                                    Precio regular{' '}
                                    {/* La raya se dibuja cuando la tarjeta aparece, para llamar la atención sobre el descuento */}
                                    <del className="relative inline-block no-underline [text-decoration:none]">
                                        USD 150 + IVA
                                        <span aria-hidden="true" className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-orange-500 origin-left scale-x-0 group-[.active]:scale-x-100 transition-transform duration-700 delay-700 motion-reduce:scale-x-100 motion-reduce:transition-none"></span>
                                    </del>
                                </p>
                                <div className="flex items-end gap-2 mt-1 font-jakarta">
                                    <span className="text-[4.5rem] sm:text-[5rem] font-extrabold leading-none tracking-tighter text-[#151E28]">110</span>
                                    <div className="pb-2.5">
                                        <span className="block font-bold text-lg leading-none text-[#151E28]">USD</span>
                                        <span className="block text-orange-500 font-bold text-sm mt-1">+ IVA / mes</span>
                                    </div>
                                </div>
                                <p className="mt-3 text-[#151E28] font-medium text-[0.92rem]">Precio de lanzamiento por tiempo limitado.</p>

                                <div className="mt-auto pt-10">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(true)}
                                        className="cursor-pointer bg-orange-500 text-white font-bold tracking-wider uppercase w-full px-8 py-4 rounded-sm hover:bg-[#151E28] shadow-xl hover:shadow-orange-500/20 transition-all duration-300 font-jakarta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                                    >
                                        Solicitar mi membresía
                                    </button>
                                    <p className="mt-3 text-center text-[0.875rem] font-light text-gray-500 texto-desc">
                                        Sin permanencia · Cancele antes del siguiente ciclo
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-200 p-8 sm:p-10 lg:p-12">
                                <p className="text-[0.8rem] font-bold uppercase tracking-wider mb-6 text-gray-500 font-jakarta">Su membresía incluye</p>
                                <ul className="space-y-4">
                                    {incluye.map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="rounded-full p-1 border bg-orange-50 text-orange-500 border-orange-100">
                                                <Check />
                                            </span>
                                            <span className="text-[1.06rem] leading-snug pt-0.5 text-[#151E28] font-medium tracking-[0.01em]">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>

                    <p className="text-center text-gray-400 text-[0.92rem] font-light mt-8 texto-desc">
                        Precio más IVA · Pago mensual anticipado · Un RUC por membresía · Las consultas no se acumulan
                    </p>
                </div>
            </ScrollReveal>

            <ModalMembresia isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    )
}
