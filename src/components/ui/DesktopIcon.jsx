import {
  File as FileIcon, Star
} from "lucide-react";
export function DesktopIcon({ icon: Icon, label, color, onOpen, selected, onSelect, isMobile, badge }) {
  return (
    <button
      onClick={() => (isMobile ? onOpen() : onSelect())}
      onDoubleClick={() => !isMobile && onOpen()}
      className="relative flex flex-col items-center w-[84px] gap-1 py-1 px-1"
      style={{ background: selected ? "rgba(10,36,106,0.35)" : "transparent" }}
    >
      <div className="relative">
        <div
          className="w-10 h-10 flex items-center justify-center"
          style={{ background: color, border: "2px solid rgba(0,0,0,0.25)" }}
        >
          <Icon size={22} color="#fff" />
        </div>
        {badge && (
          <Star
            size={13}
            className="absolute -top-1.5 -right-1.5 animate-pulse"
            color="#FFD65C"
            fill="#FFD65C"
            style={{ filter: "drop-shadow(0 0 1px #000)" }}
          />
        )}
      </div>
      <span
        className="text-white text-center text-[13px] leading-tight px-0.5"
        style={{ fontFamily: "'Space Mono', monospace", textShadow: "1px 1px 1px #000" }}
      >
        {label}
      </span>
    </button>
  );
}