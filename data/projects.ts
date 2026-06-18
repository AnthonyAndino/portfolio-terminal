export interface Project {
    id: string;
    name: string;
    description: { en: string; es: string };
    tech: string[];
    github: string;
    live?: string;
    img?: string;
    highlights: { en: string[]; es: string[] };
}

export const projects: Project[] = [
    {
        id: 'daymark',
        name: 'DayMark',
        description: {
            en: 'Full-stack habit tracker and journal app. Features interactive timelines, auto-streak calculation, multi-language support (ES/EN), and custom themes.',
            es: 'Habit tracker y diario full-stack. Cuenta con líneas de tiempo interactivas, cálculo automático de rachas, soporte multi-idioma (ES/EN) y temas personalizados.',
        },
        tech: ['React', 'Next.js', 'Tailwind v4', 'Prisma', 'PostgreSQL'],
        github: 'https://github.com/AnthonyAndino/DayMark',
        live: 'https://daymark-ochre.vercel.app/login',
        img: '/projects/daymark.png',
        highlights: {
            en: [
                'Interactive timelines for habit tracking',
                'Auto-streak calculation',
                'Multi-language support (ES/EN)',
                'Dracula & custom themes',
            ],
            es: [
                'Líneas de tiempo interactivas para el seguimiento de hábitos',
                'Cálculo automático de rachas',
                'Soporte multi-idioma (ES/EN)',
                'Tema Dracula y temas personalizados',
            ],
        },
    },
    {
        id: 'rh-manager',
        name: 'RH Manager',
        description: {
            en: 'Comprehensive HR dashboard with role-based authentication. Features attendance tracking with delay detection, automated payroll calculations, and interactive charts.',
            es: 'Dashboard completo de Recursos Humanos con autenticación por roles. Incluye registro de asistencia con detección de retrasos, cálculo automático de nómina y gráficos interactivos.',
        },
        tech: ['React', 'Django REST', 'MySQL', 'Bootstrap'],
        github: 'https://github.com/AnthonyAndino/rh-manager',
        img: '/projects/rh_manager.png',
        highlights: {
            en: [
                'Role-based authentication',
                'Attendance tracking with delay detection',
                'Automated payroll calculations',
                'Interactive charts and dashboards',
            ],
            es: [
                'Autenticación basada en roles',
                'Seguimiento de asistencia con detección de retrasos',
                'Cálculos automáticos de nómina',
                'Gráficos interactivos y paneles',
            ],
        },
    },
    {
        id: 'dsgn-studio',
        name: 'DSGN Creative Studio',
        description: {
            en: 'Modern creative studio landing page with dark mode, neon effects, and glassmorphism styling. Purely HTML/CSS without frameworks.',
            es: 'Página de inicio moderna para un estudio creativo con modo oscuro, efectos de neón y estilo glassmorphism. HTML/CSS puro sin frameworks.',
        },
        tech: ['HTML5', 'CSS3'],
        github: 'https://github.com/AnthonyAndino/DSGN-Creative-Landing-UI',
        live: 'https://anthonyandino.github.io/DSGN-Creative-Landing-UI/',
        img: '/projects/DSGN.png',
        highlights: {
            en: [
                'Dark mode design with neon effects',
                'Glassmorphism styling',
                'Pure HTML/CSS — no frameworks',
            ],
            es: [
                'Diseño en modo oscuro con efectos de neón',
                'Estilo de glassmorphism',
                'HTML/CSS puro, sin frameworks',
            ],
        },
    },
    {
        id: 'sistema-gestion',
        name: 'Sistema de Gestion (C++)',
        description: {
            en: 'Member management system with CRUD operations and a modern Qt GUI. Features real-time search, statistics dashboard, and CSV data export.',
            es: 'Sistema de gestión de miembros con operaciones CRUD y una interfaz gráfica Qt moderna. Cuenta con búsqueda en tiempo real, panel de estadísticas y exportación de datos a CSV.',
        },
        tech: ['C++', 'Qt Framework'],
        github: 'https://github.com/AnthonyAndino/SistemaGestionCPP',
        img: '/projects/cpp.png',
        highlights: {
            en: [
                'Full CRUD operations',
                'Real-time search',
                'Statistics dashboard',
                'CSV data export',
            ],
            es: [
                'Operaciones CRUD completas',
                'Búsqueda en tiempo real',
                'Panel de estadísticas',
                'Exportación de datos a CSV',
            ],
        },
    },
    {
        id: 'tickets',
        name: 'AuraDesk Tickets',
        description: {
            en: 'Modern help desk system for managing technical support tickets. Allows assigning, tracking, and resolving incidents efficiently with real-time notifications.',
            es: 'Sistema moderno de mesa de ayuda para la gestión de tickets de soporte técnico. Permite asignar, rastrear y resolver incidencias de manera eficiente con notificaciones en tiempo real.',
        },
        tech: ['Node.js', 'MySQL', 'JavaScript'],
        github: 'https://github.com/AnthonyAndino/sistema-tickets',
        img: '/projects/sistema_tickets.png',
        highlights: {
            en: [
                'Ticket assignment and tracking',
                'Real-time notifications',
                'Incident resolution workflow',
            ],
            es: [
                'Asignación y seguimiento de tickets',
                'Notificaciones en tiempo real',
                'Flujo de trabajo para resolución de incidencias',
            ],
        },
    },
    {
        id: 'smart-theme',
        name: 'Smart Theme Switcher',
        description: {
            en: 'VS Code extension that automatically switches themes based on project, time of day, programming language, or favorites rotation.',
            es: 'Extensión de VS Code que cambia automáticamente los temas según el proyecto, la hora del día, el lenguaje de programación o una rotación de favoritos.',
        },
        tech: ['TypeScript'],
        github: 'https://github.com/AnthonyAndino/Smart-Theme-Switcher-VS-Code-Extension-',
        img: '/projects/smart_theme.gif',
        highlights: {
            en: [
                'Auto-switch by project, time, or language',
                'Favorites rotation mode',
            ],
            es: [
                'Cambio automático por proyecto, hora o lenguaje',
                'Modo de rotación de favoritos',
            ],
        },
    },
];
