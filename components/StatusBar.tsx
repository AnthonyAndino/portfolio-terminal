'use client';
import { useEffect, useState } from 'react';

export default function StatusBar({ lang = 'es' }: { lang?: 'es' | 'en' }) {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [cpu, setCpu] = useState(12);
    const [ram, setRam] = useState(1.4);
    const [workspace, setWorkspace] = useState(1);
    const [netRx, setNetRx] = useState(1.2);
    const [netTx, setNetTx] = useState(0.4);

    useEffect(() => {
        function tick() {
            const now = new Date();
            const locale = lang === 'es' ? 'es-HN' : 'en-US';
            setTime(now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
            setDate(now.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' }));
        }
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [lang]);

    useEffect(() => {
        const interval = setInterval(() => {
            setWorkspace(prev => prev >= 4 ? 1 : prev + 1);
            setCpu(prev => {
                const change = Math.floor(Math.random() * 15) - 5;
                const next = prev + change;
                return Math.max(5, Math.min(55, next));
            });
            setRam(prev => {
                const change = (Math.random() * 0.1) - 0.05;
                const next = prev + change;
                return parseFloat(Math.max(1.2, Math.min(1.8, next)).toFixed(2));
            });
            setNetRx(prev => {
                const change = (Math.random() * 0.8) - 0.3;
                const next = prev + change;
                return parseFloat(Math.max(0.1, Math.min(3.5, next)).toFixed(1));
            });
            setNetTx(prev => {
                const change = (Math.random() * 0.5) - 0.2;
                const next = prev + change;
                return parseFloat(Math.max(0.05, Math.min(2.0, next)).toFixed(1));
            });
        }, 1200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-between px-4 py-1.5 bg-black/40 border-b border-[#7ee787]/10 text-[11px] font-mono select-none">
            <div className="flex items-center gap-4">
                <span className="text-[#d9a066] font-bold">[Workspace: {workspace}]</span>
                <span className="text-[#6e7681]">|</span>
                <span className="text-[#6e7681]">
                    CPU: <span className="text-[#7ee787] glow-green font-bold transition-all duration-300">{cpu}%</span>
                </span>
                <span className="text-[#6e7681]">|</span>
                <span className="text-[#6e7681]">
                    RAM: <span className="text-[#7ee787] glow-green font-bold transition-all duration-300">{ram}G</span>/8G
                </span>
                <span className="text-[#6e7681]">|</span>
                <span className="text-[#6e7681] flex items-center gap-1.5">
                    Net: <span className="text-[#7ee787] font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7ee787] glow-green animate-pulse" />
                        ↓{netRx} ↑{netTx}
                    </span>
                </span>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-[#6e7681]">{date}</span>
                <span className="text-[#7ee787] glow-green font-bold">{time}</span>
            </div>
        </div>
    );
}
