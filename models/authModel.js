import pool from '../db/db.js'

/**
 * AUTH MODEL - Kimlik Doğrulama İşlemleri
 * 
 * Bu dosya, login (giriş) işlemleri ile ilgili veritabanı sorgularını içerir.
 * 
 * BURAYA DİKKAT: Auth Model'in görevi
 * - Kullanıcı bilgilerini veritabanından kontrol etmek
 * - Öğrenci numarası ile öğrenciyi bulmak
 * - Şifre kontrolü yapmak (şimdilik basit, sonra geliştirilecek)
 */

/**
 * Öğrenci numarası ile öğrenciyi bul ve doğrula
 * 
 * NE ZAMAN ÇALIŞIR?
 * → Login işlemi sırasında
 * → Controller'dan çağrılır
 * 
 * NE YAPIYOR?
 * → Veritabanında öğrenci numarasına göre öğrenci arar
 * → Bulursa öğrenci bilgilerini döndürür
 * → Bulamazsa hata fırlatır
 * 
 * BURAYA DİKKAT: SQL SELECT sorgusu
 * - SELECT * FROM ogrenci_bilgi WHERE Ogr_No = ?
 * - ? işareti → Placeholder (parametreli sorgu)
 * - SQL injection koruması için parametreli sorgu kullanıyoruz
 * 
 * BURAYA DİKKAT: async/await kullanımı
 * - async: Bu fonksiyon asenkron bir fonksiyondur
 * - await: pool.query() işlemi bitene kadar bekler
 * 
 * @param {number} ogrNo - Öğrenci numarası
 * @returns {Promise<Object>} Öğrenci bilgisi
 */
export const findOgrenciByNo = async (ogrNo) => {
    try {
        console.log('')
        console.log('═══════════════════════════════════════════════════════')
        console.log('🔍 VERİTABANI SORGUSU: Öğrenci Aranıyor')
        console.log('═══════════════════════════════════════════════════════')
        console.log('📍 Şu an çalışan: models/authModel.js, findOgrenciByNo() fonksiyonu')
        console.log('🎯 Aranan öğrenci numarası:', ogrNo)
        
        // BURAYA DİKKAT: SQL sorgusu
        // SELECT * FROM ogrenci_bilgi WHERE Ogr_No = ?
        // ? işareti → Placeholder (değer sonra verilecek)
        const sql = 'SELECT * FROM ogrenci_bilgi WHERE Ogr_No = ?'
        
        console.log('📝 SQL sorgusu hazırlandı:', sql)
        console.log('   → Parametre:', ogrNo)
        console.log('⏳ Veritabanı sorgusu çalıştırılıyor...')
        
        // BURAYA DİKKAT: Parametreli sorgu çalıştırma
        // pool.query(sql, [ogrNo]) → SQL sorgusunu parametrelerle çalıştırır
        const [rows] = await pool.query(sql, [ogrNo])
        
        console.log('📥 Veritabanından cevap geldi!')
        console.log('   → Bulunan kayıt sayısı:', rows.length)
        
        // BURAYA DİKKAT: Kayıt kontrolü
        // Eğer kayıt yoksa hata fırlatıyoruz
        if (rows.length === 0) {
            console.log('❌ Öğrenci bulunamadı!')
            console.log('═══════════════════════════════════════════════════════')
            console.log('')
            throw new Error('Öğrenci numarası bulunamadı!')
        }
        
        // İlk (ve tek) kaydı döndür
        const ogrenci = rows[0]
        console.log('✅ Öğrenci bulundu!')
        console.log('   → Öğrenci Adı:', ogrenci.Ogr_Ad, ogrenci.Ogr_Soyad)
        console.log('   → Bölüm Kodu:', ogrenci.Bolum_Kod)
        console.log('═══════════════════════════════════════════════════════')
        console.log('')
        
        return ogrenci
    } catch (error) {
        console.error('❌ Veritabanı hatası:', error.message)
        throw error
    }
}

/**
 * Şifre kontrolü (şimdilik basit, sonra geliştirilecek)
 * 
 * BURAYA DİKKAT: Şifre kontrolü
 * - Şimdilik basit bir kontrol yapıyoruz
 * - İleride şifre hash'leme (bcrypt) eklenebilir
 * - Şimdilik sadece öğrenci numarası yeterli
 * 
 * @param {Object} ogrenci - Öğrenci bilgisi
 * @param {string} password - Girilen şifre
 * @returns {boolean} Şifre doğru mu?
 */
export const verifyPassword = (ogrenci, password) => {
    // BURAYA DİKKAT: Şimdilik basit kontrol
    // İleride şifre hash'leme eklenebilir
    // Şimdilik herhangi bir şifre kabul ediliyor (geliştirme aşaması)
    console.log('🔐 Şifre kontrolü yapılıyor...')
    console.log('   → Şimdilik basit kontrol (geliştirme aşaması)')
    console.log('   → İleride şifre hash\'leme eklenecek')
    
    // Şimdilik herhangi bir şifre kabul ediliyor
    // Gerçek uygulamada şifre hash'lenmiş olarak saklanır ve kontrol edilir
    return true
}

