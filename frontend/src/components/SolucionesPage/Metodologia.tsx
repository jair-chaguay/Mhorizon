import { MetodologíaCard } from "./MetodologíaCard"

interface MetodologiaProps{
    title: string,
    content: string
}

const metodologia : MetodologiaProps[] = [
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
    <div className='mt-21 flex gap-20 px-20 items-center'>
        <div className="p-8 my-5 w-[42%]">
          <img className="w-[800px]" src="images/metodologia.png" alt="" />
        </div>
        <div>
            <h3 className="text-orange-500">METODOLOGÍA MHORIZON</h3>
            <h2 className="italic font-bold text-white mt-4 text-[1.63rem] w-[400px] tracking-widest">MÁS QUE NÚMEROS, ESTRATEGIA PURA</h2>
            <div className="grid grid-cols-2 gap-9 mt-6">
              {
                metodologia.map((prop: MetodologiaProps)=>(
                  <MetodologíaCard key={prop.title} {...prop}/>
                ))
              }               
            </div>
        </div>
    </div>
  )
}
