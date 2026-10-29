import Link from 'next/link'
import { ArrowRight, Check, Mail } from 'lucide-react'
import { BMC_URL } from '@/lib/site'

export const metadata = {
    title: 'Thank You | Elizabeth Carlson',
    description: 'Thank you for supporting Elizabeth Carlson and independent 3D art.',
    robots: { index: false, follow: false },
}

export default function ThankYouPage() {
    return <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-5 py-16 sm:px-8 sm:py-24">
        <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--cobalt)] text-white" aria-hidden="true">
            <Check size={27} strokeWidth={2.5} />
        </div>
        <p className="text-sm font-bold text-[var(--coral)]">ELIZABETH ELLEN CARLSON · 3D ARTIST</p>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">Thank you for supporting my work.</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted-text)] sm:text-lg">
            Buy Me a Coffee handles checkout and digital delivery. If you completed a purchase, look for your receipt and download details in the email or account you used there.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/collections" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[var(--ink)] px-5 py-3 font-bold text-white transition-colors hover:bg-[var(--cobalt)]">
                Browse the shop <ArrowRight size={16} />
            </Link>
            <a href={BMC_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-[var(--paper-bright)] px-5 py-3 font-semibold text-[var(--ink)] transition-colors hover:border-[var(--ink)]">
                <Mail size={16} /> Need help?
            </a>
        </div>
    </div>
}
