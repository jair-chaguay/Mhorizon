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
                        naranja='con seguridad'
                        styles='text-[1.8rem]'
                    />
                    <Footer />
                </section>
            </main>
  )
}
