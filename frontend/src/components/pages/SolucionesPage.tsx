import {Header, Footer, Impulsa, Integrales, Metodologia, ServiciosEsp } from '../../components'

export const SolucionesPage = () => {
  return (
    <main className='m-auto'>
      <Header />
      <Integrales />
      <ServiciosEsp />

      <section className='bg-blue-200 pt-4 pb-15'>
        <Metodologia/>
      </section>

      <section className='bg-blue-200 mt-10'>
        <Impulsa />
        <Footer />
      </section>
    </main>
  )
}
