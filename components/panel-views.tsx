'use client';
import { useState, useEffect, useRef } from 'react';
import { profile, skills, experience, education, services } from '@/data/profile';
import { projects } from '@/data/projects';
import { TechIcon } from '@/components/tech-icons';
import { User, Wrench, Briefcase, GraduationCap, Cpu, FolderCode, Share2, Mail, Terminal } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface ViewProps {
    onBack: () => void;
    lang: 'es' | 'en';
}

function Header({ title, onBack, lang, icon }: { title: string; onBack: () => void; lang?: 'es' | 'en'; icon?: React.ReactNode }) {
    const cleanTitle = title.startsWith('◆ ') ? title.slice(2) : title;
    return (
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#7ee787]/10">
            <span className="text-[#7ee787] font-mono text-xs font-bold glow-green flex items-center gap-1.5 select-none">
                {icon ? icon : <Terminal className="text-[#7ee787] w-3 h-3 stroke-[2] shrink-0" />}
                <span>{cleanTitle}</span>
            </span>
            <button
                onClick={onBack}
                className="text-[#6e7681] font-mono text-xs hover:text-[#7ee787] transition-colors"
            >
                {lang === 'es' ? '[ESC] volver' : '[ESC] back'}
            </button>
        </div>
    );
}

function useEsc(onBack: () => void) {
    const ref = useRef(onBack);
    ref.current = onBack;
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') ref.current();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);
}

export function WhoamiView({ onBack, lang }: ViewProps) {
    useEsc(onBack);
    return (
        <div className="flex flex-col h-full">
            <Header title={lang === 'es' ? '◆ QUIEN SOY' : '◆ WHOAMI'} onBack={onBack} lang={lang} icon={<User className="w-3.5 h-3.5 stroke-[2] shrink-0 text-[#7ee787]" />} />
            <div className="flex-1 font-mono text-sm space-y-3 overflow-y-auto pr-1">
                <div className="p-3 border border-[#7ee787]/15 rounded bg-black/20">
                    <p className="text-[#7ee787] font-bold glow-green text-base">{profile.name}</p>
                    <p className="text-[#79c0ff] text-xs mt-0.5">{profile.role[lang]}</p>
                    <p className="text-[#6e7681] text-xs mt-0.5">{profile.location}</p>
                    <div className="mt-3">
                        <p className="text-[#7ee787] text-xs leading-relaxed">{profile.bio[lang]}</p>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#7ee787] glow-green" />
                        <span className="text-[#7ee787] text-xs glow-green">{profile.status[lang]}</span>
                    </div>
                </div>

                <p className="text-[#79c0ff] text-xs font-bold glow-blue flex items-center gap-1.5 select-none">
                    <Share2 className="w-3 h-3 stroke-[2]" />
                    CONTACTO
                </p>
                <div className="p-3 border border-[#7ee787]/15 rounded bg-black/20 space-y-1">
                    <p className="text-[#6e7681] text-[11px]">
                        GitHub: <span className="text-[#79c0ff]">{profile.github}</span>
                    </p>
                    <p className="text-[#6e7681] text-[11px]">
                        LinkedIn: <span className="text-[#79c0ff]">{profile.linkedin}</span>
                    </p>
                    <p className="text-[#6e7681] text-[11px]">
                        Instagram: <span className="text-[#79c0ff]">{profile.instagram}</span>
                    </p>
                    <p className="text-[#6e7681] text-[11px]">
                        Email: <span className="text-[#79c0ff]">{profile.email}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export function SkillsView({ onBack, lang }: ViewProps) {
    useEsc(onBack);

    const bars = [
        { label: lang === 'es' ? 'Frontend' : 'Frontend', items: skills.frontend, pct: 85 },
        { label: lang === 'es' ? 'Backend' : 'Backend', items: skills.backend, pct: 75 },
        { label: lang === 'es' ? 'Bases de datos' : 'Databases', items: skills.databases, pct: 70 },
        { label: lang === 'es' ? 'Herramientas' : 'Tools', items: skills.tools, pct: 80 },
    ];

    return (
        <div className="flex flex-col h-full">
            <Header title="◆ SKILLS" onBack={onBack} lang={lang} icon={<Wrench className="w-3.5 h-3.5 stroke-[2] shrink-0 text-[#7ee787]" />} />
            <div className="flex-1 font-mono text-sm space-y-3 overflow-y-auto pr-1">
                {bars.map(bar => (
                    <div key={bar.label} className="p-3 border border-[#7ee787]/15 rounded bg-black/20">
                        <p className="text-[#79c0ff] text-xs font-bold mb-2">{bar.label}</p>
                        <div className="h-4 bg-black/40 rounded border border-[#7ee787]/10 relative overflow-hidden mb-2">
                            <div
                                className="h-full bg-[#7ee787]/30 rounded transition-all duration-500"
                                style={{ width: `${bar.pct}%` }}
                            />
                            <span className="absolute inset-0 flex items-center px-2 text-[10px] text-[#7ee787]/70">
                                {bar.pct}%
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {bar.items.map(item => (
                                <span
                                    key={item}
                                    className="inline-flex items-center gap-1.5 text-[10px] text-[#7ee787] bg-[#7ee787]/[0.06] border border-[#7ee787]/15 px-1.5 py-1 rounded-sm"
                                >
                                    <TechIcon name={item} size={16} color="#7ee787" />
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ExperienceView({ onBack, lang }: ViewProps) {
    useEsc(onBack);
    return (
        <div className="flex flex-col h-full">
            <Header title={lang === 'es' ? '◆ EXPERIENCIA' : '◆ EXPERIENCE'} onBack={onBack} lang={lang} icon={<Briefcase className="w-3.5 h-3.5 stroke-[2] shrink-0 text-[#7ee787]" />} />
            <div className="flex-1 font-mono text-sm space-y-3 overflow-y-auto pr-1">
                {experience.map((exp, i) => (
                    <div key={i} className="flex gap-3 p-3 border border-[#7ee787]/15 rounded bg-black/20">
                        <div className="flex flex-col items-center">
                            <div className="w-2 h-2 rounded-full bg-[#7ee787] glow-green mt-1" />
                            {i < experience.length - 1 && <div className="w-px flex-1 bg-[#7ee787]/10" />}
                        </div>
                        <div className="flex-1">
                            <p className="text-[#7ee787] text-xs font-bold glow-green">{exp.title[lang]}</p>
                            <p className="text-[#d9a066] text-[11px] mt-0.5">{exp.period}</p>
                            <p className="text-[#7ee787] text-[11px] mt-1.5 leading-relaxed">{exp.description[lang]}</p>
                            <ul className="mt-2 space-y-1">
                                {exp.highlights[lang].map((h, j) => (
                                    <li key={j} className="text-[#6e7681] text-[11px] flex gap-2">
                                        <span className="text-[#7ee787] shrink-0">▸</span>
                                        {h}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {exp.tech.map(t => (
                                    <span key={t} className="text-[10px] text-[#79c0ff] bg-[#79c0ff]/10 px-1.5 py-0.5 rounded">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function EducationView({ onBack, lang }: ViewProps) {
    useEsc(onBack);
    return (
        <div className="flex flex-col h-full">
            <Header title={lang === 'es' ? '◆ EDUCACIÓN' : '◆ EDUCATION'} onBack={onBack} lang={lang} icon={<GraduationCap className="w-3.5 h-3.5 stroke-[2] shrink-0 text-[#7ee787]" />} />
            <div className="flex-1 font-mono text-sm space-y-3 overflow-y-auto pr-1">
                {education.map((edu, i) => (
                    <div key={i} className="flex gap-3 p-3 border border-[#7ee787]/15 rounded bg-black/20">
                        <div className="flex flex-col items-center">
                            <div className="w-2 h-2 rounded-full bg-[#7ee787] glow-green mt-1" />
                            {i < education.length - 1 && <div className="w-px flex-1 bg-[#7ee787]/10" />}
                        </div>
                        <div className="flex-1">
                            <p className="text-[#7ee787] text-xs font-bold glow-green">{edu.degree[lang]}</p>
                            {edu.institution && (
                                <p className="text-[#79c0ff] text-[11px] mt-0.5">{edu.institution}</p>
                            )}
                            <p className="text-[#d9a066] text-[11px] mt-0.5">{edu.period}</p>
                            <p className="text-[#7ee787] text-[11px] mt-1 leading-relaxed">{edu.details[lang]}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ServicesView({ onBack, lang }: ViewProps) {
    useEsc(onBack);
    return (
        <div className="flex flex-col h-full">
            <Header title={lang === 'es' ? '◆ SERVICIOS' : '◆ SERVICES'} onBack={onBack} lang={lang} icon={<Cpu className="w-3.5 h-3.5 stroke-[2] shrink-0 text-[#7ee787]" />} />
            <div className="flex-1 font-mono text-sm space-y-3 overflow-y-auto pr-1">
                {services.map((s, i) => (
                    <div key={i} className="p-3 border border-[#7ee787]/15 rounded bg-black/20">
                        <p className="text-[#79c0ff] text-xs font-bold flex items-center gap-1.5">
                            <TechIcon name={s.title.en} size={18} color="#79c0ff" />
                            {s.title[lang]}
                        </p>
                        <p className="text-[#7ee787] text-[11px] mt-1.5 leading-relaxed">{s.description[lang]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ProjectsView({ onBack, lang }: ViewProps) {
    useEsc(onBack);
    const [selected, setSelected] = useState<string | null>(null);
    const p = selected ? projects.find(x => x.id === selected) : null;

    return (
        <div className="flex flex-col h-full">
            <Header title={lang === 'es' ? '◆ PROYECTOS' : '◆ PROJECTS'} onBack={onBack} lang={lang} icon={<FolderCode className="w-3.5 h-3.5 stroke-[2] shrink-0 text-[#7ee787]" />} />
            <div className="flex-1 font-mono text-sm space-y-3 overflow-y-auto pr-1">
                {!p ? (
                    projects.map(proj => (
                        <button
                            key={proj.id}
                            onClick={() => setSelected(proj.id)}
                            className="w-full text-left p-3 border border-[#7ee787]/15 rounded bg-black/20 hover:border-[#7ee787]/40 transition-all cursor-pointer"
                        >
                            <p className="text-[#7ee787] text-xs font-bold glow-green">{proj.name}</p>
                            <p className="text-[#7ee787] text-[11px] mt-1 leading-relaxed line-clamp-2">{proj.description[lang]}</p>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {proj.tech.map(t => (
                                    <span key={t} className="text-[10px] text-[#79c0ff] bg-[#79c0ff]/10 px-1.5 py-0.5 rounded">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </button>
                    ))
                ) : (
                    <div className="p-3 border border-[#7ee787]/15 rounded bg-black/20 space-y-3">
                        <div className="flex items-center justify-between">
                            <p className="text-[#7ee787] text-xs font-bold glow-green">{p.name}</p>
                            <button
                                onClick={() => setSelected(null)}
                                className="text-[#6e7681] text-[10px] hover:text-[#7ee787] transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {p.img && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={p.img}
                                alt={p.name}
                                className="w-full rounded border border-[#7ee787]/20 object-contain bg-black/40"
                                style={{ maxHeight: 400, height: 260 }}
                            />
                        )}

                        <p className="text-[#7ee787] text-xs leading-relaxed">{p.description[lang]}</p>

                        <div>
                            <p className="text-[#79c0ff] text-[11px] font-bold mb-1">
                                {lang === 'es' ? 'Stack' : 'Stack'}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {p.tech.map(t => (
                                    <span key={t} className="text-[10px] text-[#7ee787] bg-[#7ee787]/10 px-1.5 py-0.5 rounded">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-[#d9a066] text-[11px] font-bold mb-1">
                                {lang === 'es' ? 'Destacados' : 'Highlights'}
                            </p>
                            <ul className="space-y-1">
                                {p.highlights[lang].map((h, i) => (
                                    <li key={i} className="text-[#7ee787] text-[11px] flex gap-2">
                                        <span className="text-[#7ee787] shrink-0">✓</span>
                                        {h}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="pt-2 border-t border-[#7ee787]/10 space-y-1">
                            <p className="text-[10px]">
                                <span className="text-[#6e7681]">GitHub: </span>
                                <span className="text-[#79c0ff]">{p.github}</span>
                            </p>
                            {p.live && (
                                <p className="text-[10px]">
                                    <span className="text-[#6e7681]">Demo: </span>
                                    <span className="text-[#79c0ff]">{p.live}</span>
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export function SocialView({ onBack }: ViewProps) {
    useEsc(onBack);
    return (
        <div className="flex flex-col h-full">
            <Header title="◆ REDES" onBack={onBack} icon={<Share2 className="w-3.5 h-3.5 stroke-[2] shrink-0 text-[#7ee787]" />} />
            <div className="flex-1 font-mono text-sm space-y-2 overflow-y-auto pr-1">
                <div className="divide-y divide-[#7ee787]/10 border border-[#7ee787]/15 rounded bg-black/20">
                    {[
                        { label: 'GitHub', value: profile.github },
                        { label: 'LinkedIn', value: profile.linkedin },
                        { label: 'Instagram', value: profile.instagram },
                    ].map((s, i) => (
                        <div key={s.label} className={`flex items-center gap-3 p-2.5 ${i === 0 ? '' : 'border-t border-[#7ee787]/10'}`}>
                            <span className="text-[#79c0ff] text-[11px] font-bold w-16 shrink-0">{s.label}</span>
                            <span className="text-[#7ee787] text-[11px] truncate">{s.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function ContactView({ onBack, lang }: ViewProps) {
    useEsc(onBack);
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const result = await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                {
                    from_email: email,
                    subject: `[Portfolio] ${subject}`,
                    message,
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );

            if (result.status === 200) {
                setStatus('success');
                setEmail('');
                setSubject('');
                setMessage('');
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="flex flex-col h-full">
            <Header title="◆ CONTACT_ME" onBack={onBack} lang={lang} icon={<Mail className="w-3.5 h-3.5 stroke-[2] shrink-0 text-[#7ee787]" />} />
            <div className="flex-1 font-mono text-sm overflow-y-auto pr-1">
                <form onSubmit={handleSubmit} className="p-3 border border-[#7ee787]/15 rounded bg-black/20 space-y-3">
                    <div>
                        <p className="text-[#79c0ff] text-[11px] font-bold mb-1">
                            {lang === 'es' ? 'Tu correo' : 'Your email'}
                        </p>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder={lang === 'es' ? 'tucorreo@ejemplo.com' : 'you@example.com'}
                            className="w-full h-8 bg-black/40 border border-[#7ee787]/15 rounded px-2 text-[12px] text-[#7ee787] outline-none focus:border-[#7ee787]/40 font-mono placeholder:text-[#6e7681]"
                            required
                        />
                    </div>

                    <div>
                        <p className="text-[#79c0ff] text-[11px] font-bold mb-1">
                            {lang === 'es' ? 'Asunto' : 'Subject'}
                        </p>
                        <input
                            type="text"
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            placeholder={lang === 'es' ? 'Asunto del mensaje...' : 'Message subject...'}
                            className="w-full h-8 bg-black/40 border border-[#7ee787]/15 rounded px-2 text-[12px] text-[#7ee787] outline-none focus:border-[#7ee787]/40 font-mono placeholder:text-[#6e7681]"
                            required
                        />
                    </div>

                    <div>
                        <p className="text-[#79c0ff] text-[11px] font-bold mb-1">
                            {lang === 'es' ? 'Mensaje' : 'Message'}
                        </p>
                        <textarea
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            placeholder={lang === 'es' ? 'Escribe tu mensaje aquí...' : 'Write your message here...'}
                            rows={5}
                            className="w-full bg-black/40 border border-[#7ee787]/15 rounded px-2 py-1.5 text-[12px] text-[#7ee787] outline-none focus:border-[#7ee787]/40 font-mono placeholder:text-[#6e7681] resize-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full py-2 bg-[#7ee787]/10 border border-[#7ee787]/30 rounded text-[12px] text-[#7ee787] font-bold hover:bg-[#7ee787]/20 transition-colors cursor-pointer font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'sending' ? (
                            lang === 'es' ? '>_ Enviando comando...' : '>_ Connecting to mail server...'
                        ) : (
                            lang === 'es' ? '[ ENVIAR_MENSAJE ]' : '[ SEND_MESSAGE ]'
                        )}
                    </button>

                    {status === 'success' && (
                        <p className="text-[#7ee787] text-[11px] glow-green">
                            {'>_ '}{lang === 'es'
                                ? 'Mensaje enviado con éxito. Anthony se pondrá en contacto pronto.'
                                : 'Message sent successfully. Anthony will get back to you soon.'}
                        </p>
                    )}
                    {status === 'error' && (
                        <p className="text-[#ff7b72] text-[11px]">
                            {'>_ '}{lang === 'es'
                                ? 'Error: No se pudo establecer la conexión. Inténtalo de nuevo.'
                                : 'Error: Could not establish connection. Try again.'}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
