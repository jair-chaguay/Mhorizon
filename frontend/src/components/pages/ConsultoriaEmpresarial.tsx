import { Header, Footer, HeroEx, Method, Estrategia, Experiencia, Frase } from '../../components'

export const ConsultoriaEmpresarial = () => {
    return (
        <main className='m-auto overflow-hidden'>
            <Header />
            <HeroEx />
                <Method />
                <Estrategia />
¿                <Experiencia />
            <section className='bg-blue-200 '>
                <Frase blanco='ELEVE EL ESTÁNDAR DE SU' naranja='GESTIÓN CORPORATIVA.' styles='font-bold text-[2rem] sm:text-[2.5rem] md:text-[2.8rem] leading-tight' />
                <Footer />
            </section>
        </main>
    )
}
