import { Footer } from "../Footer/Footer"
import { Frase } from "../Frase"
import { Header } from "../Hero/Header"
import { ArquitecturaLog, EstrctNegocios, HeroLogistico } from "../../components"
import { ClientesLogistico } from "../Logistico/ClientesLogistico"

export const LogisticoPage = () => {
    return (
        <main className='m-auto'>
            <Header />
            <HeroLogistico />
            <ArquitecturaLog />
            <EstrctNegocios />
            <ClientesLogistico />


            <section className='bg-blue-200'>
                <Frase blanco='ELEVE EL ESTÁNDAR DE SU' naranja='GESTIÓN CORPORATIVA' styles='font-extrabold text-[2.2rem] sm:text-[2.8rem] md:text-[3rem] leading-[1.1] mb-6 uppercase' />
                <Footer />
            </section>
        </main>
    )
}
