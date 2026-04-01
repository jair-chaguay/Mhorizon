import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faPhone } from "@fortawesome/free-solid-svg-icons"

interface LeaderProps {
  name: string
  cargo: string
  email?: string
  telf?: string
  urlImg: string
  link: string
}

export const LeaderCard = ({
  name,
  cargo,
  urlImg,
  email = '',
  telf = '',
  link,
}: LeaderProps) => {
  return (
    <div className="flex w-full min-h-35 bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">

      <div className="w-[35%] sm:w-[30%] flex items-center justify-center p-3 sm:p-4 bg-gray-50">
        
        <div className="relative w-full aspect-square rounded-full overflow-hidden shrink-0 shadow-md">
          <img 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            src={urlImg} 
            alt={name} 
          />
          <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/40 pointer-events-none"></div>
        </div>
      </div>

      <div className="flex flex-col justify-center px-5 sm:px-6 py-4 w-[65%] sm:w-[70%] bg-blue-200 text-white relative">
        <h3 className="font-bold text-[1.1rem] text-orange-400">
          {name}
        </h3>

        <p className="text-[0.85rem] text-gray-300 font-light mt-1">
          {cargo}
        </p>
        <div className="mt-3 space-y-1">
          <div className="flex items-center gap-2 text-[0.75rem] sm:text-[0.8rem] text-gray-300">
            <FontAwesomeIcon className="w-3.5 h-3.5 text-orange-500" icon={faEnvelope} />
            <span className="break-all">{email}</span>
          </div>

          <div className="flex items-center gap-2 text-[0.75rem] sm:text-[0.8rem] text-gray-300">
            <FontAwesomeIcon className="w-3.5 h-3.5 text-orange-500" icon={faPhone} />
            <span>{telf}</span>
          </div>
        </div>

        <a
          className="absolute right-4 bottom-4 p-2 rounded-full bg-white/10 hover:bg-orange-500 transition-colors"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon className="w-4 h-4 text-white" icon={faLinkedinIn} />
        </a>
      </div>
    </div>
  )
}