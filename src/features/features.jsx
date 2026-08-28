import { useState } from "react";

import {
  Briefcase,
  ChevronDown,
  ChevronRight,
  Code2,
  Cpu,
  File as FileIcon,
  Folder,
  Github,
  HardDrive,
  Linkedin,
  Send,
  Sparkles,
  Trash2,
} from "lucide-react";

import { BIO } from "../data/bio";
import { EXPERIENCE } from "../data/experience";
import { PROJECTS } from "../data/projects";
import { LANGUAGES, FRAMEWORKS } from "../data/skills";
import { INTERESTS } from "../data/interests";
import { CONTACT } from "../data/contact";

import { PixelButton } from "../components/ui/PixelButton";
import { SectionHeading } from "../components/ui/SectionHeading";
//feature components
export function AboutContent() {
  return (
    <div className="p-4" style={{ fontFamily: "'Space Mono', monospace" }}>
      <pre className="whitespace-pre-wrap text-[13px] leading-relaxed text-black">{BIO}</pre>
    </div>
  );
}

export function SystemContent() {
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

export function ExperienceContent() {
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

export function ProjectsContent() {
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

export function InterestsContent() {
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

export function ContactContent() {
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

export function RecycleBinContent() {
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
