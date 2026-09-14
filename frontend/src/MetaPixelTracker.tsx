/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const MetaPixelTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap") {
      return;
    }

    // 2. Inyectar e inicializar el script de Meta solo si no existe en la ventana
    if (typeof window !== "undefined" && !(window as any).fbq) {
      (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function () {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions, prefer-spread, prefer-rest-params
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        if (s && s.parentNode) {
            s.parentNode.insertBefore(t, s);
        }
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

      (window as any).fbq('init', '1110467981669073');
    }

    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }
  }, [location]); 

  return null;
};