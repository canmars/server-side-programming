/**
 * API Öğrenme Sayfası JavaScript
 * 
 * Bu dosya, API endpoint'lerini etkileşimli olarak öğretmek için kullanılır.
 * Her butona tıklandığında gerçek API isteği gönderilir ve her adım toast ile açıklanır.
 */

import { showToast } from './toast.js'

// BURAYA DİKKAT: Event listener'lar dosyanın sonunda tanımlanacak
// Tüm fonksiyonlar tanımlandıktan sonra

/**
 * GET İsteği Test Fonksiyonu
 * 
 * NE ZAMAN ÇALIŞIR?
 * → "GET İsteği Gönder" butonuna tıklandığında
 * 
 * NE YAPIYOR?
 * → GET /api/ogrenciler isteği gönderir
 * → Tüm öğrencileri çeker
 * → Her adımı toast ile açıklar
 */
async function testGetRequest() {
    console.log('')
    console.log('═══════════════════════════════════════════════════════')
    console.log('🔵 GET İSTEĞİ BAŞLADI')
    console.log('═══════════════════════════════════════════════════════')
    
    // BURAYA DİKKAT: Toast göster - Butona tıklandı
    showToast(
        '👆 Butona Tıklandı',
        `<strong>GET İsteği Başlatıldı!</strong><br>
        <br>
        <strong>1. Buton Tıklama Event:</strong><br>
        → onclick="testGetRequest()" çalıştı<br>
        → public/js/api-ogren.js → testGetRequest() fonksiyonu çağrıldı<br>
        <br>
        <strong>2. Şimdi Ne Olacak?</strong><br>
        → fetch() ile GET isteği gönderilecek<br>
        → Endpoint: GET /api/ogrenciler<br>
        → Backend'de route çalışacak`,
        'info',
        0
    )
    
    try {
        // BURAYA DİKKAT: Toast göster - Route açıklaması
        showToast(
            '📍 1. ADIM: Route (routers/ogrenciRoutes.js)',
            `<strong>ROUTE KATMANI:</strong><br>
            <br>
            <strong>Dosya:</strong> routers/ogrenciRoutes.js<br>
            <strong>Çalışan Kod:</strong><br>
            router.get('/', getAllOgrencilerController)<br>
            <br>
            <strong>Ne Yapıyor?</strong><br>
            → GET /api/ogrenciler isteği geldi<br>
            → Express router bu isteği yakaladı<br>
            → getAllOgrencilerController() fonksiyonunu çağırdı<br>
            <br>
            <strong>Route Tanımı:</strong><br>
            → app.js'de: app.use('/api/ogrenciler', ogrenciRoutes)<br>
            → ogrenciRoutes.js'de: router.get('/', ...)<br>
            → Sonuç: GET /api/ogrenciler → getAllOgrencilerController()<br>
            <br>
            <strong>💡 Önemli:</strong><br>
            → Route sadece isteği yönlendirir<br>
            → İş mantığı Controller'da`,
            'info',
            0
        )
        
        // BURAYA DİKKAT: Toast göster - Controller açıklaması
        showToast(
            '📍 2. ADIM: Controller (controllers/ogrenciController.js)',
            `<strong>CONTROLLER KATMANI:</strong><br>
            <br>
            <strong>Dosya:</strong> controllers/ogrenciController.js<br>
            <strong>Çalışan Fonksiyon:</strong> getAllOgrencilerController()<br>
            <br>
            <strong>Ne Yapıyor?</strong><br>
            → İş mantığını yönetir<br>
            → Model katmanını çağırır<br>
            → Hata kontrolü yapar<br>
            → Response (cevap) hazırlar<br>
            <br>
            <strong>Çalışan Kod:</strong><br>
            const ogrenciler = await getAllOgrenciler()<br>
            → Model fonksiyonunu çağırır<br>
            → await → Model'den cevap bekler<br>
            <br>
            <strong>Response Hazırlama:</strong><br>
            → res.json({ success: true, data: ogrenciler })<br>
            → JSON formatında cevap döner<br>
            <br>
            <strong>💡 Önemli:</strong><br>
            → Controller, Model'i çağırır<br>
            → Veritabanı işlemi Model'de`,
            'info',
            0
        )
        
        // BURAYA DİKKAT: Toast göster - Model açıklaması
        showToast(
            '📍 3. ADIM: Model (models/ogrenciModel.js)',
            `<strong>MODEL KATMANI:</strong><br>
            <br>
            <strong>Dosya:</strong> models/ogrenciModel.js<br>
            <strong>Çalışan Fonksiyon:</strong> getAllOgrenciler()<br>
            <br>
            <strong>Ne Yapıyor?</strong><br>
            → Veritabanı bağlantısını kullanır<br>
            → SQL sorgusu çalıştırır<br>
            → Veritabanından veri çeker<br>
            → Veriyi Controller'a döndürür<br>
            <br>
            <strong>Çalışan Kod:</strong><br>
            const [rows] = await pool.query('SELECT * FROM ogrenci_bilgi')<br>
            <br>
            <strong>SQL Sorgusu:</strong><br>
            → SELECT * FROM ogrenci_bilgi<br>
            → Tüm öğrencileri çeker<br>
            → rows → Sonuç listesi<br>
            <br>
            <strong>Veritabanı Bağlantısı:</strong><br>
            → pool → db/db.js'den gelir<br>
            → MySQL connection pool<br>
            → await → Sorgu tamamlanana kadar bekler<br>
            <br>
            <strong>💡 Önemli:</strong><br>
            → Model sadece veritabanı işlemleri yapar<br>
            → İş mantığı Controller'da`,
            'info',
            0
        )
        
        // BURAYA DİKKAT: Toast göster - Veritabanı açıklaması
        showToast(
            '📍 4. ADIM: Veritabanı (MySQL)',
            `<strong>VERİTABANI İŞLEMİ:</strong><br>
            <br>
            <strong>SQL Sorgusu Çalıştı:</strong><br>
            → SELECT * FROM ogrenci_bilgi<br>
            <br>
            <strong>Ne Oluyor?</strong><br>
            → MySQL sunucusu sorguyu işler<br>
            → ogrenci_bilgi tablosundan tüm kayıtları çeker<br>
            → Sonuçları döndürür<br>
            <br>
            <strong>Sonuç:</strong><br>
            → Array (liste) olarak döner<br>
            → Her öğrenci bir obje<br>
            → { Ogr_No: 2014800647, Ogr_Ad: "Ahmet", ... }<br>
            <br>
            <strong>Geri Dönüş Yolu:</strong><br>
            → Veritabanı → Model → Controller → Route → Frontend<br>
            <br>
            <strong>💡 Önemli:</strong><br>
            → Veritabanı işlemi tamamlandı<br>
            → Şimdi response hazırlanıyor`,
            'info',
            0
        )
        
        // BURAYA DİKKAT: fetch() ile GET isteği
        // GET isteği → Veri çekmek için
        // Body yok, sadece URL var
        console.log('🌐 GET isteği gönderiliyor: /api/ogrenciler')
        
        showToast(
            '🌐 Frontend: fetch() İsteği Gönderiliyor',
            `<strong>FRONTEND İSTEĞİ:</strong><br>
            <br>
            <strong>Çalışan Kod:</strong><br>
            await fetch("/api/ogrenciler")<br>
            <br>
            <strong>Ne Yapıyor?</strong><br>
            → Tarayıcı HTTP GET isteği gönderir<br>
            → URL: http://localhost:3000/api/ogrenciler<br>
            → Method: GET<br>
            → Body: Yok (GET isteğinde body olmaz)<br>
            <br>
            <strong>İstek Yolu:</strong><br>
            → Tarayıcı → Express Sunucu → Route → Controller → Model → Veritabanı<br>
            <br>
            <strong>⏳ Sunucudan cevap bekleniyor...</strong>`,
            'info',
            0
        )
        
        const response = await fetch('/api/ogrenciler')
        
        // BURAYA DİKKAT: Response geldi
        console.log('📥 Response geldi:', response.status)
        
        showToast(
            '📥 Response Geldi',
            `<strong>RESPONSE (YANIT):</strong><br>
            <br>
            <strong>HTTP Status:</strong> ${response.status} ${response.statusText}<br>
            <br>
            <strong>Response Yolu (Geri Dönüş):</strong><br>
            → Veritabanı → Model → Controller → Route → Frontend<br>
            <br>
            <strong>Controller'dan Dönen:</strong><br>
            → res.json({ success: true, data: ogrenciler })<br>
            → JSON formatında<br>
            <br>
            <strong>Şimdi Ne Olacak?</strong><br>
            → response.json() ile JSON parse edilecek<br>
            → Veri ekranda gösterilecek`,
            'success',
            0
        )
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        // BURAYA DİKKAT: Response göster
        const responseBox = document.getElementById('getResponse')
        responseBox.style.display = 'block'
        responseBox.textContent = JSON.stringify(result, null, 2)
        
        showToast(
            '✅ İşlem Tamamlandı',
            `<strong>GET İsteği Başarılı!</strong><br>
            <br>
            <strong>Dönen Veri:</strong><br>
            → ${result.data ? result.data.length : 0} öğrenci bulundu<br>
            <br>
            <strong>Tam İşlem Akışı:</strong><br>
            1. Frontend: fetch() → GET /api/ogrenciler<br>
            2. Route: router.get('/', ...) → Controller çağrıldı<br>
            3. Controller: getAllOgrencilerController() → Model çağrıldı<br>
            4. Model: getAllOgrenciler() → SQL sorgusu çalıştı<br>
            5. Veritabanı: SELECT * FROM ogrenci_bilgi → Veri döndü<br>
            6. Model → Controller → Route → Frontend → Ekranda gösterildi<br>
            <br>
            <strong>💡 Öğrendikleriniz:</strong><br>
            → Route → Controller → Model → Veritabanı akışı<br>
            → GET isteği nasıl çalışır<br>
            → MVC mimarisi`,
            'success',
            0
        )
        
    } catch (error) {
        console.error('❌ GET isteği hatası:', error)
        
        showToast(
            '❌ Hata Oluştu',
            `<strong>HATA:</strong> ${error.message}<br>
            <br>
            <strong>Olası Nedenler:</strong><br>
            → Veritabanı bağlantı hatası<br>
            → Sunucu çalışmıyor<br>
            → Route bulunamadı<br>
            <br>
            <strong>Kontrol Edin:</strong><br>
            → Sunucu çalışıyor mu? (node app.js)<br>
            → .env dosyası var mı?<br>
            → Veritabanı bağlantısı doğru mu?`,
            'error',
            0
        )
    }
}

/**
 * POST İsteği Test Fonksiyonu
 */
async function testPostRequest() {
    console.log('')
    console.log('═══════════════════════════════════════════════════════')
    console.log('🟢 POST İSTEĞİ BAŞLADI')
    console.log('═══════════════════════════════════════════════════════')
    
    // Form verilerini al
    const ogrNo = document.getElementById('postOgrNo').value
    const ad = document.getElementById('postAd').value
    const soyad = document.getElementById('postSoyad').value
    
    if (!ogrNo || !ad || !soyad) {
        showToast('⚠️ Eksik Bilgi', 'Lütfen tüm alanları doldurun!', 'warning', 0)
        return
    }
    
    const ogrenciData = {
        Ogr_No: parseInt(ogrNo),
        Ogr_Ad: ad,
        Ogr_Soyad: soyad
    }
    
    showToast(
        '👆 POST İsteği Başlatıldı',
        `<strong>POST İsteği Başlatıldı!</strong><br>
        <br>
        <strong>Gönderilecek Veri:</strong><br>
        → Öğrenci No: ${ogrNo}<br>
        → Ad: ${ad}<br>
        → Soyad: ${soyad}<br>
        <br>
        <strong>Endpoint:</strong> POST /api/ogrenciler<br>
        <strong>Body:</strong> JSON formatında`,
        'info',
        0
    )
    
    try {
        showToast(
            '📍 1. ADIM: Route (routers/ogrenciRoutes.js)',
            `<strong>ROUTE KATMANI:</strong><br>
            <br>
            <strong>Dosya:</strong> routers/ogrenciRoutes.js<br>
            <strong>Çalışan Kod:</strong><br>
            router.post('/', createOgrenciController)<br>
            <br>
            <strong>Ne Yapıyor?</strong><br>
            → POST /api/ogrenciler isteği geldi<br>
            → Express router bu isteği yakaladı<br>
            → createOgrenciController() fonksiyonunu çağırdı<br>
            <br>
            <strong>Route Tanımı:</strong><br>
            → app.js'de: app.use('/api/ogrenciler', ogrenciRoutes)<br>
            → ogrenciRoutes.js'de: router.post('/', ...)<br>
            → Sonuç: POST /api/ogrenciler → createOgrenciController()<br>
            <br>
            <strong>💡 GET vs POST Farkı:</strong><br>
            → GET: router.get() → Veri çekmek için<br>
            → POST: router.post() → Veri göndermek için`,
            'info',
            0
        )
        
        showToast(
            '📍 2. ADIM: Controller (controllers/ogrenciController.js)',
            `<strong>CONTROLLER KATMANI:</strong><br>
            <br>
            <strong>Dosya:</strong> controllers/ogrenciController.js<br>
            <strong>Çalışan Fonksiyon:</strong> createOgrenciController()<br>
            <br>
            <strong>Ne Yapıyor?</strong><br>
            → req.body'den veriyi alır<br>
            → Validation (doğrulama) yapar<br>
            → Model fonksiyonunu çağırır<br>
            <br>
            <strong>Çalışan Kod:</strong><br>
            const ogrenci = await createOgrenci(req.body)<br>
            → Model fonksiyonunu çağırır<br>
            → req.body → Frontend'den gelen JSON veri<br>
            <br>
            <strong>req.body Nedir?</strong><br>
            → Express middleware (express.json())<br>
            → JSON veriyi JavaScript objesine çevirir<br>
            → { Ogr_No: 9999999999, Ogr_Ad: "Test", ... }<br>
            <br>
            <strong>Response:</strong><br>
            → res.json({ success: true, data: ogrenci })<br>
            → Yeni oluşturulan öğrenci döner`,
            'info',
            0
        )
        
        showToast(
            '📍 3. ADIM: Model (models/ogrenciModel.js)',
            `<strong>MODEL KATMANI:</strong><br>
            <br>
            <strong>Dosya:</strong> models/ogrenciModel.js<br>
            <strong>Çalışan Fonksiyon:</strong> createOgrenci()<br>
            <br>
            <strong>Ne Yapıyor?</strong><br>
            → Veritabanına INSERT sorgusu çalıştırır<br>
            → Yeni kayıt oluşturur<br>
            <br>
            <strong>Çalışan Kod:</strong><br>
            const [result] = await pool.query(<br>
            &nbsp;&nbsp;'INSERT INTO ogrenci_bilgi VALUES (?, ?, ...)',<br>
            &nbsp;&nbsp;[ogrNo, ad, soyad, ...]<br>
            )<br>
            <br>
            <strong>SQL Sorgusu:</strong><br>
            → INSERT INTO ogrenci_bilgi (Ogr_No, Ogr_Ad, Ogr_Soyad, ...)<br>
            &nbsp;&nbsp;VALUES (?, ?, ?, ...)<br>
            <br>
            <strong>? İşareti (Placeholder):</strong><br>
            → Parametreli sorgu<br>
            → SQL injection koruması<br>
            → Değerler güvenli şekilde eklenir<br>
            <br>
            <strong>💡 Önemli:</strong><br>
            → ? yerine direkt değer yazmak tehlikeli!<br>
            → SQL injection saldırısına açık olur`,
            'info',
            0
        )
        
        showToast(
            '🌐 Frontend: fetch() İsteği Gönderiliyor',
            `<strong>FRONTEND İSTEĞİ:</strong><br>
            <br>
            <strong>Çalışan Kod:</strong><br>
            await fetch("/api/ogrenciler", {<br>
            &nbsp;&nbsp;method: "POST",<br>
            &nbsp;&nbsp;headers: { "Content-Type": "application/json" },<br>
            &nbsp;&nbsp;body: JSON.stringify(ogrenciData)<br>
            })<br>
            <br>
            <strong>Ne Yapıyor?</strong><br>
            → POST isteği gönderir<br>
            → Body'de JSON veri var<br>
            → Headers'da Content-Type belirtilir<br>
            <br>
            <strong>JSON.stringify() Nedir?</strong><br>
            → JavaScript objesi → JSON string'e çevirir<br>
            → { Ogr_No: 999 } → '{"Ogr_No":999}'<br>
            <br>
            <strong>⏳ Sunucudan cevap bekleniyor...</strong>`,
            'info',
            0
        )
        
        const response = await fetch('/api/ogrenciler', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ogrenciData)
        })
        
        const result = await response.json()
        
        const responseBox = document.getElementById('postResponse')
        responseBox.style.display = 'block'
        responseBox.textContent = JSON.stringify(result, null, 2)
        
        showToast(
            '✅ POST İsteği Başarılı',
            `<strong>POST İsteği Başarılı!</strong><br>
            <br>
            <strong>Tam İşlem Akışı:</strong><br>
            1. Frontend: fetch() → POST /api/ogrenciler + Body<br>
            2. Route: router.post('/', ...) → Controller çağrıldı<br>
            3. Controller: createOgrenciController() → req.body alındı<br>
            4. Model: createOgrenci() → INSERT sorgusu çalıştı<br>
            5. Veritabanı: INSERT INTO ... → Yeni kayıt oluşturuldu<br>
            6. Model → Controller → Route → Frontend → Başarı mesajı<br>
            <br>
            <strong>💡 Öğrendikleriniz:</strong><br>
            → POST isteği nasıl çalışır<br>
            → Body'de veri gönderme<br>
            → JSON.stringify() kullanımı<br>
            → INSERT sorgusu`,
            'success',
            0
        )
        
    } catch (error) {
        console.error('❌ POST isteği hatası:', error)
        showToast('❌ Hata', `HATA: ${error.message}`, 'error', 0)
    }
}

/**
 * PUT İsteği Test Fonksiyonu
 */
async function testPutRequest() {
    console.log('')
    console.log('═══════════════════════════════════════════════════════')
    console.log('🟠 PUT İSTEĞİ BAŞLADI')
    console.log('═══════════════════════════════════════════════════════')
    
    const ogrNo = document.getElementById('putOgrNo').value
    const ad = document.getElementById('putAd').value
    const soyad = document.getElementById('putSoyad').value
    
    if (!ogrNo || !ad || !soyad) {
        showToast('⚠️ Eksik Bilgi', 'Lütfen tüm alanları doldurun!', 'warning', 0)
        return
    }
    
    const ogrenciData = {
        Ogr_Ad: ad,
        Ogr_Soyad: soyad
    }
    
    showToast(
        '👆 PUT İsteği Başlatıldı',
        `<strong>PUT İsteği Başlatıldı!</strong><br>
        <br>
        <strong>Güncellenecek Öğrenci No:</strong> ${ogrNo}<br>
        <strong>Yeni Ad:</strong> ${ad}<br>
        <strong>Yeni Soyad:</strong> ${soyad}<br>
        <br>
        <strong>Endpoint:</strong> PUT /api/ogrenciler/${ogrNo}<br>
        <strong>Body:</strong> JSON formatında`,
        'info',
        0
    )
    
    try {
        showToast(
            '📍 Route: PUT /api/ogrenciler/:id',
            `<strong>ROUTE KATMANI:</strong><br>
            <br>
            <strong>Dosya:</strong> routers/ogrenciRoutes.js<br>
            <strong>Çalışan Kod:</strong><br>
            router.put('/:id', updateOgrenciController)<br>
            <br>
            <strong>Ne Yapıyor?</strong><br>
            → PUT /api/ogrenciler/${ogrNo} isteği geldi<br>
            → :id → Route parametresi (${ogrNo})<br>
            → req.params.id → ${ogrNo} değerini içerir<br>
            → updateOgrenciController() çağrıldı<br>
            <br>
            <strong>💡 Route Parametresi:</strong><br>
            → :id → Dinamik parametre<br>
            → /api/ogrenciler/123 → req.params.id = "123"<br>
            → /api/ogrenciler/456 → req.params.id = "456"`,
            'info',
            0
        )
        
        showToast(
            '📍 Controller: updateOgrenciController()',
            `<strong>CONTROLLER KATMANI:</strong><br>
            <br>
            <strong>Dosya:</strong> controllers/ogrenciController.js<br>
            <strong>Çalışan Fonksiyon:</strong> updateOgrenciController()<br>
            <br>
            <strong>Ne Yapıyor?</strong><br>
            → req.params.id → Güncellenecek öğrenci no<br>
            → req.body → Güncellenecek veriler<br>
            → Model fonksiyonunu çağırır<br>
            <br>
            <strong>Çalışan Kod:</strong><br>
            const ogrenci = await updateOgrenci(req.params.id, req.body)<br>
            <br>
            <strong>req.params.id Nedir?</strong><br>
            → URL'deki :id parametresi<br>
            → PUT /api/ogrenciler/${ogrNo}<br>
            → req.params.id = "${ogrNo}"`,
            'info',
            0
        )
        
        showToast(
            '📍 Model: UPDATE Sorgusu',
            `<strong>MODEL KATMANI:</strong><br>
            <br>
            <strong>Dosya:</strong> models/ogrenciModel.js<br>
            <strong>Çalışan Fonksiyon:</strong> updateOgrenci()<br>
            <br>
            <strong>SQL Sorgusu:</strong><br>
            → UPDATE ogrenci_bilgi<br>
            &nbsp;&nbsp;SET Ogr_Ad = ?, Ogr_Soyad = ?, ...<br>
            &nbsp;&nbsp;WHERE Ogr_No = ?<br>
            <br>
            <strong>Ne Yapıyor?</strong><br>
            → WHERE Ogr_No = ? → Hangi kayıt güncellenecek<br>
            → SET Ogr_Ad = ? → Yeni değerler<br>
            → ? işareti → Placeholder (güvenli)<br>
            <br>
            <strong>💡 Önemli:</strong><br>
            → WHERE olmadan tüm kayıtlar güncellenir!<br>
            → Bu yüzden WHERE şartı zorunlu`,
            'info',
            0
        )
        
        const response = await fetch(`/api/ogrenciler/${ogrNo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ogrenciData)
        })
        
        const result = await response.json()
        
        const responseBox = document.getElementById('putResponse')
        responseBox.style.display = 'block'
        responseBox.textContent = JSON.stringify(result, null, 2)
        
        showToast(
            '✅ PUT İsteği Başarılı',
            `<strong>PUT İsteği Başarılı!</strong><br>
            <br>
            <strong>Tam İşlem Akışı:</strong><br>
            1. Frontend: fetch() → PUT /api/ogrenciler/${ogrNo} + Body<br>
            2. Route: router.put('/:id', ...) → req.params.id = ${ogrNo}<br>
            3. Controller: updateOgrenciController() → req.body alındı<br>
            4. Model: updateOgrenci() → UPDATE sorgusu çalıştı<br>
            5. Veritabanı: UPDATE ... WHERE Ogr_No = ${ogrNo}<br>
            6. Model → Controller → Route → Frontend → Başarı mesajı<br>
            <br>
            <strong>💡 Öğrendikleriniz:</strong><br>
            → PUT isteği nasıl çalışır<br>
            → Route parametresi (:id)<br>
            → UPDATE sorgusu<br>
            → WHERE şartı`,
            'success',
            0
        )
        
    } catch (error) {
        console.error('❌ PUT isteği hatası:', error)
        showToast('❌ Hata', `HATA: ${error.message}`, 'error', 0)
    }
}

/**
 * DELETE İsteği Test Fonksiyonu
 */
async function testDeleteRequest() {
    console.log('')
    console.log('═══════════════════════════════════════════════════════')
    console.log('🔴 DELETE İSTEĞİ BAŞLADI')
    console.log('═══════════════════════════════════════════════════════')
    
    const ogrNo = document.getElementById('deleteOgrNo').value
    
    if (!ogrNo) {
        showToast('⚠️ Eksik Bilgi', 'Lütfen öğrenci numarası girin!', 'warning', 0)
        return
    }
    
    // Onay iste
    if (!confirm(`Öğrenci No ${ogrNo} silinecek. Emin misiniz?`)) {
        showToast('❌ İptal Edildi', 'Silme işlemi iptal edildi.', 'info', 0)
        return
    }
    
    showToast(
        '👆 DELETE İsteği Başlatıldı',
        `<strong>DELETE İsteği Başlatıldı!</strong><br>
        <br>
        <strong>Silinecek Öğrenci No:</strong> ${ogrNo}<br>
        <br>
        <strong>Endpoint:</strong> DELETE /api/ogrenciler/${ogrNo}<br>
        <strong>Body:</strong> Yok (DELETE isteğinde body olmaz)`,
        'info',
        0
    )
    
    try {
        showToast(
            '📍 Route: DELETE /api/ogrenciler/:id',
            `<strong>ROUTE KATMANI:</strong><br>
            <br>
            <strong>Dosya:</strong> routers/ogrenciRoutes.js<br>
            <strong>Çalışan Kod:</strong><br>
            router.delete('/:id', deleteOgrenciController)<br>
            <br>
            <strong>Ne Yapıyor?</strong><br>
            → DELETE /api/ogrenciler/${ogrNo} isteği geldi<br>
            → :id → Route parametresi (${ogrNo})<br>
            → req.params.id → ${ogrNo} değerini içerir<br>
            → deleteOgrenciController() çağrıldı<br>
            <br>
            <strong>💡 DELETE İsteği:</strong><br>
            → Body yok, sadece URL'de ID var<br>
            → Hangi kayıt silinecek? → URL'deki ID`,
            'info',
            0
        )
        
        showToast(
            '📍 Controller: deleteOgrenciController()',
            `<strong>CONTROLLER KATMANI:</strong><br>
            <br>
            <strong>Dosya:</strong> controllers/ogrenciController.js<br>
            <strong>Çalışan Fonksiyon:</strong> deleteOgrenciController()<br>
            <br>
            <strong>Ne Yapıyor?</strong><br>
            → req.params.id → Silinecek öğrenci no<br>
            → Model fonksiyonunu çağırır<br>
            <br>
            <strong>Çalışan Kod:</strong><br>
            await deleteOgrenci(req.params.id)<br>
            <br>
            <strong>💡 Önemli:</strong><br>
            → Silme işlemi geri alınamaz!<br>
            → Bu yüzden onay istenir`,
            'info',
            0
        )
        
        showToast(
            '📍 Model: DELETE Sorgusu',
            `<strong>MODEL KATMANI:</strong><br>
            <br>
            <strong>Dosya:</strong> models/ogrenciModel.js<br>
            <strong>Çalışan Fonksiyon:</strong> deleteOgrenci()<br>
            <br>
            <strong>SQL Sorgusu:</strong><br>
            → DELETE FROM ogrenci_bilgi<br>
            &nbsp;&nbsp;WHERE Ogr_No = ?<br>
            <br>
            <strong>Ne Yapıyor?</strong><br>
            → WHERE Ogr_No = ? → Hangi kayıt silinecek<br>
            → ? işareti → Placeholder (güvenli)<br>
            <br>
            <strong>⚠️ DİKKAT:</strong><br>
            → WHERE olmadan TÜM kayıtlar silinir!<br>
            → Bu yüzden WHERE şartı ZORUNLU<br>
            <br>
            <strong>Yanlış:</strong> DELETE FROM ogrenci_bilgi (TÜMÜNÜ SİLER!)<br>
            <strong>Doğru:</strong> DELETE FROM ogrenci_bilgi WHERE Ogr_No = ?`,
            'warning',
            0
        )
        
        const response = await fetch(`/api/ogrenciler/${ogrNo}`, {
            method: 'DELETE'
        })
        
        const result = await response.json()
        
        const responseBox = document.getElementById('deleteResponse')
        responseBox.style.display = 'block'
        responseBox.textContent = JSON.stringify(result, null, 2)
        
        showToast(
            '✅ DELETE İsteği Başarılı',
            `<strong>DELETE İsteği Başarılı!</strong><br>
            <br>
            <strong>Tam İşlem Akışı:</strong><br>
            1. Frontend: fetch() → DELETE /api/ogrenciler/${ogrNo}<br>
            2. Route: router.delete('/:id', ...) → req.params.id = ${ogrNo}<br>
            3. Controller: deleteOgrenciController() → Model çağrıldı<br>
            4. Model: deleteOgrenci() → DELETE sorgusu çalıştı<br>
            5. Veritabanı: DELETE FROM ... WHERE Ogr_No = ${ogrNo}<br>
            6. Model → Controller → Route → Frontend → Başarı mesajı<br>
            <br>
            <strong>💡 Öğrendikleriniz:</strong><br>
            → DELETE isteği nasıl çalışır<br>
            → Route parametresi (:id)<br>
            → DELETE sorgusu<br>
            → WHERE şartının önemi<br>
            <br>
            <strong>⚠️ UYARI:</strong><br>
            → Silme işlemi geri alınamaz!<br>
            → Her zaman onay isteyin`,
            'success',
            0
        )
        
    } catch (error) {
        console.error('❌ DELETE isteği hatası:', error)
        showToast('❌ Hata', `HATA: ${error.message}`, 'error', 0)
    }
}

/**
 * API Endpoint Temel Bilgileri Göster
 */
function showEndpointBasics() {
    showToast(
        '📖 API Endpoint Nedir?',
        `<strong>API ENDPOINT NEDİR?</strong><br>
        <br>
        <strong>Tanım:</strong><br>
        → API Endpoint, sunucuya istek göndermek için kullanılan URL adresidir<br>
        → Bir web servisinin belirli bir fonksiyonuna erişmek için kullanılır<br>
        <br>
        <strong>Örnek:</strong><br>
        → GET http://localhost:3000/api/ogrenciler<br>
        → Bu bir endpoint'tir<br>
        <br>
        <strong>Bileşenleri:</strong><br>
        1. <strong>Protocol:</strong> http:// veya https://<br>
        2. <strong>Domain:</strong> localhost:3000 (sunucu adresi)<br>
        3. <strong>Path:</strong> /api/ogrenciler (endpoint yolu)<br>
        4. <strong>Method:</strong> GET, POST, PUT, DELETE<br>
        <br>
        <strong>HTTP Metodları:</strong><br>
        → <strong>GET:</strong> Veri çekmek için (okuma)<br>
        → <strong>POST:</strong> Yeni veri eklemek için (yazma)<br>
        → <strong>PUT:</strong> Mevcut veriyi güncellemek için (güncelleme)<br>
        → <strong>DELETE:</strong> Veriyi silmek için (silme)<br>
        <br>
        <strong>💡 Basit Açıklama:</strong><br>
        → Endpoint = Sunucudaki bir fonksiyonun adresi<br>
        → Tarayıcı veya uygulama bu adrese istek gönderir<br>
        → Sunucu isteği işler ve cevap döner`,
        'info',
        0
    )
    
    showToast(
        '⚙️ API Endpoint Nasıl Çalışır?',
        `<strong>API ENDPOINT NASIL ÇALIŞIR?</strong><br>
        <br>
        <strong>1. İstek Gönderme (Frontend):</strong><br>
        → Kullanıcı bir butona tıklar<br>
        → JavaScript fetch() fonksiyonu çalışır<br>
        → HTTP isteği gönderilir<br>
        → Örnek: fetch("/api/ogrenciler")<br>
        <br>
        <strong>2. İsteği Yakalama (Backend - Route):</strong><br>
        → Express sunucu isteği alır<br>
        → Route (routers/ogrenciRoutes.js) isteği yakalar<br>
        → Hangi endpoint'e gideceğini belirler<br>
        → Örnek: GET /api/ogrenciler → router.get('/', ...)<br>
        <br>
        <strong>3. İş Mantığı (Controller):</strong><br>
        → Controller fonksiyonu çalışır<br>
        → İş mantığı yürütülür<br>
        → Model katmanı çağrılır<br>
        → Örnek: getAllOgrencilerController()<br>
        <br>
        <strong>4. Veritabanı İşlemi (Model):</strong><br>
        → Model fonksiyonu çalışır<br>
        → Veritabanı sorgusu yapılır<br>
        → Veri çekilir veya değiştirilir<br>
        → Örnek: getAllOgrenciler() → SELECT * FROM ogrenci_bilgi<br>
        <br>
        <strong>5. Cevap Döndürme (Response):</strong><br>
        → Model → Controller → Route → Frontend<br>
        → JSON formatında cevap döner<br>
        → Örnek: { success: true, data: [...] }<br>
        <br>
        <strong>💡 Akış Özeti:</strong><br>
        Frontend → Route → Controller → Model → Veritabanı<br>
        Veritabanı → Model → Controller → Route → Frontend`,
        'info',
        0
    )
}

/**
 * API Endpoint Nasıl Oluşturulur?
 */
function showEndpointOlusturma() {
    showToast(
        '🛠️ Adım 1: Router Dosyası Oluştur',
        `<strong>API ENDPOINT OLUŞTURMA - ADIM 1</strong><br>
        <br>
        <strong>Dosya:</strong> routers/ogrenciRoutes.js<br>
        <br>
        <strong>Ne Yapıyoruz?</strong><br>
        → Express Router oluşturuyoruz<br>
        → Route'ları bu dosyada tanımlıyoruz<br>
        <br>
        <strong>Çalışan Kod:</strong><br>
        import express from 'express'<br>
        const router = express.Router()<br>
        <br>
        <strong>Neden Router?</strong><br>
        → Modülerlik: Route'ları gruplamak için<br>
        → Organizasyon: İlgili route'ları bir arada tutmak için<br>
        → Örnek: Tüm öğrenci route'ları ogrenciRoutes.js'de<br>
        <br>
        <strong>💡 Önemli:</strong><br>
        → Router, route'ları organize eder<br>
        → Her modül için ayrı router dosyası`,
        'info',
        0
    )
    
    showToast(
        '🛠️ Adım 2: Endpoint Tanımla',
        `<strong>API ENDPOINT OLUŞTURMA - ADIM 2</strong><br>
        <br>
        <strong>Dosya:</strong> routers/ogrenciRoutes.js<br>
        <br>
        <strong>Ne Yapıyoruz?</strong><br>
        → router.get(), router.post(), router.put(), router.delete() kullanıyoruz<br>
        → Her endpoint için bir route tanımlıyoruz<br>
        <br>
        <strong>Çalışan Kod Örnekleri:</strong><br>
        <br>
        <strong>GET Endpoint:</strong><br>
        router.get('/', getAllOgrencilerController)<br>
        → GET /api/ogrenciler isteği geldiğinde<br>
        → getAllOgrencilerController() çalışır<br>
        <br>
        <strong>POST Endpoint:</strong><br>
        router.post('/', createOgrenciController)<br>
        → POST /api/ogrenciler isteği geldiğinde<br>
        → createOgrenciController() çalışır<br>
        <br>
        <strong>PUT Endpoint:</strong><br>
        router.put('/:id', updateOgrenciController)<br>
        → PUT /api/ogrenciler/123 isteği geldiğinde<br>
        → updateOgrenciController() çalışır<br>
        <br>
        <strong>DELETE Endpoint:</strong><br>
        router.delete('/:id', deleteOgrenciController)<br>
        → DELETE /api/ogrenciler/123 isteği geldiğinde<br>
        → deleteOgrenciController() çalışır<br>
        <br>
        <strong>💡 Önemli:</strong><br>
        → İkinci parametre → Controller fonksiyonu<br>
        → Controller, iş mantığını yönetir`,
        'info',
        0
    )
    
    showToast(
        '🛠️ Adım 3: Router\'ı app.js\'e Bağla',
        `<strong>API ENDPOINT OLUŞTURMA - ADIM 3</strong><br>
        <br>
        <strong>Dosya:</strong> app.js<br>
        <br>
        <strong>Ne Yapıyoruz?</strong><br>
        → Router'ı ana uygulamaya bağlıyoruz<br>
        → app.use() ile route'u tanımlıyoruz<br>
        <br>
        <strong>Çalışan Kod:</strong><br>
        import ogrenciRoutes from './routers/ogrenciRoutes.js'<br>
        app.use('/api/ogrenciler', ogrenciRoutes)<br>
        <br>
        <strong>Ne Anlama Geliyor?</strong><br>
        → /api/ogrenciler ile başlayan tüm istekler<br>
        → ogrenciRoutes.js dosyasındaki route'lara yönlendirilir<br>
        <br>
        <strong>Örnek:</strong><br>
        → GET /api/ogrenciler<br>
        → app.js: app.use('/api/ogrenciler', ogrenciRoutes)<br>
        → ogrenciRoutes.js: router.get('/', getAllOgrencilerController)<br>
        → Sonuç: getAllOgrencilerController() çalışır<br>
        <br>
        <strong>💡 Önemli:</strong><br>
        → app.use() → Middleware veya route bağlama<br>
        → İlk parametre → Base path (temel yol)<br>
        → İkinci parametre → Router veya middleware`,
        'info',
        0
    )
    
    showToast(
        '🛠️ Adım 4: Controller Fonksiyonu Yaz',
        `<strong>API ENDPOINT OLUŞTURMA - ADIM 4</strong><br>
        <br>
        <strong>Dosya:</strong> controllers/ogrenciController.js<br>
        <br>
        <strong>Ne Yapıyoruz?</strong><br>
        → Controller fonksiyonu yazıyoruz<br>
        → İş mantığını yönetiyoruz<br>
        → Model katmanını çağırıyoruz<br>
        <br>
        <strong>Çalışan Kod Örneği:</strong><br>
        export const getAllOgrencilerController = async (req, res, next) => {<br>
        &nbsp;&nbsp;try {<br>
        &nbsp;&nbsp;&nbsp;&nbsp;const ogrenciler = await getAllOgrenciler()<br>
        &nbsp;&nbsp;&nbsp;&nbsp;res.json({ success: true, data: ogrenciler })<br>
        &nbsp;&nbsp;} catch (error) {<br>
        &nbsp;&nbsp;&nbsp;&nbsp;next(error)<br>
        &nbsp;&nbsp;}<br>
        }<br>
        <br>
        <strong>Parametreler:</strong><br>
        → req → Request (istek) objesi<br>
        → res → Response (cevap) objesi<br>
        → next → Sonraki middleware'e geç<br>
        <br>
        <strong>Ne Yapıyor?</strong><br>
        → Model fonksiyonunu çağırır (getAllOgrenciler())<br>
        → Veriyi alır<br>
        → JSON formatında cevap döner (res.json())<br>
        <br>
        <strong>💡 Önemli:</strong><br>
        → Controller, iş mantığını yönetir<br>
        → Veritabanı işlemi Model'de`,
        'info',
        0
    )
    
    showToast(
        '🛠️ Adım 5: Model Fonksiyonu Yaz',
        `<strong>API ENDPOINT OLUŞTURMA - ADIM 5</strong><br>
        <br>
        <strong>Dosya:</strong> models/ogrenciModel.js<br>
        <br>
        <strong>Ne Yapıyoruz?</strong><br>
        → Model fonksiyonu yazıyoruz<br>
        → Veritabanı işlemlerini yapıyoruz<br>
        → SQL sorguları çalıştırıyoruz<br>
        <br>
        <strong>Çalışan Kod Örneği:</strong><br>
        export const getAllOgrenciler = async () => {<br>
        &nbsp;&nbsp;const [rows] = await pool.query(<br>
        &nbsp;&nbsp;&nbsp;&nbsp;'SELECT * FROM ogrenci_bilgi'<br>
        &nbsp;&nbsp;)<br>
        &nbsp;&nbsp;return rows<br>
        }<br>
        <br>
        <strong>Ne Yapıyor?</strong><br>
        → pool.query() → Veritabanı sorgusu çalıştırır<br>
        → SELECT * FROM ogrenci_bilgi → Tüm öğrencileri çeker<br>
        → rows → Sonuç listesi<br>
        <br>
        <strong>Veritabanı Bağlantısı:</strong><br>
        → pool → db/db.js'den gelir<br>
        → MySQL connection pool<br>
        <br>
        <strong>💡 Önemli:</strong><br>
        → Model, sadece veritabanı işlemleri yapar<br>
        → İş mantığı Controller'da<br>
        <br>
        <strong>✅ TAMAMLANDI!</strong><br>
        → Artık endpoint hazır<br>
        → Frontend'den kullanılabilir`,
        'info',
        0
    )
}

/**
 * Hangi Dosyalarda Tanımlanır?
 */
function showEndpointDosyalar() {
    showToast(
        '📁 1. Router Dosyası (routers/)',
        `<strong>ROUTER DOSYALARI:</strong><br>
        <br>
        <strong>Konum:</strong> routers/ klasörü<br>
        <br>
        <strong>Dosyalar:</strong><br>
        → routers/ogrenciRoutes.js → Öğrenci endpoint'leri<br>
        → routers/authRoutes.js → Login endpoint'leri<br>
        → routers/homeRoutes.js → Ana sayfa route'ları<br>
        <br>
        <strong>Ne İçerir?</strong><br>
        → router.get(), router.post(), router.put(), router.delete()<br>
        → Endpoint tanımlamaları<br>
        → Controller fonksiyonlarına yönlendirme<br>
        <br>
        <strong>Örnek Kod (ogrenciRoutes.js):</strong><br>
        router.get('/', getAllOgrencilerController)<br>
        router.post('/', createOgrenciController)<br>
        router.put('/:id', updateOgrenciController)<br>
        router.delete('/:id', deleteOgrenciController)<br>
        <br>
        <strong>💡 Önemli:</strong><br>
        → Her modül için ayrı router dosyası<br>
        → Route'ları organize eder`,
        'info',
        0
    )
    
    showToast(
        '📁 2. Controller Dosyası (controllers/)',
        `<strong>CONTROLLER DOSYALARI:</strong><br>
        <br>
        <strong>Konum:</strong> controllers/ klasörü<br>
        <br>
        <strong>Dosyalar:</strong><br>
        → controllers/ogrenciController.js → Öğrenci iş mantığı<br>
        → controllers/authController.js → Login iş mantığı<br>
        <br>
        <strong>Ne İçerir?</strong><br>
        → İş mantığı fonksiyonları<br>
        → Model katmanını çağırma<br>
        → Hata yönetimi<br>
        → Response hazırlama<br>
        <br>
        <strong>Örnek Kod (ogrenciController.js):</strong><br>
        export const getAllOgrencilerController = async (req, res, next) => {<br>
        &nbsp;&nbsp;const ogrenciler = await getAllOgrenciler()<br>
        &nbsp;&nbsp;res.json({ success: true, data: ogrenciler })<br>
        }<br>
        <br>
        <strong>💡 Önemli:</strong><br>
        → Controller, iş mantığını yönetir<br>
        → Model'i çağırır, response döner`,
        'info',
        0
    )
    
    showToast(
        '📁 3. Model Dosyası (models/)',
        `<strong>MODEL DOSYALARI:</strong><br>
        <br>
        <strong>Konum:</strong> models/ klasörü<br>
        <br>
        <strong>Dosyalar:</strong><br>
        → models/ogrenciModel.js → Öğrenci veritabanı işlemleri<br>
        → models/authModel.js → Login veritabanı işlemleri<br>
        <br>
        <strong>Ne İçerir?</strong><br>
        → Veritabanı sorguları<br>
        → SQL işlemleri<br>
        → Veri çekme, ekleme, güncelleme, silme<br>
        <br>
        <strong>Örnek Kod (ogrenciModel.js):</strong><br>
        export const getAllOgrenciler = async () => {<br>
        &nbsp;&nbsp;const [rows] = await pool.query(<br>
        &nbsp;&nbsp;&nbsp;&nbsp;'SELECT * FROM ogrenci_bilgi'<br>
        &nbsp;&nbsp;)<br>
        &nbsp;&nbsp;return rows<br>
        }<br>
        <br>
        <strong>💡 Önemli:</strong><br>
        → Model, sadece veritabanı işlemleri yapar<br>
        → İş mantığı Controller'da`,
        'info',
        0
    )
    
    showToast(
        '📁 4. Ana Uygulama Dosyası (app.js)',
        `<strong>ANA UYGULAMA DOSYASI:</strong><br>
        <br>
        <strong>Konum:</strong> app.js (proje kök dizini)<br>
        <br>
        <strong>Ne İçerir?</strong><br>
        → Router'ları bağlama<br>
        → Middleware'ler<br>
        → Sunucu başlatma<br>
        <br>
        <strong>Örnek Kod (app.js):</strong><br>
        import ogrenciRoutes from './routers/ogrenciRoutes.js'<br>
        app.use('/api/ogrenciler', ogrenciRoutes)<br>
        <br>
        <strong>Ne Yapıyor?</strong><br>
        → /api/ogrenciler ile başlayan istekler<br>
        → ogrenciRoutes.js dosyasına yönlendirilir<br>
        <br>
        <strong>Route Bağlama Sırası:</strong><br>
        1. Middleware'ler (express.json(), express.static(), vb.)<br>
        2. Route'lar (app.use('/api/ogrenciler', ...))<br>
        3. Error handler'lar (404, global error)<br>
        <br>
        <strong>💡 Önemli:</strong><br>
        → app.js, tüm route'ları birleştirir<br>
        → Merkezi yapılandırma dosyası`,
        'info',
        0
    )
    
    showToast(
        '📁 5. Veritabanı Bağlantısı (db/)',
        `<strong>VERİTABANI BAĞLANTISI:</strong><br>
        <br>
        <strong>Konum:</strong> db/db.js<br>
        <br>
        <strong>Ne İçerir?</strong><br>
        → MySQL connection pool<br>
        → Veritabanı yapılandırması<br>
        → .env dosyasından ayarlar<br>
        <br>
        <strong>Örnek Kod (db/db.js):</strong><br>
        import mysql from 'mysql2/promise'<br>
        const pool = mysql.createPool({<br>
        &nbsp;&nbsp;host: process.env.DB_HOST,<br>
        &nbsp;&nbsp;user: process.env.DB_USER,<br>
        &nbsp;&nbsp;password: process.env.DB_PASSWORD,<br>
        &nbsp;&nbsp;database: process.env.DB_NAME<br>
        })<br>
        export default pool<br>
        <br>
        <strong>Ne Yapıyor?</strong><br>
        → MySQL bağlantı havuzu oluşturur<br>
        → Model dosyaları bu pool'u kullanır<br>
        → pool.query() ile sorgu çalıştırılır<br>
        <br>
        <strong>💡 Önemli:</strong><br>
        → Pool, verimli bağlantı yönetimi sağlar<br>
        → Her istek için yeni bağlantı açmaz`,
        'info',
        0
    )
}

/**
 * Gerçek Örnek: GET /api/ogrenciler
 */
function showEndpointOrnek() {
    showToast(
        '💡 Gerçek Örnek: GET /api/ogrenciler',
        `<strong>GERÇEK ÖRNEK: GET /api/ogrenciler</strong><br>
        <br>
        <strong>İstek:</strong> GET http://localhost:3000/api/ogrenciler<br>
        <br>
        <strong>1. app.js (Ana Uygulama):</strong><br>
        → app.use('/api/ogrenciler', ogrenciRoutes)<br>
        → /api/ogrenciler ile başlayan istekler ogrenciRoutes'a gider<br>
        <br>
        <strong>2. routers/ogrenciRoutes.js:</strong><br>
        → router.get('/', getAllOgrencilerController)<br>
        → GET / isteği → getAllOgrencilerController() çalışır<br>
        → Base path: /api/ogrenciler<br>
        → Route path: /<br>
        → Sonuç: GET /api/ogrenciler<br>
        <br>
        <strong>3. controllers/ogrenciController.js:</strong><br>
        → getAllOgrencilerController() çalışır<br>
        → getAllOgrenciler() Model fonksiyonunu çağırır<br>
        → await getAllOgrenciler() → Model'den veri bekler<br>
        <br>
        <strong>4. models/ogrenciModel.js:</strong><br>
        → getAllOgrenciler() çalışır<br>
        → pool.query('SELECT * FROM ogrenci_bilgi')<br>
        → Veritabanından tüm öğrencileri çeker<br>
        <br>
        <strong>5. Veritabanı (MySQL):</strong><br>
        → SELECT * FROM ogrenci_bilgi sorgusu çalışır<br>
        → Tüm öğrenciler döner<br>
        <br>
        <strong>6. Geri Dönüş:</strong><br>
        → Veritabanı → Model → Controller → Route → Frontend<br>
        → res.json({ success: true, data: ogrenciler })<br>
        → JSON formatında cevap döner<br>
        <br>
        <strong>💡 Tam Akış:</strong><br>
        Frontend → app.js → ogrenciRoutes.js → ogrenciController.js → ogrenciModel.js → MySQL<br>
        MySQL → ogrenciModel.js → ogrenciController.js → ogrenciRoutes.js → app.js → Frontend`,
        'info',
        0
    )
    
    showToast(
        '📋 Dosya Yapısı Özeti',
        `<strong>PROJE DOSYA YAPISI:</strong><br>
        <br>
        <strong>app.js</strong><br>
        → Router'ları bağlar<br>
        → app.use('/api/ogrenciler', ogrenciRoutes)<br>
        <br>
        <strong>routers/ogrenciRoutes.js</strong><br>
        → Endpoint tanımlamaları<br>
        → router.get('/', getAllOgrencilerController)<br>
        <br>
        <strong>controllers/ogrenciController.js</strong><br>
        → İş mantığı<br>
        → getAllOgrencilerController()<br>
        <br>
        <strong>models/ogrenciModel.js</strong><br>
        → Veritabanı işlemleri<br>
        → getAllOgrenciler()<br>
        <br>
        <strong>db/db.js</strong><br>
        → Veritabanı bağlantısı<br>
        → MySQL pool<br>
        <br>
        <strong>💡 MVC Mimarisi:</strong><br>
        → Model: Veritabanı işlemleri<br>
        → View: Frontend (HTML, CSS, JS)<br>
        → Controller: İş mantığı<br>
        → Route: Endpoint tanımlamaları`,
        'info',
        0
    )
}

/**
 * Endpoint Dosya Yönlendirme - Hangi Dosyada?
 * 
 * Kullanıcı bir endpoint'e tıkladığında, o endpoint'in hangi dosyalarda
 * tanımlandığını gösterir ve dosyalara yönlendirme yapar.
 */
function showEndpointDosyaYonlendirme() {
    showToast(
        '📂 Endpoint Dosya Yönlendirme',
        `<strong>ENDPOINT DOSYA YÖNLENDİRME</strong><br>
        <br>
        <strong>Bu özellik, endpoint'lerin hangi dosyalarda tanımlandığını gösterir.</strong><br>
        <br>
        <strong>Aşağıdaki butonlara tıklayarak her endpoint'in dosya konumunu görebilirsiniz:</strong><br>
        <br>
        → GET /api/ogrenciler<br>
        → POST /api/ogrenciler<br>
        → PUT /api/ogrenciler/:id<br>
        → DELETE /api/ogrenciler/:id<br>
        → POST /api/auth/login<br>
        <br>
        <strong>Her buton, ilgili dosyaları ve satır numaralarını gösterir.</strong>`,
        'info',
        0
    )
    
    // GET /api/ogrenciler
    setTimeout(() => {
        showToast(
            '📂 GET /api/ogrenciler - Dosya Konumları',
            `<strong>GET /api/ogrenciler ENDPOINT DOSYALARI:</strong><br>
            <br>
            <strong>1. Route Tanımı:</strong><br>
            📁 routers/ogrenciRoutes.js<br>
            📍 Satır 33: router.get('/', getAllOgrencilerController)<br>
            <br>
            <strong>2. Controller:</strong><br>
            📁 controllers/ogrenciController.js<br>
            📍 getAllOgrencilerController() fonksiyonu<br>
            <br>
            <strong>3. Model:</strong><br>
            📁 models/ogrenciModel.js<br>
            📍 getAllOgrenciler() fonksiyonu<br>
            <br>
            <strong>4. Router Bağlantısı:</strong><br>
            📁 app.js<br>
            📍 Satır 66: app.use('/api/ogrenciler', ogrenciRoutes)<br>
            <br>
            <strong>💡 Nasıl Bulabilirsiniz?</strong><br>
            → routers/ogrenciRoutes.js dosyasını açın<br>
            → Satır 33'e gidin (Ctrl+G veya Cmd+G)<br>
            → router.get('/', getAllOgrencilerController) satırını göreceksiniz`,
            'info',
            0
        )
    }, 2000)
    
    // POST /api/ogrenciler
    setTimeout(() => {
        showToast(
            '📂 POST /api/ogrenciler - Dosya Konumları',
            `<strong>POST /api/ogrenciler ENDPOINT DOSYALARI:</strong><br>
            <br>
            <strong>1. Route Tanımı:</strong><br>
            📁 routers/ogrenciRoutes.js<br>
            📍 Satır 73: router.post('/', createOgrenciController)<br>
            <br>
            <strong>2. Controller:</strong><br>
            📁 controllers/ogrenciController.js<br>
            📍 createOgrenciController() fonksiyonu<br>
            <br>
            <strong>3. Model:</strong><br>
            📁 models/ogrenciModel.js<br>
            📍 createOgrenci() fonksiyonu<br>
            <br>
            <strong>4. Router Bağlantısı:</strong><br>
            📁 app.js<br>
            📍 Satır 66: app.use('/api/ogrenciler', ogrenciRoutes)<br>
            <br>
            <strong>💡 Nasıl Bulabilirsiniz?</strong><br>
            → routers/ogrenciRoutes.js dosyasını açın<br>
            → Satır 73'e gidin<br>
            → router.post('/', createOgrenciController) satırını göreceksiniz`,
            'info',
            0
        )
    }, 4000)
    
    // PUT /api/ogrenciler/:id
    setTimeout(() => {
        showToast(
            '📂 PUT /api/ogrenciler/:id - Dosya Konumları',
            `<strong>PUT /api/ogrenciler/:id ENDPOINT DOSYALARI:</strong><br>
            <br>
            <strong>1. Route Tanımı:</strong><br>
            📁 routers/ogrenciRoutes.js<br>
            📍 Satır 93: router.put('/:id', updateOgrenciController)<br>
            <br>
            <strong>2. Controller:</strong><br>
            📁 controllers/ogrenciController.js<br>
            📍 updateOgrenciController() fonksiyonu<br>
            <br>
            <strong>3. Model:</strong><br>
            📁 models/ogrenciModel.js<br>
            📍 updateOgrenci() fonksiyonu<br>
            <br>
            <strong>4. Router Bağlantısı:</strong><br>
            📁 app.js<br>
            📍 Satır 66: app.use('/api/ogrenciler', ogrenciRoutes)<br>
            <br>
            <strong>💡 Nasıl Bulabilirsiniz?</strong><br>
            → routers/ogrenciRoutes.js dosyasını açın<br>
            → Satır 93'e gidin<br>
            → router.put('/:id', updateOgrenciController) satırını göreceksiniz`,
            'info',
            0
        )
    }, 6000)
    
    // DELETE /api/ogrenciler/:id
    setTimeout(() => {
        showToast(
            '📂 DELETE /api/ogrenciler/:id - Dosya Konumları',
            `<strong>DELETE /api/ogrenciler/:id ENDPOINT DOSYALARI:</strong><br>
            <br>
            <strong>1. Route Tanımı:</strong><br>
            📁 routers/ogrenciRoutes.js<br>
            📍 Satır 108: router.delete('/:id', deleteOgrenciController)<br>
            <br>
            <strong>2. Controller:</strong><br>
            📁 controllers/ogrenciController.js<br>
            📍 deleteOgrenciController() fonksiyonu<br>
            <br>
            <strong>3. Model:</strong><br>
            📁 models/ogrenciModel.js<br>
            📍 deleteOgrenci() fonksiyonu<br>
            <br>
            <strong>4. Router Bağlantısı:</strong><br>
            📁 app.js<br>
            📍 Satır 66: app.use('/api/ogrenciler', ogrenciRoutes)<br>
            <br>
            <strong>💡 Nasıl Bulabilirsiniz?</strong><br>
            → routers/ogrenciRoutes.js dosyasını açın<br>
            → Satır 108'e gidin<br>
            → router.delete('/:id', deleteOgrenciController) satırını göreceksiniz`,
            'info',
            0
        )
    }, 8000)
    
    // POST /api/auth/login
    setTimeout(() => {
        showToast(
            '📂 POST /api/auth/login - Dosya Konumları',
            `<strong>POST /api/auth/login ENDPOINT DOSYALARI:</strong><br>
            <br>
            <strong>1. Route Tanımı:</strong><br>
            📁 routers/authRoutes.js<br>
            📍 Satır 47: router.post('/login', loginController)<br>
            <br>
            <strong>2. Controller:</strong><br>
            📁 controllers/authController.js<br>
            📍 loginController() fonksiyonu<br>
            <br>
            <strong>3. Model:</strong><br>
            📁 models/authModel.js<br>
            📍 findOgrenciByNo() fonksiyonu<br>
            <br>
            <strong>4. Router Bağlantısı:</strong><br>
            📁 app.js<br>
            📍 Satır 75: app.use('/api/auth', authRoutes)<br>
            <br>
            <strong>💡 Nasıl Bulabilirsiniz?</strong><br>
            → routers/authRoutes.js dosyasını açın<br>
            → Satır 47'ye gidin<br>
            → router.post('/login', loginController) satırını göreceksiniz`,
            'info',
            0
        )
    }, 10000)
    
    // Özet
    setTimeout(() => {
        showToast(
            '📋 Tüm Endpoint\'ler Özeti',
            `<strong>TÜM ENDPOINT'LER VE DOSYA KONUMLARI:</strong><br>
            <br>
            <strong>Öğrenci Endpoint'leri:</strong><br>
            📁 routers/ogrenciRoutes.js (Satır 33, 73, 93, 108)<br>
            📁 controllers/ogrenciController.js<br>
            📁 models/ogrenciModel.js<br>
            📁 app.js (Satır 66)<br>
            <br>
            <strong>Auth Endpoint'leri:</strong><br>
            📁 routers/authRoutes.js (Satır 47)<br>
            📁 controllers/authController.js<br>
            📁 models/authModel.js<br>
            📁 app.js (Satır 75)<br>
            <br>
            <strong>💡 İpucu:</strong><br>
            → VS Code'da Ctrl+P (Cmd+P) ile dosya açabilirsiniz<br>
            → Ctrl+G (Cmd+G) ile satır numarasına gidebilirsiniz<br>
            → Ctrl+F (Cmd+F) ile dosyada arama yapabilirsiniz<br>
            <br>
            <strong>Örnek Arama:</strong><br>
            → "getAllOgrencilerController" → Controller dosyasında bulunur<br>
            → "router.get" → Route dosyasında bulunur`,
            'success',
            0
        )
    }, 12000)
}

// BURAYA DİKKAT: Event listener'ları başlatma fonksiyonu
// Tüm fonksiyonlar tanımlandıktan sonra çağrılacak
function initEventListeners() {
    console.log('')
    console.log('═══════════════════════════════════════════════════════')
    console.log('📄 API Öğrenme Sayfası Yüklendi')
    console.log('═══════════════════════════════════════════════════════')
    console.log('📍 Şu an çalışan: public/js/api-ogren.js')
    console.log('✅ Sayfa hazır! Butonlara tıklayarak API istekleri gönderebilirsiniz.')
    
    // BURAYA DİKKAT: Event listener'ları ekle
    // onclick yerine addEventListener kullanıyoruz
    const btnGetRequest = document.getElementById('btnGetRequest')
    const btnPostRequest = document.getElementById('btnPostRequest')
    const btnPutRequest = document.getElementById('btnPutRequest')
    const btnDeleteRequest = document.getElementById('btnDeleteRequest')
    const btnEndpointBasics = document.getElementById('btnEndpointBasics')
    const btnEndpointOlusturma = document.getElementById('btnEndpointOlusturma')
    const btnEndpointDosyalar = document.getElementById('btnEndpointDosyalar')
    const btnEndpointOrnek = document.getElementById('btnEndpointOrnek')
    const btnEndpointDosyaYonlendirme = document.getElementById('btnEndpointDosyaYonlendirme')
    
    if (btnGetRequest) btnGetRequest.addEventListener('click', testGetRequest)
    if (btnPostRequest) btnPostRequest.addEventListener('click', testPostRequest)
    if (btnPutRequest) btnPutRequest.addEventListener('click', testPutRequest)
    if (btnDeleteRequest) btnDeleteRequest.addEventListener('click', testDeleteRequest)
    if (btnEndpointBasics) btnEndpointBasics.addEventListener('click', showEndpointBasics)
    if (btnEndpointOlusturma) btnEndpointOlusturma.addEventListener('click', showEndpointOlusturma)
    if (btnEndpointDosyalar) btnEndpointDosyalar.addEventListener('click', showEndpointDosyalar)
    if (btnEndpointOrnek) btnEndpointOrnek.addEventListener('click', showEndpointOrnek)
    if (btnEndpointDosyaYonlendirme) btnEndpointDosyaYonlendirme.addEventListener('click', showEndpointDosyaYonlendirme)
    
    // Toast göster
    showToast(
        '📄 Sayfa Yüklendi',
        'API öğrenme sayfası hazır!<br>Butonlara tıklayarak API endpoint\'lerini test edebilirsiniz.<br>Her adım toast ile açıklanacak.',
        'info',
        0
    )
}

// BURAYA DİKKAT: Sayfa yüklendiğinde çalışır
// DOMContentLoaded → HTML tamamen yüklendiğinde tetiklenir
// Tüm fonksiyonlar tanımlandıktan sonra event listener'lar eklenir
document.addEventListener('DOMContentLoaded', initEventListeners)

