export const PixelButton = ({ children, onClick, className = "", title, active = false }) => (
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