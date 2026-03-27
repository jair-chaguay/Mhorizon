import React from 'react'
import { Recurso76 } from '../IconosSVG'

export const Filters = () => {
    return (
        <section className="max-w-7xl mx-auto px-8 mb-16 mt-20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 
                border-b border-gray-800 pb-8">
                <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto">
                    <button className="px-6 py-2 bg-blue-200 text-white font-bold text-xs 
                        tracking-wider rounded-full whitespace-nowrap uppercase cursor-pointer">
                        TODOS
                    </button>
                    <button className="px-6 py-2 bg-white border border-gray-800 
                        text-gray-500 font-bold text-xs tracking-wider rounded-full 
                        hover:bg-orange-500 hover:text-white hover:border-orange-500 
                        transition-all whitespace-nowrap uppercase duration-300 cursor-pointer">
                        TRIBUTARIO
                    </button>

                    <button className="px-6 py-2 bg-white border border-gray-800 
                        text-gray-500 font-bold text-xs tracking-wider rounded-full 
                        hover:bg-orange-500 hover:text-white hover:border-orange-500 
                        transition-all whitespace-nowrap uppercase duration-300 cursor-pointer">
                        LEGAL
                    </button>

                    <button className="px-6 py-2 bg-white border border-gray-800 
                        text-gray-500 font-bold text-xs tracking-wider rounded-full 
                        hover:bg-orange-500 hover:text-white hover:border-orange-500 
                        transition-all whitespace-nowrap uppercase duration-300 cursor-pointer">
                        FINANZAS
                    </button>

                </div>
                <div className="relative w-full md:w-96">
                    <Recurso76 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6"/>
                    
                    <input className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 
                    rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500 
                    outline-none text-sm transition-all" 
                    placeholder="Buscar informativos..." type="text" />
                </div>
            </div>
        </section>
    )
}
