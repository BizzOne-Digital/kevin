import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Niagara Pet Waste Removal | Professional Yard Cleaning Services',
  description: 'Niagara\'s #1 pet waste removal service. Keeping yards clean, one scoop at a time. Reliable, friendly, and fully insured. Get your FREE first visit today!',
  keywords: ['pet waste removal', 'dog poop cleanup', 'yard cleaning', 'Niagara', 'pet services'],
  authors: [{ name: 'Niagara Pet Waste Removal' }],
  openGraph: {
    title: 'Niagara Pet Waste Removal | Professional Yard Cleaning Services',
    description: 'Niagara\'s #1 pet waste removal service. Keeping yards clean, one scoop at a time.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#16A34A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
