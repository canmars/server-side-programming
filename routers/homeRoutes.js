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

// Router'ı export et
export default router

