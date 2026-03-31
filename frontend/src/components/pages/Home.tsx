import { Calculadora, Clients, Eslogan, Footer, Header, Hero, Impulsa, InfoRelaci, Informativos, Leaders, Soluciones } from '../../components'

export const Home = () => {
  return (
    <main className='m-auto'>
      <Header />

      <Hero />
      <Eslogan />
      <Clients />

      <section className='bg-gray-800 py-1 mt-10 pb-20'>
        <Soluciones />
      </section>

      <section className='mt-auto bg-blue-200 min-h-[450px]'>
        <Calculadora />
      </section>

      <Leaders />
      <div className='mt-10'>
        <InfoRelaci/>
      </div>

      <section className='bg-blue-200'>
        <Impulsa />
        <Footer />
      </section>
    </main>
  )
}