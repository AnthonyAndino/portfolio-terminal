'use client';
import { useEffect, useRef } from 'react';

const BAR_COUNT = 32;

function randomHeights(): number[] {
    return Array.from({ length: BAR_COUNT }, () => 0.1 + Math.random() * 0.8);
}

export default function Equalizer() {
    const barsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let id: number;
        const el = barsRef.current;
        if (!el) return;
        const children = Array.from(el.children) as HTMLDivElement[];

        let lastTime = 0;
        const interval = 120; // Update every 120ms instead of every frame

        function tick(timestamp: number) {
            if (!lastTime) lastTime = timestamp;
            const elapsed = timestamp - lastTime;

            if (elapsed >= interval) {
                const heights = randomHeights();
                children.forEach((child, i) => {
                    child.style.height = `${heights[i] * 100}%`;
                });
                lastTime = timestamp;
            }
            id = requestAnimationFrame(tick);
        }
        id = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <div className="h-full flex flex-col select-none">
            <div className="flex items-end justify-center gap-[1px] h-full px-1" ref={barsRef}>
                {Array.from({ length: BAR_COUNT }, (_, i) => (
                    <div
                        key={i}
                        className="flex-1 rounded-t"
                        style={{
                            height: '20%',
                            transition: 'height 0.15s ease-in-out',
                            transformOrigin: 'bottom',
                            background: `linear-gradient(to top, rgba(126,231,135,0.15), rgba(126,231,135,0.5))`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
