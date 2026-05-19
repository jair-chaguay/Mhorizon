import React, {useEffect} from "react";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import { initGA, logPageView } from "./analyticsConfig";

export const CookieBanner: React.FC = () => {
    useEffect(() => {
        const isConsentGiven = getCookieConsentValue("cookie-consent");
        if (isConsentGiven === "true") {
            initGA();
            logPageView();
        }
    }, []);

    const handleAccept = () => {
        initGA();
        logPageView();
        console.log("Cookies aceptadas");
    };

    return (
    <CookieConsent
      location="bottom"
      buttonText="Aceptar todas"
      declineButtonText="Rechazar"
      enableDeclineButton
      cookieName="mi_web_consentimiento"
      style={{ background: "#2B373B", color: "white" }}
      buttonStyle={{ background: "#4caf50", color: "white", fontSize: "14px", borderRadius: "5px" }}
      declineButtonStyle={{ background: "#f44336", color: "white", fontSize: "14px", borderRadius: "5px" }}
      expires={365}
      onAccept={handleAccept}
    >
      Este sitio web utiliza cookies propias y de terceros para optimizar la funcionalidad, analizar el tráfico y mejorar la experiencia del usuario. Al continuar navegando, usted acepta nuestra política de cookies y privacidad.
    </CookieConsent>
  );
}