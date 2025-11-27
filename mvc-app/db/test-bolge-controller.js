/**
 * Bolge Controller Test
 * 
 * Bu dosya, Controller'ın Model ile nasıl çalıştığını gösterir.
 * 
 * Kullanım: node db/test-bolge-controller.js
 * 
 * ÖNEMLİ: Bu sadece test için. Gerçek uygulamada Controller,
 * Router ve View ile birlikte çalışır.
 */

import * as bolgeController from '../controllers/bolgeController.js'
import Bolge from '../models/Bolge.js'

async function testController() {
    try {
        console.log('🧪 Controller Test Başlıyor...\n')
        
        // Controller'ın içinde ne var?
        console.log('1️⃣ Controller metodları:')
        console.log('   - index:', typeof bolgeController.index)
        console.log('   - show:', typeof bolgeController.show)
        console.log('   - create:', typeof bolgeController.create)
        console.log('   - store:', typeof bolgeController.store)
        console.log('')
        
        // Model ile Controller ilişkisi
        console.log('2️⃣ Controller, Modeli kullanır:')
        console.log('   Controller → Bolge.findAll() → Veritabanı')
        console.log('')
        
        // Model'den direkt veri çek (Controller olmadan)
        console.log('3️⃣ Model direkt kullanım (Controller olmadan):')
        const bolgeler = await Bolge.findAll()
        console.log(`   ✅ ${bolgeler.length} bölge bulundu`)
        bolgeler.forEach(bolge => {
            console.log(`      - ${bolge.bolge_id}: ${bolge.bolge_ad}`)
        })
        console.log('')
        
        console.log('✅ Controller testi tamamlandı!')
        console.log('')
        console.log('📝 Öğrenilen:')
        console.log('   - Controller, Model ile çalışır')
        console.log('   - Controller, req ve res parametreleri alır')
        console.log('   - Controller, View\'a veri gönderir (res.render)')
        
        process.exit(0)
    } catch (error) {
        console.error('❌ Test hatası:')
        console.error(error.message)
        process.exit(1)
    }
}

testController()

