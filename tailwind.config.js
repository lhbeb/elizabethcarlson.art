/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './*.{ts,tsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: { "2xl": "1400px" },
        },
        extend: {
            colors: {
                // Core dark palette
                'dark-bg':          '#0d0f14',
                'dark-card':        '#13161d',
                'dark-card-hover':  '#181c25',
                'dark-border':      '#1f2433',
                'dark-border-hover':'#2d3348',
                // Neon accents
                'neon-green':  '#39ff8a',
                'neon-purple': '#a855f7',
                'neon-blue':   '#38bdf8',
                'neon-amber':  '#fbbf24',
                // shadcn CSS variable tokens
                brand: {
                    DEFAULT: '#39ff8a',
                    hover:   '#22e872',
                },
                surface:      '#13161d',
                'card-bg':    '#13161d',
                'border-col': '#1f2433',
                muted:        '#4b5563',
                background:   'hsl(var(--background))',
                foreground:   'hsl(var(--foreground))',
                primary: {
                    DEFAULT:    'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT:    'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT:    'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                accent: {
                    DEFAULT:    'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT:    'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT:    'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            fontFamily: {
                sans:  ['Space Grotesk', 'system-ui', 'sans-serif'],
                mono:  ['JetBrains Mono', 'monospace'],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to:   { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to:   { height: "0" },
                },
                "pulse-glow": {
                    "0%, 100%": { boxShadow: "0 0 0 0 rgba(57,255,138,0.4)" },
                    "50%":      { boxShadow: "0 0 0 8px rgba(57,255,138,0)" },
                },
                "fade-in": {
                    from: { opacity: "0", transform: "translateY(10px)" },
                    to:   { opacity: "1", transform: "translateY(0)" },
                },
                "flicker": {
                    "0%, 100%": { opacity: "1" },
                    "92%":      { opacity: "1" },
                    "93%":      { opacity: "0.6" },
                    "94%":      { opacity: "1" },
                    "96%":      { opacity: "0.8" },
                    "98%":      { opacity: "1" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up":   "accordion-up 0.2s ease-out",
                "pulse-glow":     "pulse-glow 2s infinite",
                "fade-in":        "fade-in 0.4s ease-out",
                "flicker":        "flicker 5s infinite",
            },
        },
    },
    plugins: [],
}
