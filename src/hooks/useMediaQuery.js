import { useState, useEffect } from "react";

export function useMediaQuery(query = "(max-width: 768px)") {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia(query);
    
    const documentChangeHandler = (event) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener("change", documentChangeHandler);
    
    setMatches(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener("change", documentChangeHandler);
    };
  }, [query]);

  return matches;
}