import React from 'react'
import { LeaderCard } from './LeaderCard'

interface LeaderProps {
  name: string
  cargo: string
  email?: string
  telf?: string
  urlImg: string
  link: string
}

const leadersProp: LeaderProps[] = [
  {
    name: 'Milton Montecé Q.',
    cargo: 'Presidente y Socio de Impuestos',
    urlImg: 'images/MILTON.png',
    telf: '+593 972-638-4937',
    email: 'mmontece@mhorizon.com.ec',
    link: 'https://ec.linkedin.com/in/milton-montec%C3%A9-94283029',
  },
  {
    name: 'Violeta Rodriguez',
    cargo: 'Supervisora de Impuestos',
    urlImg: 'images/VIOLETA.png',
    telf: '+593 972-638-4937',
    email: 'vrodriguez@mhorizon.com.ec',
    link: 'https://ec.linkedin.com/in/violeta-rodriguez-35a658a1',
  },
]

export const Leaders = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-10 xl:px-20 mt-16 sm:mt-20 lg:mt-24 max-w-[1400px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        
        {/* Imagen principal */}
        <div className="relative w-full lg:w-[58%]">
          <img
            src="images/Recurso24.png"
            alt="Perspectiva global"
            className="w-full h-full object-cover rounded-md shadow-xl"
          />

          {/* Card flotante */}
          <div className="relative lg:absolute lg:-bottom-12 lg:left-10 mt-6 lg:mt-0 bg-white w-full sm:max-w-[420px] p-4 sm:p-5 border-l-4 border-orange-500 rounded shadow-xl">
            <h3 className="font-bold text-[0.95rem] sm:text-[1rem]">
              PERSPECTIVA GLOBAL
            </h3>

            <p className="text-[0.82rem] sm:text-[0.9rem] font-light mt-2 leading-relaxed text-gray-700">
              Combinamos visión internacional con un profundo dominio normativo
              local para potenciar su competitividad.
            </p>

            <a
              href=""
              className="text-orange-500 text-sm font-medium mt-3 inline-block hover:text-orange-600 transition-colors"
            >
              Conocer más →
            </a>
          </div>
        </div>

        {/* Texto + cards */}
        <div className="w-full lg:w-[40%] lg:pt-8">
          <h2 className="font-bold text-[1.6rem] sm:text-[1.9rem] md:text-[2.1rem] leading-tight text-center lg:text-left">
            AUTORIDAD <br />
            <span className="relative inline-block">
              ESTRATÉGICA
              <span className="absolute left-0 -bottom-1 w-12 h-[2px] bg-orange-500"></span>
            </span>
          </h2>

          <p className="font-light mt-6 text-[0.95rem] sm:text-[1rem] leading-relaxed text-gray-700 text-center lg:text-left">
            En MHORIZON traducimos la complejidad del entorno empresarial en
            estrategias claras. Nuestro equipo multidisciplinario combina dos
            décadas de excelencia técnica en auditoría, leyes y finanzas.
          </p>

          <div className="flex flex-col gap-4 mt-8 items-center lg:items-start">
            {leadersProp.map((leader) => (
              <LeaderCard key={leader.name} {...leader} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}