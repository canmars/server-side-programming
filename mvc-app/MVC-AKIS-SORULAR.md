# MVC Akışı - Sorular ve Cevaplar

## Senaryo: Kullanıcı Bölge Listesini Görüntülüyor

Kullanıcı tarayıcıda `http://localhost:3000/bolge` adresine gidiyor.

---

## SORU 1: Kullanıcı URL'ye gittiğinde ne oluyor?

**CEVAP:** İstek Express sunucusuna gidiyor.

```
Kullanıcı → http://localhost:3000/bolge
         ↓
Express Sunucusu (app.js)
```

**Dosya:** `app.js`
**Kod:**
```javascript
app.use('/bolge', bolgeRoutes)
```

**Açıklama:** Express, `/bolge` ile başlayan tüm istekleri `bolgeRoutes` router'ına yönlendirir.

---

## SORU 2: Router ne yapıyor?

**CEVAP:** URL'yi Controller metoduna bağlıyor.

**Dosya:** `routers/bolgeRoutes.js`
**Kod:**
```javascript
router.get('/', bolgeController.index)
```

**Açıklama:**
- `router.get('/')` → GET isteği ve `/` URL pattern'i
- `bolgeController.index` → Çalıştırılacak Controller metodu

**Akış:**
```
GET /bolge → router.get('/', ...) → bolgeController.index()
```

---

## SORU 3: Controller ne yapıyor?

**CEVAP:** Model'den veri çekiyor ve View'a gönderiyor.

**Dosya:** `controllers/bolgeController.js`
**Kod:**
```javascript
export const index = async (req, res) => {
    // 1. Model'den veri çek
    const bolgeler = await Bolge.findAll()
    
    // 2. View'a gönder
    res.render('bolge/index', {
        title: 'Bölgeler',
        bolgeler: bolgeler
    })
}
```

**Açıklama:**
1. `Bolge.findAll()` → Model'i çağırır
2. `res.render()` → View'ı render eder ve veri gönderir

**Akış:**
```
Controller → Model.findAll() → Veritabanı
         ↓
Controller → res.render() → View
```

---

## SORU 4: Model ne yapıyor?

**CEVAP:** Veritabanından veri çekiyor.

**Dosya:** `models/Bolge.js`
**Kod:**
```javascript
static async findAll() {
    const [rows] = await pool.query('SELECT * FROM bolge ORDER BY bolge_id ASC')
    return rows
}
```

**Açıklama:**
- `pool.query()` → MySQL'e SQL sorgusu gönderir
- `SELECT * FROM bolge` → Tüm bölgeleri çeker
- `return rows` → Verileri Controller'a döndürür

**Veri Örneği:**
```javascript
[
    { bolge_id: 1, bolge_ad: "Marmara" },
    { bolge_id: 2, bolge_ad: "İç Anadolu" },
    { bolge_id: 3, bolge_ad: "Akdeniz" }
]
```

**Akış:**
```
Model → pool.query() → MySQL Veritabanı
     ↓
Model → return rows → Controller
```

---

## SORU 5: View ne yapıyor?

**CEVAP:** Controller'dan gelen verileri HTML'e çeviriyor.

**Dosya:** `views/bolge/index.ejs`
**Kod:**
```ejs
<h1><%= title %></h1>
<!-- title = "Bölgeler" → <h1>Bölgeler</h1> -->

<% bolgeler.forEach(bolge => { %>
    <tr>
        <td><%= bolge.bolge_id %></td>
        <td><%= bolge.bolge_ad %></td>
    </tr>
<% }) %>
```

**Açıklama:**
- `<%= title %>` → Controller'dan gelen `title` değerini gösterir
- `<% bolgeler.forEach(...) %>` → Controller'dan gelen `bolgeler` dizisini döngüye alır
- Her bölge için HTML satırı oluşturur

**Akış:**
```
View → EJS Template → HTML
    ↓
View → Kullanıcıya gönderilir
```

---

## SORU 6: Tüm akış nasıl?

**CEVAP:** Tam akış şöyle:

```
1. Kullanıcı: http://localhost:3000/bolge
           ↓
2. Express (app.js): app.use('/bolge', bolgeRoutes)
           ↓
3. Router (bolgeRoutes.js): router.get('/', bolgeController.index)
           ↓
4. Controller (bolgeController.js): 
   - const bolgeler = await Bolge.findAll()
           ↓
5. Model (Bolge.js): 
   - pool.query('SELECT * FROM bolge')
           ↓
6. Veritabanı (MySQL): 
   - SELECT * FROM bolge çalıştırılır
   - Veriler döndürülür: [{ bolge_id: 1, bolge_ad: "Marmara" }, ...]
           ↓
7. Model → Controller: 
   - return rows (veriler Controller'a döner)
           ↓
8. Controller: 
   - res.render('bolge/index', { title: 'Bölgeler', bolgeler: bolgeler })
           ↓
9. View (bolge/index.ejs): 
   - EJS template render edilir
   - <%= title %> → "Bölgeler"
   - <% bolgeler.forEach(...) %> → Döngü çalışır
   - HTML oluşturulur
           ↓
10. Kullanıcı: 
    - Tarayıcıda HTML sayfasını görür
    - Bölge listesi tabloda gösterilir
```

---

## SORU 7: Her dosyanın görevi nedir?

### app.js
- **Görev:** Sunucuyu başlatır, router'ları bağlar
- **Kod:** `app.use('/bolge', bolgeRoutes)`

### routers/bolgeRoutes.js
- **Görev:** URL'leri Controller metodlarına bağlar
- **Kod:** `router.get('/', bolgeController.index)`

### controllers/bolgeController.js
- **Görev:** Model'den veri çeker, View'a gönderir
- **Kod:** `res.render('bolge/index', { bolgeler })`

### models/Bolge.js
- **Görev:** Veritabanı işlemleri yapar
- **Kod:** `pool.query('SELECT * FROM bolge')`

### views/bolge/index.ejs
- **Görev:** HTML oluşturur (kullanıcı arayüzü)
- **Kod:** `<%= title %>`, `<% bolgeler.forEach(...) %>`

---

## SORU 8: Veriler nereden nereye gidiyor?

### title (String)
```
Controller → res.render({ title: 'Bölgeler' }) → View → <%= title %>
```

### bolgeler (Array)
```
Veritabanı → Model.findAll() → Controller → res.render({ bolgeler }) → View → <% bolgeler.forEach(...) %>
```

### bolge.bolge_id (Number)
```
Veritabanı → Model → Controller → View → <%= bolge.bolge_id %>
```

### bolge.bolge_ad (String)
```
Veritabanı → Model → Controller → View → <%= bolge.bolge_ad %>
```

---

## ÖZET

1. **Router:** URL'yi Controller'a bağlar
2. **Controller:** Model'den veri çeker, View'a gönderir
3. **Model:** Veritabanından veri çeker
4. **View:** HTML oluşturur

**Basit Formül:**
```
URL → Router → Controller → Model → Veritabanı
                              ↓
URL ← View ← Controller ← Model ← Veritabanı
```

