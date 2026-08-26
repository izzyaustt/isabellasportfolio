import { useState, useEffect, useRef, useCallback } from "react";
import {
  Monitor, FileText, Briefcase, FolderOpen, Sparkles, Mail, Trash2,
  X, Minus, Square, Github, Linkedin, Shield, ChevronRight, ChevronDown,
  Gamepad2, UtensilsCrossed, Users, Terminal, Code2, Cpu, HardDrive,
  Volume2, Wifi, Folder, File as FileIcon, Send, Star, Pin, Smile
} from "lucide-react";

import { BIO } from "./data/bio";
import { EXPERIENCE } from "./data/experience";
import { PROJECTS } from "./data/projects";
import { LANGUAGES, FRAMEWORKS } from "./data/skills";
import { INTERESTS } from "./data/interests";
import { CONTACT } from "./data/contact";


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
const PixelButton = ({ children, onClick, className = "", title, active = false }) => (
  <button
    onClick={onClick}
    title={title}
    className={`select-none flex items-center justify-center ${className}`}
    style={{
      background: active ? "#A6CAF0" : "#C0C0C0",
      borderTop: `2px solid ${active ? "#404040" : "#ffffff"}`,
      borderLeft: `2px solid ${active ? "#404040" : "#ffffff"}`,
      borderRight: `2px solid ${active ? "#ffffff" : "#404040"}`,
      borderBottom: `2px solid ${active ? "#ffffff" : "#404040"}`,
      color: "#000",
      fontFamily: "'Space Mono', monospace",
    }}
  >
    {children}
  </button>
);

// ---------- window chrome ----------

function WindowFrame({ win, isMobile, isActive, onClose, onMinimize, onFocus, onDragStart, children }) {
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

// ---------- window content components ----------

function SectionHeading({ children, icon: Icon }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      {Icon && <Icon size={18} color="#0A246A" />}
      <h2
        className="text-[22px] leading-none"
        style={{ fontFamily: "'VT323', monospace", color: "#0A246A" }}
      >
        {children}
      </h2>
    </div>
  );
}

//feature components
function AboutContent() {
  return (
    <div className="p-4" style={{ fontFamily: "'Space Mono', monospace" }}>
      <pre className="whitespace-pre-wrap text-[13px] leading-relaxed text-black">{BIO}</pre>
    </div>
  );
}

function SystemContent() {
  return (
    <div className="p-4" style={{ fontFamily: "'Space Mono', monospace" }}>
      <div className="flex gap-4 items-start mb-4 pb-4" style={{ borderBottom: "1px solid #C0C0C0" }}>
        <div
          className="w-16 h-16 flex items-center justify-center shrink-0"
          style={{ background: "#008080" }}
        >
          <Cpu size={34} color="#00FF66" />
        </div>
        <div>
          <p className="text-[16px] font-bold text-black">Isabella Austin</p>
          <p className="text-[13px] text-black">B.S. Computer Science — Minor, Secure Computing &amp; Networking</p>
          <p className="text-[13px] text-black">University of Central Florida · Aug 2023 – May 2027</p>
          <p className="text-[13px] text-black">Dean's List — GPA: 3.8</p>
        </div>
      </div>

      <SectionHeading icon={HardDrive}>Device Manager</SectionHeading>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-[14px] font-bold mb-1 text-black flex items-center gap-1">
            <ChevronDown size={14} /> Languages
          </p>
          <ul className="ml-5">
            {LANGUAGES.map((l) => (
              <li key={l} className="text-[13px] text-black flex items-center gap-2 py-0.5">
                <Cpu size={12} color="#008080" /> {l}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[14px] font-bold mb-1 text-black flex items-center gap-1">
            <ChevronDown size={14} /> Frameworks
          </p>
          <ul className="ml-5">
            {FRAMEWORKS.map((f) => (
              <li key={f} className="text-[13px] text-black flex items-center gap-2 py-0.5">
                <HardDrive size={12} color="#008080" /> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ExperienceContent() {
  const [openId, setOpenId] = useState(EXPERIENCE[0].id);
  return (
    <div style={{ fontFamily: "'Space Mono', monospace" }}>
      <div className="grid grid-cols-[1fr_auto_auto] gap-2 px-3 py-1.5 text-[12px] font-bold text-black" style={{ background: "#C0C0C0" }}>
        <span>Name</span>
        <span className="hidden sm:block">Type</span>
        <span>Date modified</span>
      </div>
      {EXPERIENCE.map((job) => (
        <div key={job.id} style={{ borderBottom: "1px solid #E0E0E0" }}>
          <button
            onClick={() => setOpenId(openId === job.id ? null : job.id)}
            className="w-full grid grid-cols-[1fr_auto_auto] gap-2 px-3 py-2 items-center text-left hover:bg-[#0A246A] hover:text-white group"
          >
            <span className="flex items-center gap-2 text-[13px] min-w-0">
              <Briefcase size={14} className="shrink-0" />
              <span className="truncate">{job.title} — {job.org}</span>
            </span>
            <span className="hidden sm:block text-[12px] opacity-80">{job.type}</span>
            <span className="text-[12px] opacity-80 flex items-center gap-1">
              {job.date}
              {openId === job.id ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
            </span>
          </button>
          {openId === job.id && (
            <div className="px-4 pb-3 pt-1">
              <p className="text-[12px] text-black mb-2">{job.location}</p>
              <ul className="space-y-1.5">
                {job.bullets.map((b, i) => (
                  <li key={i} className="text-[13px] text-black flex gap-2">
                    <span style={{ color: "#008080" }}>›</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ProjectsContent() {
  const [selected, setSelected] = useState(PROJECTS[0].id);
  const project = PROJECTS.find((p) => p.id === selected);
  return (
    <div className="flex h-full flex-col sm:flex-row" style={{ fontFamily: "'Space Mono', monospace" }}>
      <div
        className="sm:w-48 shrink-0 p-2"
        style={{ background: "#F5F5F5", borderRight: "1px solid #C0C0C0" }}
      >
        <p className="text-[12px] font-bold text-black mb-1 flex items-center gap-1">
          <Folder size={13} color="#F5C518" fill="#F5C518" /> My Projects
        </p>
        {PROJECTS.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p.id)}
            className={`w-full text-left flex items-center gap-2 px-2 py-1 ml-2 text-[13px] ${selected === p.id ? "text-white" : "text-black"}`}
            style={{ background: selected === p.id ? "#0A246A" : "transparent" }}
          >
            <FileIcon size={13} /> {p.name}
          </button>
        ))}
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <div className="flex items-center gap-2 mb-1">
          <Code2 size={18} color="#0A246A" />
          <h3 className="text-[20px]" style={{ fontFamily: "'VT323', monospace", color: "#0A246A" }}>{project.name}</h3>
        </div>
        <p className="text-[12px] text-black mb-3">{project.tech} · {project.date}</p>
        <ul className="space-y-2">
          {project.desc.map((d, i) => (
            <li key={i} className="text-[13px] text-black flex gap-2">
              <span style={{ color: "#008080" }}>›</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function InterestsContent() {
  const [open, setOpen] = useState(null);
  return (
    <div className="p-4" style={{ fontFamily: "'Space Mono', monospace" }}>
      <SectionHeading icon={Sparkles}>Control Panel</SectionHeading>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {INTERESTS.map((it) => {
          const Icon = it.icon;
          const isOpen = open === it.id;
          return (
            <button
              key={it.id}
              onClick={() => setOpen(isOpen ? null : it.id)}
              className="flex flex-col items-center gap-1 p-3"
              style={{
                background: isOpen ? "#DCE9F9" : "#F5F5F5",
                border: "1px solid #C0C0C0",
              }}
            >
              <Icon size={26} color="#0A246A" />
              <span className="text-[12px] text-black text-center leading-tight">{it.label}</span>
            </button>
          );
        })}
      </div>
      {open && (
        <p className="text-[13px] text-black mt-4 p-3" style={{ background: "#F5F5F5", border: "1px solid #C0C0C0" }}>
          {INTERESTS.find((i) => i.id === open).note}
        </p>
      )}
    </div>
  );
}

function ContactContent() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const mailtoHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div style={{ fontFamily: "'Space Mono', monospace" }}>
      <div className="p-3 space-y-2" style={{ borderBottom: "1px solid #C0C0C0" }}>
        <div className="flex items-center gap-2 text-[13px]">
          <span className="w-14 text-black font-bold shrink-0">To:</span>
          <span className="text-black">{CONTACT.email}</span>
        </div>
        <div className="flex items-center gap-2 text-[13px]">
          <span className="w-14 text-black font-bold shrink-0">Subject:</span>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Let's build something"
            className="flex-1 text-[13px] px-1 py-0.5 outline-none text-black"
            style={{ border: "1px solid #808080" }}
          />
        </div>
      </div>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Type your message..."
        rows={6}
        className="w-full p-3 text-[13px] outline-none text-black resize-none"
      />
      <div className="p-3 flex flex-wrap items-center gap-2" style={{ borderTop: "1px solid #C0C0C0" }}>
        <a href={mailtoHref}>
          <PixelButton className="px-3 py-1.5 gap-1.5 text-[13px]">
            <Send size={13} /> Send
          </PixelButton>
        </a>
        <a href={`tel:${CONTACT.phone}`} className="text-[12px] text-black underline decoration-dotted">
          {CONTACT.phone}
        </a>
        <a
          href={`https://${CONTACT.linkedin}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-[12px]"
          style={{ color: "#0000EE" }}
        >
          <Linkedin size={13} /> {CONTACT.linkedin}
        </a>
        <a
          href={`https://${CONTACT.github}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-[12px]"
          style={{ color: "#0000EE" }}
        >
          <Github size={13} /> {CONTACT.github}
        </a>
      </div>
    </div>
  );
}

function RecycleBinContent() {
  return (
    <div className="p-6 flex flex-col items-center justify-center h-full text-center" style={{ fontFamily: "'Space Mono', monospace" }}>
      <Trash2 size={40} color="#808080" />
      <p className="text-[14px] text-black mt-3 font-bold">Recycle Bin is empty.</p>
      <p className="text-[12px] text-black mt-1 opacity-70 max-w-xs">
        No deleted files here — just a few late-night bugs that got squashed on the way to shipping.
      </p>
    </div>
  );
}

// ---------- desktop icon ----------

function DesktopIcon({ icon: Icon, label, color, onOpen, selected, onSelect, isMobile, badge }) {
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

// ---------- welcome sticky note ----------

function WelcomeSticky({ onSayHello }) {
  return (
    <div
      className="w-[220px] p-3 relative"
      style={{
        background: "#FFF6A8",
        boxShadow: "3px 4px 10px rgba(0,0,0,0.35)",
        transform: "rotate(-2deg)",
        fontFamily: "'Space Mono', monospace",
      }}
    >
      <Pin size={16} color="#8A1F1F" className="absolute -top-2 left-1/2 -translate-x-1/2 rotate-45" />
      <div className="flex items-center gap-1 mb-1">
        <Smile size={16} color="#0A246A" />
        <p className="text-[15px] font-bold text-black" style={{ fontFamily: "'VT323', monospace", fontSize: "19px" }}>
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

// ---------- visitor counter (hardcoded for now) ----------

function VisitorCounter() {
  return (
    <div
      className="px-2 py-1.5 flex items-center gap-2"
      style={{
        background: "#000",
        border: "2px solid #C0C0C0",
        fontFamily: "'VT323', monospace",
      }}
    >
      <span className="text-[12px]" style={{ color: "#00FF66" }}>YOU ARE VISITOR #</span>
      <span className="flex gap-[2px]">
        {"004217".split("").map((d, i) => (
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
  );
}

// ---------- boot screen ----------

function BootScreen({ onDone }) {
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
                IZZY-OS 1.0
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
