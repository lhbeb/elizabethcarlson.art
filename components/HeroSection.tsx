'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { BMC_URL } from '@/lib/site'

const ClayTurntable = dynamic(() => import('@/components/ClayTurntable'), { ssr: false })

// The hero is a viewport: a live clay render on a grey cyclorama.
export default function HeroSection() {
    return <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_62%_42%,#dfe1e4_0%,var(--cyc)_55%,#b4b8bd_100%)]">
        <div className="mx-auto grid min-h-[min(100svh,980px)] max-w-[1440px] grid-rows-[1fr_auto] px-6 pb-10 pt-28 sm:px-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:grid-rows-1 lg:items-end lg:pb-16 lg:pt-24">
            <div className="relative z-10 order-2 lg:order-1 lg:pb-10">
                <h1 className="max-w-[10ch] text-[clamp(2.8rem,5.6vw,5.4rem)]">Free 3D projects from an expert artist.</h1>
                <p className="mt-6 max-w-lg text-base leading-[1.75] text-[var(--ink-soft)] sm:text-lg">Explore Elizabeth Carlson’s portfolio of hard-surface models, characters and environments, with detailed project breakdowns and free 3D resources.</p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link href="/work" className="select-ring inline-flex min-h-12 items-center rounded-full bg-[var(--ink)] px-6 font-semibold text-white">See the work</Link>
                    <a href={BMC_URL} target="_blank" rel="noopener noreferrer" className="select-ring inline-flex min-h-12 items-center rounded-full border border-[var(--ink)] px-6 font-semibold">Support on Buy Me a Coffee</a>
                </div>
            </div>
            <div className="relative order-1 min-h-[52vh] lg:order-2 lg:min-h-[80svh]">
                <ClayTurntable className="absolute inset-0" />
            </div>
        </div>
    </section>
}
