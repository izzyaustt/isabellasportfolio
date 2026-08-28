import { PixelButton } from "./PixelButton";
import { Minus, Square, X } from "lucide-react";



export function WindowFrame({ win, isMobile, isActive, onClose, onMinimize, onFocus, onDragStart, children }) {
  if (win.minimized) return null;
  const style = isMobile
    ? { left: 0, top: 0, width: "100%", height: "calc(100% - 44px)", position: "absolute", zIndex: win.z }
    : { left: win.x, top: win.y, width: win.w, height: win.h, position: "absolute", zIndex: win.z };

  return (
    <div style={style} onMouseDown={onFocus} className="flex flex-col shadow-2xl">
      <div
        style={{
          background: "#C0C0C0",
          borderTop: "2px solid #ffffff",
          borderLeft: "2px solid #ffffff",
          borderRight: "2px solid #404040",
          borderBottom: "2px solid #404040",
        }}
        className="flex flex-col h-full"
      >
        {/* title bar */}
        <div
          onMouseDown={isMobile ? undefined : (e) => onDragStart(e, win.id)}
          className="flex items-center justify-between px-1 py-1 shrink-0"
          style={{
            background: isActive
              ? "linear-gradient(90deg, #0A246A 0%, #1084D0 100%)"
              : "linear-gradient(90deg, #808080 0%, #B5B5B5 100%)",
            cursor: isMobile ? "default" : "grab",
          }}
        >
          <div className="flex items-center gap-1.5 min-w-0 pl-1">
            <win.icon size={14} color="#fff" className="shrink-0" />
            <span
              className="text-white truncate text-[15px] leading-none"
              style={{ fontFamily: "'VT323', monospace", letterSpacing: "0.3px" }}
            >
              {win.title}
            </span>
          </div>
          <div className="flex items-center gap-0.5 shrink-0">
            <PixelButton onClick={(e) => { e.stopPropagation(); onMinimize(win.id); }} className="w-5 h-5">
              <Minus size={11} strokeWidth={3} />
            </PixelButton>
            <PixelButton onClick={(e) => e.stopPropagation()} className="w-5 h-5">
              <Square size={9} strokeWidth={3} />
            </PixelButton>
            <PixelButton onClick={(e) => { e.stopPropagation(); onClose(win.id); }} className="w-5 h-5">
              <X size={12} strokeWidth={3} />
            </PixelButton>
          </div>
        </div>
        {/* menu bar*/}
        <div
          className="flex gap-3 px-2 text-[13px] shrink-0"
          style={{ background: "#C0C0C0", fontFamily: "'Space Mono', monospace", color: "#000" }}
        >
          {["File", "Edit", "View", "Help"].map((m) => (
            <span key={m} className="hover:bg-[#0A246A] hover:text-white px-1 cursor-default">{m}</span>
          ))}
        </div>
        {/* content */}
        <div
          className="flex-1 overflow-auto"
          style={{
            background: "#ffffff",
            margin: "0 4px 4px 4px",
            borderTop: "2px solid #404040",
            borderLeft: "2px solid #404040",
            borderRight: "2px solid #ffffff",
            borderBottom: "2px solid #ffffff",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}