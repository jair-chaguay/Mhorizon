import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faPhone } from "@fortawesome/free-solid-svg-icons"

interface LeaderProps {
    name: string,
    cargo: string,
    email?: string,
    telf?: string,
    urlImg: string
    link: string
}

export const LeaderCard = ({ name, cargo, urlImg, email = '', telf = '', link }: LeaderProps) => {
    return (
        <div className="flex gap-5 p-10 items-center border border-gray-300 rounded-2xl shadow-sm w-full max-w-[440px]">
            <img className="size-20 object-cover object-[50%_20%] rounded-full" src={urlImg} alt={name} />
            <div className="flex flex-col gap-1">
                <h2 className="font-semibold text-[1.25rem] text-cyan-800">{name}</h2>
                <p className="font-light">{cargo}</p>
                <div className="flex gap-2 items-center">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <p className="font-extralight text-[14px]">{email}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <FontAwesomeIcon icon={faPhone} />
                    <p className="font-extralight text-[14px]">{telf}</p>
                </div>
                <a
                    className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 shadow-sm hover:shadow-md transition"
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
            </div>
        </div>
    )
}
