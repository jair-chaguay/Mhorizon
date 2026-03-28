
export const HeroNovedades = () => {
    return (
        <section className="px-6 md:px-12 lg:px-20 flex items-center relative bg-[url('/images/Recurso03.jpeg')] bg-cover bg-center min-h-100 md:min-h-125 py-12 md:py-0">
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/70 to-black/20 md:bg-linear-to-r md:from-black/90 md:via-black/80 md:to-transparent">
            </div>
            <div className="relative max-w-7xl mx-auto md:mx-0 w-full z-10">
                <div className="max-w-3xl">
                    <span className="inline-block px-3 md:px-4 py-1 mb-4 md:mb-6 text-blue-200 tracking-wide text-[0.65rem] md:text-xs uppercase bg-gray-800/60 rounded-sm font-semibold">
                        BOLETINES & ACTUALIZACIONES
                    </span>
                    
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold text-white tracking-tighter leading-[1.1] mb-4 md:mb-5 block">
                        Impulsando el
                        <span className="text-orange-500 block mt-1 md:mt-0">conocimiento corporativo</span>
                    </h1>
                    
                    <p className="text-[1.05rem] md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl text-balance">
                        Informativos, actualizaciones tributarias y análisis estratégico del mercado ecuatoriano para una toma de decisiones precisa.
                    </p>
                    
                </div>
            </div>
        </section>
    )
}