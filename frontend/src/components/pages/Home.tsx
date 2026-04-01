import { Calculadora, Clients, Eslogan, Footer, Frase, Header, Hero,InfoRelaci, Leaders, Soluciones } from '../../components'

export const Home = () => {
  return (
    <main className='m-auto'>
      <Header />

      <Hero />
      <Eslogan />
      <Clients />

      <Soluciones />

      <Calculadora />

      <Leaders />
      <InfoRelaci />

      <section className='bg-blue-200'>
        <Frase  blanco='ELEVE EL ESTÁNDAR DE SU' naranja='GESTIÓN CORPORATIVA' styles='font-extrabold text-[2.2rem] sm:text-[2.8rem] md:text-[3rem] leading-[1.1] mb-6 tracking-tight uppercase'/>
        <Footer />
      </section>
    </main>
  )
}