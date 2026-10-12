import { supabase, type Product } from '@/lib/supabase'

export async function getLucyShopProducts(): Promise<Product[]> {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if (error) {
        console.error('Could not load Lucy Pass shop products:', error.message)
        return []
    }
    return (data || []).filter(product => product.file_url?.startsWith('https://www.lucy-pass.com/shop/p/'))
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
