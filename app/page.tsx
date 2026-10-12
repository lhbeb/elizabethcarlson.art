import Image from 'next/image'
import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import ProductGrid from '@/components/ProductGrid'
import SupportSection from '@/components/SupportSection'
import FeaturedCollections from '@/components/FeaturedCollections'

export default function HomePage() {
    return <div><HeroSection /><main id="page"><section className="mx-auto grid max-w-[1320px] items-start gap-12 bg-[#e7e7e7] px-8 py-20 sm:px-12 sm:py-28 lg:grid-cols-[.8fr_1.2fr] lg:gap-24 lg:px-16"><div><h1 className="text-4xl sm:text-5xl">ABOUT</h1><div className="relative mt-12 hidden aspect-[.56] max-w-[300px] overflow-hidden lg:block"><Image src="/metzimg1.jpeg" alt="Metz Benedek working in the studio" fill sizes="300px" className="object-cover object-center" /></div></div><div className="max-w-2xl pt-1 text-center lg:pt-5 lg:text-left"><p className="text-lg italic leading-8">METZ BENEDEK is a Polish artist based in Jakarta, Indonesia. His work is shaped by the light, atmosphere, colors, and everyday visual language of Southeast Asia, with a particular connection to Bali.</p><p className="mt-8 text-lg italic leading-8">“I am interested in the feeling a place leaves behind: a color in the heat, a figure half-seen in the street, the rhythm of a room, or the quiet intensity of a tropical evening. Painting becomes a way to hold onto those impressions and turn them into something personal, layered, and open to interpretation.”</p><Link href="/about" className="mt-8 inline-block border-b border-[var(--ink)] pb-1 text-sm uppercase tracking-[.16em] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]">Learn more</Link><div className="relative mx-auto mt-12 aspect-[.56] max-w-[300px] overflow-hidden lg:hidden"><Image src="/metzimg1.jpeg" alt="Metz Benedek working in the studio" fill sizes="80vw" className="object-cover object-center" /></div></div></section><FeaturedCollections /><ProductGrid /><SupportSection /></main></div>
}
