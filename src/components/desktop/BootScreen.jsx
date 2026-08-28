import { useState, useEffect } from "react";

export function BootScreen({ onDone }) {
  const lines = [
    "ISABELLA-OS v1.0 — BOOT UP ........... OK",
    "Loading BIO.SYS ...................... OK",
    "Loading EXPERIENCE.DLL ............... OK",
    "Loading PROJECTS.EXE ................. OK",
    "Mounting SECURE_COMPUTING.MIN ........ OK",
    "Starting PORTFOLIO.EXE  .............. OK",
    "",
    "Welcome, Isabella.",
  ];
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= lines.length) {
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShown((s) => s + 1), 220);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-start justify-start p-6 cursor-pointer"
      style={{ background: "#000" }}
      onClick={onDone}
    >
      <div style={{ fontFamily: "'VT323', monospace" }} className="text-[20px] leading-relaxed" >
        {lines.slice(0, shown).map((l, i) => (
          <div key={i} style={{ color: "#00FF66" }}>{l || "\u00A0"}</div>
        ))}
        <span className="inline-block w-3 h-5 animate-pulse" style={{ background: "#00FF66" }} />
      </div>
      <p
        className="fixed bottom-4 left-6 text-[13px] opacity-60"
        style={{ fontFamily: "'Space Mono', monospace", color: "#00FF66" }}
      >
        click to skip
      </p>
    </div>
  );
}