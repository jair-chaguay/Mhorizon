interface MetodologiaProps {
  title: string
  content: string
}

export const MetodologíaCard = ({ title, content }: MetodologiaProps) => {
  return (
    <div className="w-full md:w-[200px] text-center md:text-left px-2 md:px-0">
      <p className="text-orange-500 font-medium">{title}</p>
      <p className="text-white/70 font-light mt-4 leading-relaxed">{content}</p>
    </div>
  )
}