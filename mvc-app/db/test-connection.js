/**
 * Veritabanı bağlantı testi
 * 
 * Bu dosya, veritabanı bağlantısının çalışıp çalışmadığını test etmek için kullanılır.
 * 
 * Kullanım: node db/test-connection.js
 */

import pool from './db.js'

async function testConnection() {
    try {
        // Basit bir sorgu çalıştırarak bağlantıyı test ediyoruz
        const [rows] = await pool.query('SELECT * from bolge')
        console.log('✅ Veritabanı bağlantısı başarılı!')
        console.log('Test sonucu:', rows)
        
        // Bağlantıyı kapatıyoruz
        await pool.end()
        console.log('✅ Bağlantı kapatıldı.')
        process.exit(0)
    } catch (error) {
        console.error('❌ Veritabanı bağlantı hatası:')
        console.error(error.message)
        process.exit(1)
    }
}

testConnection()

