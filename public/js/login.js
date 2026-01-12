/**
 * LOGIN FRONTEND JAVASCRIPT
 * 
 * Bu dosya, login sayfasının tüm frontend işlemlerini yönetir.
 * 
 * Öğrenilecek JavaScript özellikleri:
 * - Form event handling → Form submit'i yakalama
 * - fetch() API → Login API'sine istek gönderme
 * - async/await → Asenkron işlemler
 * - window.location → Sayfa yönlendirme
 * - DOM manipülasyonu → Hata mesajı gösterme
 * 
 * ============================================
 * SAYFA YÜKLENDİĞİNDE NE OLUYOR? (F5 YAPTIĞINIZDA)
 * ============================================
 * 
 * 1. HTML sayfası yüklenir (login.html)
 * 2. Bu JavaScript dosyası yüklenir (login.js)
 * 3. DOMContentLoaded event tetiklenir (HTML hazır olduğunda)
 * 4. setupLoginForm() çalışır → Form submit event'i dinlenmeye başlar
 * 
 * ============================================
 * KULLANICI "GİRİŞ YAP" BUTONUNA TIKLADIĞINDA NE OLUYOR?
 * ============================================
 * 
 * 1. Form submit event tetiklenir
 * 2. handleLogin() fonksiyonu çalışır
 * 3. Form verileri alınır (öğrenci numarası ve şifre)
 * 4. API'ye POST isteği gönderilir (/api/auth/login)
 * 5. Sunucu kontrol eder (veritabanında öğrenci var mı?)
 * 6. Başarılıysa → Ana sayfaya yönlendirilir
 * 7. Başarısızsa → Hata mesajı gösterilir
 * 
 * ============================================
 */

console.log('')
console.log('╔═══════════════════════════════════════════════════════╗')
console.log('║   LOGIN SAYFASI - JAVASCRIPT YÜKLENDİ                ║')
console.log('╚═══════════════════════════════════════════════════════╝')
console.log('')
console.log('📄 Dosya: public/js/login.js')
console.log('🌐 Sayfa: http://localhost:3000/login')
console.log('')
console.log('⏳ Sayfa yükleniyor, HTML hazır olması bekleniyor...')
console.log('   → DOMContentLoaded event\'i tetiklenince işlemler başlayacak')
console.log('')

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
// 1. setupLoginForm() fonksiyonu çalışacak → Form submit event'i dinlenecek
//
console.log('📄 SAYFA YÜKLENDİ: DOMContentLoaded event tetiklendi!')
console.log('📍 Şu an çalışan: public/js/login.js dosyası, satır 50-60 arası')
console.log('🔍 Ne yapıyoruz: Sayfa hazır olduğunda login formunu hazırlıyoruz')

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ HTML hazır! Şimdi login formunu hazırlıyoruz...')
    
    // BURAYA DİKKAT: Toast göster - Sayfa yüklendiğinde
    // showToast() → Toast bildirimi gösterir
    // İlk parametre: Başlık
    // İkinci parametre: Mesaj
    // Üçüncü parametre: Tip ('info', 'success', 'warning', 'error')
    // Dördüncü parametre: Süre (0 = otomatik kapanmaz)
    showToast(
        '📄 Sayfa Yüklendi',
        'Login sayfası hazır! Öğrenci numarası ve şifre girebilirsiniz.',
        'info',
        0
    )
    
    // Form submit event'ini dinle
    console.log('📝 setupLoginForm() fonksiyonunu çağırıyoruz...')
    setupLoginForm()
    
    console.log('🎉 Login sayfası hazır! Artık giriş yapabilirsiniz.')
    console.log('')
})

/**
 * Login formunu hazırla
 * 
 * NE ZAMAN ÇALIŞIR?
 * → Sayfa yüklendiğinde (DOMContentLoaded)
 * 
 * NE YAPIYOR?
 * → Form elementini buluyor
 * → Form submit olduğunda (butona tıklanınca) handleLogin() çalışacak
 */
const setupLoginForm = () => {
    console.log('📝 setupLoginForm() çalışıyor...')
    
    // BURAYA DİKKAT: document.querySelector() kullanımı
    // Form elementini ID'sine göre buluyoruz
    const form = document.querySelector('#loginForm')
    
    if (form) {
        console.log('✅ Login formu bulundu! (#loginForm)')
        
        // BURAYA DİKKAT: Toast göster - Form bulundu
        showToast(
            '✅ Form Hazır',
            'Login formu bulundu ve hazır!<br>HTML elementi: <form id="loginForm"><br>Çalışan kod: document.querySelector("#loginForm")',
            'success',
            0
        )
        
        // BURAYA DİKKAT: addEventListener() kullanımı
        // Form submit olduğunda (butona tıklanınca veya Enter'a basınca) bu fonksiyon çalışır
        form.addEventListener('submit', handleLogin)
        console.log('👂 Form submit event listener eklendi')
        console.log('   → Artık form gönderildiğinde handleLogin() çalışacak')
        
        // BURAYA DİKKAT: Toast göster - Event listener eklendi
        showToast(
            '👂 Event Listener Eklendi',
            'Form submit event listener eklendi!<br>Artık form gönderildiğinde handleLogin() çalışacak.<br>Çalışan kod: form.addEventListener("submit", handleLogin)',
            'info',
            0
        )
        
        // Input event listener'larını ayarla
        setupInputListeners()
    } else {
        console.error('❌ Login formu bulunamadı! (#loginForm)')
        showToast(
            '❌ Form Bulunamadı',
            'Login formu bulunamadı!<br>HTML\'de #loginForm id\'li element yok!',
            'error',
            5000
        )
    }
}

/**
 * Input event listener'larını ayarla
 * 
 * NE ZAMAN ÇALIŞIR?
 * → Sayfa yüklendiğinde (setupLoginForm içinde)
 * 
 * NE YAPIYOR?
 * → Her input'a event listener ekler
 * → Input'a tıklandığında toast gösterir
 * → Input'a yazı yazıldığında toast gösterir
 */
const setupInputListeners = () => {
    console.log('👂 Input event listener\'ları ekleniyor...')
    
    // BURAYA DİKKAT: Öğrenci numarası input'u
    const ogrNoInput = document.querySelector('#ogrNo')
    if (ogrNoInput) {
        // BURAYA DİKKAT: focus event → Input'a tıklandığında
        ogrNoInput.addEventListener('focus', () => {
            showToast(
                '👆 Input\'a Tıklandı',
                'Öğrenci numarası input\'una tıklandı!<br>HTML elementi: <input id="ogrNo" type="number"><br>Çalışan kod: ogrNoInput.addEventListener("focus", ...)',
                'info',
                3000
            )
        })
        
        // BURAYA DİKKAT: input event → Input'a yazı yazıldığında
        ogrNoInput.addEventListener('input', (e) => {
            const value = e.target.value
            if (value.length > 0) {
                showToast(
                    '⌨️ Yazı Yazılıyor',
                    `Öğrenci numarası input'una yazı yazıldı: "${value}"<br>Çalışan kod: ogrNoInput.addEventListener("input", ...)<br>Event: input event (her karakter yazıldığında tetiklenir)`,
                    'info',
                2000
                )
            }
        })
        
        console.log('✅ Öğrenci numarası input\'una event listener eklendi')
    }
    
    // BURAYA DİKKAT: Şifre input'u
    const passwordInput = document.querySelector('#password')
    if (passwordInput) {
        // BURAYA DİKKAT: focus event → Input'a tıklandığında
        passwordInput.addEventListener('focus', () => {
            showToast(
                '👆 Input\'a Tıklandı',
                'Şifre input\'una tıklandı!<br>HTML elementi: <input id="password" type="password"><br>Çalışan kod: passwordInput.addEventListener("focus", ...)',
                'info',
                3000
            )
        })
        
        // BURAYA DİKKAT: input event → Input'a yazı yazıldığında
        passwordInput.addEventListener('input', (e) => {
            const value = e.target.value
            if (value.length > 0) {
                showToast(
                    '⌨️ Yazı Yazılıyor',
                    `Şifre input'una yazı yazıldı (${value.length} karakter)<br>Çalışan kod: passwordInput.addEventListener("input", ...)<br>Event: input event (her karakter yazıldığında tetiklenir)`,
                    'info',
                2000
                )
            }
        })
        
        console.log('✅ Şifre input\'una event listener eklendi')
    }
    
    console.log('✅ Tüm input event listener\'ları eklendi!')
    
    // BURAYA DİKKAT: Toast göster - Input listener'ları hazır
    showToast(
        '✅ Input Listener\'ları Hazır',
        'Tüm input\'lara event listener eklendi!<br>Artık input\'lara tıklandığında ve yazı yazıldığında toast gösterilecek.<br>Çalışan kod: setupInputListeners() fonksiyonu',
        'success',
        0
    )
}

/**
 * Login işlemini yönet
 * 
 * NE ZAMAN ÇALIŞIR?
 * → "Giriş Yap" butonuna tıklandığında
 * → Form içinde Enter tuşuna basıldığında
 * 
 * NE YAPIYOR?
 * → Form verilerini alıyor (öğrenci numarası ve şifre)
 * → API'ye POST isteği gönderiyor
 * → Başarılıysa ana sayfaya yönlendiriyor
 * → Başarısızsa hata mesajı gösteriyor
 * 
 * BURAYA DİKKAT: Event handler fonksiyonu
 * - event parametresi → Form submit event'i
 * - preventDefault() → Form'un varsayılan davranışını (sayfa yenileme) engeller
 */
const handleLogin = async (event) => {
    console.log('')
    console.log('═══════════════════════════════════════════════════════')
    console.log('🔐 LOGIN İŞLEMİ BAŞLATILIYOR')
    console.log('═══════════════════════════════════════════════════════')
    console.log('📍 Şu an çalışan: public/js/login.js, handleLogin() fonksiyonu')
    console.log('👆 Kullanıcı ne yaptı: "Giriş Yap" butonuna tıkladı veya Enter\'a bastı')
    
    // BURAYA DİKKAT: Toast göster - Form gönderildi
    showToast(
        '📝 Form Gönderildi',
        '"Giriş Yap" butonuna tıklandı!<br>Çalışan kod: handleLogin() fonksiyonu (public/js/login.js, satır 129)<br>Form submit event tetiklendi.',
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
        3000
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
    
    // BURAYA DİKKAT: FormData'dan Object'e çevirme
    // FormData'yı JavaScript objesine çeviriyoruz
    const loginData = {
        ogrNo: parseInt(formData.get('ogrNo')), // BURAYA DİKKAT: parseInt() ile sayıya çeviriyoruz
        password: formData.get('password')      // BURAYA DİKKAT: Şifre string olarak kalır
    }
    
    console.log('✅ Form verileri alındı:', {
        ogrNo: loginData.ogrNo,
        password: '••••••••' // Güvenlik için şifreyi göstermiyoruz
    })
    
    // BURAYA DİKKAT: Toast göster - Form verileri hazır
    showToast(
        '✅ Form Verileri Hazır',
        `Öğrenci No: ${loginData.ogrNo}<br>Şifre: ••••••••<br>Çalışan kod: FormData'dan JavaScript objesine çevrildi`,
        'success',
        3000
    )
    
    // Hata mesajını gizle (yeni denemede)
    hideErrorMessage()
    
    try {
        // BURAYA DİKKAT: fetch() ile POST isteği
        // method: 'POST' → POST isteği gönderir
        // headers: Content-Type belirtiyoruz (JSON gönderiyoruz)
        // body: JSON.stringify() → JavaScript objesini JSON string'e çevirir
        console.log('🌐 API\'ye istek gönderiliyor: POST /api/auth/login')
        console.log('   → Gönderilen veri:', { ogrNo: loginData.ogrNo, password: '••••••••' })
        console.log('⏳ Sunucudan cevap bekleniyor...')
        
        // BURAYA DİKKAT: Toast göster - API isteği gönderiliyor
        // API MANTIĞI AÇIKLAMASI:
        // 1. fetch() → Tarayıcının HTTP isteği gönderme fonksiyonu
        // 2. POST → Veri göndermek için kullanılan HTTP metodu
        // 3. /api/auth/login → Backend'deki route (routers/authRoutes.js)
        // 4. headers → Sunucuya JSON gönderdiğimizi söylüyoruz
        // 5. body → Gönderilecek veri (JSON formatında)
        // 6. await → Sunucudan cevap gelene kadar bekliyoruz
        showToast(
            '🌐 API İsteği Gönderiliyor',
            `<strong>API MANTIĞI:</strong><br>
            <br>
            <strong>1. fetch() Fonksiyonu:</strong><br>
            → Tarayıcının HTTP isteği gönderme fonksiyonu<br>
            → Promise döner (asenkron işlem)<br>
            → await ile cevap beklenir<br>
            <br>
            <strong>2. HTTP Metodu: POST</strong><br>
            → Veri göndermek için kullanılır<br>
            → GET: Veri çekmek için<br>
            → POST: Veri göndermek için<br>
            → PUT: Veri güncellemek için<br>
            → DELETE: Veri silmek için<br>
            <br>
            <strong>3. Endpoint: /api/auth/login</strong><br>
            → Backend'deki route (routers/authRoutes.js)<br>
            → Bu route, controllers/authController.js'deki loginController() fonksiyonunu çağırır<br>
            <br>
            <strong>4. Headers:</strong><br>
            → Content-Type: application/json → JSON gönderdiğimizi belirtir<br>
            → Sunucu bu sayede veriyi doğru parse eder<br>
            <br>
            <strong>5. Body:</strong><br>
            → JSON.stringify(loginData) → JavaScript objesini JSON string'e çevirir<br>
            → { ogrNo: 2014800647, password: "123456" } → JSON formatına dönüşür<br>
            <br>
            <strong>Çalışan Kod:</strong><br>
            await fetch("/api/auth/login", {<br>
            &nbsp;&nbsp;method: "POST",<br>
            &nbsp;&nbsp;headers: { "Content-Type": "application/json" },<br>
            &nbsp;&nbsp;body: JSON.stringify(loginData)<br>
            })`,
            'info',
            0
        )
        
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // BURAYA DİKKAT: JSON gönderdiğimizi belirtiyoruz
            },
            body: JSON.stringify(loginData) // BURAYA DİKKAT: JSON.stringify() kullanımı
        })
        
        // BURAYA DİKKAT: Toast göster - Sunucudan cevap geldi
        // API MANTIĞI AÇIKLAMASI:
        // 1. response → Sunucudan gelen HTTP yanıtı
        // 2. response.status → HTTP durum kodu (200 = başarılı, 404 = bulunamadı, 500 = sunucu hatası)
        // 3. response.ok → Status 200-299 arası ise true
        // 4. response.json() → JSON veriyi JavaScript objesine çevirir
        showToast(
            '📥 Sunucudan Cevap Geldi',
            `<strong>API MANTIĞI - Response (Yanıt):</strong><br>
            <br>
            <strong>1. HTTP Status Code:</strong><br>
            → ${response.status} ${response.statusText}<br>
            → 200: Başarılı (OK)<br>
            → 201: Oluşturuldu (Created)<br>
            → 400: Hatalı istek (Bad Request)<br>
            → 401: Yetkisiz (Unauthorized)<br>
            → 404: Bulunamadı (Not Found)<br>
            → 500: Sunucu hatası (Internal Server Error)<br>
            <br>
            <strong>2. response.ok:</strong><br>
            → Status 200-299 arası ise true<br>
            → Başarılı istekleri kontrol etmek için kullanılır<br>
            <br>
            <strong>3. response.json():</strong><br>
            → JSON veriyi JavaScript objesine çevirir<br>
            → await ile beklenir (asenkron işlem)<br>
            → const result = await response.json()<br>
            <br>
            <strong>Çalışan Kod:</strong><br>
            const response = await fetch(...)<br>
            → Sunucudan cevap geldi, response objesi oluşturuldu`,
            'info',
            0
        )
        
        console.log('📥 Sunucudan cevap geldi!')
        console.log('   → Status:', response.status, response.statusText)
        
        // BURAYA DİKKAT: Response kontrolü
        if (!response.ok) {
            console.error('❌ HATA: Sunucu hata döndü!')
            
            // BURAYA DİKKAT: Toast göster - Hata
            showToast(
                '❌ Sunucu Hatası',
                `HTTP Status: ${response.status}<br>Sunucu hata döndü!<br>Çalışan kod: if (!response.ok) kontrolü`,
                'error',
                3000
            )
            
            // Hata detaylarını al
            let errorMessage = 'Giriş başarısız!'
            try {
                const errorData = await response.json()
                console.error('   → Hata detayları:', errorData)
                errorMessage = errorData.message || errorData.error?.message || errorMessage
                
                // BURAYA DİKKAT: Toast göster - Hata detayları
                showToast(
                    '❌ Giriş Başarısız',
                    `${errorMessage}<br>Çalışan kod: const errorData = await response.json()<br>Hata mesajı alındı ve gösteriliyor`,
                    'error',
                    4000
                )
            } catch (e) {
                console.error('   → Hata detayları alınamadı')
                showToast(
                    '❌ Hata Detayları Alınamadı',
                    'Sunucudan hata detayları alınamadı!<br>Çalışan kod: catch bloğu',
                    'error',
                    3000
                )
            }
            
            // Hata mesajını göster
            showErrorMessage(errorMessage)
            throw new Error(errorMessage)
        }
        
        console.log('✅ Response başarılı! (Status 200)')
        
        // BURAYA DİKKAT: Toast göster - Başarılı response
        // API MANTIĞI AÇIKLAMASI:
        // Backend'de ne oldu?
        // 1. routers/authRoutes.js → POST /api/auth/login route'u çalışır
        // 2. controllers/authController.js → loginController() fonksiyonu çalışır
        // 3. models/authModel.js → findOgrenciByNo() fonksiyonu veritabanında öğrenci arar
        // 4. Veritabanı sorgusu çalışır → SELECT * FROM ogrenci_bilgi WHERE Ogr_No = ?
        // 5. Öğrenci bulunursa → Başarılı response döner
        showToast(
            '✅ Başarılı Response',
            `<strong>API MANTIĞI - Backend İşlemleri:</strong><br>
            <br>
            <strong>1. Route (routers/authRoutes.js):</strong><br>
            → POST /api/auth/login isteği geldi<br>
            → router.post('/login', loginController) çalıştı<br>
            → loginController() fonksiyonu çağrıldı<br>
            <br>
            <strong>2. Controller (controllers/authController.js):</strong><br>
            → loginController() fonksiyonu çalıştı<br>
            → req.body'den öğrenci numarası ve şifre alındı<br>
            → Validation (doğrulama) yapıldı<br>
            → Model fonksiyonu çağrıldı<br>
            <br>
            <strong>3. Model (models/authModel.js):</strong><br>
            → findOgrenciByNo(ogrNo) fonksiyonu çalıştı<br>
            → Veritabanı bağlantısı açıldı (pool.query)<br>
            → SQL sorgusu çalıştırıldı<br>
            <br>
            <strong>4. Veritabanı Sorgusu:</strong><br>
            → SELECT * FROM ogrenci_bilgi WHERE Ogr_No = ?<br>
            → ? işareti → Placeholder (parametreli sorgu)<br>
            → SQL injection koruması için kullanılır<br>
            → Öğrenci bulundu → Veri döndü<br>
            <br>
            <strong>5. Response Döndürüldü:</strong><br>
            → res.json({ success: true, user: {...} })<br>
            → JSON formatında cevap gönderildi<br>
            → Frontend'e ulaştı<br>
            <br>
            <strong>HTTP Status:</strong> ${response.status} (OK)`,
            'success',
            0
        )
        
        // BURAYA DİKKAT: JSON veriyi parse etme
        const result = await response.json()
        console.log('✅ Giriş başarılı! Sunucudan gelen cevap:', result)
        
        // BURAYA DİKKAT: Toast göster - Giriş başarılı
        showToast(
            '🎉 Giriş Başarılı!',
            `Hoş geldiniz ${result.user?.ogrAd || ''}!<br>Çalışan kod: const result = await response.json()<br>Ana sayfaya yönlendiriliyor...`,
            'success',
            3000
        )
        
        // BURAYA DİKKAT: Sayfa yönlendirme
        // window.location.href → Tarayıcıyı yeni bir sayfaya yönlendirir
        // Ana sayfaya veya öğrenciler sayfasına yönlendiriyoruz
        console.log('🔄 Ana sayfaya yönlendiriliyor...')
        console.log('   → window.location.href = "/ogrenciler"')
        
        // BURAYA DİKKAT: Toast göster - Yönlendirme
        showToast(
            '🔄 Yönlendiriliyor',
            'Ana sayfaya yönlendiriliyor...<br>Çalışan kod: window.location.href = "/ogrenciler"<br>setTimeout() ile 500ms sonra yönlendirme yapılıyor',
            'info',
            2000
        )
        
        // Kısa bir gecikme ile yönlendirme (kullanıcı mesajı görebilsin)
        setTimeout(() => {
            window.location.href = '/ogrenciler'
            console.log('✅ Yönlendirme yapıldı!')
        }, 500)
        
        console.log('═══════════════════════════════════════════════════════')
        console.log('✅ handleLogin() FONKSİYONU TAMAMLANDI')
        console.log('═══════════════════════════════════════════════════════')
        console.log('')
        
    } catch (error) {
        // BURAYA DİKKAT: Hata yönetimi
        console.error('❌ HATA YAKALANDI!')
        console.error('   → Hata mesajı:', error.message)
        console.error('   → Hata detayları:', error)
        
        // BURAYA DİKKAT: Toast göster - Genel hata
        showToast(
            '❌ Hata Oluştu',
            `${error.message}<br>Çalışan kod: catch bloğu (public/js/login.js)<br>Hata yakalandı ve gösteriliyor`,
            'error',
            5000
        )
        
        console.log('═══════════════════════════════════════════════════════')
        console.log('')
    }
}

/**
 * Hata mesajını göster
 * 
 * NE ZAMAN ÇALIŞIR?
 * → Login başarısız olduğunda
 * 
 * NE YAPIYOR?
 * → Hata mesajı kutusunu buluyor
 * → Mesajı yazıyor
 * → Kutusu görünür yapıyor
 * 
 * @param {string} message - Gösterilecek hata mesajı
 */
const showErrorMessage = (message) => {
    console.log('⚠️ Hata mesajı gösteriliyor:', message)
    
    // BURAYA DİKKAT: DOM manipülasyonu
    // Hata mesajı kutusunu buluyoruz
    const errorDiv = document.querySelector('#errorMessage')
    
    if (errorDiv) {
        // BURAYA DİKKAT: innerHTML ve style kullanımı
        // Mesajı yazıyoruz ve kutusu görünür yapıyoruz
        errorDiv.innerHTML = '❌ ' + message
        errorDiv.style.display = 'block'
        console.log('✅ Hata mesajı gösterildi')
    } else {
        console.error('❌ Hata mesajı kutusu bulunamadı!')
    }
}

/**
 * Hata mesajını gizle
 * 
 * NE ZAMAN ÇALIŞIR?
 * → Yeni bir login denemesi başladığında
 * 
 * NE YAPIYOR?
 * → Hata mesajı kutusunu gizliyor
 */
const hideErrorMessage = () => {
    const errorDiv = document.querySelector('#errorMessage')
    if (errorDiv) {
        errorDiv.style.display = 'none'
        errorDiv.innerHTML = ''
    }
}

