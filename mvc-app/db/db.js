import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

/**
 * Veritabanı bağlantı yapılandırması
 * Environment variables (.env dosyası) kullanılarak güvenli bir şekilde yapılandırılır
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



