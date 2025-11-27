/**
 * Product Model
 * 
 * Bu model, ürün verileriyle ilgili tüm veritabanı işlemlerini yönetir.
 * 
 * User Model ile aynı pattern'i takip eder.
 * Bu sayede kod tekrarını önler ve tutarlılık sağlar.
 */

import pool from '../db/db.js'

class Product {
    /**
     * Tüm ürünleri getirir
     * 
     * @returns {Promise<Array>} Ürün listesi
     */
    static async findAll() {
        try {
            const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC')
            return rows
        } catch (error) {
            console.error('Product.findAll() hatası:', error)
            throw error
        }
    }

    /**
     * ID'ye göre tek bir ürün getirir
     * 
     * @param {number} id - Ürün ID'si
     * @returns {Promise<Object|null>} Ürün objesi veya null
     */
    static async findById(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id])
            
            if (rows.length === 0) {
                return null
            }
            
            return rows[0]
        } catch (error) {
            console.error('Product.findById() hatası:', error)
            throw error
        }
    }

    /**
     * Yeni ürün oluşturur
     * 
     * @param {Object} productData - Ürün verileri {name, description, price, stock, user_id}
     * @returns {Promise<Object>} Oluşturulan ürün objesi
     */
    static async create(productData) {
        try {
            const { name, description, price, stock, user_id } = productData
            
            const [result] = await pool.query(
                'INSERT INTO products (name, description, price, stock, user_id) VALUES (?, ?, ?, ?, ?)',
                [name, description, price, stock, user_id]
            )
            
            const newProduct = await this.findById(result.insertId)
            return newProduct
        } catch (error) {
            console.error('Product.create() hatası:', error)
            throw error
        }
    }

    /**
     * Ürün bilgilerini günceller
     * 
     * @param {number} id - Ürün ID'si
     * @param {Object} productData - Güncellenecek ürün verileri
     * @returns {Promise<Object|null>} Güncellenmiş ürün objesi veya null
     */
    static async update(id, productData) {
        try {
            const { name, description, price, stock } = productData
            
            const updateFields = []
            const updateValues = []
            
            if (name !== undefined) {
                updateFields.push('name = ?')
                updateValues.push(name)
            }
            if (description !== undefined) {
                updateFields.push('description = ?')
                updateValues.push(description)
            }
            if (price !== undefined) {
                updateFields.push('price = ?')
                updateValues.push(price)
            }
            if (stock !== undefined) {
                updateFields.push('stock = ?')
                updateValues.push(stock)
            }
            
            if (updateFields.length === 0) {
                return await this.findById(id)
            }
            
            updateValues.push(id)
            
            const [result] = await pool.query(
                `UPDATE products SET ${updateFields.join(', ')} WHERE id = ?`,
                updateValues
            )
            
            if (result.affectedRows === 0) {
                return null
            }
            
            return await this.findById(id)
        } catch (error) {
            console.error('Product.update() hatası:', error)
            throw error
        }
    }

    /**
     * Ürünü siler
     * 
     * @param {number} id - Ürün ID'si
     * @returns {Promise<boolean>} Silme işleminin başarılı olup olmadığı
     */
    static async delete(id) {
        try {
            const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id])
            return result.affectedRows > 0
        } catch (error) {
            console.error('Product.delete() hatası:', error)
            throw error
        }
    }

    /**
     * Kullanıcıya ait ürünleri getirir (İlişkisel sorgu)
     * 
     * @param {number} userId - Kullanıcı ID'si
     * @returns {Promise<Array>} Ürün listesi
     * 
     * Neden bu metod?
     * - User-Product ilişkisini gösterir
     * - JOIN sorgusu örneği
     */
    static async findByUserId(userId) {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM products WHERE user_id = ? ORDER BY id DESC',
                [userId]
            )
            return rows
        } catch (error) {
            console.error('Product.findByUserId() hatası:', error)
            throw error
        }
    }

    /**
     * Ürünleri arama (isim veya açıklamada)
     * 
     * @param {string} searchTerm - Arama terimi
     * @returns {Promise<Array>} Ürün listesi
     */
    static async search(searchTerm) {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM products WHERE name LIKE ? OR description LIKE ? ORDER BY id DESC',
                [`%${searchTerm}%`, `%${searchTerm}%`]
            )
            return rows
        } catch (error) {
            console.error('Product.search() hatası:', error)
            throw error
        }
    }

    /**
     * Ürünü kullanıcı bilgisiyle birlikte getirir (JOIN sorgusu)
     * 
     * @param {number} id - Ürün ID'si
     * @returns {Promise<Object|null>} Ürün objesi (user bilgisi ile) veya null
     * 
     * Neden bu metod?
     * - İlişkisel veri çekme örneği
     * - JOIN sorgusu ile kullanıcı bilgilerini de getirir
     */
    static async findByIdWithUser(id) {
        try {
            const [rows] = await pool.query(
                `SELECT p.*, u.name as user_name, u.email as user_email 
                 FROM products p 
                 LEFT JOIN users u ON p.user_id = u.id 
                 WHERE p.id = ?`,
                [id]
            )
            
            if (rows.length === 0) {
                return null
            }
            
            return rows[0]
        } catch (error) {
            console.error('Product.findByIdWithUser() hatası:', error)
            throw error
        }
    }
}

export default Product

