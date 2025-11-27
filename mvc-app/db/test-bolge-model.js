/**
 * Bolge Model Test
 * 
 * Bu dosya, Bolge Model'inin çalışıp çalışmadığını test eder.
 * 
 * Kullanım: node db/test-bolge-model.js
 */

import Bolge from '../models/Bolge.js'

async function testBolgeModel() {
    try {
        console.log('🧪 Bolge Model Test Başlıyor...\n')
        
        // 1. Tüm bölgeleri getir
        console.log('1️⃣ Tüm bölgeleri getiriyorum...')
        const allBolges = await Bolge.findAll()
        console.log(`✅ ${allBolges.length} bölge bulundu:`)
        allBolges.forEach(bolge => {
            console.log(`   - ${bolge.bolge_id}: ${bolge.bolge_ad}`)
        })
        console.log('')
        
        // 2. İlk bölgeyi ID ile getir
        if (allBolges.length > 0) {
            const firstBolgeId = allBolges[0].bolge_id
            console.log(`2️⃣ ID=${firstBolgeId} olan bölgeyi getiriyorum...`)
            const bolge = await Bolge.findById(firstBolgeId)
            if (bolge) {
                console.log(`✅ Bölge bulundu: ${bolge.bolge_ad}`)
            } else {
                console.log('❌ Bölge bulunamadı')
            }
            console.log('')
        }
        
        console.log('✅ Tüm testler başarılı!')
        process.exit(0)
    } catch (error) {
        console.error('❌ Test hatası:')
        console.error(error.message)
        process.exit(1)
    }
}

testBolgeModel()

