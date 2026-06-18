import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Anthony Andino - Software and Web Developer',
    description: 'Portfolio interactivo de Anthony Andino.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body>{children}</body>
        </html>
    );
}