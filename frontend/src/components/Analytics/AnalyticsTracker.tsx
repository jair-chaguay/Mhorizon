import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getCookieConsentValue } from "react-cookie-consent";
import { logPageView } from "./analyticsConfig";

export const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const isConsentGiven = getCookieConsentValue("mi_web_consentimiento");
    if (isConsentGiven === "true") {
      logPageView();
    }
  }, [location]);

  return null;
};