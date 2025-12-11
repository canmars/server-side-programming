import express from 'express'
import { getAllOgrencilerController, createOgrenciController, updateOgrenciController, deleteOgrenciController, getOgrenciByIdController } from '../controllers/ogrenciController.js'

/**
 * ÖĞRENCİ ROUTES - API Endpoint Tanımlamaları
 * 
 * Bu dosya, öğrenci API endpoint'lerini tanımlar.
 * 
 * Route'un görevi:
 * 1. URL'leri tanımlamak (örn: /api/ogrenciler)
 * 2. HTTP method'larını belirlemek (GET, POST, PUT, DELETE)
 * 3. İlgili controller fonksiyonunu çağırmak
 */

// BURAYA DİKKAT: Express Router oluşturma
// Router, route'ları modüler hale getirir
// app.js'de app.use('/api/ogrenciler', ogrenciRoutes) şeklinde kullanılır
const router = express.Router()

/**
 * GET /api/ogrenciler
 * 
 * Tüm öğrencileri listeler
 * 
 * BURAYA DİKKAT: GET endpoint tanımlama
 * - router.get() → GET istekleri için
 * - İlk parametre: URL path ('/' bu router'ın base path'i)
 * - İkinci parametre: Controller fonksiyonu
 * 
 * Örnek kullanım:
 * GET http://localhost:3000/api/ogrenciler
 */
router.get('/', getAllOgrencilerController)

/**
 * GET /api/ogrenciler/:id
 * 
 * ID'ye göre tek öğrenci getirir
 * 
 * BURAYA DİKKAT: Route parametreleri kullanımı
 * - :id → Dinamik parametre
 * - Örnek: GET /api/ogrenciler/123 → req.params.id = "123"
 * 
 * ÖNEMLİ: Bu route, GET /api/ogrenciler route'undan SONRA olmalı
 * Çünkü Express route'ları sırayla kontrol eder
 * Eğer /:id önce gelirse, "/" isteği de :id olarak algılanır
 * 
 * Örnek kullanım:
 * GET http://localhost:3000/api/ogrenciler/123
 */
router.get('/:id', getOgrenciByIdController)

/**
 * POST /api/ogrenciler
 * 
 * Yeni öğrenci ekler
 * 
 * BURAYA DİKKAT: POST endpoint tanımlama
 * - router.post() → POST istekleri için
 * - POST isteği → Yeni kayıt oluşturmak için kullanılır
 * - GET vs POST farkı:
 *   - GET: Veri çekmek için (sadece okuma)
 *   - POST: Yeni veri eklemek için (yazma)
 * 
 * BURAYA DİKKAT: HTTP Method farkları
 * - GET: Veri göndermez, sadece URL'den parametre alır
 * - POST: Body'de veri gönderir (req.body'de olur)
 * 
 * Örnek kullanım:
 * POST http://localhost:3000/api/ogrenciler
 * Body (JSON): { "Ogr_No": 123, "Ogr_Ad": "Ahmet", ... }
 */
router.post('/', createOgrenciController)

/**
 * PUT /api/ogrenciler/:id
 * 
 * Öğrenci bilgilerini günceller
 * 
 * BURAYA DİKKAT: PUT endpoint tanımlama
 * - router.put() → PUT istekleri için
 * - PUT isteği → Mevcut kaydı güncellemek için kullanılır
 * - :id → Route parametresi (req.params.id ile erişilir)
 * 
 * BURAYA DİKKAT: Route parametreleri
 * - :id → Dinamik parametre (herhangi bir değer olabilir)
 * - Örnek: PUT /api/ogrenciler/123 → req.params.id = "123"
 * 
 * Örnek kullanım:
 * PUT http://localhost:3000/api/ogrenciler/123
 * Body (JSON): { "Ogr_Ad": "Yeni Ad", "Ogr_Soyad": "Yeni Soyad", ... }
 */
router.put('/:id', updateOgrenciController)

/**
 * DELETE /api/ogrenciler/:id
 * 
 * Öğrenci siler
 * 
 * BURAYA DİKKAT: DELETE endpoint tanımlama
 * - router.delete() → DELETE istekleri için
 * - DELETE isteği → Kayıt silmek için kullanılır
 * - :id → Route parametresi (req.params.id ile erişilir)
 * 
 * Örnek kullanım:
 * DELETE http://localhost:3000/api/ogrenciler/123
 */
router.delete('/:id', deleteOgrenciController)

// Router'ı export et
// app.js'de import edilecek
export default router

