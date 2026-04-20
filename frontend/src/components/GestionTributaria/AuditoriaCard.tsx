// AuditoriaCard.tsx
interface AuditoriaProps {
  icon: string,
  title: string,
  content: string,
}

export const AuditoriaCard = ({ icon, title, content }: AuditoriaProps) => {
  return (
    <div className="bg-blue-200 border-white/10 border rounded-xl px-8 py-10 relative hover:bg-blue-200/95 transition-colors backdrop-blur-sm reveal-element delay-100 transform hover:-translate-y-2 transition-transform duration-300">
      <div className="absolute -top-5 left-6 bg-orange-500 w-12 h-12 flex items-center justify-center rounded-lg shadow-lg hover:bg-orange-500">
        <img
          className="w-6 h-6 object-contain invert brightness-0"
          src={icon}
          alt={title}
        />
      </div>
      <div className="mt-4 px-2">
        <p className="text-white font-bold text-[1.2rem] md:text-[1.3rem] tracking-wide">{title}</p>
        <p className="font-light text-gray-100 mt-3 text-[0.95rem] md:text-base leading-relaxed text-justify md:text-left">
          {content}
        </p>
      </div>
    </div>
  )
}