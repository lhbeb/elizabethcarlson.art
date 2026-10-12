import { supabase, type Product } from '@/lib/supabase'

export async function getMetzShopProducts(): Promise<Product[]> {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if (error) {
        console.error('Could not load Metz Benedek shop products:', error.message)
        return []
    }
    return (data || []).filter(product => product.file_url?.startsWith('https://www.metzbenedek.art/collections/'))
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
