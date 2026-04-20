// IntegCard.tsx
interface inteProps {
    image: string,
    title: string,
    content: string
}

export const IntegCard = ({ image, title, content }: inteProps) => {
    return (
        <div className="bg-white pt-14 pb-10 px-8 md:px-10 shadow-lg rounded-xl relative border border-gray-200 reveal-element delay-100 hover:shadow-2xl transition-shadow group">
            
            <div className="absolute -top-6 left-8 bg-orange-500 w-14 h-14 flex items-center justify-center rounded-lg shadow-lg group-hover:scale-110 group-hover:bg-blue-200 transition-all duration-300">
                <img className="w-7 h-7  object-contain" src={image} alt={title} />
            </div>
            
           <div className="mt-2 text-blue-200">
                <h3 className="font-bold text-[1.3rem] md:text-[1.4rem]">
                    {title}
                </h3>
                <p className="mt-4 text-gray-600 text-[1rem] leading-relaxed">
                    {content}
                </p>
            </div>
        </div>
    )
}