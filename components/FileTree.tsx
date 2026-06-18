'use client';
import React from 'react';
import { Folder, Terminal, Code2, Cpu, FileText } from 'lucide-react';

// ─── Stylized Lucide Icons ───

export function FolderIcon() {
    return (
        <Folder className="shrink-0 text-[#d9a066] w-3.5 h-3.5 stroke-[1.5]" />
    );
}

export function ShellIcon() {
    return (
        <Terminal className="shrink-0 text-[#7ee787] w-3.5 h-3.5 stroke-[2]" />
    );
}

export function PythonIcon() {
    return (
        <Code2 className="shrink-0 text-[#79c0ff] w-3.5 h-3.5 stroke-[2]" />
    );
}

export function LuaIcon() {
    return (
        <Cpu className="shrink-0 text-[#79c0ff] w-3.5 h-3.5 stroke-[2]" />
    );
}

export function MarkdownIcon() {
    return (
        <FileText className="shrink-0 text-[#7ee787] w-3.5 h-3.5 stroke-[2]" />
    );
}

const FILES = [
    { name: 'skills.sh', renderIcon: () => <ShellIcon /> },
    { name: 'projects.py', renderIcon: () => <PythonIcon /> },
    { name: 'services.lua', renderIcon: () => <LuaIcon /> },
    { name: 'about.md', renderIcon: () => <MarkdownIcon /> },
    { name: 'src/', renderIcon: () => <FolderIcon /> },
];

const FILE_CONTENTS: Record<string, Record<'es' | 'en', string[]>> = {
    'skills.sh': {
        es: [
            '#!/bin/bash',
            '# Mostrar mis habilidades técnicas',
            'echo "=== MIS HABILIDADES ==="',
            'echo "Frontend : React, Next.js, TypeScript, Tailwind"',
            'echo "Backend  : Node.js, Python, Express, Django"',
            'echo "Bases de Datos : MySQL, PostgreSQL, MongoDB"',
            'echo "Herramientas   : Git, GitHub, VS Code, Docker"',
        ],
        en: [
            '#!/bin/bash',
            '# Display my technical skills',
            'echo "=== MY SKILLS ==="',
            'echo "Frontend : React, Next.js, TypeScript, Tailwind"',
            'echo "Backend  : Node.js, Python, Express, Django"',
            'echo "Databases : MySQL, PostgreSQL, MongoDB"',
            'echo "Tools     : Git, GitHub, VS Code, Docker"',
        ],
    },
    'projects.py': {
        es: [
            '# Lista de mis proyectos principales',
            'proyectos = [',
            '    {"nombre": "DayMark", "tipo": "Habit Tracker & Journal"},',
            '    {"nombre": "RH Manager", "tipo": "Dashboard de Recursos Humanos"},',
            '    {"nombre": "DSGN Creative Studio", "tipo": "Landing Page moderna"},',
            '    {"nombre": "AuraDesk Tickets", "tipo": "Sistema de Soporte"}',
            ']',
            'for p in proyectos:',
            '    print(f"Proyecto: {p[\'nombre\']} | Tipo: {p[\'tipo\']}")',
        ],
        en: [
            '# List of my main projects',
            'projects = [',
            '    {"name": "DayMark", "type": "Habit Tracker & Journal"},',
            '    {"name": "RH Manager", "type": "HR Dashboard & Payroll"},',
            '    {"name": "DSGN Creative Studio", "type": "Modern Landing Page"},',
            '    {"name": "AuraDesk Tickets", "type": "Support Desk System"}',
            ']',
            'for p in projects:',
            '    print(f"Project: {p[\'name\']} | Type: {p[\'type\']}")',
        ],
    },
    'services.lua': {
        es: [
            '-- Configuración principal del portafolio',
            'local perfil = {',
            '    nombre = "Anthony Andino",',
            '    estado = "Disponible para trabajar",',
            '    intereses = {"Desarrollo Web", "Software Libre", "Neovim"}',
            '}',
            'print("Cargando portafolio de " .. perfil.nombre)',
        ],
        en: [
            '-- Main portfolio configuration',
            'local profile = {',
            '    name = "Anthony Andino",',
            '    status = "Open to work",',
            '    interests = {"Web Dev", "Open Source", "Neovim"}',
            '}',
            'print("Loading portfolio for " .. profile.name)',
        ],
    },
    'about.md': {
        es: [
            '# Quién Soy',
            '',
            'Desarrollador Junior apasionado por TypeScript, Node.js y React.',
            'Entusiasta del Software Libre y la creación de interfaces retro-futuristas.',
            '',
            '- Ubicación: Honduras 🇭🇳',
            '- Educación: Informática Administrativa (UNAH)',
            '- Estado: Abierto a oportunidades laborales',
        ],
        en: [
            '# About Me',
            '',
            'Junior Developer passionate about TypeScript, Node.js, and React.',
            'Open Source enthusiast building interactive retro-futuristic interfaces.',
            '',
            '- Location: Honduras 🇭🇳',
            '- Education: Informatics Administration (UNAH)',
            '- Status: Open to work / Available',
        ],
    },
};

interface ExplorerTreeProps {
    selectedFile: string;
    onSelectFile: (name: string) => void;
}

export function ExplorerTree({ selectedFile, onSelectFile }: ExplorerTreeProps) {
    return (
        <div className="font-mono text-[11px] leading-relaxed select-none h-full flex flex-col">
            <div className="space-y-1 overflow-y-auto flex-1">
                {FILES.map(f => {
                    const isSelected = f.name === selectedFile;
                    return (
                        <div
                            key={f.name}
                            onClick={() => onSelectFile(f.name)}
                            className={`flex items-center gap-2 cursor-pointer transition-all py-0.5 px-1 rounded ${
                                isSelected
                                    ? 'bg-[#7ee787]/15 text-[#7ee787] font-bold shadow-[inset_0_0_4px_rgba(126,231,135,0.1)]'
                                    : 'text-[#7ee787]/80 hover:text-[#7ee787] hover:bg-white/5'
                            }`}
                        >
                            {f.renderIcon()}
                            <span>{f.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

interface NeovimEditorProps {
    selectedFile: string;
    lang: 'es' | 'en';
}

export function NeovimEditor({ selectedFile, lang }: NeovimEditorProps) {
    const isDir = selectedFile === 'src/';
    const content = isDir
        ? [
            '-- Directory: src/',
            '-- Contiene los componentes del sistema',
            '-- [about.md]',
            '-- [skills.sh]',
            '-- [projects.py]',
            '-- [main.lua]'
          ]
        : FILE_CONTENTS[selectedFile]?.[lang] || ['-- No file open'];

    return (
        <div className="font-mono text-[11px] leading-relaxed select-none h-full overflow-y-auto overflow-x-hidden flex flex-col justify-between">
            <pre className="text-[#7ee787] leading-snug whitespace-pre-wrap break-words">
                {content.map((line, i) => (
                    <div key={i} className="flex hover:bg-white/5 py-0.5 whitespace-pre-wrap break-words">
                        <span className="text-[#6e7681] min-w-[3ch] text-right mr-3 select-none">{i + 1}</span>
                        <span className="flex-1 break-words whitespace-pre-wrap">{line}</span>
                    </div>
                ))}
            </pre>
            <div className="border-t border-[#7ee787]/20 bg-[#7ee787]/5 px-2 py-0.5 mt-2 flex justify-between text-[9px] text-[#6e7681]">
                <span>{selectedFile || 'about.md'}</span>
                <span>NORMAL</span>
            </div>
        </div>
    );
}

// Keep default export pointing to ExplorerTree for compatibility or reference
export default ExplorerTree;
