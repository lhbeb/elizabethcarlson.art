import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getShopProduct, isSoldOut, shouldOptimizeImage } from '@/lib/shop'
import RenderPanel from '@/components/RenderPanel'
import { BMC_SHOP_URL } from '@/lib/site'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

const getProduct = getShopProduct

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const product = await getProduct((await params).slug)
    return product ? { title: `${product.title} | Elizabeth Carlson`, description: product.description || `3D work by Elizabeth Carlson.` } : { title: 'Work not found | Elizabeth Carlson' }
}

export default async function ArtworkPage({ params }: Props) {
    const product = await getProduct((await params).slug)
    if (!product) notFound()
    const soldOut = isSoldOut(product)
    const description = (product.description || '').split('\n').filter(Boolean)

    return <main className="mx-auto max-w-[1320px] px-8 py-28 sm:px-12 lg:px-16">
        <Link href="/collections" className="text-xs text-[var(--muted-text)] hover:text-[var(--ink)]">Back to shop</Link>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-24">
            <div className="relative aspect-[.9] overflow-hidden bg-white">
                {product.thumbnail_url ? <Image src={product.thumbnail_url} alt={product.title} fill priority unoptimized={!shouldOptimizeImage(product.thumbnail_url)} sizes="(min-width: 1024px) 55vw, 100vw" className="object-contain" /> : <RenderPanel variant="mono" />}
            </div>
            <div className="max-w-xl self-center">
                <p className="text-xs text-[var(--ink-soft)]">Elizabeth Carlson · 3D work</p>
                <h1 className="mt-5 text-4xl leading-tight sm:text-5xl">{product.title}</h1>
                {Number(product.price) > 0 && <p className="mt-6 text-2xl">${Number(product.price).toFixed(2)}</p>}
                {soldOut && <p className="mt-5 inline-block bg-[var(--ink)] px-3 py-1 text-xs text-white">Sold out</p>}
                <div className="mt-8 space-y-5 text-base leading-8 text-[var(--muted-text)]">{description.map((paragraph, index) => <p key={`${product.id}-${index}`}>{paragraph}</p>)}</div>
                <a href={BMC_SHOP_URL} target="_blank" rel="noopener noreferrer" className="mt-9 inline-flex min-h-12 items-center justify-center bg-[var(--ink)] px-7 text-sm text-white transition-colors hover:bg-[var(--accent)]">Visit the shop</a>
            </div>
        </div>
    </main>
}
