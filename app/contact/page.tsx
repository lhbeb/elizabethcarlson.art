import Link from 'next/link'
import { ArrowUpRight, Mail, MessageCircle, ShoppingBag } from 'lucide-react'
import { BMC_URL, CONTACT_EMAIL } from '@/lib/site'

export const metadata = {
    title: 'Contact Elizabeth Carlson',
    description: 'Contact 3D artist Elizabeth Carlson about commissions, 3D assets, collaborations, or an order.',
}

export default function ContactPage() {
    return <main className="min-h-screen">
        <section className="border-b border-[var(--line)] bg-[var(--paper-bright)]"><div className="mx-auto max-w-5xl px-6 pb-16 pt-40 sm:pb-20 sm:pt-44"><h1 className="max-w-3xl font-display text-3xl font-semibold leading-snug sm:text-4xl">Contact Elizabeth Carlson</h1><p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--muted-text)]">For commissions, asset questions, collaborations or order help, email me directly. Buy Me a Coffee is available for optional studio support.</p></div></section>
        <section className="mx-auto grid max-w-5xl gap-5 px-6 py-14 sm:grid-cols-3 sm:py-20">
            <a href={`mailto:${CONTACT_EMAIL}`} className="group border-t-2 border-[var(--line)] py-6 transition-colors hover:border-[var(--accent)]"><Mail size={22} className="mb-5 text-[var(--accent)]" /><h2 className="font-display text-xl font-semibold group-hover:text-[var(--accent)]">Email Elizabeth</h2><p className="mt-3 text-sm leading-relaxed text-[var(--muted-text)]">For commissions, collaborations, asset questions or order help.</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">Send an email <ArrowUpRight size={15} /></span></a>
            <a href={BMC_URL} target="_blank" rel="noopener noreferrer" className="group border-t-2 border-[var(--line)] py-6 transition-colors hover:border-[var(--accent)]"><MessageCircle size={22} className="mb-5 text-[var(--accent)]" /><h2 className="font-display text-xl font-semibold group-hover:text-[var(--accent)]">Buy Me a Coffee</h2><p className="mt-3 text-sm leading-relaxed text-[var(--muted-text)]">Message me or support the studio from the creator page.</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">Open creator page <ArrowUpRight size={15} /></span></a>
            <Link href="/collections" className="group border-t-2 border-[var(--line)] py-6 transition-colors hover:border-[var(--accent)]"><ShoppingBag size={22} className="mb-5 text-[var(--accent)]" /><h2 className="font-display text-xl font-semibold group-hover:text-[var(--accent)]">Visit the shop</h2><p className="mt-3 text-sm leading-relaxed text-[var(--muted-text)]">See current 3D work and asset packs.</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">Browse the shop <ArrowUpRight size={15} /></span></Link>
        </section>
        <div className="mx-auto max-w-5xl px-6 pb-16"><Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline">Meet Elizabeth <ArrowUpRight size={15} /></Link></div>
    </main>
}
