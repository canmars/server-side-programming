/**
 * Bolge Controller
 * 
 * Bu controller, bölge işlemlerini yönetir.
 * 
 * CONTROLLER NEDİR?
 * - Model ve View arasında köprü görevi görür
 * - Kullanıcı isteklerini (request) alır
 * - Model'den veri çeker veya gönderir
 * - View'a veri gönderir
 * 
 * AKIŞ:
 * 1. Kullanıcı isteği gelir (GET /bolge)
 * 2. Controller isteği alır
 * 3. Controller Model'e sorar: "Tüm bölgeleri getir"
 * 4. Model veritabanından verileri çeker
 * 5. Controller verileri View'a gönderir
 * 6. View HTML oluşturur ve kullanıcıya gönderir
 */

import Bolge from '../models/Bolge.js'

/**
 * Tüm bölgeleri listeler
 * 
 * GET /bolge
 * 
 * Akış:
 * 1. Model'den tüm bölgeleri çek (Bolge.findAll())
 * 2. View'a gönder (res.render())
 * 
 * @param {Object} req - Express request objesi (kullanıcı isteği)
 * @param {Object} res - Express response objesi (kullanıcıya cevap)
 */
export const index = async (req, res) => {
    try {
        // 1. MODEL'DEN VERİ ÇEK
        // Bolge.findAll() → Model'deki static method'u çağır
        // await → İşlem bitene kadar bekle
        const bolgeler = await Bolge.findAll()
        
        // 2. VIEW'A VERİ GÖNDER
        // res.render() → EJS template'ini render et
        // 'bolge/index' → views/bolge/index.ejs dosyası
        // { bolgeler } → View'a gönderilecek veriler
        res.render('bolge/index', {
            title: 'Bölgeler',
            bolgeler: bolgeler  // View'da bolgeler değişkeni olarak kullanılacak
        })
    } catch (error) {
        // Hata durumunda
        console.error('index() hatası:', error)
        res.status(500).render('error', {
            title: 'Hata',
            message: 'Bölgeler yüklenirken bir hata oluştu.'
        })
    }
}

/**
 * Belirli bir bölgeyi gösterir
 * 
 * GET /bolge/:id
 * 
 * Akış:
 * 1. URL'den ID'yi al (req.params.id)
 * 2. Model'den bölgeyi çek (Bolge.findById())
 * 3. View'a gönder
 * 
 * @param {Object} req - Express request objesi
 * @param {Object} res - Express response objesi
 */
export const show = async (req, res) => {
    try {
        // req.params → URL parametrelerini içerir
        // Örnek: GET /bolge/5 → req.params.id = "5"
        const id = parseInt(req.params.id)  // String'i number'a çevir
        
        // Model'den bölgeyi çek
        const bolge = await Bolge.findById(id)
        
        // Eğer bölge bulunamadıysa
        if (!bolge) {
            return res.status(404).render('error', {
                title: 'Bölge Bulunamadı',
                message: 'Aradığınız bölge bulunamadı.'
            })
        }
        
        // View'a gönder
        res.render('bolge/show', {
            title: `Bölge: ${bolge.bolge_ad}`,
            bolge: bolge
        })
    } catch (error) {
        console.error('show() hatası:', error)
        res.status(500).render('error', {
            title: 'Hata',
            message: 'Bölge yüklenirken bir hata oluştu.'
        })
    }
}

/**
 * Yeni bölge oluşturma formunu gösterir
 * 
 * GET /bolge/create
 * 
 * Sadece form sayfasını gösterir (veri göndermez)
 */
export const create = async (req, res) => {
    try {
        res.render('bolge/create', {
            title: 'Yeni Bölge Ekle'
        })
    } catch (error) {
        console.error('create() hatası:', error)
        res.status(500).render('error', {
            title: 'Hata',
            message: 'Sayfa yüklenirken bir hata oluştu.'
        })
    }
}

/**
 * Yeni bölge oluşturur (form verilerini işler)
 * 
 * POST /bolge
 * 
 * Akış:
 * 1. Form verilerini al (req.body)
 * 2. Model'e gönder (Bolge.create())
 * 3. Başarılı olursa yönlendir (res.redirect())
 */
export const store = async (req, res) => {
    try {
        // req.body → POST isteğinde gönderilen form verileri
        // Örnek: { bolge_id: "5", bolge_ad: "Marmara" }
        const { bolge_id, bolge_ad } = req.body
        
        // Basit validasyon
        if (!bolge_id || !bolge_ad) {
            return res.render('bolge/create', {
                title: 'Yeni Bölge Ekle',
                error: 'Tüm alanlar zorunludur.',
                bolge_id: bolge_id || '',
                bolge_ad: bolge_ad || ''
            })
        }
        
        // Model'e gönder
        const newBolge = await Bolge.create({
            bolge_id: parseInt(bolge_id),
            bolge_ad: bolge_ad
        })
        
        // Başarılı olursa bölge detay sayfasına yönlendir
        res.redirect(`/bolge/${newBolge.bolge_id}`)
    } catch (error) {
        console.error('store() hatası:', error)
        res.render('bolge/create', {
            title: 'Yeni Bölge Ekle',
            error: 'Bölge oluşturulurken bir hata oluştu.',
            bolge_id: req.body.bolge_id || '',
            bolge_ad: req.body.bolge_ad || ''
        })
    }
}

/**
 * Bölge düzenleme formunu gösterir
 * 
 * GET /bolge/:id/edit
 */
export const edit = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const bolge = await Bolge.findById(id)
        
        if (!bolge) {
            return res.status(404).render('error', {
                title: 'Bölge Bulunamadı',
                message: 'Düzenlemek istediğiniz bölge bulunamadı.'
            })
        }
        
        res.render('bolge/edit', {
            title: `Bölge Düzenle: ${bolge.bolge_ad}`,
            bolge: bolge
        })
    } catch (error) {
        console.error('edit() hatası:', error)
        res.status(500).render('error', {
            title: 'Hata',
            message: 'Sayfa yüklenirken bir hata oluştu.'
        })
    }
}

/**
 * Bölge bilgilerini günceller
 * 
 * PUT /bolge/:id
 */
export const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { bolge_ad } = req.body
        
        if (!bolge_ad) {
            const bolge = await Bolge.findById(id)
            return res.render('bolge/edit', {
                title: `Bölge Düzenle: ${bolge?.bolge_ad || ''}`,
                bolge: bolge || {},
                error: 'Bölge adı zorunludur.'
            })
        }
        
        const updatedBolge = await Bolge.update(id, { bolge_ad })
        
        if (!updatedBolge) {
            return res.status(404).render('error', {
                title: 'Bölge Bulunamadı',
                message: 'Güncellemek istediğiniz bölge bulunamadı.'
            })
        }
        
        res.redirect(`/bolge/${updatedBolge.bolge_id}`)
    } catch (error) {
        console.error('update() hatası:', error)
        const bolge = await Bolge.findById(parseInt(req.params.id))
        res.render('bolge/edit', {
            title: `Bölge Düzenle: ${bolge?.bolge_ad || ''}`,
            bolge: bolge || {},
            error: 'Bölge güncellenirken bir hata oluştu.'
        })
    }
}

/**
 * Bölgeyi siler
 * 
 * DELETE /bolge/:id
 */
export const destroy = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const deleted = await Bolge.delete(id)
        
        if (!deleted) {
            return res.status(404).render('error', {
                title: 'Bölge Bulunamadı',
                message: 'Silmek istediğiniz bölge bulunamadı.'
            })
        }
        
        res.redirect('/bolge')
    } catch (error) {
        console.error('destroy() hatası:', error)
        res.status(500).render('error', {
            title: 'Hata',
            message: 'Bölge silinirken bir hata oluştu.'
        })
    }
}

