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
                    blanco='¿Listo para fortalecer su '
                    naranja='horizonte financiero?'
                    styles='text-[1.8rem]'
                />
                <Footer />
            </section>
        </main>
    )
}