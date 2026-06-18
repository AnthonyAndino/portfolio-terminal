import {
    SiHtml5, SiCss, SiJavascript, SiTypescript,
    SiReact, SiNextdotjs, SiTailwindcss, SiBootstrap, SiJquery,
    SiC, SiPython, SiNodedotjs, SiExpress, SiCplusplus,
    SiPhp, SiDjango, SiLaravel, SiSharp,
    SiMysql, SiPostgresql, SiMongodb, SiPrisma,
    SiGit, SiGithub, SiVscodium,
    SiPycharm, SiWebstorm, SiRider, SiJetbrains,
    SiFigma, SiPostman, SiGnubash,
    SiCodepen, SiSqlite, SiPandas, SiLinux,
} from 'react-icons/si';
import {
    DiJava, DiVisualstudio, DiMsqlServer,
} from 'react-icons/di';
import type { IconType } from 'react-icons';

const mapping: Record<string, IconType> = {
    HTML: SiHtml5,
    CSS: SiCss,
    JavaScript: SiJavascript,
    TypeScript: SiTypescript,
    React: SiReact,
    'Next.js': SiNextdotjs,
    Tailwind: SiTailwindcss,
    Bootstrap: SiBootstrap,
    jQuery: SiJquery,
    Python: SiPython,
    'Node.js': SiNodedotjs,
    Express: SiExpress,
    C: SiC,
    'C++': SiCplusplus,
    'C#': SiSharp,
    Java: DiJava,
    PHP: SiPhp,
    Django: SiDjango,
    Laravel: SiLaravel,
    MySQL: SiMysql,
    PostgreSQL: SiPostgresql,
    'SQL Server': DiMsqlServer,
    MongoDB: SiMongodb,
    Prisma: SiPrisma,
    Git: SiGit,
    GitHub: SiGithub,
    'VS Code': SiVscodium,
    'Visual Studio': DiVisualstudio,
    PyCharm: SiPycharm,
    WebStorm: SiWebstorm,
    Rider: SiRider,
    Figma: SiFigma,
    Postman: SiPostman,
    Bash: SiGnubash,
    'Programming & Development': SiCodepen,
    'Database Management': SiSqlite,
    'Data Analysis': SiPandas,
    'IT Support & Systems': SiLinux,
};

export function TechIcon({ name, size = 16, color = '#7ee787' }: { name: string; size?: number; color?: string }) {
    const Icon = mapping[name];
    if (!Icon) return null;
    return (
        <Icon
            size={size}
            color={color}
            className="shrink-0"
            style={{ filter: `drop-shadow(0 0 3px ${color}66)` }}
        />
    );
}
