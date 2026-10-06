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

export interface Certificate {
    name: string;
    issuer: string;
    date: string;
    description: { en: string; es: string };
    tech: string[];
    file: string;
}

export interface Service {
    title: { en: string; es: string };
    description: { en: string; es: string };
}

export const profile = {
    name: 'Anthony Andino',
    fullName: 'Anthony Jafed Andino Marinero',
    role: {
        en: 'Licentiate in Informatics Administration | Web & Systems Developer',
        es: 'Licenciado en Informática Administrativa | Desarrollador Web y Sistemas',
    },
    location: 'Tegucigalpa, Honduras 🇭🇳',
    bio: {
        en: "Licentiate in Informatics Administration with experience in technical support, database incident resolution, and web development. Identified and corrected accounting discrepancies using SQL queries, maintained equipment and network infrastructure, and developed functionality and visual reports in web systems using C# and JavaScript. Knowledgeable in Linux, networking, and intermediate Excel.",
        es: "Licenciado en Informática Administrativa, con experiencia en soporte técnico, resolución de incidencias en bases de datos y desarrollo web. He identificado y corregido descuadres contables mediante consultas SQL, dado mantenimiento a equipos e infraestructura de red, y desarrollado funcionalidades y reportes visuales en sistemas web usando C# y JavaScript. Cuento con conocimientos de Linux y redes, y manejo intermedio de Excel.",
    },
    status: {
        en: 'Open to work / Available',
        es: 'Disponible para trabajar',
    },
    github: 'https://github.com/AnthonyAndino',
    linkedin: 'https://www.linkedin.com/in/anthony-andino-ad',
    phone: '+504 9901-4535',
    email: 'anthonyandino959@gmail.com',
    website: 'https://anthonyandino.vercel.app',
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
            en: 'Completed user management module in C# and JavaScript, resolved stored procedure issues in SQL Server, and conducted technical code reviews.',
            es: 'Implementación de funciones en C# y JavaScript para módulo de gestión de usuarios, resolución de incidencias en procedimientos almacenados y revisión técnica de código.',
        },
        highlights: {
            en: [
                'Implemented functions in C# and JavaScript to complete the user management module of a platform used by staff across multiple company locations (including international staff), fixing broken functionality and clock-in charts.',
                'Resolved issues in stored procedures and functions related to system logic, using test databases to validate fixes.',
                'Actively participated in technical code reviews for new features prior to production deployment.',
            ],
            es: [
                'Implementé funciones en C# y JavaScript para completar el módulo de gestión de usuarios de una plataforma utilizada por personal de múltiples sedes de la empresa, incluyendo colaboradores en otros países, corrigiendo funcionalidades incompletas y gráficos de marcaciones de entrada que no operaban correctamente.',
                'Resolví incidencias en procedimientos y funciones almacenadas relacionadas con la lógica del sistema, utilizando la base de datos de pruebas para validar las correcciones.',
                'Participé activamente en la revisión técnica de nuevas funcionalidades en etapa de desarrollo, verificando lógica de código y reportando errores antes de su implementación.',
            ],
        },
        tech: ['C#', 'JavaScript', 'SQL Server', 'SQL'],
    },
    {
        period: 'Ago 2024 - Oct 2024',
        title: {
            en: 'Technical Support Assistant - Cooperativa La Reyna',
            es: 'Asistente de Soporte Técnico - Cooperativa La Reyna',
        },
        description: {
            en: 'Resolved accounting discrepancy incidents via SQL queries, managed OS and file migrations, and troubleshot internal IP phones and network cabling.',
            es: 'Resolución de descuadres contables mediante consultas SQL, migración de sistemas operativos y archivos, y soporte a telefonía IP y cableado de red.',
        },
        highlights: {
            en: [
                'Identified and resolved 4 accounting discrepancy incidents by comparing database records to locate system differences.',
                'Executed SQL queries to validate and reconcile customer savings and credit account data.',
                'Migrated operating systems and files for 2 workstations to new hardware, guaranteeing data continuity during upgrades.',
                'Diagnosed and fixed 5 internal IP phones, replacing faulty network cabling and reassigning IP addresses to restore calling capability.',
            ],
            es: [
                'Identifiqué y resolví 4 incidencias de descuadres contables, comparando registros dentro de la base de datos para localizar diferencias registradas en el sistema.',
                'Ejecuté consultas SQL para la validación y corrección de datos en las cuentas de los clientes, resolviendo inconsistencias en cuentas de ahorro y crédito.',
                'Migré el sistema operativo y archivos de 2 computadoras hacia equipos nuevos, garantizando la continuidad de la información durante la actualización de hardware.',
                'Diagnostiqué y solucioné fallas en 5 teléfonos IP internos, incluyendo reemplazo de cableado de red defectuoso y reasignación de direcciones IP, restableciendo la recepción de llamadas.',
            ],
        },
        tech: ['SQL', 'Soporte Técnico', 'Redes', 'Linux', 'Excel'],
    },
    {
        period: '2023 - Presente',
        title: {
            en: 'Web & Software Developer',
            es: 'Desarrollador Web y de Software',
        },
        description: {
            en: 'Development of web application projects with JavaScript, TypeScript, React, and Python, including financial dashboards, REST APIs, and full-stack applications.',
            es: 'Desarrollo de proyectos de aplicaciones web con JavaScript, TypeScript, React y Python, incluyendo dashboards financieros, APIs REST y aplicaciones full-stack.',
        },
        highlights: {
            en: [
                'Developed web applications using JavaScript, TypeScript, React, and Next.js.',
                'Created a personal financial dashboard featuring KPI visualization, comparative charts, and expense distribution.',
                'Built full-stack web applications and developer utilities.',
            ],
            es: [
                'Desarrollo de proyectos web con JavaScript, TypeScript y React, incluyendo un dashboard financiero personal con visualización de indicadores, gráficos comparativos y distribución de gastos.',
                'Creación de aplicaciones web full-stack con PostgreSQL, MySQL, Node.js y Python.',
                'Publicación de herramientas para desarrolladores y proyectos de código abierto.',
            ],
        },
        tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Tailwind', 'PostgreSQL'],
    },
];

export const education: Education[] = [
    {
        period: 'Ene 2020 - Sep 2026',
        degree: {
            en: "Licentiate Degree in Informatics Administration",
            es: "Licenciatura en Informática Administrativa",
        },
        institution: 'Universidad Nacional Autónoma de Honduras (UNAH), Tegucigalpa, Honduras',
        details: {
            en: 'University degree focused on system administration, software development, relational database management, network infrastructure, and IT management.',
            es: 'Licenciatura enfocada en gestión de tecnologías de información, desarrollo de software, administración de bases de datos relacionales, infraestructura de redes y gestión de proyectos TI.',
        },
    },
];

export const certificates: Certificate[] = [
    {
        name: 'Python 101 for Data Science',
        issuer: 'CognitiveClass.ai (IBM)',
        date: 'Julio 2026',
        description: {
            en: 'Certification covering Python fundamentals for data science, data analysis, visualization with Matplotlib, and working with Pandas and NumPy.',
            es: 'Certificación que cubre los fundamentos de Python para ciencia de datos, análisis de datos, visualización con Matplotlib y uso de librerías como Pandas y NumPy.',
        },
        tech: ['Python', 'Data Science', 'Pandas', 'NumPy'],
        file: '/cv/Certificados/Python for Data Science.pdf',
    },
    {
        name: 'Introducción a Ciberseguridad',
        issuer: 'Cisco Networking Academy',
        date: 'Septiembre 2026',
        description: {
            en: 'Fundamental concepts of cybersecurity, threat intelligence, data protection, privacy, and organizational security best practices.',
            es: 'Conceptos fundamentales de ciberseguridad, amenazas cibernéticas, protección de datos y redes, privacidad y mejores prácticas de seguridad.',
        },
        tech: ['Ciberseguridad', 'Seguridad TI', 'Redes', 'Cisco'],
        file: '/cv/Certificados/Introduction_to_Cybersecurity_certificate_Anthony_Andino.pdf',
    },
    {
        name: 'Introduction to Linux (LFS101)',
        issuer: 'The Linux Foundation',
        date: 'Septiembre 2026',
        description: {
            en: 'Comprehensive Linux foundation training covering command line, system administration, filesystems, and shell environment.',
            es: 'Formación fundamental en Linux cubriendo la línea de comandos, administración del sistema, sistemas de archivos y entornos bash/shell.',
        },
        tech: ['Linux', 'Bash', 'Administración de Sistemas'],
        file: '/cv/Certificados/Introduction_to_Linux.pdf',
    },
    {
        name: 'Conceptos Básicos de Redes',
        issuer: 'Cisco Networking Academy',
        date: 'Octubre 2026',
        description: {
            en: 'Networking principles, OSI and TCP/IP models, IP addressing, media transmission, routing, and basic device configuration.',
            es: 'Principios de redes de computadoras, modelos OSI y TCP/IP, direccionamiento IP, medios de transmisión, enrutamiento y configuración básica de dispositivos.',
        },
        tech: ['Redes', 'Direccionamiento IP', 'TCP/IP', 'Cisco'],
        file: '/cv/Certificados/Networking_Basics.pdf',
    },
];

export const services: Service[] = [
    {
        title: {
            en: 'Web & Software Development',
            es: 'Desarrollo Web y Software',
        },
        description: {
            en: 'Full-stack & front-end development with JavaScript, TypeScript, React, Next.js, C#, Node.js, and Python.',
            es: 'Desarrollo web y de software usando JavaScript, TypeScript, React, Next.js, C#, Node.js y Python.',
        },
    },
    {
        title: {
            en: 'Database Incident Resolution & SQL',
            es: 'Resolución de Incidencias en BD y SQL',
        },
        description: {
            en: 'SQL queries, stored procedure debugging, data validation, accounting discrepancy fixes, and relational database management (MySQL, PostgreSQL, SQL Server).',
            es: 'Consultas SQL, corrección de procedimientos almacenados, validación de datos, resolución de descuadres contables y gestión de bases de datos relacionales (MySQL, PostgreSQL, SQL Server).',
        },
    },
    {
        title: {
            en: 'IT Support & Network Maintenance',
            es: 'Soporte Técnico y Redes',
        },
        description: {
            en: 'Hardware diagnostics and maintenance, OS migration, IP phone system troubleshooting, network cabling, and Linux support.',
            es: 'Diagnóstico y mantenimiento de hardware, migración de sistemas operativos, solución de fallas en telefonía IP, cableado de red y soporte en Linux.',
        },
    },
    {
        title: {
            en: 'Data Analysis & Excel',
            es: 'Análisis de Datos y Excel',
        },
        description: {
            en: 'Intermediate Excel data management, report generation, data filtering, and data science with Python.',
            es: 'Manejo intermedio de Excel para organización y análisis de datos, generación de reportes y ciencia de datos con Python.',
        },
    },
];

export const skills = {
    backend: ['C#', 'JavaScript', 'Node.js', 'PHP', 'Express', 'Python', 'C++', 'Java', 'C'],
    frontend: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind', 'Bootstrap', 'jQuery'],
    databases: ['MySQL', 'PostgreSQL', 'SQL', 'Prisma', 'MongoDB'],
    infrastructure: ['Soporte técnico', 'Mantenimiento de equipos', 'Redes básicas', 'Linux'],
    tools: ['Git', 'GitHub', 'Postman', 'Excel', 'VS Code', 'Visual Studio'],
    soft: ['Trabajo en equipo', 'Aprendizaje rápido', 'Adaptación a nuevos entornos'],
    languages: ['Español (nativo)', 'Inglés (B1 – intermedio)'],
};

