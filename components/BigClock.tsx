'use client';
import { useEffect, useState, memo } from 'react';

function useTime() {
    const [time, setTime] = useState('22:04');
    useEffect(() => {
        function tick() {
            const now = new Date();
            setTime(
                now.getHours().toString().padStart(2, '0') +
                ':' +
                now.getMinutes().toString().padStart(2, '0')
            );
        }
        tick();
        const id = setInterval(tick, 10000); // Check time every 10 seconds instead of every second
        return () => clearInterval(id);
    }, []);
    return time;
}

const DIGITS: Record<string, string[]> = {
    '0': [
        ' ██████╗ ',
        '██╔═══██╗',
        '██║   ██║',
        '██║   ██║',
        '╚██████╔╝',
        ' ╚═════╝ '
    ],
    '1': [
        '  ██╗    ',
        ' ███║    ',
        ' ╚██║    ',
        '  ██║    ',
        '  ██║    ',
        '  ╚═╝    '
    ],
    '2': [
        '███████╗ ',
        '╚════██║ ',
        ' █████╔╝ ',
        '██╔═══╝  ',
        '███████╗ ',
        '╚══════╝ '
    ],
    '3': [
        '███████╗ ',
        '╚════██║ ',
        ' █████╔╝ ',
        ' ╚═══██║ ',
        '███████║ ',
        '╚══════╝ '
    ],
    '4': [
        '██╗  ██╗ ',
        '██║  ██║ ',
        '███████║ ',
        '╚═══██║  ',
        '    ██║  ',
        '    ╚═╝  '
    ],
    '5': [
        '███████╗ ',
        '██╔════╝ ',
        '███████╗ ',
        '╚════██║ ',
        '███████║ ',
        '╚══════╝ '
    ],
    '6': [
        ' ██████╗ ',
        '██╔════╝ ',
        '███████╗ ',
        '██╔══██║ ',
        '╚██████╔╝',
        ' ╚═════╝ '
    ],
    '7': [
        '███████╗ ',
        '╚═══██╔╝ ',
        '   ██╔╝  ',
        '  ██╔╝   ',
        '  ██║    ',
        '  ╚═╝    '
    ],
    '8': [
        ' ██████╗ ',
        '██╔══██║ ',
        '███████║ ',
        '██╔══██║ ',
        '╚██████╔╝',
        ' ╚═════╝ '
    ],
    '9': [
        ' ██████╗ ',
        '██╔══██║ ',
        '╚██████║ ',
        ' ╚═══██║ ',
        '███████║ ',
        '╚══════╝ '
    ],
};

const COLON = [
    '   ',
    ' █ ',
    ' ╚╝',
    ' █ ',
    ' ╚╝',
    '   '
];

const DigitBlock = memo(function DigitBlock({ d }: { d: string }) {
    const rows = DIGITS[d] || DIGITS['0'];
    return (
        <div className="flex flex-col items-center leading-[1.0]">
            {rows.map((row, i) => (
                <div key={i} className="text-[#7ee787] font-bold whitespace-pre glow-green select-none" style={{ fontSize: 'clamp(8px, 1.2vw, 15px)' }}>
                    {row}
                </div>
            ))}
        </div>
    );
});

const ColonBlock = memo(function ColonBlock() {
    return (
        <div className="flex flex-col items-center leading-[1.0] blink-colon mx-0.5">
            {COLON.map((row, i) => (
                <div key={i} className="text-[#7ee787] font-bold whitespace-pre glow-green select-none" style={{ fontSize: 'clamp(8px, 1.2vw, 15px)' }}>
                    {row}
                </div>
            ))}
        </div>
    );
});

export default function BigClock() {
    const time = useTime();
    const [h1, h2, , m1, m2] = time;

    const [date, setDate] = useState('');
    useEffect(() => {
        function tick() {
            const now = new Date();
            setDate(now.toLocaleDateString('es-HN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }));
        }
        tick();
        const id = setInterval(tick, 60000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="h-full flex flex-col items-center justify-center select-none gap-0.5">
            <div className="flex items-center gap-0">
                <DigitBlock d={h1} />
                <DigitBlock d={h2} />
                <ColonBlock />
                <DigitBlock d={m1} />
                <DigitBlock d={m2} />
            </div>
            <p className="text-[#6e7681] text-[clamp(6px,0.4vw,8px)] font-mono mt-1 uppercase tracking-wider">{date}</p>
        </div>
    );
}

