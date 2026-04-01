import { Header, Footer, Frase, HeroMercado, OperamosMercado, ArquitecturaEst} from '../../components'

export const MercadoPage = () => {
  return (
    <main className='m-auto'>
                <Header />
                <HeroMercado />
                <OperamosMercado />
                <ArquitecturaEst />
                
                <section className='bg-blue-200 '>
                    <Frase
                        blanco='Lidere el mercado '
                        naranja='con seguridad total'
                        styles='font-extrabold text-[2rem] sm:text-[2.8rem] md:text-[3.2rem] leading-[1.1] mb-6 tracking-tight'
                    />
                    <Footer />
                </section>
            </main>
  )
}
