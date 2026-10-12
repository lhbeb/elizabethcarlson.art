import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Check, Download } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { brushProducts } from '@/lib/brushes'
import ManualPaywall from '@/components/ManualPaywall'

type PageProps = { params: Promise<{ id: string }> }

export function generateStaticParams() {
    return brushProducts.map(product => ({ id: product.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params
    const product = brushProducts.find(item => item.id === id)
    if (!product) return { title: 'Artwork not found | Metz Benedek' }
    return {
        title: `${product.name} | Metz Benedek`,
        description: product.description,
        openGraph: { title: `${product.name} | Metz Benedek`, description: product.description, images: [product.image] },
    }
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params
    const product = brushProducts.find(item => item.id === id)
    if (!product) notFound()

    return <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Link href="/#brushes" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted-text)] transition-colors hover:text-[var(--cobalt)]"><ArrowLeft size={16} /> Back to brushes</Link>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-16">
            <div className="relative aspect-square overflow-hidden rounded-md border border-[var(--line)] bg-[var(--paper)]">
                <Image src={product.image} alt={product.imageAlt} fill priority sizes="(min-width: 1024px) 52vw, 100vw" className={product.imageCropRight ? 'object-cover object-left origin-left scale-[1.35]' : 'object-contain'} />
            </div>
            <div className="flex flex-col items-start py-1 lg:py-6">
                <h1 className="font-display text-3xl font-semibold leading-snug text-[var(--ink)] sm:text-4xl">{product.name}</h1>
                <p className="mt-5 text-lg leading-relaxed text-[var(--muted-text)]">{product.description}</p>
                <p className="mt-6 rounded-sm bg-[var(--paper-muted)] px-3 py-2 text-sm font-semibold text-[var(--ink-soft)]">{product.priceLabel}</p>
                <div className="mt-8 w-full border-t border-[var(--line)] pt-6">
                    <h2 className="font-display text-xl font-semibold text-[var(--ink)]">What’s inside</h2>
                    <ul className="mt-4 space-y-3">
                        {product.details.map(detail => <li key={detail} className="flex gap-3 text-sm leading-relaxed text-[var(--muted-text)]"><Check size={17} className="mt-0.5 shrink-0 text-[var(--cobalt)]" />{detail}</li>)}
                    </ul>
                </div>
                <div className="mt-8 w-full border-t border-[var(--line)] pt-6">
                    <h2 className="font-display text-xl font-semibold text-[var(--ink)]">Made for</h2>
                    <div className="mt-3 flex flex-wrap gap-2">{product.formats.map(format => <span key={format} className="rounded-sm border border-[var(--line)] bg-[var(--paper-bright)] px-3 py-1.5 text-sm text-[var(--ink-soft)]">{format}</span>)}</div>
                    {product.brushCount && <p className="mt-4 text-sm text-[var(--muted-text)]">{product.brushCount} brushes in this pack</p>}
                </div>
                {product.downloads ? <div className="mt-8 w-full border-t border-[var(--line)] pt-6">
                    <h2 className="font-display text-xl font-semibold text-[var(--ink)]">Free downloads</h2>
                    <div className="mt-4 flex flex-col items-start gap-2">
                        {product.downloads.map(download => <a key={download.href} href={download.href} className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[var(--ink)] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[var(--cobalt)]"><Download size={15} /> {download.label}</a>)}
                    </div>
                    <p className="mt-3 text-xs text-[var(--muted-text)]">Free to download. No checkout required.</p>
                </div> : product.archiveUrl ? <>
                    <ManualPaywall productName={product.name} amount={product.priceAmount} downloadUrl={product.archiveUrl} />
                    <p className="mt-3 text-xs text-[var(--muted-text)]">Manual PayPal payment. This site does not verify payments automatically.</p>
                </> : <>
                    <a href="https://buymeacoffee.com/csornaimetzbenedek" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-[var(--ink)] px-6 py-3 font-bold text-white transition-colors hover:bg-[var(--cobalt)]">Contact Metz Benedek about this artwork</a>
                </>}
            </div>
        </div>
        <div className="mt-16 border-t border-[var(--line)] pt-8">
            <Link href="/#brushes" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--cobalt)] hover:text-[var(--coral)]"><ArrowLeft size={15} /> Explore all brushes</Link>
        </div>
    </div>
}
