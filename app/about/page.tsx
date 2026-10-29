import Link from 'next/link'
import Image from 'next/image'
import SupportBlock from '@/components/SupportBlock'
import { BMC_URL, CONTACT_EMAIL } from '@/lib/site'

export const metadata = {
    title: 'About | Elizabeth Ellen Carlson',
    description: 'Elizabeth Ellen Carlson is a 3D artist and creative educator: hard-surface models, characters, environments and free 3D assets.',
}

const makes = [
    'Hard-surface models and props',
    'Stylized characters and environments',
    'Materials, lighting and final renders',
    'Turntables and short motion loops for TikTok, Reels and Shorts',
    'Free downloadable 3D assets',
    'Tutorials and behind-the-scenes breakdowns',
]

export default function AboutPage() {
    return <main className="px-6 pb-16 pt-36 sm:px-10 sm:pt-40">
        <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
                <div>
                    <h1 className="text-[clamp(2.8rem,6vw,5.5rem)]">Hey, I’m Elizabeth</h1>
                    <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[var(--ink-soft)]">I’m a 3D artist and creative educator. I take ordinary ideas and turn them into scroll-stopping 3D work, and I teach other creators how to do the same.</p><a href={`mailto:${CONTACT_EMAIL}`} className="link-select mt-6 inline-block text-lg">{CONTACT_EMAIL}</a>
                </div>
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[var(--paper-muted)]"><Image src="/elizabeth-carlson-artist.jpg" alt="Elizabeth Carlson working on a 3D character in her studio" fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" /></div>
            </div>
            <div className="mt-24 grid gap-14 border-t border-[var(--line)] pt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <h2 className="text-[clamp(2rem,3.6vw,3.2rem)]">What I make</h2>
                <ul className="grid gap-x-10 gap-y-4 text-lg sm:grid-cols-2">{makes.map(item => <li key={item} className="border-b border-[var(--line)] pb-4">{item}</li>)}</ul>
            </div>
            <div className="mt-24 grid gap-14 border-t border-[var(--line)] pt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <h2 className="text-[clamp(2rem,3.6vw,3.2rem)]">Learn with me</h2>
                <div><p className="max-w-2xl text-lg leading-relaxed text-[var(--muted-text)]">Book a 4-hour private Zoom session. We build an attention-grabbing 3D scene together, step by step, from the first idea to the finished render.</p><div className="mt-8 flex flex-wrap gap-3"><a href={BMC_URL} target="_blank" rel="noopener noreferrer" className="select-ring inline-flex min-h-12 items-center rounded-full bg-[var(--ink)] px-6 font-semibold text-white">Ask about a session</a><Link href="/work" className="select-ring inline-flex min-h-12 items-center rounded-full border border-[var(--ink)] px-6 font-semibold">See the work</Link></div></div>
            </div>
            <div className="mt-24"><SupportBlock /></div>
        </div>
    </main>
}
