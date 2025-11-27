/**
 * BOLGE MODEL - BASİT ÖRNEK
 * 
 * Bu dosya, method ve static method kavramlarını basit örneklerle gösterir.
 * Gerçek kullanım için Bolge.js dosyasını kullanın.
 */

// ============================================
// 1. NORMAL METHOD (Instance Gerekli)
// ============================================

class MutfakNormal {
    // Normal method
    yemekYap(yemekAdi) {
        return `${yemekAdi} yapıldı`
    }
}

// Kullanım (new gerekli):
const mutfak1 = new MutfakNormal()  // Önce oluştur
const yemek1 = mutfak1.yemekYap("Makarna")  // Sonra kullan
console.log(yemek1)  // "Makarna yapıldı"

// ============================================
// 2. STATIC METHOD (Instance Gereksiz)
// ============================================

class MutfakStatic {
    // Static method (static kelimesi var)
    static yemekYap(yemekAdi) {
        return `${yemekAdi} yapıldı`
    }
}

// Kullanım (new gereksiz):
const yemek2 = MutfakStatic.yemekYap("Pizza")  // Direkt çağır!
console.log(yemek2)  // "Pizza yapıldı"

// ============================================
// 3. BOLGE MODEL ÖRNEĞİ (Static Method)
// ============================================

class BolgeOrnek {
    // Static method - Tüm bölgeleri getir
    static async findAll() {
        // Veritabanından tüm bölgeleri çek
        // (Gerçek kod için pool.query kullanılır)
        return [
            { bolge_id: 1, bolge_ad: "Marmara" },
            { bolge_id: 2, bolge_ad: "İç Anadolu" }
        ]
    }
    
    // Static method - ID'ye göre bölge getir
    static async findById(id) {
        // Veritabanından ID'ye göre bölge çek
        return { bolge_id: id, bolge_ad: "Marmara" }
    }
}

// Kullanım (new gereksiz):
const bolgeler = await BolgeOrnek.findAll()  // Direkt çağır!
console.log(bolgeler)  // Tüm bölgeler

const bolge = await BolgeOrnek.findById(1)  // Direkt çağır!
console.log(bolge)  // ID=1 olan bölge

// ============================================
// 4. PREPARED STATEMENT ÖRNEĞİ
// ============================================

// ❌ YANLIŞ (Güvensiz):
const id = "1; DROP TABLE bolge; --"
const queryYanlis = `SELECT * FROM bolge WHERE bolge_id = ${id}`
// Sonuç: Veritabanı silinir! 😱

// ✅ DOĞRU (Güvenli - Prepared Statement):
const idGuvenli = "1; DROP TABLE bolge; --"
// ? = placeholder (yer tutucu)
// [idGuvenli] = Değeri ayrı gönder
// await pool.query('SELECT * FROM bolge WHERE bolge_id = ?', [idGuvenli])
// Sonuç: Sadece ID=1 getirilir, zararlı kod çalışmaz ✅

// ============================================
// 5. NEDEN TEST DOSYASI?
// ============================================

// Bolge.js içinde sadece class tanımı var:
// class Bolge { ... }
// 
// Bu dosyayı çalıştırırsak: node models/Bolge.js
// Ne olur? → Hiçbir şey! Class tanımlanır ama çalışmaz.

// Test dosyası (test-bolge-model.js):
// import Bolge from './models/Bolge.js'  // Class'ı al
// const bolgeler = await Bolge.findAll()  // Çalıştır!
// console.log(bolgeler)  // Sonucu göster

