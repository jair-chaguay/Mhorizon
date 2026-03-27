import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Eyee } from '../IconosSVG'
import { Download } from 'lucide-react'

export const Descarga = () => {
    return (
        <div className="bg-white border border-slate-200 p-8 rounded-md shadow-sm flex flex-col 
            md:flex-row items-center justify-between gap-8 transform max-w-4xl mx-auto
             left-0 right-0">
            <div className="text-left w-full md:w-auto">
                <div className="flex items-center gap-4 mb-2">
                    <FontAwesomeIcon className='text-red-600 text-4xl' icon={faFilePdf} />
                    <div>
                        <h3 className="font-800 text-sm text-blue-200 uppercase tracking-tight">
                            Resolución Oficial
                        </h3>
                        <p className="text-sm text-blue-200/80 font-medium">
                            Documento PDF • 1.2 MB • Fuente: SRI
                        </p>
                    </div>
                </div>

            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <button className="flex items-center justify-center gap-3 px-8 py-4 border-2 
                    border-blue-200 text-blue-200 font-bold text-xs uppercase tracking-widest rounded-sm 
                    hover:bg-gray-800 cursor-pointer transition-all">
                    <Eyee className="text-blue-200 w-5" /> Visualizar
                </button>

                <button className="flex items-center justify-center gap-3 px-8 py-4 bg-orange-500 
                text-white font-medium text-xs uppercase tracking-widest rounded-sm hover:bg-blue-200 
                transition-all shadow-xl shadow-orange-500/20 duration-300 cursor-pointer">
                    <Download className="text-lg" /> Descargar
                </button>
            </div>
        </div>
    )
}
