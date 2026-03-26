import { Button } from '../Button'

export const HeroSuministro = () => {
    return (
        <section className="px-20 flex gap-6 items-center relative 
            bg-[url('/images/Recurso61.jpg')] bg-cover bg-center min-h-[500px]">
            <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/80 
                    to-transparent">
            </div>

            <div className="relative max-w-7xl mx-auto px-8 w-full">
                <div className="max-w-3xl">
                    <span className="inline-block px-4 py-1 mb-6 text-blue-200  tracking-wide 
                    text-xs uppercase bg-gray-800/60 rounded-sm">
                        Especialización Sectorial
                    </span>
                    <h1 className="text-5xl md:text-5xl font-headline font-bold text-white tracking-
                    tighter leading-[1.1] mb-5 block">
                        Cadena de
                        <span className="text-orange-500 block">Suministro & Operaciones</span>
                    </h1>
                    <p className="text-xl md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl text-balance">
                        Aportamos rigor analítico y optimización a los procesos críticos de empresas que sostienen la infraestructura, la producción y el comercio exterior a gran escala.
                    </p>
                    <Button text='AGENDAR CONSULTORIA'
                        styles='text-white font-bold bg-orange-500 min-w-[240px] mt-5 rounded-sm' />
                </div>
            </div>



            <div className="absolute bottom-0 right-0 hidden lg:block w-1/3 p-12 
            bg-blue-200/80 text-white">
                <div className="space-y-8">
                    <div>
                        <div className="text-4xl font-headline font-black text-orange-500">
                            100%
                        </div>
                        <div className="text-sm font-label uppercase tracking-widest text-white/80 mt-2">
                            Trazabilidad Operativa
                        </div>
                    </div>
                    <div>
                        <div className="text-4xl font-headline font-black text-orange-500">
                            +35%
                        </div>
                        <div className="text-sm font-label uppercase tracking-widest text-white/80 mt-2">
                            Optimización de Recursos
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
