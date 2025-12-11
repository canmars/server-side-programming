# CRUD API ve Web Arayüzü Öğrenme Rehberi
## 11 Aralık 2024

Bu rehber, adım adım CRUD (Create, Read, Update, Delete) API ve etkileşimli web arayüzü geliştirmeyi öğretir.

---

## BÖLÜM 1: API Temelleri (READ İşlemi)

### ADIM 1: Model Oluşturma - Veritabanından Veri Çekme

**Etkilenen Dosya:** `models/ogrenciModel.js` (yeni oluşturuldu)

**Ne Öğrendik:**
- MySQL connection pool kullanımı
- `async/await` ile asenkron veritabanı sorgusu
- SQL SELECT sorgusu

**Yapılan İşlem:**
- `getAllOgrenciler()` fonksiyonu oluşturuldu
- `pool.query()` ile veritabanı sorgusu yapıldı
- Sonuçlar döndürüldü

**POSTMAN Test:** Henüz yok

---

### ADIM 2: Controller Oluşturma - İş Mantığı Katmanı

**Etkilenen Dosya:** `controllers/ogrenciController.js` (yeni oluşturuldu)

**Ne Öğrendik:**
- Controller'ın rolü (Model ve Route arasında köprü)
- `try-catch` ile hata yönetimi
- Express response gönderme (`res.json()`)

**Yapılan İşlem:**
- `getAllOgrencilerController` fonksiyonu oluşturuldu
- Model fonksiyonu çağrıldı
- HTTP response formatı oluşturuldu

**POSTMAN Test:** Henüz yok

---

### ADIM 3: Route Oluşturma - API Endpoint Tanımlama

**Etkilenen Dosya:** `routers/ogrenciRoutes.js` (yeni oluşturuldu)

**Ne Öğrendik:**
- Express Router kullanımı
- GET endpoint tanımlama
- Route yapısı

**Yapılan İşlem:**
- `GET /api/ogrenciler` endpoint'i oluşturuldu
- Controller fonksiyonu route'a bağlandı

**POSTMAN Test:**
1. POSTMAN'i açın
2. Yeni bir GET request oluşturun
3. URL: `http://localhost:3000/api/ogrenciler`
4. Send butonuna tıklayın
5. Response'u kontrol edin (tüm öğrenciler listelenmeli)

---

### ADIM 4: Route'u Ana Uygulamaya Bağlama

**Etkilenen Dosya:** `app.js` (güncellendi)

**Ne Öğrendik:**
- Express'te route bağlama (`app.use()`)
- Middleware sıralaması (route'lar error handler'lardan önce olmalı)

**Yapılan İşlem:**
- `app.use('/api/ogrenciler', ogrenciRoutes)` satırı eklendi
- Route import edildi

**POSTMAN Test:**
- Adım 3'teki testi tekrar edin, çalıştığını doğrulayın

---

## BÖLÜM 2: Frontend Temelleri (API'den Veri Çekme)

### ADIM 5: HTML Sayfası Oluşturma

**Etkilenen Dosya:** `views/ogrenciler.html` (yeni oluşturuldu)

**Ne Öğrendik:**
- HTML form yapısı
- HTML tablo yapısı (`<table>`, `<thead>`, `<tbody>`)
- JavaScript dosyası bağlama (`<script>` tag'i)

**Yapılan İşlem:**
- Boş tablo ve form yapısı oluşturuldu
- JavaScript dosyası bağlandı

**POSTMAN Test:** Gerek yok

---

### ADIM 6: JavaScript ile API Çağrısı - fetch() ve async/await

**Etkilenen Dosya:** `public/js/ogrenciler.js` (yeni oluşturuldu)

**Ne Öğrendik:**
- `fetch()` API kullanımı
- `async/await` syntax (frontend)
- `response.json()` ile JSON parse etme
- `DOMContentLoaded` event

**Yapılan İşlem:**
- `loadOgrenciler()` fonksiyonu oluşturuldu
- API'den veri çekildi ve console'a yazdırıldı

**Test:**
1. Tarayıcıda `http://localhost:3000/ogrenciler` sayfasını açın
2. F12 ile Developer Tools'u açın
3. Console sekmesine gidin
4. API'den gelen veriyi görmelisiniz

---

### ADIM 7: DOM Manipülasyonu - Tabloyu Dinamik Doldurma

**Etkilenen Dosya:** `public/js/ogrenciler.js` (güncellendi)

**Ne Öğrendik:**
- `document.querySelector()` - Element bulma
- `document.createElement()` - Yeni element oluşturma
- `appendChild()` - Element'e child ekleme
- `innerHTML` - Element içeriğini değiştirme
- Template literals (backtick `` ` `` ile dinamik string)

**Yapılan İşlem:**
- `renderOgrenciler()` fonksiyonu eklendi
- API'den gelen veri tabloya yazdırıldı

**Test:**
1. Tarayıcıda sayfayı yenileyin
2. Tabloda öğrenci listesini görmelisiniz

---

### ADIM 8: Frontend Route Ekleme

**Etkilenen Dosya:** `routers/homeRoutes.js` (güncellendi)

**Ne Öğrendik:**
- HTML dosyası gönderme (`res.sendFile()`)
- Route tanımlama

**Yapılan İşlem:**
- `GET /ogrenciler` route'u eklendi

**Test:**
1. Tarayıcıda `http://localhost:3000/ogrenciler` sayfasını açın
2. Sayfa yüklenmeli ve öğrenci listesi görünmeli

---

## BÖLÜM 3: CREATE İşlemi (Yeni Kayıt Ekleme)

### ADIM 9: Model'e Create Fonksiyonu Ekleme

**Etkilenen Dosya:** `models/ogrenciModel.js` (güncellendi)

**Ne Öğrendik:**
- SQL INSERT sorgusu
- Parametreli sorgular (SQL injection koruması)
- `?` placeholder kullanımı

**Yapılan İşlem:**
- `createOgrenci()` fonksiyonu eklendi
- INSERT sorgusu yazıldı

**POSTMAN Test:** Henüz yok

---

### ADIM 10: Controller'a Create Fonksiyonu Ekleme

**Etkilenen Dosya:** `controllers/ogrenciController.js` (güncellendi)

**Ne Öğrendik:**
- `req.body` ile POST verilerini alma
- Validation (doğrulama) yapma
- HTTP status kodları (201 Created)

**Yapılan İşlem:**
- `createOgrenciController` fonksiyonu eklendi
- Validation eklendi

**POSTMAN Test:** Henüz yok

---

### ADIM 11: Route'a POST Endpoint Ekleme

**Etkilenen Dosya:** `routers/ogrenciRoutes.js` (güncellendi)

**Ne Öğrendik:**
- POST endpoint tanımlama
- HTTP method farkları (GET vs POST)

**Yapılan İşlem:**
- `POST /api/ogrenciler` endpoint'i eklendi

**POSTMAN Test:**
1. POSTMAN'de yeni bir POST request oluşturun
2. URL: `http://localhost:3000/api/ogrenciler`
3. Body sekmesine gidin
4. "raw" seçin ve "JSON" formatını seçin
5. Şu JSON'u yazın:
```json
{
  "Ogr_No": 999999,
  "Ogr_Ad": "Test",
  "Ogr_Soyad": "Öğrenci",
  "Ogr_Giris_Tarih": "2024-09-15",
  "Bolum_Kod": 100,
  "Fakulte_Kod": 100,
  "Ogr_Tel": 5555555,
  "Ogr_Adres": "Test Adres",
  "Ogr_Dosya_No": 99999,
  "Tur_Kod": 1,
  "Durum_Kod": 1
}
```
6. Send butonuna tıklayın
7. Response'u kontrol edin (201 Created ve yeni öğrenci bilgisi dönmeli)

---

### ADIM 12: Frontend'e Form Ekleme

**Etkilenen Dosya:** `views/ogrenciler.html` (güncellendi - zaten vardı)

**Ne Öğrendik:**
- HTML form yapısı (`<form>`, `<input>`, `<label>`)
- Input tipleri (`text`, `number`, `date`)
- Form elementleri (`name`, `id`, `required`)

**Yapılan İşlem:**
- Form zaten mevcuttu, yapısı öğrenildi

**POSTMAN Test:** Gerek yok

---

### ADIM 13: Form Submit İşlemi - Event Listener

**Etkilenen Dosya:** `public/js/ogrenciler.js` (güncellendi)

**Ne Öğrendik:**
- `addEventListener()` ile event dinleme
- `preventDefault()` ile form'un varsayılan davranışını engelleme
- Form submit event handling

**Yapılan İşlem:**
- `setupFormListener()` fonksiyonu zaten vardı
- `handleFormSubmit()` fonksiyonu oluşturuldu

**POSTMAN Test:** Gerek yok

---

### ADIM 14: Form Verilerini API'ye Gönderme

**Etkilenen Dosya:** `public/js/ogrenciler.js` (güncellendi)

**Ne Öğrendik:**
- `fetch()` ile POST isteği
- `method: 'POST'` kullanımı
- `headers: { 'Content-Type': 'application/json' }`
- `body: JSON.stringify()` ile JavaScript objesini JSON'a çevirme
- `FormData` API kullanımı

**Yapılan İşlem:**
- Form verileri alındı
- JSON formatına çevrildi
- API'ye POST isteği gönderildi

**Test:**
1. Tarayıcıda formu doldurun
2. "Öğrenci Ekle" butonuna tıklayın
3. Öğrenci listesinin güncellendiğini görmelisiniz
4. Başarı mesajı görünmeli

---

## BÖLÜM 4: UPDATE İşlemi (Kayıt Güncelleme)

### ADIM 15: Model'e Update Fonksiyonu Ekleme

**Etkilenen Dosya:** `models/ogrenciModel.js` (güncellendi)

**Ne Öğrendik:**
- SQL UPDATE sorgusu
- WHERE koşulu (hangi kayıt güncellenecek)
- `affectedRows` ile etkilenen satır sayısı kontrolü

**Yapılan İşlem:**
- `updateOgrenci()` fonksiyonu eklendi

**POSTMAN Test:** Henüz yok

---

### ADIM 16: Controller'a Update Fonksiyonu Ekleme

**Etkilenen Dosya:** `controllers/ogrenciController.js` (güncellendi)

**Ne Öğrendik:**
- `req.params` ile URL parametrelerini alma
- Route parametreleri (`:id`)

**Yapılan İşlem:**
- `updateOgrenciController` fonksiyonu eklendi

**POSTMAN Test:** Henüz yok

---

### ADIM 17: Route'a PUT Endpoint Ekleme

**Etkilenen Dosya:** `routers/ogrenciRoutes.js` (güncellendi)

**Ne Öğrendik:**
- PUT endpoint tanımlama
- Route parametreleri (`:id`)

**Yapılan İşlem:**
- `PUT /api/ogrenciler/:id` endpoint'i eklendi

**POSTMAN Test:**
1. POSTMAN'de yeni bir PUT request oluşturun
2. URL: `http://localhost:3000/api/ogrenciler/999999` (daha önce eklediğiniz öğrenci numarası)
3. Body sekmesine gidin, "raw" ve "JSON" seçin
4. Şu JSON'u yazın (sadece güncellenecek alanlar):
```json
{
  "Ogr_Ad": "Güncellenmiş",
  "Ogr_Soyad": "İsim",
  "Ogr_Giris_Tarih": "2024-09-15",
  "Bolum_Kod": 100,
  "Fakulte_Kod": 100,
  "Ogr_Tel": 6666666,
  "Ogr_Adres": "Yeni Adres",
  "Ogr_Dosya_No": 99999,
  "Tur_Kod": 1,
  "Durum_Kod": 1
}
```
5. Send butonuna tıklayın
6. Response'u kontrol edin (güncellenmiş öğrenci bilgisi dönmeli)

---

### ADIM 18: Frontend'e Düzenleme Butonu ve Formu Ekleme

**Etkilenen Dosya:** `views/ogrenciler.html` (zaten vardı)

**Ne Öğrendik:**
- Düzenleme butonu yapısı
- Form'u mevcut verilerle doldurma

**Yapılan İşlem:**
- Düzenleme butonu zaten tabloda mevcuttu

**POSTMAN Test:** Gerek yok

---

### ADIM 19: Frontend'de Düzenleme İşlemi

**Etkilenen Dosya:** `public/js/ogrenciler.js` (güncellendi)

**Ne Öğrendik:**
- Form'u mevcut verilerle doldurma
- `fetch()` ile PUT isteği
- Düzenleme modu yönetimi

**Yapılan İşlem:**
- `handleEditOgrenci()` fonksiyonu eklendi
- Form submit handler'ı güncellendi (PUT desteği eklendi)

**Test:**
1. Tablodaki bir öğrencinin "Düzenle" butonuna tıklayın
2. Form'un o öğrencinin bilgileriyle doldurulduğunu görmelisiniz
3. Form başlığı "Öğrenci Düzenle" olmalı
4. Bilgileri değiştirip "Güncelle" butonuna tıklayın
5. Öğrenci listesinin güncellendiğini görmelisiniz

---

## BÖLÜM 5: DELETE İşlemi (Kayıt Silme)

### ADIM 20: Model'e Delete Fonksiyonu Ekleme

**Etkilenen Dosya:** `models/ogrenciModel.js` (güncellendi)

**Ne Öğrendik:**
- SQL DELETE sorgusu
- WHERE koşulunun önemi (WHERE olmadan TÜM kayıtlar silinir!)

**Yapılan İşlem:**
- `deleteOgrenci()` fonksiyonu eklendi

**POSTMAN Test:** Henüz yok

---

### ADIM 21: Controller'a Delete Fonksiyonu Ekleme

**Etkilenen Dosya:** `controllers/ogrenciController.js` (güncellendi)

**Ne Öğrendik:**
- DELETE işlemi için response yapısı
- DELETE'de genellikle data döndürülmez, sadece mesaj

**Yapılan İşlem:**
- `deleteOgrenciController` fonksiyonu eklendi

**POSTMAN Test:** Henüz yok

---

### ADIM 22: Route'a DELETE Endpoint Ekleme

**Etkilenen Dosya:** `routers/ogrenciRoutes.js` (güncellendi)

**Ne Öğrendik:**
- DELETE endpoint tanımlama

**Yapılan İşlem:**
- `DELETE /api/ogrenciler/:id` endpoint'i eklendi

**POSTMAN Test:**
1. POSTMAN'de yeni bir DELETE request oluşturun
2. URL: `http://localhost:3000/api/ogrenciler/999999` (silinecek öğrenci numarası)
3. Send butonuna tıklayın
4. Response'u kontrol edin (başarı mesajı dönmeli)
5. GET isteği ile öğrencinin silindiğini doğrulayın

---

### ADIM 23: Frontend'e Silme Butonu Ekleme

**Etkilenen Dosya:** `views/ogrenciler.html` (zaten vardı)

**Ne Öğrendik:**
- Silme butonu yapısı

**Yapılan İşlem:**
- Silme butonu zaten tabloda mevcuttu

**POSTMAN Test:** Gerek yok

---

### ADIM 24: Frontend'de Silme İşlemi

**Etkilenen Dosya:** `public/js/ogrenciler.js` (güncellendi)

**Ne Öğrendik:**
- `confirm()` ile onay alma
- `fetch()` ile DELETE isteği
- DOM'dan element kaldırma (liste yenilendiği için otomatik)

**Yapılan İşlem:**
- `handleDeleteOgrenci()` fonksiyonu eklendi

**Test:**
1. Tablodaki bir öğrencinin "Sil" butonuna tıklayın
2. Onay dialogu görünmeli
3. "Tamam" dediğinizde öğrenci silinmeli
4. Liste otomatik olarak güncellenmeli

---

## BÖLÜM 6: Tek Kayıt Getirme (GET by ID)

### ADIM 25: Model'e GetById Fonksiyonu Ekleme

**Etkilenen Dosya:** `models/ogrenciModel.js` (güncellendi)

**Ne Öğrendik:**
- WHERE koşulu ile tek kayıt getirme
- Tek kayıt kontrolü (kayıt yoksa hata)

**Yapılan İşlem:**
- `getOgrenciById()` fonksiyonu eklendi

**POSTMAN Test:** Henüz yok

---

### ADIM 26: Controller ve Route'a GET by ID Ekleme

**Etkilenen Dosyalar:** 
- `controllers/ogrenciController.js` (güncellendi)
- `routers/ogrenciRoutes.js` (güncellendi)

**Ne Öğrendik:**
- Route parametreleri kullanımı
- Route sıralaması önemi (`/:id` route'u `'/'` route'undan SONRA olmalı)

**Yapılan İşlem:**
- `getOgrenciByIdController` fonksiyonu eklendi
- `GET /api/ogrenciler/:id` endpoint'i eklendi

**POSTMAN Test:**
1. POSTMAN'de yeni bir GET request oluşturun
2. URL: `http://localhost:3000/api/ogrenciler/2014800647` (mevcut bir öğrenci numarası)
3. Send butonuna tıklayın
4. Response'u kontrol edin (tek öğrenci bilgisi dönmeli)

---

## ÖNEMLİ JAVASCRIPT ÖZELLİKLERİ ÖZETİ

### async/await
- Asenkron işlemleri yönetmek için kullanılır
- `async` fonksiyon tanımlar
- `await` Promise'in çözülmesini bekler

### fetch()
- HTTP istekleri göndermek için kullanılır
- Promise döner
- `method`, `headers`, `body` parametreleri alır

### document API
- `querySelector()` - Element bulma
- `createElement()` - Yeni element oluşturma
- `appendChild()` - Element'e child ekleme
- `innerHTML` - Element içeriğini değiştirme

### Event Listeners
- `addEventListener()` - Event dinleme
- `preventDefault()` - Varsayılan davranışı engelleme

### Form API
- `FormData` - Form verilerini alma
- `JSON.stringify()` - JavaScript objesini JSON'a çevirme

---

## YAYGIN HATALAR VE ÇÖZÜMLERİ

### Hata: "Cannot read property 'query' of undefined"
**Çözüm:** `db.js` dosyasında connection pool'un doğru export edildiğinden emin olun.

### Hata: "Route not found" veya 404
**Çözüm:** `app.js`'de route'un doğru bağlandığından emin olun. Route'lar error handler'lardan ÖNCE olmalı.

### Hata: "req.body is undefined"
**Çözüm:** `app.js`'de `express.json()` middleware'inin eklendiğinden emin olun.

### Hata: "CORS error" (tarayıcıda)
**Çözüm:** Bu projede CORS sorunu olmamalı çünkü aynı origin'den istek yapıyoruz. Eğer olursa, `app.js`'e CORS middleware'i ekleyin.

### Hata: Form submit edildiğinde sayfa yenileniyor
**Çözüm:** `event.preventDefault()` kullanıldığından emin olun.

### Hata: Tablo boş görünüyor
**Çözüm:** 
1. Console'da hata var mı kontrol edin (F12)
2. API'den veri geliyor mu kontrol edin (Network sekmesi)
3. `renderOgrenciler()` fonksiyonunun çağrıldığından emin olun

---

## POSTMAN TEST SENARYOLARI ÖZETİ

1. **GET Tüm Öğrenciler**
   - Method: GET
   - URL: `http://localhost:3000/api/ogrenciler`

2. **GET Tek Öğrenci**
   - Method: GET
   - URL: `http://localhost:3000/api/ogrenciler/2014800647`

3. **POST Yeni Öğrenci**
   - Method: POST
   - URL: `http://localhost:3000/api/ogrenciler`
   - Body: JSON (yukarıdaki örnek)

4. **PUT Öğrenci Güncelle**
   - Method: PUT
   - URL: `http://localhost:3000/api/ogrenciler/999999`
   - Body: JSON (güncellenecek alanlar)

5. **DELETE Öğrenci Sil**
   - Method: DELETE
   - URL: `http://localhost:3000/api/ogrenciler/999999`

---

## SONUÇ

Bu rehber ile:
- ✅ REST API oluşturmayı öğrendiniz
- ✅ Express.js ile backend geliştirmeyi öğrendiniz
- ✅ MySQL veritabanı işlemlerini öğrendiniz
- ✅ Vanilla JavaScript ile frontend geliştirmeyi öğrendiniz
- ✅ fetch(), async/await, DOM manipülasyonu gibi JavaScript özelliklerini öğrendiniz
- ✅ POSTMAN ile API test etmeyi öğrendiniz

Artık kendi CRUD uygulamalarınızı geliştirebilirsiniz!

