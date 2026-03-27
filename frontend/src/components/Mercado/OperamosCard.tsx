import { Recurso73 } from "../IconosSVG"

interface operamosProps{
    icon: React.ElementType,
    title: string,
    content: string,
    list1: string,
    list2: string
}

export const OperamosCard = ({icon: Icon, title, content, list1, list2}: operamosProps) => {
  return (
    <div className="bg-white p-10 rounded-xl shadow-[0_8px_32px_rgba(25,28,30,0.06)] 
            hover:shadow-[0_16px_48px_rgba(25,28,30,0.12)]">
            <div className="w-12 h-12 bg-gray-800 flex items-center justify-center rounded-lg 
              mb-8 hover:bg-orange-500 hover:text-white transition-colors duration-300 p-2 cursor-pointer">
              <Icon className=""/>
            </div>

            <h3 className="text-xl font-bold mb-4 text-blue-200">
              {title}
            </h3>
            <p className="text-blue-200 font-light text-2sm leading-relaxed mb-6">
              {content}
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-xs font-medium text-blue-200">

                <span className="text-[16px] text-orange-500">
                  <Recurso73/>
                </span>

                {list1}
              </li>
              <li className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                
                <span className="text-[16px] text-orange-500">
                  <Recurso73/>
                </span>

                {list2}
              </li>
            </ul>
          </div>
  )
}
