import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/lib/projects'

// Homepage spotlight for the first portfolio project (hidden until one exists).
export default function FeaturedProject() {
    const project = projects[0]
    if (!project) return null
    return <section className="bg-[var(--ink)] px-6 py-20 text-white sm:px-10 sm:py-28"><div className="mx-auto grid max-w-[1440px] items-end gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <Image src={project.cover} alt={project.title} width={1500} height={1500} priority sizes="(min-width: 1024px) 58vw, 100vw" className="block h-auto w-full" />
        <div><p className="text-white/60">Featured project{project.year ? `, ${project.year}` : ''}</p><h2 className="mt-3 text-[clamp(2.2rem,4.5vw,4rem)]">{project.title}</h2><p className="mt-6 text-lg leading-relaxed text-white/75">{project.summary}</p><Link href={`/work/${project.slug}`} className="link-select mt-8 inline-block text-lg text-white">Read the breakdown</Link></div>
    </div></section>
}
