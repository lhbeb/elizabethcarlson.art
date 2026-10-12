export type BrushProduct = {
    id: string
    name: string
    description: string
    image: string
    imageAlt: string
    formats: string[]
    brushCount?: number
    priceLabel: string
    priceAmount?: number
    archiveUrl?: string
    imageCropRight?: boolean
    downloads?: { label: string; href: string }[]
    details: string[]
}

export const brushProducts: BrushProduct[] = [
    {
        id: 'cloud-brush-pack',
        name: 'Cloud Brush Pack',
        description: 'Paint soft, realistic cloud forms and atmospheric skies for landscapes, illustrations, and concept art.',
        image: '/BRUSHES/1/CoverSM.jpg',
        imageAlt: 'Cloud Brush Pack cover showing painted clouds over a grassy landscape',
        formats: ['Procreate'],
        brushCount: 53,
        priceLabel: 'Free download',
        downloads: [
            { label: 'Download Cloud Brush Pack (ZIP)', href: '/downloads/cloud-brush-pack.zip' },
        ],
        details: ['Five Procreate brushsets for realistic and stylized skies', 'Includes cloud edges, fluffy, watercolor, and wispy effects', 'Royalty-free use'],
    },
    {
        id: 'northern-lights-brushes',
        name: 'Northern Lights Brushes',
        description: 'Create glowing auroras, colorful night skies, and atmospheric effects with a few expressive strokes.',
        image: '/BRUSHES/2/NortherLightsBrushAd_FSM.jpg',
        imageAlt: 'Northern Lights Brushes cover with a vivid aurora over a night landscape',
        formats: ['Procreate', 'Clip Studio Paint'],
        brushCount: 10,
        priceLabel: 'Free download',
        downloads: [
            { label: 'Download Northern Lights Brushes (ZIP)', href: '/downloads/northern-lights-brushes.zip' },
        ],
        details: ['Glowing aurora and colorful night-sky effects', 'Procreate brushset plus Clip Studio Paint brush files', 'For personal and professional work'],
    },
    {
        id: 'rake-brush-pack',
        name: 'Rake Brush Pack',
        description: 'Add natural, painterly texture and movement to illustrations, landscapes, hair, and backgrounds.',
        image: '/BRUSHES/3/Coverad_Final.jpg',
        imageAlt: 'Rake Brush Pack cover with a painterly cat and textured brush examples',
        formats: ['Procreate'],
        brushCount: 28,
        priceLabel: 'Free download',
        downloads: [{ label: 'Download Rake Brush Pack (ZIP)', href: '/downloads/rake-brush-pack.zip' }],
        details: ['Textured, painterly rake strokes for expressive mark-making', 'Procreate brushset', 'Royalty-free use in commercial work'],
    },
    {
        id: 'grass-fields-brush-pack',
        name: 'Grass & Fields Brush Pack',
        description: 'Build detailed meadows and natural environments with textured grasses, plants, and field details.',
        image: '/BRUSHES/4/Cover_SM.jpg',
        imageAlt: 'Grass and Fields Brush Pack cover showing a colorful meadow and vegetation brush samples',
        formats: ['Procreate', 'Photoshop', 'Clip Studio Paint'],
        brushCount: 144,
        priceLabel: '$39.00',
        priceAmount: 39,
        archiveUrl: '/downloads/grass-fields-brush-pack.zip',
        imageCropRight: true,
        details: ['Grass, flowers, plants, and field textures', 'Procreate, Photoshop, and Clip Studio Paint formats', 'Includes demo videos and royalty-free use'],
    },
    {
        id: 'soft-anime-brush-set',
        name: 'Soft Anime Brush Set',
        description: 'A soft painting toolkit for anime-inspired sketching, blending, shading, and character illustration.',
        image: '/BRUSHES/5/1.png',
        imageAlt: 'Soft Anime Brush Set cover with a digital character portrait and sample strokes',
        formats: ['Procreate'],
        priceLabel: 'Premium set · ask for price',
        archiveUrl: '/downloads/soft-anime-brush-set.zip',
        details: ['Soft painting and sketching brushes', 'Anime-inspired shading, blending, and coloring', 'Designed for Procreate'],
    },
]
