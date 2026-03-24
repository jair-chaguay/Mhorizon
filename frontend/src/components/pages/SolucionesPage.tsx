import {Header, Footer, Impulsa, Integrales, Metodologia, ServiciosEsp } from '../../components'

export const SolucionesPage = () => {
  return (
    <main className='m-auto'>
      <Header />
      <Integrales />
      <ServiciosEsp />

      <section className='bg-blue-200'>
        <Metodologia/>
      </section>

      <section className='bg-blue-200 mt-20'>
        <Impulsa />
        <Footer />
      </section>
    </main>
  )
}
