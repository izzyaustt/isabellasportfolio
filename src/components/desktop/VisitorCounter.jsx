import { useState, useEffect } from "react";
import { Github, Linkedin } from "lucide-react";
import { DesktopIcon } from "../ui/DesktopIcon";

export function VisitorCounter() {
  const [count, setCount] = useState("002026");
  const [selectedSocial, setSelectedSocial] = useState(null);

  useEffect(() => {
    const NAMESPACE = "isabellas-workspace";
    const COUNTER_NAME = "first-counter";

    const updateVisitorCount = async () => {
      try {
        const hasVisited = sessionStorage.getItem("counter_api_visited");
        let endpoint = `https://api.counterapi.dev/v1/${NAMESPACE}/${COUNTER_NAME}`;
        if (!hasVisited) {
          endpoint += "/up";
          sessionStorage.setItem("counter_api_visited", "true");
        }

        const response = await fetch(endpoint);
        if (!response.ok) throw new Error("Failed to fetch visitor count");

        const data = await response.json();
        const currentCount = data.count ?? 2026;
        setCount(currentCount.toString().padStart(6, "0"));
      } catch (error) {
        console.error("Error updating visitor counter:", error);
      }
    };

    updateVisitorCount();
  }, []);

  return (
    <div className="flex flex-col items-end gap-3" onClick={() => setSelectedSocial(null)}>
      <div
        className="px-3 py-2 flex items-center gap-2"
        style={{
          background: "#000",
          border: "2px solid #C0C0C0",
          fontFamily: "'VT323', monospace",
        }}
      >
        <span className="text-[14px]" style={{ color: "#00FF66" }}>YOU ARE VISITOR #</span>
        <span className="flex gap-[2px]">
          {count.split("").map((d, i) => (
            <span
              key={i}
              className="w-[16px] text-center text-[16px] leading-none"
              style={{ background: "#111", color: "#00FF66", fontFamily: "'VT323', monospace" }}
            >
              {d}
            </span>
          ))}
        </span>
      </div>

      {/* Social Links as Desktop Icons */}
      <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
        <DesktopIcon
          icon={Github}
          color="#24292e"
          label="GitHub"
          selected={selectedSocial === "github"}
          onSelect={() => setSelectedSocial("github")}
          onOpen={() => window.open("https://github.com/izzyaustt", "_blank")}
        />
        <DesktopIcon
          icon={Linkedin}
          color="#0a66c2"
          label="LinkedIn"
          selected={selectedSocial === "linkedin"}
          onSelect={() => setSelectedSocial("linkedin")}
          onOpen={() => window.open("https://linkedin.com/in/isabellaaustin", "_blank")}
        />
      </div>
    </div>
  );
}