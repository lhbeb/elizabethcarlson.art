import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
    metadataBase: new URL('https://www.metzbenedek.art'),
    title: 'Metz Benedek | Visual Artist',
    description: 'Metz Benedek is a Polish figurative artist based in Jakarta, known for fragmented portraits in oil, acrylic and pencil.',
    keywords: 'Metz Benedek, Polish figurative artist, fragmented portraits, contemporary portrait painting, oil acrylic pencil, paintings, prints',
    alternates: { canonical: '/' },
    icons: { icon: '/favicon.svg', shortcut: '/favicon.svg', apple: '/favicon.svg' },
    openGraph: {
        title: 'Metz Benedek | Visual Artist',
        description: 'Original paintings, drawings and archival quality prints by Metz Benedek, a Polish artist based in Jakarta.',
        url: '/', siteName: 'Metz Benedek', type: 'website',
    },
    twitter: { card: 'summary', title: 'Metz Benedek | Visual Artist', description: 'Original paintings, drawings and archival quality prints by Metz Benedek, a Polish artist based in Jakarta.' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <html lang="en"><body className="min-h-screen bg-[var(--paper)] text-[var(--ink)] antialiased"><Navbar /><main className="min-h-screen">{children}</main><Footer /></body></html>
}
