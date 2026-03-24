import { Header, Footer, Impulsa, HeroGestion, AuditoriaPlan, EstrIm, CumplimientoNorm} from '../../components'

export const GestionPage = () => {
  return (
    <main>
      <Header />

      <HeroGestion />

      <section>
        <AuditoriaPlan />
      </section>

      <section className='bg-blue-200 py-20'>
        <EstrIm />
      </section>

      <section className='mt-20'>
        <CumplimientoNorm />
      </section>

      <section className='bg-blue-200 mt-20'>
        <Impulsa />
        <Footer />
      </section>
    </main>
  )
}
