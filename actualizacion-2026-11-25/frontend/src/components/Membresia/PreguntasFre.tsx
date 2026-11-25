import { ScrollReveal } from "../ScrollReveal"

const preguntas: { q: string; a: string }[] = [
    {
        q: '¿Puedo cancelar cuando quiera?',
        a: 'Sí. La membresía se paga mes a mes por anticipado (USD 110 más IVA con el precio de lanzamiento) y puede cancelarla sin penalidad antes del siguiente ciclo. El período ya pagado sigue activo hasta su vencimiento.',
    },
    {
        q: '¿Reemplaza a mi contador?',
        a: 'No. Su contador lleva el cumplimiento del día a día. La membresía le da a usted y a su contador un respaldo especializado para las decisiones que exceden lo rutinario.',
    },
    {
        q: '¿Qué cuenta como una consulta?',
        a: 'Una pregunta principal sobre un mismo hecho u operación, período y tratamiento. Si envía varias preguntas independientes en un solo mensaje, pueden contarse por separado; siempre le avisamos antes.',
    },
    {
        q: '¿Cuánto tardan en responder?',
        a: 'Le enviamos una respuesta técnica y sustentada dentro de los 2 días hábiles siguientes a la fecha en que recibimos su consulta. Si es una urgencia, puede contactarnos para resolver su duda de inmediato.',
    },
    {
        q: '¿Las consultas que no uso se acumulan?',
        a: 'No. Las consultas de cada mes (hasta 10) corresponden a ese período y no se acumulan ni se transfieren.',
    },
    {
        q: '¿Puede utilizarse la misma membresía para varias compañías?',
        a: 'No. Cada membresía cubre un solo RUC. Las compañías relacionadas o grupos empresariales requieren una membresía por cada entidad.',
    },
]

export const PreguntasFre = () => {
    return (
        <ScrollReveal as={"section"} className="py-24 bg-white border-t border-gray-200" id="preguntas">
            <div className="max-w-250 mx-auto px-5 sm:px-8">
                <div className="text-center mb-16 reveal-element">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block font-jakarta">
                        Preguntas Frecuentes
                    </span>
                    <h2 className="text-[#151E28] font-extrabold text-[2rem] sm:text-[2.5rem] tracking-tight leading-tight">
                        RESOLVEMOS SUS DUDAS ANTES DE ACTIVAR.
                    </h2>
                </div>

                <div className="space-y-4 reveal-element delay-100">
                    {preguntas.map((p, i) => (
                        <details key={p.q} className="group bg-[#151E28] border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden" open={i === 0}>
                            <summary className="flex items-center justify-between gap-4 cursor-pointer p-6 sm:p-8 font-bold text-white text-[1.1rem] list-none focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-orange-500 rounded-2xl">
                                {p.q}
                                <span className="transition-transform duration-300 group-open:rotate-180 text-orange-500 bg-white/10 p-2 rounded-full shrink-0">
                                    <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" aria-hidden="true"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <div className="px-6 sm:px-8 pb-8 text-gray-300 font-light text-[1.08rem] texto-desc border-t border-white/5 pt-5 mt-2">
                                {p.a}
                            </div>
                        </details>
                    ))}
                </div>

                <div className="mt-12 text-center reveal-element delay-200">
                    <p className="text-gray-600 font-light text-[1.15rem] texto-desc">¿Tiene otra pregunta?</p>
                    <a
                        href="https://wa.me/593983643310?text=Hola%2C%20tengo%20una%20consulta%20sobre%20la%20membres%C3%ADa%20tributaria"
                        target="_blank" rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 bg-transparent text-[#151E28] border border-[#151E28]/30 font-bold tracking-wider uppercase px-8 py-4 rounded-sm hover:bg-[#151E28] hover:text-white transition-all duration-300 font-jakarta"
                    >
                        Escríbanos por WhatsApp
                    </a>
                </div>
            </div>
        </ScrollReveal>
    )
}
