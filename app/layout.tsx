import type { Metadata } from 'next'
import '@fontsource-variable/bricolage-grotesque/wdth.css'
import '@fontsource-variable/manrope/index.css'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'

const title = `${SITE_NAME} | 3D Artist`

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title,
    description: SITE_DESCRIPTION,
    keywords: 'Elizabeth Carlson, 3D artist, 3D renders, 3D modeling, motion design, free 3D assets, 3D tutorials',
    alternates: { canonical: '/' },
    icons: { icon: '/favicon.png', shortcut: '/favicon.png', apple: '/favicon.png' },
    openGraph: { title, description: SITE_DESCRIPTION, url: '/', siteName: SITE_NAME, type: 'website' },
    twitter: { card: 'summary', title, description: SITE_DESCRIPTION },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <html lang="en"><body className="min-h-screen bg-[var(--paper)] text-[var(--ink)] antialiased"><Navbar /><main className="min-h-screen">{children}</main><Footer /></body></html>
}
