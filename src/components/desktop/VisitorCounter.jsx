export function VisitorCounter() {
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
