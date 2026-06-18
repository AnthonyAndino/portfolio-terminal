import { profile, skills, experience, education, services } from '@/data/profile';

export type OutputLine = {
    text: string;
    color?: 'green' | 'blue' | 'yellow' | 'red' | 'muted' | 'white';
    bold?: boolean;
};

export type PanelContent =
    | { type: 'whoami' }
    | { type: 'skills' }
    | { type: 'experience' }
    | { type: 'education' }
    | { type: 'services' }
    | { type: 'projects' }
    | { type: 'social' }
    | { type: 'contact' }
    | { type: 'game' }
    | { type: 'home' };

export type CommandResult =
    | { type: 'lines'; lines: OutputLine[]; panel?: PanelContent }
    | { type: 'clear' }
    | { type: 'unknown'; cmd: string };

export function runCommand(input: string, lang: 'es' | 'en' = 'es'): CommandResult {
    const parts = input.trim().toLowerCase().split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);

    const SHORT: OutputLine[] = [
        {
            text: lang === 'es' 
                ? '>_ Mostrando en pantalla secundaria.' 
                : '>_ Displaying on secondary screen.',
            color: 'green'
        },
    ];

    switch (cmd) {
        case 'help':
            return {
                type: 'lines',
                lines: lang === 'es' ? [
                    { text: 'Comandos disponibles:', color: 'green', bold: true },
                    { text: '' },
                    { text: '  whoami       → sobre mí', color: 'green' },
                    { text: '  skills       → mi stack tecnológico', color: 'green' },
                    { text: '  experience   → experiencia laboral', color: 'green' },
                    { text: '  education    → formación académica', color: 'green' },
                    { text: '  services     → servicios profesionales', color: 'green' },
                    { text: '  projects     → mis proyectos', color: 'green' },
                    { text: '  social       → redes sociales', color: 'green' },
                    { text: '  cv           → descargar CV', color: 'green' },
                    { text: '  contact      → contacto directo', color: 'green' },
                    { text: '  idioma <es|en> → cambiar idioma del portafolio', color: 'green' },
                    { text: '  dino         → 🦖 juego Dino Runner', color: 'green' },
                    { text: '  clear        → limpiar pantalla', color: 'muted' },
                    { text: '' },
                    { text: 'Los comandos de información se ven en el panel derecho.', color: 'muted' },
                ] : [
                    { text: 'Available commands:', color: 'green', bold: true },
                    { text: '' },
                    { text: '  whoami       → about me', color: 'green' },
                    { text: '  skills       → my technology stack', color: 'green' },
                    { text: '  experience   → work experience', color: 'green' },
                    { text: '  education    → academic history', color: 'green' },
                    { text: '  services     → professional services', color: 'green' },
                    { text: '  projects     → my projects', color: 'green' },
                    { text: '  social       → social networks', color: 'green' },
                    { text: '  cv           → download CV', color: 'green' },
                    { text: '  contact      → direct contact', color: 'green' },
                    { text: '  lang <es|en>  → change portfolio language', color: 'green' },
                    { text: '  dino         → 🦖 Dino Runner game', color: 'green' },
                    { text: '  clear        → clear screen', color: 'muted' },
                    { text: '' },
                    { text: 'Information commands are displayed in the right panel.', color: 'muted' },
                ],
            };

        case 'whoami':
            return {
                type: 'lines',
                lines: SHORT,
                panel: { type: 'whoami' },
            };

        case 'experience':
            return {
                type: 'lines',
                lines: SHORT,
                panel: { type: 'experience' },
            };

        case 'education':
            return {
                type: 'lines',
                lines: SHORT,
                panel: { type: 'education' },
            };

        case 'services':
            return {
                type: 'lines',
                lines: SHORT,
                panel: { type: 'services' },
            };

        case 'skills':
            return {
                type: 'lines',
                lines: SHORT,
                panel: { type: 'skills' },
            };

        case 'projects':
            return {
                type: 'lines',
                lines: SHORT,
                panel: { type: 'projects' },
            };

        case 'social':
            return {
                type: 'lines',
                lines: SHORT,
                panel: { type: 'social' },
            };

        case 'contact':
            return {
                type: 'lines',
                lines: SHORT,
                panel: { type: 'contact' },
            };

        case 'dino':
        case 'play':
            return {
                type: 'lines',
                lines: lang === 'es' ? [
                    { text: '🦖 DINO RUNNER', color: 'green', bold: true },
                    { text: '' },
                    { text: 'Controles: ESPACIO/↑ saltar, ↓ agacharse, ESC salir', color: 'muted' },
                ] : [
                    { text: '🦖 DINO RUNNER', color: 'green', bold: true },
                    { text: '' },
                    { text: 'Controls: SPACE/↑ jump, ↓ duck, ESC exit', color: 'muted' },
                ],
                panel: { type: 'game' },
            };

        case 'clear':
            return { type: 'clear' };

        case '':
            return { type: 'lines', lines: [] };

        default:
            return { type: 'unknown', cmd };
    }
}
