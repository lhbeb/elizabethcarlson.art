'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Download, X } from 'lucide-react'

type Props = {
    productName: string
    amount?: number
    downloadUrl: string
}

export default function ManualPaywall({ productName, amount, downloadUrl }: Props) {
    const [open, setOpen] = useState(false)
    const [unlocked, setUnlocked] = useState(false)
    const [copied, setCopied] = useState(false)
    const price = amount ? `$${amount.toFixed(2)} USD` : 'Confirm the price before paying'
    const subject = encodeURIComponent(`PayPal payment for ${productName}`)
    const body = encodeURIComponent(`Hi Metz Benedek, I sent the PayPal payment for ${productName}${amount ? ` ($${amount.toFixed(2)} USD)` : ''}. My PayPal transaction reference is: `)

    async function copyEmail() {
        try {
            await navigator.clipboard.writeText('https://buymeacoffee.com/csornaimetzbenedek')
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1800)
        } catch {
            setCopied(false)
        }
    }

    return <>
        <button type="button" onClick={() => setOpen(true)} className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[var(--ink)] px-6 py-3 font-bold text-white transition-colors hover:bg-[var(--cobalt)]">
            Get this brush set <ArrowUpRight size={16} />
        </button>
        {open && <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4" onMouseDown={event => { if (event.target === event.currentTarget) setOpen(false) }}>
            <section role="dialog" aria-modal="true" aria-labelledby="manual-pay-title" className="relative my-auto w-full max-w-md rounded-md border border-[var(--line)] bg-[var(--paper-bright)] p-6 shadow-2xl sm:p-8">
                <button type="button" onClick={() => setOpen(false)} aria-label="Close payment details" className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-md text-[var(--muted-text)] hover:bg-[var(--paper-muted)]"><X size={18} /></button>
                <div className="mb-5 flex h-7 w-28 items-center overflow-hidden rounded-sm bg-white" aria-label="PayPal">
                    <Image src="/paypal-mark.jpg" alt="PayPal" width={319} height={100} className="ml-[-2px] mt-[-12px] h-[100px] w-[319px] max-w-none" />
                </div>
                <h2 id="manual-pay-title" className="font-display text-2xl font-semibold text-[var(--ink)]">Pay manually with PayPal</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted-text)]">Brush set: <strong className="text-[var(--ink)]">{productName}</strong></p>
                <p className="mt-4 border-y border-[var(--line)] py-3 text-sm font-semibold text-[var(--ink)]">Amount: {price}</p>
                <div className="mt-5">
                    <p className="text-sm text-[var(--muted-text)]">Send payment to</p>
                    <div className="mt-2 flex items-center justify-between gap-2 rounded-sm border border-[var(--line)] bg-[var(--paper)] p-3">
                        <span className="break-all font-semibold text-[var(--ink)]">buymeacoffee.com/csornaimetzbenedek</span>
                        <button type="button" onClick={copyEmail} aria-label="Copy PayPal email" className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm hover:bg-[var(--paper-muted)]">{copied ? <Check size={17} /> : <Copy size={17} />}</button>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--muted-text)]">Include the artwork name in the payment note. After sending, share your payment reference through the creator page.</p>
                </div>
                <div className="mt-6 flex flex-col gap-3">
                    <a href="https://www.paypal.com/send" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#ffc439] px-5 font-bold text-[#172c70] hover:bg-[#f2b928]">Open PayPal <ArrowUpRight size={16} /></a>
                    <a href="https://buymeacoffee.com/csornaimetzbenedek" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[var(--line)] px-5 font-semibold text-[var(--ink)] hover:bg-[var(--paper)]">Share payment reference</a>
                    {!unlocked ? <button type="button" onClick={() => setUnlocked(true)} className="min-h-11 text-sm font-semibold text-[var(--cobalt)] hover:underline">I’ve sent payment</button> : <>
                        <p className="text-sm leading-relaxed text-[var(--muted-text)]">This manual payment isn’t verified by the website. Please only continue after sending payment.</p>
                        <a href={downloadUrl} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[var(--ink)] px-5 font-bold text-white hover:bg-[var(--cobalt)]"><Download size={16} /> Download brush set (ZIP)</a>
                    </>}
                </div>
            </section>
        </div>}
    </>
}
