# Middlewares Klasörü

## Amaç
Middleware'ler, request-response döngüsünde ara işlemler yapmak için kullanılır.

## Sorumluluklar
- Request'leri işlemeden önce kontrol etmek
- Authentication (kimlik doğrulama)
- Logging (kayıt tutma)
- Error handling (hata yönetimi)
- Validation (doğrulama)
- Request'i değiştirmek veya zenginleştirmek

## Dosya Yapısı
- `logger.js` - Request loglama
- `errorHandler.js` - Merkezi hata yönetimi
- `auth.js` - Kimlik doğrulama (ileri seviye)
- `validator.js` - Veri doğrulama (ileri seviye)

## Örnek Kullanım
```javascript
// middlewares/logger.js
export const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next(); // Bir sonraki middleware'e geç
};
```

## Middleware Sırası
Middleware'ler sırayla çalışır. `next()` çağrılmazsa, zincir durur.

```javascript
app.use(logger);        // 1. Önce logger çalışır
app.use(express.json()); // 2. Sonra body parser
app.use('/users', userRoutes); // 3. En son route'lar
```

## Notlar
- `next()` fonksiyonu mutlaka çağrılmalıdır (hata durumları hariç)
- Middleware sırası önemlidir
- Global middleware'ler tüm route'larda çalışır
- Route-specific middleware'ler sadece belirli route'larda çalışır

