// ConsultoríaCard.tsx
interface consultoriaProp {
    num: string,
    title: string,
    content: string
}

export const ConsultoríaCard = ({ num, title, content }: consultoriaProp) => {
    return (
        <div className="flex gap-5 text-white items-start group">
            <div className="bg-white/5 border border-white/10 flex flex-col justify-center rounded-lg w-14 h-14 items-center shrink-0 shadow-lg group-hover:bg-orange-500 transition-colors">
                <span className="text-[1.2rem] font-bold text-orange-500 group-hover:text-white">{num}</span>
            </div>

            <div className="flex-1 pt-1">
                <p className="font-bold text-[1.1rem] md:text-[1.15rem] leading-tight text-white mb-2">
                    {title}
                </p>
                <p className=" text-[0.95rem] text-gray-400 leading-relaxed">
                    {content}
                </p>
            </div>
        </div>
    )
}