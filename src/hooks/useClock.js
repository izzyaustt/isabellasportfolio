import { useEffect, useState } from "react";

export function useClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=VT323&family=Space+Mono:wght@400;700&display=swap";

    document.head.appendChild(link);

    const clock = setInterval(() => {
      setNow(new Date());
    }, 1000 * 15);

    return () => {
      clearInterval(clock);

      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}