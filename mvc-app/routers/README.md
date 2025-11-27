# Routers Klasörü

## Amaç
Router dosyaları, URL route'larını organize eder ve modülerlik sağlar.

## Sorumluluklar
- URL pattern'lerini tanımlamak
- HTTP metodlarını (GET, POST, PUT, DELETE) route'lara bağlamak
- Controller metodlarını route'lara bağlamak
- Route parametrelerini ve query string'leri yönetmek

## Dosya Yapısı
Her model için bir router dosyası oluşturulur:
- `userRoutes.js` - Kullanıcı route'ları
- `productRoutes.js` - Ürün route'ları

## Örnek Kullanım
```javascript
// routers/userRoutes.js
import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/', userController.index);
router.get('/:id', userController.show);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;
```

## RESTful Routing Pattern
- `GET /users` - Tüm kullanıcıları listele
- `GET /users/:id` - Belirli bir kullanıcıyı göster
- `POST /users` - Yeni kullanıcı oluştur
- `PUT /users/:id` - Kullanıcı güncelle
- `DELETE /users/:id` - Kullanıcı sil

## Route Parametreleri

### Tanımlama
```javascript
router.get('/users/:id', controller.show)
```

### Kullanım
```javascript
// URL: /users/5
// req.params.id = "5"
const id = parseInt(req.params.id)
```

### Çoklu Parametreler
```javascript
router.get('/users/:userId/posts/:postId', controller.showPost)
// URL: /users/5/posts/10
// req.params = { userId: "5", postId: "10" }
```

## Query String'ler

### Tanımlama
Query string'ler route tanımında belirtilmez, otomatik olarak `req.query`'de bulunur.

### Kullanım
```javascript
// URL: /users?page=1&limit=10&search=john
// req.query = { page: "1", limit: "10", search: "john" }

const page = parseInt(req.query.page) || 1
const limit = parseInt(req.query.limit) || 10
const search = req.query.search || ''
```

### Örnekler
- `GET /users?page=2` - 2. sayfa
- `GET /users?limit=20` - Sayfa başına 20 kayıt
- `GET /users?search=john` - "john" içeren kullanıcıları ara
- `GET /users?page=1&limit=10&search=john` - Kombinasyon

## Route Sırası Önemi

Route'lar yukarıdan aşağıya sırayla kontrol edilir. Bu yüzden sıralama önemlidir:

```javascript
// ✅ DOĞRU: Özel route'lar önce
router.get('/create', userController.create)  // /users/create
router.get('/:id', userController.show)        // /users/5

// ❌ YANLIŞ: Parametreli route önce
router.get('/:id', userController.show)        // /users/create → :id = "create" olur!
router.get('/create', userController.create)   // Hiç çalışmaz
```

## Notlar
- Express Router kullanılır
- Route'lar app.js'te bağlanır: `app.use('/users', userRoutes)`
- Route parametreleri `req.params` ile alınır
- Query string'ler `req.query` ile alınır
- Route sırası önemlidir (özel route'lar önce tanımlanmalı)
