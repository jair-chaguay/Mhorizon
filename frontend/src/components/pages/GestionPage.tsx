import { Header, Footer, HeroGestion, AuditoriaPlan, EstrIm, CumplimientoNorm, Frase } from '../../components'

export const GestionPage = () => {
  return (
    <main>
      <Header />

      <HeroGestion />
      <AuditoriaPlan />

      <EstrIm />
      <CumplimientoNorm />

      <section className='bg-blue-200'>
        <Frase blanco='ELEVE EL ESTÁNDAR DE SU' naranja='GESTIÓN CORPORATIVA.'
        styles='text-[2rem] sm:text-[2.5rem] md:text-[2.8rem] leading-tight'/>
        <Footer />
      </section>
    </main>
  )
}
