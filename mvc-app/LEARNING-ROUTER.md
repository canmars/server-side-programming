# Router (Yönlendirici) Detaylı Açıklama

## Router Nedir?

**Router**, URL'leri (web adreslerini) Controller metodlarına bağlayan yapıdır.

### Basit Örnek:

```
Kullanıcı: http://localhost:3000/bolge
           ↓
Router: "Bu URL'ye gelen istek, bolgeController.index() metodunu çalıştırsın"
           ↓
Controller: index() metodu çalışır
           ↓
Model: Veritabanından veri çeker
           ↓
View: HTML oluşturur
           ↓
Kullanıcı: Bölge listesini görür
```

---

## HTTP Metodları

Router, farklı HTTP metodlarını kullanır:

### 1. GET → Veri Okuma (Listele, Göster)

```javascript
// Tüm bölgeleri listele
router.get('/', bolgeController.index)
// URL: GET /bolge

// Belirli bir bölgeyi göster
router.get('/:id', bolgeController.show)
// URL: GET /bolge/5
```

**Ne Zaman Kullanılır?**
- Sayfa görüntüleme
- Veri listeleme
- Detay sayfası

**Örnek:**
- Tarayıcıda URL'ye gitmek
- Link'e tıklamak
- Sayfayı yenilemek

---

### 2. POST → Yeni Kayıt Oluşturma

```javascript
// Yeni bölge oluştur
router.post('/', bolgeController.store)
// URL: POST /bolge
```

**Ne Zaman Kullanılır?**
- Form gönderme (yeni kayıt)
- Dosya yükleme

**Örnek:**
```html
<form method="POST" action="/bolge">
  <input name="bolge_ad" value="Marmara">
  <button type="submit">Kaydet</button>
</form>
```

**Veri Nerede?**
- `req.body` → Form verileri burada
- Örnek: `req.body.bolge_ad = "Marmara"`

---

### 3. PUT → Kayıt Güncelleme

```javascript
// Bölge güncelle
router.put('/:id', bolgeController.update)
// URL: PUT /bolge/5
```

**Ne Zaman Kullanılır?**
- Mevcut kaydı güncelleme
- Form gönderme (güncelleme)

**ÖNEMLİ:** HTML form'ları sadece GET ve POST destekler!
PUT için `method-override` middleware gerekli.

**Örnek:**
```html
<form method="POST" action="/bolge/5?_method=PUT">
  <input type="hidden" name="_method" value="PUT">
  <input name="bolge_ad" value="Yeni Marmara">
  <button type="submit">Güncelle</button>
</form>
```

**Nasıl Çalışır?**
1. Form POST olarak gönderilir
2. `method-override` middleware, `?_method=PUT` parametresini görür
3. POST'u PUT'a çevirir
4. Router PUT route'unu çalıştırır

---

### 4. DELETE → Kayıt Silme

```javascript
// Bölge sil
router.delete('/:id', bolgeController.destroy)
// URL: DELETE /bolge/5
```

**Ne Zaman Kullanılır?**
- Kayıt silme
- Sil butonuna tıklama

**ÖNEMLİ:** HTML form'ları sadece GET ve POST destekler!
DELETE için `method-override` middleware gerekli.

**Örnek:**
```html
<form method="POST" action="/bolge/5?_method=DELETE">
  <button type="submit" onclick="return confirm('Emin misiniz?')">Sil</button>
</form>
```

---

## Route Parametreleri

### :id Nedir?

`:id` bir route parametresidir (değişken).

```javascript
router.get('/:id', bolgeController.show)
```

**Örnekler:**
- `/bolge/5` → `req.params.id = "5"`
- `/bolge/10` → `req.params.id = "10"`
- `/bolge/marmara` → `req.params.id = "marmara"`

**Kullanım:**
```javascript
export const show = async (req, res) => {
    const id = parseInt(req.params.id)  // "5" → 5 (number)
    const bolge = await Bolge.findById(id)
    // ...
}
```

### Çoklu Parametreler

```javascript
// Örnek: /bolge/5/il/10
router.get('/:bolge_id/il/:il_id', controller.showIl)

// Kullanım:
// req.params.bolge_id = "5"
// req.params.il_id = "10"
```

---

## Query String (Sorgu Parametreleri)

Query string, URL'nin sonundaki `?` işaretinden sonra gelen parametrelerdir.

### Örnek:

```
GET /bolge?page=2&limit=10&search=marmara
```

**Nasıl Alınır?**
```javascript
export const index = async (req, res) => {
    const page = req.query.page        // "2"
    const limit = req.query.limit      // "10"
    const search = req.query.search    // "marmara"
    
    // req.query = { page: "2", limit: "10", search: "marmara" }
}
```

**Kullanım:**
- Sayfalama: `?page=2`
- Arama: `?search=marmara`
- Filtreleme: `?limit=10`

---

## Route Sırası ÖNEMLİ!

Route'lar yukarıdan aşağıya sırayla kontrol edilir.

### ✅ DOĞRU SIRA:

```javascript
// 1. Özel route önce
router.get('/create', bolgeController.create)  // /bolge/create

// 2. Parametreli route sonra
router.get('/:id', bolgeController.show)       // /bolge/5
```

**Neden?**
- `/bolge/create` isteği geldiğinde
- Express önce `/create` route'unu kontrol eder → Bulur! ✅
- `/bolge/5` isteği geldiğinde
- Express önce `/create` route'unu kontrol eder → Bulamaz
- Sonra `/:id` route'unu kontrol eder → Bulur! ✅

### ❌ YANLIŞ SIRA:

```javascript
// 1. Parametreli route önce
router.get('/:id', bolgeController.show)       // /bolge/5

// 2. Özel route sonra
router.get('/create', bolgeController.create)  // /bolge/create (HİÇ ÇALIŞMAZ!)
```

**Neden?**
- `/bolge/create` isteği geldiğinde
- Express önce `/:id` route'unu kontrol eder
- `:id = "create"` olarak algılanır
- `show("create")` çalışır (yanlış!)
- `/create` route'u hiç kontrol edilmez ❌

---

## RESTful Routing Pattern

RESTful, standart bir route yapısıdır.

### Standart Route'lar:

| HTTP Metodu | URL | Controller Metodu | Açıklama |
|------------|-----|-------------------|----------|
| GET | `/bolge` | `index` | Tüm bölgeleri listele |
| GET | `/bolge/create` | `create` | Yeni bölge formu |
| POST | `/bolge` | `store` | Yeni bölge oluştur |
| GET | `/bolge/:id` | `show` | Belirli bölgeyi göster |
| GET | `/bolge/:id/edit` | `edit` | Bölge düzenleme formu |
| PUT | `/bolge/:id` | `update` | Bölge güncelle |
| DELETE | `/bolge/:id` | `destroy` | Bölge sil |

**Neden Bu Yapı?**
- Standart ve tutarlı
- Kolay anlaşılır
- Herkes aynı pattern'i kullanır

---

## Router Nasıl Çalışır?

### 1. Router Oluşturma:

```javascript
import express from 'express'
const router = express.Router()
```

### 2. Route Tanımlama:

```javascript
router.get('/', bolgeController.index)
```

**Ne Yapar?**
- `router.get()` → GET istekleri için route tanımla
- `'/'` → URL pattern (ana sayfa)
- `bolgeController.index` → Çalıştırılacak metod

### 3. Router'ı Bağlama (app.js'te):

```javascript
import bolgeRoutes from './routers/bolgeRoutes.js'
app.use('/bolge', bolgeRoutes)
```

**Ne Yapar?**
- `/bolge` ile başlayan tüm istekler `bolgeRoutes`'a yönlendirilir
- `/bolge` → `router.get('/')` → `bolgeController.index`
- `/bolge/5` → `router.get('/:id')` → `bolgeController.show`

---

## Örnek Akış

### Senaryo: Kullanıcı bölge listesini görmek istiyor

```
1. Kullanıcı: http://localhost:3000/bolge
           ↓
2. Express: app.use('/bolge', bolgeRoutes) → bolgeRoutes'a yönlendir
           ↓
3. Router: router.get('/', ...) → '/' route'unu bul
           ↓
4. Controller: bolgeController.index() çalıştır
           ↓
5. Model: Bolge.findAll() → Veritabanından tüm bölgeleri çek
           ↓
6. Controller: res.render('bolge/index', { bolgeler })
           ↓
7. View: views/bolge/index.ejs render edilir
           ↓
8. Kullanıcı: HTML sayfasını görür (bölge listesi)
```

---

## Özet

1. **Router** = URL'leri Controller metodlarına bağlar
2. **HTTP Metodları** = GET (okuma), POST (oluşturma), PUT (güncelleme), DELETE (silme)
3. **Route Parametreleri** = `:id` gibi değişkenler
4. **Query String** = `?page=2` gibi parametreler
5. **Route Sırası** = Özel route'lar önce, parametreli route'lar sonra
6. **RESTful** = Standart route yapısı

