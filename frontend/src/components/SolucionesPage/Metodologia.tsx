import { useEffect, useRef } from 'react';
import { MetodologíaCard } from "./MetodologíaCard"

export interface MetodologiaProps {
  numero: string
  title: string
  content: string
}

const metodologia: MetodologiaProps[] = [
  {
    numero: '01',
    title: 'Diagnóstico',
    content: 'Identificamos brechas críticas y oportunidades de optimización inmediata en su estructura actual.'
  },
  {
    numero: '02',
    title: 'Ejecución',
    content: 'Implementamos protocolos de alta eficiencia respaldados por tecnología de análisis predictivo.'
  },
  {
    numero: '03',
    title: 'Monitoreo',
    content: 'Portal del cliente para visualizar en tiempo real el impacto de cada gestión.'
  },
  {
    numero:'04',
    title: 'Evolución',
    content: 'Ajuste proactivo ante cambios en la legislación nacional.'
  }
]

export const Metodologia = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const revealElements = sectionRef.current.querySelectorAll('.reveal-element');

    const revealOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, revealOptions);

    revealElements.forEach(el => observer.observe(el));

    const timeoutId = setTimeout(() => {
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('active');
        }
      });
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-blue-200 pt-20 pb-24 border-b border-b-gray-100/10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 md:gap-16 px-5 sm:px-8 md:px-12 items-center relative z-10">
        <div className="w-full lg:w-[45%] relative reveal-element">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl h-112.5 md:h-150 group">
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="/images/metodologia.png" alt="Metodología Estratégica" />
            <div className="absolute inset-0 bg-blue-200/40 mix-blend-multiply"></div>
            <div className="absolute inset-0 border border-white/10 rounded-2xl"></div>
          </div>
        </div>

        <div className="w-full lg:w-[55%] pt-2 sm:pt-4 md:pt-0">
          <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block text-center lg:text-left reveal-element">
            METODOLOGÍA MHORIZON
          </span>

          <h2 className="text-white font-extrabold mt-2 text-[2rem] sm:text-[2.4rem] leading-tight text-center lg:text-left tracking-tight uppercase reveal-element delay-100">
            MÁS QUE NÚMEROS, <br /> ESTRATEGIA PURA
          </h2>

          <p className="text-gray-300 font-light mt-5 text-[1.05rem] text-center lg:text-left leading-relaxed max-w-lg mx-auto lg:mx-0 reveal-element delay-200">
            Combinamos el pensamiento analítico riguroso con la resolución creativa de problemas para ofrecer un impacto medible en cada etapa del ciclo de negocio.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            {metodologia.map((prop: MetodologiaProps, index: number) => (
              <MetodologíaCard 
                key={prop.title} 
                {...prop} 
                index={index}   
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}