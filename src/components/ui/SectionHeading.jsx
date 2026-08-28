export function SectionHeading({ children, icon: Icon }) {
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