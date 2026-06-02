import Image from 'next/image';
import Link from 'next/link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export default async function HaberDetay({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  // Vercel'deki canlı Strapi URL'ini oku, yoksa yereli fallback kullan
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';

  // Detay haber bilgisini canlı sunucudan çekiyoruz
  const res = await fetch(`${strapiUrl}/api/habers/${resolvedParams.id}?populate=*`, { cache: 'no-store' });
  const veri = await res.json();
  const haber = veri.data;

  if (!haber) return <div className="p-10 text-center font-bold text-red-500">Haber bulunamadı.</div>;

  // Ana kapak görseli için CDN kontrolü
  const mainImageUrl = haber.KapakGorseli?.[0]?.url
    ? (haber.KapakGorseli[0].url.startsWith('http') ? haber.KapakGorseli[0].url : `${strapiUrl}${haber.KapakGorseli[0].url}`)
    : null;

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
      
      {/* Üst Kısım: Geri Dönüş Linki */}
      <Link href="/" className="text-blue-600 mb-8 inline-flex items-center hover:text-blue-800 font-semibold transition-colors">
        &larr; <span className="ml-2">Ana Sayfaya Dön</span>
      </Link>
      
      <article>
        {/* Devasa ve Şık Başlık */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-gray-900 leading-tight">
          {haber.Baslik}
        </h1>
        
        {/* İŞTE SİHRİN GERÇEKLEŞTİĞİ YER: Resim ve Metin Sarma (Float) */}
        <div className="relative clear-both">
          
          {/* Görseli sola yaslıyoruz (md:float-left) ve sağına boşluk veriyoruz (md:mr-8) */}
          {mainImageUrl && (
            <div className="w-full md:w-1/2 md:float-left md:mr-8 md:mb-6 mb-8 relative h-[350px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={mainImageUrl}
                alt={haber.Baslik}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}

          {/* Haber İçeriği - (max-w-none sınıfı metnin resmin etrafını sarmasını sağlar) */}
          <div className="prose lg:prose-xl max-w-none text-gray-700 leading-relaxed text-justify">
            {haber.Icerik ? <BlocksRenderer content={haber.Icerik} /> : <p>İçerik bulunamadı.</p>}
          </div>

        </div>

        {/* EKSTRA MÜHENDİSLİK: Eğer habere 1'den fazla fotoğraf eklediysen, geri kalanları alta küçük galeri olarak dizer */}
        {haber.KapakGorseli && haber.KapakGorseli.length > 1 && (
            <div className="mt-16 pt-8 border-t border-gray-200 clear-both">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Haberden Diğer Kareler</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                    {haber.KapakGorseli.slice(1).map((gorsel: any, index: number) => {
                        // Galeri resimleri için CDN veya local url tespiti
                        const galeriImageUrl = gorsel.url.startsWith('http') ? gorsel.url : `${strapiUrl}${gorsel.url}`;
                        
                        return (
                          <div key={index} className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shrink-0 shadow-md snap-center">
                              <Image
                                  src={galeriImageUrl}
                                  alt={`Görsel ${index + 2}`}
                                  fill
                                  className="object-cover"
                                  unoptimized
                              />
                          </div>
                        );
                    })}
                </div>
            </div>
        )}
      </article>
    </main>
  );
}