import Link from 'next/link'
import { ArrowLeft, Check, X } from 'lucide-react'

export const metadata = { title: 'Artwork Use Terms | Metz Benedek' }

export default function LicensePage() {
    return <main className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--muted-text)] hover:text-[var(--cobalt)]"><ArrowLeft size={15} /> Home</Link>
        <h1 className="font-display text-4xl font-semibold">Brush License</h1><p className="mb-10 mt-3 text-[var(--muted-text)]">Check the license included with each brush set for its specific terms.</p>
        <div className="space-y-8 leading-relaxed text-[var(--muted-text)]">
            <section><h2 className="mb-3 font-display text-xl font-semibold text-[var(--ink)]">Product-specific terms apply</h2><p>Artwork listings may include product-specific details about format, edition, delivery, and permitted use. The terms shown on each product listing take precedence over this general page.</p></section>
            <div className="grid gap-5 sm:grid-cols-2">
                <section className="border-t-2 border-[var(--cobalt)] pt-5"><h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold text-[var(--ink)]"><Check size={19} className="text-[var(--cobalt)]" /> Before using</h2><ul className="space-y-3"><li>Review the license supplied with your specific brush set.</li><li>Use the brushes within the stated personal or commercial permissions.</li><li>Keep the original files for your own use as described by the listing.</li></ul></section>
                <section className="border-t-2 border-[var(--coral)] pt-5"><h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold text-[var(--ink)]"><X size={19} className="text-[var(--coral)]" /> Unless your license says otherwise</h2><ul className="space-y-3"><li>Do not resell or redistribute the brush files themselves.</li><li>Do not claim authorship of the original brush assets.</li><li>Do not include the files in another brush pack or downloadable asset bundle.</li></ul></section>
            </div>
            <p>For questions about a particular artwork or print, contact Metz Benedek through the <Link href="/contact" className="font-semibold text-[var(--cobalt)] hover:underline">Metz Benedek contact page</Link>.</p>
        </div>
    </main>
}
