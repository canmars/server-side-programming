import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

/**
 * Veritabanı bağlantı yapılandırması
 * Environment variables (.env dosyası) kullanılarak güvenli bir şekilde yapılandırılır
 * 
 * BURAYA DİKKAT: .env dosyası kontrolü
 * Eğer .env dosyası yoksa veya değerler eksikse, hata mesajı gösterilir
 */
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,  // Aynı anda maksimum 10 bağlantı
    queueLimit: 0         // Sınırsız kuyruk
}

// BURAYA DİKKAT: .env dosyası kontrolü
// Eğer .env değerleri eksikse, kullanıcıya bilgi ver
if (!dbConfig.host || !dbConfig.user || !dbConfig.database) {
    console.error('')
    console.error('═══════════════════════════════════════════════════════')
    console.error('❌ VERİTABANI YAPILANDIRMA HATASI!')
    console.error('═══════════════════════════════════════════════════════')
    console.error('⚠️ .env dosyası bulunamadı veya eksik değerler var!')
    console.error('')
    console.error('📝 ÇÖZÜM:')
    console.error('   1. Proje kök dizininde .env dosyası oluşturun')
    console.error('   2. Şu değerleri ekleyin:')
    console.error('')
    console.error('   DB_HOST=localhost')
    console.error('   DB_USER=root')
    console.error('   DB_PASSWORD=sizin_sifreniz')
    console.error('   DB_NAME=universite_bilgi_sistemi')
    console.error('   PORT=3000')
    console.error('   NODE_ENV=development')
    console.error('')
    console.error('═══════════════════════════════════════════════════════')
    console.error('')
}

/**
 * Connection Pool oluşturuluyor
 * 
 * Neden Connection Pool kullanıyoruz?
 * - Her istekte yeni bağlantı açmak yerine, mevcut bağlantıları yeniden kullanır
 * - Performans artışı sağlar
 * - Kaynak kullanımını optimize eder
 * - Aynı anda birden fazla sorgu çalıştırabilir
 */
const pool = mysql.createPool(dbConfig)

/**
 * Pool'u export ediyoruz
 * Tüm model dosyaları bu pool'u import ederek kullanacak
 */
export default pool



