# Controller → View Veri Gönderme - Detaylı Açıklama

## Controller View'a Nasıl Veri Gönderir?

Controller, `res.render()` metodu ile View'a veri gönderir.

---

## 1. res.render() Nedir?

`res.render()` Express.js'in bir metodudur. EJS template'ini render eder (HTML'e çevirir) ve veri gönderir.

### Basit Örnek:

```javascript
// Controller'da
res.render('bolge/index', {
    title: 'Bölgeler',
    bolgeler: bolgeler
})
```

**Ne Yapar?**
1. `'bolge/index'` → `views/bolge/index.ejs` dosyasını bulur
2. `{ title: 'Bölgeler', bolgeler: bolgeler }` → View'a gönderilecek veriler
3. EJS template'i render eder (HTML'e çevirir)
4. HTML'i kullanıcıya gönderir

---

## 2. Adım Adım Açıklama

### Adım 1: Controller'da Veri Hazırlama

```javascript
// controllers/bolgeController.js
export const index = async (req, res) => {
    // 1. Model'den veri çek
    const bolgeler = await Bolge.findAll()
    // bolgeler = [
    //   { bolge_id: 1, bolge_ad: "Marmara" },
    //   { bolge_id: 2, bolge_ad: "İç Anadolu" }
    // ]
    
    // 2. View'a gönder
    res.render('bolge/index', {
        title: 'Bölgeler',        // View'da title olarak kullanılacak
        bolgeler: bolgeler        // View'da bolgeler olarak kullanılacak
    })
}
```

**Ne Oldu?**
- `bolgeler` değişkeni oluşturuldu (Model'den geldi)
- `res.render()` ile View'a gönderildi

---

### Adım 2: View'da Veriyi Kullanma

```ejs
<!-- views/bolge/index.ejs -->
<h1><%= title %></h1>
<!-- title = "Bölgeler" → <h1>Bölgeler</h1> -->

<ul>
    <% bolgeler.forEach(bolge => { %>
        <li><%= bolge.bolge_ad %></li>
    <% }) %>
</ul>
```

**Ne Oldu?**
- `<%= title %>` → Controller'dan gelen `title` değerini gösterir
- `<% bolgeler.forEach(...) %>` → Controller'dan gelen `bolgeler` dizisini döngüye alır
- Her bölge için `<li>` oluşturur

---

## 3. res.render() Parametreleri

### Syntax:

```javascript
res.render('view-dosyasi', { veri-objesi })
```

### Parametre 1: View Dosyası Yolu

```javascript
res.render('bolge/index', ...)
// → views/bolge/index.ejs dosyasını arar
```

**Yol Kuralları:**
- `'bolge/index'` → `views/bolge/index.ejs`
- `'users/show'` → `views/users/show.ejs`
- `'index'` → `views/index.ejs`

### Parametre 2: Veri Objesi

```javascript
res.render('bolge/index', {
    title: 'Bölgeler',           // String
    bolgeler: bolgeler,          // Array
    currentPage: 1,              // Number
    isAdmin: true,               // Boolean
    user: { name: 'Ahmet' }      // Object
})
```

**Tüm veriler View'da kullanılabilir:**
- `title` → View'da `title` olarak
- `bolgeler` → View'da `bolgeler` olarak
- `currentPage` → View'da `currentPage` olarak
- vb.

---

## 4. View'da Veriyi Kullanma

### String Gösterme:

```ejs
<!-- Controller'dan: { title: 'Bölgeler' } -->
<h1><%= title %></h1>
<!-- Sonuç: <h1>Bölgeler</h1> -->
```

### Array Döngüsü:

```ejs
<!-- Controller'dan: { bolgeler: [{ bolge_id: 1, bolge_ad: "Marmara" }, ...] } -->
<ul>
    <% bolgeler.forEach(bolge => { %>
        <li><%= bolge.bolge_ad %></li>
    <% }) %>
</ul>
<!-- Sonuç: 
<ul>
    <li>Marmara</li>
    <li>İç Anadolu</li>
</ul>
-->
```

### Koşullu Gösterim:

```ejs
<!-- Controller'dan: { isAdmin: true } -->
<% if (isAdmin) { %>
    <button>Admin Paneli</button>
<% } else { %>
    <p>Normal kullanıcı</p>
<% } %>
```

### Object Kullanımı:

```ejs
<!-- Controller'dan: { user: { name: 'Ahmet', email: 'ahmet@example.com' } } -->
<p>İsim: <%= user.name %></p>
<p>Email: <%= user.email %></p>
```

---

## 5. Gerçek Örnek: Bolge Controller → View

### Controller (bolgeController.js):

```javascript
export const index = async (req, res) => {
    try {
        // 1. Model'den veri çek
        const bolgeler = await Bolge.findAll()
        // bolgeler = [
        //   { bolge_id: 1, bolge_ad: "Marmara" },
        //   { bolge_id: 2, bolge_ad: "İç Anadolu" }
        // ]
        
        // 2. View'a gönder
        res.render('bolge/index', {
            title: 'Bölgeler',        // String
            bolgeler: bolgeler,       // Array
            totalCount: bolgeler.length  // Number
        })
    } catch (error) {
        // Hata durumunda
        res.status(500).render('error', {
            title: 'Hata',
            message: 'Bölgeler yüklenirken bir hata oluştu.'
        })
    }
}
```

### View (views/bolge/index.ejs):

```ejs
<h1><%= title %></h1>
<!-- title = "Bölgeler" → <h1>Bölgeler</h1> -->

<p>Toplam <%= totalCount %> bölge bulundu.</p>
<!-- totalCount = 2 → <p>Toplam 2 bölge bulundu.</p> -->

<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Bölge Adı</th>
        </tr>
    </thead>
    <tbody>
        <% bolgeler.forEach(bolge => { %>
            <tr>
                <td><%= bolge.bolge_id %></td>
                <td><%= bolge.bolge_ad %></td>
            </tr>
        <% }) %>
    </tbody>
</table>
```

**Sonuç HTML:**

```html
<h1>Bölgeler</h1>
<p>Toplam 2 bölge bulundu.</p>
<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Bölge Adı</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Marmara</td>
        </tr>
        <tr>
            <td>2</td>
            <td>İç Anadolu</td>
        </tr>
    </tbody>
</table>
```

---

## 6. Veri Akışı (Tam Akış)

```
1. Kullanıcı: GET /bolge
           ↓
2. Router: router.get('/', bolgeController.index)
           ↓
3. Controller: index() metodu çalışır
           ↓
4. Model: Bolge.findAll() → Veritabanından veri çek
           ↓
5. Controller: const bolgeler = [...]
           ↓
6. Controller: res.render('bolge/index', { bolgeler })
           ↓
7. Express: views/bolge/index.ejs dosyasını bul
           ↓
8. EJS: Template'i render et (HTML'e çevir)
   - <%= title %> → "Bölgeler"
   - <% bolgeler.forEach(...) %> → Döngü çalışır
           ↓
9. HTML: Oluşturulan HTML
           ↓
10. Response: HTML kullanıcıya gönderilir
           ↓
11. Kullanıcı: Tarayıcıda sayfayı görür
```

---

## 7. Önemli Noktalar

### 1. Veri İsmi Aynı Olmalı:

```javascript
// Controller'da
res.render('bolge/index', {
    bolgeler: bolgeler  // İsim: bolgeler
})
```

```ejs
<!-- View'da -->
<% bolgeler.forEach(...) %>  <!-- Aynı isim: bolgeler -->
```

### 2. EJS Syntax:

- `<%= variable %>` → Değişkeni göster (escape edilmiş)
- `<%- variable %>` → HTML olarak göster (dikkatli kullanın)
- `<% code %>` → JavaScript kodu çalıştır
- `<%# comment %>` → Yorum (gösterilmez)

### 3. Veri Tipleri:

```javascript
res.render('view', {
    string: 'Metin',
    number: 123,
    boolean: true,
    array: [1, 2, 3],
    object: { name: 'Ahmet' },
    null: null,
    undefined: undefined
})
```

---

## 8. Örnek: show() Metodu

### Controller:

```javascript
export const show = async (req, res) => {
    const id = parseInt(req.params.id)
    const bolge = await Bolge.findById(id)
    
    res.render('bolge/show', {
        title: `Bölge: ${bolge.bolge_ad}`,
        bolge: bolge  // Tek bir bölge objesi
    })
}
```

### View:

```ejs
<h1><%= title %></h1>
<!-- title = "Bölge: Marmara" -->

<div>
    <p>ID: <%= bolge.bolge_id %></p>
    <p>Ad: <%= bolge.bolge_ad %></p>
</div>
```

---

## Özet

1. **Controller'da:** `res.render('view-dosyasi', { veriler })`
2. **View'da:** `<%= variable %>` ile veriyi göster
3. **Veri İsmi:** Controller ve View'da aynı olmalı
4. **EJS Syntax:** `<%= %>` göster, `<% %>` kod çalıştır
5. **Veri Tipleri:** String, Number, Boolean, Array, Object hepsi çalışır

**Basit Formül:**
```
Controller → res.render('view', { data }) → View → <%= data %>
```

