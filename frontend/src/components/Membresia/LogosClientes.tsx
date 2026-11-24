import { ScrollReveal } from "../ScrollReveal"

// Rutas absolutas: con rutas relativas ("marcas/...") los logos no cargan dentro de /soluciones/membresia.
const logos = [
    ['/marcas/bancoPacifico.png', 'Banco del Pacífico'],
    ['/marcas/cargill.png', 'Cargill'],
    ['/marcas/sony.png', 'Sony'],
    ['/marcas/datafast.png', 'Datafast'],
    ['/marcas/CmaCgm.png', 'CMA CGM'],
    ['/marcas/brenntag.png', 'Brenntag'],
    ['/marcas/interoc.png', 'Interoc'],
    ['/marcas/pacificard.png', 'Pacificard'],
    ['/marcas/bigcola.png', 'BigCola'],
    ['/marcas/universal.png', 'Universal'],
    ['/marcas/lanec.png', 'Lanec'],
    ['/marcas/cruzRoja.png', 'Cruz Roja'],
]

export const LogosClientes = () => {
    return (
        <ScrollReveal as={"section"} className="py-14 sm:py-16 bg-white border-b border-gray-200">
            <div className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">
                <p className="text-center text-gray-500 font-light text-[1rem] max-w-2xl mx-auto text-balance reveal-element">
                    La firma detrás de su membresía asesora a empresas nacionales y multinacionales como estas.
                </p>
                <div className="mt-10 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-2 reveal-element delay-100">
                    {logos.map(([src, name]) => (
                        <div key={src} className="h-24 flex items-center justify-center p-3 overflow-hidden">
                            <img
                                src={src}
                                alt={name}
                                loading="lazy"
                                className="max-h-full max-w-full object-contain scale-[1.7] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </ScrollReveal>
    )
}
