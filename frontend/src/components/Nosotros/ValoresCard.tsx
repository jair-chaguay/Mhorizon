interface valoresProps {
    icon: React.ElementType,
    title: string,
    content: string

}


export const ValoresCard = ({icon: Icon, title, content}: valoresProps) => {
    return (
        <div className="bg-white pt-14 pb-10 px-8 shadow-lg rounded-2xl relative border border-gray-200 reveal-element delay-100 hover:shadow-2xl transition-all duration-300 group">
            <div className="absolute -top-8 left-8 bg-blue-200 w-16 h-16 flex items-center justify-center rounded-xl shadow-lg group-hover:scale-110 group-hover:bg-orange-500 transition-all duration-300">
                <Icon className="text-white w-8 h-8"/>
            </div>
            <h3 className="font-bold text-[1.25rem] text-blue-200 mb-4 uppercase tracking-tight">
                {title}
            </h3>
            <p className="text-gray-600 text-[0.915rem] leading-relaxed">
                {content}    
            </p>
        </div>
    )
}
