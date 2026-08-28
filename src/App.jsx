import { useState, useEffect, useRef, useCallback } from "react";
import {
  Monitor, FileText, Briefcase, FolderOpen, Sparkles, Mail, Trash2,
  X, Minus, Square, Github, Linkedin, Shield, ChevronRight, ChevronDown,
  Gamepad2, UtensilsCrossed, Users, Terminal, Code2, Cpu, HardDrive,
  Volume2, Wifi, Folder, File as FileIcon, Send, Star, Pin, Smile
} from "lucide-react";


//static config included window definitions and sparkles
//twinkling stars scattered across the desktop
const TWINKLES = [
  { top: "8%", left: "38%", size: 12, delay: "0s", color: "#FFFFFF" },
  { top: "22%", left: "46%", size: 8, delay: "0.6s", color: "#FFD65C" },
  { top: "62%", left: "40%", size: 10, delay: "1.1s", color: "#FFFFFF" },
  { top: "78%", left: "34%", size: 7, delay: "1.6s", color: "#FFD65C" },
  { top: "14%", left: "58%", size: 9, delay: "0.3s", color: "#FFFFFF" },
  { top: "48%", left: "62%", size: 11, delay: "0.9s", color: "#FFD65C" },
  { top: "68%", left: "58%", size: 7, delay: "1.4s", color: "#FFFFFF" },
  { top: "36%", left: "70%", size: 8, delay: "0.2s", color: "#FFFFFF" },
];

// reusable ui components
import { PixelButton } from "./components/ui/PixelButton";
import { SectionHeading } from "./components/ui/SectionHeading";
import { WindowFrame } from "./components/ui/WindowFrame";
import { DesktopIcon } from "./components/ui/DesktopIcon";


//feature components
import {
  AboutContent,
  SystemContent,
  ExperienceContent,
  ProjectsContent,
  InterestsContent,
  ContactContent,
  RecycleBinContent,
} from "./features/features";

// desktop components
import { WelcomeSticky} from "./components/desktop/WelcomeSticky";
import { VisitorCounter } from "./components/desktop/VisitorCounter";
import { BootScreen } from "./components/desktop/BootScreen";

// ---------- main app ----------

const WINDOW_DEFS = [
  { id: "system", title: "My Computer — Properties", icon: Monitor, color: "#1084D0", w: 460, h: 380, x: 60, y: 40, Content: SystemContent },
  { id: "about", title: "About_Isabella.txt — Notepad", icon: FileText, color: "#F5C518", w: 440, h: 360, x: 130, y: 90, Content: AboutContent },
  { id: "experience", title: "Experience — Explorer", icon: Briefcase, color: "#008080", w: 520, h: 420, x: 180, y: 60, Content: ExperienceContent },
  { id: "projects", title: "My Projects", icon: FolderOpen, color: "#F5C518", w: 560, h: 400, x: 90, y: 110, Content: ProjectsContent, badge: true },
  { id: "interests", title: "Interests — Control Panel", icon: Sparkles, color: "#8A2BE2", w: 460, h: 380, x: 220, y: 130, Content: InterestsContent },
  { id: "contact", title: "New Message — Contact", icon: Mail, color: "#1084D0", w: 460, h: 360, x: 150, y: 70, Content: ContactContent },
  { id: "recyclebin", title: "Recycle Bin", icon: Trash2, color: "#808080", w: 360, h: 260, x: 260, y: 160, Content: RecycleBinContent },
];

export default function IzzyOSPortfolio() {
  const [booted, setBooted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [windows, setWindows] = useState({});
  const [activeId, setActiveId] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [startOpen, setStartOpen] = useState(false);
  const [now, setNow] = useState(new Date());
  const zRef = useRef(10);
  const dragRef = useRef(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=VT323&family=Space+Mono:wght@400;700&display=swap";
    document.head.appendChild(link);

    const check = () => setIsMobile(window.innerWidth < 700);
    check();
    window.addEventListener("resize", check);

    const clock = setInterval(() => setNow(new Date()), 1000 * 15);
    return () => {
      window.removeEventListener("resize", check);
      clearInterval(clock);
      document.head.removeChild(link);
    };
  }, []);

  const openWindow = useCallback((id) => {
    setSelectedIcon(null);
    setStartOpen(false);
    setWindows((prev) => {
      const def = WINDOW_DEFS.find((w) => w.id === id);
      zRef.current += 1;
      if (prev[id]) {
        return { ...prev, [id]: { ...prev[id], minimized: false, z: zRef.current } };
      }
      return {
        ...prev,
        [id]: { id, x: def.x, y: def.y, w: def.w, h: def.h, z: zRef.current, minimized: false },
      };
    });
    setActiveId(id);
  }, []);

  const closeWindow = (id) => {
    setWindows((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    if (activeId === id) setActiveId(null);
  };

  const minimizeWindow = (id) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], minimized: true } }));
    if (activeId === id) setActiveId(null);
  };

  const focusWindow = (id) => {
    zRef.current += 1;
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], minimized: false, z: zRef.current } }));
    setActiveId(id);
  };

  const onDragStart = (e, id) => {
    focusWindow(id);
    const win = windows[id];
    dragRef.current = { id, offsetX: e.clientX - win.x, offsetY: e.clientY - win.y };
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!dragRef.current) return;
      const { id, offsetX, offsetY } = dragRef.current;
      setWindows((prev) => {
        if (!prev[id]) return prev;
        const nx = Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - 100));
        const ny = Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - 80));
        return { ...prev, [id]: { ...prev[id], x: nx, y: ny } };
      });
    };
    const onUp = () => { dragRef.current = null; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  if (!booted) return <BootScreen onDone={() => setBooted(true)} />;

  const openIds = Object.keys(windows);
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden select-none"
      style={{ background: "#008080", fontFamily: "'Space Mono', monospace" }}
      onMouseDown={() => setStartOpen(false)}
    >
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

      {/* marquee ticker */}
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
          ★ thanks for stopping by my desktop ★ open to internships &amp; new-grad roles ★ let's build something together ★ scroll around, click on stuff, have fun ★
        </span>
      </div>

      {/* decorative twinkling stars */}
      {!isMobile && TWINKLES.map((t, i) => (
        <Star
          key={i}
          size={t.size}
          className="absolute pointer-events-none animate-pulse z-0"
          style={{ top: t.top, left: t.left, animationDelay: t.delay }}
          color={t.color}
          fill={t.color}
        />
      ))}

      {/* desktop icons */}
      <div className="absolute top-9 left-2 flex flex-col flex-wrap gap-1 h-[540px] content-start z-10">
        {WINDOW_DEFS.filter((w) => w.id !== "recyclebin").map((w) => (
          <DesktopIcon
            key={w.id}
            icon={w.icon}
            color={w.color}
            label={w.title.split(" — ")[0].replace(".txt", "").replace("My Projects", "Projects")}
            isMobile={isMobile}
            selected={selectedIcon === w.id}
            onSelect={() => setSelectedIcon(w.id)}
            onOpen={() => openWindow(w.id)}
            badge={w.badge}
          />
        ))}
      </div>

      {/* welcome sticky note + visitor counter */}
      {!isMobile && (
        <div className="absolute top-11 right-4 z-10 flex flex-col items-end gap-3">
          <WelcomeSticky onSayHello={() => openWindow("contact")} />
          <VisitorCounter />
        </div>
      )}

      {/* mobile intro banner */}
      {isMobile && (
        <div
          className="absolute top-8 left-1/2 -translate-x-1/2 z-10 w-[92%] px-3 py-2"
          style={{ background: "#FFF6A8", boxShadow: "2px 3px 8px rgba(0,0,0,0.35)" }}
        >
          <p className="text-[17px] font-bold text-black flex items-center gap-1" style={{ fontFamily: "'VT323', monospace" }}>
            <Smile size={16} /> Hi, I'm Isabella!
          </p>
          <p className="text-[11px] text-black font-bold" style={{ fontFamily: "'Space Mono', monospace" }}>
            ★ open to internships &amp; new-grad roles ★
          </p>
        </div>
      )}

      {/* recycle bin */}
      <div className="absolute bottom-14 right-4 z-10">
        <DesktopIcon
          icon={Trash2}
          color="#808080"
          label="Recycle Bin"
          isMobile={isMobile}
          selected={selectedIcon === "recyclebin"}
          onSelect={() => setSelectedIcon("recyclebin")}
          onOpen={() => openWindow("recyclebin")}
        />
      </div>

      {/* windows */}
      {WINDOW_DEFS.map((def) => {
        const win = windows[def.id];
        if (!win) return null;
        return (
          <WindowFrame
            key={def.id}
            win={{ ...win, title: def.title, icon: def.icon }}
            isMobile={isMobile}
            isActive={activeId === def.id}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onFocus={() => focusWindow(def.id)}
            onDragStart={onDragStart}
          >
            <def.Content />
          </WindowFrame>
        );
      })}

      {/* start menu */}
      {startOpen && (
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className="absolute bottom-[38px] left-0 w-56 z-[500]"
          style={{
            background: "#C0C0C0",
            borderTop: "2px solid #ffffff",
            borderLeft: "2px solid #ffffff",
            borderRight: "2px solid #404040",
            borderBottom: "2px solid #404040",
          }}
        >
          <div className="flex">
            <div
              className="w-7 flex items-end justify-center pb-2"
              style={{ background: "linear-gradient(180deg,#0A246A,#1084D0)" }}
            >
              <span
                className="text-white text-[15px] tracking-wider"
                style={{ writingMode: "vertical-rl", fontFamily: "'VT323', monospace" }}
              >
                Isabella-OS 1.0
              </span>
            </div>
            <div className="flex-1 py-1">
              {WINDOW_DEFS.map((w) => (
                <button
                  key={w.id}
                  onClick={() => openWindow(w.id)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-[13px] text-black hover:bg-[#0A246A] hover:text-white"
                >
                  <w.icon size={15} />
                  {w.title.split(" — ")[0].replace(".txt", "")}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* taskbar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[38px] flex items-center px-1 gap-1 z-[400]"
        style={{
          background: "#C0C0C0",
          borderTop: "2px solid #ffffff",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <PixelButton
          onClick={() => setStartOpen((s) => !s)}
          active={startOpen}
          className="h-7 px-2 gap-1.5 font-bold text-[14px]"
        >
          <div className="w-4 h-4 grid grid-cols-2 grid-rows-2 gap-[1px]">
            <div style={{ background: "#F5C518" }} />
            <div style={{ background: "#00A651" }} />
            <div style={{ background: "#1084D0" }} />
            <div style={{ background: "#E4002B" }} />
          </div>
          Start
        </PixelButton>

        <div className="w-[1px] h-6 mx-1" style={{ background: "#808080", boxShadow: "1px 0 0 #fff" }} />

        <div className="flex-1 flex items-center gap-1 overflow-x-auto">
          {openIds.map((id) => {
            const def = WINDOW_DEFS.find((w) => w.id === id);
            return (
              <PixelButton
                key={id}
                onClick={() => (windows[id].minimized || activeId !== id ? focusWindow(id) : minimizeWindow(id))}
                active={activeId === id && !windows[id].minimized}
                className="h-7 px-2 gap-1.5 text-[13px] shrink-0 max-w-[140px]"
              >
                <def.icon size={13} />
                <span className="truncate">{def.title.split(" — ")[0]}</span>
              </PixelButton>
            );
          })}
        </div>

        <div
          className="h-7 px-2 flex items-center gap-2 text-[13px] text-black shrink-0"
          style={{
            borderTop: "1px solid #404040",
            borderLeft: "1px solid #404040",
            borderRight: "1px solid #ffffff",
            borderBottom: "1px solid #ffffff",
          }}
        >
          <Volume2 size={13} />
          <Wifi size={13} />
          <span>{timeStr}</span>
        </div>
      </div>
    </div>
  );
}
