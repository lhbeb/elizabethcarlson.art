import { redirect } from 'next/navigation'

export default function LegacyArticlePage(): never {
    redirect('/about')
}
