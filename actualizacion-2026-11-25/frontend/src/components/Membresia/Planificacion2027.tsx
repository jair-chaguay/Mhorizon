import { useEffect, useRef, useState } from "react"

// Pedido de MHorizon: presentar la membresía como una decisión para el presupuesto 2027.
// El scroll nunca se detiene: la página avanza normal y la sección acompaña la lectura.
//  - Desde 768 px: el "2027" con el precio queda fijo a la izquierda y se va llenando
//    mientras las razones pasan por la derecha.
//  - Móvil: el "2027" se llena al entrar en pantalla y las razones se encienden al llegar.
//  - Con movimiento reducido todo se muestra completo desde el inicio.
const razones = [
    {
        titulo: 'Una cuota fija que ya puede presupuestar',
        texto: 'USD 110 + IVA al mes con el precio de lanzamiento. Un valor conocido que entra en su plan del próximo año desde ahora.',
    },
    {
        titulo: 'Año nuevo, cambios en la normativa',
        texto: 'Cada año trae reformas y nuevas obligaciones. Con la membresía recibe alertas de reformas y resuelve sus dudas antes de aplicarlas.',
    },
    {
        titulo: 'Los primeros meses son los más exigentes',
        texto: 'Cierre del ejercicio, declaración del Impuesto a la Renta y decisiones sobre utilidades. Llegue a esas fechas con respaldo, no con dudas.',
    },
]

const limitar = (n: number) => Math.min(1, Math.max(0, n))

const Anio = ({ relleno, className }: { relleno: number; className: string }) => (
    <p
        aria-hidden="true"
        className={`font-extrabold font-jakarta tracking-tighter leading-[0.85] py-[0.08em] -my-[0.08em] select-none ${className}`}
        style={{
            color: 'transparent',
            WebkitTextStroke: '2px #151E28',
            backgroundImage: `linear-gradient(90deg, #151E28 ${relleno}%, transparent ${relleno}%)`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
        }}
    >
        2027
    </p>
)

export const Planificacion2027 = () => {
    const anio = useRef<HTMLDivElement>(null)
    const items = useRef<(HTMLLIElement | null)[]>([])
    const [relleno, setRelleno] = useState(0)
    const [alcanzadas, setAlcanzadas] = useState(0)
    const [sinMovimiento] = useState(() =>
        typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches)

    useEffect(() => {
        if (sinMovimiento) return
        const dosColumnas = window.matchMedia('(min-width: 768px)')
        let raf = 0
        const calcular = () => {
            raf = 0
            const alto = window.innerHeight
            // Línea de lectura: una razón "llega" cuando su parte superior cruza este punto.
            const linea = alto * 0.68
            const lis = items.current.filter(Boolean) as HTMLLIElement[]
            if (!lis.length || !anio.current) return
            setAlcanzadas(lis.filter((li) => li.getBoundingClientRect().top < linea).length)

            if (dosColumnas.matches) {
                // El año se llena al ritmo de las razones: empieza cuando se acerca la primera y termina con la última.
                const inicio = lis[0].getBoundingClientRect().top - alto * 0.25
                const ultima = lis[lis.length - 1].getBoundingClientRect()
                const fin = ultima.top + ultima.height * 0.35
                setRelleno(limitar((linea - inicio) / Math.max(1, fin - inicio)) * 100)
            } else {
                // En móvil el año se llena mientras entra en pantalla.
                const top = anio.current.getBoundingClientRect().top
                setRelleno(limitar((alto * 0.95 - top) / (alto * 0.6)) * 100)
            }
        }
        const alMover = () => { if (!raf) raf = requestAnimationFrame(calcular) }
        calcular()
        window.addEventListener('scroll', alMover, { passive: true })
        window.addEventListener('resize', alMover)
        return () => {
            window.removeEventListener('scroll', alMover)
            window.removeEventListener('resize', alMover)
            cancelAnimationFrame(raf)
        }
    }, [sinMovimiento])

    const llenado = sinMovimiento ? 100 : relleno
    const llegadas = sinMovimiento ? razones.length : alcanzadas

    return (
        <section id="planificacion-2027" className="bg-white border-b border-gray-200 py-20 sm:py-24 md:py-28">
            <div className="max-w-350 mx-auto px-5 sm:px-8 md:px-12 flex flex-col md:grid md:grid-cols-12 md:gap-10 lg:gap-16">

                {/* Columna fija (desde 768 px). En móvil sus piezas se reparten en el orden de lectura. */}
                <div className="contents md:block md:col-span-5 md:self-start md:sticky md:top-[max(6.5rem,calc(50vh-12rem))]">
                    <div ref={anio} className="order-2 mt-10 md:mt-0 w-fit">
                        <Anio relleno={llenado} className="text-[5.5rem] sm:text-[7.5rem] md:text-[7rem] lg:text-[9.5rem] xl:text-[11.5rem]" />
                        <div className="mt-5 h-1.5 w-full bg-gray-100 overflow-hidden">
                            <div className="h-full bg-orange-500 origin-left" style={{ transform: `scaleX(${llenado / 100})` }}></div>
                        </div>
                    </div>
                    <div className="order-4 mt-10 md:mt-8 flex flex-col items-start gap-6">
                        <p className="texto-desc text-gray-600 font-light text-[1.1rem] max-w-md">
                            Precio de lanzamiento por tiempo limitado: <strong className="font-bold text-[#151E28] whitespace-nowrap">USD 110 + IVA al mes</strong> en lugar de USD 150 + IVA.
                        </p>
                        <a
                            href="#planes"
                            className="inline-block text-center bg-orange-500 text-white font-bold tracking-wider uppercase px-8 py-4 rounded-sm hover:bg-[#151E28] shadow-xl hover:shadow-orange-500/20 transition-all duration-300 font-jakarta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                        >
                            Incluirla en mi 2027
                        </a>
                    </div>
                </div>

                <div className="contents md:block md:col-span-7">
                    <div className="order-1">
                        <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block font-jakarta">
                            Planificación 2027
                        </span>
                        <h2 className="text-[#151E28] font-extrabold text-[2rem] sm:text-[2.2rem] md:text-[2.5rem] tracking-tight leading-tight">
                            EL PRESUPUESTO DEL PRÓXIMO AÑO SE DECIDE AHORA
                        </h2>
                        <p className="texto-desc mt-4 text-gray-600 font-light text-[1.15rem] max-w-2xl">
                            En estas semanas las empresas definen qué servicios contratan o renuevan para 2027. Si la membresía entra en ese presupuesto, su empresa empieza el año con criterio tributario a la mano.
                        </p>
                    </div>

                    <ol className="order-3 mt-8 md:mt-14 border-t border-gray-200">
                        {razones.map((r, i) => {
                            const llego = llegadas > i
                            const actual = llegadas === i + 1
                            return (
                                <li
                                    key={r.titulo}
                                    ref={(el) => { items.current[i] = el }}
                                    className={`relative pl-6 py-7 md:py-12 lg:py-14 border-b border-gray-200 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${llego ? 'opacity-100 translate-y-0' : 'opacity-25 translate-y-3'}`}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`absolute left-0 top-7 bottom-7 md:top-12 md:bottom-12 lg:top-14 lg:bottom-14 w-1 transition-colors duration-500 ${actual ? 'bg-orange-500' : 'bg-gray-200'}`}
                                    ></span>
                                    <h3 className="text-[#151E28] font-bold text-[1.2rem] md:text-[1.35rem] leading-snug">{r.titulo}</h3>
                                    <p className="texto-desc mt-2 text-gray-600 font-light text-[1.08rem] max-w-xl">{r.texto}</p>
                                </li>
                            )
                        })}
                    </ol>
                </div>

            </div>
        </section>
    )
}
