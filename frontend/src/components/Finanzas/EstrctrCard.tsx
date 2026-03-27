interface estructuraProps{
    icon: React.ElementType, 
    title: string,
    content: string
}


export const EstrctrCard = ({icon: Icon, title, content}: estructuraProps) => {
    return (
        <div className="flex gap-8 group cursor-default items-center">
            <div className="shrink-0 w-16 h-16   
            flex items-center justify-center hover:bg-orange-500  transition-colors 
            duration-300 text-orange-500 hover:text-white
            border-2 rounded-lg hover:border-orange-500">
                <Icon className=" w-10 h-10 cursor-pointer"/>
                
            </div>
            <div>
                <h4 className="text-xl font-bold mb-3 text-white">
                    {title}
                </h4>
                <p className="text-white/90 font-light leading-relaxed max-w-lg">
                    {content}
                </p>
            </div>
        </div>
    )
}
