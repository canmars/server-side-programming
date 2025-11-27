/**
 * User Routes
 * 
 * Bu dosya, kullanıcı ile ilgili tüm route'ları tanımlar.
 * 
 * Neden Router Dosyaları?
 * - Modülerlik: Route'ları organize eder
 * - Okunabilirlik: app.js karmaşık olmaz
 * - Bakım kolaylığı: Her model için ayrı router
 * - Ölçeklenebilirlik: Yeni route'lar kolayca eklenir
 */

import express from 'express'
import * as userController from '../controllers/userController.js'

// Express Router oluşturuyoruz
// Router, route'ları organize etmek için kullanılır
const router = express.Router()

/**
 * RESTful Routing Pattern
 * 
 * REST (Representational State Transfer) standartlarına uygun route yapısı:
 * 
 * GET    /users        → index    (Listele)
 * GET    /users/:id    → show     (Göster)
 * GET    /users/create → create   (Form göster)
 * POST   /users        → store   (Oluştur)
 * GET    /users/:id/edit → edit  (Düzenleme formu)
 * PUT    /users/:id    → update   (Güncelle)
 * DELETE /users/:id    → destroy  (Sil)
 */

/**
 * Kullanıcı listesi
 * GET /users
 * 
 * Örnek: http://localhost:3000/users
 */
router.get('/', userController.index)

/**
 * Yeni kullanıcı oluşturma formu
 * GET /users/create
 * 
 * Örnek: http://localhost:3000/users/create
 * 
 * Not: Bu route, create() metodundan ÖNCE tanımlanmalı
 * Çünkü Express route'ları yukarıdan aşağıya sırayla kontrol eder
 * Eğer /users/:id önce tanımlanırsa, /users/create isteği :id olarak algılanır
 */
router.get('/create', userController.create)

/**
 * Belirli bir kullanıcıyı göster
 * GET /users/:id
 * 
 * Örnek: http://localhost:3000/users/5
 * 
 * :id → Route parametresi (req.params.id)
 * 
 * Route Parametreleri:
 * - URL'in bir parçasıdır
 * - req.params objesinde bulunur
 * - Örnek: /users/:id → req.params.id = "5"
 * - Örnek: /users/:id/posts/:postId → req.params = { id: "5", postId: "10" }
 */
router.get('/:id', userController.show)

/**
 * Kullanıcı düzenleme formu
 * GET /users/:id/edit
 * 
 * Örnek: http://localhost:3000/users/5/edit
 */
router.get('/:id/edit', userController.edit)

/**
 * Yeni kullanıcı oluştur
 * POST /users
 * 
 * Örnek: Form submit → POST /users
 * 
 * Form verileri req.body'de gelir
 * express.urlencoded() middleware gerekli
 */
router.post('/', userController.store)

/**
 * Kullanıcı güncelle
 * PUT /users/:id
 * 
 * Örnek: Form submit → PUT /users/5
 * 
 * Not: HTML form'ları sadece GET ve POST destekler
 * PUT ve DELETE için method-override middleware gerekli
 * Veya POST kullanıp _method parametresi ile belirtilir
 */
router.put('/:id', userController.update)

/**
 * Kullanıcı sil
 * DELETE /users/:id
 * 
 * Örnek: DELETE /users/5
 * 
 * Not: HTML form'ları sadece GET ve POST destekler
 * DELETE için method-override middleware gerekli
 */
router.delete('/:id', userController.destroy)

// Router'ı export ediyoruz
// app.js'te kullanılacak: app.use('/users', userRoutes)
export default router

