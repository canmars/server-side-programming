/**
 * ÖĞRENCİ FRONTEND JAVASCRIPT
 * 
 * Bu dosya, öğrenci yönetim sayfasının tüm frontend işlemlerini yönetir.
 * 
 * Öğrenilecek JavaScript özellikleri:
 * - fetch() API → HTTP istekleri göndermek için
 * - async/await → Asenkron işlemleri yönetmek için
 * - document API → DOM manipülasyonu için
 * - Event Listeners → Kullanıcı etkileşimlerini yakalamak için
 * - Form API → Form verilerini almak için
 */

// BURAYA DİKKAT: Global değişken - düzenleme modunda mıyız?
let isEditMode = false
let currentEditId = null

// BURAYA DİKKAT: DOMContentLoaded event
// Sayfa tamamen yüklendiğinde bu kod çalışır
// Neden gerekli? JavaScript, HTML'den önce yüklenebilir
// Bu event ile HTML hazır olduğundan emin oluruz
document.addEventListener('DOMContentLoaded', () => {
    // Sayfa yüklendiğinde öğrenci listesini getir
    loadOgrenciler()
    
    // Form submit event'ini dinle
    setupFormListener()
    
    // İptal butonu event listener
    const cancelBtn = document.querySelector('#cancelBtn')
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            const form = document.querySelector('#ogrenciForm')
            form.reset()
            isEditMode = false
            currentEditId = null
            document.querySelector('#ogrenciForm h2').textContent = 'Yeni Öğrenci Ekle'
            document.querySelector('#submitBtn').textContent = 'Öğrenci Ekle'
            document.querySelector('#cancelBtn').style.display = 'none'
        })
    }
})

/**
 * Tüm öğrencileri API'den çek ve göster
 * 
 * BURAYA DİKKAT: async/await kullanımı
 * - async: Bu fonksiyon asenkron bir fonksiyondur
 * - await: fetch() işlemi bitene kadar bekler
 * - Neden await? API çağrısı zaman alır, await olmadan sonuç gelmeden devam eder
 */
const loadOgrenciler = async () => {
    try {
        // BURAYA DİKKAT: fetch() API kullanımı
        // fetch() → HTTP isteği gönderir ve Promise döner
        // GET isteği varsayılan olarak gönderilir
        // URL: API endpoint'imiz
        const response = await fetch('/api/ogrenciler')
        
        // BURAYA DİKKAT: Response kontrolü
        // response.ok → Status 200-299 arası ise true
        // Hata durumunda throw ile hata fırlatıyoruz
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        // BURAYA DİKKAT: JSON veriyi parse etme
        // response.json() → Response'u JSON formatına çevirir
        // Bu da bir Promise döner, bu yüzden await kullanıyoruz
        const result = await response.json()
        
        // BURAYA DİKKAT: Console.log ile test
        // Tarayıcı console'unda (F12) sonuçları görebiliriz
        console.log('API\'den gelen veri:', result)
        
        // BURAYA DİKKAT: DOM manipülasyonu
        // API'den gelen veriyi tabloya yazdırıyoruz
        // result.data → API'den gelen öğrenci listesi
        if (result.data && result.data.length > 0) {
            renderOgrenciler(result.data)
        } else {
            // Eğer öğrenci yoksa bilgi mesajı göster
            const tbody = document.querySelector('#ogrenciTableBody')
            if (tbody) {
                tbody.innerHTML = '<tr><td colspan="9">Henüz öğrenci kaydı bulunmamaktadır.</td></tr>'
            }
        }
        
    } catch (error) {
        // BURAYA DİKKAT: Hata yönetimi
        // try-catch ile hataları yakalıyoruz
        console.error('Öğrenciler yüklenirken hata oluştu:', error)
        alert('Öğrenciler yüklenirken bir hata oluştu!')
    }
}

/**
 * Form submit event listener'ını ayarla
 */
const setupFormListener = () => {
    // BURAYA DİKKAT: document.querySelector() kullanımı
    // Form elementini ID'sine göre buluyoruz
    const form = document.querySelector('#ogrenciForm')
    
    if (form) {
        // BURAYA DİKKAT: addEventListener() kullanımı
        // Form submit olduğunda (butona tıklanınca) bu fonksiyon çalışır
        form.addEventListener('submit', handleFormSubmit)
    }
}

/**
 * Form submit işlemini yönet
 * 
 * BURAYA DİKKAT: Event handler fonksiyonu
 * - event parametresi → Form submit event'i
 * - preventDefault() → Form'un varsayılan davranışını (sayfa yenileme) engeller
 */
const handleFormSubmit = async (event) => {
    // BURAYA DİKKAT: preventDefault()
    // Form'un varsayılan davranışını engelliyoruz
    // Yoksa sayfa yenilenir ve veriler kaybolur
    event.preventDefault()
    
    // BURAYA DİKKAT: Form verilerini alma
    // FormData API kullanarak form verilerini alıyoruz
    const form = event.target
    const formData = new FormData(form)
    
    // BURAYA DİKKAT: FormData'dan Object'e çevirme
    // FormData'yı JSON'a çevirmek için Object.fromEntries() kullanıyoruz
    const ogrenciData = {}
    formData.forEach((value, key) => {
        // BURAYA DİKKAT: Veri tipi dönüşümü
        // Sayısal alanları number'a çeviriyoruz
        if (['Ogr_No', 'Bolum_Kod', 'Fakulte_Kod', 'Ogr_Tel', 'Ogr_Dosya_No', 'Tur_Kod', 'Durum_Kod'].includes(key)) {
            ogrenciData[key] = parseInt(value) || 0
        } else {
            ogrenciData[key] = value
        }
    })
    
    try {
        let response
        
        if (isEditMode && currentEditId) {
            // BURAYA DİKKAT: PUT isteği ile güncelleme
            // method: 'PUT' → Güncelleme işlemi
            // URL'de öğrenci numarası var
            response = await fetch(`/api/ogrenciler/${currentEditId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ogrenciData)
            })
        } else {
            // BURAYA DİKKAT: fetch() ile POST isteği
            // method: 'POST' → POST isteği gönderir
            // headers: Content-Type belirtiyoruz (JSON gönderiyoruz)
            // body: JSON.stringify() → JavaScript objesini JSON string'e çevirir
            response = await fetch('/api/ogrenciler', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // BURAYA DİKKAT: JSON gönderdiğimizi belirtiyoruz
                },
                body: JSON.stringify(ogrenciData) // BURAYA DİKKAT: JSON.stringify() kullanımı
            })
        }
        
        // BURAYA DİKKAT: Response kontrolü
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'İşlem başarısız!')
        }
        
        // BURAYA DİKKAT: Başarılı response
        const result = await response.json()
        console.log('İşlem başarılı:', result)
        
        // Form'u temizle ve modu sıfırla
        form.reset()
        isEditMode = false
        currentEditId = null
        
        // Form başlığını ve butonunu sıfırla
        document.querySelector('#ogrenciForm h2').textContent = 'Yeni Öğrenci Ekle'
        document.querySelector('#submitBtn').textContent = 'Öğrenci Ekle'
        document.querySelector('#cancelBtn').style.display = 'none'
        
        // Öğrenci listesini yenile
        loadOgrenciler()
        
        // Başarı mesajı göster
        alert(result.message || 'İşlem başarılı!')
        
    } catch (error) {
        // BURAYA DİKKAT: Hata yönetimi
        console.error('İşlem sırasında hata:', error)
        alert('Hata: ' + error.message)
    }
}

/**
 * Öğrenci listesini tabloya yazdır
 * 
 * BURAYA DİKKAT: DOM manipülasyonu
 * - document.querySelector() → Element bulma
 * - createElement() → Yeni element oluşturma
 * - appendChild() → Element'e child ekleme
 * - innerHTML → Element içeriğini değiştirme
 * - template literals → Dinamik string oluşturma
 * 
 * @param {Array} ogrenciler - Öğrenci listesi
 */
const renderOgrenciler = (ogrenciler) => {
    // BURAYA DİKKAT: document.querySelector() kullanımı
    // Tablo body elementini buluyoruz
    const tbody = document.querySelector('#ogrenciTableBody')
    
    if (!tbody) {
        console.error('Tablo body elementi bulunamadı!')
        return
    }
    
    // BURAYA DİKKAT: innerHTML ile temizleme
    // Önce tabloyu temizliyoruz (eski verileri kaldırıyoruz)
    tbody.innerHTML = ''
    
    // BURAYA DİKKAT: forEach ile döngü
    // Her öğrenci için bir satır oluşturuyoruz
    ogrenciler.forEach(ogrenci => {
        // BURAYA DİKKAT: createElement() kullanımı
        // Yeni bir table row (tr) elementi oluşturuyoruz
        const row = document.createElement('tr')
        
        // BURAYA DİKKAT: Template literals kullanımı
        // Backtick (`) ile dinamik string oluşturuyoruz
        // ${} içine JavaScript değişkenleri yazılır
        row.innerHTML = `
            <td>${ogrenci.Ogr_No}</td>
            <td>${ogrenci.Ogr_Ad}</td>
            <td>${ogrenci.Ogr_Soyad}</td>
            <td>${ogrenci.Ogr_Giris_Tarih}</td>
            <td>${ogrenci.Bolum_Kod}</td>
            <td>${ogrenci.Fakulte_Kod}</td>
            <td>${ogrenci.Ogr_Tel}</td>
            <td>${ogrenci.Ogr_Adres}</td>
            <td>
                <button class="edit-btn" data-id="${ogrenci.Ogr_No}">Düzenle</button>
                <button class="delete-btn" data-id="${ogrenci.Ogr_No}">Sil</button>
            </td>
        `
        
        // BURAYA DİKKAT: appendChild() kullanımı
        // Oluşturduğumuz satırı tablo body'sine ekliyoruz
        tbody.appendChild(row)
    })
    
    // BURAYA DİKKAT: Event listener'ları ayarla
    // Düzenle ve sil butonlarına event listener ekliyoruz
    setupActionButtons()
}

/**
 * Düzenle ve sil butonlarına event listener ekle
 */
const setupActionButtons = () => {
    // BURAYA DİKKAT: querySelectorAll() kullanımı
    // Tüm düzenle butonlarını buluyoruz
    const editButtons = document.querySelectorAll('.edit-btn')
    const deleteButtons = document.querySelectorAll('.delete-btn')
    
    // BURAYA DİKKAT: forEach ile her butona event listener ekleme
    editButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const ogrNo = e.target.getAttribute('data-id')
            await handleEditOgrenci(ogrNo)
        })
    })
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const ogrNo = e.target.getAttribute('data-id')
            handleDeleteOgrenci(ogrNo)
        })
    })
}

/**
 * Öğrenci silme işlemini yönet
 * 
 * BURAYA DİKKAT: confirm() ile onay alma
 * - confirm() → Kullanıcıya onay dialogu gösterir
 * - true dönerse → Kullanıcı "Tamam" dedi
 * - false dönerse → Kullanıcı "İptal" dedi
 * 
 * BURAYA DİKKAT: fetch() ile DELETE isteği
 * - method: 'DELETE' → Silme işlemi
 * - DELETE isteğinde genellikle body gönderilmez
 * 
 * @param {string} ogrNo - Silinecek öğrenci numarası
 */
const handleDeleteOgrenci = async (ogrNo) => {
    // BURAYA DİKKAT: confirm() ile onay alma
    // Kullanıcıya silme işlemini onaylatıyoruz
    const confirmed = confirm('Bu öğrenciyi silmek istediğinize emin misiniz?')
    
    if (!confirmed) {
        // Kullanıcı iptal etti, işlemi durdur
        return
    }
    
    try {
        // BURAYA DİKKAT: fetch() ile DELETE isteği
        // method: 'DELETE' → Silme işlemi
        // URL'de öğrenci numarası var
        const response = await fetch(`/api/ogrenciler/${ogrNo}`, {
            method: 'DELETE'
        })
        
        // BURAYA DİKKAT: Response kontrolü
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Öğrenci silinirken bir hata oluştu!')
        }
        
        // BURAYA DİKKAT: Başarılı response
        const result = await response.json()
        console.log('Öğrenci silindi:', result)
        
        // Öğrenci listesini yenile
        loadOgrenciler()
        
        // Başarı mesajı göster
        alert(result.message || 'Öğrenci başarıyla silindi!')
        
    } catch (error) {
        // BURAYA DİKKAT: Hata yönetimi
        console.error('Öğrenci silinirken hata:', error)
        alert('Hata: ' + error.message)
    }
}

/**
 * Öğrenci düzenleme işlemini başlat
 * 
 * BURAYA DİKKAT: Form'u mevcut verilerle doldurma
 * - API'den öğrenci bilgilerini çekiyoruz
 * - Form alanlarını bu verilerle dolduruyoruz
 * 
 * @param {string} ogrNo - Düzenlenecek öğrenci numarası
 */
const handleEditOgrenci = async (ogrNo) => {
    try {
        // BURAYA DİKKAT: fetch() ile GET isteği (tek kayıt)
        // API'den öğrenci bilgilerini çekiyoruz
        const response = await fetch(`/api/ogrenciler/${ogrNo}`)
        
        if (!response.ok) {
            throw new Error('Öğrenci bilgileri alınamadı!')
        }
        
        const result = await response.json()
        const ogrenci = result.data
        
        // BURAYA DİKKAT: Form alanlarını doldurma
        // Form elementlerini bulup değerlerini set ediyoruz
        document.querySelector('#ogrNo').value = ogrenci.Ogr_No
        document.querySelector('#ogrAd').value = ogrenci.Ogr_Ad
        document.querySelector('#ogrSoyad').value = ogrenci.Ogr_Soyad
        document.querySelector('#ogrGirisTarih').value = ogrenci.Ogr_Giris_Tarih
        document.querySelector('#bolumKod').value = ogrenci.Bolum_Kod
        document.querySelector('#fakulteKod').value = ogrenci.Fakulte_Kod
        document.querySelector('#ogrTel').value = ogrenci.Ogr_Tel
        document.querySelector('#ogrAdres').value = ogrenci.Ogr_Adres
        document.querySelector('#ogrDosyaNo').value = ogrenci.Ogr_Dosya_No
        document.querySelector('#turKod').value = ogrenci.Tur_Kod
        document.querySelector('#durumKod').value = ogrenci.Durum_Kod
        
        // BURAYA DİKKAT: Düzenleme modunu aktif et
        isEditMode = true
        currentEditId = ogrNo
        
        // Form başlığını ve butonunu değiştir
        document.querySelector('#ogrenciForm h2').textContent = 'Öğrenci Düzenle'
        document.querySelector('#submitBtn').textContent = 'Güncelle'
        document.querySelector('#cancelBtn').style.display = 'inline-block'
        
        // Form'u görünür yap (scroll)
        document.querySelector('#ogrenciForm').scrollIntoView({ behavior: 'smooth' })
        
    } catch (error) {
        console.error('Öğrenci bilgileri alınırken hata:', error)
        alert('Hata: ' + error.message)
    }
}

