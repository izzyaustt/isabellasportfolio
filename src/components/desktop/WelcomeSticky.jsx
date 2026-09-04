import { Pin, Smile, Star } from "lucide-react";

export function WelcomeSticky({ onSayHello }) {
  return (
    <div
      className="w-[260px] p-4 relative"
      style={{
        background: "#FFF6A8",
        boxShadow: "3px 4px 10px rgba(0,0,0,0.35)",
        transform: "rotate(-2deg)",
        fontFamily: "'Space Mono', monospace",
      }}
    >
      <Pin size={17} color="#8A1F1F" className="absolute -top-2 left-1/2 -translate-x-1/2 rotate-45" />
      <div className="flex items-center gap-1 mb-1">
        <Smile size={16} color="#0A246A" />
        <p className="text-[16x] font-bold text-black" style={{ fontFamily: "'VT323', monospace", fontSize: "19px" }}>
          Hi, I'm Isabella!
        </p>
      </div>
      <p className="text-[11.5px] text-black leading-snug mb-2">
        CS student @ UCF, full-stack dev, and enthusiastic sticky-note-writer.
      </p>
      <p className="text-[11px] text-black font-bold flex items-center gap-1 mb-2">
        <Star size={11} color="#0A246A" fill="#0A246A" />
        open to internships &amp; new-grad roles
        <Star size={11} color="#0A246A" fill="#0A246A" />
      </p>
      <button
        onClick={onSayHello}
        className="text-[11px] px-2 py-1 font-bold"
        style={{
          background: "#C0C0C0",
          borderTop: "2px solid #ffffff",
          borderLeft: "2px solid #ffffff",
          borderRight: "2px solid #404040",
          borderBottom: "2px solid #404040",
          color: "#000",
        }}
      >
        say hi →
      </button>
    </div>
  );
}
