import express from 'express'
import { loginController } from '../controllers/authController.js'

/**
 * AUTH ROUTES - Kimlik Doğrulama API Endpoint'leri
 * 
 * Bu dosya, login/logout gibi kimlik doğrulama endpoint'lerini tanımlar.
 * 
 * Route'un görevi:
 * 1. URL'leri tanımlamak (örn: /api/auth/login)
 * 2. HTTP method'larını belirlemek (POST)
 * 3. İlgili controller fonksiyonunu çağırmak
 */

// BURAYA DİKKAT: Express Router oluşturma
// Router, route'ları modüler hale getirir
// app.js'de app.use('/api/auth', authRoutes) şeklinde kullanılır
const router = express.Router()

/**
 * POST /api/auth/login
 * 
 * Kullanıcı girişi yapar
 * 
 * NE ZAMAN ÇALIŞIR?
 * → Kullanıcı login formunu gönderdiğinde
 * → Frontend'den POST /api/auth/login isteği geldiğinde
 * 
 * NE YAPIYOR?
 * → Öğrenci numarası ve şifreyi alır
 * → Veritabanında kontrol eder
 * → Başarılıysa kullanıcı bilgilerini döndürür
 * 
 * BURAYA DİKKAT: POST endpoint tanımlama
 * - router.post() → POST istekleri için
 * - POST isteği → Veri göndermek için kullanılır
 * - Body'de JSON veri gönderilir (req.body'de olur)
 * 
 * BURAYA DİKKAT: HTTP Method farkları
 * - GET: Veri çekmek için (sadece okuma)
 * - POST: Veri göndermek için (yazma işlemleri)
 * 
 * Örnek kullanım:
 * POST http://localhost:3000/api/auth/login
 * Body (JSON): { "ogrNo": 2014800647, "password": "123456" }
 */
router.post('/login', loginController)

// Router'ı export et
// app.js'de import edilecek
export default router

