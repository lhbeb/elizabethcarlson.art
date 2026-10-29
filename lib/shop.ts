import { supabase, HIDDEN_PUBLIC_PRODUCT_IDS, type Product } from '@/lib/supabase'

// The products table is shared with older projects. Only listings uploaded
// through this site's admin (files in Supabase storage) or pointing at this
// site are shown; listings that link out to other websites are skipped.
function isOwnListing(product: Product) {
    if (HIDDEN_PUBLIC_PRODUCT_IDS.has(product.id)) return false
    if (!product.file_url) return true
    try {
        const host = new URL(product.file_url).hostname
        return host.endsWith('.supabase.co') || host.endsWith('carlsonelizabeth.art')
    } catch {
        return false
    }
}

export async function getShopProducts(): Promise<Product[]> {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if (error) {
        console.error('Could not load shop products:', error.message)
        return []
    }
    return ((data || []) as Product[]).filter(isOwnListing)
}

export async function getShopProduct(id: string): Promise<Product | null> {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
    if (error || !data || !isOwnListing(data as Product)) return null
    return data as Product
}

export function isSoldOut(product: Product) {
    return /\bSold out\./i.test(product.description || '')
}

export function shouldOptimizeImage(url: string | null) {
    if (!url) return true
    try {
        return new URL(url).hostname.endsWith('.supabase.co')
    } catch {
        return true
    }
}
