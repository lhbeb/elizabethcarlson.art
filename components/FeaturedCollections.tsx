import Link from 'next/link'
import Image from 'next/image'
import { getShopProducts, isSoldOut, shouldOptimizeImage } from '@/lib/shop'

// Homepage strip of shop items; hidden when the shop is empty.
export default async function FeaturedCollections() {
    const products = (await getShopProducts()).filter(product => !isSoldOut(product)).slice(0, 4)
    if (!products.length) return null

    return <section className="px-6 pb-24 sm:px-10 sm:pb-32"><div className="mx-auto max-w-[1440px]">
        <div className="flex items-end justify-between gap-6"><h2 className="text-[clamp(2rem,3.6vw,3.2rem)]">From the shop</h2><Link href="/collections" className="link-select text-lg">All items</Link></div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{products.map(product => <Link key={product.id} href={`/collections/${product.id}`} className="select-ring group block rounded-xl">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-[var(--cyc)]">{product.thumbnail_url && <Image src={product.thumbnail_url} alt={product.title} fill unoptimized={!shouldOptimizeImage(product.thumbnail_url)} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />}</div>
            <div className="mt-4 flex items-start justify-between gap-4"><h3 className="text-lg leading-tight">{product.title}</h3>{Number(product.price) > 0 && <span className="shrink-0">${Number(product.price).toFixed(2)}</span>}</div>
        </Link>)}</div>
    </div></section>
}
