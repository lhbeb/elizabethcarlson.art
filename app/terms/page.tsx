import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = { title: 'Terms of Use | Elizabeth Carlson' }

export default function TermsPage() {
    return <main className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--muted-text)] hover:text-[var(--cobalt)]"><ArrowLeft size={15} /> Home</Link>
        <h1 className="font-display text-4xl font-semibold">Terms of Use</h1><p className="mb-10 mt-3 text-sm text-[var(--muted-text)]">Last updated: September 29, 2026</p>
        <div className="space-y-8 leading-relaxed text-[var(--muted-text)]">
            <section><h2 className="mb-3 font-display text-xl font-semibold text-[var(--ink)]">About this website</h2><p>This is the website of 3D artist Elizabeth Carlson, featuring 3D renders, motion work and downloadable 3D assets. The website is provided for browsing and discovery.</p></section>
            <section><h2 className="mb-3 font-display text-xl font-semibold text-[var(--ink)]">Purchases and downloads</h2><p>Asset listings, prices, payment, delivery, and any purchase-specific conditions are shown through the linked Buy Me a Coffee shop. Review the details on the relevant listing before ordering. Transactions and account activity on that service are subject to its terms.</p></section>
            <section><h2 className="mb-3 font-display text-xl font-semibold text-[var(--ink)]">Asset usage</h2><p>Each 3D asset product’s license and permitted use are described on its listing or in accompanying product materials. See the <Link href="/license" className="font-semibold text-[var(--cobalt)] hover:underline">asset license page</Link> for general guidance.</p></section>
            <section><h2 className="mb-3 font-display text-xl font-semibold text-[var(--ink)]">Contact</h2><p>Questions about these terms can be sent through the <Link href="/contact" className="font-semibold text-[var(--cobalt)] hover:underline">contact page</Link>.</p></section>
        </div>
    </main>
}
