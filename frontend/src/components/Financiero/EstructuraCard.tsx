// EstructuraCard.tsx
interface estructurasProp {
    numero: string,
    title: string,
    content: string
}


export const EstructuraCard = ({ numero, title, content }: estructurasProp) => {
    return (
        <li className="flex gap-6 items-start group">

            <div className="shrink-0 mt-1">
                <div className="w-12 h-12 rounded-lg border-2 border-orange-500/30 flex items-center justify-center text-orange-500 font-bold group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-300 shadow-sm">
                    {numero}
                </div>
            </div>

            <div>
                <h4 className="text-blue-200 font-bold text-[1.3rem] mb-2 leading-tight group-hover:text-orange-500">
                    {title}
                </h4>
                <p className="text-gray-600 text-[1.1rem] leading-relaxed">
                    {content}
                </p>
            </div>
        </li>
    )
}



