import { ScrollReveal } from "../ScrollReveal"

// Ejemplos tomados del alcance aprobado en la ficha comercial ("Incluido en la membresía").
const casos = [
    { tema: 'IVA y retenciones', q: '¿Cuánto debo retener en este pago a un proveedor?' },
    { tema: 'Impuesto a la Renta', q: '¿Este gasto es deducible o lo van a glosar?' },
    { tema: 'Obligaciones', q: '¿Estamos obligados a presentar este anexo?' },
    { tema: 'Dividendos', q: '¿Cómo tributan las utilidades que vamos a repartir?' },
    { tema: 'Pagos al exterior', q: '¿Qué porcentaje de retención debo aplicar?' },
    { tema: 'Reformas', q: '¿Qué cambia para nuestra empresa con la nueva reforma?' },
]

export const Casos = () => {
    return (
        <ScrollReveal as={"section"} id="casos" className="py-24 bg-white border-b border-gray-200 overflow-hidden scroll-mt-20">
            <div className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    <div className="lg:col-span-5 reveal-element">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img src="/images/ReduccionCostos.avif" alt="Especialista explicando una consulta tributaria" className="w-full h-80 lg:h-130 object-cover" />
                            <div className="absolute inset-0 bg-linear-to-t from-[#151E28]/90 via-[#151E28]/20 to-transparent"></div>
                            <div className="absolute bottom-0 inset-x-0 p-8">
                                <p className="text-white font-extrabold text-[1.5rem] leading-tight">Antes de firmar, pagar o declarar.</p>
                                <p className="text-gray-300 font-light text-[1.05rem] mt-2 texto-desc">Ese es el momento de consultar.</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="reveal-element">
                            <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block font-jakarta">
                                Qué puede consultar
                            </span>
                            <h2 className="text-[#151E28] font-extrabold text-[2rem] sm:text-[2.2rem] md:text-[2.5rem] tracking-tight leading-tight">
                                ¿LE SUENA ALGUNA DE ESTAS PREGUNTAS?
                            </h2>
                            <p className="mt-4 text-gray-600 font-light text-[1.15rem] texto-desc max-w-2xl">
                                Son dudas reales del día a día de una PYME. Cada una cuenta como una consulta de su membresía y la respuesta le llega por escrito, con su base legal.
                            </p>
                        </div>

                        <ul className="mt-10 border-t border-gray-200">
                            {casos.map((c, i) => (
                                <li
                                    key={c.q}
                                    className={`reveal-element delay-${Math.min(i, 4) * 100} group grid grid-cols-1 sm:grid-cols-[11rem_1fr] gap-1 sm:gap-6 items-baseline py-5 border-b border-gray-200`}
                                >
                                    <span className="text-orange-500 font-bold text-[0.85rem] font-jakarta">{c.tema}</span>
                                    <span className="text-[#151E28] font-bold text-[1.1rem] leading-snug">{c.q}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5 reveal-element">
                            <a href="#planes" className="inline-block text-center bg-orange-500 text-white font-bold tracking-wider uppercase px-8 py-4 rounded-sm hover:bg-[#151E28] shadow-xl hover:shadow-orange-500/20 transition-all duration-300 font-jakarta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">
                                Ver la membresía
                            </a>
                            <p className="text-gray-500 font-light text-[1.05rem] texto-desc">Impuesto a la Renta, IVA, retenciones, ISD, ICE, comprobantes y anexos.</p>
                        </div>
                    </div>

                </div>
            </div>
        </ScrollReveal>
    )
}
