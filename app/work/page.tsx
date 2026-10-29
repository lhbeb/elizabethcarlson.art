import Link from 'next/link'
import type { Metadata } from 'next'
import { projects } from '@/lib/projects'
import SupportBlock from '@/components/SupportBlock'
import RenderPanel from '@/components/RenderPanel'

export const metadata: Metadata = {
    title: 'Work | Elizabeth Carlson',
    description: '3D portfolio of Elizabeth Carlson: hard-surface models, characters, environments and renders.',
}

export default function WorkPage() {
    return <main className="px-6 pb-16 pt-36 sm:px-10 sm:pt-40">
        <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end">
                <h1 className="text-[clamp(2.8rem,6vw,5.5rem)]">Work</h1>
                <p className="max-w-xl text-lg leading-relaxed text-[var(--muted-text)]">Each project comes with a breakdown: block-out, high-res model, materials and final render.</p>
            </div>
            {projects.length ? <div className="mt-16 columns-1 gap-8 sm:columns-2">
                {projects.map(project => <Link key={project.slug} href={`/work/${project.slug}`} className="select-ring group mb-8 block break-inside-avoid rounded-xl">
                    <img src={project.cover} alt={project.title} className="block h-auto w-full" />
                    <div className="mt-5 flex items-baseline justify-between gap-4"><h2 className="text-2xl sm:text-3xl">{project.title}</h2>{project.year && <span className="text-[var(--muted-text)]">{project.year}</span>}</div>
                </Link>)}
            </div> : <div className="mt-16 grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"><div className="relative aspect-video overflow-hidden rounded-xl"><RenderPanel variant="mono" /></div><p className="text-xl leading-relaxed text-[var(--muted-text)]">The first projects are rendering now. Supporters on Buy Me a Coffee see them first.</p></div>}
            <div className="mt-24"><SupportBlock /></div>
        </div>
    </main>
}
