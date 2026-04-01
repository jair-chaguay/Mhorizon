import { Header, Footer, Frase, HeroFinanzas, Operamos} from '../../components'
import { EstrctFinan } from '../Finanzas/EstrctFinan'

export const FinanzasPage = () => {
    return (
        <main className='m-auto overflow-hidden'>
            <Header />
            <HeroFinanzas />
            <Operamos/>
            <EstrctFinan/>
            <section className='bg-blue-200 '>
                <Frase
                    blanco='¿Listo para fortalecer su '
                    naranja='horizonte financiero?'
                    styles='font-extrabold text-[2rem] md:text-[2.6rem] leading-tight mb-4 tracking-tight'
                />
                <Footer />
            </section>
        </main>
    )
}