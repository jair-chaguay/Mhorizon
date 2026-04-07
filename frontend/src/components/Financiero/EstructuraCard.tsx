// EstructuraCard.tsx
interface estructurasProp {
    numero: string,
    title: string,
    content: string
}

export const EstructuraCard = ({ numero, title, content }: estructurasProp) => {
    return (
        <li className="flex gap-6 items-start group">
            
            <div className="w-14 h-14 shrink-0 bg-gray-50 border border-gray-200 text-[#151E28] group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-300 rounded-xl flex items-center justify-center font-black text-xl shadow-sm">
                {numero}
            </div>
            
            <div>
                <h4 className="text-blue-200 font-bold text-[1.3rem] mb-2 leading-tight">
                    {title}
                </h4>
                <p className="text-gray-600 text-[1.05rem] leading-relaxed">
                    {content}
                </p>
            </div>
        </li>
    )
}