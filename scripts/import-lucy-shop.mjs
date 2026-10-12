import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://mxporkdsuqamzrqdmkbb.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14cG9ya2RzdXFhbXpycWRta2JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5NTAxMjAsImV4cCI6MjEwNTUyNjEyMH0.dEk2Rx-wV7dyoTVi0CnRQwDRtYxZL5Y2w7_poeXlaGA'
const SOURCE_ORIGIN = 'https://www.lucy-pass.com'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
}

function htmlToText(value) {
  return decodeEntities(value.replace(/<br\s*\/?>/gi, '\n').replace(/<\/li>/gi, '\n').replace(/<[^>]+>/g, ''))
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function getVariant(item) {
  return item.structuredContent?.variants?.[0] || item.variants?.[0] || null
}

function toRow(item) {
  const variant = getVariant(item)
  const priceCents = variant?.salePrice || variant?.price || item.salePriceCents || item.priceCents || 0
  const originalCents = variant?.price || item.priceCents || priceCents
  const soldOut = variant && !variant.unlimited && Number(variant.qtyInStock) <= 0
  const detailUrl = `${SOURCE_ORIGIN}${item.fullUrl}`
  const images = [
    item.assetUrl ? `${item.assetUrl}?format=1000w` : null,
    ...(item.items || []).filter(image => image.recordType === 2).map(image => image.assetUrl),
  ].filter(Boolean).filter((url, index, urls) => urls.indexOf(url) === index)
  const availability = soldOut ? 'Sold out.' : 'Available to order.'
  const priceNote = originalCents !== priceCents ? `Sale price £${(priceCents / 100).toFixed(2)}. Original price £${(originalCents / 100).toFixed(2)}.` : `Price £${(priceCents / 100).toFixed(2)}.`
  const description = [htmlToText(item.excerpt || ''), priceNote, availability].filter(Boolean).join('\n\n')

  return {
    title: item.title,
    description,
    price: priceCents / 100,
    thumbnail_url: images[0] || null,
    images,
    file_url: detailUrl,
  }
}

const response = await fetch(`${SOURCE_ORIGIN}/shop?format=json`)
if (!response.ok) throw new Error(`Lucy Pass shop feed failed: ${response.status}`)
const feed = await response.json()
const sourceItems = (feed.items || []).filter(item => item.recordType === 11 && item.fullUrl?.startsWith('/shop/p/'))
if (!sourceItems.length) throw new Error('No Lucy Pass shop products found in the source feed')

const { data: existing, error: existingError } = await supabase.from('products').select('file_url')
if (existingError) throw new Error(`Could not read existing products: ${existingError.message}`)
const existingUrls = new Set((existing || []).map(product => product.file_url).filter(Boolean))
const rows = sourceItems.map(toRow).filter(row => !existingUrls.has(row.file_url))

if (rows.length) {
  const { error } = await supabase.from('products').insert(rows)
  if (error) throw new Error(`Could not import Lucy Pass products: ${error.message}`)
}

console.log(JSON.stringify({ sourceProducts: sourceItems.length, imported: rows.length, skippedExisting: sourceItems.length - rows.length }, null, 2))
