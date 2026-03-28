interface HeroProps {
    img: string
    title: string
    content: string
}

export const HeroExCard = ({ img, title, content }: HeroProps) => {
    return (
        <div className="flex gap-4 md:gap-5 items-start md:items-center">
            <img className="w-12 h-12 sm:w-14 sm:h-14 md:size-15 object-contain shrink-0" src={img} alt={title} />
            <div>
                <h4 className="font-bold text-[1rem] md:text-base">{title}</h4>
                <p className="text-[0.95rem] md:text-base leading-relaxed">{content}</p>
            </div>
        </div>
    )
}