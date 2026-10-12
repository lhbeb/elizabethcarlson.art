'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const links = [
        { href: '/', label: 'Home' },
        { href: '/collections', label: 'Work' },
        { href: '/about', label: 'About' },
        { href: '/collections', label: 'Shop' },
        { href: '/contact', label: 'Contact' },
    ]

    return <header className="absolute inset-x-0 top-0 z-50 bg-gradient-to-b from-white/95 via-white/65 via-[68%] to-transparent pb-5 text-[var(--ink)]">
        <div className="mx-auto flex items-start justify-between px-7 py-7 sm:px-10 sm:py-9 lg:px-14">
            <Link href="/" aria-label="Metz Benedek home" className="block w-32 sm:w-56"><Image src="/metz%20logo.svg" alt="Metz Benedek" width={551} height={152} priority className="h-auto w-full" /></Link>
            <div className="flex items-center gap-3 sm:gap-6">
                <nav className="hidden items-center gap-7 lg:flex">{links.map(link => <Link key={link.label} href={link.href} className="text-sm uppercase tracking-[.14em] transition-opacity hover:opacity-60">{link.label}</Link>)}</nav>
                <a href="https://buymeacoffee.com/csornaimetzbenedek/extras" target="_blank" rel="noopener noreferrer" aria-label="Open Buy Me a Coffee shop" className="hidden transition-opacity hover:opacity-60 sm:inline-flex"><ShoppingBag size={25} strokeWidth={1.3} /></a>
                <a href="https://buymeacoffee.com/csornaimetzbenedek" target="_blank" rel="noopener noreferrer" aria-label="Support Metz Benedek on Buy Me a Coffee" className="block overflow-hidden rounded-md transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"><Image src="/buymeacoffeelogo2.png" alt="Buy Me a Coffee" width={1090} height={306} className="h-8 w-[114px] object-cover sm:h-9 sm:w-32" /></a>
                <button type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="transition-opacity hover:opacity-60 lg:hidden">{menuOpen ? <X size={28} strokeWidth={1.2} /> : <Menu size={28} strokeWidth={1.2} />}</button>
            </div>
        </div>
        {menuOpen && <div className="border-y border-[var(--ink)] bg-[var(--paper)] px-8 py-7 lg:hidden"><nav className="flex flex-col gap-4">{links.map(link => <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="text-sm uppercase tracking-[.16em]">{link.label}</Link>)}</nav></div>}
    </header>
}
