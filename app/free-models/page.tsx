import type { Metadata } from 'next'
import Link from 'next/link'
import { freeModels } from '@/lib/free-models'

export const metadata: Metadata = {
    title: 'Free 3D Models',
    description: 'Free 3D models and production studies from Elizabeth Carlson.',
}

export default function FreeModelsPage() {
    return <main className="px-6 pb-24 pt-40 sm:px-10 sm:pb-32">
        <div className="mx-auto max-w-[1440px]">
            <header className="max-w-3xl">
                <p className="text-sm uppercase text-[var(--muted-text)]">Free downloads</p>
                <h1 className="mt-5 text-[clamp(3rem,8vw,7.5rem)] leading-[.92]">3D models to build with.</h1>
                <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[var(--muted-text)]">Free 3D models for personal and commercial use. Explore the work, inspect the topology and use the files in your own projects. Download access is hosted through Buy Me a Coffee extras, with support optional.</p>
            </header>

            <section className="mt-24 border-t border-[var(--line)] pt-10">
                <div className="columns-1 gap-8 sm:columns-2">
                    {freeModels.map((model, index) => <article key={model.slug} className="mb-8 break-inside-avoid">
                        <Link href={`/free-models/${model.slug}`} className="select-ring group block">
                            <img src={model.cover} alt={model.title} className="block h-auto w-full transition-opacity group-hover:opacity-80" />
                            <div className="mt-5 flex items-baseline justify-between gap-4">
                                <h2 className="text-2xl sm:text-3xl">{model.title}</h2>
                                <span className="shrink-0 text-sm text-[var(--muted-text)]">{String(index + 1).padStart(2, '0')}</span>
                            </div>
                        </Link>
                        <p className="mt-3 text-lg leading-relaxed text-[var(--muted-text)]">{model.summary}</p>
                        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--muted-text)]"><span>{model.format}</span><span>{model.compatibility}</span><span>{model.license}</span></div>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <a href={model.downloadUrl} target="_blank" rel="noopener noreferrer" className="select-ring inline-flex min-h-12 items-center rounded-full bg-[var(--ink)] px-7 font-semibold text-white">Access free files</a>
                            <Link href={`/free-models/${model.slug}`} className="select-ring inline-flex min-h-12 items-center rounded-full border border-[var(--ink)] px-7 font-semibold">View model</Link>
                        </div>
                    </article>)}
                </div>
            </section>
        </div>
    </main>
}
