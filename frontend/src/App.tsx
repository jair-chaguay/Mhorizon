
import { Calculadora, Clients, Eslogan, Footer, Header, Hero, Impulsa, Informativos, Leaders, Perspectiva, Soluciones } from './components'

function App() {

  return (
    <main className='m-auto'>
      <section >
        <Header />
      </section>

      <section className='m-auto'>
        <Hero />
        <Eslogan />
        <Clients />
      </section>

      <section className='m-auto'>
        <Soluciones />
        
      </section>

      <section className='mt-auto bg-blue-200 h-[450px]'>
        <Calculadora />
      </section>

      <section className='m-auto'>
        <Leaders />
        <Informativos />
      </section>
      

      <section className='m-auto bg-blue-200'>
        <Impulsa />
        <Footer />
      </section>
    </main>
  )
}

export default App
