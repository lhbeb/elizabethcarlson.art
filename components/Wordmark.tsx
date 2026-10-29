import Image from 'next/image'
import { SITE_NAME } from '@/lib/site'

export default function Wordmark({ className = '' }: { className?: string }) {
    return <Image src="/elizabethlogo.svg" alt={SITE_NAME} width={263} height={56} priority className={`block h-auto w-[180px] sm:w-[210px] ${className}`} />
}
