import { NextResponse, type NextRequest } from 'next/server'

const THANK_YOU_DESTINATIONS: Record<string, string> = {
    US: 'https://www.takimia.com/thankyou',
    DE: 'https://weteextees.com/thankyou',
}
const BROWSER_USER_AGENT_PATTERN = /(?:chrome|crios|firefox|fxios|safari|edg|opr|samsungbrowser)/i
const NON_BROWSER_USER_AGENT_PATTERN = /(?:bot|crawler|spider|slurp|headless|lighthouse|pagespeed|preview|monitor|uptime|curl|wget|python|scrapy|postman|insomnia|node-fetch|undici|axios|go-http-client|java\/|libwww-perl|phantomjs)/i

export function proxy(request: NextRequest) {
    if (request.nextUrl.pathname === '/thankyou') {
        const userAgent = request.headers.get('user-agent')?.trim() || ''
        const isNonBrowser =
            !BROWSER_USER_AGENT_PATTERN.test(userAgent) ||
            NON_BROWSER_USER_AGENT_PATTERN.test(userAgent)
        const country = (
            request.headers.get('x-vercel-ip-country') ||
            request.headers.get('cf-ipcountry') ||
            ''
        ).toUpperCase()
        const destination = THANK_YOU_DESTINATIONS[country]

        if (destination && !isNonBrowser) {
            const redirectUrl = new URL(destination)
            redirectUrl.search = request.nextUrl.search
            return NextResponse.redirect(redirectUrl, 307)
        }
    }

    const isAdmin = request.cookies.has('admin_session')

    // If visiting /admin and not logged in, redirect to login
    if (request.nextUrl.pathname.startsWith('/admin') && !isAdmin) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // If visiting /login and already logged in, redirect to admin
    if (request.nextUrl.pathname === '/login' && isAdmin) {
        return NextResponse.redirect(new URL('/admin', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/login',
        '/thankyou',
    ],
}
