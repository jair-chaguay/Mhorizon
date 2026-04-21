import { Header, Footer, Frase, HeroIndustrial, Operamos} from '..'
import { EstrctFinan } from '../Finanzas/EstrctFinan'

export const IndustrialPage = () => {
    return (
        <main className='m-auto overflow-hidden'>
            <Header />
            <HeroIndustrial />
            <Operamos/>
            <EstrctFinan/>
            <section className='bg-blue-200 '>
                <Frase
                    blanco='¿Listo para fortalecer su '
                    naranja='cadena de valor?'
                    styles='font-extrabold text-[2rem] md:text-[2.6rem] leading-tight mb-4 tracking-tight'
                />
                <Footer />
            </section>
        </main>
    )
}