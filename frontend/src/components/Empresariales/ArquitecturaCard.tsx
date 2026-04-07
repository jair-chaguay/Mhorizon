interface arquitecturaProps {
    numero: string,
    title: string,
    content: string
}


export const ArquitecturaCard = ({ numero, title, content }: arquitecturaProps) => {
    return (
        <div className="flex gap-6 group">
            <div className="shrink-0 mt-1">
                <div className="w-12 h-12 rounded-lg border-2 border-orange-500/30 flex items-center justify-center text-orange-500 font-bold group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-300 shadow-sm">
                    {numero}
                </div>
            </div>
            <div>
                <h4 className="text-[1.3rem] font-bold mb-3 text-blue-200 group-hover:text-orange-500 transition-colors">
                    {title}
                </h4>
                <p className="text-gray-600 text-[1rem] leading-relaxed">
                    {content}
                </p>
            </div>
        </div>
    )
}
