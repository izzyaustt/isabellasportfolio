import { useState, useEffect, useRef, useCallback } from "react";

export default function useWindowManager(WINDOW_DEFS) {
    const [windows, setWindows] = useState({});
    const [activeId, setActiveId] = useState(null);

    const zRef = useRef(10);
    const dragRef = useRef(null);
    const resizeRef = useRef(null);

    const openWindow = useCallback((id) => {
        setWindows((prev) => {
            const def = WINDOW_DEFS.find((w) => w.id === id);
            if (!def) return prev;

            zRef.current += 1;

            if (prev[id]) {
                return {
                    ...prev,
                    [id]: { ...prev[id], minimized: false, z: zRef.current },
                };
            }

            return {
                ...prev,
                [id]: { id, x: def.x, y: def.y, w: def.w, h: def.h, z: zRef.current, minimized: false },
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

    const onResizeStart = (e, id, direction) => {
        e.stopPropagation();
        focusWindow(id);
        const win = windows[id];
        resizeRef.current = {
            id,
            direction,
            startX: e.clientX,
            startY: e.clientY,
            startW: win.w,
            startH: win.h,
            startPosX: win.x,
            startPosY: win.y,
        };
    };

    useEffect(() => {
        const onMove = (e) => {
            if (dragRef.current) {
                const { id, offsetX, offsetY } = dragRef.current;
                setWindows((prev) => {
                    if (!prev[id]) return prev;
                    const nx = Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - 100));
                    const ny = Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - 80));
                    return { ...prev, [id]: { ...prev[id], x: nx, y: ny } };
                });
            }

            if (resizeRef.current) {
                const { id, direction, startX, startY, startW, startH, startPosX, startPosY } = resizeRef.current;
                setWindows((prev) => {
                    if (!prev[id]) return prev;
                    const dx = e.clientX - startX;
                    const dy = e.clientY - startY;

                    let newW = startW;
                    let newH = startH;
                    let newX = startPosX;
                    let newY = startPosY;

                    const minW = 200;
                    const minH = 150;

                    const isRight = direction === "r" || direction === "ne" || direction === "se";
                    const isBottom = direction === "b" || direction === "sw" || direction === "se";
                    const isLeft = direction === "l" || direction === "nw" || direction === "sw";
                    const isTop = direction === "t" || direction === "nw" || direction === "ne";

                    if (isRight) newW = Math.max(minW, startW + dx);
                    if (isBottom) newH = Math.max(minH, startH + dy);
                    
                    if (isLeft) {
                        const potentialW = startW - dx;
                        if (potentialW >= minW) {
                            newW = potentialW;
                            newX = startPosX + dx;
                        }
                    }
                    if (isTop) {
                        const potentialH = startH - dy;
                        if (potentialH >= minH) {
                            newH = potentialH;
                            newY = startPosY + dy;
                        }
                    }

                    return {
                        ...prev,
                        [id]: { ...prev[id], w: newW, h: newH, x: newX, y: newY },
                    };
                });
            }
        };

        const onUp = () => {
            dragRef.current = null;
            resizeRef.current = null;
        };

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
        onResizeStart,
    };
}