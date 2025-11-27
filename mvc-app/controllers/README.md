# Controllers Klasörü

## Amaç
Controller katmanı, MVC mimarisinin kalbidir. Kullanıcı isteklerini alır, Model'den veri çeker ve View'a gönderir.

## Sorumluluklar
- HTTP isteklerini (GET, POST, PUT, DELETE) işlemek
- Model katmanından veri almak veya göndermek
- İş mantığını (business logic) yönetmek
- View'a uygun verileri göndermek
- Hata yönetimi yapmak

## Dosya Yapısı
Her model için bir controller dosyası oluşturulur:
- `userController.js` - Kullanıcı işlemleri
- `productController.js` - Ürün işlemleri

## Örnek Kullanım
```javascript
// controllers/userController.js
export const index = async (req, res) => {
  const users = await User.findAll();
  res.render('users/index', { users });
}
```

## Notlar
- Controller'lar sadece koordinasyon yapar, veri işleme yapmaz
- Her controller metodu bir route'a bağlanır
- Try-catch blokları ile hata yönetimi yapılmalıdır





Adım 3 tamamlandı: Bolge Controller oluşturuldu
Controller nedir?
Controller, Model ve View arasında köprü görevi görür.
Basit akış:
1. Kullanıcı isteği → GET /bolge2. Controller isteği alır → bolgeController.index()3. Controller Model'e sorar → Bolge.findAll()4. Model veritabanından verileri çeker5. Controller verileri View'a gönderir → res.render()6. View HTML oluşturur ve kullanıcıya gönderir
Controller metodları
index() → Tüm bölgeleri listele (GET /bolge)
show() → Belirli bir bölgeyi göster (GET /bolge/:id)
create() → Yeni bölge formu göster (GET /bolge/create)
store() → Yeni bölge oluştur (POST /bolge)
edit() → Bölge düzenleme formu göster (GET /bolge/:id/edit)
update() → Bölge güncelle (PUT /bolge/:id)
destroy() → Bölge sil (DELETE /bolge/:id)
Önemli kavramlar
req (request) → Kullanıcı isteği
req.params.id → URL parametresi (örn: /bolge/5 → id = 5)
req.body → Form verileri (POST isteklerinde)
req.query → Query string (örn: ?page=1)
res (response) → Kullanıcıya cevap
res.render() → View'ı render et (HTML gönder)
res.redirect() → Başka sayfaya yönlendir
res.status() → HTTP status code
Model ile iletişim
1. Kullanıcı isteği → GET /bolge2. Controller isteği alır → bolgeController.index()3. Controller Model'e sorar → Bolge.findAll()4. Model veritabanından verileri çeker5. Controller verileri View'a gönderir → res.render()6. View HTML oluşturur ve kullanıcıya gönderir
Test edelim
Terminal'de şu komutu çalıştırın:
   // Controller'da   const bolgeler = await Bolge.findAll()  // Model'i çağır   res.render('bolge/index', { bolgeler }) // View'a gönder
Bu komut:
Controller metodlarını gösterir
Controller'ın Model ile nasıl çalıştığını gösterir
Model'den direkt veri çeker