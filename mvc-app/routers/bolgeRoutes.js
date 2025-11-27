/**
 * Bolge Routes
 * 
 * ROUTER NEDİR?
 * - URL'leri (adresleri) Controller metodlarına bağlar
 * - Kullanıcı hangi URL'ye giderse, hangi Controller metodunun çalışacağını belirler
 * 
 * ÖRNEK:
 * - Kullanıcı: http://localhost:3000/bolge → bolgeController.index() çalışır
 * - Kullanıcı: http://localhost:3000/bolge/5 → bolgeController.show() çalışır
 * 
 * HTTP METODLARI:
 * - GET    → Veri okuma (listele, göster)
 * - POST   → Yeni kayıt oluşturma
 * - PUT    → Kayıt güncelleme
 * - DELETE → Kayıt silme
 */

import express from 'express'
import * as bolgeController from '../controllers/bolgeController.js'

// Express Router oluştur
// Router, route'ları organize etmek için kullanılır
const router = express.Router()

/**
 * ============================================
 * GET ROUTES (Veri Okuma)
 * ============================================
 */

/**
 * Tüm bölgeleri listele
 * 
 * GET /bolge
 * 
 * Örnek URL: http://localhost:3000/bolge
 * 
 * Nasıl Çalışır?
 * 1. Kullanıcı /bolge URL'sine gider
 * 2. Router bu isteği yakalar
 * 3. bolgeController.index metodunu çalıştırır
 * 4. Controller Model'den veri çeker
 * 5. Controller View'a veri gönderir
 * 6. Kullanıcı bölge listesini görür
 */
router.get('/', bolgeController.index)

/**
 * Yeni bölge oluşturma formu
 * 
 * GET /bolge/create
 * 
 * Örnek URL: http://localhost:3000/bolge/create
 * 
 * ÖNEMLİ: Bu route, /bolge/:id route'undan ÖNCE tanımlanmalı!
 * 
 * Neden?
 * - Express route'ları yukarıdan aşağıya sırayla kontrol eder
 * - Eğer /bolge/:id önce tanımlanırsa, /bolge/create isteği
 *   /bolge/:id olarak algılanır (id = "create" olur)
 */
router.get('/create', bolgeController.create)

/**
 * Belirli bir bölgeyi göster
 * 
 * GET /bolge/:id
 * 
 * Örnek URL: http://localhost:3000/bolge/5
 * 
 * :id → Route parametresi (değişken)
 * - req.params.id ile erişilir
 * - Örnek: /bolge/5 → req.params.id = "5"
 * 
 * Nasıl Çalışır?
 * 1. Kullanıcı /bolge/5 URL'sine gider
 * 2. Router :id parametresini yakalar (id = 5)
 * 3. bolgeController.show(5) metodunu çalıştırır
 * 4. Controller Model'den ID=5 olan bölgeyi çeker
 * 5. Controller View'a bölge verisini gönderir
 * 6. Kullanıcı bölge detayını görür
 */
router.get('/:id', bolgeController.show)

/**
 * Bölge düzenleme formu
 * 
 * GET /bolge/:id/edit
 * 
 * Örnek URL: http://localhost:3000/bolge/5/edit
 * 
 * :id → Route parametresi
 * - req.params.id ile erişilir
 */
router.get('/:id/edit', bolgeController.edit)

/**
 * ============================================
 * POST ROUTE (Yeni Kayıt Oluşturma)
 * ============================================
 */

/**
 * Yeni bölge oluştur
 * 
 * POST /bolge
 * 
 * Örnek: Form submit → POST /bolge
 * 
 * Nasıl Çalışır?
 * 1. Kullanıcı formu doldurur ve gönderir
 * 2. Form verileri req.body'de gelir
 * 3. Router POST /bolge isteğini yakalar
 * 4. bolgeController.store metodunu çalıştırır
 * 5. Controller Model'e yeni bölgeyi ekler
 * 6. Başarılı olursa yönlendirir (redirect)
 * 
 * Form Verileri:
 * - req.body.bolge_id → Form'dan gelen bölge ID
 * - req.body.bolge_ad → Form'dan gelen bölge adı
 */
router.post('/', bolgeController.store)

/**
 * ============================================
 * PUT ROUTE (Kayıt Güncelleme)
 * ============================================
 */

/**
 * Bölge güncelle
 * 
 * PUT /bolge/:id
 * 
 * Örnek: Form submit → PUT /bolge/5
 * 
 * ÖNEMLİ: HTML form'ları sadece GET ve POST destekler
 * PUT ve DELETE için method-override middleware gerekli
 * 
 * Form'da şöyle kullanılır:
 * <form method="POST" action="/bolge/5?_method=PUT">
 *   <input type="hidden" name="_method" value="PUT">
 *   ...
 * </form>
 * 
 * Nasıl Çalışır?
 * 1. Kullanıcı düzenleme formunu gönderir
 * 2. method-override middleware, POST'u PUT'a çevirir
 * 3. Router PUT /bolge/:id isteğini yakalar
 * 4. bolgeController.update metodunu çalıştırır
 * 5. Controller Model'de bölgeyi günceller
 * 6. Başarılı olursa yönlendirir
 */
router.put('/:id', bolgeController.update)

/**
 * ============================================
 * DELETE ROUTE (Kayıt Silme)
 * ============================================
 */

/**
 * Bölge sil
 * 
 * DELETE /bolge/:id
 * 
 * Örnek: DELETE /bolge/5
 * 
 * ÖNEMLİ: HTML form'ları sadece GET ve POST destekler
 * DELETE için method-override middleware gerekli
 * 
 * Form'da şöyle kullanılır:
 * <form method="POST" action="/bolge/5?_method=DELETE">
 *   <button type="submit">Sil</button>
 * </form>
 * 
 * Nasıl Çalışır?
 * 1. Kullanıcı sil butonuna tıklar
 * 2. method-override middleware, POST'u DELETE'a çevirir
 * 3. Router DELETE /bolge/:id isteğini yakalar
 * 4. bolgeController.destroy metodunu çalıştırır
 * 5. Controller Model'den bölgeyi siler
 * 6. Başarılı olursa yönlendirir
 */
router.delete('/:id', bolgeController.destroy)

/**
 * ============================================
 * ROUTE SIRASI ÖNEMLİ!
 * ============================================
 * 
 * Route'lar yukarıdan aşağıya sırayla kontrol edilir.
 * Bu yüzden sıralama çok önemlidir!
 * 
 * ✅ DOĞRU SIRA:
 * 1. router.get('/create', ...)     → Özel route önce
 * 2. router.get('/:id', ...)         → Parametreli route sonra
 * 
 * ❌ YANLIŞ SIRA:
 * 1. router.get('/:id', ...)         → Parametreli route önce
 * 2. router.get('/create', ...)      → Özel route sonra (hiç çalışmaz!)
 * 
 * Neden?
 * - /bolge/create isteği geldiğinde
 * - Express önce /:id route'unu kontrol eder
 * - :id = "create" olarak algılanır
 * - /create route'u hiç kontrol edilmez
 */

// Router'ı export et
// app.js'te kullanılacak: app.use('/bolge', bolgeRoutes)
export default router

