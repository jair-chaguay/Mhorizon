import { Recurso78, Recurso79 } from '../IconosSVG'
import { ScrollReveal } from '../ScrollReveal'

export const Navegacion = () => {
    return (
        <ScrollReveal as={"section"}>
            <div className="mt-20 flex justify-center reveal-element">
                <nav className="flex items-center gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-500 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all cursor-pointer shadow-sm">
                        < Recurso78 className='w-5 h-5' />
                    </button>

                    <button className="w-10 h-10 flex items-center justify-center rounded-md bg-orange-500 border border-orange-500 text-white font-bold text-sm shadow-sm cursor-default">
                        1
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all font-semibold text-sm cursor-pointer shadow-sm">
                        2
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all font-semibold text-sm cursor-pointer shadow-sm">
                        3
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-500 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all cursor-pointer shadow-sm">
                        < Recurso79 className='w-5 h-5' />
                    </button>
                </nav>
            </div>
        </ScrollReveal>
    )
}
