import { Recurso67, Recurso68 } from "../IconosSVG"

interface estructurasFinancieras {
    icon: React.ElementType, 
    title: string,
    content: string
}

const estrucutras : estructurasFinancieras[] = [
    {
        icon: Recurso67,
        title: "Titulo1",
        content: "Content1"
    },
    {
        icon: Recurso68,
        title: "Titulo 2",
        content: "Content2"
    }
]

export const EstrctFinan = () => {
    return (
        <section className="py-24 bg-blue-200 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-5xl font-extrabold mb-12 leading-tight 
                            tracking-tighter">
                            Estructura
                            <br />
                            <span className="text-orange-500 italic font-medium font-headline">
                                Financiera
                            </span>
                        </h2>



                        <div className="space-y-12">
                                    
                            
                    
                        </div>
                    </div>


                    <div className="relative Layout Imágenes Arquitectura">
                        <div className="relative z-10 w-4/5 aspect-[4/5] rounded-xl overflow-hidden shadow-2xl editoral-shadow translate-x-12 bg-mh-light Img Arquitectura grayscale MixBlend">
                            <img alt="Detail view of global stock market screens and tickers showing financial data" className="w-full h-full object-cover grayscale opacity-80 MixBlend Mix-blend-multiply" src="https://images.pexels.com/photos/187041/pexels-photo-187041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                        </div>
                        <div className="absolute -bottom-10 -left-10 z-20 w-3/5 aspect-square bg-mh-orange p-1 rounded-xl shadow-2xl editorial-shadow Módulo Flotante Precisión Naranja">
                            <div className="w-full h-full bg-mh-dark flex flex-col items-center justify-center text-center p-8 rounded-lg Box Módulo">
                                <span className="text-5xl font-headline font-black mb-2 text-mh-orange Precisión Naranja">100%</span>
                                <span className="text-xs font-label font-bold tracking-[0.3em] text-white uppercase Precisión Text">Precisión Auditada</span>
                            </div>
                        </div>
                        <div className="absolute top-1/2 -right-4 w-32 h-32 bg-mh-orange/20 blur-3xl rounded-full Brillo Fondo"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
