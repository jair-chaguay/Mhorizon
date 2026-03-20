
import { Clients, Eslogan, Header, Hero, Icons, Leaders, Soluciones } from './components'

function App() {

  return (
    <main className='m-auto'>
      <section >
        <Header/>
      </section>
      
      <section className='m-auto'>
        <Hero/>
        <Eslogan/>
        <Clients/>
      </section>

      <section className='m-auto'>
        <Soluciones/>
      </section>

      <section>
        <Leaders/>
        <Icons/>
      </section>
    </main>
  )
}

export default App
