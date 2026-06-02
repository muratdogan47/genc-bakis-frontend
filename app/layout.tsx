import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Genç Bakış | Yeni Nesil Haber',
  description: 'Gündem, teknoloji ve sinema dünyasından en güncel gelişmeler.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Vercel'deki canlı Strapi linkini oku, yoksa yereli fallback kullan
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
  
  let kategoriler = [];
  try {
    // Kategorileri de artık canlı sunucumuz üzerinden çekiyoruz
    const res = await fetch(`${strapiUrl}/api/kategoris`, { cache: 'no-store' });
    const veri = await res.json();
    kategoriler = veri.data || [];
  } catch (error) {
    console.error("Kategoriler çekilemedi:", error);
  }

  return (
    <html lang="tr">
      <body className={`${jakarta.className} bg-gray-50 text-gray-900 flex flex-col min-h-screen antialiased`}>
        
        <header className="sticky top-0 z-50 bg-blue-700 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              
              <div className="flex-shrink-0">
                <Link href="/" className="text-2xl font-extrabold tracking-tighter text-white">
                  GENÇ BAKIŞ<span className="text-blue-300">.</span>
                </Link>
              </div>
              
              <nav className="hidden md:flex space-x-8 font-semibold text-sm tracking-wide text-blue-100">
                {kategoriler.map((kategori: any) => (
                  <Link 
                    key={kategori.id} 
                    href={`/kategori/${kategori.documentId}`} 
                    className="hover:text-white transition-colors uppercase"
                  >
                    {kategori.Ad}
                  </Link>
                ))}
              </nav>

            </div>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-white border-t border-gray-200 py-12 text-center text-sm text-gray-500 mt-20">
          <p>&copy; 2026 Genç Bakış. Vizyoner bir bakış açısıyla kodlandı.</p>
        </footer>

      </body>
    </html>
  );
}