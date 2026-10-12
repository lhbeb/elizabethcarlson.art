import Link from 'next/link'
import { ArrowUpRight, MessageCircle, ShoppingBag } from 'lucide-react'

export const metadata = {
    title: 'Contact Metz Benedek',
    description: 'Contact visual artist Metz Benedek about artwork, prints, or your order.',
}

const creatorUrl = 'https://buymeacoffee.com/csornaimetzbenedek'

export default function ContactPage() {
    return <main className="min-h-screen">
        <section className="border-b border-[var(--line)] bg-[var(--paper-bright)]"><div className="mx-auto max-w-5xl px-6 py-16 sm:py-20"><h1 className="max-w-3xl font-display text-3xl font-semibold leading-snug sm:text-4xl">Contact Metz Benedek</h1><p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--muted-text)]">For artwork questions, print details, or a note about the studio, send a message through Buy Me a Coffee.</p></div></section>
        <section className="mx-auto grid max-w-5xl gap-5 px-6 py-14 sm:grid-cols-2 sm:py-20">
            <a href={creatorUrl} target="_blank" rel="noopener noreferrer" className="group border-t-2 border-[var(--line)] py-6 transition-colors hover:border-[var(--cobalt)]"><MessageCircle size={22} className="mb-5 text-[var(--cobalt)]" /><h2 className="font-display text-xl font-semibold group-hover:text-[var(--cobalt)]">Message Metz Benedek</h2><p className="mt-3 text-sm leading-relaxed text-[var(--muted-text)]">For questions about artworks, prints, or orders.</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">Open creator page <ArrowUpRight size={15} /></span></a>
            <a href={creatorUrl} target="_blank" rel="noopener noreferrer" className="group border-t-2 border-[var(--line)] py-6 transition-colors hover:border-[var(--cobalt)]"><MessageCircle size={22} className="mb-5 text-[var(--cobalt)]" /><h2 className="font-display text-xl font-semibold group-hover:text-[var(--cobalt)]">Buy Me a Coffee</h2><p className="mt-3 text-sm leading-relaxed text-[var(--muted-text)]">Visit the creator page to get in touch or support the studio.</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">Open creator page <ArrowUpRight size={15} /></span></a>
            <a href="/collections" className="group border-t-2 border-[var(--line)] py-6 transition-colors hover:border-[var(--coral)]"><ShoppingBag size={22} className="mb-5 text-[var(--coral)]" /><h2 className="font-display text-xl font-semibold group-hover:text-[var(--coral)]">Visit the shop</h2><p className="mt-3 text-sm leading-relaxed text-[var(--muted-text)]">See current paintings, prints, and available work.</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">Browse artworks <ArrowUpRight size={15} /></span></a>
        </section>
        <div className="mx-auto max-w-5xl px-6 pb-16"><Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--cobalt)] hover:underline">Meet Metz Benedek <ArrowUpRight size={15} /></Link></div>
    </main>
}
