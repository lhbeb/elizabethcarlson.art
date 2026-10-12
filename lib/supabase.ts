import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    'https://mxporkdsuqamzrqdmkbb.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14cG9ya2RzdXFhbXpycWRta2JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5NTAxMjAsImV4cCI6MjEwNTUyNjEyMH0.dEk2Rx-wV7dyoTVi0CnRQwDRtYxZL5Y2w7_poeXlaGA'
)

export const HIDDEN_PUBLIC_PRODUCT_IDS = new Set([
    '73f2ba00-a69f-4d85-840c-6e5cffa5ec16',
    'b66678e7-7ce4-4b66-b234-c7cbb0ebc97b',
    '4b95e647-d445-466f-ba9f-171d454e79e7',
    'c866ea12-203e-4cd2-a1a8-2fa00f12a6aa',
    '8bdc2c9a-348a-4759-b245-352cee37a46b',
])

export type Product = {
    id: string
    title: string
    description: string | null
    price: number
    thumbnail_url: string | null
    images: string[] | null
    file_url: string | null
    created_at: string
}

// Keep legacy Track type for backwards compatibility during migration
export type Track = Product
