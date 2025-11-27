/**
 * Bolge Model
 * 
 * Bu model, bölge verileriyle ilgili tüm veritabanı işlemlerini yönetir.
 * 
 * MODEL NEDİR?
 * - Veritabanı işlemlerinden sorumlu katmandır
 * - Sadece veri çekme, ekleme, güncelleme, silme yapar
 * - İş mantığı (business logic) YOK - sadece veri işlemleri
 * 
 * NEDEN STATIC METODLAR?
 * - new Bolge() ile instance oluşturmaya gerek yok
 * - Direkt Bolge.findAll() şeklinde kullanılır
 * - Daha pratik ve performanslı
 */

import pool from '../db/db.js'

class Bolge {
    /**
     * Tüm bölgeleri getirir
     * 
     * GET /bolge → Tüm bölgeleri listele
     * 
     * @returns {Promise<Array>} Bölge listesi
     * 
     * ÖĞRENİLEN KAVRAMLAR:
     * - pool.query() → SQL sorgusu çalıştırır
     * - [rows] → Destructuring (ilk elemanı al)
     * - async/await → Asenkron işlemler
     */
    static async findAll() {
        try {
            // SELECT sorgusu - Tüm bölgeleri çek
            const [rows] = await pool.query('SELECT * FROM bolge ORDER BY bolge_id ASC')
            return rows
        } catch (error) {
            console.error('Bolge.findAll() hatası:', error)
            throw error
        }
    }

    /**
     * ID'ye göre tek bir bölge getirir
     * 
     * GET /bolge/:id → Belirli bir bölgeyi göster
     * 
     * @param {number} bolge_id - Bölge ID'si
     * @returns {Promise<Object|null>} Bölge objesi veya null
     * 
     * ÖĞRENİLEN KAVRAMLAR:
     * - Prepared Statement → ? işareti placeholder
     * - SQL Injection koruması → pool.query() otomatik korur
     * - [id] → Parametre olarak gönderilen değer
     */
    static async findById(bolge_id) {
        try {
            // ? işareti = placeholder (yer tutucu)
            // [bolge_id] = Bu değer ? yerine konulacak
            // Güvenlik: SQL injection saldırılarına karşı koruma
            const [rows] = await pool.query('SELECT * FROM bolge WHERE bolge_id = ?', [bolge_id])
            
            // Eğer kayıt bulunamazsa null döndür
            if (rows.length === 0) {
                return null
            }
            
            // İlk kaydı döndür (tek bir kayıt bekliyoruz)
            return rows[0]
        } catch (error) {
            console.error('Bolge.findById() hatası:', error)
            throw error
        }
    }

    /**
     * Yeni bölge oluşturur
     * 
     * POST /bolge → Yeni bölge ekle
     * 
     * @param {Object} bolgeData - Bölge verileri {bolge_id, bolge_ad}
     * @returns {Promise<Object>} Oluşturulan bölge objesi
     * 
     * ÖĞRENİLEN KAVRAMLAR:
     * - INSERT sorgusu → Yeni kayıt ekleme
     * - Destructuring → {bolge_id, bolge_ad} = bolgeData
     */
    static async create(bolgeData) {
        try {
            const { bolge_id, bolge_ad } = bolgeData
            
            // INSERT sorgusu - Yeni bölge ekle
            await pool.query(
                'INSERT INTO bolge (bolge_id, bolge_ad) VALUES (?, ?)',
                [bolge_id, bolge_ad]
            )
            
            // Oluşturulan bölgeyi getir
            const newBolge = await this.findById(bolge_id)
            return newBolge
        } catch (error) {
            console.error('Bolge.create() hatası:', error)
            throw error
        }
    }

    /**
     * Bölge bilgilerini günceller
     * 
     * PUT /bolge/:id → Bölge güncelle
     * 
     * @param {number} bolge_id - Bölge ID'si
     * @param {Object} bolgeData - Güncellenecek bölge verileri
     * @returns {Promise<Object|null>} Güncellenmiş bölge objesi veya null
     * 
     * ÖĞRENİLEN KAVRAMLAR:
     * - UPDATE sorgusu → Mevcut kaydı güncelleme
     */
    static async update(bolge_id, bolgeData) {
        try {
            const { bolge_ad } = bolgeData
            
            // UPDATE sorgusu
            const [result] = await pool.query(
                'UPDATE bolge SET bolge_ad = ? WHERE bolge_id = ?',
                [bolge_ad, bolge_id]
            )
            
            // Eğer kayıt bulunamadıysa null döndür
            if (result.affectedRows === 0) {
                return null
            }
            
            // Güncellenmiş bölgeyi getir
            return await this.findById(bolge_id)
        } catch (error) {
            console.error('Bolge.update() hatası:', error)
            throw error
        }
    }

    /**
     * Bölgeyi siler
     * 
     * DELETE /bolge/:id → Bölge sil
     * 
     * @param {number} bolge_id - Bölge ID'si
     * @returns {Promise<boolean>} Silme işleminin başarılı olup olmadığı
     * 
     * ÖĞRENİLEN KAVRAMLAR:
     * - DELETE sorgusu → Kayıt silme
     * - affectedRows → Kaç satır etkilendi
     */
    static async delete(bolge_id) {
        try {
            const [result] = await pool.query('DELETE FROM bolge WHERE bolge_id = ?', [bolge_id])
            
            // affectedRows > 0 ise kayıt silindi
            return result.affectedRows > 0
        } catch (error) {
            console.error('Bolge.delete() hatası:', error)
            throw error
        }
    }
}

export default Bolge

