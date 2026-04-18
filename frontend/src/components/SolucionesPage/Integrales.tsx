import { useEffect, useRef } from 'react';
import { Button } from '../Button';

export const Integrales = () => {
    const sectionRef = useRef<HTMLElement>(null);;

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
        < section ref={sectionRef} className="bg-[url('/images/Integrales.avif')] bg-cover bg-center relative flex gap-4 px-5 sm:px-8 md:px-20 w-full h-auto min-h-125 md:h-125 pt-16 md:pt-0 pb-28 md:pb-0 items-center overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent"></div>

            <div className='w-full md:w-[60%] relative flex flex-col justify-center mt-0 z-10 reveal-element'>
                <p className='inline-block w-fit bg-white/10 text-orange-500 border border-orange-500/30 px-4 py-2  items-center text-center rounded-sm text-[0.75rem] md:text-[0.85rem] font-bold tracking-widest uppercase mb-4 backdrop-blur-sm'>
                    EXPERTISE GLOBAL
                </p>

                <div className='w-full mt-2'>
                    <h1 className='font-bold text-white text-[2.4rem] sm:text-[2.6rem] md:text-[3.3rem] leading-[1.1] drop-shadow-lg'>
                        SOLUCIONES  
                        <span className='text-orange-500'>
                            INTEGRALES
                        </span>
                    </h1>
                </div>

                <p className='mt-6 text-[1.05rem] sm:text-[1.15rem] md:text-[1.2rem] text-gray-300 font-light w-full md:w-[85%] leading-relaxed'>
                    Potenciamos la arquitectura financiera de su empresa con estrategias de alto impacto, precisión técnica y visión de futuro en el mercado ecuatoriano e internacional.
                </p>
                <Button estilosPersonalizados='cursor-pointer bg-orange-500 text-white font-bold tracking-wider uppercase mt-8 py-4 px-8 w-full sm:w-70 rounded-md hover:bg-white hover:text-orange-600 shadow-xl hover:shadow-2xl transition-all duration-300 ' texto='Agendar asesoría'/>
                
            </div>

            <div className="hidden md:flex gap-5 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl absolute w-95 p-6 items-center rounded-xl bottom-16 right-20 z-10 reveal-element delay-300">
                <div className="bg-white rounded-lg shrink-0 relative">
                    <img className="w-11 h-11 object-contain" src="/images/Recurso29.png" alt="Crecimiento Operativo" />
                </div>
                <div>
                    <p className="text-[0.75rem] font-bold text-gray-300 uppercase tracking-wider">CRECIMIENTO SOSTENIDO</p>
                    <p className="font-bold text-[1.1rem] text-white leading-tight mt-1">+45% Eficiencia Operativa</p>
                </div>
            </div>

            <div className="md:hidden flex gap-5 bg-[#0f172a]/80 backdrop-blur-md border border-white/10 shadow-2xl absolute w-[90%] sm:w-[85%] p-5 items-center rounded-xl bottom-6 left-1/2 -translate-x-1/2 z-10 reveal-element delay-300">
                <div className="bg-orange-500 p-2 rounded-lg shrink-0">
                    <img className="w-8 h-8 object-contain" src="/images/Recurso29.png" alt="Crecimiento Operativo" />
                </div>
                <div>
                    <p className="text-[0.7rem] font-bold text-gray-300 uppercase tracking-wider">CRECIMIENTO SOSTENIDO</p>
                    <p className="font-extrabold text-[1rem] text-white leading-tight mt-1">+45% Eficiencia Operativa</p>
                </div>
            </div>
        </section >
    )
}