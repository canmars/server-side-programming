# Views Klasörü

## Amaç
View katmanı, kullanıcı arayüzü ve görsel sunumdan sorumludur.

## Sorumluluklar
- HTML template'leri oluşturmak
- Controller'dan gelen verileri kullanıcıya göstermek
- Formlar ve kullanıcı etkileşimleri
- EJS template engine kullanımı

## Dosya Yapısı
```
views/
├── layouts/          # Layout dosyaları (ortak HTML yapısı)
│   └── main.ejs      # Ana layout
├── users/            # Kullanıcı ile ilgili view'lar
│   ├── index.ejs     # Kullanıcı listesi
│   ├── show.ejs      # Kullanıcı detay
│   ├── create.ejs    # Kullanıcı oluşturma formu
│   └── edit.ejs      # Kullanıcı düzenleme formu
└── index.ejs         # Ana sayfa
```

## EJS Syntax
- `<%= variable %>` - Değişkeni escape ederek gösterir (güvenli)
- `<%- variable %>` - HTML olarak gösterir (dikkatli kullanın)
- `<% code %>` - JavaScript kodu çalıştırır
- `<%- body %>` - Layout'ta içerik gösterir

## Notlar
- View'lar sadece veri gösterir, veri işleme yapmaz
- Controller'dan gelen verileri kullanır
- Layout sistemi kod tekrarını önler
- Partial'lar ortak bileşenler için kullanılabilir

