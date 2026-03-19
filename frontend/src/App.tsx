
import { Header, Hero, Icons, Leaders } from './components'

function App() {

  return (
    <main className='m-auto'>
      <section >
        <Header/>
      </section>
      
      <section className='m-auto'>
        <Hero/>

      </section>

      <section>
              <Leaders/>
        <Icons/>
      </section>
    </main>
  )
}

export default App
