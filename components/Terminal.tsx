'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import type { RefObject } from 'react';
import type { GroupImperativeHandle } from 'react-resizable-panels';
import { runCommand, OutputLine } from '@/lib/commands';
import type { PanelContent } from '@/lib/commands';
import RightPanel from './RightPanel';
import StatusBar from './StatusBar';
import SystemFetch, { PixelGearIcon } from './SystemFetch';
import BigClock from './BigClock';
import Equalizer from './Equalizer';
import { ExplorerTree, NeovimEditor } from './FileTree';
import { Terminal as LucideTerminal, Cpu, Gamepad2, FolderOpen, FileCode, Clock, Activity, User, Wrench, Briefcase, GraduationCap, FolderCode, Share2, Mail, Home } from 'lucide-react';
import { Group, Panel, Separator, useGroupRef } from 'react-resizable-panels';

const ASCII_BANNER = `
╔══════════════════════════════════════════════════════════════╗
║   █████╗ ███╗   ██╗████████╗██╗  ██╗ ██████╗ ███╗   ██╗██╗   ██╗ ║
║  ██╔══██╗████╗  ██║╚══██╔══╝██║  ██║██╔═══██╗████╗  ██║╚██╗ ██╔╝ ║
║  ███████║██╔██╗ ██║   ██║   ███████║██║   ██║██╔██╗ ██║ ╚████╔╝  ║
║  ██╔══██║██║╚██╗██║   ██║   ██╔══██║██║   ██║██║╚██╗██║  ╚██╔╝   ║
║  ██║  ██║██║ ╚████║   ██║   ██║  ██║╚██████╔╝██║ ╚████║   ██║    ║
║  ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝    ║
╚══════════════════════════════════════════════════════════════╝
`;

type HistoryEntry =
    | { kind: 'input'; text: string }
    | { kind: 'output'; lines: OutputLine[] };

const COLORS: Record<string, string> = {
    green: 'text-[#7ee787]',
    blue: 'text-[#79c0ff]',
    yellow: 'text-[#d9a066]',
    red: 'text-[#ff7b72]',
    muted: 'text-[#6e7681]',
    white: 'text-[#7ee787]',
};

const WELCOME_ES: OutputLine[] = [
    { text: 'Sistema listo. Escribe "help" para comandos.', color: 'green' },
    { text: '' },
];

const WELCOME_EN: OutputLine[] = [
    { text: 'System ready. Type "help" for commands.', color: 'green' },
    { text: '' },
];

function Lines({ lines }: { lines: OutputLine[] }) {
    return (
        <div>
            {lines.map((line, i) => (
                <div
                    key={i}
                    className={`font-mono text-sm leading-relaxed break-words whitespace-pre-wrap ${COLORS[line.color ?? 'white']} ${line.bold ? 'font-bold glow-green' : ''}`}
                >
                    {line.text || '\u00A0'}
                </div>
            ))}
        </div>
    );
}

// ─── Window Titles Stylized Lucide Icons ───

function DiamondIcon() {
    return (
        <Cpu className="text-[#7ee787] w-3 h-3 stroke-[2] shrink-0" />
    );
}

function TerminalIcon() {
    return (
        <LucideTerminal className="text-[#7ee787] w-3 h-3 stroke-[2] shrink-0" />
    );
}

function GameIcon() {
    return (
        <Gamepad2 className="text-[#d9a066] w-3.5 h-3.5 stroke-[2] shrink-0" />
    );
}

const panelIcons: Record<string, React.ReactNode> = {
    home: <Home className="text-[#7ee787] w-3 h-3 stroke-[2] shrink-0" />,
    whoami: <User className="text-[#7ee787] w-3 h-3 stroke-[2] shrink-0" />,
    skills: <Wrench className="text-[#7ee787] w-3 h-3 stroke-[2] shrink-0" />,
    experience: <Briefcase className="text-[#7ee787] w-3 h-3 stroke-[2] shrink-0" />,
    education: <GraduationCap className="text-[#7ee787] w-3 h-3 stroke-[2] shrink-0" />,
    services: <Cpu className="text-[#7ee787] w-3 h-3 stroke-[2] shrink-0" />,
    projects: <FolderCode className="text-[#7ee787] w-3 h-3 stroke-[2] shrink-0" />,
    social: <Share2 className="text-[#7ee787] w-3 h-3 stroke-[2] shrink-0" />,
    contact: <Mail className="text-[#7ee787] w-3 h-3 stroke-[2] shrink-0" />,
    game: <Gamepad2 className="text-[#7ee787] w-3.5 h-3.5 stroke-[2] shrink-0" />,
};

function FolderTitleIcon() {
    return (
        <FolderOpen className="text-[#7ee787] w-3 h-3 stroke-[2] shrink-0" />
    );
}

function NeovimTitleIcon() {
    return (
        <FileCode className="text-[#7ee787] w-3 h-3 stroke-[2] shrink-0" />
    );
}

function ClockTitleIcon() {
    return (
        <Clock className="text-[#7ee787] w-3 h-3 stroke-[2] shrink-0" />
    );
}

function VizTitleIcon() {
    return (
        <Activity className="text-[#7ee787] w-3.5 h-3.5 stroke-[2] shrink-0" />
    );
}

function WindowFrame({ title, children, className = '', active = false, icon }: {
    title: string;
    children: React.ReactNode;
    className?: string;
    active?: boolean;
    icon?: React.ReactNode;
}) {
    const border = active
        ? 'border-[#7ee787]/50 shadow-[0_0_15px_rgba(126,231,135,0.1)] hover:border-[#7ee787]/60 hover:shadow-[0_0_18px_rgba(126,231,135,0.12)] focus-within:border-[#7ee787]/70 focus-within:shadow-[0_0_20px_rgba(126,231,135,0.15)]'
        : 'border-[#7ee787]/30 shadow-[0_0_8px_rgba(126,231,135,0.04)] hover:border-[#7ee787]/45 hover:shadow-[0_0_12px_rgba(126,231,135,0.08)] focus-within:border-[#7ee787]/55 focus-within:shadow-[0_0_15px_rgba(126,231,135,0.1)]';
    return (
        <div className={`border ${border} rounded-lg bg-black/20 flex flex-col overflow-hidden transition-[border-color,box-shadow] duration-300 ${className}`}>
            <div className="border-b border-[#7ee787]/10 px-2 lg:px-3 py-1 text-[clamp(8px,0.5vw,10px)] font-mono text-[#6e7681] flex items-center justify-between shrink-0 select-none">
                <span className="text-[#d9a066] font-bold tracking-wider flex items-center gap-1.5">
                    {icon}
                    <span>{title}</span>
                </span>
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ff7b72]/40" />
                    <span className="w-2 h-2 rounded-full bg-[#d9a066]/40" />
                    <span className="w-2 h-2 rounded-full bg-[#7ee787]/40" />
                </div>
            </div>
            <div className="flex-1 min-h-0 p-2 lg:p-3 overflow-auto">
                {children}
            </div>
        </div>
    );
}

function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const mql = window.matchMedia(query);
        setMatches(mql.matches);
        const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, [query]);
    return matches;
}

export default function Terminal() {
    const [lang, setLang] = useState<'es' | 'en'>('es');
    const [selectedFile, setSelectedFile] = useState('about.md');
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [input, setInput] = useState('');
    const [cmdHistory, setCmdHistory] = useState<string[]>([]);
    const [histIdx, setHistIdx] = useState(-1);
    const [panel, setPanel] = useState<PanelContent>({ type: 'home' });
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const mainGroupRef = useGroupRef();
    const leftVerticalRef = useGroupRef();
    const sysinfoClockRef = useGroupRef();
    const rightVerticalRef = useGroupRef();
    const explorerNeovimRef = useGroupRef();
    const initialLayouts = useRef<Record<string, { [panelId: string]: number }>>({});

    const resetLayout = useCallback(() => {
        const groups: [RefObject<GroupImperativeHandle | null>, string][] = [
            [mainGroupRef, 'main'],
            [leftVerticalRef, 'leftVertical'],
            [sysinfoClockRef, 'sysinfoClock'],
            [rightVerticalRef, 'rightVertical'],
            [explorerNeovimRef, 'explorerNeovim'],
        ];
        for (const [ref, key] of groups) {
            const layout = initialLayouts.current[key];
            if (layout) ref.current?.setLayout(layout);
        }
    }, [mainGroupRef, leftVerticalRef, sysinfoClockRef, rightVerticalRef, explorerNeovimRef]);

    const isStacked = useMediaQuery('(max-width: 768px)');

    useEffect(() => {
        const groups: [RefObject<GroupImperativeHandle | null>, string][] = [
            [mainGroupRef, 'main'],
            [leftVerticalRef, 'leftVertical'],
            [sysinfoClockRef, 'sysinfoClock'],
            [rightVerticalRef, 'rightVertical'],
            [explorerNeovimRef, 'explorerNeovim'],
        ];
        let allReady = true;
        for (const [ref, key] of groups) {
            if (!ref.current) { allReady = false; break; }
        }
        if (!allReady) return;
        for (const [ref, key] of groups) {
            initialLayouts.current[key] = ref.current!.getLayout();
        }
    }, [mainGroupRef, leftVerticalRef, sysinfoClockRef, rightVerticalRef, explorerNeovimRef]);

    useEffect(() => {
        setHistory([{ kind: 'output', lines: lang === 'es' ? WELCOME_ES : WELCOME_EN }]);
    }, [lang]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = useCallback((raw: string) => {
        const trimmed = raw.trim();
        if (!trimmed) return;

        const cmdLower = trimmed.toLowerCase();
        const parts = cmdLower.split(/\s+/);
        const cmd = parts[0];

        setCmdHistory(prev => [trimmed, ...prev.slice(0, 49)]);
        setHistIdx(-1);

        // CV download interceptor
        if (cmd === 'cv' || cmd === 'resume' || cmd === 'curriculum') {
            const isEn = lang === 'en';
            const filename = isEn ? 'CV_Anthony_Andino_en.pdf' : 'CV_Anthony_Andino_es.pdf';
            const a = document.createElement('a');
            a.href = `/cv/${filename}`;
            a.download = filename;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setHistory(prev => [
                ...prev,
                { kind: 'input', text: trimmed },
                {
                    kind: 'output',
                    lines: isEn ? [
                        { text: 'Downloading CV...', color: 'green' },
                        { text: filename, color: 'blue' },
                    ] : [
                        { text: 'Descargando CV...', color: 'green' },
                        { text: filename, color: 'blue' },
                    ],
                }
            ]);
            return;
        }

        // Language toggle interceptor
        if (cmd === 'idioma' || cmd === 'lang') {
            const targetLang = parts[1];
            if (targetLang === 'en' || targetLang === 'us' || targetLang === 'english') {
                setLang('en');
                setHistory(prev => [
                    ...prev,
                    { kind: 'input', text: trimmed },
                    {
                        kind: 'output',
                        lines: [{ text: 'Language changed to English.', color: 'green' }]
                    }
                ]);
                return;
            } else if (targetLang === 'es' || targetLang === 'hn' || targetLang === 'spanish' || targetLang === 'español' || targetLang === 'esp') {
                setLang('es');
                setHistory(prev => [
                    ...prev,
                    { kind: 'input', text: trimmed },
                    {
                        kind: 'output',
                        lines: [{ text: 'Idioma cambiado a Español.', color: 'green' }]
                    }
                ]);
                return;
            } else {
                const text = lang === 'es'
                    ? 'Uso: idioma <es|en> (ej: idioma en)'
                    : 'Usage: lang <es|en> (e.g. lang en)';
                setHistory(prev => [
                    ...prev,
                    { kind: 'input', text: trimmed },
                    {
                        kind: 'output',
                        lines: [{ text, color: 'yellow' }]
                    }
                ]);
                return;
            }
        }

        const result = runCommand(trimmed, lang);

        if (result.type === 'clear') {
            setHistory([{ kind: 'output', lines: lang === 'es' ? WELCOME_ES : WELCOME_EN }]);
            return;
        }

        setHistory(prev => {
            const inputEntry: HistoryEntry = { kind: 'input', text: trimmed };

            if (result.type === 'unknown') {
                return [...prev, inputEntry, {
                    kind: 'output',
                    lines: lang === 'es' ? [
                        { text: `comando no encontrado: ${result.cmd}`, color: 'red' },
                        { text: 'escribe "help" para ver los comandos', color: 'muted' },
                    ] : [
                        { text: `command not found: ${result.cmd}`, color: 'red' },
                        { text: 'type "help" to see available commands', color: 'muted' },
                    ],
                }];
            }

            if (result.panel) {
                setPanel(result.panel);
            }

            return [...prev, inputEntry, { kind: 'output', lines: result.lines }];
        });
    }, [lang]);

    const onBackToGame = useCallback(() => {
        setPanel({ type: 'home' });
        inputRef.current?.focus();
    }, []);

    const onSelectFile = useCallback((filename: string) => {
        setSelectedFile(filename);
        setHistory(prev => [
            ...prev,
            {
                kind: 'output',
                lines: [{ text: `$ nvim ${filename}`, color: 'muted' }]
            }
        ]);
        if (filename === 'skills.sh') {
            setPanel({ type: 'skills' });
        } else if (filename === 'projects.py') {
            setPanel({ type: 'projects' });
        } else if (filename === 'about.md') {
            setPanel({ type: 'whoami' });
        } else if (filename === 'services.lua') {
            setPanel({ type: 'services' });
        }
    }, []);

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const next = Math.min(histIdx + 1, cmdHistory.length - 1);
            setHistIdx(next);
            setInput(cmdHistory[next] ?? '');
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const next = histIdx - 1;
            if (next < 0) { setHistIdx(-1); setInput(''); }
            else { setHistIdx(next); setInput(cmdHistory[next] ?? ''); }
        }
    };

    const explorerVisible = panel.type !== 'projects' && panel.type !== 'skills' && panel.type !== 'experience';

    const rightPanelTitle = panel.type === 'whoami'
        ? (lang === 'es' ? 'QUIEN SOY' : 'WHOAMI')
        : panel.type.toUpperCase();

    return (
        <>
            <div className="scanlines" />

            <div
                className="h-screen w-screen flex flex-col"
                onMouseDown={(e) => {
                    if (!(e.target as HTMLElement).closest('input,textarea,button,[contenteditable]')) {
                        inputRef.current?.focus();
                    }
                }}
            >
                <StatusBar lang={lang} onResetLayout={resetLayout} />

                {isStacked ? (
                    /* ─── Mobile stacked layout ─── */
                    <div className="flex-1 overflow-y-auto p-1.5 space-y-1.5">
                        {/* Terminal */}
                        <div className="min-h-[250px]">
                            <WindowFrame title="TERMINAL" icon={<TerminalIcon />} active className="h-full">
                                <div className="flex flex-col h-full">
                                    <pre className="font-mono text-[clamp(7px,0.5vw,10px)] leading-tight text-[#7ee787] glow-green mb-3 select-none overflow-x-auto shrink-0">
                                        {ASCII_BANNER}
                                    </pre>

                                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden font-mono text-sm pr-1">
                                        {history.map((entry, i) => (
                                            <div key={i} className="mb-1.5">
                                                {entry.kind === 'input' ? (
                                                    <div className="flex items-start gap-2">
                                                        <span className="text-[#7ee787] font-bold shrink-0 glow-green">matrix@terminal</span>
                                                        <span className="text-[#6e7681]">:~$</span>
                                                        <span className="text-[#79c0ff] glow-blue">{entry.text}</span>
                                                    </div>
                                                ) : (
                                                    <Lines lines={entry.lines} />
                                                )}
                                            </div>
                                        ))}

                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[#7ee787] font-bold shrink-0 glow-green">matrix@terminal</span>
                                            <span className="text-[#6e7681]">:~$</span>
                                            <input
                                                ref={inputRef}
                                                value={input}
                                                onChange={e => setInput(e.target.value)}
                                                onKeyDown={onKeyDown}
                                                autoFocus
                                                autoComplete="off"
                                                spellCheck={false}
                                                className="flex-1 bg-transparent text-[#79c0ff] outline-none caret-[#7ee787] font-mono text-sm"
                                            />
                                        </div>

                                        <div ref={bottomRef} />
                                    </div>
                                </div>
                            </WindowFrame>
                        </div>

                        {/* Views */}
                        <div className="min-h-[200px]">
                            <WindowFrame title={rightPanelTitle} icon={panelIcons[panel.type]} className="h-full">
                                <RightPanel panel={panel} onBackToGame={onBackToGame} lang={lang} />
                            </WindowFrame>
                        </div>

                        {/* SysInfo + Clock */}
                        <div className="grid grid-cols-2 gap-1.5 min-h-[100px]">
                            <WindowFrame title="SYSINFO" icon={<DiamondIcon />} className="h-full">
                                <SystemFetch />
                            </WindowFrame>
                            <WindowFrame title={lang === 'es' ? 'RELOJ' : 'CLOCK'} icon={<ClockTitleIcon />} className="h-full">
                                <BigClock />
                            </WindowFrame>
                        </div>

                        {/* Explorer + Neovim */}
                        {explorerVisible && (
                            <div className="grid grid-cols-2 gap-1.5 min-h-[150px]">
                                <WindowFrame title={lang === 'es' ? 'EXPLORADOR' : 'EXPLORER'} icon={<FolderTitleIcon />} className="h-full">
                                    <ExplorerTree selectedFile={selectedFile} onSelectFile={onSelectFile} />
                                </WindowFrame>
                                <WindowFrame title="NEOVIM" icon={<NeovimTitleIcon />} className="h-full">
                                    <NeovimEditor selectedFile={selectedFile} lang={lang} />
                                </WindowFrame>
                            </div>
                        )}

                        {/* Viz */}
                        <div className="min-h-[60px]">
                            <WindowFrame title="VIZ" icon={<VizTitleIcon />} className="h-full">
                                <Equalizer />
                            </WindowFrame>
                        </div>
                    </div>
                ) : (
                    /* ─── Desktop tiling layout (react-resizable-panels) ─── */
                    <div className="flex-1 min-h-0 p-1.5 lg:p-3 overflow-hidden">
                        <Group orientation="horizontal" className="h-full" groupRef={mainGroupRef}>
                            {/* ─── Left column ─── */}
                            <Panel defaultSize={50} minSize={25} id="left-col">
                                <Group orientation="vertical" className="h-full" groupRef={leftVerticalRef}>
                                    {/* SysInfo + Clock */}
                                    <Panel defaultSize={35} minSize={12} id="sysinfo-clock">
                                        <Group orientation="horizontal" className="h-full" groupRef={sysinfoClockRef}>
                                            <Panel defaultSize={60} minSize={25} id="sysinfo">
                                                <WindowFrame title="SYSINFO" icon={<DiamondIcon />} className="h-full">
                                                    <SystemFetch />
                                                </WindowFrame>
                                            </Panel>
                                            <Separator className="w-[3px] cursor-col-resize bg-[#7ee787]/0 hover:bg-[#7ee787]/30 data-[resize-active]:bg-[#7ee787]/50 transition-colors rounded-sm" />
                                            <Panel defaultSize={40} minSize={20} id="clock">
                                                <WindowFrame title={lang === 'es' ? 'RELOJ' : 'CLOCK'} icon={<ClockTitleIcon />} className="h-full">
                                                    <BigClock />
                                                </WindowFrame>
                                            </Panel>
                                        </Group>
                                    </Panel>

                                    <Separator className="h-[3px] cursor-row-resize bg-[#7ee787]/0 hover:bg-[#7ee787]/30 data-[resize-active]:bg-[#7ee787]/50 transition-colors rounded-sm" />

                                    {/* Terminal */}
                                    <Panel defaultSize={65} minSize={15} id="terminal">
                                        <WindowFrame title="TERMINAL" icon={<TerminalIcon />} active className="h-full">
                                            <div className="flex flex-col h-full">
                                                <pre className="font-mono text-[clamp(7px,0.5vw,10px)] leading-tight text-[#7ee787] glow-green mb-3 select-none overflow-x-auto shrink-0">
                                                    {ASCII_BANNER}
                                                </pre>

                                                <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden font-mono text-sm pr-1">
                                                    {history.map((entry, i) => (
                                                        <div key={i} className="mb-1.5">
                                                            {entry.kind === 'input' ? (
                                                                <div className="flex items-start gap-2">
                                                                    <span className="text-[#7ee787] font-bold shrink-0 glow-green">matrix@terminal</span>
                                                                    <span className="text-[#6e7681]">:~$</span>
                                                                    <span className="text-[#79c0ff] glow-blue">{entry.text}</span>
                                                                </div>
                                                            ) : (
                                                                <Lines lines={entry.lines} />
                                                            )}
                                                        </div>
                                                    ))}

                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-[#7ee787] font-bold shrink-0 glow-green">matrix@terminal</span>
                                                        <span className="text-[#6e7681]">:~$</span>
                                                        <input
                                                            ref={inputRef}
                                                            value={input}
                                                            onChange={e => setInput(e.target.value)}
                                                            onKeyDown={onKeyDown}
                                                            autoFocus
                                                            autoComplete="off"
                                                            spellCheck={false}
                                                            className="flex-1 bg-transparent text-[#79c0ff] outline-none caret-[#7ee787] font-mono text-sm"
                                                        />
                                                    </div>

                                                    <div ref={bottomRef} />
                                                </div>
                                            </div>
                                        </WindowFrame>
                                    </Panel>
                                </Group>
                            </Panel>

                            <Separator className="w-[3px] cursor-col-resize bg-[#7ee787]/0 hover:bg-[#7ee787]/30 data-[resize-active]:bg-[#7ee787]/50 transition-colors rounded-sm" />

                            {/* ─── Right column ─── */}
                            <Panel defaultSize={50} minSize={25} id="right-col">
                                <Group orientation="vertical" className="h-full" groupRef={rightVerticalRef}>
                                    {/* Dynamic Views */}
                                    <Panel defaultSize={45} minSize={15} id="views">
                                        <WindowFrame title={rightPanelTitle} icon={panelIcons[panel.type]} className="h-full">
                                            <RightPanel panel={panel} onBackToGame={onBackToGame} lang={lang} />
                                        </WindowFrame>
                                    </Panel>

                                    {explorerVisible ? (
                                        <>
                                            <Separator className="h-[3px] cursor-row-resize bg-[#7ee787]/0 hover:bg-[#7ee787]/30 data-[resize-active]:bg-[#7ee787]/50 transition-colors rounded-sm" />

                                            {/* Explorer + Neovim */}
                                            <Panel defaultSize={30} minSize={15} id="explorer-neovim">
                                                <Group orientation="horizontal" className="h-full" groupRef={explorerNeovimRef}>
                                                    <Panel defaultSize={50} minSize={25} id="explorer">
                                                        <WindowFrame title={lang === 'es' ? 'EXPLORADOR' : 'EXPLORER'} icon={<FolderTitleIcon />} className="h-full">
                                                            <ExplorerTree selectedFile={selectedFile} onSelectFile={onSelectFile} />
                                                        </WindowFrame>
                                                    </Panel>
                                                    <Separator className="w-[3px] cursor-col-resize bg-[#7ee787]/0 hover:bg-[#7ee787]/30 data-[resize-active]:bg-[#7ee787]/50 transition-colors rounded-sm" />
                                                    <Panel defaultSize={50} minSize={25} id="neovim">
                                                        <WindowFrame title="NEOVIM" icon={<NeovimTitleIcon />} className="h-full">
                                                            <NeovimEditor selectedFile={selectedFile} lang={lang} />
                                                        </WindowFrame>
                                                    </Panel>
                                                </Group>
                                            </Panel>

                                            <Separator className="h-[3px] cursor-row-resize bg-[#7ee787]/0 hover:bg-[#7ee787]/30 data-[resize-active]:bg-[#7ee787]/50 transition-colors rounded-sm" />
                                        </>
                                    ) : (
                                        <Separator className="h-[3px] cursor-row-resize bg-[#7ee787]/0 hover:bg-[#7ee787]/30 data-[resize-active]:bg-[#7ee787]/50 transition-colors rounded-sm" />
                                    )}

                                    {/* Viz */}
                                    <Panel defaultSize={20} minSize={10} id="viz">
                                        <WindowFrame title="VIZ" icon={<VizTitleIcon />} className="h-full">
                                            <Equalizer />
                                        </WindowFrame>
                                    </Panel>
                                </Group>
                            </Panel>
                        </Group>
                    </div>
                )}
            </div>
        </>
    );
}
