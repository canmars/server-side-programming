/**
 * Error Handler Middleware
 * 
 * Bu middleware, uygulamada oluşan hataları merkezi olarak yönetir.
 * 
 * Neden Error Handler Middleware?
 * - Merkezi hata yönetimi
 * - Tutarlı hata mesajları
 * - Development vs Production farkı
 * - Hata loglama
 * 
 * Önemli: Error handler middleware'i EN SONDA tanımlanmalıdır!
 */

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * 404 Not Found Handler
 * Tanımlanmamış route'lar için
 * 
 * @param {Object} req - Express request objesi
 * @param {Object} res - Express response objesi
 * @param {Function} next - Sonraki middleware'e geçmek için
 */
export const notFoundHandler = (req, res, next) => {
    // 404 hatası oluştur
    const error = new Error(`Not Found - ${req.originalUrl}`)
    error.status = 404
    
    // Bir sonraki error handler'a gönder
    next(error)
}

/**
 * Global Error Handler
 * Tüm hataları yakalar ve işler
 * 
 * @param {Error} err - Hata objesi
 * @param {Object} req - Express request objesi
 * @param {Object} res - Express response objesi
 * @param {Function} next - Sonraki middleware'e geçmek için
 * 
 * Önemli: 4 parametre alan middleware'ler Express tarafından error handler olarak tanınır
 */
export const errorHandler = (err, req, res, next) => {
    // Hata bilgilerini al
    const statusCode = err.status || err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    
    // Hata logla (production'da dosyaya yazılabilir)
    console.error('Error:', {
        status: statusCode,
        message: message,
        path: req.path,
        method: req.method,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    })
    
    // Development modunda detaylı hata göster
    // Production'da genel hata mesajı göster (güvenlik)
    const errorResponse = {
        error: {
            status: statusCode,
            message: message
        }
    }
    
    // Development modunda stack trace ekle
    if (process.env.NODE_ENV === 'development') {
        errorResponse.error.stack = err.stack
    }
    
    // HTML response (HTML dosyası gönder)
    if (req.accepts('html')) {
        return res.status(statusCode).sendFile(path.join(__dirname, '../views/error.html'))
    }
    
    // JSON response (API istekleri için)
    res.status(statusCode).json(errorResponse)
}

/**
 * Async Error Wrapper
 * Async fonksiyonlardaki hataları yakalamak için
 * 
 * Kullanım:
 * router.get('/', asyncHandler(userController.index))
 * 
 * @param {Function} fn - Async fonksiyon
 * @returns {Function} Wrapped middleware
 */
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        // Promise'i resolve et ve hataları next() ile gönder
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}

/**
 * Validation Error Handler
 * Validasyon hatalarını özel olarak işler
 * 
 * @param {Error} err - Hata objesi
 * @param {Object} req - Express request objesi
 * @param {Object} res - Express response objesi
 * @param {Function} next - Sonraki middleware'e geçmek için
 */
export const validationErrorHandler = (err, req, res, next) => {
    // Eğer validasyon hatası değilse, bir sonraki error handler'a gönder
    if (err.name !== 'ValidationError') {
        return next(err)
    }
    
    // Validasyon hatalarını formatla
    const errors = err.errors || [err.message]
    
    // HTML response
    if (req.accepts('html')) {
        return res.status(400).sendFile(path.join(__dirname, '../views/error.html'))
    }
    
    // JSON response
    res.status(400).json({
        error: {
            status: 400,
            message: 'Validation Error',
            errors: errors
        }
    })
}

