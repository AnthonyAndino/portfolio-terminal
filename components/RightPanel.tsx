'use client';
import type { PanelContent } from '@/lib/commands';
import {
    WhoamiView,
    SkillsView,
    ExperienceView,
    EducationView,
    ServicesView,
    ProjectsView,
    SocialView,
    ContactView,
} from './panel-views';
import DinoGame from './DinoGame';
import BootAnimation from './BootAnimation';

interface Props {
    panel: PanelContent;
    onBackToGame: () => void;
    lang: 'es' | 'en';
}

export default function RightPanel({ panel, onBackToGame, lang }: Props) {
    return (
        <div className="flex flex-col h-full gap-2">
            <div className="flex-1 min-h-0">
                {panel.type === 'whoami' ? (
                    <WhoamiView onBack={onBackToGame} lang={lang} />
                ) : panel.type === 'skills' ? (
                    <SkillsView onBack={onBackToGame} lang={lang} />
                ) : panel.type === 'experience' ? (
                    <ExperienceView onBack={onBackToGame} lang={lang} />
                ) : panel.type === 'education' ? (
                    <EducationView onBack={onBackToGame} lang={lang} />
                ) : panel.type === 'services' ? (
                    <ServicesView onBack={onBackToGame} lang={lang} />
                ) : panel.type === 'projects' ? (
                    <ProjectsView onBack={onBackToGame} lang={lang} />
                ) : panel.type === 'social' ? (
                    <SocialView onBack={onBackToGame} lang={lang} />
                ) : panel.type === 'contact' ? (
                    <ContactView onBack={onBackToGame} lang={lang} />
                ) : panel.type === 'home' ? (
                    <BootAnimation />
                ) : panel.type === 'game' ? (
                    <DinoGame onClose={onBackToGame} />
                ) : null}
            </div>
        </div>
    );
}
