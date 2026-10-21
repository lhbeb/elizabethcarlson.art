import Link from 'next/link'
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react'

export const metadata = {
    title: 'Order received | Metz Benedek',
    description: 'Your Metz Benedek order has been received.',
    robots: { index: false, follow: false },
}

export default function OrderConfirmedPage() {
    return (
        <section className="mx-auto flex min-h-[72vh] max-w-5xl items-center px-6 pb-16 pt-36 sm:px-10 sm:pt-44 lg:px-16">
            <div className="w-full border-y border-[var(--line)] py-12 sm:py-16">
                <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,.85fr)] lg:gap-20">
                    <div>
                        <div className="inline-flex items-center gap-2 text-[var(--accent)]">
                            <CheckCircle2 size={21} strokeWidth={1.6} aria-hidden="true" />
                            <span className="text-xs font-semibold uppercase tracking-[.16em]">Order confirmed</span>
                        </div>
                        <h1 className="mt-6 max-w-2xl text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">Your order has been received.</h1>
                    </div>
                    <div className="border-l border-[var(--line)] pl-6 sm:pl-8">
                        <p className="text-lg leading-8 text-[var(--muted-text)]">Your order will be sent to you by email shortly. I’ll contact you there with the next details.</p>
                        <Link href="/collections" className="mt-8 inline-flex items-center gap-2 border-b border-[var(--ink)] pb-1 text-sm font-semibold uppercase tracking-[.13em] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]">
                            Continue exploring <ArrowRight size={16} strokeWidth={1.5} />
                        </Link>
                    </div>
                </div>
                <div className="mt-12 flex items-center gap-3 border-t border-[var(--line)] pt-5 text-sm text-[var(--muted-text)]">
                    <Mail size={16} strokeWidth={1.4} aria-hidden="true" />
                    <p>Please check your inbox and spam folder for the delivery email.</p>
                </div>
            </div>
        </section>
    )
}
