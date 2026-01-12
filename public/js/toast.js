/**
 * TOAST (Bildirim) SİSTEMİ JAVASCRIPT
 * 
 * Bu dosya, toast bildirimlerini göstermek için kullanılır.
 * 
 * Toast nedir?
 * - Kullanıcıya bilgi vermek için kullanılan küçük bildirimler
 * - Ekranın sağ üst köşesinde görünür
 * - Birkaç saniye sonra otomatik kaybolur
 * 
 * Kullanım:
 * showToast('Başlık', 'Mesaj', 'info')
 * showToast('Başarılı!', 'İşlem tamamlandı', 'success')
 */

/**
 * Toast container'ı oluştur
 * 
 * NE ZAMAN ÇALIŞIR?
 * → İlk toast gösterildiğinde
 * → Sayfa yüklendiğinde (initToasts fonksiyonu ile)
 * 
 * NE YAPIYOR?
 * → HTML'de toast container'ı yoksa oluşturur
 * → Varsa kullanır
 */
const createToastContainer = () => {
    // BURAYA DİKKAT: document.querySelector() kullanımı
    // Toast container'ı var mı kontrol ediyoruz
    let container = document.querySelector('.toast-container')
    
    if (!container) {
        // BURAYA DİKKAT: createElement() kullanımı
        // Yeni bir div elementi oluşturuyoruz
        container = document.createElement('div')
        container.className = 'toast-container'
        
        // BURAYA DİKKAT: appendChild() kullanımı
        // Container'ı body'ye ekliyoruz
        document.body.appendChild(container)
        console.log('✅ Toast container oluşturuldu!')
    }
    
    return container
}

/**
 * Toast göster
 * 
 * NE ZAMAN ÇALIŞIR?
 * → showToast() fonksiyonu çağrıldığında
 * → Herhangi bir işlem yapıldığında (form gönderme, buton tıklama, vb.)
 * 
 * NE YAPIYOR?
 * → Yeni bir toast elementi oluşturur
 * → Container'a ekler
 * → Belirli süre sonra otomatik kapatır
 * 
 * @param {string} title - Toast başlığı
 * @param {string} message - Toast mesajı
 * @param {string} type - Toast tipi ('info', 'success', 'warning', 'error')
 * @param {number} duration - Kaç saniye gösterilecek (0 = otomatik kapanmaz, varsayılan: 0)
 */
const showToast = (title, message, type = 'info', duration = 0) => {
    console.log('')
    console.log('═══════════════════════════════════════════════════════')
    console.log('🔔 TOAST GÖSTERİLİYOR')
    console.log('═══════════════════════════════════════════════════════')
    console.log('📍 Şu an çalışan: public/js/toast.js, showToast() fonksiyonu')
    console.log('📋 Toast bilgileri:')
    console.log('   → Başlık:', title)
    console.log('   → Mesaj:', message)
    console.log('   → Tip:', type)
    console.log('   → Süre:', duration, 'ms')
    
    // BURAYA DİKKAT: Toast container'ı oluştur veya bul
    const container = createToastContainer()
    
    // BURAYA DİKKAT: Toast elementi oluşturma
    // createElement() ile yeni bir div oluşturuyoruz
    const toast = document.createElement('div')
    toast.className = `toast toast-${type}`
    
    // BURAYA DİKKAT: Toast ikonları
    // Her tip için farklı ikon
    const icons = {
        info: 'ℹ️',
        success: '✅',
        warning: '⚠️',
        error: '❌'
    }
    
    // BURAYA DİKKAT: innerHTML ile toast içeriğini oluşturma
    // Template literals kullanarak dinamik HTML oluşturuyoruz
    toast.innerHTML = `
        <div class="toast-icon">${icons[type] || icons.info}</div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.closest('.toast').remove()">×</button>
    `
    
    console.log('✅ Toast elementi oluşturuldu!')
    
    // BURAYA DİKKAT: appendChild() kullanımı
    // Toast'u container'a ekliyoruz
    container.appendChild(toast)
    console.log('✅ Toast container\'a eklendi!')
    console.log('   → Ekranda görünüyor...')
    
    // BURAYA DİKKAT: setTimeout() kullanımı
    // Belirli süre sonra toast'u kapatmak için
    // setTimeout() → Belirli süre sonra fonksiyon çalıştırır
    // duration = 0 ise otomatik kapanmaz
    let timeoutId = null
    if (duration > 0) {
        timeoutId = setTimeout(() => {
            console.log('⏰ Toast süresi doldu, kapatılıyor...')
            hideToast(toast)
        }, duration)
    } else {
        console.log('⏰ Toast otomatik kapanmayacak (duration = 0)')
    }
    
    // BURAYA DİKKAT: Kapatma butonuna event listener
    // Kullanıcı X butonuna tıklarsa toast kapanır
    const closeBtn = toast.querySelector('.toast-close')
    closeBtn.addEventListener('click', () => {
        console.log('👆 Kullanıcı toast\'u kapattı (X butonuna tıkladı)')
        if (timeoutId) {
            clearTimeout(timeoutId) // BURAYA DİKKAT: setTimeout'u iptal et
        }
        hideToast(toast)
    })
    
    console.log('═══════════════════════════════════════════════════════')
    console.log('')
    
    return toast
}

/**
 * Toast'u kapat
 * 
 * NE ZAMAN ÇALIŞIR?
 * → Toast süresi dolduğunda
 * → Kullanıcı X butonuna tıkladığında
 * 
 * NE YAPIYOR?
 * → Toast'a "hiding" class'ı ekler (animasyon için)
 * → Animasyon bitince toast'u DOM'dan kaldırır
 * 
 * @param {HTMLElement} toast - Kapatılacak toast elementi
 */
const hideToast = (toast) => {
    // BURAYA DİKKAT: classList.add() kullanımı
    // "hiding" class'ını ekliyoruz (çıkış animasyonu için)
    toast.classList.add('hiding')
    
    // BURAYA DİKKAT: setTimeout() ile animasyon bitince kaldırma
    // Animasyon 300ms sürüyor, o yüzden 300ms sonra kaldırıyoruz
    setTimeout(() => {
        // BURAYA DİKKAT: remove() kullanımı
        // Toast'u DOM'dan kaldırıyoruz
        toast.remove()
        console.log('✅ Toast DOM\'dan kaldırıldı!')
    }, 300)
}

/**
 * Toast sistemini başlat
 * 
 * NE ZAMAN ÇALIŞIR?
 * → Sayfa yüklendiğinde
 * 
 * NE YAPIYOR?
 * → Toast container'ı oluşturur
 * → Sistem hazır hale getirir
 */
const initToasts = () => {
    console.log('🔔 Toast sistemi başlatılıyor...')
    createToastContainer()
    console.log('✅ Toast sistemi hazır!')
}

// BURAYA DİKKAT: Sayfa yüklendiğinde toast sistemini başlat
// DOMContentLoaded → HTML hazır olduğunda çalışır
document.addEventListener('DOMContentLoaded', initToasts)

// BURAYA DİKKAT: Global fonksiyon olarak export et
// Diğer JavaScript dosyalarından kullanılabilir
window.showToast = showToast

