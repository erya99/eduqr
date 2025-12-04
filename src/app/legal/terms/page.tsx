export default function TermsPage() {
  return (
    <article className="space-y-6 text-gray-700">
      <h1 className="text-3xl font-bold text-gray-900 pb-4 border-b">Kullanım Koşulları</h1>
      
      <p>Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Taraflar ve Amaç</h2>
        <p>
          Bu Kullanım Koşulları ("Sözleşme"), EduQR ("Hizmet Sağlayıcı") ile bu platforma üye olan veya hizmeti kullanan kişi/kurum ("Kullanıcı") arasında akdedilmiştir. Sitemize kayıt olarak bu koşulları kabul etmiş sayılırsınız.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Hizmetin Tanımı</h2>
        <p>
          EduQR, restoran ve işletmelerin dijital menü oluşturmasını, QR kod üretmesini ve menü içeriklerini yönetmesini sağlayan bir SaaS (Hizmet olarak Yazılım) platformudur.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Kullanıcı Sorumlulukları</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Kullanıcı, yüklediği menü içeriklerinden, görsellerden ve fiyat bilgilerinden bizzat sorumludur.</li>
          <li>Kullanıcı, yasalara aykırı, telif hakkı ihlali içeren veya uygunsuz içerik yükleyemez.</li>
          <li>Hesap güvenliği ve şifre gizliliği kullanıcının sorumluluğundadır.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Fikri Mülkiyet</h2>
        <p>
          EduQR platformunun tasarımı, yazılımı ve markası EduXperts bünyesine aittir. Kullanıcıların yüklediği içeriklerin mülkiyeti kullanıcıya aittir.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Hizmet İptali ve İade</h2>
        <p>
          Kullanıcı dilediği zaman aboneliğini iptal edebilir. Dijital hizmet olduğu için kullanılan sürenin iadesi yapılmaz, ancak bir sonraki dönem için ücret alınmaz.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Değişiklikler</h2>
        <p>
          EduQR, bu koşullarda önceden haber vermeksizin değişiklik yapma hakkını saklı tutar. Güncel koşullar bu sayfada yayınlanır.
        </p>
      </section>
    </article>
  );
}