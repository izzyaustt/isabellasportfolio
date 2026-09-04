import { Terminal, Smile, Star, ArrowRight } from "lucide-react";

const TWINKLES = [
  { top: "10%", left: "10%", size: 15, delay: "0s", color: "#FFFFFF" },
  { top: "18%", left: "85%", size: 12, delay: "0.6s", color: "#FFD65C" },
  { top: "58%", left: "8%", size: 18, delay: "1.1s", color: "#FFFFFF" },
  { top: "80%", left: "90%", size: 14, delay: "1.6s", color: "#FFD65C" },
  { top: "12%", left: "48%", size: 12, delay: "0.3s", color: "#FFFFFF" },
  { top: "52%", left: "92%", size: 16, delay: "0.9s", color: "#FFD65C" },
  { top: "75%", left: "15%", size: 14, delay: "1.4s", color: "#FFFFFF" },
  { top: "32%", left: "22%", size: 18, delay: "0.2s", color: "#FFFFFF" },
  { top: "85%", left: "40%", size: 14, delay: "0.7s", color: "#FFD65C" },
];

export function LandingPage({ onEnter }) {
  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden select-none flex items-center justify-center"
      style={{ background: "#008080", fontFamily: "'Space Mono', monospace" }}
    >
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

      {TWINKLES.map((t, i) => (
        <Star
          key={i}
          size={t.size}
          className="absolute pointer-events-none animate-pulse z-0"
          style={{ top: t.top, left: t.left, animationDelay: t.delay }}
          color={t.color}
          fill={t.color}
        />
      ))}

      {/* Top Ticker Bar */}
      <div
        className="absolute top-0 left-0 right-0 h-6 overflow-hidden z-20 flex items-center"
        style={{ background: "#000", borderBottom: "2px solid #C0C0C0" }}
      >
        <span
          className="whitespace-nowrap text-[14px] inline-block"
          style={{
            fontFamily: "'VT323', monospace",
            color: "#00FF66",
            animation: "marqueeScroll 22s linear infinite",
          }}
        >
          ★ welcome to my webpage! ★ system ready ★ click below to boot desktop environment and learn a little about me ★
        </span>
      </div>

      {/* Centered Retro Window */}
      <div
        className="w-[90%] max-w-[480px] flex flex-col shadow-2xl z-10"
        style={{
          background: "#C0C0C0",
          borderTop: "2px solid #ffffff",
          borderLeft: "2px solid #ffffff",
          borderRight: "2px solid #404040",
          borderBottom: "2px solid #404040",
          outline: "2px solid #000000",
        }}
      >
        {/* Title Bar */}
        <div
          className="flex items-center justify-between px-1.5 py-1 shrink-0"
          style={{
            background: "linear-gradient(90deg, #0A246A 0%, #1084D0 100%)",
          }}
        >
          <div className="flex items-center gap-1.5 pl-1">
            <Terminal size={14} color="#fff" className="shrink-0" />
            <span
              className="text-white truncate text-[15px] leading-none"
              style={{ fontFamily: "'VT323', monospace", letterSpacing: "0.3px" }}
            >
              Welcome.exe — System Shell
            </span>
          </div>
          <div className="flex items-center gap-0.5 shrink-0">
            <div className="w-4 h-4 bg-[#C0C0C0] border-t border-l border-white border-r border-b border-black"></div>
            <div className="w-4 h-4 bg-[#C0C0C0] border-t border-l border-white border-r border-b border-black"></div>
            <div className="w-4 h-4 bg-[#C0C0C0] border-t border-l border-white border-r border-b border-black flex items-center justify-center text-[10px] font-bold">X</div>
          </div>
        </div>

        {/* Menu Bar */}
        <div
          className="flex gap-3 px-2 text-[13px] shrink-0 py-0.5"
          style={{ background: "#C0C0C0", fontFamily: "'Space Mono', monospace", color: "#000" }}
        >
          {["File", "Edit", "View", "Help"].map((m) => (
            <span key={m} className="hover:bg-[#0A246A] hover:text-white px-1 cursor-default">{m}</span>
          ))}
        </div>

        {/* Inner Content Area */}
        <div
          className="flex flex-col items-center text-center p-6 bg-white"
          style={{
            margin: "0 4px 4px 4px",
            borderTop: "2px solid #404040",
            borderLeft: "2px solid #404040",
            borderRight: "2px solid #ffffff",
            borderBottom: "2px solid #ffffff",
          }}
        >
          <div 
            className="w-12 h-12 mb-3 flex items-center justify-center bg-[#FFF6A8]"
            style={{ border: "2px solid #000", boxShadow: "2px 2px 0px #000" }}
          >
            <Smile size={28} color="#0A246A" />
          </div>

          <h1 
            className="text-black mb-2 tracking-wide" 
            style={{ fontFamily: "'VT323', monospace", fontSize: "44px", lineHeight: "1" }}
          >
            Hi, I'm Isabella!
          </h1>

          <p className="text-[12px] text-black mb-5 leading-relaxed max-w-[360px]">
            Senior CS student @ UCF and aspiring full-stack developer. Click below to explore my projects, experience, and interactive desktop environment.
          </p>

          <button
            onClick={onEnter}
            className="w-full py-2.5 px-4 font-bold text-[14px] flex items-center justify-center gap-2 text-black cursor-pointer active:translate-y-[1px]"
            style={{
              background: "#C0C0C0",
              borderTop: "2px solid #ffffff",
              borderLeft: "2px solid #ffffff",
              borderRight: "2px solid #404040",
              borderBottom: "2px solid #404040",
              outline: "2px solid #000000",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            <span>Boot Up My Desktop</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Bottom Taskbar Bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[38px] flex items-center px-1 gap-1 z-20"
        style={{
          background: "#C0C0C0",
          borderTop: "2px solid #ffffff",
        }}
      >
        <button
          className="h-7 px-2 gap-1.5 font-bold text-[14px] flex items-center text-black"
          style={{
            background: "#C0C0C0",
            borderTop: "2px solid #ffffff",
            borderLeft: "2px solid #ffffff",
            borderRight: "2px solid #404040",
            borderBottom: "2px solid #404040",
            outline: "1px solid #000000",
          }}
        >
          <div className="w-4 h-4 grid grid-cols-2 grid-rows-2 gap-[1px]">
            <div style={{ background: "#F5C518" }} />
            <div style={{ background: "#00A651" }} />
            <div style={{ background: "#1084D0" }} />
            <div style={{ background: "#E4002B" }} />
          </div>
          Start
        </button>

        <div className="w-[1px] h-6 mx-1" style={{ background: "#808080", boxShadow: "1px 0 0 #fff" }} />

        <div className="flex-1 flex items-center text-[13px] text-black font-bold px-2">
          <span>ISABELLA-OS v1.0 — Ready</span>
        </div>

        <div
          className="h-7 px-2 flex items-center text-[13px] text-black shrink-0"
          style={{
            borderTop: "1px solid #404040",
            borderLeft: "1px solid #404040",
            borderRight: "1px solid #ffffff",
            borderBottom: "1px solid #ffffff",
          }}
        >
          <span>SYSTEM READY</span>
        </div>
      </div>
    </div>
  );
}