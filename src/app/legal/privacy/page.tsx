export default function PrivacyPage() {
  return (
    <article className="space-y-6 text-gray-700">
      <h1 className="text-3xl font-bold text-gray-900 pb-4 border-b">Gizlilik Politikası ve KVKK Aydınlatma Metni</h1>
      
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Veri Sorumlusu</h2>
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz EduQR ("Şirket") tarafından aşağıda açıklanan kapsamda işlenebilecektir.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Hangi Verileri Topluyoruz?</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Kimlik Bilgileri:</strong> Ad, Soyad (Kayıt aşamasında).</li>
          <li><strong>İletişim Bilgileri:</strong> E-posta adresi, Telefon numarası.</li>
          <li><strong>Fatura Bilgileri:</strong> Fatura düzenlenmesi için yasal olarak zorunlu olan; Ad/Soyad veya Ticari Ünvan, T.C. Kimlik Numarası veya Vergi Numarası, Vergi Dairesi ve Açık Adres bilgileri.</li>
          <li><strong>İşlem Güvenliği:</strong> IP adresi, giriş-çıkış kayıtları.</li>
          <li><strong>Ödeme Bilgileri:</strong> Ödeme işlemleri PayTR altyapısı üzerinden güvenli bir şekilde gerçekleştirilmekte olup, kredi kartı bilgileriniz sunucularımızda ASLA saklanmamaktadır.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Verilerin İşlenme Amacı</h2>
        <p>
          Toplanan kişisel verileriniz; üyelik işlemlerinin gerçekleştirilmesi, hizmetin sağlanması, ödeme işlemlerinin yürütülmesi ve <strong>yasal fatura düzenleme yükümlülüklerinin yerine getirilmesi</strong> amacıyla işlenmektedir.
        </p>
      </section>

      {/* --- YENİ EKLENEN KRİTİK BÖLÜM --- */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Veri Saklama ve İmha Politikası (Veri Minimizasyonu)</h2>
        <p className="mb-2">
          Şirketimiz, KVKK'nın "Veri Minimizasyonu" ilkesini benimsemektedir. Bu kapsamda:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Fatura düzenlemek amacıyla toplanan hassas veriler (TCKN, Vergi No, Açık Adres), fatura kesim işlemi tamamlandıktan hemen sonra <strong>sistemlerimizden kalıcı olarak silinmektedir (Hard Delete).</strong>
          </li>
          <li>
            İşlem geçmişi kayıtlarımızda bu veriler geri döndürülemez şekilde maskelenerek (Örn: <em>Ah*** Yıl***</em> veya <em>12*****89</em> şeklinde) anonim olarak tutulmaktadır.
          </li>
          <li>
            Böylece kişisel verileriniz, işleme amacı ortadan kalktığı anda dijital ortamlarımızdan imha edilir ve olası veri ihlali risklerine karşı en üst düzeyde korunur.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Verilerin Aktarımı</h2>
        <p>
          Kişisel verileriniz, yasal zorunluluklar (Resmi makamlar, Gelir İdaresi Başkanlığı) ve hizmetin sağlanması için gerekli olan iş ortaklarımız (Clerk, PayTR, Cloudinary) dışında üçüncü kişilerle paylaşılmaz.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Haklarınız</h2>
        <p>
          KVKK'nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini isteme ve silinmesini talep etme hakkına sahipsiniz. Talepleriniz için bizimle iletişime geçebilirsiniz.
        </p>
      </section>
    </article>
  );
}