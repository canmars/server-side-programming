# Helpers Klasörü

## Amaç
Helper fonksiyonlar, tekrar eden kod parçalarını ve yardımcı işlevleri içerir.

## Sorumluluklar
- Validasyon fonksiyonları
- Veri formatlama
- Hesaplamalar
- String manipülasyonları
- Tarih/saat işlemleri

## Dosya Yapısı
- `validation.js` - Validasyon helper'ları
- `format.js` - Veri formatlama fonksiyonları
- `date.js` - Tarih işlemleri (ileri seviye)

## Örnek Kullanım
```javascript
// helpers/validation.js
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
```

## Notlar
- DRY (Don't Repeat Yourself) prensibi uygulanır
- Pure functions olmalıdır (side effect yok)
- Test edilebilir olmalıdır
- Tek bir işlevi yapmalıdır

