import { useState, useEffect, useRef, useCallback } from "react";

export default function useWindowManager(WINDOW_DEFS){
    const [windows, setWindows] = useState({});
    const [activeId, setActiveId] = useState(null);

    const zRef = useRef(10);
    const dragRef = useRef(null);

    const openWindow = useCallback((id) => {
        setWindows((prev) => {
        const def = WINDOW_DEFS.find((w) => w.id === id);

        if (!def) return prev;

        zRef.current += 1;

        if (prev[id]) {
            return {
            ...prev, [id]: { ...prev[id], minimized: false, z: zRef.current,},
            };
        }

        return {
            ...prev,
            [id]: { id, x: def.x, y: def.y, w: def.w, h: def.h, z: zRef.current, minimized: false, },
        };
        });

        setActiveId(id);
    }, [WINDOW_DEFS]);

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
    return {
            windows,
            activeId,
            openWindow,
            closeWindow,
            minimizeWindow,
            focusWindow,
            onDragStart,
    };

}