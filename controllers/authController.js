import { findOgrenciByNo, verifyPassword } from '../models/authModel.js'

/**
 * AUTH CONTROLLER - Kimlik Doğrulama İş Mantığı
 * 
 * Bu dosya, login (giriş) işlemlerini yönetir.
 * 
 * Controller'ın görevi:
 * 1. Model fonksiyonlarını çağırmak
 * 2. Kullanıcı bilgilerini doğrulamak
 * 3. Session oluşturmak (ileride)
 * 4. HTTP response döndürmek
 */

/**
 * Login işlemi
 * 
 * NE ZAMAN ÇALIŞIR?
 * → POST /api/auth/login isteği geldiğinde
 * → Kullanıcı login formunu gönderdiğinde
 * 
 * NE YAPIYOR?
 * → Gelen öğrenci numarası ve şifreyi alır
 * → Veritabanında öğrenciyi arar
 * → Şifreyi kontrol eder
 * → Başarılıysa session oluşturur (ileride)
 * → HTTP response döndürür
 * 
 * BURAYA DİKKAT: Express route handler yapısı
 * - req: Request objesi (gelen istek bilgileri)
 * - res: Response objesi (gönderilecek cevap)
 * - next: Hata durumunda bir sonraki middleware'e geçmek için
 * 
 * POST /api/auth/login isteği geldiğinde bu fonksiyon çalışır
 */
export const loginController = async (req, res, next) => {
    console.log('')
    console.log('═══════════════════════════════════════════════════════')
    console.log('🔐 LOGIN CONTROLLER ÇALIŞIYOR')
    console.log('═══════════════════════════════════════════════════════')
    console.log('📍 Şu an çalışan: controllers/authController.js, loginController() fonksiyonu')
    console.log('👆 Kullanıcı ne yaptı: Login formunu gönderdi')
    
    try {
        // BURAYA DİKKAT: req.body ile POST verilerini alma
        // POST isteğinde gönderilen JSON veriler req.body'de olur
        // express.json() middleware'i sayesinde otomatik parse edilir
        const { ogrNo, password } = req.body
        
        console.log('📋 Gelen veriler:')
        console.log('   → Öğrenci No:', ogrNo)
        console.log('   → Şifre:', '••••••••') // Güvenlik için şifreyi göstermiyoruz
        
        // BURAYA DİKKAT: Validation (Doğrulama)
        // Gelen verilerin doğru olup olmadığını kontrol ediyoruz
        if (!ogrNo) {
            console.log('❌ Validation hatası: Öğrenci numarası eksik!')
            return res.status(400).json({
                success: false,
                message: 'Öğrenci numarası gereklidir!'
            })
        }
        
        if (!password) {
            console.log('❌ Validation hatası: Şifre eksik!')
            return res.status(400).json({
                success: false,
                message: 'Şifre gereklidir!'
            })
        }
        
        console.log('✅ Validation başarılı!')
        
        // BURAYA DİKKAT: Model fonksiyonunu çağırma
        // Model katmanından öğrenciyi arıyoruz
        console.log('🔍 Model katmanına gidiliyor: findOgrenciByNo() çağrılıyor...')
        const ogrenci = await findOgrenciByNo(ogrNo)
        
        console.log('✅ Öğrenci bulundu!')
        console.log('   → Öğrenci Adı:', ogrenci.Ogr_Ad, ogrenci.Ogr_Soyad)
        
        // BURAYA DİKKAT: Şifre kontrolü
        // Şifrenin doğru olup olmadığını kontrol ediyoruz
        console.log('🔐 Şifre kontrolü yapılıyor...')
        const isPasswordValid = verifyPassword(ogrenci, password)
        
        if (!isPasswordValid) {
            console.log('❌ Şifre yanlış!')
            return res.status(401).json({
                success: false,
                message: 'Şifre yanlış!'
            })
        }
        
        console.log('✅ Şifre doğru!')
        
        // BURAYA DİKKAT: Session oluşturma
        // req.session → Session objesi (express-session ile oluşturulur)
        // Session'da kullanıcı bilgilerini saklıyoruz
        // Böylece kullanıcı giriş yaptığını hatırlayabiliriz
        console.log('📝 Session oluşturuluyor...')
        
        // BURAYA DİKKAT: Güvenlik için hassas bilgileri session'a eklemiyoruz
        // Şifre gibi bilgileri session'a eklemiyoruz
        if (req.session) {
            req.session.user = {
                ogrNo: ogrenci.Ogr_No,
                ogrAd: ogrenci.Ogr_Ad,
                ogrSoyad: ogrenci.Ogr_Soyad,
                bolumKod: ogrenci.Bolum_Kod,
                fakulteKod: ogrenci.Fakulte_Kod
            }
            console.log('✅ Session oluşturuldu!')
            console.log('   → Session ID:', req.sessionID)
            console.log('   → Kullanıcı bilgileri session\'a kaydedildi')
        } else {
            console.log('⚠️ Session mevcut değil (ileride express-session eklenecek)')
        }
        
        // BURAYA DİKKAT: Güvenlik için hassas bilgileri göndermiyoruz
        // Şifre gibi bilgileri response'a eklemiyoruz
        const userData = {
            ogrNo: ogrenci.Ogr_No,
            ogrAd: ogrenci.Ogr_Ad,
            ogrSoyad: ogrenci.Ogr_Soyad,
            bolumKod: ogrenci.Bolum_Kod,
            fakulteKod: ogrenci.Fakulte_Kod
        }
        
        // BURAYA DİKKAT: HTTP response gönderme
        // Status 200 (OK) → Başarılı giriş
        console.log('✅ Login başarılı! Response gönderiliyor...')
        res.json({
            success: true,
            message: 'Giriş başarılı!',
            user: userData
        })
        
        console.log('═══════════════════════════════════════════════════════')
        console.log('✅ loginController() FONKSİYONU TAMAMLANDI')
        console.log('═══════════════════════════════════════════════════════')
        console.log('')
        
    } catch (error) {
        // BURAYA DİKKAT: Hata yönetimi
        console.error('❌ HATA YAKALANDI!')
        console.error('   → Hata mesajı:', error.message)
        console.error('   → Hata detayları:', error)
        
        // Model'den gelen hata (örn: öğrenci bulunamadı) burada yakalanır
        if (error.message === 'Öğrenci numarası bulunamadı!') {
            return res.status(404).json({
                success: false,
                message: error.message
            })
        }
        
        // Diğer hatalar için
        next(error)
    }
}

