import { Header, Footer, Impulsa, HeroEx, Method, Estrategia, Experiencia } from '../../components'

export const ConsultoriaEmpresarial = () => {
    return (
        <main className='m-auto'>
            <Header />
            <HeroEx />
            <section className='bg-gray-800 py-10'>
                <Method />
            </section>
            <section className='mx-20'>
                <Estrategia />
            </section>
            <section className='mt-21'>
                <Experiencia />
            </section>
            <section className='bg-blue-200 '>
                <Impulsa />
                <Footer />
            </section>
        </main>
    )
}
