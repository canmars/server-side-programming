# Method (Metot/Fonksiyon) Nedir? - Basit Açıklama

## 1. Method (Metot) = Fonksiyon

**Method**, bir işi yapan kod parçasıdır. Türkçe'de "fonksiyon" veya "metot" denir.

### Basit Örnek:

```javascript
// Bu bir method (fonksiyon)
function topla(sayi1, sayi2) {
    return sayi1 + sayi2
}

// Kullanım:
const sonuc = topla(5, 3)  // sonuc = 8
```

**Ne yapar?**
- `topla` → Method'un adı
- `(sayi1, sayi2)` → Parametreler (girdiler)
- `return sayi1 + sayi2` → İşlem (toplama)
- `sonuc` → Çıktı (8)

### Gerçek Hayat Örneği:

```javascript
// "Yemek yap" method'u
function yemekYap(yemekAdi) {
    console.log(`${yemekAdi} yapılıyor...`)
    return `${yemekAdi} hazır!`
}

// Kullanım:
const sonuc = yemekYap("Makarna")  
// Çıktı: "Makarna yapılıyor..." ve "Makarna hazır!"
```

---

## 2. Class (Sınıf) İçinde Method

**Class**, benzer işleri yapan method'ları gruplar.

### Örnek:

```javascript
class Mutfak {
    // Method 1: Yemek yap
    yemekYap(yemekAdi) {
        return `${yemekAdi} yapıldı`
    }
    
    // Method 2: Bulaşık yıka
    bulaşikYika() {
        return "Bulaşıklar yıkandı"
    }
}

// Kullanım:
const mutfak = new Mutfak()  // Yeni bir mutfak oluştur
mutfak.yemekYap("Makarna")   // Method'u çağır
```

**Ne yaptık?**
1. `new Mutfak()` → Yeni bir mutfak oluşturduk (instance)
2. `mutfak.yemekYap()` → O mutfağın method'unu çağırdık

---

## 3. Static Method (Statik Metot) Nedir?

**Static method**, class'tan direkt çağrılır. `new` ile instance oluşturmaya gerek yok!

### Normal Method (Instance Gerekli):

```javascript
class Mutfak {
    yemekYap(yemekAdi) {
        return `${yemekAdi} yapıldı`
    }
}

// Kullanım (new gerekli):
const mutfak = new Mutfak()  // Önce oluştur
mutfak.yemekYap("Makarna")   // Sonra kullan
```

### Static Method (Instance Gereksiz):

```javascript
class Mutfak {
    static yemekYap(yemekAdi) {  // static kelimesi eklendi
        return `${yemekAdi} yapıldı`
    }
}

// Kullanım (new gereksiz):
Mutfak.yemekYap("Makarna")  // Direkt çağır!
```

**Fark:**
- Normal: `new Mutfak()` → `mutfak.yemekYap()`
- Static: `Mutfak.yemekYap()` (direkt)

---

## 4. Bolge Model'de Static Method

```javascript
class Bolge {
    // Static method
    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM bolge')
        return rows
    }
}

// Kullanım:
const bolgeler = await Bolge.findAll()  // Direkt çağır!
```

**Neden Static?**
- Her seferinde `new Bolge()` yapmaya gerek yok
- Daha pratik: `Bolge.findAll()` yeterli
- Veritabanı işlemleri için ideal

---

## 5. Prepared Statement (Hazırlanmış Sorgu) Nedir?

**Prepared Statement**, güvenli SQL sorgusu yazma yöntemidir.

### ❌ YANLIŞ (Güvensiz):

```javascript
// Kullanıcıdan gelen veri
const id = "1; DROP TABLE bolge; --"

// Direkt SQL'e yazıyoruz (TEHLİKELİ!)
const query = `SELECT * FROM bolge WHERE bolge_id = ${id}`
// Sonuç: SELECT * FROM bolge WHERE bolge_id = 1; DROP TABLE bolge; --
// Veritabanı silinir! 😱
```

### ✅ DOĞRU (Güvenli - Prepared Statement):

```javascript
// Kullanıcıdan gelen veri
const id = "1; DROP TABLE bolge; --"

// ? işareti = placeholder (yer tutucu)
const [rows] = await pool.query('SELECT * FROM bolge WHERE bolge_id = ?', [id])
// MySQL otomatik olarak güvenli hale getirir
// Sonuç: Sadece ID=1 olan kayıt getirilir, zararlı kod çalışmaz ✅
```

**Nasıl Çalışır?**
1. `?` → "Buraya bir değer gelecek" demek
2. `[id]` → Değeri ayrı gönderiyoruz
3. MySQL → Değeri güvenli hale getirir (escape eder)

**Örnek:**
```javascript
// Kullanıcı ID'si
const bolge_id = 5

// Prepared statement
await pool.query('SELECT * FROM bolge WHERE bolge_id = ?', [bolge_id])
// MySQL: SELECT * FROM bolge WHERE bolge_id = 5 (güvenli)

// Eğer kullanıcı zararlı kod gönderirse:
const bolge_id = "5; DELETE FROM bolge; --"
await pool.query('SELECT * FROM bolge WHERE bolge_id = ?', [bolge_id])
// MySQL: SELECT * FROM bolge WHERE bolge_id = '5; DELETE FROM bolge; --'
// Zararlı kod çalışmaz, sadece string olarak işlenir ✅
```

---

## 6. Neden Test Dosyası Kullanıyoruz?

### ❌ Bolge.js'yi Direkt Çalıştıramayız:

```javascript
// Bolge.js içinde:
class Bolge {
    static async findAll() {
        // ...
    }
}

// Bu dosyayı çalıştırırsak: node models/Bolge.js
// Ne olur? → Hiçbir şey! Sadece class tanımlanır, çalışmaz.
```

**Neden?**
- `Bolge.js` sadece class tanımı içerir
- Method'lar tanımlanır ama çağrılmaz
- Çalıştırmak için bir "tetikleyici" gerekir

### ✅ Test Dosyası Kullanırız:

```javascript
// test-bolge-model.js içinde:
import Bolge from '../models/Bolge.js'  // Class'ı import et

// Şimdi method'u çağır:
const bolgeler = await Bolge.findAll()   // Çalıştır!
console.log(bolgeler)                    // Sonucu göster
```

**Ne Yapar?**
1. `Bolge.js` → Class tanımı (araç kutusu)
2. `test-bolge-model.js` → Class'ı kullanır (araçları kullanır)

**Gerçek Hayat Örneği:**
- `Bolge.js` = Mutfak (araçlar var ama kullanılmıyor)
- `test-bolge-model.js` = Aşçı (araçları kullanıyor)

---

## Özet

1. **Method** = Bir işi yapan kod parçası (fonksiyon)
2. **Static Method** = `new` olmadan direkt çağrılan method
3. **Prepared Statement** = Güvenli SQL sorgusu (`?` kullanarak)
4. **Test Dosyası** = Method'ları çalıştırmak için gerekli

**Bolge Model Örneği:**
```javascript
// Tanım (Bolge.js)
class Bolge {
    static async findAll() { ... }
}

// Kullanım (test-bolge-model.js veya Controller'da)
const bolgeler = await Bolge.findAll()
```

