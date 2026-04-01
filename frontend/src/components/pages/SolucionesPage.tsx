import { Header, Footer, Integrales, Metodologia, ServiciosEsp, Frase } from '../../components'

export const SolucionesPage = () => {
  return (
    <main className='m-auto'>
      <Header />
      <Integrales />
      <ServiciosEsp />

      <Metodologia />

      <section className='bg-blue-200 relative overflow-hidden'>
        <Frase blanco='ELEVE EL ESTÁNDAR DE SU' naranja='GESTIÓN CORPORATIVA' styles='text-[2rem] sm:text-[2.5rem] md:text-[2.8rem] leading-tight'/>
        <Footer />
      </section>
    </main>
  )
}
