import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getProject, projects } from '@/lib/projects'
import SupportBlock from '@/components/SupportBlock'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
    return projects.map(project => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project = getProject((await params).slug)
    if (!project) return { title: 'Project not found | Elizabeth Carlson' }
    return { title: `${project.title} | Elizabeth Carlson`, description: project.summary, openGraph: { title: project.title, description: project.summary, images: [project.cover] } }
}

export default async function ProjectPage({ params }: Props) {
    const project = getProject((await params).slug)
    if (!project) notFound()

    return <main className="mx-auto max-w-[1180px] px-6 pb-16 pt-36 sm:px-10 sm:pt-40">
        <Link href="/work" className="inline-flex items-center gap-2 text-xs text-[var(--muted-text)] hover:text-[var(--ink)]"><ArrowLeft size={14} /> All work</Link>
        <h1 className="mt-6 text-[clamp(2.6rem,6vw,5.2rem)]">{project.title}</h1>
        {project.subtitle && <p className="mt-4 text-lg text-[var(--muted-text)]">{project.subtitle}</p>}
        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 border-y border-[var(--line)] py-5 text-sm">
            {project.role && <div><dt className="text-sm text-[var(--muted-text)]">Role</dt><dd className="mt-1">{project.role}</dd></div>}
            {project.year && <div><dt className="text-sm text-[var(--muted-text)]">Year</dt><dd className="mt-1">{project.year}</dd></div>}
            {project.tools?.length ? <div><dt className="text-sm text-[var(--muted-text)]">Tools</dt><dd className="mt-1">{project.tools.join(', ')}</dd></div> : null}
        </dl>
        {project.videoEmbedUrl ? <div className="relative mt-10 aspect-video overflow-hidden rounded-xl bg-black"><iframe src={project.videoEmbedUrl} title={project.title} className="absolute inset-0 h-full w-full" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
            : <img src={project.cover} alt={project.title} className="mt-10 block h-auto w-full" />}
        <div className="mt-12 max-w-3xl space-y-5 text-lg leading-8 text-[var(--muted-text)]"><p>{project.summary}</p>{project.body?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
        {project.gallery?.length ? <div className="mt-14 space-y-10">{project.gallery.map(image => <figure key={image.src} className="overflow-hidden"><img src={image.src} alt={image.alt} className="block h-auto w-full" /></figure>)}</div> : null}
        <div className="mt-16"><SupportBlock /></div>
    </main>
}
