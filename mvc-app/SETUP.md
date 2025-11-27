# Kurulum ve Başlangıç Rehberi

## Gereksinimler

- Node.js (v14 veya üzeri)
- MySQL (v5.7 veya üzeri)
- npm veya yarn

## Kurulum Adımları

### 1. Bağımlılıkları Yükle

```bash
npm install
```

### 2. Veritabanı Kurulumu

1. MySQL'de yeni bir veritabanı oluşturun:
```sql
CREATE DATABASE mvc_app;
```

2. `db/schema.sql` dosyasını çalıştırarak tabloları oluşturun:
```bash
mysql -u root -p mvc_app < db/schema.sql
```

Veya MySQL Workbench'te `db/schema.sql` dosyasını açıp çalıştırın.

### 3. Environment Variables (.env)

Proje kök dizininde `.env` dosyası oluşturun:

```env
# Veritabanı Ayarları
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=mvc_app

# Server Ayarları
PORT=3000

# Environment
NODE_ENV=development
```

### 4. Uygulamayı Başlat

```bash
npm start
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

## Test

### Veritabanı Bağlantısını Test Et

```bash
node db/test-connection.js
```

### Uygulamayı Test Et

1. Ana Sayfa: http://localhost:3000
2. Kullanıcı Listesi: http://localhost:3000/users
3. Yeni Kullanıcı Ekle: http://localhost:3000/users/create

## Sorun Giderme

### Veritabanı Bağlantı Hatası

- `.env` dosyasının doğru yapılandırıldığından emin olun
- MySQL servisinin çalıştığından emin olun
- Veritabanı kullanıcısının doğru yetkilere sahip olduğundan emin olun

### Port Zaten Kullanılıyor

- `.env` dosyasında farklı bir PORT değeri kullanın
- Veya kullanan uygulamayı durdurun

### Module Not Found Hatası

```bash
npm install
```

## Proje Yapısı

```
mvc-app/
├── app.js              # Ana uygulama dosyası
├── controllers/        # Controller katmanı
├── models/             # Model katmanı
├── views/              # View katmanı (EJS templates)
├── routers/            # Route tanımlamaları
├── middlewares/        # Middleware fonksiyonları
├── helpers/            # Yardımcı fonksiyonlar
├── db/                 # Veritabanı dosyaları
└── public/             # Statik dosyalar
```

## MVC Akışı

1. **Request** → Router → Controller
2. **Controller** → Model (veri çek/gönder)
3. **Controller** → View (veri gönder)
4. **View** → HTML render → Response

## Öğrenme Kaynakları

- `readme.md` - MVC kavramları ve açıklamalar
- `views/EJS-SYNTAX.md` - EJS template syntax rehberi
- Her klasördeki `README.md` dosyaları - Klasör açıklamaları

