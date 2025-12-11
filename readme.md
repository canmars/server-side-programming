# Server-Side Programming - MVC Template

Temiz bir başlangıç için hazırlanmış MVC (Model-View-Controller) mimarisi ile Node.js/Express.js uygulaması.

## 📁 Proje Yapısı

```
server-side-programming/
├── app.js                    # Ana uygulama dosyası
├── package.json              # Proje bağımlılıkları
├── README.md                 # Bu dosya
│
├── controllers/              # Controller katmanı (boş - yeni controller'lar ekleyebilirsiniz)
├── models/                   # Model katmanı (boş - yeni model'ler ekleyebilirsiniz)
├── views/                    # View katmanı (HTML dosyaları)
│   ├── index.html           # Ana sayfa
│   └── error.html           # Hata sayfası
│
├── routers/                  # Route tanımlamaları
│   └── homeRoutes.js        # Ana sayfa route'ları
│
├── middlewares/              # Middleware fonksiyonları
│   ├── errorHandler.js      # Hata yönetimi
│   └── logger.js            # Loglama
│
├── db/                       # Veritabanı dosyaları
│   └── db.js                # MySQL connection pool
│
└── public/                   # Statik dosyalar
    └── css/
        └── style.css         # CSS dosyaları
```

## 🚀 Kurulum

### Gereksinimler

- Node.js (v14 veya üzeri)
- MySQL (v5.7 veya üzeri) - İsteğe bağlı
- npm veya yarn

### Adımlar

1. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

2. **Environment variables (.env) oluşturun:**
   Proje kök dizininde `.env` dosyası oluşturun:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=your_database
   PORT=3000
   NODE_ENV=development
   ```

3. **Uygulamayı başlatın:**
   ```bash
   npm start
   ```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

## 🏗️ MVC Mimarisi

Bu proje, MVC (Model-View-Controller) mimarisine uygun olarak organize edilmiştir:

- **Model:** Veritabanı işlemleri (`models/`)
- **View:** Kullanıcı arayüzü (`views/` - HTML dosyaları)
- **Controller:** İş mantığı (`controllers/`)
- **Router:** URL yönetimi (`routers/`)

## 🛠️ Kullanılan Teknolojiler

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **HTML** - View dosyaları
- **MySQL** - Veritabanı (isteğe bağlı)
- **mysql2** - MySQL driver
- **dotenv** - Environment variables
- **method-override** - HTTP method override

## 📝 Yeni Özellik Ekleme

### Yeni Controller Ekleme

1. `controllers/` klasörüne yeni controller dosyası ekleyin
2. `routers/` klasörüne yeni route dosyası ekleyin
3. `app.js` dosyasına route'u bağlayın

### Yeni Model Ekleme

1. `models/` klasörüne yeni model dosyası ekleyin
2. `db/db.js` connection pool'unu kullanın

### Yeni View Ekleme

1. `views/` klasörüne yeni HTML dosyası ekleyin
2. Router'dan `res.sendFile()` ile gönderin

## 📄 Lisans

ISC
