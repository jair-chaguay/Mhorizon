import { LeaderCard } from './LeaderCard'
import { ScrollReveal } from '../ScrollReveal'
import { Link } from 'react-router-dom'

interface LeaderProps {
  name: string
  cargo: string
  urlImg: string
  link: string
  tiktok?: string
  tiktokUser?: string 
  instagram?: string
  instagramUser?: string 
  email?: string
}

const leadersProp: LeaderProps[] = [
  {
    name: 'Milton Montecé Q.',
    cargo: 'Partner Manager',
    urlImg: 'images/Milton_Montece.png',
    link: 'https://ec.linkedin.com/in/milton-montec%C3%A9-94283029',
    tiktok: 'https://www.tiktok.com/@milton_montece',
    tiktokUser: '@milton_montece', 
    instagram: 'https://www.instagram.com/milton.montece',
    instagramUser: '@milton.montece', 
    email: "mmontece@mhorizon.com.ec"
  },
  {
    name: 'Violeta Rodriguez',
    cargo: 'Tax Partner',
    urlImg: 'images/Violeta_Rodriguez.png',
    link: 'https://ec.linkedin.com/in/violeta-rodriguez-35a658a1',
    email: "vrodriguez@mhorizon.com.ec"
  },
]

export const Leaders = () => {
  return (
    <section className="py-24 max-w-350 mx-auto px-5 sm:px-8 md:px-12 relative overflow-hidden">
      <ScrollReveal className="flex flex-col lg:flex-row gap-16 items-center">

        <div className="relative w-full lg:w-[50%] reveal-element">
          <div className='relative rounded-2xl overflow-hidden shadow-2xl h-112.5'>
            <img
              src="images/PerspectivaGlobal.webp"
              alt="Perspectiva global"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative lg:absolute lg:-bottom-10 lg:-left-10 mt-8 lg:mt-0 bg-blue-200 w-full sm:max-w-105 p-6 sm:p-8 border-l-4 border-orange-500 rounded-xl shadow-2xl z-10">
            <h3 className="font-bold text-white text-[1.1rem] tracking-wide">
              PERSPECTIVA GLOBAL
            </h3>

            <p className="text-[0.95rem] font-light mt-3 leading-relaxed text-gray-400">
              Combinamos visión internacional con un profundo dominio normativo local para potenciar su competitividad corporativa.
            </p>

            <Link to={"/nosotros"}
              className="text-orange-500 text-[0.9rem] font-bold mt-4 inline-flex items-center gap-2 hover:text-white transition-colors uppercase tracking-wider"
            >
              Conocer más <span className="text-lg">→</span>
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-[50%] lg:pl-10 reveal-element delay-200">
          <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
            Directorio Ejecutivo
          </span>
          <div className="relative pl-6 flex items-center">
            <div className="absolute left-0 w-1 h-1/2 bg-orange-500 rounded-full"></div>
            <h2 className="font-extrabold text-blue-200 text-[2rem] sm:text-[2.5rem] leading-tight">
              AUTORIDAD <br /> ESTRATÉGICA
            </h2>
          </div>

          <p className="font-light mt-6 text-[1.1rem] leading-relaxed text-gray-600">
            En MHORIZON traducimos la complejidad del entorno empresarial en estrategias claras. Nuestro equipo multidisciplinario combina más de dos décadas de excelencia técnica en auditoría, impuestos y finanzas corporativas.
          </p>

          <div className="flex flex-col gap-6 mt-10">
            {leadersProp.map((leader) => (
              <LeaderCard key={leader.name} {...leader} />
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}