import Image from 'next/image'
import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import ProductGrid from '@/components/ProductGrid'
import SupportSection from '@/components/SupportSection'
import FeaturedCollections from '@/components/FeaturedCollections'

export default function HomePage() {
    return <div><HeroSection /><main id="page"><section className="bg-[#e7e7e7]"><div className="mx-auto grid max-w-[1320px] items-start gap-12 px-8 py-20 sm:px-12 sm:py-28 lg:grid-cols-[.8fr_1.2fr] lg:gap-24 lg:px-16"><div><h1 className="text-4xl sm:text-5xl">ABOUT</h1><div className="relative mt-12 hidden aspect-[.56] max-w-[300px] overflow-hidden lg:block"><Image src="/metz-art/self-portrait.gif" alt="Animated line drawing by Metz Benedek" fill sizes="300px" className="object-cover object-top" /></div></div><div className="max-w-2xl pt-1 text-center lg:pt-5 lg:text-left"><p className="text-lg italic leading-8">METZ BENEDEK is a Polish figurative artist based in Jakarta, Indonesia, working in oil, acrylic and pencil on wood panel.</p><p className="mt-8 text-lg italic leading-8">His paintings assemble faces and bodies from carefully observed fragments. Repeated features, exposed ground, drawn lines and isolated color turn the portrait into a space where recognition and uncertainty meet.</p><Link href="/about" className="mt-8 inline-block border-b border-[var(--ink)] pb-1 text-sm uppercase tracking-[.16em] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]">Learn more</Link><div className="relative mx-auto mt-12 aspect-[.56] max-w-[300px] overflow-hidden lg:hidden"><Image src="/metz-art/self-portrait.gif" alt="Animated line drawing by Metz Benedek" fill sizes="80vw" className="object-cover object-top" /></div></div></div></section><FeaturedCollections /><ProductGrid /><SupportSection /></main></div>
}
