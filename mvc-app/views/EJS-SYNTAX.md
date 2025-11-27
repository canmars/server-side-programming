# EJS (Embedded JavaScript) Syntax Rehberi

## EJS Nedir?

EJS (Embedded JavaScript), JavaScript ile HTML template'leri oluşturmak için kullanılan bir template engine'dir. Express.js ile birlikte kullanılır.

## Neden EJS Kullanırız?

- **Dinamik İçerik:** Veritabanından gelen verileri HTML'e dönüştürür
- **Kod Tekrarını Önler:** Layout ve partial sistemleri
- **Kolay Öğrenilir:** JavaScript bilgisi yeterli
- **Express Entegrasyonu:** Express.js ile kolay entegrasyon

## Temel Syntax

### 1. Değişken Gösterme (Escape edilmiş - Güvenli)

```ejs
<%= variable %>
```

**Ne Yapar?**
- Değişkenin değerini gösterir
- HTML karakterlerini escape eder (güvenlik)
- XSS saldırılarına karşı koruma sağlar

**Örnek:**
```ejs
<%= title %>
<!-- Eğer title = "<script>alert('XSS')</script>" ise -->
<!-- Çıktı: &lt;script&gt;alert('XSS')&lt;/script&gt; -->
<!-- Tarayıcıda: <script>alert('XSS')</script> (çalışmaz) -->
```

**Kullanım:**
```ejs
<h1><%= user.name %></h1>
<p>Email: <%= user.email %></p>
```

### 2. HTML Gösterme (Escape edilmemiş - Dikkatli kullanın)

```ejs
<%- htmlContent %>
```

**Ne Yapar?**
- HTML içeriğini olduğu gibi gösterir
- Escape etmez (güvenlik riski!)
- Sadece güvendiğiniz içerik için kullanın

**Örnek:**
```ejs
<%- body %>
<!-- Layout'ta içeriği gösterir -->
```

**Dikkat:**
```ejs
<!-- ❌ YANLIŞ - Güvenlik riski -->
<%- userInput %>

<!-- ✅ DOĞRU - Escape edilmiş -->
<%= userInput %>
```

### 3. JavaScript Kodu

```ejs
<% code %>
```

**Ne Yapar?**
- JavaScript kodu çalıştırır
- Çıktı üretmez (sadece işlem yapar)

**Örnek:**
```ejs
<% 
    const fullName = user.firstName + ' ' + user.lastName;
    const isAdmin = user.role === 'admin';
%>
```

### 4. Koşullu İçerik (if-else)

```ejs
<% if (condition) { %>
    <!-- İçerik -->
<% } else { %>
    <!-- Alternatif içerik -->
<% } %>
```

**Örnek:**
```ejs
<% if (user.isAdmin) { %>
    <button>Admin Paneli</button>
<% } else { %>
    <p>Normal kullanıcı</p>
<% } %>
```

**Ternary Operator:**
```ejs
<%= user.isAdmin ? 'Admin' : 'Kullanıcı' %>
```

### 5. Döngüler (forEach, for)

```ejs
<% array.forEach(item => { %>
    <!-- Her item için -->
<% }) %>
```

**Örnek:**
```ejs
<ul>
    <% users.forEach(user => { %>
        <li><%= user.name %></li>
    <% }) %>
</ul>
```

**for Döngüsü:**
```ejs
<% for (let i = 0; i < users.length; i++) { %>
    <p><%= users[i].name %></p>
<% } %>
```

### 6. Yorumlar

```ejs
<%# Bu bir yorum - render edilmez %>
```

**Örnek:**
```ejs
<%# Kullanıcı listesi gösteriliyor %>
<ul>
    <% users.forEach(user => { %>
        <li><%= user.name %></li>
    <% }) %>
</ul>
```

## Layout Sistemi

### Layout Dosyası (layouts/main.ejs)

```ejs
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
</head>
<body>
    <nav>...</nav>
    
    <div class="container">
        <%- body %>  <!-- İçerik buraya yerleştirilir -->
    </div>
    
    <footer>...</footer>
</body>
</html>
```

### View Dosyası (index.ejs)

```ejs
<%# Layout kullanılıyor - HTML yapısı gerekmez %>
<h1>Ana Sayfa</h1>
<p>Hoş geldiniz!</p>
```

### Controller'da Kullanım

```javascript
res.render('index', {
    title: 'Ana Sayfa',
    layout: 'layouts/main'  // Layout belirtilir
})
```

## Partial'lar (Parçalar)

### Partial Oluşturma (views/partials/header.ejs)

```ejs
<header>
    <h1><%= siteName %></h1>
    <nav>...</nav>
</header>
```

### Partial Kullanma

```ejs
<%- include('partials/header', { siteName: 'MVC App' }) %>
```

## Veri Aktarımı

### Controller'dan View'a

```javascript
// Controller
res.render('users/index', {
    title: 'Kullanıcılar',
    users: users,
    currentPage: 1
})
```

### View'da Kullanım

```ejs
<h1><%= title %></h1>
<ul>
    <% users.forEach(user => { %>
        <li><%= user.name %></li>
    <% }) %>
</ul>
<p>Sayfa: <%= currentPage %></p>
```

## Örnek: Kullanıcı Listesi

```ejs
<h1>Kullanıcılar</h1>

<% if (users.length === 0) { %>
    <p>Henüz kullanıcı yok.</p>
<% } else { %>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>İsim</th>
                <th>Email</th>
                <th>İşlemler</th>
            </tr>
        </thead>
        <tbody>
            <% users.forEach(user => { %>
                <tr>
                    <td><%= user.id %></td>
                    <td><%= user.name %></td>
                    <td><%= user.email %></td>
                    <td>
                        <a href="/users/<%= user.id %>">Görüntüle</a>
                        <a href="/users/<%= user.id %>/edit">Düzenle</a>
                    </td>
                </tr>
            <% }) %>
        </tbody>
    </table>
<% } %>
```

## Güvenlik Notları

1. **Kullanıcı Girdilerini Escape Edin:**
   ```ejs
   <!-- ✅ DOĞRU -->
   <%= userInput %>
   
   <!-- ❌ YANLIŞ -->
   <%- userInput %>
   ```

2. **Sadece Güvendiğiniz HTML'i Kullanın:**
   ```ejs
   <!-- ✅ DOĞRU - Kendi içeriğimiz -->
   <%- body %>
   
   <!-- ❌ YANLIŞ - Kullanıcı girdisi -->
   <%- userComment %>
   ```

3. **SQL Injection Koruması:**
   - EJS'de SQL sorgusu yazmayın
   - Model katmanında prepared statements kullanın

## İpuçları

1. **Layout Kullanın:** Kod tekrarını önler
2. **Partial'ları Kullanın:** Ortak bileşenler için
3. **Helper Fonksiyonlar:** Karmaşık işlemler için
4. **Koşullu Render:** Kullanıcı durumuna göre içerik gösterin
5. **Döngüler:** Liste gösterimleri için

## Özet

| Syntax | Açıklama | Kullanım |
|--------|----------|----------|
| `<%= %>` | Değişken göster (escape) | Güvenli içerik |
| `<%- %>` | HTML göster (no escape) | Güvenilir HTML |
| `<% %>` | JavaScript kodu | İşlemler, döngüler |
| `<%# %>` | Yorum | Açıklamalar |
| `<%- include() %>` | Partial ekle | Ortak bileşenler |

