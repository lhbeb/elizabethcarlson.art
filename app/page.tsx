import Image from 'next/image'
import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import ProductGrid from '@/components/ProductGrid'
import SupportSection from '@/components/SupportSection'
import FeaturedCollections from '@/components/FeaturedCollections'

export default function HomePage() {
    return <div><HeroSection /><main id="page"><section className="bg-[#e7e7e7]"><div className="mx-auto grid max-w-[1320px] items-center gap-10 px-6 py-16 sm:px-12 sm:py-20 lg:grid-cols-[.95fr_1.05fr] lg:gap-20 lg:px-16 lg:py-28"><div className="relative aspect-[4/5] w-full overflow-hidden bg-white"><Image src="/metz-art/metz-in-studio.jpg" alt="Metz Benedek in his studio beside a painting in progress" fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover object-center" /></div><div className="max-w-2xl py-2 lg:py-8"><p className="mb-5 text-xs uppercase tracking-[.16em] text-[var(--accent)]">Artist &amp; vision</p><h1 className="max-w-xl text-4xl leading-tight sm:text-5xl">The human figure, seen in fragments.</h1><p className="mt-7 max-w-xl text-lg italic leading-8">Polish figurative artist Metz Benedek works in oil, acrylic and pencil. Through interrupted faces, repeated features and exposed ground, his portraits explore how identity shifts between what we recognize and what remains uncertain.</p><Link href="/about" className="mt-8 inline-block border-b border-[var(--ink)] pb-1 text-sm uppercase tracking-[.16em] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]">Explore the artist’s practice</Link></div></div></section><FeaturedCollections /><ProductGrid /><SupportSection /></main></div>
}
