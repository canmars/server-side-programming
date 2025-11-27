

---
CRUD
POST - GET - PUT - DELETE


GET: hiçbir şey göndermeden almak
POST: bir şey gönderip almak.müşteri id gönderip.
PUT: veri güncellemek istediğimizde, genelde bu kullanılır.
PATCH: veri güncellemek istediğimizde
DELETE



express.js


### gelen-giden-istekleri 2'ye ayırma

response geldi:
web sitesi mi istiyor veri mi istiyor?
gelen istek bakımından frontend-backend ayrımı

1.html

2.api
    response tipi veri istiyorsa.

https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods

postman

github push
nodejs giris


---

## Hafta 8

# MVC (Model-View-Controller) Mimarisi

## MVC Nedir?

MVC (Model-View-Controller), yazılım geliştirmede kullanılan bir mimari desendir. Uygulamayı üç ana bileşene ayırarak kod organizasyonunu sağlar:

### 1. Model (Model)
**Görevi:** Veri ve veritabanı işlemlerinden sorumludur.

**Sorumlulukları:**
- Veritabanı bağlantısı ve sorguları
- Veri doğrulama (validation)
- Veri işleme mantığı
- Veritabanı CRUD (Create, Read, Update, Delete) işlemleri

**Önemli Not:** Model, sadece veri işlemleriyle ilgilenir. İş mantığı (business logic) Controller'da olmalıdır.

**Örnek:** Kullanıcı bilgilerini veritabanından çekmek, yeni kullanıcı eklemek, kullanıcı bilgilerini güncellemek.

### 2. View (Görünüm)
**Görevi:** Kullanıcı arayüzü ve görsel sunumdan sorumludur.

**Sorumlulukları:**
- HTML template'leri
- Kullanıcıya gösterilecek verilerin formatlanması
- Formlar ve kullanıcı etkileşimleri
- Statik dosyalar (CSS, JavaScript, resimler)

**Önemli Not:** View, sadece veri gösterir. Veri işleme yapmaz, sadece Controller'dan gelen verileri kullanıcıya sunar.

**Örnek:** Kullanıcı listesi sayfası, kullanıcı detay sayfası, kullanıcı ekleme formu.

### 3. Controller (Kontrolcü)
**Görevi:** Model ve View arasında köprü görevi görür, iş mantığını yönetir.

**Sorumlulukları:**
- Kullanıcı isteklerini (request) almak
- İstekleri anlamak ve işlemek
- Model'den veri çekmek veya veri göndermek
- View'a uygun verileri göndermek
- Response (yanıt) oluşturmak

**Önemli Not:** Controller, Model ve View'ı birbirine bağlar ama onların birbirleriyle doğrudan iletişim kurmasına izin vermez.

**Örnek:** `/users` isteği geldiğinde, Controller User Model'inden tüm kullanıcıları çeker ve users/index View'ına gönderir.

## MVC Akışı (Request-Response Döngüsü)

### Senaryo: Kullanıcı Listesi Görüntüleme

1. **Kullanıcı isteği:** Kullanıcı tarayıcıda `/users` URL'sine gider (GET request)

2. **Routing:** Express Router, bu isteği yakalar ve ilgili route'a yönlendirir
   ```
   GET /users → userRoutes.js → userController.index
   ```

3. **Controller:** `userController.index` metodu çalışır
   - Request'i analiz eder
   - `User.findAll()` metodunu çağırarak Model'den veri ister

4. **Model:** `User.findAll()` metodu veritabanına SQL sorgusu gönderir
   - Veritabanından tüm kullanıcıları çeker
   - Verileri Controller'a döndürür

5. **Controller:** Model'den gelen verileri alır
   - Verileri işler (gerekirse formatlar, filtreler)
   - `res.render('users/index', { users })` ile View'a gönderir

6. **View:** EJS template engine, `users/index.ejs` dosyasını render eder
   - Controller'dan gelen `users` verisini kullanır
   - HTML oluşturur

7. **Response:** Oluşturulan HTML, kullanıcının tarayıcısına gönderilir

### Akış Diyagramı:
```
Kullanıcı → Router → Controller → Model → Veritabanı
                                    ↓
Kullanıcı ← HTML ← View ← Controller ← Model
```

## Neden MVC Kullanırız?

### 1. **Kod Organizasyonu**
- Her bileşenin kendi sorumluluğu vardır
- Kod bulmak ve anlamak kolaylaşır
- Proje büyüdükçe karmaşıklık artmaz

### 2. **Bakım Kolaylığı**
- Bir katmanda değişiklik yapmak, diğer katmanları etkilemez
- Hata bulmak ve düzeltmek daha kolaydır
- Kod tekrarı azalır

### 3. **Test Edilebilirlik**
- Her katman bağımsız test edilebilir
- Model'i test etmek için Controller'a ihtiyaç yoktur
- Unit testler yazmak kolaylaşır

### 4. **Takım Çalışması**
- Farklı geliştiriciler farklı katmanlarda çalışabilir
- Frontend ve backend geliştiricileri birbirini engellemez
- Kod çakışmaları azalır

### 5. **Yeniden Kullanılabilirlik**
- Model'ler farklı Controller'larda kullanılabilir
- View'lar farklı Controller'lardan veri alabilir
- Kod tekrarı önlenir

### 6. **Modülerlik**
- Her bileşen bağımsız bir modül gibi çalışır
- Yeni özellikler eklemek kolaydır
- Mevcut kodu bozmadan genişletilebilir

## MVC Prensipleri

### 1. **Separation of Concerns (Sorumlulukların Ayrılması)**
Her katman sadece kendi işinden sorumludur:
- Model: Veri işlemleri
- View: Görsel sunum
- Controller: İş mantığı ve koordinasyon

### 2. **Loose Coupling (Gevşek Bağlılık)**
Katmanlar birbirine sıkı bağlı değildir:
- Model, Controller'dan bağımsızdır
- View, Model'den bağımsızdır
- Değişiklikler birbirini etkilemez

### 3. **Single Responsibility (Tek Sorumluluk)**
Her sınıf/fonksiyon sadece bir işi yapar:
- User Model sadece kullanıcı verileriyle ilgilenir
- UserController sadece kullanıcı işlemlerini yönetir
- users/index.ejs sadece kullanıcı listesini gösterir

## MVC'de İzolasyon

**Önemli:** MVC'de katmanlar birbirleriyle doğrudan iletişim kurmaz:

- ❌ View, Model'i doğrudan çağırmaz
- ❌ Model, View'ı doğrudan render etmez
- ❌ View ve Model birbirini tanımaz

**Doğru Akış:**
- ✅ View → Controller → Model
- ✅ Model → Controller → View
- ✅ Controller, Model ve View arasında köprü görevi görür

## Kod Tekrarını Önleme

MVC yapısı, kod tekrarını önlemek için:
- **Modüler yapı:** Her işlev ayrı bir modülde
- **Tekrar kullanılabilir fonksiyonlar:** Helper'lar ve utility'ler
- **Ortak bileşenler:** Layout'lar, partial'lar
- **Base class'lar:** Ortak metodlar için

## Projelerde MVC Yapısının Önemi

- ✅ Büyük projelerde kod organizasyonu sağlar
- ✅ Takım çalışmasını kolaylaştırır
- ✅ Bakım maliyetini düşürür
- ✅ Test yazmayı kolaylaştırır
- ✅ Ölçeklenebilirlik sağlar
- ✅ Endüstri standardıdır (çoğu framework MVC kullanır)


---

## Proje Yapısı

Bu proje, MVC mimarisine uygun olarak organize edilmiştir. Her klasörün kendi sorumluluğu vardır.

### Klasör Yapısı

```
mvc-app/
├── app.js                 # Ana uygulama dosyası (Express server)
├── package.json           # Proje bağımlılıkları
├── readme.md              # Bu dosya
│
├── controllers/           # Controller katmanı
│   ├── README.md         # Controller açıklamaları
│   ├── userController.js # Kullanıcı işlemleri (oluşturulacak)
│   └── productController.js # Ürün işlemleri (oluşturulacak)
│
├── models/               # Model katmanı
│   ├── README.md         # Model açıklamaları
│   ├── User.js           # Kullanıcı modeli (oluşturulacak)
│   └── Product.js        # Ürün modeli (oluşturulacak)
│
├── views/                # View katmanı (EJS templates)
│   ├── README.md         # View açıklamaları
│   ├── layouts/          # Layout dosyaları
│   │   └── main.ejs      # Ana layout
│   ├── users/            # Kullanıcı view'ları (oluşturulacak)
│   │   ├── index.ejs     # Kullanıcı listesi
│   │   ├── show.ejs      # Kullanıcı detay
│   │   ├── create.ejs    # Kullanıcı oluşturma formu
│   │   └── edit.ejs      # Kullanıcı düzenleme formu
│   └── index.ejs         # Ana sayfa
│
├── routers/              # Route tanımlamaları
│   ├── README.md         # Router açıklamaları
│   ├── userRoutes.js     # Kullanıcı route'ları (oluşturulacak)
│   └── productRoutes.js  # Ürün route'ları (oluşturulacak)
│
├── middlewares/          # Middleware fonksiyonları
│   ├── README.md         # Middleware açıklamaları
│   ├── logger.js         # Loglama middleware (oluşturulacak)
│   └── errorHandler.js   # Hata yönetimi middleware (oluşturulacak)
│
├── helpers/              # Yardımcı fonksiyonlar
│   ├── README.md         # Helper açıklamaları
│   ├── validation.js     # Validasyon helper'ları (oluşturulacak)
│   └── format.js         # Formatlama helper'ları (oluşturulacak)
│
├── utils/                # Genel yardımcı araçlar
│   ├── README.md         # Utils açıklamaları
│   └── constants.js      # Sabit değerler (oluşturulacak)
│
├── db/                   # Veritabanı bağlantı dosyaları
│   ├── README.md         # DB açıklamaları
│   └── db.js             # MySQL connection pool
│
└── public/               # Statik dosyalar
    ├── README.md         # Public açıklamaları
    ├── css/
    │   └── style.css     # CSS dosyaları
    └── js/
        └── main.js       # Client-side JavaScript (oluşturulacak)
```

### Klasör Açıklamaları

Her klasörün detaylı açıklaması için ilgili klasördeki `README.md` dosyasına bakabilirsiniz:

- **controllers/**: İş mantığı ve request/response yönetimi
- **models/**: Veritabanı işlemleri ve veri modelleri
- **views/**: EJS template dosyaları (kullanıcı arayüzü)
- **routers/**: Route tanımlamaları
- **middlewares/**: Ara katman fonksiyonları
- **helpers/**: Yardımcı fonksiyonlar
- **utils/**: Genel yardımcı araçlar
- **db/**: Veritabanı bağlantı dosyaları
- **public/**: Statik dosyalar (CSS, JS, images)

### Dosya İsimlendirme Kuralları

- **Controller dosyaları**: `camelCase` (örn: `userController.js`)
- **Model dosyaları**: `PascalCase` (örn: `User.js`)
- **View dosyaları**: `kebab-case` veya `camelCase` (örn: `index.ejs`, `user-list.ejs`)
- **Route dosyaları**: `camelCase` + `Routes` (örn: `userRoutes.js`)
- **Middleware dosyaları**: `camelCase` (örn: `errorHandler.js`)

---

## hafta 9 27 kasım

object oriented yaklasim


