import { ScrollReveal } from "../ScrollReveal"

export const Eslogan = () => {
  return (
    <ScrollReveal>
      <section className="bg-orange-500 py-2 relative z-20 shadow-xl reveal-element">
            <div className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-white/20">
                    <div className="px-4">
                        <p className="text-white text-xl font-bold mb-1">+20</p>
                        <p className="text-white/90 text-[0.75rem] font-meidum uppercase tracking-widest">Años de Experiencia</p>
                    </div>
                    <div className="px-4">
                        <p className="text-white text-xl font-bold mb-1">NIIF & NIA</p>
                        <p className="text-white/90 text-[0.75rem] font-medium uppercase tracking-widest">Estándares Globales</p>
                    </div>
                    <div className="px-4">
                        <p className="text-white text-xl font-bold mb-1">100%</p>
                        <p className="text-white/90 text-[0.75rem] font-medium uppercase tracking-widest">Cumplimiento Tributario</p>
                    </div>
                    <div className="px-4">
                        <p className="text-white text-xl font-bold mb-1">B2B</p>
                        <p className="text-white/90 text-[0.75rem] font-medium uppercase tracking-widest">Enfoque Corporativo</p>
                    </div>
                </div>
            </div>
        </section>
    </ScrollReveal>
  )
}