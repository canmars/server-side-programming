# Login Sistemi Öğrenme Rehberi
## Adım Adım Login Sistemi Geliştirme

Bu rehber, login (giriş) sisteminin nasıl oluşturulduğunu adım adım açıklar.

---

## GENEL BAKIŞ

**Login Sistemi Ne Yapar?**
- Kullanıcıdan öğrenci numarası ve şifre alır
- Veritabanında öğrenciyi kontrol eder
- Başarılıysa kullanıcıyı sisteme alır
- Başarısızsa hata mesajı gösterir

**Akış:**
1. Kullanıcı login sayfasına gider
2. Öğrenci numarası ve şifre girer
3. Form gönderilir → API'ye POST isteği
4. Backend veritabanında kontrol eder
5. Başarılıysa → Ana sayfaya yönlendirilir
6. Başarısızsa → Hata mesajı gösterilir

---

## ADIM 1: Login HTML Sayfası Oluşturma

**Etkilenen Dosya:** `views/login.html` (yeni oluşturuldu)

**Ne Öğrendik:**
- HTML form yapısı
- Input tipleri (`number`, `password`)
- Form elementleri (`name`, `id`, `required`, `autofocus`)
- CSS stilleri (inline style)
- JavaScript dosyası bağlama (`<script>` tag'i)

**Yapılan İşlem:**
- Login formu oluşturuldu
- Öğrenci numarası input'u eklendi
- Şifre input'u eklendi
- Giriş butonu eklendi
- Hata mesajı kutusu eklendi
- Bilgi kutusu eklendi (sayfa yüklendiğinde ne olduğunu açıklar)

**Test:**
1. Tarayıcıda `http://localhost:3000/login` sayfasını açın
2. Login formunu görmelisiniz
3. F12 ile Console'u açın, sayfa yükleme mesajlarını görebilirsiniz

---

## ADIM 2: Login JavaScript Dosyası Oluşturma

**Etkilenen Dosya:** `public/js/login.js` (yeni oluşturuldu)

**Ne Öğrendik:**
- `DOMContentLoaded` event → Sayfa yüklendiğinde çalışır
- `addEventListener()` → Form submit event'ini dinleme
- `preventDefault()` → Form'un varsayılan davranışını engelleme
- `FormData` API → Form verilerini alma
- `fetch()` ile POST isteği → API'ye login isteği gönderme
- `window.location.href` → Sayfa yönlendirme
- DOM manipülasyonu → Hata mesajı gösterme/gizleme

**Yapılan İşlem:**
- `setupLoginForm()` fonksiyonu → Form submit event'ini dinler
- `handleLogin()` fonksiyonu → Login işlemini yönetir
- `showErrorMessage()` fonksiyonu → Hata mesajı gösterir
- `hideErrorMessage()` fonksiyonu → Hata mesajını gizler
- Detaylı console.log'lar eklendi (her adım açıklanıyor)

**Test:**
1. Login sayfasında F12 ile Console'u açın
2. Formu doldurup "Giriş Yap" butonuna tıklayın
3. Console'da her adımı görebilirsiniz:
   - Form verileri alınıyor
   - API'ye istek gönderiliyor
   - Sunucudan cevap bekleniyor
   - Başarılı/başarısız durum

---

## ADIM 3: Login Route Ekleme (Frontend)

**Etkilenen Dosya:** `routers/homeRoutes.js` (güncellendi)

**Ne Öğrendik:**
- HTML dosyası gönderme (`res.sendFile()`)
- Route tanımlama (`router.get()`)

**Yapılan İşlem:**
- `GET /login` route'u eklendi
- Login HTML sayfası gönderiliyor

**Etkilenen Kod:**
```javascript
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'))
})
```

**Test:**
1. Tarayıcıda `http://localhost:3000/login` sayfasını açın
2. Login sayfası görünmeli

---

## ADIM 4: Login Model Oluşturma

**Etkilenen Dosya:** `models/authModel.js` (yeni oluşturuldu)

**Ne Öğrendik:**
- Veritabanında öğrenci arama
- SQL SELECT sorgusu ile WHERE koşulu
- Parametreli sorgu (SQL injection koruması)
- `async/await` ile veritabanı sorgusu

**Yapılan İşlem:**
- `findOgrenciByNo()` fonksiyonu → Öğrenci numarası ile öğrenci arar
- `verifyPassword()` fonksiyonu → Şifre kontrolü (şimdilik basit)

**Etkilenen Kod:**
```javascript
export const findOgrenciByNo = async (ogrNo) => {
    const sql = 'SELECT * FROM ogrenci_bilgi WHERE Ogr_No = ?'
    const [rows] = await pool.query(sql, [ogrNo])
    // ...
}
```

**Test:** Henüz yok (Controller'dan çağrılacak)

---

## ADIM 5: Login Controller Oluşturma

**Etkilenen Dosya:** `controllers/authController.js` (yeni oluşturuldu)

**Ne Öğrendik:**
- `req.body` ile POST verilerini alma
- Validation (doğrulama) yapma
- Model fonksiyonunu çağırma
- HTTP response gönderme
- Hata yönetimi

**Yapılan İşlem:**
- `loginController()` fonksiyonu oluşturuldu
- Öğrenci numarası ve şifre kontrolü yapılıyor
- Model fonksiyonu çağrılıyor
- Başarılı/başarısız response döndürülüyor

**Etkilenen Kod:**
```javascript
export const loginController = async (req, res, next) => {
    const { ogrNo, password } = req.body
    const ogrenci = await findOgrenciByNo(ogrNo)
    // ...
}
```

**Test:** Henüz yok (Route'dan çağrılacak)

---

## ADIM 6: Login API Route Ekleme

**Etkilenen Dosya:** `routers/authRoutes.js` (yeni oluşturuldu)

**Ne Öğrendik:**
- Express Router oluşturma
- POST endpoint tanımlama
- Route'u controller'a bağlama

**Yapılan İşlem:**
- `POST /api/auth/login` endpoint'i oluşturuldu
- Controller fonksiyonu route'a bağlandı

**Etkilenen Kod:**
```javascript
router.post('/login', loginController)
```

**Etkilenen Dosya:** `app.js` (güncellendi)
- Auth route'u bağlandı: `app.use('/api/auth', authRoutes)`

**POSTMAN Test:**
1. POSTMAN'de yeni bir POST request oluşturun
2. URL: `http://localhost:3000/api/auth/login`
3. Body sekmesine gidin, "raw" ve "JSON" seçin
4. Şu JSON'u yazın:
```json
{
  "ogrNo": 2014800647,
  "password": "123456"
}
```
5. Send butonuna tıklayın
6. Response'u kontrol edin (başarılı giriş mesajı dönmeli)

---

## ADIM 7: Session Middleware (Hazırlık)

**Etkilenen Dosya:** `middlewares/auth.js` (yeni oluşturuldu)

**Ne Öğrendik:**
- Middleware yapısı
- Session kontrolü (ileride eklenecek)
- `next()` fonksiyonu → Bir sonraki middleware'e geçmek için

**Yapılan İşlem:**
- `requireAuth()` middleware'i oluşturuldu (şimdilik basit, ileride geliştirilecek)
- `redirectIfAuthenticated()` middleware'i oluşturuldu

**Not:** Şimdilik session kontrolü yok, ileride `express-session` paketi eklenecek.

---

## ADIM 8: Giriş Yapılmışsa Yönlendirme (İleride)

**Durum:** Şimdilik yapılmadı, ileride session eklendiğinde yapılacak.

**Ne Yapılacak:**
- Session kontrolü eklenecek
- Giriş yapmış kullanıcılar login sayfasına gidemeyecek
- Giriş yapmamış kullanıcılar korumalı sayfalara gidemeyecek

---

## KULLANICI AKIŞI

### Senaryo 1: Başarılı Giriş

1. **Kullanıcı:** `http://localhost:3000/login` sayfasına gider
2. **Sayfa yüklenir:** HTML ve JavaScript yüklenir
3. **Console'da görürsünüz:**
   ```
   📄 SAYFA YÜKLENDİ: DOMContentLoaded event tetiklendi!
   ✅ HTML hazır! Şimdi login formunu hazırlıyoruz...
   ```

4. **Kullanıcı:** Öğrenci numarası ve şifre girer
5. **Kullanıcı:** "Giriş Yap" butonuna tıklar
6. **Console'da görürsünüz:**
   ```
   🔐 LOGIN İŞLEMİ BAŞLATILIYOR
   📋 Form verileri alınıyor...
   🌐 API'ye istek gönderiliyor: POST /api/auth/login
   ```

7. **Backend çalışır:**
   ```
   🔐 LOGIN CONTROLLER ÇALIŞIYOR
   🔍 Model katmanına gidiliyor: findOgrenciByNo() çağrılıyor...
   🔍 VERİTABANI SORGUSU: Öğrenci Aranıyor
   ```

8. **Başarılı:** Ana sayfaya yönlendirilir (`/ogrenciler`)

### Senaryo 2: Başarısız Giriş

1-6. adımlar aynı
7. **Backend:** Öğrenci bulunamadı veya şifre yanlış
8. **Frontend:** Hata mesajı gösterilir
9. **Kullanıcı:** Tekrar deneyebilir

---

## ÖNEMLİ JAVASCRIPT ÖZELLİKLERİ

### FormData API
```javascript
const formData = new FormData(form)
const ogrNo = formData.get('ogrNo')
```
- Form verilerini almak için kullanılır
- `get()` metodu ile input değerlerini alırız

### fetch() ile POST İsteği
```javascript
const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginData)
})
```
- `method: 'POST'` → POST isteği gönderir
- `headers` → Content-Type belirtiriz
- `body` → JSON.stringify() ile JavaScript objesini JSON'a çeviririz

### window.location.href
```javascript
window.location.href = '/ogrenciler'
```
- Tarayıcıyı yeni bir sayfaya yönlendirir
- Sayfa yenilenir ve yeni sayfa yüklenir

---

## YAYGIN HATALAR VE ÇÖZÜMLERİ

### Hata: "Cannot read property 'get' of undefined"
**Çözüm:** Form elementinin doğru bulunduğundan emin olun. `document.querySelector('#loginForm')` ile kontrol edin.

### Hata: "Failed to load resource: 404"
**Çözüm:** `app.js`'de auth route'unun bağlandığından emin olun: `app.use('/api/auth', authRoutes)`

### Hata: "Öğrenci numarası bulunamadı!"
**Çözüm:** Veritabanında o öğrenci numarasının olduğundan emin olun. Test için: `2014800647`

### Hata: Form submit edildiğinde sayfa yenileniyor
**Çözüm:** `event.preventDefault()` kullanıldığından emin olun.

---

## TEST SENARYOLARI

### POSTMAN ile Test

1. **Başarılı Giriş:**
   - Method: POST
   - URL: `http://localhost:3000/api/auth/login`
   - Body (JSON):
   ```json
   {
     "ogrNo": 2014800647,
     "password": "123456"
   }
   ```
   - Beklenen: Status 200, success: true

2. **Başarısız Giriş (Yanlış Öğrenci No):**
   - Method: POST
   - URL: `http://localhost:3000/api/auth/login`
   - Body (JSON):
   ```json
   {
     "ogrNo": 999999,
     "password": "123456"
   }
   ```
   - Beklenen: Status 404, success: false

3. **Eksik Veri:**
   - Method: POST
   - URL: `http://localhost:3000/api/auth/login`
   - Body (JSON):
   ```json
   {
     "ogrNo": 2014800647
   }
   ```
   - Beklenen: Status 400, success: false

### Tarayıcı ile Test

1. `http://localhost:3000/login` sayfasını açın
2. F12 ile Console'u açın
3. Öğrenci numarası: `2014800647`
4. Şifre: `123456` (veya herhangi bir şey)
5. "Giriş Yap" butonuna tıklayın
6. Console'da tüm adımları görebilirsiniz
7. Başarılıysa `/ogrenciler` sayfasına yönlendirilirsiniz

---

## SONRAKI ADIMLAR (İleride Eklenecek)

1. **Session Yönetimi:**
   - `express-session` paketi eklenecek
   - Giriş yapmış kullanıcı bilgileri session'da saklanacak
   - Sayfa yenilendiğinde giriş durumu korunacak

2. **Şifre Hash'leme:**
   - `bcrypt` paketi eklenecek
   - Şifreler hash'lenerek saklanacak
   - Girişte hash'lenmiş şifre kontrol edilecek

3. **Logout (Çıkış):**
   - Logout endpoint'i eklenecek
   - Session temizlenecek
   - Login sayfasına yönlendirilecek

4. **Sayfa Koruması:**
   - `requireAuth` middleware'i aktif edilecek
   - Giriş yapmamış kullanıcılar korumalı sayfalara gidemeyecek

---

## ÖZET

✅ **Oluşturulan Dosyalar:**
- `views/login.html` - Login sayfası
- `public/js/login.js` - Login JavaScript
- `models/authModel.js` - Login model
- `controllers/authController.js` - Login controller
- `routers/authRoutes.js` - Login API route
- `middlewares/auth.js` - Auth middleware (hazırlık)

✅ **Güncellenen Dosyalar:**
- `routers/homeRoutes.js` - Login route eklendi
- `app.js` - Auth route bağlandı

✅ **Öğrenilen Kavramlar:**
- Form event handling
- fetch() ile POST isteği
- window.location ile yönlendirme
- Veritabanında arama
- Validation (doğrulama)
- Hata yönetimi

Artık login sistemi çalışıyor! 🎉

