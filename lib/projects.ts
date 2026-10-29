// Portfolio projects. Add one entry per project; the first one is featured
// on the homepage. Put images in /public/projects/<slug>/ and use a Vimeo or
// YouTube embed URL for the video (e.g. https://player.vimeo.com/video/123456789).
export type PortfolioProject = {
    slug: string
    title: string
    subtitle?: string
    year?: string
    role?: string
    tools?: string[]
    summary: string
    body?: string[]
    videoEmbedUrl?: string
    cover: string
    gallery?: { src: string; alt: string }[]
}

export const projects: PortfolioProject[] = [
    {
        slug: 'beta-hq',
        title: 'Beta HQ',
        subtitle: 'A high-resolution rebuild of the Beta faction headquarters from Grey Goo',
        year: 'Personal study',
        role: 'Lead 3D artist, modeling and visual development',
        tools: ['3DS Max', 'Maya', 'Unreal Engine'],
        summary: 'A hard-surface environment study based on the Beta race faction from Grey Goo, rebuilt from the original real-time asset as a high-resolution Maya model.',
        body: [
            'The last video game I worked on was the hardcore real-time strategy game Grey Goo, where I was the Lead 3D Artist responsible for establishing the visual direction of the Beta race faction.',
            'I modeled the original real-time Beta HQ in 3DS Max. For this personal rebuild, I used that game asset as a proxy for scale, then remodeled the entire structure from scratch in Maya as a new high-resolution piece.',
            'The result is a closer look at the layered mechanical language, modular construction and industrial silhouette that defined the faction. The Vimeo walkthrough shows the model in motion, while the stills focus on its surface design and overall form.',
        ],
        videoEmbedUrl: 'https://player.vimeo.com/video/253912465?h=0f41d13e05',
        cover: '/projects/beta-hq/Bode_HQ_Front.webp',
        gallery: [
            { src: '/projects/beta-hq/Bode_HQ_Front.webp', alt: 'Beta HQ high-resolution front three-quarter render' },
            { src: '/projects/beta-hq/Bode_HQ_Back.webp', alt: 'Beta HQ high-resolution rear three-quarter render' },
        ],
    },
    {
        slug: 'real-time-character-studies',
        title: 'Real-Time Character Studies',
        subtitle: 'Four stylized characters moving from sculpt to game-ready production',
        year: 'Work in progress',
        role: 'Character artist, modeling and sculpting',
        tools: ['Maya', 'ZBrush', 'Substance Painter', 'Unreal Engine'],
        summary: 'A focused study in stylized character creation, bringing together Rambo, a zombie welder, a 90s skater and Anna with a modern twist.',
        body: [
            'Outside of production work, I have been developing four real-time character projects in parallel. Each one is built around the same goal: create a memorable silhouette, a readable personality and a model that can eventually live inside an interactive world.',
            'The characters were modeled in Maya and sculpted in ZBrush. The sculpting and topology are now complete, and the next stage is texturing in Substance Painter before the final presentation in Unreal Engine.',
            'These images show the full-detail LOD0 models at their current stage. The wireframe views make the topology and construction visible, while the clay views focus on the forms, proportions and small design decisions that will carry through to the finished real-time characters.',
        ],
        cover: '/projects/real-time-character-studies/rambo1_WIP.webp',
        gallery: [
            { src: '/projects/real-time-character-studies/annaDouble.webp', alt: 'Anna character clay render, front and back views' },
            { src: '/projects/real-time-character-studies/annaDoubleWireframe.webp', alt: 'Anna character wireframe, front and back views' },
            { src: '/projects/real-time-character-studies/skaterDouble.webp', alt: '90s skater character clay render, front and back views' },
            { src: '/projects/real-time-character-studies/skaterDoubleWireframe.webp', alt: '90s skater character wireframe, front and back views' },
            { src: '/projects/real-time-character-studies/welderDouble.webp', alt: 'Zombie welder character clay render, front and back views' },
            { src: '/projects/real-time-character-studies/welderDoubleWireframe.webp', alt: 'Zombie welder character wireframe, front and back views' },
            { src: '/projects/real-time-character-studies/ramboDouble.webp', alt: 'Rambo character clay render, front and back views' },
            { src: '/projects/real-time-character-studies/ramboDoubleWireframe.webp', alt: 'Rambo character wireframe, front and back views' },
        ],
    },
    {
        slug: 'female-character',
        title: 'Female Character',
        subtitle: 'A VFX-inspired character pipeline study built from scan data and clean topology',
        year: 'Personal study',
        role: 'Character artist, scan cleanup and retopology',
        tools: ['ZBrush', 'Maya', 'Wrap 3.0'],
        summary: 'A new female character built from multiple scan elements, combining sculpting, cleanup, retopology and costume work into one seamless model.',
        body: [
            'I really enjoyed the VFX character pipeline and workflow at The Mill Film, so I wanted to create new portfolio work based on those methods. This female character is a composite of many separate elements brought together into one coherent design.',
            'The original photogrammetric scans were mid-level and needed substantial cleanup. The head, hands and feet were replaced with new high-resolution components, then merged, sculpted and posed in ZBrush so the transitions would read as one seamless character.',
            'The next step was transferring a clean base topology. Wrap 3.0 provided an excellent starting point, after which I went through the entire model to correct the topology and prepare it for further scan cleanup, sculpting and projection.',
            'For the shirt and shorts I used Maya Quad Draw where it was efficient, then brought the pieces into ZBrush for additional work. The damaged shoe scans became reference for a new pair built from scratch, while the hat was designed from photographic reference.',
        ],
        cover: '/projects/female-character/Bode_Female_Face_Thumbnail.webp',
        gallery: [
            { src: '/projects/female-character/Bode_Female_Face_Thumbnail.webp', alt: 'Female character close-up render' },
            { src: '/projects/female-character/Bode_Female_Front.webp', alt: 'Female character full-body front render' },
            { src: '/projects/female-character/Bode_Female_2Turn.webp', alt: 'Female character front and back turntable render' },
            { src: '/projects/female-character/Bode_Female_Face.webp', alt: 'Female character front facial render' },
            { src: '/projects/female-character/Bode_Female_Face_side.webp', alt: 'Female character side facial render' },
            { src: '/projects/female-character/Bode_female_Face_Wireframe.webp', alt: 'Female character facial wireframe study' },
        ],
    },
    {
        slug: 'male-character',
        title: 'Male Character',
        subtitle: 'A VFX-inspired character pipeline study built from scan data and clean topology',
        year: 'Personal study',
        role: 'Character artist, scan cleanup and retopology',
        tools: ['ZBrush', 'Maya', 'Wrap 3.0'],
        summary: 'A male character developed through the same scan-replacement, sculpting and retopology workflow as the female character study.',
        body: [
            'This male character was another enjoyable study in the VFX character pipeline. Like the female model, the original head, hands and shoe scans were unusable and needed to be replaced with cleaner, higher-resolution components.',
            'I followed the same workflow as the female character, combining scan cleanup, sculpting, posing and topology refinement to bring the separate elements together into one coherent model.',
            'The project documents the character at multiple stages, from the finished full-body study to the facial wireframe and turntable views that reveal the construction and surface decisions.',
        ],
        cover: '/projects/male-character/Bode_Male_Front2.5.webp',
        gallery: [
            { src: '/projects/male-character/Bode_Male_Front2.5.webp', alt: 'Male character full-body front render' },
            { src: '/projects/male-character/Bode_Male_3Turn.webp', alt: 'Male character three-quarter turntable render' },
            { src: '/projects/male-character/Bode_Male_Face.webp', alt: 'Male character facial render' },
            { src: '/projects/male-character/Bode_Male_Face_Wireframe3.webp', alt: 'Male character facial wireframe study' },
        ],
    },
    {
        slug: 'proton-pack',
        title: 'Proton Pack',
        subtitle: 'A detailed Maya model of the Ghostbusters proton pack',
        role: '3D artist, modeling and hard-surface design',
        tools: ['Maya'],
        summary: 'A from-scratch Maya model of the Ghostbusters proton pack, developed from blueprints and photographs of the original movie prop.',
        body: [
            'I modeled the Ghostbusters proton pack from scratch in Maya, using blueprints and images of the original movie prop as reference.',
            'The project focuses on rebuilding the pack’s layered hard-surface construction, cables, housings and equipment details as a complete portfolio model.',
        ],
        videoEmbedUrl: 'https://player.vimeo.com/video/253912397?h=92da60299c',
        cover: '/projects/proton-pack/Bode_Proton_Pack_Front.webp',
        gallery: [
            { src: '/projects/proton-pack/Bode_Proton_Pack_Front.webp', alt: 'Proton Pack front render' },
            { src: '/projects/proton-pack/Bode_Proton_Pack_Back.webp', alt: 'Proton Pack back render' },
        ],
    },
]

export function getProject(slug: string) {
    return projects.find(project => project.slug === slug)
}
