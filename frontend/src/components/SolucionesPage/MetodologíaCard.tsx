interface MetodologiaProps{
    title: string,
    content: string
}

export const MetodologíaCard = ({title, content}: MetodologiaProps) => {
  return (
    <div className="w-[200px]">
        <p className="text-orange-500 font-medium">{title}</p>
        <p className="text-white/70 font-light mt-4">{content}</p>
    </div>
  )
}
