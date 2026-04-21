// ConsultoríaCard.tsx
interface consultoriaProp {
    num: string,
    title: string,
    content: string
}

export const ConsultoríaCard = ({ num, title, content }: consultoriaProp) => {
    return (
        <div className="flex gap-5 text-white items-start group">
            <div className="shrink-0 mt-1">
                <span className="w-12 h-12 rounded-lg border-2 border-orange-500/30 flex items-center justify-center text-orange-500 font-bold group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-300 shadow-sm">{num}</span>
            </div>

            <div className="flex-1 pt-1">
                <p className="font-bold text-[1.1rem] md:text-[1.15rem] leading-tight text-blue-200 mb-2 group-hover:text-orange-500 duration-300 transition-colors">
                    {title}
                </p>
                <p className=" text-[0.95rem] text-gray-500 leading-relaxed">
                    {content}
                </p>
            </div>
        </div>
    )
}