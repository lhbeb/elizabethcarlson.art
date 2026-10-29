// Clay-render placeholder used until real renders are added.
export default function RenderPanel({ variant = 'warm', label }: { variant?: 'warm' | 'cool' | 'mono'; label?: string }) {
    const shape = variant === 'cool' ? 'rounded-[22%]' : variant === 'mono' ? 'rounded-[8%] rotate-12' : 'rounded-full'
    return <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(ellipse_at_50%_35%,#e6e8eb,var(--cyc)_60%,#aeb2b8)]" aria-hidden={label ? undefined : true} role={label ? 'img' : undefined} aria-label={label}>
        <div className={`absolute left-1/2 top-[44%] aspect-square w-[38%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_32%_28%,#f4f5f6,#9a9da3_48%,#5f6268_92%)] shadow-[0_26px_40px_rgba(34,36,40,.28)] ${shape}`} />
        <div className="absolute left-1/2 top-[68%] h-[5%] w-[30%] -translate-x-1/2 rounded-[50%] bg-[rgba(34,36,40,.28)] blur-md" />
    </div>
}
