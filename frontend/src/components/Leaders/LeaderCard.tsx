import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"

interface LeaderProps {
  name: string
  cargo: string
  area?: string 
  email?: string
  urlImg: string
  link: string
}

export const LeaderCard = ({
  name,
  cargo,
  area,
  urlImg,
  email = '',
  link,
}: LeaderProps) => {
  return (
    <div className="group relative flex flex-col sm:flex-row w-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50 overflow-hidden transform hover:-translate-y-1">
      <div className="absolute left-0 top-0 w-1.5 h-full bg-orange-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top z-20"></div>

      <div className="w-full sm:w-[35%] relative min-h-[220px] overflow-hidden bg-gray-100">
        <img 
          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" 
          src={urlImg} 
          alt={name} 
        />
        <div className="absolute inset-0 bg-[#151E28]/10 group-hover:bg-transparent transition-colors duration-500"></div>
      </div>
      
      <div className="w-full sm:w-[65%] p-6 sm:p-8 flex flex-col justify-center relative bg-blue-200 z-10 sm:pl-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-extrabold text-[1.4rem] text-orange-500 tracking-tight group-hover:text-white transition-colors duration-300">
              {name}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="bg-[#151E28] text-white text-[0.7rem] font-bold px-2.5 py-1 rounded shadow-sm flex items-center tracking-widest uppercase">
                {cargo}
              </span>
              {area && (
                <span className="text-gray-400 text-[0.75rem] font-bold uppercase tracking-widest">
                  {area}
                </span>
              )}
            </div>
          </div>
          
          <a 
            className="p-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-[#151E28] hover:text-white transition-all duration-300 shadow-sm border border-gray-100 shrink-0" 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            title={`Perfil de LinkedIn de ${name}`}
          >
            <FontAwesomeIcon className="w-4 h-4" icon={faLinkedinIn} />
          </a>
        </div>

        <hr className="border-gray-500 mb-5 group-hover:border-white transition-colors duration-500" />
        
        <div className="space-y-3.5">
          <a href={`mailto:${email}`} className="flex items-center gap-3 text-[0.85rem] text-gray-200 hover:text-orange-500 transition-colors font-medium">
            <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-orange-50 transition-colors">
              <FontAwesomeIcon className="w-3.5 h-3.5 text-[#151E28] group-hover:text-orange-500 transition-colors" icon={faEnvelope} />
            </div>
            <span className="break-all">{email}</span>
          </a>
        </div>
      </div>
    </div>
  )
}