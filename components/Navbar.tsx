'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import Wordmark from '@/components/Wordmark'
import { BMC_URL, SITE_NAME } from '@/lib/site'

const links = [
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/collections', label: 'Shop' },
    { href: '/free-models', label: 'Free models' },
    { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    return <header className="absolute inset-x-0 top-0 z-50 text-[var(--ink)]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-6 sm:px-10">
            <Link href="/" aria-label={`${SITE_NAME} home`} className="whitespace-nowrap text-sm sm:text-base"><Wordmark /></Link>
            <div className="flex items-center gap-2 sm:gap-6">
                <nav className="hidden items-center gap-7 text-[15px] md:flex">{links.map(link => <Link key={link.label} href={link.href} className="transition-colors hover:text-[var(--ink-soft)]">{link.label}</Link>)}</nav>
                <a href={BMC_URL} target="_blank" rel="noopener noreferrer" aria-label="Support Elizabeth Carlson on Buy Me a Coffee" className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-md bg-[#ffdd00] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"><Image src="/BMC1.png" alt="Buy Me a Coffee" width={1600} height={1600} className="h-9 w-9 object-contain" /></a>
                <button type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="inline-flex h-10 w-10 items-center justify-center md:hidden">{menuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}</button>
            </div>
        </div>
        {menuOpen && <div className="mx-4 rounded-lg bg-[var(--paper-bright)] px-6 py-5 shadow-[0_12px_30px_rgba(34,36,40,.15)] md:hidden"><nav className="flex flex-col gap-4 text-lg">{links.map(link => <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</Link>)}</nav></div>}
    </header>
}
