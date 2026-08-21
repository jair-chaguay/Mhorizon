import React, { useEffect } from 'react';
import { ScrollReveal } from "../ScrollReveal";
import DOMPurify from 'dompurify';

// Definimos la interfaz con los datos completos que vienen de tu API
interface Informativo {
  titulo: string;
  resolucion_oficial?: string | null;
  descripcion_portada: string;
  contenido: string; 
  imagen_portada_url?: string | null;
  pdf_url?: string | null;
  created_at: string;
}

interface AnalisisBoletinProps {
  informativo: Informativo;
}

export const AnalisisBoletin: React.FC<AnalisisBoletinProps> = ({ informativo }) => {
  const BASE_URL = 'https://api.mhorizon.com.ec';
  const cleanHTML = DOMPurify.sanitize(informativo.contenido);

  useEffect(() => {
    if (informativo) {
      document.title = `${informativo.titulo} | MHORIZON`;

      let metaDescription = document.querySelector('meta[name="description"]');
      
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      
      metaDescription.setAttribute('content', informativo.descripcion_portada || 'Informativo Oficial de MHORIZON');
    }
    
    return () => {
      document.title = 'MHorizon';
    };
  }, [informativo]);
  // ---------------------------------------------------------

  return (
    <article className="max-w-225 mx-auto px-5 sm:px-8 py-16 md:py-20 md:mt-10 lg:mt-10 sm:p-0 bg-gray-100">
      <ScrollReveal className="max-w-none text-gray-700 font-light leading-relaxed">
        
        <div className="mb-10 border-b border-gray-200 pb-8 reveal-element">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-sm text-[0.70rem] font-bold tracking-widest uppercase">
              Informativo Oficial
            </span>
            
            {informativo.resolucion_oficial && (
              <span className="text-orange-500 font-mono text-sm border border-gray-200 px-2 py-0.5 rounded bg-white">
                {informativo.resolucion_oficial}
              </span>
            )}
            
            <div className="flex items-center gap-4 ml-auto">
              <span className="text-blue-200/60 font-medium text-sm">
                {new Date(informativo.created_at).toLocaleDateString('es-EC', { 
                  day: 'numeric', month: 'long', year: 'numeric' 
                })}
              </span>

              {informativo.pdf_url && (
                <a 
                  href={
                    informativo.pdf_url.startsWith('http') 
                      ? informativo.pdf_url 
                      : `${BASE_URL}/${informativo.pdf_url}`
                  }
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-orange-500 border border-transparent text-white hover:bg-blue-200 hover:text-white duration-300 px-4 py-1.5 rounded-lg font-bold text-sm transition-all shadow-sm"
                  title="Descargar documento PDF"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Descargar PDF
                </a>
              )}
            </div>
          </div>

          <h1 className="text-3xl md:text-[2.5rem] font-extrabold text-blue-200 tracking-tight leading-tight">
            {informativo.titulo}
          </h1>
        </div>

        <div 
          className="prose prose-lg max-w-none text-blue-200 prose-headings:text-blue-200 prose-strong:text-blue-200 prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline reveal-element delay-100"
          dangerouslySetInnerHTML={{ __html: cleanHTML }} 
        />

      </ScrollReveal>
    </article>
  );
};