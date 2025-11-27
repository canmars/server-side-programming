/**
 * User Model
 * 
 * Bu model, kullanıcı verileriyle ilgili tüm veritabanı işlemlerini yönetir.
 * 
 * Model'in Sorumluluğu:
 * - Sadece veri işlemleri (CRUD)
 * - İş mantığı (business logic) Controller'da olmalıdır
 * - Veritabanı sorgularını güvenli hale getirme (prepared statements)
 */

import pool from '../db/db.js'

class User {
    /**
     * Tüm kullanıcıları getirir
     * 
     * @returns {Promise<Array>} Kullanıcı listesi
     * 
     * Neden findAll()?
     * - RESTful API'lerde index/list işlemleri için standart isim
     * - Tüm kayıtları getirmek için kullanılır
     */
    static async findAll() {
        try {
            // Prepared statement kullanıyoruz (güvenlik için)
            // SQL injection saldırılarına karşı koruma sağlar
            const [rows] = await pool.query('SELECT * FROM users ORDER BY id DESC')
            return rows
        } catch (error) {
            console.error('User.findAll() hatası:', error)
            throw error
        }
    }

    /**
     * ID'ye göre tek bir kullanıcı getirir
     * 
     * @param {number} id - Kullanıcı ID'si
     * @returns {Promise<Object|null>} Kullanıcı objesi veya null
     * 
     * Neden findById()?
     * - RESTful API'lerde show/detail işlemleri için standart isim
     * - Belirli bir kaydı getirmek için kullanılır
     */
    static async findById(id) {
        try {
            // ? işareti placeholder - prepared statement
            // pool.query() otomatik olarak SQL injection koruması sağlar
            const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
            
            // Eğer kayıt bulunamazsa null döndür
            if (rows.length === 0) {
                return null
            }
            
            return rows[0] // İlk kaydı döndür
        } catch (error) {
            console.error('User.findById() hatası:', error)
            throw error
        }
    }

    /**
     * Yeni kullanıcı oluşturur
     * 
     * @param {Object} userData - Kullanıcı verileri {name, email, password, ...}
     * @returns {Promise<Object>} Oluşturulan kullanıcı objesi
     * 
     * Neden create()?
     * - RESTful API'lerde create/store işlemleri için standart isim
     * - Yeni kayıt eklemek için kullanılır
     */
    static async create(userData) {
        try {
            const { name, email, password } = userData
            
            // INSERT sorgusu - prepared statement kullanıyoruz
            // ? işaretleri, değerlerin güvenli bir şekilde yerleştirilmesini sağlar
            const [result] = await pool.query(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [name, email, password]
            )
            
            // Oluşturulan kullanıcıyı getir
            // insertId, yeni eklenen kaydın ID'sini verir
            const newUser = await this.findById(result.insertId)
            return newUser
        } catch (error) {
            console.error('User.create() hatası:', error)
            throw error
        }
    }

    /**
     * Kullanıcı bilgilerini günceller
     * 
     * @param {number} id - Kullanıcı ID'si
     * @param {Object} userData - Güncellenecek kullanıcı verileri
     * @returns {Promise<Object|null>} Güncellenmiş kullanıcı objesi veya null
     * 
     * Neden update()?
     * - RESTful API'lerde update işlemleri için standart isim
     * - Mevcut kaydı güncellemek için kullanılır
     */
    static async update(id, userData) {
        try {
            const { name, email, password } = userData
            
            // UPDATE sorgusu
            // Sadece gönderilen alanları güncelle (esnek yapı)
            const updateFields = []
            const updateValues = []
            
            if (name !== undefined) {
                updateFields.push('name = ?')
                updateValues.push(name)
            }
            if (email !== undefined) {
                updateFields.push('email = ?')
                updateValues.push(email)
            }
            if (password !== undefined) {
                updateFields.push('password = ?')
                updateValues.push(password)
            }
            
            // Eğer güncellenecek alan yoksa, mevcut kaydı döndür
            if (updateFields.length === 0) {
                return await this.findById(id)
            }
            
            updateValues.push(id) // WHERE id = ? için
            
            const [result] = await pool.query(
                `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`,
                updateValues
            )
            
            // Eğer kayıt bulunamadıysa null döndür
            if (result.affectedRows === 0) {
                return null
            }
            
            // Güncellenmiş kullanıcıyı getir
            return await this.findById(id)
        } catch (error) {
            console.error('User.update() hatası:', error)
            throw error
        }
    }

    /**
     * Kullanıcıyı siler
     * 
     * @param {number} id - Kullanıcı ID'si
     * @returns {Promise<boolean>} Silme işleminin başarılı olup olmadığı
     * 
     * Neden delete()?
     * - RESTful API'lerde delete/destroy işlemleri için standart isim
     * - Kayıt silmek için kullanılır
     */
    static async delete(id) {
        try {
            const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id])
            
            // affectedRows, kaç satırın etkilendiğini gösterir
            // 0 ise kayıt bulunamadı, 1 ise başarıyla silindi
            return result.affectedRows > 0
        } catch (error) {
            console.error('User.delete() hatası:', error)
            throw error
        }
    }

    /**
     * Email'e göre kullanıcı bulur (login için kullanılabilir)
     * 
     * @param {string} email - Kullanıcı email'i
     * @returns {Promise<Object|null>} Kullanıcı objesi veya null
     * 
     * Neden findByEmail()?
     * - Özel sorgular için ek metodlar ekleyebiliriz
     * - Login işlemleri için email ile arama yaygındır
     */
    static async findByEmail(email) {
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
            
            if (rows.length === 0) {
                return null
            }
            
            return rows[0]
        } catch (error) {
            console.error('User.findByEmail() hatası:', error)
            throw error
        }
    }

    /**
     * Kullanıcının ürünlerini getirir (İlişkisel sorgu)
     * 
     * @param {number} userId - Kullanıcı ID'si
     * @returns {Promise<Array>} Ürün listesi
     * 
     * Neden bu metod?
     * - User-Product ilişkisini gösterir
     * - JOIN sorgusu örneği
     * - Bir kullanıcının tüm ürünlerini getirir
     */
    static async getProducts(userId) {
        try {
            // JOIN sorgusu ile kullanıcı ve ürün bilgilerini birlikte çekiyoruz
            const [rows] = await pool.query(
                `SELECT p.*, u.name as user_name, u.email as user_email 
                 FROM products p 
                 LEFT JOIN users u ON p.user_id = u.id 
                 WHERE p.user_id = ? 
                 ORDER BY p.id DESC`,
                [userId]
            )
            return rows
        } catch (error) {
            console.error('User.getProducts() hatası:', error)
            throw error
        }
    }
}

export default User

