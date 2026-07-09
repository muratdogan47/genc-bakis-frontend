# 📰 Genç Bakış - Modern Digital News Platform (Frontend)

> **🎓 Academic Note:** This application was developed as the Frontend architecture for **Mehmet Hışmanoğlu's Graduation Project** at **Samsun 19 Mayıs University, Department of Journalism**.

Live Website: [genc-bakis-frontend.vercel.app](https://genc-bakis-frontend.vercel.app)
Backend Repository: [Genç Bakış Backend (Strapi)](https://github.com/muratdogan47/backend)

## 🚀 Overview / Proje Özeti
Genç Bakış is a high-performance, SEO-friendly digital news platform. Modern gazetecilik vizyonuyla tasarlanan bu ön yüz projesi, okuyuculara kesintisiz, hızlı ve estetik bir haber okuma deneyimi sunmak için geliştirilmiştir. Arka plandaki Headless CMS ile REST API üzerinden haberleşerek verileri dinamik olarak okuyucuya sunar.

## ✨ Key Features / Temel Özellikler
* **Server-Side Rendering (SSR):** Next.js altyapısı kullanılarak haber sayfaları sunucu tarafında oluşturulur. Bu sayede maksimum SEO performansı ve anında sayfa yüklenme (instant load) hızları elde edilir.
* **Dynamic Data Fetching:** `cache: 'no-store'` stratejisi kullanılarak API'den anlık veri çekilir. Son dakika haberleri, sistem önbelleğine (cache) takılmadan eşzamanlı olarak okuyucuya ulaşır.
* **Responsive & Modern UI:** Tailwind CSS kullanılarak tamamen mobil uyumlu, tipografi odaklı ve "Float" mantığıyla metin-görsel sarmalaması yapan modern bir okuyucu arayüzü tasarlanmıştır.
* **Smart CDN Handling:** Görsel linklemelerinde akıllı URL çözümlemesi yapılarak, hem localhost üzerinden hem de bulut CDN üzerinden gelen resimlerin dinamik olarak render edilmesi sağlanmıştır.

## 🛠️ Tech Stack
* **Framework:** Next.js (React)
* **Styling:** Tailwind CSS
* **Routing:** App Router
* **Deployment (CI/CD):** Vercel

## 🔗 Repository Links
Arka yüz veri yönetimi ve Headless CMS mimarisi için backend deposunu inceleyebilirsiniz:
👉 [Backend Repository](https://github.com/muratdogan47/backend)
