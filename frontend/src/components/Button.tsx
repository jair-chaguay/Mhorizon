import { useState } from "react";
import { ContactModal } from "./ContactModal";

interface BotonAgendarProps {
  texto?: string;
  estilosPersonalizados?: string;
}

export const Button = ({ texto = "AGENDAR SESIÓN ESTRATÉGICA",  estilosPersonalizados = "" }: BotonAgendarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (

    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={estilosPersonalizados}
      >
        {texto}
      </button>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
