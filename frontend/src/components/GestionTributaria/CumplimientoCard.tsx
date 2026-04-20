// CumplimientoCard.tsx
interface cumplimientoProp {
    title: string,
    content: string
}

export const CumplimientoCard = ({ title, content }: cumplimientoProp) => {
    return (
        <div className="border-l-4 border-l-orange-500 py-6 px-6 bg-white shadow-md rounded-r-lg hover:shadow-xl transition-shadow">
            <h3 className="text-blue-200 text-[1.1rem] font-bold">
                {title}
            </h3>
            <p className="text-gray-500 mt-2 text-[0.95rem] leading-relaxed">
                {content}
            </p>
        </div>
    )
}