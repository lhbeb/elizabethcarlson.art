import { BMC_SHOP_URL } from '@/lib/site'

export type FreeModel = {
    slug: string
    title: string
    summary: string
    description: string[]
    format: string
    compatibility: string
    license: string
    downloadUrl: string
    cover: string
    gallery: { src: string; alt: string }[]
}

export const freeModels: FreeModel[] = [
    {
        slug: 'soldier-helmet-outfit',
        title: 'Soldier Helmet Outfit',
        summary: 'A free tactical helmet and outfit model for Unreal Engine and MetaHuman projects.',
        description: [
            'A production-minded soldier outfit study prepared as a free FBX download for artists, students and real-time projects.',
            'Use the model as a starting point for look development, scene building, animation tests or your own material experiments. The files are free for personal and commercial use. Download access is hosted through the Buy Me a Coffee extras page, and support is optional.',
        ],
        format: 'FBX',
        compatibility: 'Unreal Engine and MetaHuman workflows',
        license: 'Free for personal and commercial use',
        downloadUrl: BMC_SHOP_URL,
        cover: '/free-models/soldier-helmet-outfit/render-branding.webp',
        gallery: [
            { src: '/free-models/soldier-helmet-outfit/render-branding.webp', alt: 'Soldier outfit rendered from multiple angles' },
            { src: '/free-models/soldier-helmet-outfit/render-turntable.webp', alt: 'Soldier outfit turntable render' },
            { src: '/free-models/soldier-helmet-outfit/render-detail.webp', alt: 'Detailed render of the soldier outfit' },
            { src: '/free-models/soldier-helmet-outfit/wireframe-full-body.webp', alt: 'Full body wireframe of the soldier outfit' },
            { src: '/free-models/soldier-helmet-outfit/wireframe-back.webp', alt: 'Back view wireframe of the soldier outfit' },
            { src: '/free-models/soldier-helmet-outfit/wireframe-helmet.webp', alt: 'Helmet and shoulder detail wireframe' },
        ],
    },
    {
        slug: 'iron-man',
        title: 'Iron Man',
        summary: 'A free rigged Iron Man character study for posing, animation and real-time workflows.',
        description: [
            'A free Iron Man character study presented through posed and rigged views. Explore the armor, controls and presentation work across the gallery.',
            'Use it as a reference for character presentation, posing and animation workflows. The files are free for personal and commercial use. Download access is hosted through the Buy Me a Coffee extras page, and support is optional.',
        ],
        format: '3D model',
        compatibility: 'Rigged character study',
        license: 'Free for personal and commercial use',
        downloadUrl: BMC_SHOP_URL,
        cover: '/free-models/iron-man/iron-man-three-quarter.webp',
        gallery: [
            { src: '/free-models/iron-man/iron-man-front.webp', alt: 'Iron Man character posed in Blender' },
            { src: '/free-models/iron-man/iron-man-three-quarter.webp', alt: 'Iron Man three-quarter character view' },
            { src: '/free-models/iron-man/iron-man-rigged.webp', alt: 'Rigged Iron Man character in Blender' },
            { src: '/free-models/iron-man/iron-man-profile.webp', alt: 'Iron Man profile view' },
            { src: '/free-models/iron-man/iron-man-closeup.webp', alt: 'Close-up of the Iron Man helmet and chest armor' },
            { src: '/free-models/iron-man/iron-man-front-rig.webp', alt: 'Front rig view of the Iron Man character' },
        ],
    },
]

export function getFreeModel(slug: string) {
    return freeModels.find(model => model.slug === slug)
}
