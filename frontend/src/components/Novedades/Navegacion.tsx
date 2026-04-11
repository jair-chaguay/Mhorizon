import { Recurso78, Recurso79 } from '../IconosSVG'
import { ScrollReveal } from '../ScrollReveal'

interface NavProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Navegacion = ({ currentPage, totalPages, onPageChange }: NavProps) => {
    
    // Crea un arreglo con los números de las páginas ej: [1, 2, 3]
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <ScrollReveal as={"section"}>
            <div className="mt-20 flex justify-center reveal-element">
                <nav className="flex items-center gap-2">
                    
                    {/* Botón Atrás (Se deshabilita en la pág 1) */}
                    <button 
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`w-10 h-10 flex items-center justify-center rounded-md border transition-all shadow-sm ${currentPage === 1 ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed' : 'bg-white border-gray-200 text-gray-500 hover:bg-orange-500 hover:text-white hover:border-orange-500 cursor-pointer'}`}
                    >
                        < Recurso78 className='w-5 h-5' />
                    </button>

                    {/* Botones de números dinámicos */}
                    {pages.map(page => (
                        <button 
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`w-10 h-10 flex items-center justify-center rounded-md border font-semibold text-sm shadow-sm transition-all ${currentPage === page ? 'bg-orange-500 border-orange-500 text-white cursor-default' : 'bg-white border-gray-200 text-gray-600 hover:bg-orange-500 hover:text-white hover:border-orange-500 cursor-pointer'}`}
                        >
                            {page}
                        </button>
                    ))}

                    {/* Botón Siguiente (Se deshabilita en la última pág) */}
                    <button 
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`w-10 h-10 flex items-center justify-center rounded-md border transition-all shadow-sm ${currentPage === totalPages ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed' : 'bg-white border-gray-200 text-gray-500 hover:bg-orange-500 hover:text-white hover:border-orange-500 cursor-pointer'}`}
                    >
                        < Recurso79 className='w-5 h-5' />
                    </button>
                    
                </nav>
            </div>
        </ScrollReveal>
    )
}