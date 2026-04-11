import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Download } from 'lucide-react'
import { ScrollReveal } from '../ScrollReveal'

export const Descarga = ({ informativo }: { informativo: any }) => {
    
    // Armamos la URL completa del PDF
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
    const pdfUrl = `${backendUrl}/storage/${informativo.pdf_url}`;

    return (
        <ScrollReveal>
            <div className="px-5 sm:px-8 relative z-20 reveal-element delay-100">
                <div className='max-w-250 mx-auto bg-white border border-gray-100 p-6 md:p-8 rounded-xl shadow-xl -mt-24 md:-mt-22 flex flex-col md:flex-row items-center justify-between gap-6 transform transition-transform hover:-translate-y-1'>
                    <div className="flex items-center gap-5 w-full md:w-auto">
                        <div className='w-14 h-14 bg-red-50 text-red-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm border border-red-100'>
                            <FontAwesomeIcon className='text-xl' icon={faFilePdf} />
                        </div>
                        <div>
                            <h3 className="font-bold text-[1.1rem] text-blue-200 uppercase tracking-tight">
                                Documento Adjunto
                            </h3>
                            <p className="text-[0.85rem] text-gray-500 mt-1">
                                Formato PDF • MHORIZON Consulting S.A.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        {/* Cambiamos <button> por <a> para que descargue el archivo al hacer clic */}
                        <a 
                            href={pdfUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-orange-500 text-white font-bold text-[0.75rem] uppercase tracking-widest rounded-md hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl cursor-pointer"
                        >
                            <Download className="w-4 h-4" /> Descargar Documento
                        </a>
                    </div>
                </div>
            </div>
        </ScrollReveal>
    )
}