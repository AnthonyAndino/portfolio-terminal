'use client';
import { useEffect, useRef } from 'react';

const CHARS = '0123456789';

export default function BootAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false })!; // Use alpha: false for better canvas rendering performance

        let drops: { x: number; y: number; speed: number; length: number; offset: number }[] = [];
        let animId = 0;
        let w = 0;
        let h = 0;
        let isVisible = true;

        const fadeIn: { alpha: number; phase: 'fadein' | 'steady' } = { alpha: 0, phase: 'fadein' };

        function init() {
            const parent = canvas!.parentElement!;
            const rect = parent.getBoundingClientRect();
            w = Math.floor(rect.width);
            h = Math.floor(rect.height);
            canvas!.width = w;
            canvas!.height = h;

            const spacing = 7;
            const cols = Math.floor(w / spacing);
            drops = [];
            for (let i = 0; i < cols; i++) {
                drops.push({
                    x: i * spacing,
                    y: Math.random() * -h * 3,
                    speed: 1.2 + Math.random() * 2.5,
                    length: 10 + Math.floor(Math.random() * 12),
                    offset: Math.random() < 0.3 ? 3 : 0,
                });
            }
        }

        const ro = new ResizeObserver(init);
        ro.observe(canvas.parentElement!);
        init();

        function loop() {
            if (!isVisible || !canvas || !ctx) return;

            ctx.fillStyle = '#0d1117';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (fadeIn.phase === 'fadein') {
                fadeIn.alpha = Math.min(fadeIn.alpha + 0.015, 1);
                if (fadeIn.alpha >= 1) fadeIn.phase = 'steady';
            }

            ctx.font = '8px monospace';
            for (const drop of drops) {
                for (let i = 0; i < drop.length; i++) {
                    const yi = drop.y - i * 9 + drop.offset;
                    if (yi < 0 || yi > h) continue;

                    const char = CHARS[Math.floor(Math.random() * CHARS.length)];
                    const isHead = i === 0;
                    const tailFade = 1 - (i / drop.length) * 0.7;

                    if (isHead) {
                        ctx.fillStyle = `rgba(168, 255, 196, ${0.95 * fadeIn.alpha})`;
                    } else {
                        const brightness = Math.max(0.06, 0.45 * tailFade);
                        ctx.fillStyle = `rgba(126, 231, 135, ${brightness * fadeIn.alpha})`;
                    }
                    ctx.fillText(char, drop.x, yi);
                }

                drop.y += drop.speed;
                if (drop.y - drop.length * 9 > h) {
                    drop.y = Math.random() * -120;
                    drop.speed = 1.2 + Math.random() * 2.5;
                }
            }
            animId = requestAnimationFrame(loop);
        }

        // Setup Intersection Observer to pause/play animation loop based on visibility
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            const wasVisible = isVisible;
            isVisible = entry.isIntersecting;
            
            if (isVisible && !wasVisible) {
                // Restart the loop if it was paused
                cancelAnimationFrame(animId);
                animId = requestAnimationFrame(loop);
            }
        }, { threshold: 0.05 });

        observer.observe(canvas);
        animId = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(animId);
            ro.disconnect();
            observer.disconnect();
        };
    }, []);

    return (
        <canvas ref={canvasRef} className="w-full h-full" style={{ imageRendering: 'pixelated' }} />
    );
}

