import { Header } from "../Hero/Header"
import { HeroMembresia, Banner, Respaldo, ExperienciaS, PerfilIdeal, PreguntasFre, Invitacion, Footer, Frase } from '..'
import { Planes } from "../Membresia/Planes"
import { Casos } from "../Membresia/Casos"
import { Planificacion2027 } from "../Membresia/Planificacion2027"
import { StickyCTA } from "../Membresia/StickyCTA"
import { PortafolioClientes } from "../Membresia/PortafolioClientes"
// Orden de venta: promesa → confianza → problema → identificación → para quién → cómo funciona
// → por qué ahora (2027) → precio → objeciones → cierre.
export const MembresiaPage = () => {
    return (
        <main className="m-auto">
            <Header />
            <HeroMembresia />
            <Banner />
            <PortafolioClientes />
            <Respaldo />
            <Casos />
            <PerfilIdeal />
            <ExperienciaS />
            <Planificacion2027 />
            <Planes />
            <PreguntasFre />
            <Invitacion />
            <section className='bg-blue-200'>
                <Frase blanco='ELEVE EL ESTÁNDAR DE SU' naranja='GESTIÓN CORPORATIVA' styles='font-extrabold text-[2.2rem] sm:text-[2.8rem] md:text-[3rem] leading-[1.1] mb-6 uppercase' />
                <Footer />
            </section>
            <StickyCTA />
        </main>
    )
}
