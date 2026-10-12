import { redirect } from 'next/navigation'

export default function LegacyCollectionPage(): never {
    redirect('/collections')
}
