/**
 * Product Controller
 * 
 * Bu controller, ürün işlemlerini yönetir.
 * User Controller ile aynı pattern'i takip eder.
 */

import Product from '../models/Product.js'
import { validateProduct } from '../helpers/validation.js'

/**
 * Tüm ürünleri listeler
 * GET /products
 */
export const index = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const search = req.query.search || ''
        
        let products = await Product.findAll()
        
        if (search) {
            products = products.filter(product => 
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                (product.description && product.description.toLowerCase().includes(search.toLowerCase()))
            )
        }
        
        const totalProducts = products.length
        const totalPages = Math.ceil(totalProducts / limit)
        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const paginatedProducts = products.slice(startIndex, endIndex)
        
        res.render('products/index', {
            title: 'Ürünler',
            products: paginatedProducts,
            currentPage: page,
            totalPages: totalPages,
            totalProducts: totalProducts,
            limit: limit,
            search: search,
            query: req.query
        })
    } catch (error) {
        console.error('index() hatası:', error)
        res.status(500).render('error', {
            title: 'Hata',
            message: 'Ürünler yüklenirken bir hata oluştu.'
        })
    }
}

/**
 * Belirli bir ürünü gösterir
 * GET /products/:id
 */
export const show = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const product = await Product.findById(id)
        
        if (!product) {
            return res.status(404).render('error', {
                title: 'Ürün Bulunamadı',
                message: 'Aradığınız ürün bulunamadı.'
            })
        }
        
        res.render('products/show', {
            title: `Ürün: ${product.name}`,
            product: product
        })
    } catch (error) {
        console.error('show() hatası:', error)
        res.status(500).render('error', {
            title: 'Hata',
            message: 'Ürün yüklenirken bir hata oluştu.'
        })
    }
}

/**
 * Yeni ürün oluşturma formunu gösterir
 * GET /products/create
 */
export const create = async (req, res) => {
    try {
        res.render('products/create', {
            title: 'Yeni Ürün Ekle'
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
 * Yeni ürün oluşturur
 * POST /products
 */
export const store = async (req, res) => {
    try {
        const { name, description, price, stock, user_id } = req.body
        
        const validation = validateProduct({ name, description, price, stock, user_id })
        
        if (!validation.valid) {
            return res.render('products/create', {
                title: 'Yeni Ürün Ekle',
                errors: validation.errors,
                name: name || '',
                description: description || '',
                price: price || '',
                stock: stock || '',
                user_id: user_id || ''
            })
        }
        
        const newProduct = await Product.create({
            name,
            description,
            price: parseFloat(price),
            stock: parseInt(stock),
            user_id: parseInt(user_id)
        })
        
        res.redirect(`/products/${newProduct.id}`)
    } catch (error) {
        console.error('store() hatası:', error)
        res.render('products/create', {
            title: 'Yeni Ürün Ekle',
            error: 'Ürün oluşturulurken bir hata oluştu.',
            name: req.body.name || '',
            description: req.body.description || '',
            price: req.body.price || '',
            stock: req.body.stock || '',
            user_id: req.body.user_id || ''
        })
    }
}

/**
 * Ürün düzenleme formunu gösterir
 * GET /products/:id/edit
 */
export const edit = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const product = await Product.findById(id)
        
        if (!product) {
            return res.status(404).render('error', {
                title: 'Ürün Bulunamadı',
                message: 'Düzenlemek istediğiniz ürün bulunamadı.'
            })
        }
        
        res.render('products/edit', {
            title: `Ürün Düzenle: ${product.name}`,
            product: product
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
 * Ürün bilgilerini günceller
 * PUT /products/:id
 */
export const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, description, price, stock } = req.body
        
        const validation = validateProduct({ 
            name, 
            description, 
            price, 
            stock, 
            requireAll: false 
        })
        
        if (!validation.valid) {
            const product = await Product.findById(id)
            return res.render('products/edit', {
                title: `Ürün Düzenle: ${product?.name || ''}`,
                product: product || {},
                errors: validation.errors
            })
        }
        
        const updateData = {}
        if (name) updateData.name = name
        if (description !== undefined) updateData.description = description
        if (price) updateData.price = parseFloat(price)
        if (stock !== undefined) updateData.stock = parseInt(stock)
        
        const updatedProduct = await Product.update(id, updateData)
        
        if (!updatedProduct) {
            return res.status(404).render('error', {
                title: 'Ürün Bulunamadı',
                message: 'Güncellemek istediğiniz ürün bulunamadı.'
            })
        }
        
        res.redirect(`/products/${updatedProduct.id}`)
    } catch (error) {
        console.error('update() hatası:', error)
        const product = await Product.findById(parseInt(req.params.id))
        res.render('products/edit', {
            title: `Ürün Düzenle: ${product?.name || ''}`,
            product: product || {},
            error: 'Ürün güncellenirken bir hata oluştu.'
        })
    }
}

/**
 * Ürünü siler
 * DELETE /products/:id
 */
export const destroy = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const deleted = await Product.delete(id)
        
        if (!deleted) {
            return res.status(404).render('error', {
                title: 'Ürün Bulunamadı',
                message: 'Silmek istediğiniz ürün bulunamadı.'
            })
        }
        
        res.redirect('/products')
    } catch (error) {
        console.error('destroy() hatası:', error)
        res.status(500).render('error', {
            title: 'Hata',
            message: 'Ürün silinirken bir hata oluştu.'
        })
    }
}

