interface valoresProps {
    icon: React.ElementType,
    title: string,
    content: string

}


export const ValoresCard = ({icon: Icon, title, content}: valoresProps) => {
    return (
        <div className="group pr-8 lg:border-r border-slate-200 last:border-0 transition-all duration-500
            cursor-pointer">
            <div className="w-16 h-16 bg-gray-800 flex items-center justify-center rounded-xl mb-8 
            group-hover:bg-orange-500 transition-colors duration-500 shadow-sm">
                <Icon className="text-orange-500 group-hover:text-white w-10"/>
            </div>
            <h3 className="font-bold text-xl text-blue-200 mb-4 uppercase tracking-tight">
                {title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
                {content}    
            </p>
        </div>
    )
}
