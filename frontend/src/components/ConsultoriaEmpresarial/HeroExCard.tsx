interface HeroProps{
    img: string, 
    title:string,
    content:string
}

export const HeroExCard = ({img, title, content}: HeroProps) => {
  return (
    <div className="flex gap-5 items-center">
        <img className="size-15" src={img} alt={title} />
        <div>
            <h4 className="font-bold">{title}</h4>
        <p>{content}</p>
        </div>
    </div>
  )
}
