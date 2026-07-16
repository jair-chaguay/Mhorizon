import { Calculadora, Clients, Eslogan, Footer, Frase, Header, Hero,InfoRelaci, Leaders, Soluciones } from '../../components'
import { Radar } from '../Radar/Radar'

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
      <Radar />
      <InfoRelaci />

      <section className='bg-blue-200'>
        <Frase  blanco='¿QUÉ DESAFÍO NECESITA ' naranja='RESOLVER SU EMPRESA?' styles='font-extrabold text-[2.2rem] sm:text-[2.8rem] md:text-[3rem] leading-[1.1] mb-6 uppercase'/>
        <Footer />
      </section>
    </main>
  )
}