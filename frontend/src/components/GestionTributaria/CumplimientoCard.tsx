interface cumplimientoProp{
    title: string,
    content: string
}

export const CumplimientoCard = ({title, content}: cumplimientoProp) => {
  return (
    <div className="border-l-4 border-l-orange-500 py-2 px-6 mt-2 bg-gray-800">
        <h3 className="text-blue-200 font-medium text-[1.1rem]">{title}</h3>
        <p className="text-blue-200 font-light mt-1 text-[0.94rem]">{content}</p>
    </div>
  )
}
