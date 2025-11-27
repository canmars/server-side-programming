# Utils Klasörü

## Amaç
Utility fonksiyonlar, genel amaçlı yardımcı araçlardır.

## Sorumluluklar
- Sabit değerler (constants)
- Genel yardımcı fonksiyonlar
- Konfigürasyon dosyaları
- Ortak utility'ler

## Dosya Yapısı
- `constants.js` - Sabit değerler
- `config.js` - Konfigürasyon ayarları (ileri seviye)

## Örnek Kullanım
```javascript
// utils/constants.js
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};
```

## Notlar
- Helper'lardan farkı: Daha genel amaçlıdır
- Proje genelinde kullanılır
- Import edilerek kullanılır

