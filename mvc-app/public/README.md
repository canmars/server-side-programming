# Public Klasörü

## Amaç
Statik dosyaları (CSS, JavaScript, resimler) içerir.

## Sorumluluklar
- CSS dosyaları
- JavaScript dosyaları (client-side)
- Resimler ve diğer statik dosyalar
- Font dosyaları

## Dosya Yapısı
```
public/
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
    └── logo.png
```

## Notlar
- Express'te `app.use(express.static('public'))` ile servis edilir
- URL'de `/css/style.css` olarak erişilir
- Tarayıcı tarafından doğrudan erişilebilir
- Server-side rendering'de kullanılmaz (sadece statik dosyalar)

