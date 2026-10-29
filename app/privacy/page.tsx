import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = { title: 'Privacy Policy | Elizabeth Carlson' }

export default function PrivacyPolicyPage() {
    return <main className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--muted-text)] hover:text-[var(--cobalt)]"><ArrowLeft size={15} /> Home</Link>
        <h1 className="font-display text-4xl font-semibold">Privacy Policy</h1><p className="mb-10 mt-3 text-sm text-[var(--muted-text)]">Last updated: September 29, 2026</p>
        <div className="space-y-8 leading-relaxed text-[var(--muted-text)]">
            <section><h2 className="mb-3 font-display text-xl font-semibold text-[var(--ink)]">Information on this website</h2><p>This is the website of 3D artist Elizabeth Carlson. The website does not ask visitors to create an account or submit personal information to browse its pages.</p></section>
            <section><h2 className="mb-3 font-display text-xl font-semibold text-[var(--ink)]">External shop and services</h2><p>Links to Buy Me a Coffee take you to a third-party service where shop, payment, support, and messaging features are provided. Information you submit there is handled under that service’s own privacy policy and settings.</p></section>
            <section><h2 className="mb-3 font-display text-xl font-semibold text-[var(--ink)]">Contact</h2><p>For privacy questions, contact Elizabeth through the <Link href="/contact" className="font-semibold text-[var(--cobalt)] hover:underline">contact page</Link>.</p></section>
        </div>
    </main>
}
