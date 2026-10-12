import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Layers3, Pencil, Sparkles } from 'lucide-react'

export const metadata = {
    title: 'About Metz Benedek',
    description: 'Meet Metz Benedek, a visual artist based in Jakarta, Indonesia.',
}

const principles = [
    { icon: Pencil, title: 'Made for the mark', description: 'A brush should make it easier to find the line, texture, or finish you have in mind.' },
    { icon: Layers3, title: 'Built for real workflows', description: 'Brushes belong in the middle of making, ready to try, combine, and make your own.' },
    { icon: Sparkles, title: 'Keep experimenting', description: 'Digital tools are most useful when they invite you to take the piece somewhere unexpected.' },
]

export default function AboutPage() {
    return <main className="min-h-screen">
        <section className="border-b border-[var(--line)] bg-[var(--ink)] text-white"><div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-12 sm:py-16 md:grid-cols-[minmax(0,1fr)_minmax(220px,320px)] lg:gap-16 lg:px-8 lg:py-20"><div><h1 className="max-w-3xl font-display text-3xl font-semibold leading-snug sm:text-4xl">Hi, I’m Metz Benedek.</h1><p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">I’m a self-taught visual artist living and working in Jakarta, Indonesia, making paintings, drawings, and archival quality prints.</p></div><div className="relative mx-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden border border-white/15"><Image src="/lucy/self-portrait.gif" alt="Animated self-portrait artwork by Metz Benedek" fill priority sizes="(min-width: 768px) 320px, 80vw" className="object-cover object-center" /></div></div></section>
        <div className="mx-auto max-w-5xl space-y-16 px-6 py-14 sm:py-20">
            <section className="max-w-3xl text-lg leading-relaxed text-[var(--muted-text)]"><p>My practice explores the invisible things within us through representational and abstract forms, figures, marks, and empty space.</p><p className="mt-5">Browse the current paintings, drawings, and archival quality prints through the shop. Each listing includes its available images, details, and purchase information.</p></section>
            <section className="grid gap-5 md:grid-cols-3">{principles.map(({ icon: Icon, title, description }) => <article key={title} className="border-t-2 border-[var(--line)] py-5"><Icon size={20} className="mb-5 text-[var(--cobalt)]" /><h2 className="font-display text-xl font-semibold">{title}</h2><p className="mt-2 text-sm leading-relaxed text-[var(--muted-text)]">{description}</p></article>)}</section>
            <section className="flex flex-col items-start justify-between gap-5 border-t border-[var(--line)] pt-8 sm:flex-row sm:items-center"><h2 className="font-display text-2xl font-semibold">Explore the artworks.</h2><Link href="/collections" className="inline-flex items-center gap-2 rounded-md bg-[var(--ink)] px-5 py-3 font-bold text-white hover:bg-[var(--cobalt)]">Visit the art shop <ArrowUpRight size={15} /></Link></section>
        </div>
    </main>
}
