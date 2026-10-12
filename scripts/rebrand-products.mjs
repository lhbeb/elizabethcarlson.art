import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../lib/supabase.ts', import.meta.url), 'utf8')
const key = source.match(/'(eyJ[^']+)'/)?.[1]
const supabase = createClient(
  'https://mxporkdsuqamzrqdmkbb.supabase.co',
  key
)

const { data, error } = await supabase
  .from('products')
  .select('id, description, file_url')
  .like('file_url', 'https://www.lucy-pass.com/shop/p/%')

if (error) throw error

for (const product of data || []) {
  const description = (product.description || '')
    .replace(/Lucy Pass/g, 'Metz Benedek')
    .replace(/Lucy’s/g, "Metz Benedek’s")
    .replace(/\bLucy\b/g, 'Metz Benedek')

  if (description !== product.description) {
    const result = await supabase.from('products').update({ description }).eq('id', product.id)
    if (result.error) throw result.error
  }
}

console.log(`Rebranded ${data?.length || 0} imported product descriptions.`)
