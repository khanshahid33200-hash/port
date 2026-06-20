"use client";

import { useEffect } from "react";

export default function ClientInit() {
  useEffect(() => {
    const handleRejection = (event) => {
      const reason = event.reason;
      if (reason) {
        const isAbortError = 
          reason.name === "AbortError" || 
          reason.message?.includes("aborted") || 
          reason.message?.includes("AbortError") ||
          reason.message?.includes("user aborted");
          
        if (isAbortError) {
          // Suppress the error from bubbling to Next.js development overlay
          event.preventDefault();
          console.log("Suppressed background request cancellation:", reason.message || reason);
        }
      }
    };

    const handleWindowError = (event) => {
      const message = event.message;
      if (message && (message.includes("aborted") || message.includes("AbortError") || message.includes("user aborted"))) {
        event.preventDefault();
        console.log("Suppressed background error warning:", message);
      }
    };

    window.addEventListener("unhandledrejection", handleRejection);
    window.addEventListener("error", handleWindowError);
    
    return () => {
      window.removeEventListener("unhandledrejection", handleRejection);
      window.removeEventListener("error", handleWindowError);
    };
  }, []);

  return null;
}
