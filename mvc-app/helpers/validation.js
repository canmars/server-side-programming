/**
 * Validation Helper Functions
 * 
 * Bu dosya, veri doğrulama (validation) için yardımcı fonksiyonlar içerir.
 * 
 * Neden Validation Helper?
 * - Kod tekrarını önler (DRY prensibi)
 * - Tutarlı validasyon kuralları
 * - Test edilebilir
 * - Controller'larda kullanımı kolay
 */

/**
 * Email formatını kontrol eder
 * 
 * @param {string} email - Kontrol edilecek email
 * @returns {boolean} Email geçerliyse true, değilse false
 * 
 * Neden Email Validation?
 * - Veritabanında geçersiz email'lerin kaydedilmesini önler
 * - Kullanıcı deneyimini iyileştirir (erken hata mesajı)
 */
export const validateEmail = (email) => {
    if (!email || typeof email !== 'string') {
        return false
    }
    
    // Email regex pattern
    // Basit bir email format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email.trim())
}

/**
 * Şifre gücünü kontrol eder
 * 
 * @param {string} password - Kontrol edilecek şifre
 * @returns {Object} { valid: boolean, message: string }
 * 
 * Neden Şifre Validation?
 * - Güvenlik için güçlü şifreler zorunludur
 * - Kullanıcıya şifre gereksinimlerini bildirir
 */
export const validatePassword = (password) => {
    if (!password || typeof password !== 'string') {
        return {
            valid: false,
            message: 'Şifre gereklidir.'
        }
    }
    
    if (password.length < 6) {
        return {
            valid: false,
            message: 'Şifre en az 6 karakter olmalıdır.'
        }
    }
    
    // İsteğe bağlı: Daha karmaşık kurallar eklenebilir
    // - Büyük harf kontrolü
    // - Küçük harf kontrolü
    // - Rakam kontrolü
    // - Özel karakter kontrolü
    
    return {
        valid: true,
        message: 'Şifre geçerli.'
    }
}

/**
 * Kullanıcı verilerini doğrular
 * 
 * @param {Object} userData - Doğrulanacak kullanıcı verileri
 * @returns {Object} { valid: boolean, errors: Array }
 * 
 * Neden Toplu Validation?
 * - Tüm alanları bir seferde kontrol eder
 * - Kullanıcıya tüm hataları gösterir
 * - Controller'da kullanımı kolay
 */
export const validateUser = (userData) => {
    const errors = []
    
    // İsim kontrolü
    if (!userData.name || typeof userData.name !== 'string' || userData.name.trim().length === 0) {
        errors.push('İsim gereklidir.')
    } else if (userData.name.trim().length < 2) {
        errors.push('İsim en az 2 karakter olmalıdır.')
    }
    
    // Email kontrolü
    if (!userData.email || typeof userData.email !== 'string') {
        errors.push('Email gereklidir.')
    } else if (!validateEmail(userData.email)) {
        errors.push('Geçerli bir email adresi giriniz.')
    }
    
    // Şifre kontrolü (create işleminde zorunlu, update'de opsiyonel)
    if (userData.requirePassword !== false) {
        const passwordValidation = validatePassword(userData.password)
        if (!passwordValidation.valid) {
            errors.push(passwordValidation.message)
        }
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    }
}

/**
 * Boş string kontrolü
 * 
 * @param {string} value - Kontrol edilecek değer
 * @returns {boolean} Boş veya sadece boşluklardan oluşuyorsa true
 */
export const isEmpty = (value) => {
    return !value || (typeof value === 'string' && value.trim().length === 0)
}

/**
 * Sayı kontrolü
 * 
 * @param {any} value - Kontrol edilecek değer
 * @returns {boolean} Geçerli bir sayıysa true
 */
export const isNumber = (value) => {
    return !isNaN(value) && !isNaN(parseFloat(value))
}

/**
 * Ürün verilerini doğrular
 * 
 * @param {Object} productData - Doğrulanacak ürün verileri
 * @returns {Object} { valid: boolean, errors: Array }
 */
export const validateProduct = (productData) => {
    const errors = []
    const requireAll = productData.requireAll !== false
    
    // İsim kontrolü
    if (requireAll || productData.name) {
        if (!productData.name || typeof productData.name !== 'string' || productData.name.trim().length === 0) {
            errors.push('Ürün adı gereklidir.')
        } else if (productData.name.trim().length < 2) {
            errors.push('Ürün adı en az 2 karakter olmalıdır.')
        }
    }
    
    // Fiyat kontrolü
    if (requireAll || productData.price) {
        if (productData.price === undefined || productData.price === null || productData.price === '') {
            errors.push('Fiyat gereklidir.')
        } else if (!isNumber(productData.price)) {
            errors.push('Fiyat geçerli bir sayı olmalıdır.')
        } else if (parseFloat(productData.price) < 0) {
            errors.push('Fiyat negatif olamaz.')
        }
    }
    
    // Stok kontrolü
    if (requireAll || productData.stock !== undefined) {
        if (productData.stock === undefined || productData.stock === null || productData.stock === '') {
            errors.push('Stok miktarı gereklidir.')
        } else if (!isNumber(productData.stock)) {
            errors.push('Stok miktarı geçerli bir sayı olmalıdır.')
        } else if (parseInt(productData.stock) < 0) {
            errors.push('Stok miktarı negatif olamaz.')
        }
    }
    
    // User ID kontrolü (create işleminde)
    if (requireAll && (!productData.user_id || !isNumber(productData.user_id))) {
        errors.push('Kullanıcı ID gereklidir.')
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    }
}

