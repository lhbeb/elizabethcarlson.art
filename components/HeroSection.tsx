'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const artworks = [
    { src: '/metz-art/between-us-ii.webp', alt: 'Between Us II by Metz Benedek', position: 'center' },
    { src: '/metz-art/hero-figure-lime.png', alt: 'Figurative painting with a lime-yellow motif by Metz Benedek', position: 'center' },
    { src: '/metz-art/hero-figure-multiple.png', alt: 'Fragmented multiple-face painting by Metz Benedek', position: 'center' },
]

export default function HeroSection() {
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        if (motionQuery.matches) return

        const rotate = window.setTimeout(() => {
            setActiveIndex(current => (current + 1) % artworks.length)
        }, 9000)

        return () => window.clearTimeout(rotate)
    }, [activeIndex])

    return <section aria-label="A rotating selection of artworks by Metz Benedek" className="relative h-[clamp(29rem,68vw,54rem)] min-h-[460px] overflow-hidden bg-[#161415]">
        {artworks.map((artwork, index) => <Image key={artwork.src} src={artwork.src} alt={index === activeIndex ? artwork.alt : ''} fill priority={index === 0} sizes="100vw" className={`object-cover object-center transition-opacity duration-[1800ms] ease-in-out ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`} />)}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-8 bottom-10 sm:inset-x-12 sm:bottom-14 lg:inset-x-16 lg:bottom-16"><h1 className="max-w-4xl text-5xl leading-[.95] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,.4)] sm:text-7xl lg:text-8xl">METZ BENEDEK</h1><p className="mt-4 text-sm uppercase tracking-[.18em] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,.5)] sm:text-base">POLISH ARTIST · JAKARTA, INDONESIA</p></div>
    </section>
}

