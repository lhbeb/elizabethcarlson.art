import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { supabase, type Product } from '@/lib/supabase'
import { isSoldOut, shouldOptimizeImage } from '@/lib/lucyShop'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

async function getProduct(id: string): Promise<Product | null> {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
    if (error || !data || !data.file_url?.startsWith('https://www.lucy-pass.com/shop/p/')) return null
    return data as Product
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const product = await getProduct((await params).slug)
    return product ? { title: `${product.title} | Metz Benedek`, description: product.description || `Artwork by Metz Benedek.` } : { title: 'Artwork not found | Metz Benedek' }
}

export default async function ArtworkPage({ params }: Props) {
    const product = await getProduct((await params).slug)
    if (!product) notFound()
    const soldOut = isSoldOut(product)
    const description = (product.description || '').split('\n').filter(Boolean)

    return <main className="mx-auto max-w-[1320px] px-8 py-28 sm:px-12 lg:px-16">
        <Link href="/collections" className="text-xs uppercase tracking-[.16em] text-[var(--muted-text)] hover:text-[var(--ink)]">Back to shop</Link>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-24">
            <div className="relative aspect-[.9] overflow-hidden bg-white">
                <Image src={product.thumbnail_url || '/lucy/long-distance.jpg'} alt={product.title} fill priority unoptimized={!shouldOptimizeImage(product.thumbnail_url)} sizes="(min-width: 1024px) 55vw, 100vw" className="object-contain" />
            </div>
            <div className="max-w-xl self-center">
                <p className="text-xs uppercase tracking-[.2em] text-[var(--ink-soft)]">Metz Benedek · Artwork</p>
                <h1 className="mt-5 text-4xl leading-tight sm:text-5xl">{product.title}</h1>
                <p className="mt-6 text-2xl">£{Number(product.price).toFixed(2)}</p>
                {soldOut && <p className="mt-5 inline-block bg-[var(--ink)] px-3 py-1 text-xs uppercase tracking-[.14em] text-white">Sold out</p>}
                <div className="mt-8 space-y-5 text-base leading-8 text-[var(--muted-text)]">{description.map((paragraph, index) => <p key={`${product.id}-${index}`}>{paragraph}</p>)}</div>
                <a href="https://buymeacoffee.com/csornaimetzbenedek/extras" target="_blank" rel="noopener noreferrer" className="mt-9 inline-flex min-h-12 items-center justify-center bg-[var(--ink)] px-7 text-sm uppercase tracking-[.14em] text-white transition-colors hover:bg-[var(--accent)]">Visit the shop</a>
            </div>
        </div>
    </main>
}
