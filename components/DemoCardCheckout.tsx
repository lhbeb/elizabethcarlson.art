'use client'

import { useState } from 'react'
import { Check, CreditCard, Lock, X } from 'lucide-react'

export default function DemoCardCheckout({ productName, amount }: { productName: string; amount: number }) {
    const [open, setOpen] = useState(false)
    const [complete, setComplete] = useState(false)
    const [error, setError] = useState('')

    function close() {
        setOpen(false)
        setComplete(false)
        setError('')
    }

    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const demoNumber = String(formData.get('cardNumber') ?? '').replace(/\D/g, '')
        if (demoNumber !== '4242424242424242') {
            setError('Use the demo card number shown above. No real cards are accepted.')
            return
        }
        setError('')
        setComplete(true)
    }

    return <>
        <button type="button" onClick={() => setOpen(true)} className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[var(--line)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] transition-colors hover:border-[var(--cobalt)] hover:text-[var(--cobalt)]">Try demo card checkout <CreditCard size={16} /></button>
        {open && <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) close() }}>
            <div className="fixed inset-0 bg-[var(--ink)]/55 backdrop-blur-sm" />
            <section role="dialog" aria-modal="true" aria-labelledby="demo-checkout-title" className="relative my-auto w-full max-w-md rounded-md border border-[var(--line)] bg-[var(--paper-bright)] p-6 shadow-2xl sm:p-8">
                <button type="button" onClick={close} aria-label="Close demo checkout" className="absolute right-4 top-4 rounded-sm p-2 text-[var(--muted-text)] hover:bg-[var(--paper-muted)] hover:text-[var(--ink)]"><X size={18} /></button>
                {complete ? <div className="py-6 text-center">
                    <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[var(--paper-muted)] text-[var(--cobalt)]"><Check size={24} /></span>
                    <h2 id="demo-checkout-title" className="mt-4 font-display text-2xl font-semibold text-[var(--ink)]">Demo complete</h2>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted-text)]">This was only a checkout preview for {productName}. No payment was processed and no order was created.</p>
                    <button type="button" onClick={close} className="mt-6 rounded-md bg-[var(--ink)] px-5 py-3 text-sm font-bold text-white hover:bg-[var(--cobalt)]">Done</button>
                </div> : <>
                    <p className="text-xs font-bold uppercase text-[var(--coral)]">Checkout preview · no charge</p>
                    <h2 id="demo-checkout-title" className="mt-2 pr-8 font-display text-2xl font-semibold text-[var(--ink)]">{productName}</h2>
                    <p className="mt-3 border-l-2 border-[var(--ochre)] pl-3 text-sm leading-relaxed text-[var(--muted-text)]">Demo only · ${amount.toFixed(2)} preview. No real payment will be processed. Use the test card number below; details stay in this browser and are discarded when you close this window.</p>
                    <form onSubmit={submit} className="mt-6 space-y-4">
                        <div>
                            <label htmlFor="demo-card-number" className="mb-1.5 block text-sm font-semibold text-[var(--ink)]">Demo card number</label>
                            <input id="demo-card-number" name="cardNumber" autoComplete="off" inputMode="numeric" required placeholder="4242 4242 4242 4242" className="w-full rounded-sm border border-[var(--line)] bg-white px-3 py-3 text-[var(--ink)] outline-none focus:border-[var(--cobalt)] focus:ring-2 focus:ring-[var(--cobalt)]/15" />
                            <p className="mt-1 text-xs text-[var(--muted-text)]">Test number: 4242 4242 4242 4242</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div><label htmlFor="demo-expiry" className="mb-1.5 block text-sm font-semibold text-[var(--ink)]">Expiry</label><input id="demo-expiry" name="expiry" autoComplete="off" required placeholder="MM / YY" className="w-full rounded-sm border border-[var(--line)] bg-white px-3 py-3 text-[var(--ink)] outline-none focus:border-[var(--cobalt)]" /></div>
                            <div><label htmlFor="demo-cvc" className="mb-1.5 block text-sm font-semibold text-[var(--ink)]">Security code</label><input id="demo-cvc" name="cvc" autoComplete="off" inputMode="numeric" required placeholder="CVC" className="w-full rounded-sm border border-[var(--line)] bg-white px-3 py-3 text-[var(--ink)] outline-none focus:border-[var(--cobalt)]" /></div>
                        </div>
                        {error && <p role="alert" className="text-sm font-medium text-[var(--coral)]">{error}</p>}
                        <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[var(--ink)] px-5 py-3 font-bold text-white hover:bg-[var(--cobalt)]"><Lock size={15} /> Simulate ${amount.toFixed(2)} payment</button>
                    </form>
                </>}
            </section>
        </div>}
    </>
}
