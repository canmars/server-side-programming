# Models Klasörü

## Amaç
Model katmanı, veritabanı işlemlerinden ve veri yönetiminden sorumludur.

## Sorumluluklar
- Veritabanı bağlantısı ve sorguları
- CRUD (Create, Read, Update, Delete) işlemleri
- Veri doğrulama (validation)
- SQL sorgularını güvenli hale getirme (prepared statements)

## Dosya Yapısı
Her veritabanı tablosu için bir model dosyası oluşturulur:
- `User.js` - Kullanıcı modeli
- `Product.js` - Ürün modeli

## Örnek Kullanım
```javascript
// models/User.js
class User {
  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  }
}
```

## Notlar
- Model'ler sadece veri işlemleri yapar, iş mantığı içermez
- Tüm SQL sorguları prepared statements kullanmalıdır (güvenlik)
- Hata yönetimi için try-catch kullanılmalıdır
- Static metodlar kullanılır (instance oluşturmaya gerek yok)

