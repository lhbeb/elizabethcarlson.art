import Link from 'next/link'
import Image from 'next/image'
import SupportBlock from '@/components/SupportBlock'
import { CONTACT_EMAIL } from '@/lib/site'

export const metadata = {
    title: 'About | Elizabeth Carlson',
    description: 'Elizabeth Carlson is a 3D artist building hard-surface sci-fi environments, characters and props across 3DS Max, Maya, Blender, ZBrush, Wrap 3.0, Substance Painter and Unreal Engine.',
}

const makes = [
    'Hard-surface modeling in 3DS Max, Maya and Blender',
    'Character sculpting and form development in ZBrush',
    'Clean topology with Wrap 3.0 and Maya Quad Draw',
    'Substance Painter materials and Unreal Engine presentation',
    'Turntables, look-development studies and portfolio renders',
    'Free 3D models for personal and commercial use',
    'Process notes on modeling, topology and look development',
]

export default function AboutPage() {
    return <main className="px-6 pb-16 pt-36 sm:px-10 sm:pt-40">
        <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
                <div>
                    <h1 className="text-[clamp(2.8rem,6vw,5.5rem)]">Hey, I’m Elizabeth</h1>
                    <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[var(--ink-soft)]">I’m Elizabeth Carlson, a 3D artist building hard-surface sci-fi environments, characters and props. I care about structure that reads clearly, topology that supports the form, and the small mechanical decisions that make an imagined object feel engineered.</p><a href={`mailto:${CONTACT_EMAIL}`} className="link-select mt-6 inline-block text-lg">{CONTACT_EMAIL}</a>
                </div>
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[var(--paper-muted)]"><Image src="/elizabeth-carlson-artist.jpg" alt="Elizabeth Carlson working on a 3D character in her studio" fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" /></div>
            </div>
            <div className="mt-24 grid gap-14 border-t border-[var(--line)] pt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <h2 className="text-[clamp(2rem,3.6vw,3.2rem)]">What I make</h2>
                <ul className="grid gap-x-10 gap-y-4 text-lg sm:grid-cols-2">{makes.map(item => <li key={item} className="border-b border-[var(--line)] pb-4">{item}</li>)}</ul>
            </div>
            <div className="mt-24 grid gap-14 border-t border-[var(--line)] pt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <h2 className="text-[clamp(2rem,3.6vw,3.2rem)]">How I work</h2>
                <div><p className="max-w-2xl text-lg leading-relaxed text-[var(--muted-text)]">The portfolio documents a practical 3D workflow: reference and block-out first, then modeling, sculpting, topology, materials and presentation. The tools change with the project, from Maya, 3DS Max and Blender to ZBrush, Wrap 3.0, Substance Painter and Unreal Engine.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/work" className="select-ring inline-flex min-h-12 items-center rounded-full bg-[var(--ink)] px-6 font-semibold text-white">See the work</Link><Link href="/free-models" className="select-ring inline-flex min-h-12 items-center rounded-full border border-[var(--ink)] px-6 font-semibold">Free 3D models</Link></div></div>
            </div>
            <div className="mt-24"><SupportBlock /></div>
        </div>
    </main>
}
