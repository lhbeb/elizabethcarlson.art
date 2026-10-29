import type { Metadata } from 'next'
import Image from 'next/image'
import { getShopProducts, isSoldOut, shouldOptimizeImage } from '@/lib/shop'
import RenderPanel from '@/components/RenderPanel'

export const revalidate = 60

export const metadata: Metadata = {
    title: 'Shop | Elizabeth Carlson',
    description: '3D project renders, process notes and downloadable 3D asset packs by Elizabeth Carlson.',
}

export default async function CollectionsPage() {
    const products = await getShopProducts()

    return <main className="mx-auto max-w-[1320px] px-8 py-28 sm:px-12 lg:px-16">
        <div className="max-w-2xl">
            <p className="text-xs text-[var(--ink-soft)]">Elizabeth Carlson</p>
            <h1 className="mt-5 text-4xl sm:text-5xl">Shop</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[var(--muted-text)]">3D project renders, process notes and downloadable 3D asset packs, made in the studio.</p>
        </div>
        <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {products.map(product => {
                const soldOut = isSoldOut(product)
                return <article key={product.id} className="group">
                    <div className="relative aspect-[.78] overflow-hidden bg-white">
                        {product.thumbnail_url ? <Image src={product.thumbnail_url} alt={product.title} fill unoptimized={!shouldOptimizeImage(product.thumbnail_url)} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" /> : <RenderPanel variant="mono" />}
                        {soldOut && <span className="absolute left-4 top-4 bg-[var(--ink)] px-3 py-1 text-xs text-white">Sold out</span>}
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-4"><h2 className="text-xl leading-tight">{product.title}</h2>{Number(product.price) > 0 && <span className="shrink-0 text-sm">${Number(product.price).toFixed(2)}</span>}</div>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--muted-text)]">{(product.description || '').split('\n')[0]}</p>
                    {product.file_url && <a href={product.file_url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block border-b border-[var(--ink)] pb-1 text-xs transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]">View listing</a>}
                </article>
            })}
        </div>
        {!products.length && <p className="mt-16 text-[var(--muted-text)]">New 3D work and asset packs are on the way.</p>}
    </main>
}
