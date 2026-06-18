export interface Experience {
    period: string;
    title: { en: string; es: string };
    description: { en: string; es: string };
    highlights: { en: string[]; es: string[] };
    tech: string[];
}

export interface Education {
    period: string;
    degree: { en: string; es: string };
    institution: string;
    details: { en: string; es: string };
}

export interface Service {
    title: { en: string; es: string };
    description: { en: string; es: string };
}

export const profile = {
    name: 'Anthony Andino',
    role: {
        en: 'Junior Software Developer',
        es: 'Desarrollador de Software Junior',
    },
    location: 'Honduras 🇭🇳',
    bio: {
        en: "Hi, I'm a junior developer with a strong interest in web development and software development. I enjoy building projects, learning new technologies, and improving my programming skills. Currently focused on developing practical projects and gaining real-world experience in the IT field.",
        es: "Hola, soy un desarrollador junior con un gran interés en el desarrollo web y de software. Me divierte construir proyectos, aprender de nuevas tecnologías y mejorar mis habilidades de programación. Actualmente me enfoco en desarrollar proyectos prácticos y obtener experiencia real en el rubro TI.",
    },
    status: {
        en: 'Open to work / Available',
        es: 'Disponible para trabajar',
    },
    github: 'https://github.com/AnthonyAndino',
    linkedin: 'https://www.linkedin.com/in/anthony-andino-aa6bb1323',
    email: 'anthonyandino959@gmail.com',
    instagram: 'https://www.instagram.com/aandino_07/?hl=en',
};

export const experience: Experience[] = [
    {
        period: 'Sep 2025 - Ene 2026',
        title: {
            en: 'Web Development / Systems Intern - Porsalud',
            es: 'Practicante de Desarrollo Web / Sistemas - Porsalud',
        },
        description: {
            en: 'Internship at Porsalud supporting the maintenance and improvement of a user management web platform. Worked with C#, JavaScript, and SQL Server in the system environment.',
            es: 'Práctica profesional en Porsalud apoyando en el mantenimiento y mejora de una plataforma web de gestión de usuarios. Trabajé con C#, JavaScript y SQL Server en el entorno del sistema.',
        },
        highlights: {
            en: [
                'Supported maintenance and improvement of a user management web platform',
                'Worked with C#, JavaScript, and SQL Server technologies',
                'Collaborated on reviewing in-development features',
                'Identified and reported application issues',
                'Participated in system process validation',
            ],
            es: [
                'Apoyé en el mantenimiento y mejora de una plataforma web de gestión de usuarios',
                'Trabajé con tecnologías como C#, JavaScript y SQL Server',
                'Colaboré en la revisión de funcionalidades en desarrollo',
                'Identifiqué y reporté incidencias en la aplicación',
                'Participé en la validación de procesos dentro del sistema',
            ],
        },
        tech: ['C#', 'JavaScript', 'SQL Server'],
    },
    {
        period: '2024',
        title: {
            en: 'Database Assistant - Private Business',
            es: 'Asistente de Base de Datos - Empresa Privada',
        },
        description: {
            en: 'Provided database support for a private company, creating SQL queries to extract and analyze customer data. Generated key reports for administrative decision-making and gained hands-on experience in database management.',
            es: 'Soporte de base de datos para una empresa privada, creando consultas SQL para extraer y analizar datos de clientes. Generación de informes clave para la toma de decisiones administrativas y experiencia práctica en gestión de bases de datos.',
        },
        highlights: {
            en: [
                'Created SQL queries to extract and analyze customer data',
                'Generated reports for administrative use and decision-making',
                'Hands-on experience with relational databases and MariaDB',
                'Data filtering, organization, and efficient analysis',
            ],
            es: [
                'Creación de consultas SQL para extraer y analizar datos de clientes',
                'Generación de informes administrativos para toma de decisiones',
                'Experiencia práctica con bases de datos relacionales y MariaDB',
                'Filtrado, organización y análisis eficiente de datos',
            ],
        },
        tech: ['SQL', 'MariaDB', 'Excel'],
    },
    {
        period: '2023 - Present',
        title: {
            en: 'Self-taught Developer',
            es: 'Desarrollador Autodidacta',
        },
        description: {
            en: 'Continuous self-directed learning and project development across web, desktop, and database technologies. Building real-world applications to strengthen problem-solving and technical skills.',
            es: 'Aprendizaje autodidacta continuo y desarrollo de proyectos en tecnologías web, de escritorio y bases de datos. Creación de aplicaciones reales para fortalecer habilidades técnicas y de resolución de problemas.',
        },
        highlights: {
            en: [
                'Built full-stack web apps with React, Next.js, Node.js, and Python',
                'Developed database-driven applications with PostgreSQL, MySQL, and Prisma',
                'Created desktop applications with C++, Qt Framework, and C#',
                'Published a VS Code extension (Smart Theme Switcher)',
                'Built REST APIs with Django REST, Express, and Laravel',
            ],
            es: [
                'Creación de apps full-stack con React, Next.js, Node.js y Python',
                'Desarrollo de aplicaciones con PostgreSQL, MySQL y Prisma',
                'Creación de aplicaciones de escritorio con C++, Qt Framework y C#',
                'Publicación de una extensión de VS Code (Smart Theme Switcher)',
                'Construcción de APIs REST con Django REST, Express y Laravel',
            ],
        },
        tech: ['React', 'Next.js', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'MySQL', 'C++', 'Qt', 'Django', 'Laravel', 'Prisma'],
    },
];

export const education: Education[] = [
    {
        period: '2017 - 2019',
        degree: {
            en: 'High School',
            es: 'Bachillerato',
        },
        institution: '',
        details: {
            en: 'Completed secondary education with a focus on general academic subjects, developing foundational skills in mathematics, communication, and problem solving.',
            es: 'Educación secundaria completada con un enfoque general académico, desarrollando habilidades fundamentales en razonamiento matemático, lógica computacional y resolución de problemas.',
        },
    },
    {
        period: '2020 - 2026',
        degree: {
            en: "Bachelor's Degree in Informatics Administration",
            es: "Licenciatura en Administración de Empresas de Informática",
        },
        institution: 'Universidad Nacional Autónoma de Honduras (UNAH)',
        details: {
            en: 'Completed all required coursework and professional internship. Pending official graduation. Focused on programming, SQL databases, and system analysis.',
            es: 'Curso completo de asignaturas y práctica profesional en la Universidad Nacional Autónoma de Honduras (UNAH). Actualmente en espera de la titulación oficial. Enfocado en programación, bases de datos y análisis de sistemas.',
        },
    },
];

export const services: Service[] = [
    {
        title: {
            en: 'Programming & Development',
            es: 'Programación y Desarrollo',
        },
        description: {
            en: 'Experience with C, C++, Python, Java, web development (HTML, CSS, JS, PHP). Passionate about learning new technologies.',
            es: 'Experiencia con C, C++, Python, Java, desarrollo web (HTML, CSS, JS, PHP). Apasionado por aprender nuevas tecnologías.',
        },
    },
    {
        title: {
            en: 'Database Management',
            es: 'Gestión de Bases de Datos',
        },
        description: {
            en: 'SQL queries, data filtering, report generation. Knowledge of relational databases (MySQL, PostgreSQL, SQL Server) and MariaDB.',
            es: 'Consultas SQL, filtrado de datos, generación de informes. Conocimiento de bases de datos relacionales (MySQL, PostgreSQL, SQL Server) y MariaDB.',
        },
    },
    {
        title: {
            en: 'Data Analysis',
            es: 'Análisis de Datos',
        },
        description: {
            en: 'Skilled in Excel for data organization and reporting. Currently learning Power BI and modern data visualization tools.',
            es: 'Competente en Excel para la organización de datos y generación de reportes. Actualmente aprendiendo Power BI y herramientas de visualización.',
        },
    },
    {
        title: {
            en: 'IT Support & Systems',
            es: 'Soporte TI y Sistemas',
        },
        description: {
            en: 'Technical support, system configuration, troubleshooting. Software installation, networking basics, and system maintenance.',
            es: 'Soporte técnico, configuración de sistemas, resolución de problemas. Instalación de software, fundamentos de redes y mantenimiento.',
        },
    },
];

export const skills = {
    frontend: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind', 'Bootstrap', 'jQuery'],
    backend: ['C', 'C++', 'C#', 'Python', 'Java', 'PHP', 'Node.js', 'Express', 'Django', 'Laravel'],
    databases: ['MySQL', 'PostgreSQL', 'SQL Server', 'MongoDB', 'Prisma'],
    tools: ['Git', 'GitHub', 'VS Code', 'Visual Studio', 'PyCharm', 'WebStorm', 'Rider', 'Figma', 'Postman', 'Bash'],
};
