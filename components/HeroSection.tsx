'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

const ClayTurntable = dynamic(() => import('@/components/ClayTurntable'), { ssr: false })

// The hero is a viewport: a live clay render on a grey cyclorama.
export default function HeroSection() {
    return <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_62%_42%,#dfe1e4_0%,var(--cyc)_55%,#b4b8bd_100%)]">
        <div className="mx-auto grid min-h-[min(100svh,980px)] max-w-[1440px] grid-rows-[1fr_auto] px-6 pb-10 pt-28 sm:px-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:grid-rows-1 lg:items-end lg:pb-16 lg:pt-24">
            <div className="relative z-10 order-2 lg:order-1 lg:pb-10">
                <p className="mb-5 text-sm uppercase text-[var(--ink-soft)]">Free 3D projects / hard-surface studies</p>
                <h1 className="max-w-[12ch] text-[clamp(2.8rem,5.6vw,5.4rem)]">Free 3D projects, built down to the last bolt.</h1>
                <p className="mt-6 max-w-lg text-base leading-[1.75] text-[var(--ink-soft)] sm:text-lg">Explore Elizabeth Carlson’s hard-surface machines, environments and characters, then download selected 3D models and project files for personal and commercial use. Built in 3DS Max, Maya, Blender and ZBrush, with materials and presentation in Substance Painter and Unreal Engine.</p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link href="/free-models" className="select-ring inline-flex min-h-12 items-center rounded-full bg-[var(--ink)] px-6 font-semibold text-white">Browse free downloads</Link>
                    <Link href="/work" className="select-ring inline-flex min-h-12 items-center rounded-full border border-[var(--ink)] px-6 font-semibold">Explore the work</Link>
                </div>
            </div>
            <div className="relative order-1 min-h-[52vh] lg:order-2 lg:min-h-[80svh]">
                <ClayTurntable className="absolute inset-0" />
            </div>
        </div>
    </section>
}
