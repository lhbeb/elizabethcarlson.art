import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

export const metadata = {
    title: 'About Metz Benedek',
    description: 'Meet Metz Benedek, a Polish figurative artist whose fragmented portraits explore presence, identity, and perception.',
}

export default function AboutPage() {
    return <main className="min-h-screen">
        <section className="border-b border-[var(--line)] bg-[var(--ink)] text-white"><div className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-12 pt-40 sm:pb-16 sm:pt-44 md:grid-cols-[minmax(0,1fr)_minmax(220px,320px)] lg:gap-16 lg:px-8 lg:pb-20 lg:pt-48"><div><h1 className="max-w-3xl font-display text-3xl font-semibold leading-snug sm:text-4xl">About Metz Benedek.</h1><p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">Metz Benedek is a Polish figurative artist living and working in Jakarta, Indonesia. Working in oil, acrylic and pencil, he paints fragmented portraits and psychologically charged figures.</p></div><div className="relative mx-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden border border-white/15"><Image src="/metzimg1.jpeg" alt="Metz Benedek working in the studio" fill priority sizes="(min-width: 768px) 320px, 80vw" className="object-cover object-center" /></div></div></section>
        <div className="mx-auto max-w-5xl space-y-16 px-6 py-14 sm:py-20">
            <section className="max-w-3xl text-lg leading-relaxed text-[var(--muted-text)]"><p>Metz paints figures and portraits that hover between presence and disappearance. Eyes, mouths, hands and areas of skin are rendered with close attention, while the rest of the body may remain unpainted, dissolve into the ground, or be interrupted by spare drawn marks.</p><p className="mt-5">Working primarily in oil, acrylic and pencil on wood panel, he uses repetition, doubling and cropped anatomy to unsettle a familiar face. Pale grounds, deep dark fields and isolated circles of red or yellow create quiet spaces in which identity feels layered, provisional and open to interpretation.</p></section>
            <section className="grid gap-6 sm:grid-cols-2"><div className="relative aspect-[.82] overflow-hidden bg-[var(--paper-muted)]"><Image src="/metzimg1.jpeg" alt="Metz Benedek working in the studio" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover object-center" /></div><div className="relative aspect-[.82] overflow-hidden bg-[var(--paper-muted)]"><Image src="/paul2.jpeg" alt="Metz Benedek smiling in the studio" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover object-center" /></div></section>
            <section className="flex flex-col items-start justify-between gap-5 border-t border-[var(--line)] pt-8 sm:flex-row sm:items-center"><h2 className="font-display text-2xl font-semibold">See the current work.</h2><Link href="/collections" className="inline-flex items-center gap-2 rounded-md bg-[var(--ink)] px-5 py-3 font-bold text-white hover:bg-[var(--cobalt)]">Visit the art shop <ArrowUpRight size={15} /></Link></section>
        </div>
    </main>
}
