import Link from 'next/link'
import Image from 'next/image'
import HeroSection from '@/components/HeroSection'
import FeaturedCollections from '@/components/FeaturedCollections'
import SupportBlock from '@/components/SupportBlock'
import RenderPanel from '@/components/RenderPanel'
import { projects } from '@/lib/projects'
import { freeModels } from '@/lib/free-models'
import { CONTACT_EMAIL } from '@/lib/site'

const processNotes = [
    { label: 'Reference', title: 'Reference and intent', text: 'I begin with what the project actually gives me: a game asset, blueprints, prop photos, scans, or a visual target. Beta HQ and the Proton Pack grew from different kinds of reference.' },
    { label: 'Form', title: 'Modeling and sculpting', text: 'Hard-surface assets are built across 3DS Max, Maya and Blender. Character forms are shaped and refined in ZBrush, with clothing, props and accessories developed around the final silhouette.' },
    { label: 'Topology', title: 'Topology with purpose', text: 'For character work, I clean and rebuild topology with Wrap 3.0, Maya Quad Draw and careful sculpt cleanup. The goal is a strong study now and a useful real-time foundation later.' },
    { label: 'Presentation', title: 'Look development and sharing', text: 'Materials and presentation move through Substance Painter and Unreal Engine, while some projects remain at LOD0 or work-in-progress stage. I share process notes, turntables and selected free assets so the decisions stay visible.' },
]

export default function HomePage() {
    const more = projects.slice(0, 4)
    return <div>
        <HeroSection />

        <div className="px-6 pb-8 pt-8 sm:px-10 sm:pt-10"><div className="mx-auto max-w-[1440px]"><SupportBlock /></div></div>

        <section className="px-6 py-24 sm:px-10 sm:py-32">
            <div className="mx-auto max-w-[1440px]">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end">
                    <h2 className="text-[clamp(2.2rem,4.5vw,4rem)]">Work</h2>
                    <p className="max-w-xl text-lg leading-relaxed text-[var(--muted-text)]">A study in modular armor, industrial mechanics and lived-in technology. The portfolio moves from hard-surface environments and props to real-time characters, with every project documented from topology to final render.</p>
                </div>
                {more.length ? <div className="mt-14 columns-1 gap-8 sm:columns-2">{more.map(project => <Link key={project.slug} href={`/work/${project.slug}`} className="select-ring group mb-8 block break-inside-avoid rounded-xl">
                    <img src={project.cover} alt={project.title} className="block h-auto w-full" />
                    <h3 className="mt-5 text-2xl">{project.title}</h3>
                </Link>)}</div>
                : <div className="mt-14 grid gap-8 sm:grid-cols-3">{(['warm', 'cool', 'mono'] as const).map((variant, index) => <div key={variant} className={`relative aspect-[4/5] overflow-hidden rounded-xl ${index ? 'hidden sm:block' : ''}`}><RenderPanel variant={variant} /></div>)}<p className="text-lg text-[var(--muted-text)] sm:col-span-3">New projects are in the render queue. <Link href="/work" className="link-select text-[var(--ink)]">Open the portfolio</Link></p></div>}
            </div>
        </section>

        <section className="px-6 py-24 sm:px-10 sm:py-32">
            <div className="mx-auto grid max-w-[1440px] items-center gap-12 border-t border-[var(--line)] pt-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
                <Image src="/elizabeth-carlson-portrait-bw.jpg" alt="Elizabeth Carlson, 3D artist" width={896} height={1200} sizes="(min-width: 1024px) 32vw, 100vw" className="block h-auto w-full max-w-md" />
                <div className="max-w-2xl">
                    <h2 className="text-[clamp(2.2rem,4.5vw,4rem)]">Built for imagined worlds.</h2>
                    <p className="mt-6 text-lg leading-relaxed text-[var(--muted-text)]">My work follows a precise visual language: modular forms, engineered surfaces, practical wear and silhouettes that read at a glance. I build in Maya, Blender and ZBrush, then carry the work through topology, Substance Painter materials and Unreal Engine presentation.</p>
                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"><Link href="/about" className="link-select inline-block text-lg">Meet the artist</Link><a href={`mailto:${CONTACT_EMAIL}`} className="link-select text-lg">{CONTACT_EMAIL}</a></div>
                </div>
            </div>
        </section>

        <section className="px-6 py-24 sm:px-10 sm:py-32">
            <div className="mx-auto max-w-[1440px] border-t border-[var(--line)] pt-14">
                <div>
                    <div className="max-w-2xl">
                        <p className="text-sm uppercase text-[var(--muted-text)]">Free downloads</p>
                        <h2 className="mt-5 text-[clamp(2.5rem,5vw,5rem)] leading-[.95]">3D models for your next scene.</h2>
                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted-text)]">Selected files, topology studies and production notes from the workbench, free for personal and commercial use. Download access is hosted through Buy Me a Coffee extras, and support is optional.</p>
                        <Link href="/free-models" className="select-ring mt-8 inline-flex min-h-12 items-center rounded-full bg-[var(--ink)] px-7 font-semibold text-white">Browse free models</Link>
                    </div>
                    <div className="mt-14 columns-1 gap-8 sm:columns-2">
                        {freeModels.map((model, index) => <Link key={model.slug} href={`/free-models/${model.slug}`} className="select-ring group mb-8 block break-inside-avoid">
                            <img src={model.cover} alt={model.title} className="block h-auto w-full transition-opacity group-hover:opacity-80" />
                            <div className="mt-5 flex items-baseline justify-between gap-4"><h3 className="text-2xl">{model.title}</h3><span className="text-sm text-[var(--muted-text)]">{String(index + 1).padStart(2, '0')}</span></div>
                            <p className="mt-2 text-[var(--muted-text)]">{model.format}</p>
                        </Link>)}
                    </div>
                </div>
            </div>
        </section>

        <section className="bg-[var(--paper-muted)] px-6 py-24 sm:px-10 sm:py-32">
            <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <div>
                    <h2 className="text-[clamp(2.2rem,4.5vw,4rem)]">Inside the workbench</h2>
                    <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--muted-text)]">Each project is a record of decisions: the reference that set the direction, the topology that supports the form, and the material and lighting choices that give the design a world.</p>
                    <Link href="/about" className="link-select mt-8 inline-block text-lg">More about me</Link>
                </div>
                <ol className="grid gap-px overflow-hidden rounded-xl bg-[var(--line)] sm:grid-cols-2">
                    {processNotes.map(step => <li key={step.title} className="bg-[var(--paper-bright)] p-7 sm:p-9"><span className="text-sm text-[var(--muted-text)]">{step.label}</span><h3 className="mt-3 text-2xl">{step.title}</h3><p className="mt-3 leading-relaxed text-[var(--muted-text)]">{step.text}</p></li>)}
                </ol>
            </div>
        </section>

        <section className="px-6 py-24 sm:px-10 sm:py-32">
            <div className="mx-auto grid max-w-[1440px] gap-10 border-t border-[var(--line)] pt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <div>
                    <h2 className="text-[clamp(2rem,3.6vw,3.2rem)]">Notes from the workbench</h2>
                </div>
                <div>
                    <p className="max-w-2xl text-lg leading-relaxed text-[var(--muted-text)]">Project pages collect the references, tools and production decisions behind each model. Follow the work from Maya, 3DS Max and Blender block-outs through ZBrush sculpting, topology cleanup, Substance Painter materials and Unreal Engine presentation.</p>
                    <Link href="/work" className="select-ring mt-8 inline-flex min-h-12 items-center rounded-full bg-[var(--ink)] px-6 font-semibold text-white">Explore the projects</Link>
                </div>
            </div>
        </section>

        <FeaturedCollections />
    </div>
}
