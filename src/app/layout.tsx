import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, Linkedin, Instagram } from 'lucide-react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://luckycharm.app'),
  title: "Lucky Charm - Small Objects. Meaningful Connections.",
  description: "A premium desktop companion for Windows and Mac. Experience native performance, meaningful rituals, and deep automation with interactive charms.",
  authors: [{ name: "Priyadharshan Chandranath", url: "https://priyadharshan-tau.vercel.app/" }],
  creator: "Priyadharshan Chandranath",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
  openGraph: {
    title: "Lucky Charm - Premium Desktop Companion",
    description: "Small Objects. Meaningful Connections.",
    url: "https://luckycharm.app",
    siteName: "Lucky Charm",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Lucky Charm Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucky Charm",
    description: "Small Objects. Meaningful Connections.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#09090b] text-neutral-100 selection:bg-white/30 font-sans bg-grain">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg tracking-tight flex items-center gap-2.5">
              <Image 
                src="/logo.png" 
                alt="Lucky Charm Logo" 
                width={28} 
                height={28} 
                className="rounded-lg shadow-sm border border-white/10" 
                priority 
              />
              <span>Lucky Charm</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400">
              <Link href="/#demo" className="hover:text-white transition-colors">Collections</Link>
              <Link href="/notes" className="hover:text-white transition-colors">What's New</Link>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/press" className="hover:text-white transition-colors">Press</Link>
              <Link href="/download" className="px-4 py-2 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors">Download</Link>
            </div>
          </div>
        </nav>
        
        <div className="flex-1 pt-16 relative z-10 bg-[#09090b] shadow-[0_20px_50px_rgba(0,0,0,0.8)] mb-[380px] md:mb-[220px]">
          {children}
        </div>

        <footer className="fixed bottom-0 left-0 right-0 z-0 border-t border-white/10 bg-[#050505] h-[380px] md:h-[220px] flex flex-col justify-between">
          <div className="max-w-[1400px] mx-auto px-6 pt-8 pb-4 grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="font-bold text-lg tracking-tight flex items-center gap-2.5 mb-2">
                <Image 
                  src="/logo.png" 
                  alt="Lucky Charm Logo" 
                  width={24} 
                  height={24} 
                  className="rounded-md border border-white/10" 
                />
                <span>Lucky Charm</span>
              </Link>
              <p className="text-neutral-500 max-w-sm mb-3 text-xs leading-relaxed">
                Bring magic to your desktop. Small objects. Meaningful connections. For Windows & macOS.
              </p>
              <p className="text-xs text-neutral-600">
                Built by <a href="https://priyadharshan-tau.vercel.app/#contact" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition-colors">Priyadharshan Chandranath</a>
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-white mb-3">Product</h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li><Link href="/download" className="hover:text-white transition-colors">Download</Link></li>
                <li><Link href="/#demo" className="hover:text-white transition-colors">Collections</Link></li>
                <li><Link href="/notes" className="hover:text-white transition-colors">What's New</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-white mb-3">Company</h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Creator</Link></li>
                <li><Link href="/press" className="hover:text-white transition-colors">Press Kit</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy & Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/5 py-4 w-full">
            <div className="max-w-[1400px] mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-neutral-600">
              <p>&copy; {new Date().getFullYear()} Priyadharshan Chandranath. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a href="https://priyadharshan-tau.vercel.app/#contact" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors" title="Portfolio"><Briefcase size={16} /></a>
                <a href="https://www.linkedin.com/in/priyadharshan-chandranath" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors" title="LinkedIn"><Linkedin size={16} /></a>
                <a href="https://www.instagram.com/priyadharshan_chandranath" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors" title="Instagram"><Instagram size={16} /></a>
                <div className="w-px h-4 bg-white/10 mx-2 hidden sm:block" />
                <Link href="/privacy" className="hover:text-neutral-400 transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-neutral-400 transition-colors">Terms</Link>
                <a href="mailto:priyadharshanchandranath@gmail.com" className="hover:text-neutral-400 transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
