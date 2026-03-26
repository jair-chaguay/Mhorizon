interface estructuraProps{
    icon: React.ElementType, 
    title: string,
    content: string
}


export const EstrctrCard = ({icon: Icon, title, content}: estructuraProps) => {
    return (
        <div className="flex gap-8 group cursor-default">
            <div className="shrink-0 w-16 h-16 rounded-full border border-orange-500 
            flex items-center justify-center hover:bg-orange-500 transition-colors 
            duration-300">
                <Icon className=" text-orange-500 hover:text-white transition-colors 
                duration-300"/>
                
            </div>
            <div>
                <h4 className="text-xl font-bold mb-3 text-white">
                    {title}
                </h4>
                <p className="text-white font-light leading-relaxed max-w-lg">
                    {content}
                </p>
            </div>
        </div>
    )
}
