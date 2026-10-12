import type { Metadata } from 'next'
import Image from 'next/image'
import { getLucyShopProducts, isSoldOut, shouldOptimizeImage } from '@/lib/lucyShop'

export const revalidate = 60

export const metadata: Metadata = {
    title: 'Shop | Metz Benedek',
    description: 'Original paintings, drawings and archival quality prints by Metz Benedek.',
}

export default async function CollectionsPage() {
    const products = await getLucyShopProducts()

    return <main className="mx-auto max-w-[1320px] px-8 py-28 sm:px-12 lg:px-16">
        <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[.2em] text-[var(--ink-soft)]">Metz Benedek</p>
            <h1 className="mt-5 text-4xl sm:text-5xl">SHOP</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[var(--muted-text)]">Original paintings, drawings and archival quality prints, fulfilled from Metz Benedek’s studio.</p>
        </div>
        <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {products.map(product => {
                const soldOut = isSoldOut(product)
                return <article key={product.id} className="group">
                    <div className="relative aspect-[.78] overflow-hidden bg-white">
                        <Image src={product.thumbnail_url || '/lucy/long-distance.jpg'} alt={product.title} fill unoptimized={!shouldOptimizeImage(product.thumbnail_url)} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                        {soldOut && <span className="absolute left-4 top-4 bg-[var(--ink)] px-3 py-1 text-xs uppercase tracking-[.14em] text-white">Sold out</span>}
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-4"><h2 className="text-xl leading-tight">{product.title}</h2><span className="shrink-0 text-sm">£{Number(product.price).toFixed(2)}</span></div>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--muted-text)]">{(product.description || '').split('\n')[0]}</p>
                    {product.file_url && <a href={product.file_url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block border-b border-[var(--ink)] pb-1 text-xs uppercase tracking-[.14em] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]">View listing</a>}
                </article>
            })}
        </div>
        {!products.length && <p className="mt-16 text-[var(--muted-text)]">Shop listings are temporarily unavailable.</p>}
    </main>
}
