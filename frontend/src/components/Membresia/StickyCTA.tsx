import { useEffect, useState } from 'react'

// Barra fija en móvil: aparece después del hero y desaparece al llegar al formulario final.
export const StickyCTA = () => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            const form = document.getElementById('contacto')
            const pasadoHero = window.scrollY > 600
            const enFormulario = form ? form.getBoundingClientRect().top < window.innerHeight : false
            setVisible(pasadoHero && !enFormulario)
        }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <div
            className={`md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#151E28] border-t border-white/10 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pr-24 flex items-center justify-between gap-3 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.5)] transition-transform duration-300 ${visible ? 'translate-y-0' : 'translate-y-full'}`}
            aria-hidden={!visible}
        >
            <div className="min-w-0">
                <p className="text-orange-500 text-[0.7rem] font-bold uppercase tracking-widest font-jakarta whitespace-nowrap">Lanzamiento</p>
                <p className="text-white font-extrabold text-[1.05rem] leading-tight font-jakarta">USD 110 <span className="text-gray-400 font-light text-[0.8rem] whitespace-nowrap">+ IVA / mes</span></p>
            </div>
            <a href="#planes" tabIndex={visible ? 0 : -1} className="bg-orange-500 text-white font-bold tracking-wider uppercase text-[0.8rem] px-5 py-3 rounded-sm shrink-0 font-jakarta">
                Ver membresía
            </a>
        </div>
    )
}
