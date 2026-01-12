/**
 * ÖĞRENCİ FRONTEND JAVASCRIPT
 * 
 * Bu dosya, öğrenci yönetim sayfasının tüm frontend işlemlerini yönetir.
 * 
 * Öğrenilecek JavaScript özellikleri:
 * - fetch() API → HTTP istekleri göndermek için
 * - async/await → Asenkron işlemleri yönetmek için
 * - document API → DOM manipülasyonu için
 * - Event Listeners → Kullanıcı etkileşimlerini yakalamak için
 * - Form API → Form verilerini almak için
 * 
 * ============================================
 * SAYFA YÜKLENDİĞİNDE NE OLUYOR? (F5 YAPTIĞINIZDA)
 * ============================================
 * 
 * 1. HTML sayfası yüklenir (ogrenciler.html)
 * 2. Bu JavaScript dosyası yüklenir (ogrenciler.js)
 * 3. DOMContentLoaded event tetiklenir (HTML hazır olduğunda)
 * 4. loadOgrenciler() çalışır → API'den öğrenci listesi çekilir
 * 5. renderOgrenciler() çalışır → Liste tabloya yazılır
 * 6. setupFormListener() çalışır → Form dinlenmeye başlar
 * 
 * ============================================
 * KULLANICI BİR ŞEY YAPTIĞINDA NE OLUYOR?
 * ============================================
 * 
 * "Öğrenci Ekle" butonuna tıklama:
 * → handleFormSubmit() çalışır
 * → Form verileri alınır
 * → API'ye POST isteği gönderilir
 * → Liste yenilenir
 * 
 * "Düzenle" butonuna tıklama:
 * → handleEditOgrenci() çalışır
 * → API'den öğrenci bilgileri çekilir
 * → Form doldurulur
 * → Düzenleme modu aktif olur
 * 
 * "Güncelle" butonuna tıklama:
 * → handleFormSubmit() çalışır (düzenleme modunda)
 * → API'ye PUT isteği gönderilir
 * → Liste yenilenir
 * 
 * "Sil" butonuna tıklama:
 * → handleDeleteOgrenci() çalışır
 * → Onay sorulur
 * → API'ye DELETE isteği gönderilir
 * → Liste yenilenir
 * 
 * ============================================
 */

console.log('')
console.log('╔═══════════════════════════════════════════════════════╗')
console.log('║   ÖĞRENCİ YÖNETİM SİSTEMİ - JAVASCRIPT YÜKLENDİ      ║')
console.log('╚═══════════════════════════════════════════════════════╝')
console.log('')
console.log('📄 Dosya: public/js/ogrenciler.js')
console.log('🌐 Sayfa: http://localhost:3000/ogrenciler')
console.log('')
console.log('⏳ Sayfa yükleniyor, HTML hazır olması bekleniyor...')
console.log('   → DOMContentLoaded event\'i tetiklenince işlemler başlayacak')
console.log('')

// BURAYA DİKKAT: Global değişken - düzenleme modunda mıyız?
let isEditMode = false
let currentEditId = null

// ============================================
// SAYFA YÜKLENDİĞİNDE NE OLUYOR?
// ============================================
// 
// ŞU AN ÇALIŞAN KOD: DOMContentLoaded event listener
// 
// NE ZAMAN ÇALIŞIR?
// → Tarayıcı HTML'i tamamen yüklediğinde
// → F5 (sayfa yenileme) yaptığınızda
// → Sayfaya ilk kez geldiğinizde
//
// NEDEN GEREKLİ?
// → JavaScript kodu HTML'den önce yüklenebilir
// → Bu event ile HTML'in hazır olduğundan emin oluyoruz
// → Yoksa HTML elementlerini bulamayız!
//
// ŞİMDİ NE OLACAK?
// 1. loadOgrenciler() fonksiyonu çalışacak → API'den öğrenci listesi çekilecek
// 2. setupFormListener() çalışacak → Form submit event'i dinlenecek
// 3. İptal butonu event listener'ı eklenecek
//
console.log('📄 SAYFA YÜKLENDİ: DOMContentLoaded event tetiklendi!')
console.log('📍 Şu an çalışan: public/js/ogrenciler.js dosyası, satır 18-35 arası')
console.log('🔍 Ne yapıyoruz: Sayfa hazır olduğunda ilk işlemleri başlatıyoruz')

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ HTML hazır! Şimdi işlemleri başlatıyoruz...')
    
    // BURAYA DİKKAT: Toast göster - Sayfa yüklendi
    showToast(
        '📄 Sayfa Yüklendi',
        'Öğrenci Yönetim Sistemi sayfası hazır!<br>Çalışan kod: DOMContentLoaded event (public/js/ogrenciler.js, satır 95)<br>HTML içeriği tamamen yüklendi.',
        'info',
        4000
    )
    
    // Sayfa yüklendiğinde öğrenci listesini getir
    console.log('📞 loadOgrenciler() fonksiyonunu çağırıyoruz...')
    loadOgrenciler()
    
    // Form submit event'ini dinle
    console.log('📝 setupFormListener() fonksiyonunu çağırıyoruz...')
    setupFormListener()
    
    // İptal butonu event listener
    const cancelBtn = document.querySelector('#cancelBtn')
    if (cancelBtn) {
        console.log('❌ İptal butonu bulundu, event listener ekleniyor...')
        cancelBtn.addEventListener('click', () => {
            console.log('🔄 İptal butonuna tıklandı! Form sıfırlanıyor...')
            const form = document.querySelector('#ogrenciForm')
            form.reset()
            isEditMode = false
            currentEditId = null
            document.querySelector('#ogrenciForm h2').textContent = 'Yeni Öğrenci Ekle'
            document.querySelector('#submitBtn').textContent = 'Öğrenci Ekle'
            document.querySelector('#cancelBtn').style.display = 'none'
            console.log('✅ Form sıfırlandı, düzenleme modu kapatıldı')
        })
    } else {
        console.log('⚠️ İptal butonu bulunamadı (normal, sayfa ilk yüklendiğinde görünmez)')
    }
    
    console.log('🎉 Sayfa yükleme işlemleri tamamlandı!')
})

/**
 * Tüm öğrencileri API'den çek ve göster
 * 
 * BURAYA DİKKAT: async/await kullanımı
 * - async: Bu fonksiyon asenkron bir fonksiyondur
 * - await: fetch() işlemi bitene kadar bekler
 * - Neden await? API çağrısı zaman alır, await olmadan sonuç gelmeden devam eder
 * 
 * NE ZAMAN ÇALIŞIR?
 * → Sayfa yüklendiğinde (DOMContentLoaded)
 * → Yeni öğrenci eklendiğinde
 * → Öğrenci güncellendiğinde
 * → Öğrenci silindiğinde
 */
const loadOgrenciler = async () => {
    console.log('')
    console.log('═══════════════════════════════════════════════════════')
    console.log('📡 loadOgrenciler() FONKSİYONU ÇALIŞIYOR')
    console.log('═══════════════════════════════════════════════════════')
    console.log('📍 Şu an çalışan: public/js/ogrenciler.js, loadOgrenciler() fonksiyonu')
    console.log('🎯 Amacımız: API\'den öğrenci listesini çekmek')
    
    try {
        // BURAYA DİKKAT: Toast göster - API isteği gönderiliyor
        // API MANTIĞI AÇIKLAMASI:
        // GET isteği → Veri çekmek için kullanılır
        // Backend'de ne olacak?
        // 1. routers/ogrenciRoutes.js → GET /api/ogrenciler route'u çalışır
        // 2. controllers/ogrenciController.js → getAllOgrencilerController() çalışır
        // 3. models/ogrenciModel.js → getAllOgrenciler() veritabanından tüm öğrencileri çeker
        // 4. SELECT * FROM ogrenci_bilgi sorgusu çalışır
        // 5. Tüm öğrenciler döner
        showToast(
            '🌐 API İsteği Gönderiliyor',
            `<strong>API MANTIĞI - GET İsteği:</strong><br>
            <br>
            <strong>1. HTTP Metodu: GET</strong><br>
            → Veri çekmek için kullanılır<br>
            → Body (veri gönderme) yok, sadece URL var<br>
            → Tarayıcı adres çubuğuna yazmak gibi<br>
            <br>
            <strong>2. Endpoint: /api/ogrenciler</strong><br>
            → Backend'deki route (routers/ogrenciRoutes.js)<br>
            → router.get('/', getAllOgrencilerController)<br>
            → getAllOgrencilerController() fonksiyonu çağrılacak<br>
            <br>
            <strong>3. Backend İşlem Akışı:</strong><br>
            → Route → Controller → Model → Veritabanı<br>
            → routers/ogrenciRoutes.js<br>
            → controllers/ogrenciController.js<br>
            → models/ogrenciModel.js<br>
            → SELECT * FROM ogrenci_bilgi<br>
            <br>
            <strong>4. Veritabanı Sorgusu:</strong><br>
            → SELECT * FROM ogrenci_bilgi<br>
            → Tüm öğrenciler çekilir<br>
            → Array (liste) olarak döner<br>
            <br>
            <strong>Çalışan Kod:</strong><br>
            await fetch("/api/ogrenciler")<br>
            → GET isteği gönderildi, sunucu cevap bekleniyor`,
            'info',
            0
        )
        
        // BURAYA DİKKAT: fetch() API kullanımı
        // fetch() → HTTP isteği gönderir ve Promise döner
        // GET isteği varsayılan olarak gönderilir
        // URL: API endpoint'imiz
        console.log('🌐 API\'ye istek gönderiliyor: GET /api/ogrenciler')
        console.log('⏳ Sunucudan cevap bekleniyor...')
        
        const response = await fetch('/api/ogrenciler')
        
        console.log('📥 Sunucudan cevap geldi!')
        console.log('📊 Response durumu:', response.status, response.statusText)
        
        // BURAYA DİKKAT: Toast göster - Sunucudan cevap geldi
        showToast(
            '📥 Sunucudan Cevap Geldi',
            `HTTP Status: ${response.status} ${response.statusText}<br>Çalışan kod: const response = await fetch(...)<br>Sunucu işlemi tamamladı!`,
            'info',
            2000
        )
        
        // BURAYA DİKKAT: Response kontrolü
        // response.ok → Status 200-299 arası ise true
        // Hata durumunda throw ile hata fırlatıyoruz
        if (!response.ok) {
            console.error('❌ HATA: Sunucu hata döndü!')
            console.error('   Status:', response.status)
            console.error('   Status Text:', response.statusText)
            
            // Hata detaylarını al
            let errorMessage = `HTTP error! status: ${response.status}`
            try {
                const errorData = await response.json()
                console.error('   Hata detayları:', errorData)
                errorMessage = errorData.error?.message || errorData.message || errorMessage
            } catch (e) {
                console.error('   Hata detayları alınamadı')
            }
            
            throw new Error(errorMessage)
        }
        
        console.log('✅ Response başarılı! (Status 200)')
        
        // BURAYA DİKKAT: Toast göster - Başarılı response
        showToast(
            '✅ Başarılı Response',
            `HTTP Status: ${response.status} (OK)<br>Sunucu başarılı cevap döndü!<br>Çalışan kod: response.ok kontrolü geçti`,
            'success',
            2000
        )
        
        // BURAYA DİKKAT: JSON veriyi parse etme
        // response.json() → Response'u JSON formatına çevirir
        // Bu da bir Promise döner, bu yüzden await kullanıyoruz
        console.log('📦 JSON verisi parse ediliyor...')
        const result = await response.json()
        
        // BURAYA DİKKAT: Console.log ile test
        // Tarayıcı console'unda (F12) sonuçları görebiliriz
        console.log('✅ API\'den gelen veri:', result)
        console.log('📊 Toplam öğrenci sayısı:', result.count || result.data?.length || 0)
        
        // BURAYA DİKKAT: DOM manipülasyonu
        // API'den gelen veriyi tabloya yazdırıyoruz
        // result.data → API'den gelen öğrenci listesi
        if (result.data && result.data.length > 0) {
            console.log('📋 Tabloya yazdırılıyor...')
            console.log('   → renderOgrenciler() fonksiyonu çağrılacak')
            renderOgrenciler(result.data)
            console.log('✅ Tablo güncellendi!')
        } else {
            console.log('⚠️ Öğrenci bulunamadı, boş mesaj gösteriliyor...')
            // Eğer öğrenci yoksa bilgi mesajı göster
            const tbody = document.querySelector('#ogrenciTableBody')
            if (tbody) {
                tbody.innerHTML = '<tr><td colspan="9">Henüz öğrenci kaydı bulunmamaktadır.</td></tr>'
                console.log('✅ Boş mesaj gösterildi')
            }
        }
        
        console.log('═══════════════════════════════════════════════════════')
        console.log('✅ loadOgrenciler() FONKSİYONU TAMAMLANDI')
        console.log('═══════════════════════════════════════════════════════')
        console.log('')
        
    } catch (error) {
        // BURAYA DİKKAT: Hata yönetimi
        // try-catch ile hataları yakalıyoruz
        console.error('')
        console.error('═══════════════════════════════════════════════════════')
        console.error('❌ HATA YAKALANDI!')
        console.error('═══════════════════════════════════════════════════════')
        console.error('📍 Hata oluştu: loadOgrenciler() fonksiyonunda')
        console.error('💥 Hata mesajı:', error.message)
        console.error('📚 Hata detayları:', error)
        console.error('')
        console.error('🔍 ÇÖZÜM ÖNERİLERİ:')
        console.error('   1. Sunucunun çalıştığından emin olun (npm start)')
        console.error('   2. .env dosyasının doğru yapılandırıldığını kontrol edin')
        console.error('   3. Veritabanı bağlantısını kontrol edin')
        console.error('   4. Tarayıcı console\'unda (F12) Network sekmesinde isteği kontrol edin')
        console.error('═══════════════════════════════════════════════════════')
        console.error('')
        
        alert('Öğrenciler yüklenirken bir hata oluştu!\n\nHata: ' + error.message + '\n\nDetaylar için F12 ile console\'u açın.')
    }
}

/**
 * Form submit event listener'ını ayarla
 * 
 * NE ZAMAN ÇALIŞIR?
 * → Sayfa yüklendiğinde (DOMContentLoaded)
 * 
 * NE YAPIYOR?
 * → Form elementini buluyor
 * → Form submit olduğunda (Enter veya butona tıklama) handleFormSubmit() çalışacak
 */
const setupFormListener = () => {
    console.log('📝 setupFormListener() çalışıyor...')
    
    // BURAYA DİKKAT: document.querySelector() kullanımı
    // Form elementini ID'sine göre buluyoruz
    const form = document.querySelector('#ogrenciForm')
    
    if (form) {
        console.log('✅ Form bulundu! (#ogrenciForm)')
        // BURAYA DİKKAT: addEventListener() kullanımı
        // Form submit olduğunda (butona tıklanınca) bu fonksiyon çalışır
        form.addEventListener('submit', handleFormSubmit)
        console.log('👂 Form submit event listener eklendi')
        console.log('   → Artık form gönderildiğinde handleFormSubmit() çalışacak')
    } else {
        console.error('❌ Form bulunamadı! (#ogrenciForm)')
    }
}

/**
 * Form submit işlemini yönet
 * 
 * NE ZAMAN ÇALIŞIR?
 * → "Öğrenci Ekle" veya "Güncelle" butonuna tıklandığında
 * → Form içinde Enter tuşuna basıldığında
 * 
 * BURAYA DİKKAT: Event handler fonksiyonu
 * - event parametresi → Form submit event'i
 * - preventDefault() → Form'un varsayılan davranışını (sayfa yenileme) engeller
 */
const handleFormSubmit = async (event) => {
    console.log('')
    console.log('═══════════════════════════════════════════════════════')
    console.log('📝 FORM GÖNDERİLDİ! handleFormSubmit() ÇALIŞIYOR')
    console.log('═══════════════════════════════════════════════════════')
    console.log('📍 Şu an çalışan: public/js/ogrenciler.js, handleFormSubmit() fonksiyonu')
    console.log('👆 Kullanıcı ne yaptı: Form gönderme butonuna tıkladı veya Enter\'a bastı')
    
    // BURAYA DİKKAT: Toast göster - Form gönderildi
    showToast(
        '📝 Form Gönderildi',
        'Form gönderme butonuna tıklandı veya Enter\'a basıldı!<br>Çalışan kod: handleFormSubmit() fonksiyonu (public/js/ogrenciler.js, satır 315)<br>Form submit event tetiklendi.',
        'info',
        3000
    )
    
    // BURAYA DİKKAT: preventDefault()
    // Form'un varsayılan davranışını engelliyoruz
    // Yoksa sayfa yenilenir ve veriler kaybolur
    console.log('🛑 Form\'un varsayılan davranışı engellendi (sayfa yenilenmeyecek)')
    event.preventDefault()
    
    // BURAYA DİKKAT: Toast göster - preventDefault çalıştı
    showToast(
        '🛑 Sayfa Yenileme Engellendi',
        'event.preventDefault() çalıştı!<br>Form\'un varsayılan davranışı (sayfa yenileme) engellendi.<br>Artık JavaScript ile işlem yapacağız.',
        'info',
        2000
    )
    
    // BURAYA DİKKAT: Form verilerini alma
    // FormData API kullanarak form verilerini alıyoruz
    console.log('📋 Form verileri alınıyor...')
    
    // BURAYA DİKKAT: Toast göster - Form verileri alınıyor
    showToast(
        '📋 Form Verileri Alınıyor',
        'FormData API kullanılarak form verileri alınıyor...<br>Çalışan kod: const formData = new FormData(form)',
        'info',
        2000
    )
    
    const form = event.target
    const formData = new FormData(form)
    console.log('   → FormData oluşturuldu, tüm input değerleri alındı')
    
    // BURAYA DİKKAT: FormData'dan Object'e çevirme
    // FormData'yı JSON'a çevirmek için Object.fromEntries() kullanıyoruz
    const ogrenciData = {}
    formData.forEach((value, key) => {
        // BURAYA DİKKAT: Veri tipi dönüşümü
        // Sayısal alanları number'a çeviriyoruz
        if (['Ogr_No', 'Bolum_Kod', 'Fakulte_Kod', 'Ogr_Tel', 'Ogr_Dosya_No', 'Tur_Kod', 'Durum_Kod'].includes(key)) {
            ogrenciData[key] = parseInt(value) || 0
        } else {
            ogrenciData[key] = value
        }
    })
    console.log('✅ Form verileri JavaScript objesine çevrildi:', ogrenciData)
    
    try {
        let response
        
        if (isEditMode && currentEditId) {
            // BURAYA DİKKAT: PUT isteği ile güncelleme
            // method: 'PUT' → Güncelleme işlemi
            // URL'de öğrenci numarası var
            console.log('🔄 DÜZENLEME MODU: Mevcut öğrenci güncelleniyor...')
            console.log('   → Öğrenci No:', currentEditId)
            console.log('   → API endpoint: PUT /api/ogrenciler/' + currentEditId)
            console.log('   → Gönderilen veri:', ogrenciData)
            
            // BURAYA DİKKAT: Toast göster - PUT isteği
            // API MANTIĞI AÇIKLAMASI:
            // PUT isteği → Mevcut veriyi güncellemek için kullanılır
            // Backend'de ne olacak?
            // 1. routers/ogrenciRoutes.js → PUT /api/ogrenciler/:id route'u çalışır
            // 2. controllers/ogrenciController.js → updateOgrenciController() çalışır
            // 3. models/ogrenciModel.js → updateOgrenci() veritabanında UPDATE yapar
            // 4. UPDATE ogrenci_bilgi SET ... WHERE Ogr_No = ? sorgusu çalışır
            // 5. Öğrenci bilgileri güncellenir
            showToast(
                '🔄 Güncelleme İsteği Gönderiliyor',
                `<strong>API MANTIĞI - PUT İsteği:</strong><br>
                <br>
                <strong>1. HTTP Metodu: PUT</strong><br>
                → Mevcut veriyi güncellemek için kullanılır<br>
                → Body'de güncellenecek veri gönderilir<br>
                → URL'de hangi kaydın güncelleneceği belirtilir (ID)<br>
                <br>
                <strong>2. Endpoint: PUT /api/ogrenciler/:id</strong><br>
                → :id → Route parametresi (öğrenci numarası)<br>
                → Backend'deki route (routers/ogrenciRoutes.js)<br>
                → router.put('/:id', updateOgrenciController)<br>
                → updateOgrenciController() fonksiyonu çağrılacak<br>
                <br>
                <strong>3. Backend İşlem Akışı:</strong><br>
                → Route → Controller → Model → Veritabanı<br>
                → routers/ogrenciRoutes.js<br>
                → controllers/ogrenciController.js<br>
                → models/ogrenciModel.js<br>
                → UPDATE ogrenci_bilgi SET ... WHERE Ogr_No = ?<br>
                <br>
                <strong>4. Veritabanı İşlemi:</strong><br>
                → UPDATE ogrenci_bilgi SET Ogr_Ad = ?, Ogr_Soyad = ?, ... WHERE Ogr_No = ?<br>
                → ? işareti → Placeholder (parametreli sorgu)<br>
                → SQL injection koruması için kullanılır<br>
                → Mevcut kayıt güncellenir<br>
                <br>
                <strong>5. Gönderilen Veri (Body):</strong><br>
                → JSON.stringify(ogrenciData)<br>
                → Güncellenecek alanlar JSON formatında<br>
                → { Ogr_Ad: "Yeni Ad", Ogr_Soyad: "Yeni Soyad", ... }<br>
                <br>
                <strong>Çalışan Kod:</strong><br>
                await fetch("/api/ogrenciler/${currentEditId}", {<br>
                &nbsp;&nbsp;method: "PUT",<br>
                &nbsp;&nbsp;headers: { "Content-Type": "application/json" },<br>
                &nbsp;&nbsp;body: JSON.stringify(ogrenciData)<br>
                })`,
                'info',
                0
            )
            
            response = await fetch(`/api/ogrenciler/${currentEditId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ogrenciData)
            })
            console.log('⏳ Sunucudan cevap bekleniyor...')
        } else {
            // BURAYA DİKKAT: fetch() ile POST isteği
            // method: 'POST' → POST isteği gönderir
            // headers: Content-Type belirtiyoruz (JSON gönderiyoruz)
            // body: JSON.stringify() → JavaScript objesini JSON string'e çevirir
            console.log('➕ YENİ KAYIT MODU: Yeni öğrenci ekleniyor...')
            console.log('   → API endpoint: POST /api/ogrenciler')
            console.log('   → Gönderilen veri:', ogrenciData)
            console.log('   → JSON formatına çevriliyor...')
            
            // BURAYA DİKKAT: Toast göster - POST isteği
            // API MANTIĞI AÇIKLAMASI:
            // POST isteği → Yeni veri oluşturmak için kullanılır
            // Backend'de ne olacak?
            // 1. routers/ogrenciRoutes.js → POST /api/ogrenciler route'u çalışır
            // 2. controllers/ogrenciController.js → createOgrenciController() çalışır
            // 3. models/ogrenciModel.js → createOgrenci() veritabanına INSERT yapar
            // 4. INSERT INTO ogrenci_bilgi VALUES (...) sorgusu çalışır
            // 5. Yeni öğrenci veritabanına kaydedilir
            showToast(
                '➕ Yeni Öğrenci Ekleme İsteği Gönderiliyor',
                `<strong>API MANTIĞI - POST İsteği:</strong><br>
                <br>
                <strong>1. HTTP Metodu: POST</strong><br>
                → Yeni veri oluşturmak için kullanılır<br>
                → Body'de veri gönderilir (JSON formatında)<br>
                → Form göndermek gibi<br>
                <br>
                <strong>2. Endpoint: POST /api/ogrenciler</strong><br>
                → Backend'deki route (routers/ogrenciRoutes.js)<br>
                → router.post('/', createOgrenciController)<br>
                → createOgrenciController() fonksiyonu çağrılacak<br>
                <br>
                <strong>3. Backend İşlem Akışı:</strong><br>
                → Route → Controller → Model → Veritabanı<br>
                → routers/ogrenciRoutes.js<br>
                → controllers/ogrenciController.js<br>
                → models/ogrenciModel.js<br>
                → INSERT INTO ogrenci_bilgi VALUES (...)<br>
                <br>
                <strong>4. Veritabanı İşlemi:</strong><br>
                → INSERT INTO ogrenci_bilgi (Ogr_No, Ogr_Ad, ...) VALUES (?, ?, ...)<br>
                → ? işareti → Placeholder (parametreli sorgu)<br>
                → SQL injection koruması için kullanılır<br>
                → Yeni kayıt oluşturulur<br>
                <br>
                <strong>5. Gönderilen Veri (Body):</strong><br>
                → JSON.stringify(ogrenciData)<br>
                → JavaScript objesi → JSON string'e çevrildi<br>
                → { Ogr_No: 123, Ogr_Ad: "Ahmet", ... }<br>
                <br>
                <strong>Çalışan Kod:</strong><br>
                await fetch("/api/ogrenciler", {<br>
                &nbsp;&nbsp;method: "POST",<br>
                &nbsp;&nbsp;headers: { "Content-Type": "application/json" },<br>
                &nbsp;&nbsp;body: JSON.stringify(ogrenciData)<br>
                })`,
                'info',
                0
            )
            
            response = await fetch('/api/ogrenciler', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // BURAYA DİKKAT: JSON gönderdiğimizi belirtiyoruz
                },
                body: JSON.stringify(ogrenciData) // BURAYA DİKKAT: JSON.stringify() kullanımı
            })
            console.log('⏳ Sunucudan cevap bekleniyor...')
        }
        
        // BURAYA DİKKAT: Toast göster - Sunucudan cevap geldi
        showToast(
            '📥 Sunucudan Cevap Geldi',
            `HTTP Status: ${response.status} ${response.statusText}<br>Çalışan kod: const response = await fetch(...)<br>Sunucu işlemi tamamladı!`,
            'info',
            2000
        )
        
        // BURAYA DİKKAT: Response kontrolü
        console.log('📥 Sunucudan cevap geldi!')
        console.log('   → Status:', response.status, response.statusText)
        
        if (!response.ok) {
            console.error('❌ HATA: Sunucu hata döndü!')
            const errorData = await response.json()
            console.error('   → Hata detayları:', errorData)
            throw new Error(errorData.message || errorData.error?.message || 'İşlem başarısız!')
        }
        
        // BURAYA DİKKAT: Başarılı response
        console.log('✅ Response başarılı! (Status 200 veya 201)')
        const result = await response.json()
        console.log('✅ İşlem başarılı! Sunucudan gelen cevap:', result)
        
        // BURAYA DİKKAT: Toast göster - Başarılı
        showToast(
            '🎉 İşlem Başarılı!',
            `${isEditMode ? 'Öğrenci güncellendi' : 'Yeni öğrenci eklendi'}!<br>Çalışan kod: const result = await response.json()<br>Liste yenileniyor...`,
            'success',
            3000
        )
        
        // Form'u temizle ve modu sıfırla
        console.log('🧹 Form temizleniyor...')
        form.reset()
        isEditMode = false
        currentEditId = null
        
        // Form başlığını ve butonunu sıfırla
        document.querySelector('#ogrenciForm h2').textContent = 'Yeni Öğrenci Ekle'
        document.querySelector('#submitBtn').textContent = 'Öğrenci Ekle'
        document.querySelector('#cancelBtn').style.display = 'none'
        console.log('✅ Form sıfırlandı, düzenleme modu kapatıldı')
        
        // Öğrenci listesini yenile
        console.log('🔄 Öğrenci listesi yenileniyor...')
        loadOgrenciler()
        
        // Başarı mesajı göster
        console.log('🎉 Kullanıcıya başarı mesajı gösteriliyor...')
        alert(result.message || 'İşlem başarılı!')
        
        console.log('═══════════════════════════════════════════════════════')
        console.log('✅ handleFormSubmit() FONKSİYONU TAMAMLANDI')
        console.log('═══════════════════════════════════════════════════════')
        console.log('')
        
    } catch (error) {
        // BURAYA DİKKAT: Hata yönetimi
        console.error('İşlem sırasında hata:', error)
        alert('Hata: ' + error.message)
    }
}

/**
 * Öğrenci listesini tabloya yazdır
 * 
 * NE ZAMAN ÇALIŞIR?
 * → loadOgrenciler() fonksiyonu API'den veri aldıktan sonra
 * 
 * NE YAPIYOR?
 * → HTML tablosunu buluyor
 * → Eski satırları temizliyor
 * → Her öğrenci için yeni bir satır oluşturuyor
 * → Satırları tabloya ekliyor
 * 
 * BURAYA DİKKAT: DOM manipülasyonu
 * - document.querySelector() → Element bulma
 * - createElement() → Yeni element oluşturma
 * - appendChild() → Element'e child ekleme
 * - innerHTML → Element içeriğini değiştirme
 * - template literals → Dinamik string oluşturma
 * 
 * @param {Array} ogrenciler - Öğrenci listesi
 */
const renderOgrenciler = (ogrenciler) => {
    console.log('')
    console.log('═══════════════════════════════════════════════════════')
    console.log('📋 renderOgrenciler() FONKSİYONU ÇALIŞIYOR')
    console.log('═══════════════════════════════════════════════════════')
    console.log('📍 Şu an çalışan: public/js/ogrenciler.js, renderOgrenciler() fonksiyonu')
    console.log('📊 İşlenecek öğrenci sayısı:', ogrenciler.length)
    
    // BURAYA DİKKAT: document.querySelector() kullanımı
    // Tablo body elementini buluyoruz
    console.log('🔍 Tablo body elementi aranıyor... (#ogrenciTableBody)')
    const tbody = document.querySelector('#ogrenciTableBody')
    
    if (!tbody) {
        console.error('❌ Tablo body elementi bulunamadı!')
        return
    }
    console.log('✅ Tablo body elementi bulundu!')
    
    // BURAYA DİKKAT: innerHTML ile temizleme
    // Önce tabloyu temizliyoruz (eski verileri kaldırıyoruz)
    console.log('🧹 Eski tablo satırları temizleniyor...')
    tbody.innerHTML = ''
    console.log('✅ Tablo temizlendi')
    
    // BURAYA DİKKAT: forEach ile döngü
    // Her öğrenci için bir satır oluşturuyoruz
    console.log('📝 Yeni satırlar oluşturuluyor...')
    ogrenciler.forEach((ogrenci, index) => {
        console.log(`   → ${index + 1}. öğrenci işleniyor: ${ogrenci.Ogr_Ad} ${ogrenci.Ogr_Soyad} (No: ${ogrenci.Ogr_No})`)
        // BURAYA DİKKAT: createElement() kullanımı
        // Yeni bir table row (tr) elementi oluşturuyoruz
        const row = document.createElement('tr')
        
        // BURAYA DİKKAT: Template literals kullanımı
        // Backtick (`) ile dinamik string oluşturuyoruz
        // ${} içine JavaScript değişkenleri yazılır
        row.innerHTML = `
            <td>${ogrenci.Ogr_No}</td>
            <td>${ogrenci.Ogr_Ad}</td>
            <td>${ogrenci.Ogr_Soyad}</td>
            <td>${ogrenci.Ogr_Giris_Tarih}</td>
            <td>${ogrenci.Bolum_Kod}</td>
            <td>${ogrenci.Fakulte_Kod}</td>
            <td>${ogrenci.Ogr_Tel}</td>
            <td>${ogrenci.Ogr_Adres}</td>
            <td>
                <button class="edit-btn" data-id="${ogrenci.Ogr_No}">Düzenle</button>
                <button class="delete-btn" data-id="${ogrenci.Ogr_No}">Sil</button>
            </td>
        `
        
        // BURAYA DİKKAT: appendChild() kullanımı
        // Oluşturduğumuz satırı tablo body'sine ekliyoruz
        tbody.appendChild(row)
        console.log(`      ✅ Satır tabloya eklendi`)
    })
    
    console.log('✅ Tüm satırlar oluşturuldu ve tabloya eklendi!')
    
    // BURAYA DİKKAT: Event listener'ları ayarla
    // Düzenle ve sil butonlarına event listener ekliyoruz
    console.log('👂 Düzenle ve sil butonlarına event listener ekleniyor...')
    setupActionButtons()
    
    console.log('═══════════════════════════════════════════════════════')
    console.log('✅ renderOgrenciler() FONKSİYONU TAMAMLANDI')
    console.log('═══════════════════════════════════════════════════════')
    console.log('')
}

/**
 * Düzenle ve sil butonlarına event listener ekle
 * 
 * NE ZAMAN ÇALIŞIR?
 * → renderOgrenciler() fonksiyonu tabloyu oluşturduktan sonra
 * 
 * NE YAPIYOR?
 * → Tablodaki tüm "Düzenle" butonlarını buluyor
 * → Tablodaki tüm "Sil" butonlarını buluyor
 * → Her butona tıklandığında ilgili fonksiyonu çalıştırıyor
 */
const setupActionButtons = () => {
    console.log('🔘 setupActionButtons() çalışıyor...')
    
    // BURAYA DİKKAT: querySelectorAll() kullanımı
    // Tüm düzenle butonlarını buluyoruz
    const editButtons = document.querySelectorAll('.edit-btn')
    const deleteButtons = document.querySelectorAll('.delete-btn')
    
    console.log('   → Bulunan düzenle butonu sayısı:', editButtons.length)
    console.log('   → Bulunan sil butonu sayısı:', deleteButtons.length)
    
    // BURAYA DİKKAT: forEach ile her butona event listener ekleme
    editButtons.forEach((button, index) => {
        button.addEventListener('click', async (e) => {
            const ogrNo = e.target.getAttribute('data-id')
            console.log(`🖊️ Düzenle butonuna tıklandı! (Öğrenci No: ${ogrNo})`)
            await handleEditOgrenci(ogrNo)
        })
        console.log(`   ✅ ${index + 1}. düzenle butonuna event listener eklendi`)
    })
    
    deleteButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            const ogrNo = e.target.getAttribute('data-id')
            console.log(`🗑️ Sil butonuna tıklandı! (Öğrenci No: ${ogrNo})`)
            handleDeleteOgrenci(ogrNo)
        })
        console.log(`   ✅ ${index + 1}. sil butonuna event listener eklendi`)
    })
    
    console.log('✅ Tüm butonlara event listener eklendi!')
}

/**
 * Öğrenci silme işlemini yönet
 * 
 * NE ZAMAN ÇALIŞIR?
 * → Tablodaki "Sil" butonuna tıklandığında
 * 
 * NE YAPIYOR?
 * → Kullanıcıya onay soruyor
 * → Onaylanırsa API'ye DELETE isteği gönderiyor
 * → Başarılı olursa listeyi yeniliyor
 * 
 * BURAYA DİKKAT: confirm() ile onay alma
 * - confirm() → Kullanıcıya onay dialogu gösterir
 * - true dönerse → Kullanıcı "Tamam" dedi
 * - false dönerse → Kullanıcı "İptal" dedi
 * 
 * BURAYA DİKKAT: fetch() ile DELETE isteği
 * - method: 'DELETE' → Silme işlemi
 * - DELETE isteğinde genellikle body gönderilmez
 * 
 * @param {string} ogrNo - Silinecek öğrenci numarası
 */
const handleDeleteOgrenci = async (ogrNo) => {
    console.log('')
    console.log('═══════════════════════════════════════════════════════')
    console.log('🗑️ SİLME İŞLEMİ BAŞLATILIYOR')
    console.log('═══════════════════════════════════════════════════════')
    console.log('📍 Şu an çalışan: public/js/ogrenciler.js, handleDeleteOgrenci() fonksiyonu')
    console.log('👆 Kullanıcı ne yaptı: Tablodaki "Sil" butonuna tıkladı')
    console.log('🎯 Silinecek öğrenci No:', ogrNo)
    
    // BURAYA DİKKAT: Toast göster - Sil butonuna tıklandı
    showToast(
        '🗑️ Sil Butonuna Tıklandı',
        `"Sil" butonuna tıklandı!<br>Öğrenci No: ${ogrNo}<br>Çalışan kod: handleDeleteOgrenci(${ogrNo}) fonksiyonu`,
        'warning',
        3000
    )
    
    // BURAYA DİKKAT: confirm() ile onay alma
    // Kullanıcıya silme işlemini onaylatıyoruz
    console.log('❓ Kullanıcıya onay soruluyor...')
    const confirmed = confirm('Bu öğrenciyi silmek istediğinize emin misiniz?')
    
    if (!confirmed) {
        // Kullanıcı iptal etti, işlemi durdur
        console.log('❌ Kullanıcı iptal etti, işlem durduruldu')
        
        // BURAYA DİKKAT: Toast göster - İptal edildi
        showToast(
            '❌ İşlem İptal Edildi',
            'Kullanıcı silme işlemini iptal etti.<br>Çalışan kod: if (!confirmed) return',
            'info',
            2000
        )
        
        console.log('═══════════════════════════════════════════════════════')
        console.log('')
        return
    }
    
    console.log('✅ Kullanıcı onayladı, silme işlemi devam ediyor...')
    
    // BURAYA DİKKAT: Toast göster - Onaylandı
    showToast(
        '✅ Silme Onaylandı',
        'Kullanıcı silme işlemini onayladı.<br>API\'ye DELETE isteği gönderiliyor...',
        'info',
        2000
    )
    
    try {
        // BURAYA DİKKAT: fetch() ile DELETE isteği
        // method: 'DELETE' → Silme işlemi
        // URL'de öğrenci numarası var
        console.log('🌐 API\'ye istek gönderiliyor: DELETE /api/ogrenciler/' + ogrNo)
        console.log('⏳ Sunucudan cevap bekleniyor...')
        
        // BURAYA DİKKAT: Toast göster - DELETE isteği
        // API MANTIĞI AÇIKLAMASI:
        // DELETE isteği → Veriyi silmek için kullanılır
        // Backend'de ne olacak?
        // 1. routers/ogrenciRoutes.js → DELETE /api/ogrenciler/:id route'u çalışır
        // 2. controllers/ogrenciController.js → deleteOgrenciController() çalışır
        // 3. models/ogrenciModel.js → deleteOgrenci() veritabanında DELETE yapar
        // 4. DELETE FROM ogrenci_bilgi WHERE Ogr_No = ? sorgusu çalışır
        // 5. Öğrenci veritabanından silinir
        showToast(
            '🗑️ Silme İsteği Gönderiliyor',
            `<strong>API MANTIĞI - DELETE İsteği:</strong><br>
            <br>
            <strong>1. HTTP Metodu: DELETE</strong><br>
            → Veriyi silmek için kullanılır<br>
            → Body (veri gönderme) genellikle yok<br>
            → URL'de hangi kaydın silineceği belirtilir (ID)<br>
            <br>
            <strong>2. Endpoint: DELETE /api/ogrenciler/:id</strong><br>
            → :id → Route parametresi (öğrenci numarası)<br>
            → Backend'deki route (routers/ogrenciRoutes.js)<br>
            → router.delete('/:id', deleteOgrenciController)<br>
            → deleteOgrenciController() fonksiyonu çağrılacak<br>
            <br>
            <strong>3. Backend İşlem Akışı:</strong><br>
            → Route → Controller → Model → Veritabanı<br>
            → routers/ogrenciRoutes.js<br>
            → controllers/ogrenciController.js<br>
            → models/ogrenciModel.js<br>
            → DELETE FROM ogrenci_bilgi WHERE Ogr_No = ?<br>
            <br>
            <strong>4. Veritabanı İşlemi:</strong><br>
            → DELETE FROM ogrenci_bilgi WHERE Ogr_No = ?<br>
            → ? işareti → Placeholder (parametreli sorgu)<br>
            → SQL injection koruması için kullanılır<br>
            → Kayıt veritabanından silinir<br>
            <br>
            <strong>5. Önemli:</strong><br>
            → Silme işlemi geri alınamaz!<br>
            → Bu yüzden onay istenir (confirm)<br>
            → Kullanıcı onayladıktan sonra işlem yapılır<br>
            <br>
            <strong>Çalışan Kod:</strong><br>
            await fetch("/api/ogrenciler/${ogrNo}", {<br>
            &nbsp;&nbsp;method: "DELETE"<br>
            })`,
            'info',
            0
        )
        
        const response = await fetch(`/api/ogrenciler/${ogrNo}`, {
            method: 'DELETE'
        })
        
        console.log('📥 Sunucudan cevap geldi! Status:', response.status)
        
        // BURAYA DİKKAT: Toast göster - Sunucudan cevap geldi
        showToast(
            '📥 Sunucudan Cevap Geldi',
            `HTTP Status: ${response.status} ${response.statusText}<br>Çalışan kod: const response = await fetch(...)<br>Sunucu işlemi tamamladı!`,
            'info',
            2000
        )
        
        // BURAYA DİKKAT: Response kontrolü
        if (!response.ok) {
            console.error('❌ HATA: Sunucu hata döndü!')
            const errorData = await response.json()
            console.error('   → Hata detayları:', errorData)
            throw new Error(errorData.message || errorData.error?.message || 'Öğrenci silinirken bir hata oluştu!')
        }
        
        // BURAYA DİKKAT: Başarılı response
        console.log('✅ Response başarılı! (Status 200)')
        const result = await response.json()
        console.log('✅ Öğrenci silindi! Sunucudan gelen cevap:', result)
        
        // BURAYA DİKKAT: Toast göster - Başarılı silme
        showToast(
            '✅ Öğrenci Silindi',
            `Öğrenci başarıyla silindi!<br>Çalışan kod: const result = await response.json()<br>Liste yenileniyor...`,
            'success',
            3000
        )
        
        // Öğrenci listesini yenile
        console.log('🔄 Öğrenci listesi yenileniyor...')
        loadOgrenciler()
        
        // Başarı mesajı göster
        console.log('🎉 Kullanıcıya başarı mesajı gösteriliyor...')
        alert(result.message || 'Öğrenci başarıyla silindi!')
        
        console.log('═══════════════════════════════════════════════════════')
        console.log('✅ handleDeleteOgrenci() FONKSİYONU TAMAMLANDI')
        console.log('═══════════════════════════════════════════════════════')
        console.log('')
        
    } catch (error) {
        // BURAYA DİKKAT: Hata yönetimi
        console.error('❌ HATA YAKALANDI!')
        console.error('   → Hata mesajı:', error.message)
        console.error('   → Hata detayları:', error)
        alert('Hata: ' + error.message)
        console.log('═══════════════════════════════════════════════════════')
        console.log('')
    }
}

/**
 * Öğrenci düzenleme işlemini başlat
 * 
 * NE ZAMAN ÇALIŞIR?
 * → Tablodaki "Düzenle" butonuna tıklandığında
 * 
 * NE YAPIYOR?
 * → API'den öğrenci bilgilerini çekiyor
 * → Form alanlarını bu bilgilerle dolduruyor
 * → Form'u düzenleme moduna alıyor
 * 
 * BURAYA DİKKAT: Form'u mevcut verilerle doldurma
 * - API'den öğrenci bilgilerini çekiyoruz
 * - Form alanlarını bu verilerle dolduruyoruz
 * 
 * @param {string} ogrNo - Düzenlenecek öğrenci numarası
 */
const handleEditOgrenci = async (ogrNo) => {
    console.log('')
    console.log('═══════════════════════════════════════════════════════')
    console.log('✏️ DÜZENLEME İŞLEMİ BAŞLATILIYOR')
    console.log('═══════════════════════════════════════════════════════')
    console.log('📍 Şu an çalışan: public/js/ogrenciler.js, handleEditOgrenci() fonksiyonu')
    console.log('👆 Kullanıcı ne yaptı: Tablodaki "Düzenle" butonuna tıkladı')
    console.log('🎯 Düzenlenecek öğrenci No:', ogrNo)
    
    // BURAYA DİKKAT: Toast göster - Düzenle butonuna tıklandı
    showToast(
        '✏️ Düzenle Butonuna Tıklandı',
        `"Düzenle" butonuna tıklandı!<br>Öğrenci No: ${ogrNo}<br>Çalışan kod: handleEditOgrenci(${ogrNo}) fonksiyonu`,
        'info',
        3000
    )
    
    try {
        // BURAYA DİKKAT: fetch() ile GET isteği (tek kayıt)
        // API'den öğrenci bilgilerini çekiyoruz
        console.log('🌐 API\'ye istek gönderiliyor: GET /api/ogrenciler/' + ogrNo)
        console.log('⏳ Öğrenci bilgileri bekleniyor...')
        
        // BURAYA DİKKAT: Toast göster - GET isteği
        showToast(
            '🌐 Öğrenci Bilgileri Çekiliyor',
            `Öğrenci bilgileri API'den çekiliyor...<br>Endpoint: GET /api/ogrenciler/${ogrNo}<br>Çalışan kod: await fetch("/api/ogrenciler/${ogrNo}")`,
            'info',
            2000
        )
        
        const response = await fetch(`/api/ogrenciler/${ogrNo}`)
        
        console.log('📥 Sunucudan cevap geldi! Status:', response.status)
        
        // BURAYA DİKKAT: Toast göster - Sunucudan cevap geldi
        showToast(
            '📥 Sunucudan Cevap Geldi',
            `HTTP Status: ${response.status} ${response.statusText}<br>Çalışan kod: const response = await fetch(...)<br>Öğrenci bilgileri alındı!`,
            'info',
            2000
        )
        
        if (!response.ok) {
            console.error('❌ HATA: Öğrenci bilgileri alınamadı!')
            throw new Error('Öğrenci bilgileri alınamadı!')
        }
        
        const result = await response.json()
        const ogrenci = result.data
        console.log('✅ Öğrenci bilgileri alındı:', ogrenci)
        
        // BURAYA DİKKAT: Form alanlarını doldurma
        // Form elementlerini bulup değerlerini set ediyoruz
        console.log('📝 Form alanları dolduruluyor...')
        document.querySelector('#ogrNo').value = ogrenci.Ogr_No
        document.querySelector('#ogrAd').value = ogrenci.Ogr_Ad
        document.querySelector('#ogrSoyad').value = ogrenci.Ogr_Soyad
        document.querySelector('#ogrGirisTarih').value = ogrenci.Ogr_Giris_Tarih
        document.querySelector('#bolumKod').value = ogrenci.Bolum_Kod
        document.querySelector('#fakulteKod').value = ogrenci.Fakulte_Kod
        document.querySelector('#ogrTel').value = ogrenci.Ogr_Tel
        document.querySelector('#ogrAdres').value = ogrenci.Ogr_Adres
        document.querySelector('#ogrDosyaNo').value = ogrenci.Ogr_Dosya_No
        document.querySelector('#turKod').value = ogrenci.Tur_Kod
        document.querySelector('#durumKod').value = ogrenci.Durum_Kod
        console.log('✅ Tüm form alanları dolduruldu')
        
        // BURAYA DİKKAT: Düzenleme modunu aktif et
        console.log('🔄 Düzenleme modu aktif ediliyor...')
        isEditMode = true
        currentEditId = ogrNo
        console.log('   → isEditMode = true')
        console.log('   → currentEditId =', ogrNo)
        
        // BURAYA DİKKAT: Toast göster - Form dolduruldu
        showToast(
            '✅ Form Dolduruldu',
            `Öğrenci bilgileri form'a yüklendi!<br>Düzenleme modu aktif.<br>Çalışan kod: Form alanları dolduruldu, isEditMode = true`,
            'success',
            3000
        )
        
        // Form başlığını ve butonunu değiştir
        console.log('📝 Form başlığı ve butonları güncelleniyor...')
        document.querySelector('#ogrenciForm h2').textContent = 'Öğrenci Düzenle'
        document.querySelector('#submitBtn').textContent = 'Güncelle'
        document.querySelector('#cancelBtn').style.display = 'inline-block'
        console.log('✅ Form düzenleme moduna alındı')
        
        // Form'u görünür yap (scroll)
        console.log('👁️ Form\'a kaydırılıyor (kullanıcı görebilsin diye)...')
        document.querySelector('#ogrenciForm').scrollIntoView({ behavior: 'smooth' })
        
        console.log('═══════════════════════════════════════════════════════')
        console.log('✅ handleEditOgrenci() FONKSİYONU TAMAMLANDI')
        console.log('═══════════════════════════════════════════════════════')
        console.log('')
        
    } catch (error) {
        console.error('❌ HATA YAKALANDI!')
        console.error('   → Hata mesajı:', error.message)
        console.error('   → Hata detayları:', error)
        alert('Hata: ' + error.message)
        console.log('═══════════════════════════════════════════════════════')
        console.log('')
    }
}

