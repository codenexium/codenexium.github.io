import { CtaProvider } from '../src/lib/cta-context'
import { ThemeProvider } from '../src/lib/theme'
import { Navbar } from '../src/components/Navbar'
import { Footer } from '../src/components/Footer'
import { FloatingActions } from '../src/components/FloatingActions'
import { CtaModal } from '../src/components/CtaModal'
import { ScrollToTop } from '../src/components/ScrollToTop'
import { SITE, HUBSPOT } from '../src/lib/config'
import '../src/index.css'

export const metadata = {
  metadataBase: new URL('https://abhisheksharma.dev'),
  title: 'Abhishek Sharma-Full Stack Developer & AI Automation Expert',
  description:
    'Abhishek Sharma-Full Stack Developer & AI Automation Expert. I build websites and AI systems that businesses actually use, from first conversation to full deployment.',
  keywords: [
    'Abhishek Sharma',
    'Full Stack Developer',
    'AI Automation Expert',
    'website development',
    'WhatsApp CRM',
    'n8n automation',
    'marketing funnels',
    'SEO',
  ],
  authors: [{ name: SITE.name }],
  icons: {
    icon: '/Abhishek-Sharma.jpg',
  },
  openGraph: {
    type: 'website',
    title: 'Abhishek Sharma-Full Stack Developer & AI Automation Expert',
    description:
      'I build websites and AI systems that businesses actually use, from first conversation to full deployment.',
    siteName: 'Abhishek Sharma',
    locale: 'en_US',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#05060b',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();`,
          }}
        />
        {HUBSPOT.portalId && (
          <script
            id="hs-script-loader"
            async
            defer
            src={`//js-${HUBSPOT.region}.hs-scripts.com/${HUBSPOT.portalId}.js`}
          />
        )}
      </head>
      <body>
        <CtaProvider>
          <ThemeProvider>
            <ScrollToTop />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <FloatingActions />
            <CtaModal />
          </ThemeProvider>
        </CtaProvider>
      </body>
    </html>
  )
}
