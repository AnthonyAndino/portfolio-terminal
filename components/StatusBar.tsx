'use client';
import { useEffect, useState } from 'react';

interface StatsState {
    workspace: number;
    cpu: number;
    ram: number;
    netRx: number;
    netTx: number;
}

export default function StatusBar({ lang = 'es' }: { lang?: 'es' | 'en' }) {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [stats, setStats] = useState<StatsState>({
        workspace: 1,
        cpu: 12,
        ram: 1.4,
        netRx: 1.2,
        netTx: 0.4,
    });

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
            setStats(prev => {
                const changeWorkspace = prev.workspace >= 4 ? 1 : prev.workspace + 1;
                
                const cpuChange = Math.floor(Math.random() * 15) - 5;
                const nextCpu = Math.max(5, Math.min(55, prev.cpu + cpuChange));
                
                const ramChange = (Math.random() * 0.1) - 0.05;
                const nextRam = parseFloat(Math.max(1.2, Math.min(1.8, prev.ram + ramChange)).toFixed(2));
                
                const rxChange = (Math.random() * 0.8) - 0.3;
                const nextRx = parseFloat(Math.max(0.1, Math.min(3.5, prev.netRx + rxChange)).toFixed(1));
                
                const txChange = (Math.random() * 0.5) - 0.2;
                const nextTx = parseFloat(Math.max(0.05, Math.min(2.0, prev.netTx + txChange)).toFixed(1));

                return {
                    workspace: changeWorkspace,
                    cpu: nextCpu,
                    ram: nextRam,
                    netRx: nextRx,
                    netTx: nextTx,
                };
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-between px-4 py-1.5 bg-black/40 border-b border-[#7ee787]/10 text-[11px] font-mono select-none">
            <div className="flex items-center gap-4">
                <span className="text-[#d9a066] font-bold">[Workspace: {stats.workspace}]</span>
                <span className="text-[#6e7681]">|</span>
                <span className="text-[#6e7681]">
                    CPU: <span className="text-[#7ee787] glow-green font-bold transition-all duration-300">{stats.cpu}%</span>
                </span>
                <span className="text-[#6e7681]">|</span>
                <span className="text-[#6e7681]">
                    RAM: <span className="text-[#7ee787] glow-green font-bold transition-all duration-300">{stats.ram}G</span>/8G
                </span>
                <span className="text-[#6e7681]">|</span>
                <span className="text-[#6e7681] flex items-center gap-1.5">
                    Net: <span className="text-[#7ee787] font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7ee787] glow-green light-pulse" />
                        ↓{stats.netRx} ↑{stats.netTx}
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

