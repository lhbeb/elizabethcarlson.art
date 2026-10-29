import Link from 'next/link'
import Wordmark from '@/components/Wordmark'
import { BMC_URL, CONTACT_EMAIL, SITE_NAME } from '@/lib/site'

export default function Footer() {
    return <footer className="bg-[var(--paper)] px-6 pb-10 pt-16 sm:px-10">
        <div className="mx-auto grid max-w-[1440px] gap-10 border-t border-[var(--line)] pt-10 sm:grid-cols-[1fr_auto] sm:items-end">
            <div><Link href="/" aria-label={`${SITE_NAME} home`} className="text-2xl sm:text-3xl"><Wordmark /></Link><p className="mt-3 text-[var(--muted-text)]">3D artist. © {new Date().getFullYear()} {SITE_NAME}</p><a href={`mailto:${CONTACT_EMAIL}`} className="link-select mt-2 inline-block text-[var(--muted-text)]">{CONTACT_EMAIL}</a></div>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]"><Link href="/work">Work</Link><Link href="/about">About</Link><Link href="/collections">Shop</Link><Link href="/free-models">Free models</Link><Link href="/license">Asset license</Link><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><Link href="/contact">Contact</Link><a href={BMC_URL} target="_blank" rel="noopener noreferrer" className="link-select">Buy me a coffee</a></nav>
        </div>
    </footer>
}
