/**
 * User Controller
 * 
 * Bu controller, kullanıcı işlemlerini yönetir.
 * 
 * Controller'ın Sorumluluğu:
 * - HTTP isteklerini (GET, POST, PUT, DELETE) işlemek
 * - Model'den veri almak veya göndermek
 * - İş mantığını (business logic) yönetmek
 * - View'a uygun verileri göndermek
 * - Response oluşturmak
 * 
 * Önemli: Controller, Model ve View arasında köprü görevi görür.
 */

import User from '../models/User.js'
import { validateUser } from '../helpers/validation.js'

/**
 * Tüm kullanıcıları listeler
 * 
 * GET /users
 * 
 * Akış:
 * 1. Model'den tüm kullanıcıları çek
 * 2. View'a gönder (users/index.ejs)
 * 
 * @param {Object} req - Express request objesi
 * @param {Object} res - Express response objesi
 */
export const index = async (req, res) => {
    try {
        // Query String Örnekleri:
        // GET /users?page=1&limit=10&search=john
        // req.query = { page: '1', limit: '10', search: 'john' }
        
        // Query parametrelerini alıyoruz
        const page = parseInt(req.query.page) || 1  // Sayfa numarası (varsayılan: 1)
        const limit = parseInt(req.query.limit) || 10  // Sayfa başına kayıt (varsayılan: 10)
        const search = req.query.search || ''  // Arama terimi
        
        // Model'den veri çekiyoruz
        // Şimdilik tüm kullanıcıları çekiyoruz
        // İleride sayfalama ve arama ekleyeceğiz
        let users = await User.findAll()
        
        // Eğer arama terimi varsa, filtreleme yap
        if (search) {
            users = users.filter(user => 
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase())
            )
        }
        
        // Sayfalama hesaplamaları
        const totalUsers = users.length
        const totalPages = Math.ceil(totalUsers / limit)
        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const paginatedUsers = users.slice(startIndex, endIndex)
        
        // View'a veri gönderiyoruz
        // res.render() EJS template'ini render eder
        // İkinci parametre, View'a gönderilecek veriler
        res.render('users/index', {
            title: 'Kullanıcılar',
            users: paginatedUsers,  // Sayfalanmış kullanıcı listesi
            // Sayfalama bilgileri
            currentPage: page,
            totalPages: totalPages,
            totalUsers: totalUsers,
            limit: limit,
            // Arama bilgisi
            search: search,
            // Query string'i korumak için (sayfalama linklerinde kullanılacak)
            query: req.query
        })
    } catch (error) {
        console.error('index() hatası:', error)
        // Hata durumunda kullanıcıya hata sayfası göster
        res.status(500).render('error', {
            title: 'Hata',
            message: 'Kullanıcılar yüklenirken bir hata oluştu.'
        })
    }
}

/**
 * Belirli bir kullanıcıyı gösterir
 * 
 * GET /users/:id
 * 
 * Akış:
 * 1. URL'den ID'yi al (req.params.id)
 * 2. Model'den kullanıcıyı çek
 * 3. View'a gönder (users/show.ejs)
 * 
 * @param {Object} req - Express request objesi
 * @param {Object} res - Express response objesi
 */
export const show = async (req, res) => {
    try {
        // req.params, URL parametrelerini içerir
        // Örnek: /users/5 → req.params.id = "5"
        const id = parseInt(req.params.id)
        
        // Model'den kullanıcıyı çek
        const user = await User.findById(id)
        
        // Eğer kullanıcı bulunamadıysa
        if (!user) {
            return res.status(404).render('error', {
                title: 'Kullanıcı Bulunamadı',
                message: 'Aradığınız kullanıcı bulunamadı.'
            })
        }
        
        // View'a gönder
        res.render('users/show', {
            title: `Kullanıcı: ${user.name}`,
            user: user
        })
    } catch (error) {
        console.error('show() hatası:', error)
        res.status(500).render('error', {
            title: 'Hata',
            message: 'Kullanıcı yüklenirken bir hata oluştu.'
        })
    }
}

/**
 * Yeni kullanıcı oluşturma formunu gösterir
 * 
 * GET /users/create
 * 
 * Akış:
 * 1. Form sayfasını göster (users/create.ejs)
 * 
 * @param {Object} req - Express request objesi
 * @param {Object} res - Express response objesi
 */
export const create = async (req, res) => {
    try {
        // Sadece form sayfasını gösteriyoruz
        // Veri gönderme işlemi store() metodunda yapılacak
        res.render('users/create', {
            title: 'Yeni Kullanıcı Ekle'
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
 * Yeni kullanıcı oluşturur (form verilerini işler)
 * 
 * POST /users
 * 
 * Akış:
 * 1. Form verilerini al (req.body)
 * 2. Validasyon yap (basit)
 * 3. Model'e gönder
 * 4. Başarılı olursa yönlendir (redirect)
 * 
 * @param {Object} req - Express request objesi
 * @param {Object} res - Express response objesi
 */
export const store = async (req, res) => {
    try {
        // req.body, POST isteğinde gönderilen form verilerini içerir
        // express.urlencoded() middleware'i gerekli (app.js'te ekleyeceğiz)
        const { name, email, password } = req.body
        
        // Validation helper kullanarak doğrulama yapıyoruz
        // Neden helper kullanıyoruz?
        // - Kod tekrarını önler
        // - Tutarlı validasyon kuralları
        // - Test edilebilir
        const validation = validateUser({ name, email, password, requirePassword: true })
        
        if (!validation.valid) {
            // Tüm hataları göster
            return res.render('users/create', {
                title: 'Yeni Kullanıcı Ekle',
                errors: validation.errors,  // Hata listesi
                // Form verilerini geri gönder (kullanıcı tekrar yazmasın)
                name: name || '',
                email: email || ''
            })
        }
        
        // Model'e gönder
        const newUser = await User.create({
            name,
            email,
            password  // Gerçek uygulamada hash'lenmeli
        })
        
        // Başarılı olursa kullanıcı detay sayfasına yönlendir
        // res.redirect() kullanıcıyı başka bir sayfaya yönlendirir
        res.redirect(`/users/${newUser.id}`)
    } catch (error) {
        console.error('store() hatası:', error)
        res.render('users/create', {
            title: 'Yeni Kullanıcı Ekle',
            error: 'Kullanıcı oluşturulurken bir hata oluştu.',
            name: req.body.name || '',
            email: req.body.email || ''
        })
    }
}

/**
 * Kullanıcı düzenleme formunu gösterir
 * 
 * GET /users/:id/edit
 * 
 * Akış:
 * 1. URL'den ID'yi al
 * 2. Model'den kullanıcıyı çek
 * 3. Form sayfasını göster (users/edit.ejs)
 * 
 * @param {Object} req - Express request objesi
 * @param {Object} res - Express response objesi
 */
export const edit = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const user = await User.findById(id)
        
        if (!user) {
            return res.status(404).render('error', {
                title: 'Kullanıcı Bulunamadı',
                message: 'Düzenlemek istediğiniz kullanıcı bulunamadı.'
            })
        }
        
        res.render('users/edit', {
            title: `Kullanıcı Düzenle: ${user.name}`,
            user: user
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
 * Kullanıcı bilgilerini günceller (form verilerini işler)
 * 
 * PUT /users/:id
 * 
 * Akış:
 * 1. URL'den ID'yi al
 * 2. Form verilerini al (req.body)
 * 3. Validasyon yap
 * 4. Model'e gönder
 * 5. Başarılı olursa yönlendir
 * 
 * @param {Object} req - Express request objesi
 * @param {Object} res - Express response objesi
 */
export const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, email, password } = req.body
        
        // Validation helper kullanarak doğrulama yapıyoruz
        // Update işleminde şifre opsiyonel (requirePassword: false)
        const validation = validateUser({ 
            name, 
            email, 
            password, 
            requirePassword: false  // Şifre güncellemede opsiyonel
        })
        
        if (!validation.valid) {
            const user = await User.findById(id)
            return res.render('users/edit', {
                title: `Kullanıcı Düzenle: ${user?.name || ''}`,
                user: user || {},
                errors: validation.errors  // Hata listesi
            })
        }
        
        // Güncelleme verilerini hazırla
        const updateData = { name, email }
        // Şifre sadece gönderildiyse ekle
        if (password) {
            updateData.password = password
        }
        
        // Model'e gönder
        const updatedUser = await User.update(id, updateData)
        
        if (!updatedUser) {
            return res.status(404).render('error', {
                title: 'Kullanıcı Bulunamadı',
                message: 'Güncellemek istediğiniz kullanıcı bulunamadı.'
            })
        }
        
        // Başarılı olursa kullanıcı detay sayfasına yönlendir
        res.redirect(`/users/${updatedUser.id}`)
    } catch (error) {
        console.error('update() hatası:', error)
        const user = await User.findById(parseInt(req.params.id))
        res.render('users/edit', {
            title: `Kullanıcı Düzenle: ${user?.name || ''}`,
            user: user || {},
            error: 'Kullanıcı güncellenirken bir hata oluştu.'
        })
    }
}

/**
 * Kullanıcıyı siler
 * 
 * DELETE /users/:id
 * 
 * Akış:
 * 1. URL'den ID'yi al
 * 2. Model'e silme isteği gönder
 * 3. Başarılı olursa yönlendir
 * 
 * @param {Object} req - Express request objesi
 * @param {Object} res - Express response objesi
 */
export const destroy = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        
        // Model'e silme isteği gönder
        const deleted = await User.delete(id)
        
        if (!deleted) {
            return res.status(404).render('error', {
                title: 'Kullanıcı Bulunamadı',
                message: 'Silmek istediğiniz kullanıcı bulunamadı.'
            })
        }
        
        // Başarılı olursa kullanıcı listesine yönlendir
        res.redirect('/users')
    } catch (error) {
        console.error('destroy() hatası:', error)
        res.status(500).render('error', {
            title: 'Hata',
            message: 'Kullanıcı silinirken bir hata oluştu.'
        })
    }
}

