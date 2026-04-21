// IntegCard.tsx
interface inteProps {
    image: string,
    title: string,
    content: string
}

export const IntegCard = ({ image, title, content }: inteProps) => {
    return (
        <div className="bg-white pt-14 pb-10 px-8 shadow-lg rounded-2xl relative border border-gray-200 reveal-element delay-100 hover:shadow-2xl transition-all duration-300 group">
            
            <div className="absolute -top-6 left-8 bg-blue-200 w-14 h-14 flex items-center justify-center rounded-lg shadow-lg group-hover:scale-110 group-hover:bg-orange-500 transition-all duration-300">
                <img className="w-7 h-7  object-contain" src={image} alt={title} />
            </div>
            
           <div className="mt-2 text-white">
                <h3 className="font-bold text-[1.25rem] text-blue-200 mb-4 uppercase tracking-tight">
                    {title}
                </h3>
                <p className="text-gray-600 text-[0.95rem] leading-relaxed">
                    {content}
                </p>
            </div>
        </div>
    )
}