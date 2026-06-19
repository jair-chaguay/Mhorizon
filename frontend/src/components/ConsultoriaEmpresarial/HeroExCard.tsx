interface HeroProps {
    img: string
    title: string
    content: string
}

export const HeroExCard = ({ img, title, content }: HeroProps) => {
    return (
        <div className="flex gap-4 md:gap-5 items-start">
            <div className="bg-orange-500/20 p-3 rounded-lg shrink-0 border border-orange-500/30 shadow-inner">
                <img className="w-8 h-8 object-contain" src={img} alt={title} />

            </div>
            <div>
                <h4 className="font-bold text-[1.07rem] text-white">{title}</h4>
                <p className="text-[0.99rem] text-gray-300 leading-relaxed mt-1">{content}</p>
            </div>
        </div>
    )
}