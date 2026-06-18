'use client';
import { useEffect, useState } from 'react';

export default function DigitalClock() {
    const [h1, h2, m1, m2] = useClockDigits();

    return (
        <div className="bg-black/30 border border-[#7ee787]/10 rounded p-2.5 font-mono select-none">
            <p className="text-[#d9a066] text-[10px] font-bold mb-1 tracking-wider">⏰ CLOCK</p>
            <div className="flex items-center justify-center gap-1">
                <DigitBlock d={h1} />
                <DigitBlock d={h2} />
                <span className="text-[#7ee787] text-lg font-bold blink-colon">:</span>
                <DigitBlock d={m1} />
                <DigitBlock d={m2} />
            </div>
        </div>
    );
}

const SEGMENTS: Record<string, string> = {
    '0': '╔═══╗\n║   ║\n║   ║\n║   ║\n╚═══╝',
    '1': '  ═╗\n   ║\n   ║\n   ║\n  ═╝',
    '2': '╔═══╗\n    ║\n╔═══╝\n║    \n╚═══╝',
    '3': '╔═══╗\n    ║\n ═══╣\n    ║\n╚═══╝',
    '4': '║   ║\n║   ║\n╚═══╣\n    ║\n    ╝',
    '5': '╔═══╗\n║    \n╚═══╗\n    ║\n╚═══╝',
    '6': '╔═══╗\n║    \n╠═══╗\n║   ║\n╚═══╝',
    '7': '╔═══╗\n    ║\n   ═╝\n   ║ \n   ╝ ',
    '8': '╔═══╗\n║   ║\n╠═══╣\n║   ║\n╚═══╝',
    '9': '╔═══╗\n║   ║\n╚═══╣\n    ║\n╚═══╝',
};

function DigitBlock({ d }: { d: string }) {
    const art = SEGMENTS[d] || SEGMENTS['0'];
    return (
        <pre className="text-[#d9a066] text-[9px] leading-[1.1] font-bold">{art}</pre>
    );
}

function useClockDigits(): [string, string, string, string] {
    const [h, setH] = useState('00');
    const [m, setM] = useState('00');
    useEffect(() => {
        function tick() {
            const now = new Date();
            setH(now.getHours().toString().padStart(2, '0'));
            setM(now.getMinutes().toString().padStart(2, '0'));
        }
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);
    return [h[0], h[1], m[0], m[1]];
}
