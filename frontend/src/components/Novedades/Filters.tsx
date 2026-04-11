import { Recurso76 } from '../IconosSVG'
import { ScrollReveal } from '../ScrollReveal'

interface FiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

export const Filters = ({ searchTerm, onSearchChange }: FiltersProps) => {
    return (
        <ScrollReveal>
            <section className="max-w-350 mx-auto px-5 sm:px-8 md:px-12 mt-12 mb-8 reveal-element delay-100">
                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 flex flex-col lg:flex-row justify-between items-center gap-6">
                    <div className="relative w-full lg:w-full">
                        <Recurso76 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        
                        <input 
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none text-[0.95rem] transition-all text-blue-200"
                            placeholder="Buscar informativos por título..." 
                            type="text" 
                        />
                    </div>
                </div>
            </section>
        </ScrollReveal>
    )
}