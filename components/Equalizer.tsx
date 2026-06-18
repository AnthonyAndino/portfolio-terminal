'use client';
import { useEffect, useRef } from 'react';

const BAR_COUNT = 24;
const INTERVAL = 200; // Throttle height updates to every 200ms for performance

function randomHeights(): number[] {
    return Array.from({ length: BAR_COUNT }, () => 0.15 + Math.random() * 0.75);
}

export default function Equalizer() {
    const barsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = barsRef.current;
        if (!el) return;
        const children = Array.from(el.children) as HTMLDivElement[];

        let lastUpdate = 0;
        let animId = 0;

        function loop(timestamp: number) {
            if (timestamp - lastUpdate >= INTERVAL) {
                const heights = randomHeights();
                for (let i = 0; i < children.length; i++) {
                    children[i].style.height = `${heights[i] * 100}%`;
                }
                lastUpdate = timestamp;
            }
            animId = requestAnimationFrame(loop);
        }

        animId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animId);
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

