import { Recurso73 } from "../IconosSVG"

interface operamosProps {
  icon: React.ElementType,
  title: string,
  content: string,
  list1: string,
  list2: string
}

export const OperamosCard = ({ icon: Icon, title, content, list1, list2 }: operamosProps) => {
  return (
    <div className="bg-white pt-14 pb-10 px-8 shadow-lg rounded-xl relative border border-gray-100 reveal-element delay-100 hover:shadow-2xl transition-shadow group">
      <div className="absolute -top-6 left-8 bg-blue-200 w-14 h-14 flex items-center justify-center rounded-lg shadow-lg group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7 text-white" />
      </div>

      <div className="mt-2">
        <h3 className="font-bold text-blue-200 text-[1.2rem] md:text-[1.3rem] leading-tight">
          {title}
        </h3>
        <p className="mt-4 text-gray-600 text-[0.95rem] leading-relaxed mb-6">
          {content}
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-2 text-[0.9rem] font-medium text-blue-200">

            <span className="w-5 h-5 text-orange-500 shrink-0">
              <Recurso73 />
            </span>

            {list1}
          </li>
          <li className="flex items-start gap-2 text-[0.9rem] font-medium text-blue-200">

            <span className="w-5 h-5 text-orange-500 shrink-0">
              <Recurso73 />
            </span>

            {list2}
          </li>
        </ul>
      </div>
    </div>
  )
}
