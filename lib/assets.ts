// Free and paid 3D asset packs shown at /product/[id].
// Add an entry here for each pack, with its cover image in /public/assets/
// and its file in /public/downloads/ (free) or as an archiveUrl (paid).
export type AssetProduct = {
    id: string
    name: string
    description: string
    image: string
    imageAlt: string
    formats: string[]
    itemCount?: number
    priceLabel: string
    priceAmount?: number
    downloads?: { label: string; href: string }[]
    archiveUrl?: string
    details: string[]
    imageCropRight?: boolean
}

export const assetProducts: AssetProduct[] = []
