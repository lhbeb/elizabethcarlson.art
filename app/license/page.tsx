import Link from 'next/link'
import { ArrowLeft, Check, X } from 'lucide-react'

export const metadata = { title: 'Asset License | Elizabeth Carlson' }

export default function LicensePage() {
    return <main className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--muted-text)] hover:text-[var(--cobalt)]"><ArrowLeft size={15} /> Home</Link>
        <h1 className="font-display text-4xl font-semibold">3D Asset License</h1><p className="mb-10 mt-3 text-[var(--muted-text)]">The free models on this site are free for personal and commercial use. Download access is hosted through Buy Me a Coffee extras. Support is optional where offered.</p>
        <div className="space-y-8 leading-relaxed text-[var(--muted-text)]">
            <section><h2 className="mb-3 font-display text-xl font-semibold text-[var(--ink)]">Product-specific terms apply</h2><p>The free models listed here use the permissions below unless a specific listing clearly states different terms.</p></section>
            <div className="grid gap-5 sm:grid-cols-2">
                <section className="border-t-2 border-[var(--cobalt)] pt-5"><h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold text-[var(--ink)]"><Check size={19} className="text-[var(--cobalt)]" /> You can</h2><ul className="space-y-3"><li>Use the assets in personal projects.</li><li>Use the assets in commercial projects.</li><li>Modify, render, animate and include them in finished work.</li></ul></section>
                <section className="border-t-2 border-[var(--coral)] pt-5"><h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold text-[var(--ink)]"><X size={19} className="text-[var(--coral)]" /> Please do</h2><ul className="space-y-3"><li>Resell or redistribute the 3D asset source files themselves.</li><li>Claim authorship of the original 3D assets.</li><li>Include the source files in another asset pack or downloadable bundle.</li></ul></section>
            </div>
            <p>For questions about a particular asset or piece, contact Elizabeth through the <Link href="/contact" className="font-semibold text-[var(--cobalt)] hover:underline">contact page</Link>.</p>
        </div>
    </main>
}
