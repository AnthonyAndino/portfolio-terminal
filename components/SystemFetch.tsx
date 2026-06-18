'use client';
import React from 'react';

const SYS_INFO = [
    { label: 'OS', value: 'AnthonyOS x86_64' },
    { label: 'Host', value: 'Custom Rice' },
    { label: 'Shell', value: 'zsh 5.9' },
    { label: 'WM', value: 'herbstluftwm' },
    { label: 'Term', value: 'xterm-256color' },
    { label: 'CPU', value: 'Intel i7 @ 3.40GHz' },
    { label: 'MEM', value: '2048 / 8192 MiB (25%)' },
];

const DELTA_LOGO = [
    '         ▄        ',
    '        ███       ',
    '       █████      ',
    '      ███ ▀███    ',
    '     ███   ▀███   ',
    '    ████████████  ',
    '   ███▀       ▀███',
];

export function PixelGearIcon({ className = "text-[#7ee787]" }: { className?: string }) {
    const grid = [
        [0,0,0,1,1,0,0,0],
        [0,0,1,0,0,1,0,0],
        [0,1,1,1,1,1,1,0],
        [1,0,1,0,0,1,0,1],
        [1,0,1,0,0,1,0,1],
        [1,0,1,0,0,1,0,1],
        [0,1,1,1,1,1,1,0],
        [0,0,1,0,0,1,0,0],
    ];
    return (
        <div className={`inline-grid grid-cols-8 gap-0 ${className}`}
            style={{ imageRendering: 'pixelated' }}>
            {grid.flat().map((v, i) =>
                <div key={i} className={`w-[2.5px] h-[2.5px] ${v ? 'bg-[#7ee787]' : 'bg-transparent'}`} />
            )}
        </div>
    );
}

export default function SystemFetch() {
    return (
        <div className="font-mono select-none h-full flex items-center px-4 py-3">
            <div className="flex gap-5 items-start">
                <pre className="text-[#7ee787] text-[13px] leading-[1.15] font-bold glow-green shrink-0">
                    {DELTA_LOGO.join('\n')}
                </pre>
                <div className="min-w-0 space-y-1.5 pt-0.5">
                    <p className="text-[#79c0ff] font-bold text-sm glow-blue">&gt;_ anthony@portfolio</p>
                    <div className="space-y-1">
                        {SYS_INFO.map(item => (
                            <p key={item.label} className="flex gap-2 text-sm">
                                <span className="text-[#d9a066] w-[50px] font-bold shrink-0">{item.label}</span>
                                <span className="text-[#6e7681]">:</span>
                                <span className="text-[#7ee787]">{item.value}</span>
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
