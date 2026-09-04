import { useState } from "react";

import {
  Briefcase,
  ChevronDown,
  ChevronRight,
  Code2,
  File as FileIcon,
  Folder,
  Github,
  HardDrive,
  Linkedin,
  Send,
  Sparkles,
  Trash2,
  FolderGit2,
} from "lucide-react";

import { BIO } from "../data/bio";
import { EXPERIENCE } from "../data/experience";
import { PROJECTS } from "../data/projects";
import { LANGUAGES, FRAMEWORKS } from "../data/skills";
import { INTERESTS } from "../data/interests";
import { CONTACT } from "../data/contact";

import { PixelButton } from "../components/ui/PixelButton";
import { SectionHeading } from "../components/ui/SectionHeading";

// Feature components
export function AboutContent() {
  const [activeTab, setActiveTab] = useState("overview");

  const bioTabs = {
    overview: {
      title: "Overview.txt",
      content: BIO,
    },
    background: {
      title: "Background.log",
      content: "I was born and raised in South Florida. I started learning how to code in my senior year of high school, and felt like it was too late to turn it into a career. Despite this, I followed my heart and decided to pursue it in college. Now, three years and three internships later, I feel far more assured in my skills and my place in this field. I'm excited to enter the professional world after graduation!",
    },
    philosophy: {
      title: "Ethos.sys",
      content: "A huge part of my college experience has been Girls Who Code at UCF. I started out as a quiet general member and eventually worked my way onto the executive board. Imposter syndrome is real, and for a long time I wondered if I actually fit in tech. GWC completely changed that for me, it showed me I don't just belong in this industry, I deserve to take up space.",
    },
  };

  return (
    <div className="flex flex-col h-full p-2" style={{ fontFamily: "'Space Mono', monospace" }}>
      {/* Retro Windows Property Tabs */}
      <div className="flex gap-1 border-b border-[#808080] px-2 pt-1 bg-[#ECE9D8]">
        {Object.entries(bioTabs).map(([tab, data]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 text-[12px] font-bold rounded-t-sm border-t border-x ${
              activeTab === tab
                ? "bg-white text-black border-[#808080] -mb-[1px] z-10 shadow-sm"
                : "bg-[#DFDCE3] text-[#666] border-transparent hover:bg-[#EAE6EE]"
            }`}
          >
            {data.title}
          </button>
        ))}
      </div>

      {/* Tab Body */}
      <div className="flex-1 bg-white border border-[#808080] p-4 shadow-inner overflow-y-auto">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-dashed border-[#C0C0C0]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#008080]" />
          <span className="text-[12px] font-bold text-[#008080] uppercase tracking-wider">
            {activeTab}
          </span>
        </div>
        <pre className="whitespace-pre-wrap text-[13px] leading-relaxed text-black font-sans">
          {bioTabs[activeTab]?.content}
        </pre>
      </div>
    </div>
  );
}

export function SystemContent() {
  return (
    <div className="p-4" style={{ fontFamily: "'Space Mono', monospace" }}>
      <div className="flex gap-4 items-start mb-4 pb-4" style={{ borderBottom: "1px solid #C0C0C0" }}>
        {/* ASCII Cat System Icon */}
        <div
          className="w-16 h-16 flex flex-col items-center justify-center shrink-0 shadow-sm"
          style={{ background: "#008080", border: "2px solid #004D4D" }}
        >
          <pre className="text-[10px] leading-tight font-bold text-[#00FF66] select-none m-0 p-0 bg-transparent">
{` /\\_/\\
( o.o )
 > ^ <`}
          </pre>
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
                <span className="w-1.5 h-1.5 bg-[#008080]" /> {l}
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
  const [selectedId, setSelectedId] = useState(null);
  const accents = ["#008080", "#0A246A", "#7B1FA2", "#C2185B", "#E65100", "#2E7D32"];

  const selectedExp = EXPERIENCE.find((e) => e.id === selectedId || e.role === selectedId || e.company === selectedId);

  if (selectedExp) {
    const idx = EXPERIENCE.findIndex((e) => e === selectedExp);
    const accentColor = accents[idx % accents.length];
    const Icon = selectedExp.icon || Briefcase;

    const roleTitle = selectedExp.role || selectedExp.title || selectedExp.position || "Experience";
    const companyName = selectedExp.company || selectedExp.organization || selectedExp.employer || "";
    const periodText = selectedExp.period || selectedExp.date || selectedExp.duration || "";
    
    const rawDetails = selectedExp.details || selectedExp.description || selectedExp.summary || selectedExp.bullets || [];
    const detailsList = Array.isArray(rawDetails) ? rawDetails : [rawDetails];

    return (
      <div className="flex flex-col h-full p-4 bg-white overflow-hidden" style={{ fontFamily: "'Space Mono', monospace" }}>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#C0C0C0] shrink-0">
          <button
            onClick={() => setSelectedId(null)}
            className="px-2.5 py-1 text-[11px] font-bold text-black cursor-pointer inline-flex items-center gap-1 shadow-sm active:translate-y-0.5 whitespace-nowrap"
            style={{
              backgroundColor: "#EBEBEB",
              border: "1px solid #000000",
              boxShadow: "inset 1px 1px #FFFFFF, inset -1px -1px #808080"
            }}
          >
            ← Back
          </button>
          <span className="text-[12px] font-bold tracking-wider uppercase truncate ml-2" style={{ color: accentColor }}>
            {roleTitle} {companyName ? `@ ${companyName}` : ""}
          </span>
        </div>

        <div 
          className="flex-1 bg-white p-6 shadow-inner flex flex-col items-center justify-start overflow-y-auto text-center"
          style={{ border: "1px solid #000000", boxShadow: "inset 1px 1px #808080, inset -1px -1px #FFFFFF" }}
        >
          <div 
            className="w-14 h-14 shrink-0 flex items-center justify-center rounded-xl mb-3 shadow-sm mt-2"
            style={{ 
              background: `${accentColor}12`, 
              border: `2px solid ${accentColor}`,
              color: accentColor 
            }}
          >
            <Icon size={28} />
          </div>
          
          <h3 className="text-[18px] font-bold mb-1 tracking-wide shrink-0" style={{ color: accentColor }}>
            {roleTitle}
          </h3>
          {companyName && <p className="text-[13px] font-bold text-black mb-1">{companyName}</p>}
          {periodText && <p className="text-[11px] text-gray-600 mb-4">{periodText}</p>}
          
          <div className="text-[13px] text-black max-w-lg leading-relaxed bg-[#FAFAFA] p-4 rounded border border-[#C0C0C0] text-left space-y-2 w-full">
            {detailsList.map((point, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-[10px] mt-1 shrink-0" style={{ color: accentColor }}>■</span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 h-full overflow-y-auto bg-white" style={{ fontFamily: "'Space Mono', monospace" }}>
      <SectionHeading icon={Briefcase}>Professional Experience</SectionHeading>
      
      <div className="space-y-3.5 mt-4">
        {EXPERIENCE.map((exp, idx) => {
          const Icon = exp.icon || Briefcase;
          const accentColor = accents[idx % accents.length];
          const identifier = exp.id || exp.role || exp.company;

          const roleTitle = exp.role || exp.title || exp.position || "Experience";
          const companyName = exp.company || exp.organization || exp.employer || "";
          const periodText = exp.period || exp.date || exp.duration || "";
          
          const rawDetails = exp.details || exp.description || exp.summary || exp.bullets || [];
          const snippet = Array.isArray(rawDetails) ? rawDetails[0] : (rawDetails || "Click to view full experience details.");

          return (
            <div
              key={identifier || idx}
              onClick={() => setSelectedId(identifier)}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 transition-all relative group cursor-pointer hover:-translate-y-0.5 w-full gap-3"
              style={{
                backgroundColor: "#EBEBEB",
                border: "1px solid #000000",
                boxShadow: "inset 1px 1px #FFFFFF, inset -1px -1px #808080"
              }}
            >
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                <div 
                  className="w-10 h-10 shrink-0 flex items-center justify-center rounded bg-white shadow-sm mt-0.5"
                  style={{ border: `1px solid ${accentColor}`, color: accentColor }}
                >
                  <Icon size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-[13px] font-bold text-black group-hover:underline">
                    {roleTitle} {companyName ? <span className="font-normal text-gray-700">@ {companyName}</span> : ""}
                  </h4>
                  {periodText && <p className="text-[11px] text-gray-500 mt-0.5">{periodText}</p>}
                  <p className="text-[12px] text-black mt-1 leading-relaxed line-clamp-2">
                    {snippet}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#C0C0C0]">
                <span className="text-[11px] font-bold" style={{ color: accentColor }}>View →</span>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: accentColor, border: "1px solid #000" }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ProjectsContent() {
  const [selectedId, setSelectedId] = useState(null);
  const accents = ["#008080", "#0A246A", "#7B1FA2", "#C2185B", "#E65100", "#2E7D32"];

  const selectedProject = PROJECTS.find((p) => p.id === selectedId || p.title === selectedId);

  if (selectedProject) {
    const idx = PROJECTS.findIndex((p) => p === selectedProject);
    const accentColor = accents[idx % accents.length];
    const Icon = selectedProject.icon || FolderGit2;

    const rawTech = selectedProject.tech || selectedProject.stack || selectedProject.technologies;
    const techItems = Array.isArray(rawTech)
      ? rawTech
      : typeof rawTech === "string"
      ? rawTech.split(",").map((t) => t.trim())
      : [];

    const rawDesc = selectedProject.description || selectedProject.summary || selectedProject.desc || selectedProject.details || selectedProject.overview || selectedProject.content;
    const descriptionText = Array.isArray(rawDesc) ? rawDesc.join(" ") : (rawDesc || "No description provided.");

    return (
      <div className="flex flex-col h-full p-4 bg-white overflow-hidden" style={{ fontFamily: "'Space Mono', monospace" }}>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#C0C0C0] shrink-0">
          <button
            onClick={() => setSelectedId(null)}
            className="px-2.5 py-1 text-[11px] font-bold text-black cursor-pointer inline-flex items-center gap-1 shadow-sm active:translate-y-0.5 whitespace-nowrap"
            style={{
              backgroundColor: "#EBEBEB",
              border: "1px solid #000000",
              boxShadow: "inset 1px 1px #FFFFFF, inset -1px -1px #808080"
            }}
          >
            ← Back
          </button>
          <span className="text-[12px] font-bold tracking-wider uppercase truncate ml-2" style={{ color: accentColor }}>
            {selectedProject.title || selectedProject.name}
          </span>
        </div>

        <div 
          className="flex-1 bg-white p-6 shadow-inner flex flex-col items-center justify-start overflow-y-auto text-center"
          style={{ border: "1px solid #000000", boxShadow: "inset 1px 1px #808080, inset -1px -1px #FFFFFF" }}
        >
          <div 
            className="w-14 h-14 shrink-0 flex items-center justify-center rounded-xl mb-3 shadow-sm mt-2"
            style={{ 
              background: `${accentColor}12`, 
              border: `2px solid ${accentColor}`,
              color: accentColor 
            }}
          >
            <Icon size={28} />
          </div>
          
          <h3 className="text-[18px] font-bold mb-2 tracking-wide shrink-0" style={{ color: accentColor }}>
            {selectedProject.title || selectedProject.name}
          </h3>
          
          {techItems.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1.5 mb-4">
              {techItems.map((t) => (
                <span key={t} className="text-[11px] px-2 py-0.5 bg-[#EBEBEB] border border-[#808080] text-black">
                  {t}
                </span>
              ))}
            </div>
          )}

          <p className="text-[13px] text-black max-w-md leading-relaxed bg-[#FAFAFA] p-4 rounded border border-[#C0C0C0] mb-4">
            {descriptionText}
          </p>

          <div className="flex gap-3 mt-auto">
            {selectedProject.github && (
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 text-[12px] font-bold text-black bg-[#EBEBEB] border border-[#000000] shadow-sm hover:bg-[#DFDCE3]"
                style={{ boxShadow: "inset 1px 1px #FFFFFF, inset -1px -1px #808080" }}
              >
                GitHub Repo
              </a>
            )}
            {selectedProject.live && (
              <a
                href={selectedProject.live}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 text-[12px] font-bold text-white bg-[#0A246A] border border-[#000000] shadow-sm"
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 h-full overflow-y-auto bg-white" style={{ fontFamily: "'Space Mono', monospace" }}>
      <SectionHeading icon={FolderGit2}>Projects Directory</SectionHeading>
      
      <div className="space-y-3.5 mt-4">
        {PROJECTS.map((p, idx) => {
          const Icon = p.icon || FolderGit2;
          const accentColor = accents[idx % accents.length];
          const identifier = p.id || p.title;

          const rawDesc = p.description || p.summary || p.desc || p.details || p.overview || p.content;
          const descriptionText = Array.isArray(rawDesc) ? rawDesc.join(" ") : (rawDesc || "Click to view project details.");

          return (
            <div
              key={identifier || idx}
              onClick={() => setSelectedId(identifier)}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 transition-all relative group cursor-pointer hover:-translate-y-0.5 w-full gap-3"
              style={{
                backgroundColor: "#EBEBEB",
                border: "1px solid #000000",
                boxShadow: "inset 1px 1px #FFFFFF, inset -1px -1px #808080"
              }}
            >
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                <div 
                  className="w-10 h-10 shrink-0 flex items-center justify-center rounded bg-white shadow-sm mt-0.5"
                  style={{ border: `1px solid ${accentColor}`, color: accentColor }}
                >
                  <Icon size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-[13px] font-bold text-black group-hover:underline">{p.title || p.name}</h4>
                  <p className="text-[12px] text-black mt-1 leading-relaxed">
                    {descriptionText}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#C0C0C0]">
                <span className="text-[11px] font-bold" style={{ color: accentColor }}>View →</span>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: accentColor, border: "1px solid #000" }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function InterestsContent() {
  const [selectedId, setSelectedId] = useState(null);
  const selectedItem = INTERESTS.find((i) => i.id === selectedId);
  const accents = ["#008080", "#0A246A", "#7B1FA2", "#C2185B", "#E65100", "#2E7D32"];

  if (selectedItem) {
    const idx = INTERESTS.findIndex((i) => i.id === selectedId);
    const accentColor = accents[idx % accents.length];
    const Icon = selectedItem.icon;

    return (
      <div className="flex flex-col h-full p-4 bg-white overflow-hidden" style={{ fontFamily: "'Space Mono', monospace" }}>
        {/* Retro Windows Toolbar */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#C0C0C0] shrink-0">
          <button
            onClick={() => setSelectedId(null)}
            className="px-2.5 py-1 text-[11px] font-bold text-black cursor-pointer inline-flex items-center gap-1 shadow-sm active:translate-y-0.5 whitespace-nowrap"
            style={{
              backgroundColor: "#EBEBEB",
              border: "1px solid #000000",
              boxShadow: "inset 1px 1px #FFFFFF, inset -1px -1px #808080"
            }}
          >
            ← Back
          </button>
          <span className="text-[12px] font-bold tracking-wider uppercase truncate ml-2" style={{ color: accentColor }}>
            {selectedItem.label}
          </span>
        </div>

        {/* Scrollable Detail View */}
        <div 
          className="flex-1 bg-white p-6 shadow-inner flex flex-col items-center justify-start overflow-y-auto text-center"
          style={{ border: "1px solid #000000", boxShadow: "inset 1px 1px #808080, inset -1px -1px #FFFFFF" }}
        >
          <div 
            className="w-14 h-14 shrink-0 flex items-center justify-center rounded-xl mb-3 shadow-sm mt-2"
            style={{ 
              background: `${accentColor}12`, 
              border: `2px solid ${accentColor}`,
              color: accentColor 
            }}
          >
            <Icon size={28} />
          </div>
          
          <h3 className="text-[18px] font-bold mb-3 tracking-wide shrink-0" style={{ color: accentColor }}>
            {selectedItem.label}
          </h3>
          
          <p className="text-[13px] text-black max-w-md leading-relaxed bg-[#FAFAFA] p-4 rounded border border-[#C0C0C0] mb-4">
            {selectedItem.note}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 h-full overflow-y-auto bg-white" style={{ fontFamily: "'Space Mono', monospace" }}>
      <SectionHeading icon={Sparkles}>Control Panel</SectionHeading>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
        {INTERESTS.map((it, idx) => {
          const Icon = it.icon;
          const accentColor = accents[idx % accents.length];

          return (
            <button
              key={it.id}
              onClick={() => setSelectedId(it.id)}
              className="flex flex-col items-center justify-center gap-2.5 p-4 transition-all relative group cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              style={{
                backgroundColor: "#EBEBEB",
                border: "1px solid #000000",
                boxShadow: "inset 1px 1px #FFFFFF, inset -1px -1px #808080"
              }}
            >
              <div 
                className="w-12 h-12 flex items-center justify-center rounded transition-transform group-hover:scale-110 shadow-sm bg-white"
                style={{ 
                  border: `1px solid ${accentColor}`,
                  color: accentColor 
                }}
              >
                <Icon size={24} />
              </div>
              <span className="text-[12px] font-bold text-black text-center leading-tight">
                {it.label}
              </span>
              <div 
                className="absolute top-2 right-2 w-2 h-2 rounded-full shadow-inner"
                style={{ background: accentColor, border: "1px solid #000" }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}


export function ContactContent() {
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!body) return;
    
    setStatus("sending");
    
    try {
      const response = await fetch("https://formspree.io/f/meozoaqe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: senderEmail,
          subject,
          message: body,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setSenderEmail("");
        setSubject("");
        setBody("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div style={{ fontFamily: "'Space Mono', monospace" }}>
      <form onSubmit={handleSend}>
        <div className="p-3 space-y-2" style={{ borderBottom: "1px solid #C0C0C0" }}>
          <div className="flex items-center gap-2 text-[13px]">
            <span className="w-14 text-black font-bold shrink-0">To:</span>
            <span className="text-black">{CONTACT.email}</span>
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <span className="w-14 text-black font-bold shrink-0">From:</span>
            <input
              type="email"
              required
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              placeholder="your.email@domain.com"
              className="flex-1 text-[13px] px-1 py-0.5 outline-none text-black bg-white"
              style={{ border: "1px solid #808080" }}
            />
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <span className="w-14 text-black font-bold shrink-0">Subject:</span>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Let's build something"
              className="flex-1 text-[13px] px-1 py-0.5 outline-none text-black bg-white"
              style={{ border: "1px solid #808080" }}
            />
          </div>
        </div>
        <textarea
          value={body}
          required
          onChange={(e) => setBody(e.target.value)}
          placeholder="Type your message..."
          rows={6}
          className="w-full p-3 text-[13px] outline-none text-black resize-none bg-white"
        />
        <div className="p-3 flex flex-wrap items-center justify-between gap-2" style={{ borderTop: "1px solid #C0C0C0" }}>
          <div className="flex items-center gap-2">
            <PixelButton 
              type="submit" 
              className="px-3 py-1.5 gap-1.5 text-[13px]" 
              disabled={status === "sending"}
            >
              <Send size={13} /> {status === "sending" ? "Sending..." : "Send"}
            </PixelButton>
            {status === "success" && (
              <span className="text-[12px] text-[#008080] font-bold">✔ Message sent successfully!</span>
            )}
            {status === "error" && (
              <span className="text-[12px] text-red-600 font-bold">✖ Failed to send. Try again.</span>
            )}
          </div>
          <div className="flex items-center gap-3">
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
              <Linkedin size={13} /> LinkedIn
            </a>
            <a
              href={`https://${CONTACT.github}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[12px]"
              style={{ color: "#0000EE" }}
            >
              <Github size={13} /> GitHub
            </a>
          </div>
        </div>
      </form>
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