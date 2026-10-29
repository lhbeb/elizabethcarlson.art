import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { freeModels, getFreeModel } from '@/lib/free-models'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
    return freeModels.map(model => ({ slug: model.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const model = getFreeModel((await params).slug)
    return model ? { title: model.title, description: model.summary } : {}
}

export default async function FreeModelPage({ params }: Props) {
    const model = getFreeModel((await params).slug)
    if (!model) notFound()
    const modelNumber = String(freeModels.findIndex(item => item.slug === model.slug) + 1).padStart(2, '0')

    return <main className="px-6 pb-24 pt-40 sm:px-10 sm:pb-32">
        <article className="mx-auto max-w-[1440px]">
            <Link href="/free-models" className="link-select text-sm">Back to free models</Link>
            <header className="mt-12 grid gap-10 border-b border-[var(--line)] pb-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
                <div><p className="text-sm uppercase text-[var(--muted-text)]">Free model {modelNumber}</p><h1 className="mt-5 text-[clamp(3rem,8vw,7.5rem)] leading-[.9]">{model.title}</h1></div>
                <div><p className="text-xl leading-relaxed text-[var(--muted-text)]">{model.summary}</p><a href={model.downloadUrl} target="_blank" rel="noopener noreferrer" className="select-ring mt-8 inline-flex min-h-12 items-center rounded-full bg-[var(--ink)] px-7 font-semibold text-white">Access free files</a></div>
            </header>
            <div className="mt-14 grid gap-6 border-b border-[var(--line)] pb-14 text-sm sm:grid-cols-2 lg:grid-cols-4"><div><p className="text-[var(--muted-text)]">Format</p><p className="mt-2 font-semibold">{model.format}</p></div><div><p className="text-[var(--muted-text)]">Compatibility</p><p className="mt-2 font-semibold">{model.compatibility}</p></div><div><p className="text-[var(--muted-text)]">License</p><p className="mt-2 font-semibold">{model.license}</p></div><div className="sm:col-span-2 lg:col-span-1"><p className="text-[var(--muted-text)]">Note</p><p className="mt-2 font-semibold">Free for personal and commercial use. Do not resell or redistribute the source files. Download access is hosted through Buy Me a Coffee extras, and support is optional.</p></div></div>
            <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"><div className="max-w-md space-y-5 text-lg leading-relaxed text-[var(--muted-text)]">{model.description.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div><div className="space-y-12">{model.gallery.map(image => <img key={image.src} src={image.src} alt={image.alt} className="block h-auto w-full" />)}</div></div>
        </article>
    </main>
}
