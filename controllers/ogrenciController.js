import { getAllOgrenciler, createOgrenci, updateOgrenci, deleteOgrenci, getOgrenciById } from '../models/ogrenciModel.js'

/**
 * ÖĞRENCİ CONTROLLER - İş Mantığı Katmanı
 * 
 * Bu dosya, HTTP isteklerini işler ve Model katmanından gelen verileri
 * HTTP response'a dönüştürür.
 * 
 * Controller'ın görevi:
 * 1. Model fonksiyonlarını çağırmak
 * 2. Hataları yakalamak ve uygun HTTP response döndürmek
 * 3. İş mantığını yönetmek
 */

/**
 * Tüm öğrencileri getir
 * 
 * BURAYA DİKKAT: Express route handler yapısı
 * - req: Request objesi (gelen istek bilgileri)
 * - res: Response objesi (gönderilecek cevap)
 * - next: Hata durumunda bir sonraki middleware'e geçmek için
 * 
 * GET /api/ogrenciler isteği geldiğinde bu fonksiyon çalışır
 */
export const getAllOgrencilerController = async (req, res, next) => {
    try {
        // BURAYA DİKKAT: Model fonksiyonunu çağırma
        // Model katmanından veriyi alıyoruz
        const ogrenciler = await getAllOgrenciler()
        
        // BURAYA DİKKAT: HTTP response gönderme
        // res.json() → JSON formatında cevap gönderir
        // Status 200 (OK) otomatik olarak gönderilir
        res.json({
            success: true,
            data: ogrenciler,
            count: ogrenciler.length
        })
    } catch (error) {
        // BURAYA DİKKAT: Hata yönetimi
        // try-catch ile hatayı yakalıyoruz
        // Hata detaylarını logluyoruz (debug için)
        console.error('getAllOgrencilerController hatası:', error)
        
        // BURAYA DİKKAT: Veritabanı bağlantı hatası kontrolü
        // Eğer veritabanı bağlantı hatası varsa, daha anlaşılır mesaj gönder
        if (error.code === 'ECONNREFUSED' || error.code === 'ER_ACCESS_DENIED_ERROR' || error.code === 'PROTOCOL_CONNECTION_LOST') {
            return res.status(500).json({
                success: false,
                message: 'Veritabanı bağlantı hatası! Lütfen .env dosyanızı kontrol edin ve veritabanı sunucusunun çalıştığından emin olun.',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined,
                hint: 'Proje kök dizininde .env dosyası oluşturun ve veritabanı bilgilerinizi ekleyin.'
            })
        }
        
        // BURAYA DİKKAT: Tablo bulunamadı hatası
        if (error.code === 'ER_NO_SUCH_TABLE') {
            return res.status(500).json({
                success: false,
                message: 'Veritabanı tablosu bulunamadı! Lütfen veritabanınızı kontrol edin.',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined,
                hint: 'docs/universite_bilgi_sistemi_db.sql dosyasını veritabanınıza import edin.'
            })
        }
        
        // next(error) → Hata handler middleware'ine gönderir
        next(error)
    }
}

/**
 * Yeni öğrenci ekle
 * 
 * BURAYA DİKKAT: req.body kullanımı
 * - req.body → POST/PUT isteklerinde gönderilen veriler
 * - express.json() middleware'i sayesinde otomatik parse edilir
 * - JSON formatında gönderilen veriler req.body'de olur
 * 
 * BURAYA DİKKAT: Validation (Doğrulama)
 * - Gelen verilerin doğru olup olmadığını kontrol ediyoruz
 * - Eksik veya hatalı veri varsa hata döndürüyoruz
 * 
 * POST /api/ogrenciler isteği geldiğinde bu fonksiyon çalışır
 */
export const createOgrenciController = async (req, res, next) => {
    try {
        // BURAYA DİKKAT: req.body ile POST verilerini alma
        // POST isteğinde gönderilen JSON veriler req.body'de olur
        const ogrenciData = req.body
        
        // BURAYA DİKKAT: Basit validation (Doğrulama)
        // Gerekli alanların olup olmadığını kontrol ediyoruz
        if (!ogrenciData.Ogr_No || !ogrenciData.Ogr_Ad || !ogrenciData.Ogr_Soyad) {
            return res.status(400).json({
                success: false,
                message: 'Öğrenci No, Ad ve Soyad alanları zorunludur!'
            })
        }
        
        // BURAYA DİKKAT: Model fonksiyonunu çağırma
        // Model katmanına veriyi gönderiyoruz
        const newOgrenci = await createOgrenci(ogrenciData)
        
        // BURAYA DİKKAT: HTTP response gönderme
        // Status 201 (Created) → Yeni kayıt oluşturuldu
        // res.status(201) → HTTP status kodunu 201 yapar
        res.status(201).json({
            success: true,
            message: 'Öğrenci başarıyla eklendi!',
            data: newOgrenci
        })
    } catch (error) {
        // BURAYA DİKKAT: Hata yönetimi
        // Veritabanı hatası (örn: duplicate key) olabilir
        next(error)
    }
}

/**
 * Öğrenci bilgilerini güncelle
 * 
 * BURAYA DİKKAT: req.params kullanımı
 * - req.params → URL'deki parametreleri içerir
 * - Örnek: PUT /api/ogrenciler/123 → req.params.id = "123"
 * - Route'ta :id tanımlanmışsa, req.params.id ile erişilir
 * 
 * PUT /api/ogrenciler/:id isteği geldiğinde bu fonksiyon çalışır
 */
export const updateOgrenciController = async (req, res, next) => {
    try {
        // BURAYA DİKKAT: req.params ile URL parametrelerini alma
        // URL'deki :id parametresini alıyoruz
        const ogrNo = parseInt(req.params.id)
        
        if (isNaN(ogrNo)) {
            return res.status(400).json({
                success: false,
                message: 'Geçersiz öğrenci numarası!'
            })
        }
        
        // BURAYA DİKKAT: req.body ile güncellenecek verileri alma
        const ogrenciData = req.body
        
        // Validation
        if (!ogrenciData.Ogr_Ad || !ogrenciData.Ogr_Soyad) {
            return res.status(400).json({
                success: false,
                message: 'Ad ve Soyad alanları zorunludur!'
            })
        }
        
        // BURAYA DİKKAT: Model fonksiyonunu çağırma
        const updatedOgrenci = await updateOgrenci(ogrNo, ogrenciData)
        
        // BURAYA DİKKAT: HTTP response gönderme
        // Status 200 (OK) → Başarılı güncelleme
        res.json({
            success: true,
            message: 'Öğrenci başarıyla güncellendi!',
            data: updatedOgrenci
        })
    } catch (error) {
        // BURAYA DİKKAT: Hata yönetimi
        // Model'den gelen hata (örn: kayıt bulunamadı) burada yakalanır
        if (error.message === 'Öğrenci bulunamadı!') {
            return res.status(404).json({
                success: false,
                message: error.message
            })
        }
        next(error)
    }
}

/**
 * Öğrenci sil
 * 
 * BURAYA DİKKAT: DELETE işlemi için response yapısı
 * - DELETE işleminde genellikle silinen veri döndürülmez
 * - Sadece başarı mesajı döndürülür
 * - Status 200 (OK) veya 204 (No Content) kullanılır
 * 
 * DELETE /api/ogrenciler/:id isteği geldiğinde bu fonksiyon çalışır
 */
export const deleteOgrenciController = async (req, res, next) => {
    try {
        // BURAYA DİKKAT: req.params ile URL parametrelerini alma
        const ogrNo = parseInt(req.params.id)
        
        if (isNaN(ogrNo)) {
            return res.status(400).json({
                success: false,
                message: 'Geçersiz öğrenci numarası!'
            })
        }
        
        // BURAYA DİKKAT: Model fonksiyonunu çağırma
        await deleteOgrenci(ogrNo)
        
        // BURAYA DİKKAT: HTTP response gönderme
        // Status 200 (OK) → Başarılı silme
        // DELETE işleminde genellikle data döndürülmez
        res.json({
            success: true,
            message: 'Öğrenci başarıyla silindi!'
        })
    } catch (error) {
        // BURAYA DİKKAT: Hata yönetimi
        if (error.message === 'Öğrenci bulunamadı!') {
            return res.status(404).json({
                success: false,
                message: error.message
            })
        }
        next(error)
    }
}

/**
 * ID'ye göre tek öğrenci getir
 * 
 * BURAYA DİKKAT: req.params ile URL parametrelerini alma
 * - req.params.id → URL'deki :id parametresi
 * - Örnek: GET /api/ogrenciler/123 → req.params.id = "123"
 * 
 * GET /api/ogrenciler/:id isteği geldiğinde bu fonksiyon çalışır
 */
export const getOgrenciByIdController = async (req, res, next) => {
    try {
        // BURAYA DİKKAT: req.params ile URL parametrelerini alma
        const ogrNo = parseInt(req.params.id)
        
        if (isNaN(ogrNo)) {
            return res.status(400).json({
                success: false,
                message: 'Geçersiz öğrenci numarası!'
            })
        }
        
        // BURAYA DİKKAT: Model fonksiyonunu çağırma
        const ogrenci = await getOgrenciById(ogrNo)
        
        // BURAYA DİKKAT: HTTP response gönderme
        res.json({
            success: true,
            data: ogrenci
        })
    } catch (error) {
        // BURAYA DİKKAT: Hata yönetimi
        if (error.message === 'Öğrenci bulunamadı!') {
            return res.status(404).json({
                success: false,
                message: error.message
            })
        }
        next(error)
    }
}

