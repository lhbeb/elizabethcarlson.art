'use client'

import { useState } from 'react'

export default function SupportSection() {
    const [submitted, setSubmitted] = useState(false)
    return <section className="border-t border-[var(--line)] bg-[var(--paper)] px-8 py-20 text-center sm:px-12 sm:py-28"><div className="mx-auto max-w-xl"><h2 className="text-3xl">SUBSCRIBE</h2><p className="mt-5 text-base leading-7 text-[var(--muted-text)]">Sign up with your email address to receive news and updates.</p>{submitted ? <p className="mt-8 italic">Your email was captured. Thank you for subscribing.</p> : <form className="mt-8 flex flex-col gap-3 sm:flex-row" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}><input required type="email" aria-label="Email Address" placeholder="Email Address" className="min-h-14 flex-1 border border-[var(--line)] bg-white px-5 text-center outline-none placeholder:text-[var(--ink-soft)] focus:border-[var(--ink)] sm:text-left" /><button type="submit" className="min-h-14 bg-[var(--ink)] px-8 text-sm uppercase tracking-[.14em] text-white transition-colors hover:bg-[var(--accent)]">Sign Up</button></form>}</div></section>
}
