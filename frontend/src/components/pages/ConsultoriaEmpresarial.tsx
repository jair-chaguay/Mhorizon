import { Header, Footer, HeroEx, Method, Estrategia, Experiencia, Frase, PortafoliaEmpresarial } from '../../components'



export const ConsultoriaEmpresarial = () => {
    return (
        <main className='m-auto'>
            <Header />
            <HeroEx />
            <Method />
            <Estrategia />
            <PortafoliaEmpresarial />
            <Experiencia />
            <section className='bg-blue-200'>
                <Frase blanco='ELEVE EL ESTÁNDAR DE SU' naranja='GESTIÓN CORPORATIVA' styles='font-extrabold text-[2.2rem] sm:text-[2.8rem] md:text-[3rem] leading-[1.1] mb-6 uppercase' />
                <Footer />
            </section>
        </main>
    )
}
