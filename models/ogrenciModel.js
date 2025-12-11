import pool from '../db/db.js'

/**
 * ÖĞRENCİ MODEL - Veritabanı İşlemleri
 * 
 * Bu dosya, ogrenci_bilgi tablosu ile ilgili tüm veritabanı işlemlerini içerir.
 * Model katmanı, veritabanı sorgularını yapar ve sonuçları döner.
 */

/**
 * Tüm öğrencileri veritabanından getirir
 * 
 * BURAYA DİKKAT: async/await kullanımı
 * - async: Bu fonksiyon asenkron bir fonksiyondur (Promise döner)
 * - await: pool.query() işlemi bitene kadar bekler
 * - Neden await? Veritabanı sorgusu zaman alır, await olmadan sonuç gelmeden devam eder
 * 
 * @returns {Promise<Array>} Öğrenci listesi
 */
export const getAllOgrenciler = async () => {
    try {
        // BURAYA DİKKAT: SQL sorgusu
        // SELECT * FROM ogrenci_bilgi → Tüm öğrencileri getir
        const [rows] = await pool.query('SELECT * FROM ogrenci_bilgi')
        
        // BURAYA DİKKAT: Destructuring kullanımı
        // pool.query() [sonuçlar, metadata] döner
        // [rows] ile sadece sonuçları alıyoruz
        
        return rows
    } catch (error) {
        // BURAYA DİKKAT: Hata yönetimi
        // Veritabanı hatası olursa, hatayı yukarı fırlatıyoruz
        // Controller katmanında yakalanacak
        throw error
    }
}

/**
 * Yeni öğrenci ekle
 * 
 * BURAYA DİKKAT: SQL INSERT sorgusu
 * - INSERT INTO → Yeni kayıt ekler
 * - VALUES → Eklenecek değerler
 * 
 * BURAYA DİKKAT: Parametreli sorgu (SQL Injection koruması)
 * - ? işareti → Placeholder (yer tutucu)
 * - pool.query() ikinci parametre olarak değerleri alır
 * - Neden önemli? Kullanıcı girdisi doğrudan SQL'e yazılırsa güvenlik açığı oluşur
 * - Parametreli sorgu ile SQL injection saldırıları önlenir
 * 
 * @param {Object} ogrenciData - Öğrenci bilgileri
 * @param {number} ogrenciData.Ogr_No - Öğrenci numarası
 * @param {string} ogrenciData.Ogr_Ad - Öğrenci adı
 * @param {string} ogrenciData.Ogr_Soyad - Öğrenci soyadı
 * @param {string} ogrenciData.Ogr_Giris_Tarih - Giriş tarihi (YYYY-MM-DD)
 * @param {number} ogrenciData.Bolum_Kod - Bölüm kodu
 * @param {number} ogrenciData.Fakulte_Kod - Fakülte kodu
 * @param {number} ogrenciData.Ogr_Tel - Telefon
 * @param {string} ogrenciData.Ogr_Adres - Adres
 * @param {number} ogrenciData.Ogr_Dosya_No - Dosya numarası
 * @param {number} ogrenciData.Tur_Kod - Öğrenim türü kodu
 * @param {number} ogrenciData.Durum_Kod - Durum kodu
 * @returns {Promise<Object>} Eklenen öğrenci bilgisi
 */
export const createOgrenci = async (ogrenciData) => {
    try {
        // BURAYA DİKKAT: SQL INSERT sorgusu
        // INSERT INTO tablo_adı (kolon1, kolon2, ...) VALUES (?, ?, ...)
        // ? işaretleri → Placeholder (değerler sonra verilecek)
        const sql = `
            INSERT INTO ogrenci_bilgi 
            (Ogr_No, Ogr_Ad, Ogr_Soyad, Ogr_Giris_Tarih, Bolum_Kod, Fakulte_Kod, Ogr_Tel, Ogr_Adres, Ogr_Dosya_No, Tur_Kod, Durum_Kod)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `
        
        // BURAYA DİKKAT: Parametreli sorgu çalıştırma
        // pool.query(sql, [değer1, değer2, ...]) → SQL sorgusunu parametrelerle çalıştırır
        // Değerler sırayla ? işaretlerinin yerine konur
        const [result] = await pool.query(sql, [
            ogrenciData.Ogr_No,
            ogrenciData.Ogr_Ad,
            ogrenciData.Ogr_Soyad,
            ogrenciData.Ogr_Giris_Tarih,
            ogrenciData.Bolum_Kod,
            ogrenciData.Fakulte_Kod,
            ogrenciData.Ogr_Tel,
            ogrenciData.Ogr_Adres,
            ogrenciData.Ogr_Dosya_No,
            ogrenciData.Tur_Kod,
            ogrenciData.Durum_Kod
        ])
        
        // BURAYA DİKKAT: INSERT sonucu
        // result.insertId → Eklenen kaydın ID'si (AUTO_INCREMENT için)
        // Bizim durumumuzda Ogr_No primary key olduğu için insertId kullanmıyoruz
        
        // Eklenen öğrenciyi geri döndür
        // Yeni eklenen kaydı getirmek için SELECT sorgusu yapabiliriz
        const [newOgrenci] = await pool.query('SELECT * FROM ogrenci_bilgi WHERE Ogr_No = ?', [ogrenciData.Ogr_No])
        
        return newOgrenci[0]
    } catch (error) {
        throw error
    }
}

/**
 * Öğrenci bilgilerini güncelle
 * 
 * BURAYA DİKKAT: SQL UPDATE sorgusu
 * - UPDATE → Mevcut kaydı günceller
 * - SET → Güncellenecek kolonlar ve değerler
 * - WHERE → Hangi kaydın güncelleneceği (koşul)
 * 
 * BURAYA DİKKAT: WHERE koşulu
 * - WHERE Ogr_No = ? → Sadece belirtilen öğrenci numarasına sahip kayıt güncellenir
 * - WHERE olmadan UPDATE yapılırsa TÜM kayıtlar güncellenir (tehlikeli!)
 * 
 * @param {number} ogrNo - Güncellenecek öğrenci numarası
 * @param {Object} ogrenciData - Güncellenecek öğrenci bilgileri
 * @returns {Promise<Object>} Güncellenen öğrenci bilgisi
 */
export const updateOgrenci = async (ogrNo, ogrenciData) => {
    try {
        // BURAYA DİKKAT: SQL UPDATE sorgusu
        // UPDATE tablo_adı SET kolon1=?, kolon2=? WHERE koşul=?
        // ? işaretleri → Placeholder (değerler sonra verilecek)
        const sql = `
            UPDATE ogrenci_bilgi 
            SET Ogr_Ad = ?, 
                Ogr_Soyad = ?, 
                Ogr_Giris_Tarih = ?, 
                Bolum_Kod = ?, 
                Fakulte_Kod = ?, 
                Ogr_Tel = ?, 
                Ogr_Adres = ?, 
                Ogr_Dosya_No = ?, 
                Tur_Kod = ?, 
                Durum_Kod = ?
            WHERE Ogr_No = ?
        `
        
        // BURAYA DİKKAT: Parametreli sorgu çalıştırma
        // WHERE koşulundaki ? en sonda (ogrNo)
        const [result] = await pool.query(sql, [
            ogrenciData.Ogr_Ad,
            ogrenciData.Ogr_Soyad,
            ogrenciData.Ogr_Giris_Tarih,
            ogrenciData.Bolum_Kod,
            ogrenciData.Fakulte_Kod,
            ogrenciData.Ogr_Tel,
            ogrenciData.Ogr_Adres,
            ogrenciData.Ogr_Dosya_No,
            ogrenciData.Tur_Kod,
            ogrenciData.Durum_Kod,
            ogrNo // WHERE koşulu için
        ])
        
        // BURAYA DİKKAT: UPDATE sonucu
        // result.affectedRows → Kaç satır etkilendi (0 ise kayıt bulunamadı)
        if (result.affectedRows === 0) {
            throw new Error('Öğrenci bulunamadı!')
        }
        
        // Güncellenen öğrenciyi geri döndür
        const [updatedOgrenci] = await pool.query('SELECT * FROM ogrenci_bilgi WHERE Ogr_No = ?', [ogrNo])
        
        return updatedOgrenci[0]
    } catch (error) {
        throw error
    }
}

/**
 * Öğrenci sil
 * 
 * BURAYA DİKKAT: SQL DELETE sorgusu
 * - DELETE FROM → Kayıt siler
 * - WHERE → Hangi kaydın silineceği (koşul)
 * 
 * BURAYA DİKKAT: WHERE koşulu zorunlu!
 * - WHERE olmadan DELETE yapılırsa TÜM kayıtlar silinir (çok tehlikeli!)
 * - Her zaman WHERE koşulu kullanılmalı
 * 
 * @param {number} ogrNo - Silinecek öğrenci numarası
 * @returns {Promise<boolean>} Silme işlemi başarılı mı?
 */
export const deleteOgrenci = async (ogrNo) => {
    try {
        // BURAYA DİKKAT: SQL DELETE sorgusu
        // DELETE FROM tablo_adı WHERE koşul=?
        // ? işareti → Placeholder (değer sonra verilecek)
        const sql = 'DELETE FROM ogrenci_bilgi WHERE Ogr_No = ?'
        
        // BURAYA DİKKAT: Parametreli sorgu çalıştırma
        const [result] = await pool.query(sql, [ogrNo])
        
        // BURAYA DİKKAT: DELETE sonucu
        // result.affectedRows → Kaç satır silindi (0 ise kayıt bulunamadı)
        if (result.affectedRows === 0) {
            throw new Error('Öğrenci bulunamadı!')
        }
        
        return true
    } catch (error) {
        throw error
    }
}

/**
 * ID'ye göre tek öğrenci getir
 * 
 * BURAYA DİKKAT: WHERE koşulu ile tek kayıt getirme
 * - WHERE Ogr_No = ? → Sadece belirtilen öğrenci numarasına sahip kayıt getirilir
 * - Tek kayıt döndüğü için [0] ile ilk elemanı alıyoruz
 * 
 * @param {number} ogrNo - Öğrenci numarası
 * @returns {Promise<Object>} Öğrenci bilgisi
 */
export const getOgrenciById = async (ogrNo) => {
    try {
        // BURAYA DİKKAT: SQL sorgusu ile tek kayıt getirme
        // SELECT * FROM ogrenci_bilgi WHERE Ogr_No = ?
        const [rows] = await pool.query('SELECT * FROM ogrenci_bilgi WHERE Ogr_No = ?', [ogrNo])
        
        // BURAYA DİKKAT: Tek kayıt kontrolü
        // Eğer kayıt yoksa hata fırlatıyoruz
        if (rows.length === 0) {
            throw new Error('Öğrenci bulunamadı!')
        }
        
        // İlk (ve tek) kaydı döndür
        return rows[0]
    } catch (error) {
        throw error
    }
}

