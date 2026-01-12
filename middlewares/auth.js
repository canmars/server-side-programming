/**
 * AUTH MIDDLEWARE - Kimlik Doğrulama Middleware'leri
 * 
 * Bu dosya, kimlik doğrulama ile ilgili middleware fonksiyonlarını içerir.
 * 
 * Middleware'in görevi:
 * 1. Kullanıcının giriş yapıp yapmadığını kontrol etmek
 * 2. Giriş yapmamış kullanıcıları login sayfasına yönlendirmek
 * 3. Giriş yapmış kullanıcı bilgilerini req.user'a eklemek
 */

/**
 * Kullanıcının giriş yapıp yapmadığını kontrol eden middleware
 * 
 * NE ZAMAN ÇALIŞIR?
 * → Bu middleware'in eklendiği route'lara istek geldiğinde
 * → Örnek: app.get('/ogrenciler', requireAuth, ...)
 * 
 * NE YAPIYOR?
 * → Session'da kullanıcı bilgisi var mı kontrol eder
 * → Varsa → İsteği devam ettirir (next())
 * → Yoksa → Login sayfasına yönlendirir
 * 
 * BURAYA DİKKAT: Middleware yapısı
 * - req: Request objesi
 * - res: Response objesi
 * - next: Bir sonraki middleware'e geçmek için
 * 
 * KULLANIM:
 * router.get('/ogrenciler', requireAuth, (req, res) => { ... })
 */
export const requireAuth = (req, res, next) => {
    console.log('')
    console.log('═══════════════════════════════════════════════════════')
    console.log('🔒 AUTH MIDDLEWARE ÇALIŞIYOR: requireAuth')
    console.log('═══════════════════════════════════════════════════════')
    console.log('📍 Şu an çalışan: middlewares/auth.js, requireAuth() fonksiyonu')
    console.log('🔍 Kontrol ediliyor: Kullanıcı giriş yapmış mı?')
    
    // BURAYA DİKKAT: Session kontrolü
    // req.session → Session objesi (express-session ile oluşturulur)
    // req.session.user → Giriş yapmış kullanıcı bilgisi
    
    // Şimdilik basit kontrol (ileride session eklenecek)
    // İleride: if (req.session && req.session.user) { ... }
    
    // Şimdilik herkese izin veriyoruz (geliştirme aşaması)
    // İleride session kontrolü eklenecek
    console.log('⚠️ Şimdilik session kontrolü yok (geliştirme aşaması)')
    console.log('   → İleride session kontrolü eklenecek')
    console.log('   → Şimdilik tüm isteklere izin veriliyor')
    console.log('✅ İstek devam ediyor...')
    console.log('═══════════════════════════════════════════════════════')
    console.log('')
    
    // Şimdilik herkese izin ver
    next()
    
    // İleride şöyle olacak:
    /*
    if (req.session && req.session.user) {
        // Kullanıcı giriş yapmış
        console.log('✅ Kullanıcı giriş yapmış:', req.session.user.ogrNo)
        next() // İsteği devam ettir
    } else {
        // Kullanıcı giriş yapmamış
        console.log('❌ Kullanıcı giriş yapmamış, login sayfasına yönlendiriliyor...')
        res.redirect('/login') // Login sayfasına yönlendir
    }
    */
}

/**
 * Giriş yapmış kullanıcıları login sayfasından uzak tutan middleware
 * 
 * NE ZAMAN ÇALIŞIR?
 * → Login sayfasına istek geldiğinde
 * 
 * NE YAPIYOR?
 * → Eğer kullanıcı zaten giriş yapmışsa, ana sayfaya yönlendirir
 * → Giriş yapmamışsa, login sayfasını gösterir
 */
export const redirectIfAuthenticated = (req, res, next) => {
    console.log('🔍 redirectIfAuthenticated kontrolü yapılıyor...')
    
    // Şimdilik basit (ileride session kontrolü eklenecek)
    // İleride: if (req.session && req.session.user) { res.redirect('/ogrenciler') }
    
    next()
}

