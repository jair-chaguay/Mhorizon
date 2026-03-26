import { Header, Footer, Frase, HeroFinanzas, Operamos} from '../../components'
import { EstrctFinan } from '../Finanzas/EstrctFinan'

export const FinanzasPage = () => {
    return (
        <main className='m-auto'>
            <Header />
            <HeroFinanzas />
            <Operamos/>
            <EstrctFinan/>
            <section className='bg-blue-200 '>
                <Frase
                    blanco='POTENCIE SU '
                    naranja='CADENA DE SUMINISTRO'
                    styles='text-[1.8rem]'
                />
                <Footer />
            </section>
        </main>
    )
}