interface MetodologiaCardProps {
  numero: string
  title: string
  content: string
  index?: number 
}

export const MetodologíaCard = ({ numero, title, content, index = 0 }: MetodologiaCardProps) => {
  const delayClass = `delay-${(index + 3) * 100}`;

  return (
    <div className={`w-full bg-white/5 border border-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors reveal-element ${delayClass}`}>
      <p className="text-orange-500 font-medium text-[1.1rem] flex items-center gap-3">
        <span className="bg-orange-500 text-white w-8 h-8 rounded-md flex items-center justify-center text-sm shadow-md">{numero}</span>
        {title}
      </p>
      <p className="text-gray-400 font-light mt-4 leading-relaxed text-[0.95rem]">{content}</p>
    </div>
  )
}