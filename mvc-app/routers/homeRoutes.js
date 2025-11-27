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

const router = express.Router()

/**
 * Ana sayfa
 * 
 * GET /
 * 
 * Örnek: http://localhost:3000/
 */
router.get('/', (req, res) => {
    res.render('index', { 
        title: 'Ana Sayfa',
        layout: 'layouts/main'
    })
})

// Router'ı export et
export default router

