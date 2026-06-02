import Image from 'next/image';
import Link from 'next/link';

export default async function KategoriSayfasi({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const categoryId = resolvedParams.id;

  const catRes = await fetch(`http://127.0.0.1:1337/api/kategoris/${categoryId}`, { cache: 'no-store' });
  const catVeri = await catRes.json();
  const kategoriAdi = catVeri.data?.Ad || 'Kategori';

  const habRes = await fetch(`http://127.0.0.1:1337/api/habers?filters[kategori][documentId][$eq]=${categoryId}&populate=*`, { cache: 'no-store' });
  const habVeri = await habRes.json();
  const haberler = habVeri.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <div className="flex items-center justify-between border-b-2 border-gray-200 mb-10 pb-2">
        <h1 className="text-3xl font-extrabold text-blue-900 uppercase tracking-wide border-b-4 border-blue-600 pb-2 -mb-[10px]">
          {kategoriAdi} HABERLERİ
        </h1>
      </div>

      {haberler.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-zinc-500 text-xl font-medium">Bu kategoride henüz haber bulunmuyor.</p>
          <Link href="/" className="text-blue-600 mt-4 inline-block hover:underline">Ana Sayfaya Dön</Link>
        </div>
      ) : (
        <section className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {haberler.map((haber: any) => {
            const imageUrl = haber.KapakGorseli?.[0]?.url 
              ? `http://127.0.0.1:1337${haber.KapakGorseli[0].url}` 
              : null;

            return (
              <Link href={`/haber/${haber.documentId}`} key={haber.id} className="group flex flex-col">
                {imageUrl && (
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-5 bg-zinc-100 shadow-sm">
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
      )}

    </div>
  );
}