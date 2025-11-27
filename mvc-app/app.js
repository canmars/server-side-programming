import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';

// Middleware'ler
import { logger } from './middlewares/logger.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';

// Router'lar
import homeRoutes from './routers/homeRoutes.js';
import userRoutes from './routers/userRoutes.js';
import productRoutes from './routers/productRoutes.js';
import bolgeRoutes from './routers/bolgeRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ============================================
// MIDDLEWARE'LER (Sıralama önemli!)
// ============================================

// 1. Logger Middleware (En başta - tüm istekleri logla)
app.use(logger);

// 2. Body Parser Middleware'leri
// POST/PUT isteklerinde gönderilen form verilerini parse eder
// Neden gerekli?
// - Form verileri req.body'de olmaz
// - express.urlencoded() → application/x-www-form-urlencoded formatını parse eder
// - express.json() → application/json formatını parse eder

// URL-encoded form verileri için (HTML form'ları)
app.use(express.urlencoded({ extended: true }));
// extended: true → nested object'leri destekler
// extended: false → sadece basit key-value çiftleri

// JSON verileri için (API istekleri)
app.use(express.json());

// 3. Method Override Middleware
// HTML form'ları sadece GET ve POST destekler
// PUT ve DELETE için method-override kullanılır
// Form'da: <input type="hidden" name="_method" value="PUT">
// Veya query string: ?_method=PUT
app.use(methodOverride('_method'));

// 4. EJS ve Layout Ayarları
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');
app.use(expressLayouts);

// 5. Statik dosyalar (CSS, JS, images)
// public/ klasöründeki dosyalar doğrudan erişilebilir
// Örnek: /css/style.css → public/css/style.css
app.use(express.static('public'));

// ============================================
// ROUTES (Route tanımlamaları)
// ============================================

// Home routes (Ana sayfa)
// Tüm / ile başlayan istekler homeRoutes'a yönlendirilir
app.use('/', homeRoutes);

// User routes
// Tüm /users ile başlayan istekler userRoutes'a yönlendirilir
app.use('/users', userRoutes);

// Product routes
// Tüm /products ile başlayan istekler productRoutes'a yönlendirilir
app.use('/products', productRoutes);

// Bolge routes
// Tüm /bolge ile başlayan istekler bolgeRoutes'a yönlendirilir
app.use('/bolge', bolgeRoutes);

// ============================================
// ERROR HANDLING (En sonda!)
// ============================================

// 404 Handler (Tanımlanmamış route'lar için)
app.use(notFoundHandler);

// Global Error Handler (Tüm hataları yakalar)
app.use(errorHandler);

// ============================================
// SERVER BAŞLATMA
// ============================================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Sunucu ${PORT} portunda çalışıyor...`);
    console.log(`📍 http://localhost:${PORT}`);
});