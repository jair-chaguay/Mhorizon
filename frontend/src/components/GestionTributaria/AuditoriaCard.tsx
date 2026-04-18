// AuditoriaCard.tsx
interface autProps {
  icon: string,
  title: string,
  content: string,
}

export const AuditoriaCard = ({ icon, title, content }: autProps) => {
  return (
    <div className="bg-blue-200 border-white/10 border rounded-xl p-8 relative hover:bg-blue-200/95 transition-colors backdrop-blur-sm reveal-element delay-100">
      <div className="absolute -top-5 left-6 bg-orange-500 w-12 h-12 flex items-center justify-center rounded-lg shadow-lg">
        <img
          className="w-6 h-6 object-contain invert brightness-0"
          src={icon}
          alt={title}
        />
      </div>
      <div className="mt-4 px-2">
        <p className="text-white font-bold text-[1.2rem] md:text-[1.3rem] tracking-wide">Compliance Total</p>
        <p className="font-light text-gray-400 mt-3 text-[0.95rem] md:text-base leading-relaxed text-justify md:text-left">
          Aseguramos la integridad de sus operaciones frente a los estrictos marcos normativos del Servicio de Rentas Internas, mitigando riesgos de glosas y multas severas.
        </p>
      </div>
    </div>
  )
}