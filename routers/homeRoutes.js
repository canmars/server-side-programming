/**
 * Home Routes (Ana Sayfa Route'ları)
 * 
 * Ana sayfa ve genel sayfalar için route'lar
 * 
 * NEDEN AYRI ROUTER?
 * - Modülerlik: Tüm route'lar router dosyalarında
 * - Tutarlılık: Her şey aynı yapıda
 * - Bakım kolaylığı: Route'ları bulmak kolay
 */

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

/**
 * Ana sayfa
 * 
 * GET /
 * 
 * Örnek: http://localhost:3000/
 */
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})

/**
 * Öğrenciler sayfası
 * 
 * GET /ogrenciler
 * 
 * BURAYA DİKKAT: HTML dosyası gönderme
 * - res.sendFile() → HTML dosyasını gönderir
 * - path.join() → Dosya yolu oluşturur (işletim sistemi bağımsız)
 * 
 * Örnek: http://localhost:3000/ogrenciler
 */
router.get('/ogrenciler', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/ogrenciler.html'))
})

/**
 * Login sayfası
 * 
 * GET /login
 * 
 * BURAYA DİKKAT: Login sayfası gönderme
 * - res.sendFile() → HTML dosyasını gönderir
 * - Login sayfası kullanıcıdan öğrenci numarası ve şifre ister
 * 
 * NE ZAMAN ÇALIŞIR?
 * → Kullanıcı http://localhost:3000/login adresine gittiğinde
 * → Bu route çalışır ve login.html dosyası gönderilir
 * 
 * Örnek: http://localhost:3000/login
 */
router.get('/login', (req, res) => {
    console.log('📄 Login sayfası isteniyor: GET /login')
    console.log('   → views/login.html dosyası gönderiliyor')
    res.sendFile(path.join(__dirname, '../views/login.html'))
})

/**
 * API Öğrenme sayfası
 * 
 * GET /api-ogren
 * 
 * BURAYA DİKKAT: API endpoint'lerini öğrenmek için etkileşimli sayfa
 * - res.sendFile() → HTML dosyasını gönderir
 * - Kullanıcı butonlara tıklayarak API istekleri gönderebilir
 * - Her adım toast ile açıklanır
 * 
 * NE ZAMAN ÇALIŞIR?
 * → Kullanıcı http://localhost:3000/api-ogren adresine gittiğinde
 * → Bu route çalışır ve api-ogren.html dosyası gönderilir
 * 
 * Örnek: http://localhost:3000/api-ogren
 */
router.get('/api-ogren', (req, res) => {
    console.log('📄 API öğrenme sayfası isteniyor: GET /api-ogren')
    console.log('   → views/api-ogren.html dosyası gönderiliyor')
    res.sendFile(path.join(__dirname, '../views/api-ogren.html'))
})

// Router'ı export et
export default router

