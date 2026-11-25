import { ScrollReveal } from "../ScrollReveal"

// Logos a color tomados de las versiones originales de la web (public/marcas/color).
// Todos comparten el mismo lienzo de 480 x 240 con tamaño óptico igualado, por eso se ven del mismo tamaño.
const clientes: [string, string][] = [
    ['/marcas/color/cargill.webp', 'Cargill'],
    ['/marcas/color/sony.webp', 'Sony'],
    ['/marcas/color/johnson.webp', 'Johnson & Johnson'],
    ['/marcas/color/cma-cgm.webp', 'CMA CGM'],
    ['/marcas/color/banco-pacifico.webp', 'Banco del Pacífico'],
    ['/marcas/color/brenntag.webp', 'Brenntag'],
    ['/marcas/color/datafast.webp', 'Datafast'],
    ['/marcas/color/banco-amazonas.webp', 'Banco Amazonas'],
    ['/marcas/color/banco-litoral.webp', 'Banco del Litoral'],
    ['/marcas/color/pacificard.webp', 'Pacificard'],
    ['/marcas/color/delbank.webp', 'DelBank'],
    ['/marcas/color/exolum.webp', 'Exolum Aviación'],
    ['/marcas/color/interoc.webp', 'Interoc'],
    ['/marcas/color/lanec.webp', 'Lanec'],
    ['/marcas/color/bigcola.webp', 'Big Cola'],
    ['/marcas/color/tpg.webp', 'TPG Terminal Portuario de Guayaquil'],
    ['/marcas/color/ecuaestibas.webp', 'Ecuaestibas'],
    ['/marcas/color/sagemar.webp', 'Sagemar'],
    ['/marcas/color/proquilarv.webp', 'Proquilarv'],
    ['/marcas/color/megarent.webp', 'Megarent'],
    ['/marcas/color/saltiveri.webp', 'Saltiveri Ogilvy'],
    ['/marcas/color/solymar.webp', 'Hotel Solymar Galápagos'],
    ['/marcas/color/cruz-roja.webp', 'Cruz Roja Ecuatoriana'],
    ['/marcas/color/universal.webp', 'Universal'],
]

const delays = ['', 'delay-100', 'delay-200', 'delay-300', 'delay-400']

export const PortafolioClientes = () => {
    return (
        <ScrollReveal as={"section"} id="clientes" className="bg-[#151E28] py-20 sm:py-24 px-5 sm:px-8 md:px-12 overflow-hidden relative">
            <div className="absolute -right-40 -top-40 w-[28rem] h-[28rem] bg-orange-500/10 rounded-full blur-[140px] pointer-events-none"></div>

            <div className="max-w-350 mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-end mb-12 sm:mb-14 reveal-element">
                    <div className="lg:col-span-7">
                        <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block font-jakarta">
                            Portafolio de clientes actuales e históricos
                        </span>
                        <h2 className="text-white font-extrabold text-[2rem] sm:text-[2.5rem] tracking-tight leading-tight">
                            EMPRESAS QUE HAN CONFIADO EN NUESTRO CRITERIO
                        </h2>
                    </div>
                    <p className="lg:col-span-5 text-gray-300 font-light text-[1.15rem] texto-desc">
                        Bancos, industrias, operadores portuarios y empresas de servicios han trabajado con MHORIZON. La misma firma es la que responde las consultas de su membresía.
                    </p>
                </div>

                <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
                    {clientes.map(([src, nombre], i) => (
                        <li
                            key={src}
                            className={`reveal-element ${delays[i % delays.length]} w-[calc((100%-0.75rem)/2)] sm:w-[calc((100%-3rem)/4)] md:w-[calc((100%-4rem)/5)] lg:w-[calc((100%-5rem)/6)]`}
                        >
                            <div className="bg-white rounded-xl aspect-[5/2] sm:aspect-[2/1] flex items-center justify-center p-1.5 sm:p-2 shadow-lg shadow-black/20 hover:-translate-y-1 transition-transform duration-300">
                                <img
                                    src={src}
                                    alt={nombre}
                                    title={nombre}
                                    loading="lazy"
                                    width={480}
                                    height={240}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </ScrollReveal>
    )
}
