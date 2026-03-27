import { Recurso78, Recurso79 } from '../IconosSVG'

export const Navegacion = () => {
    return (
        <section className="max-w-7xl mx-auto px-8 mt-20 flex justify-center mb-15">
            <nav className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-md bg-white border
                    border-gray-300 text-gray-500 hover:bg-orange-500 hover:text-white 
                    hover:border-orange-500 transition-all cursor-pointer">
                    < Recurso78 className='w-6 h-6' />
                </button>

                <button className="w-10 h-10 flex items-center justify-center rounded-md bg-orange-500
                 text-white font-medium text-sm shadow cursor-pointer">
                    1
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-md bg-white border 
                 border-slate-200 text-slate-500 hover:bg-orange-500 hover:text-white 
                 hover:border-orange-500 transition-all font-medium text-sm cursor-pointer">
                    2
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-md bg-white border
                 border-slate-200 text-slate-500 hover:bg-orange-500 hover:text-white 
                 hover:border-orange-500 transition-all font-medium text-sm cursor-pointer">
                    3
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-md bg-white border 
                 border-gray-300 text-gray-500 hover:bg-orange-500 hover:text-white 
                hover:border-orange-500 transition-all cursor-pointer">
                    < Recurso79 className='w-6 h-6' />
                </button>
            </nav>
        </section>
    )
}
