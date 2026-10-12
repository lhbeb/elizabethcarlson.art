'use client'

import Link from 'next/link'
import { ShoppingBag, Plus, X } from 'lucide-react'
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

    return <header className="absolute inset-x-0 top-0 z-50 text-[var(--ink)]">
        <div className="mx-auto flex items-start justify-between px-7 py-7 sm:px-10 sm:py-9 lg:px-14">
            <Link href="/" aria-label="Metz Benedek home" className="block font-display text-xl font-semibold uppercase tracking-[.12em] sm:text-2xl">METZ BENEDEK</Link>
            <div className="flex items-center gap-6">
                <nav className="hidden items-center gap-7 lg:flex">{links.map(link => <Link key={link.label} href={link.href} className="text-sm uppercase tracking-[.14em] transition-opacity hover:opacity-60">{link.label}</Link>)}</nav>
                <Link href="/cart" aria-label="View cart" className="transition-opacity hover:opacity-60"><ShoppingBag size={25} strokeWidth={1.3} /></Link>
                <button type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="transition-opacity hover:opacity-60">{menuOpen ? <X size={29} strokeWidth={1.2} /> : <Plus size={31} strokeWidth={1.2} />}</button>
            </div>
        </div>
        {menuOpen && <div className="border-y border-[var(--ink)] bg-[var(--paper)] px-8 py-7 lg:hidden"><nav className="flex flex-col gap-4">{links.map(link => <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="text-sm uppercase tracking-[.16em]">{link.label}</Link>)}</nav></div>}
    </header>
}
