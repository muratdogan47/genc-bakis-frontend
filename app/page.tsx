import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const res = await fetch('http://127.0.0.1:1337/api/habers?populate=*', { cache: 'no-store' });
  const veri = await res.json();
  const haberler = veri.data;

  if (!haberler || haberler.length === 0) {
    return <div className="p-10 text-center font-medium text-zinc-500">Henüz içerik oluşturulmadı.</div>;
  }

  const manset = haberler[0];
  const altHaberler = haberler.slice(1);

  const getImageUrl = (haber: any) => {
    return haber.KapakGorseli?.[0]?.url 
      ? `http://127.0.0.1:1337${haber.KapakGorseli[0].url}` 
      : null;
  };

  const mansetGorsel = getImageUrl(manset);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* MANŞET: Sinematik ve temiz */}
      <section className="mb-20">
        <Link href={`/haber/${manset.documentId}`} className="group relative flex flex-col md:flex-row gap-8 items-center">
          
          <div className="relative w-full md:w-2/3 h-[50vh] min-h-[450px] rounded-[2rem] overflow-hidden shadow-2xl shadow-zinc-200/50">
            {mansetGorsel && (
              <Image 
                src={mansetGorsel} 
                alt={manset.Baslik} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
                unoptimized 
              />
            )}
          </div>
          
          <div className="w-full md:w-1/3 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Öne Çıkan</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight leading-[1.1] mb-6 group-hover:text-blue-600 transition-colors">
              {manset.Baslik}
            </h1>
            <p className="text-zinc-500 font-medium flex items-center gap-2 group-hover:translate-x-2 transition-transform">
              Haberi İncele <span className="text-lg">&rarr;</span>
            </p>
          </div>

        </Link>
      </section>

      {/* ALT HABERLER: Minimalist kartlar */}
      {altHaberler.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-extrabold text-zinc-900 tracking-tight">En Son Eklenenler</h2>
          </div>

          <section className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {altHaberler.map((haber: any) => {
              const imageUrl = getImageUrl(haber);
              return (
                <Link href={`/haber/${haber.documentId}`} key={haber.id} className="group flex flex-col">
                  {imageUrl && (
                    <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-5 bg-zinc-100">
                      <Image 
                        src={imageUrl} 
                        alt={haber.Baslik} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                        unoptimized 
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-zinc-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {haber.Baslik}
                  </h3>
                </Link>
              );
            })}
          </section>
        </>
      )}

    </div>
  );
}