import React from 'react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../ScrollReveal';

const SuccessVerification: React.FC = () => {
  return (
    <ScrollReveal className="bg-blue-200 text-blue-200 overflow-x-hidden min-h-screen flex flex-col relative font-sans">
      <div 
        className="absolute inset-0 bg-[url('/images/Recurso38.avif')] bg-cover bg-center opacity-40 mix-blend-luminosity z-0 reveal-element"
      />
      <div className="absolute inset-0 bg-linear-to-b from-blue-200/95 via-blue-200/90 to-blue-200 z-0" />

      <header className="relative z-10 w-full py-6 px-5 sm:px-8 md:px-12 flex justify-between items-center">
        <a href="/" className="inline-block transition-transform hover:scale-105 duration-300">
          <img 
            src="images/MHORIZONBOCETO.png" 
            alt="MHorizon Logo" 
            className="w-36 sm:w-44"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x50?text=MHORIZON&bg=151E28&text_color=ffffff';
            }}
          />
        </a>
        
        <div className="hidden sm:flex items-center gap-2 text-white/70 text-[0.8rem] tracking-widest uppercase font-semibold border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
          <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Operación Validada
        </div>
      </header>

      <main className="relative z-10 grow flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-120 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10 relative text-center">
          
          <div className="h-1.5 w-full bg-linear-to-r from-orange-400 to-orange-600" />

          <div className="p-8 sm:p-10 md:p-12">
            
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-green-50 border border-green-100 rounded-full flex items-center justify-center shadow-lg shadow-green-500/10 animate-bounce-subtle">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <div className="mb-10">
              <span className="inline-block text-gray-400 text-[0.70rem] font-bold tracking-widest uppercase mb-2">
                Paso 3 de 3 Completado
              </span>
              <h1 className="text-blue-200 font-extrabold text-[1.8rem] sm:text-[2.2rem] tracking-tight leading-tight mb-4">
                Actualización Exitosa
              </h1>
              <p className="text-blue-200/60 font-light text-[0.95rem] leading-relaxed max-w-75 mx-auto">
                Su contraseña corporativa ha sido restablecida correctamente. Ya puede acceder a su portal con sus nuevas credenciales.
              </p>
            </div>

            <div className="pt-4">
              <Link 
                to="/loginPage" 
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-lg shadow-orange-500/20 text-[0.95rem] font-bold tracking-[0.15em] uppercase text-white bg-orange-500 hover:bg-blue-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                Ir al Inicio de Sesión
              </Link>
            </div>

          </div>
          
          <div className="bg-gray-50 px-8 py-5 border-t border-gray-100">
            <p className="text-[0.70rem] text-gray-500 font-light flex items-center justify-center gap-2 uppercase tracking-widest">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Credenciales Encriptadas
            </p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 w-full py-6 px-5 border-t border-white/10">
        <div className="max-w-350 mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[0.75rem] text-white/50 font-light">
          <p>&copy; 2026 MHORIZON ECUADOR. Todos los derechos reservados.</p>
          <div className="flex gap-6 uppercase tracking-wider">
            <a href="#" className="hover:text-orange-500 transition-colors duration-300">Privacidad</a>
            <a href="#" className="hover:text-orange-500 transition-colors duration-300">Términos Legales</a>
            <a href="#" className="hover:text-orange-500 transition-colors duration-300">Contactar Soporte</a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite ease-in-out;
        }
      `}</style>
    </ScrollReveal>
  );
};

export default SuccessVerification;