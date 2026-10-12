import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
    return <footer className="bg-[var(--paper)] px-8 pb-10 pt-8 sm:px-12 lg:px-16">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-8 border-t border-[var(--line)] pt-8 sm:flex-row sm:items-end sm:justify-between">
            <div><Link href="/" aria-label="Metz Benedek home" className="block w-44"><Image src="/metz%20logo.svg" alt="Metz Benedek" width={551} height={152} className="h-auto w-full" /></Link><p className="mt-3 text-sm text-[var(--muted-text)]">© Copyright Metz Benedek · Jakarta, Indonesia</p></div>
            <div><p className="mb-3 text-sm">Useful links</p><nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm underline underline-offset-4"><Link href="/about">About</Link><Link href="/collections">Shop</Link><Link href="/terms">Artwork Use Terms</Link><Link href="/privacy">Privacy Policy</Link><Link href="/contact">Contact</Link></nav></div>
        </div>
    </footer>
}
