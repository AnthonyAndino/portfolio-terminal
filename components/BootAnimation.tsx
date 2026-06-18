'use client';
import { useEffect, useRef } from 'react';

const CHARS = '0123456789';

const BOOT_LINES = [
    { text: 'BIOS v4.11 © 2024 Anthon Corporation', color: '#6e7681' },
    { text: '', color: '' },
    { text: 'POST: CPU.................... OK', color: '#7ee787' },
    { text: 'POST: MEM.................... OK', color: '#7ee787' },
    { text: 'POST: GPU.................... OK', color: '#7ee787' },
    { text: 'POST: HDD.................... OK', color: '#7ee787' },
    { text: '', color: '' },
    { text: 'Detecting hardware...', color: '#7ee787' },
    { text: 'Loading kernel modules...', color: '#7ee787' },
    { text: 'Mounting filesystems...', color: '#7ee787' },
    { text: 'Starting network services...', color: '#7ee787' },
    { text: 'Initializing display...', color: '#7ee787' },
    { text: '', color: '' },
    { text: 'AnthonyOS v1.0 x86_64', color: '#79c0ff' },
];

const LINE_DELAY = 400;
const CHARS_PER_FRAME = 4;

export default function BootAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d')!;

        let drops: { x: number; y: number; speed: number; length: number }[] = [];
        let animId = 0;
        let w = 0;
        let h = 0;

        const state = { step: 0, char: 0, frame: 0, done: false };

        function init() {
            const parent = canvas!.parentElement!;
            const rect = parent.getBoundingClientRect();
            w = Math.floor(rect.width);
            h = Math.floor(rect.height);
            canvas!.width = w * 2;
            canvas!.height = h * 2;
            canvas!.style.width = `${w}px`;
            canvas!.style.height = `${h}px`;

            const cols = Math.floor(w / 14);
            drops = [];
            for (let i = 0; i < cols; i++) {
                drops.push({
                    x: i * 14,
                    y: Math.random() * -h * 2,
                    speed: 0.3 + Math.random() * 0.9,
                    length: 3 + Math.floor(Math.random() * 5),
                });
            }
        }

        const ro = new ResizeObserver(init);
        ro.observe(canvas.parentElement!);
        init();

        function loop() {
            if (!canvas || !ctx) return;
            state.frame++;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Background
            ctx.fillStyle = '#0d1117';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.save();
            ctx.scale(2, 2);

            // ── Matrix Rain (subtle background) ──
            ctx.font = '9px monospace';
            for (const drop of drops) {
                for (let i = 0; i < drop.length; i++) {
                    const yi = drop.y - i * 11;
                    if (yi < 0 || yi > h) continue;

                    const char = CHARS[Math.floor(Math.random() * CHARS.length)];
                    const alpha = i === 0 ? 0.15 : 0.12 - i * 0.02;
                    ctx.fillStyle = `rgba(126, 231, 135, ${Math.max(alpha, 0.02)})`;
                    ctx.fillText(char, drop.x, yi);
                }
                drop.y += drop.speed;
                if (drop.y - drop.length * 11 > h) {
                    drop.y = Math.random() * -40;
                    drop.speed = 0.3 + Math.random() * 0.9;
                }
            }

            // ── Boot text overlay ──
            let ty = 10;

            // Logo
            ctx.font = '7px monospace';
            ctx.fillStyle = '#7ee787';
            const LOGO = [
                '  █████╗ ███╗   ██╗████████╗██╗  ██╗ ██████╗ ███╗   ██╗██╗   ██╗',
                ' ██╔══██╗████╗  ██║╚══██╔══╝██║  ██║██╔═══██╗████╗  ██║╚██╗ ██╔╝',
                ' ███████║██╔██╗ ██║   ██║   ███████║██║   ██║██╔██╗ ██║ ╚████╔╝ ',
                ' ██╔══██║██║╚██╗██║   ██║   ██╔══██║██║   ██║██║╚██╗██║  ╚██╔╝  ',
                ' ██║  ██║██║ ╚████║   ██║   ██║  ██║╚██████╔╝██║ ╚████║   ██║   ',
                ' ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ',
            ];
            for (const line of LOGO) {
                ctx.fillText(line, 4, ty);
                ty += 7;
            }

            ty += 4;

            // Boot lines
            if (state.step < BOOT_LINES.length && !state.done) {
                const line = BOOT_LINES[state.step];
                if (line.text) {
                    ctx.font = '9px monospace';
                    ctx.fillStyle = line.color || '#6e7681';
                    const maxChars = Math.min(state.char, line.text.length);
                    ctx.fillText(line.text.slice(0, maxChars), 10, ty);

                    if (maxChars < line.text.length) {
                        state.char += CHARS_PER_FRAME;
                    } else if (state.frame % Math.ceil(LINE_DELAY / 16) === 0) {
                        state.step++;
                        state.char = 0;
                    }
                    ty += 12;
                } else {
                    if (state.frame % Math.ceil(LINE_DELAY / 16) === 0) {
                        state.step++;
                        state.char = 0;
                    }
                    ty += 6;
                }
            } else if (!state.done) {
                state.done = true;
                ty += 8;
                ctx.font = 'bold 9px monospace';
                ctx.fillStyle = '#7ee787';
                ctx.fillText('AnthonyOS ready. Type help.', 10, ty);
            }

            ctx.restore();
            animId = requestAnimationFrame(loop);
        }

        animId = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(animId);
            ro.disconnect();
        };
    }, []);

    return (
        <canvas ref={canvasRef} className="w-full h-full" style={{ imageRendering: 'pixelated' }} />
    );
}
