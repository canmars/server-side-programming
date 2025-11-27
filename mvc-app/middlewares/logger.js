/**
 * Logger Middleware
 * 
 * Bu middleware, tüm HTTP isteklerini loglar.
 * 
 * Neden Logger Middleware?
 * - Tüm istekleri kaydetmek (debug için)
 * - Performans analizi
 * - Güvenlik (şüpheli istekleri tespit)
 * - Hata ayıklama
 * 
 * Middleware Nedir?
 * - Request-response döngüsünde ara işlemler yapan fonksiyonlar
 * - next() çağrılmazsa, zincir durur
 * - Sıralama önemlidir
 */

/**
 * Basit logger middleware
 * Her isteği konsola yazdırır
 * 
 * @param {Object} req - Express request objesi
 * @param {Object} res - Express response objesi
 * @param {Function} next - Sonraki middleware'e geçmek için
 */
export const logger = (req, res, next) => {
    // İstek bilgilerini al
    const method = req.method      // GET, POST, PUT, DELETE
    const path = req.path          // /users, /users/5
    const timestamp = new Date().toISOString()
    
    // Konsola yazdır
    console.log(`[${timestamp}] ${method} ${path}`)
    
    // next() çağırmak önemli!
    // next() çağrılmazsa, istek bir sonraki middleware'e veya route'a geçmez
    next()
}

/**
 * Detaylı logger middleware
 * Daha fazla bilgi loglar (query string, body, headers)
 * 
 * @param {Object} req - Express request objesi
 * @param {Object} res - Express response objesi
 * @param {Function} next - Sonraki middleware'e geçmek için
 */
export const detailedLogger = (req, res, next) => {
    const method = req.method
    const path = req.path
    const query = req.query
    const body = req.body
    const timestamp = new Date().toISOString()
    
    console.log(`[${timestamp}] ${method} ${path}`)
    
    // Query string varsa logla
    if (Object.keys(query).length > 0) {
        console.log('  Query:', query)
    }
    
    // Body varsa logla (POST, PUT isteklerinde)
    if (Object.keys(body).length > 0) {
        console.log('  Body:', body)
    }
    
    next()
}

/**
 * Response time logger
 * İstek süresini ölçer ve loglar
 * 
 * @param {Object} req - Express request objesi
 * @param {Object} res - Express response objesi
 * @param {Function} next - Sonraki middleware'e geçmek için
 */
export const responseTimeLogger = (req, res, next) => {
    // Başlangıç zamanı
    const startTime = Date.now()
    
    // Response tamamlandığında çalışacak event listener
    res.on('finish', () => {
        const duration = Date.now() - startTime
        const method = req.method
        const path = req.path
        const statusCode = res.statusCode
        
        console.log(`[${new Date().toISOString()}] ${method} ${path} - ${statusCode} - ${duration}ms`)
    })
    
    next()
}

