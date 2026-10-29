import Image from 'next/image'
import { BMC_URL, BMC_SHOP_URL } from '@/lib/site'

// Buy Me a Coffee call to action used near the top of the homepage.
export default function SupportBlock() {
    return <section className="grid justify-items-center gap-8 rounded-2xl bg-[var(--ink)] p-8 text-center text-white sm:p-12">
        <div className="mx-auto max-w-xl">
            <h2 className="text-3xl sm:text-4xl">Help me keep building</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/75">Your support pays for render time, new models and the free 3D assets I share. A coffee goes a long way.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
            <a href={BMC_URL} target="_blank" rel="noopener noreferrer" aria-label="Support Elizabeth Carlson on Buy Me a Coffee" className="inline-flex min-h-12 items-center overflow-hidden rounded-md transition-transform hover:-translate-y-0.5"><Image src="/buymeacoffeelogo2.png" alt="Buy Me a Coffee" width={1090} height={306} className="h-12 w-[174px] object-cover" /></a>
            <a href={BMC_SHOP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full border border-white/40 px-6 font-semibold hover:border-white">Browse extras</a>
        </div>
    </section>
}
