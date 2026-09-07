import { Calculadora, Clients, Eslogan, Footer, Frase, Header, Hero, InfoRelaci, Leaders, Soluciones } from '../../components'
import { Radar } from '../Radar/Radar'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../../api/axios'
import { isAxiosError } from 'axios'

export const Home = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(() => {
    return searchParams.get('abrirModal') === 'true';
  });

  const [email, setEmail] = useState('');
  const [nombres, setNombres] = useState('');

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (searchParams.get('abrirModal') === 'true') {
      searchParams.delete('abrirModal');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      await api.post('/correo-informativo', {
        email: email,
        nombres: nombres,
        source: 'modal_correo_react'
      });
      setStatus('success');

      setTimeout(() => {
        setIsModalOpen(false);
        setStatus('idle');
        setEmail('');
        setNombres('');
      }, 2000);
      
    } catch (error) {
      setStatus('error')
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 422 && error.response.data.errors) {
          const errorsArray = Object.values(error.response.data.errors).flat() as string[];
          setErrorMessage(errorsArray.join(', '));
        } else {
          setErrorMessage(error.response.data.message || 'Ocurrió un error en el servidor.');
        }
      } else {
        setErrorMessage('Error de conexión. Revisa tu internet.');
      }
    }
  }



return (
  <main className='m-auto'>
    <Header />

    <Hero />
    <Eslogan />
    <Clients />

    <Soluciones />

    <Calculadora />

    <Leaders />
    <Radar />
    <InfoRelaci />

    <section className='bg-blue-200'>
      <Frase blanco='¿QUÉ DESAFÍO NECESITA ' naranja='RESOLVER SU EMPRESA?' styles='font-extrabold text-[2.2rem] sm:text-[2.8rem] md:text-[3rem] leading-[1.1] mb-6 uppercase' />
      <Footer />
    </section>

    {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-11/12 max-w-2xl relative">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-2xl font-bold text-blue-200 mb-2">
              Reciba nuestras novedades en su correo
            </h3>
            <p className="text-gray-600 mb-6">
              Suscríbase para recibir mensualmente una síntesis de los cambios regulatorios e informativos.
            </p>

            {/* FORMULARIO */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre (Opcional)</label>
                <input 
                  type="text" 
                  value={nombres}
                  onChange={(e) => setNombres(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-200/20 p-2 border"
                  placeholder="Ej. Juan Pérez"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Correo Electrónico </label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 p-2 border"
                  placeholder="tu@correo.com"
                />
              </div>

              {/* Mensajes de feedback */}
              {status === 'error' && (
                <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                  {errorMessage}
                </div>
              )}
              {status === 'success' && (
                <div className="p-3 bg-green-100 text-green-700 rounded-md text-sm">
                  ¡Registrado con éxito! Cerrando...
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 rounded-lg cursor-pointer bg-gray-100 duration-300 transition-colors text-gray-700 hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="px-5 py-2 rounded-lg bg-orange-500 cursor-pointer duration-300 text-white hover:bg-orange-600 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Enviando...' : 'Enviar Datos'}
                </button>
              </div>
            </form>
            
          </div>
        </div>
      )}
  </main>
)
}