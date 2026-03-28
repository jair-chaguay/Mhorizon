import { MetodologíaCard } from "./MetodologíaCard"

interface MetodologiaProps {
  title: string
  content: string
}

const metodologia: MetodologiaProps[] = [
  {
    title: '01. Diagnóstico',
    content: 'Identificamos brechas críticas y oportunidades de optimización inmediata en su estructura actual.'
  },
  {
    title: '02. Ejecución',
    content: 'Implementamos protocolos de alta eficiencia respaldados por tecnología de análisis predictivo.'
  },
  {
    title: '03. Monitoreo',
    content: 'Tableros de control en tiempo real para visualizar el impacto de cada decisión financiera.'
  },
  {
    title: '04. Evolución',
    content: 'Ajustes proactivos ante cambios en el mercado o legislaciones nacionales e internacionales.'
  }
]

export const Metodologia = () => {
  return (
    <div className="mt-14 md:mt-21 flex flex-col md:flex-row gap-12 md:gap-20 px-5 sm:px-8 md:px-20 py-10 sm:py-12 md:py-0 items-center md:items-center">
      <div className="p-4 sm:p-6 md:p-8 my-2 md:my-5 w-full md:w-[42%]">
        <img className="w-full md:w-[800px]" src="images/metodologia.png" alt="Metodología" />
      </div>

      <div className="w-full pt-2 sm:pt-4 md:pt-0">
        <h3 className="text-orange-500 text-sm sm:text-base md:text-base text-center md:text-left">
          METODOLOGÍA MHORIZON
        </h3>

        <h2 className="italic font-bold text-white mt-4 text-[1.6rem] sm:text-[1.75rem] md:text-[1.63rem] w-full md:w-[400px] tracking-wide md:tracking-widest text-center md:text-left leading-tight">
          MÁS QUE NÚMEROS, ESTRATEGIA PURA
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-9 mt-8 md:mt-6">
          {metodologia.map((prop: MetodologiaProps) => (
            <MetodologíaCard key={prop.title} {...prop} />
          ))}
        </div>
      </div>
    </div>
  )
}