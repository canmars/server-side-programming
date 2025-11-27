# DB Klasörü

## Amaç
Veritabanı bağlantı dosyalarını içerir.

## Sorumluluklar
- Veritabanı bağlantı yapılandırması
- Connection pool yönetimi
- Veritabanı bağlantı testi

## Dosya Yapısı
- `db.js` - MySQL bağlantı pool'u

## Örnek Kullanım
```javascript
// db/db.js
import pool from './db.js';

// Model'de kullanım
const [rows] = await pool.query('SELECT * FROM users');
```

## Notlar
- Connection pooling kullanılır (performans için)
- Environment variables ile güvenli yapılandırma
- Tüm modeller bu pool'u kullanır
- Prepared statements kullanılmalıdır (güvenlik)

