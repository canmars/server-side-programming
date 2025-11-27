
// npm install ...
// npm i ...

// npmjs.com

// npm init -y
// entry point : index.js
// npm i nodemon

// JavaScript
// JavaScript web sitelerine dinamik özellikler kazandırmayı programlama dillerinin bazı özelliklerini kullanarak.

// Değişken Tanımı

/*
var
let
const

web tasarımda: W3C, world wide web . standart kuruluşudur.

ECMA bir standartlaştırma kuruluşudur. Programlama dillerini.
Bütün programlama dilleri bu standarta uygun güncelleştirmeler yapıyor.


"ECMAScript 6" 2015'te. ile gelen değişken tanımlama yöntemleridir.

var: Fonksiyon kapsamlı değişken tanımlarında kullanılır. function scope. içinde bulunduğu fonksiyonun tamamına aittir. if veya for gibi blokları umursamaz.
let: Blok kapsamlı değişken tanımlarında kullanılır. block scope. İçinde doğduğu { } bloğunun dışına çıkamaz. sadece tanımlandığı en yakın süslü parantez { } bloğu içinde yaşar.
const: Sabit değerler için kullanılır, yeniden atanamaz. İçinde doğduğu { } bloğunun dışına çıkamaz. sadece tanımlandığı en yakın süslü parantez { } bloğu içinde yaşar.


ECMAScript 16. versiyondayız.
*/


// ECMAScript 6 Öncesi
// tek değişken "var" ile tanımlanırdı.

var adi = "can"

// ECMAScript 6 ve Sonrası
// iki değişken türü geldi. var ile beraber let ve const

// Blok kapsamlı değişken tanımlarında kullanılır.
let dogumYili = 1990;

// Sabit değerler için kullanılır. İçeriği değiştirilemez. Güvenlidir.
const soyadi = "canan";

// Veri tabanları frontend ve backend iletişimi. injection saldırıları. var değişkeni ile tanımlanan değişkenler güvenli değildir. let ve const kullanımı önerilir. 
// Değişmesini istemeyeceğimiz veriler: const ile tanımlanır. Var ile veya let ile tanımlanırsa güvenlik açığı oluşabilir. Çünkü bunlar değiştirilebilir.
// Biz bir API geliştireceğiz. Her türlü veri hassas olacak ve const kullanacağız çoğu değişkende.

// let ve const kullanın. değişip değişmeyeceğine göre karar verin.

// değişken isimlendirme kuralları aynıdır. Rakamla başlayamaz. özel karakterler kullanılamaz. boşluk olamaz. camelCase kullanılır.
// Değişken isimlendirme kuralları: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variables
// Bu dillerde değişkenin türü belirtilmez. Dinamik türlendirme denir. JavaScript değişken türünü otomatik algılar.
// Tür dönüşümleri otomatik yapılır. Dinamik türlendirme.
// Örnek:
// let yas = 30; // number
// yas = "otuz"; // string
// JavaScript değişken türünü otomatik algılar ve gerektiğinde tür dönüşümü yapar.
// AYRICA ne kadar yer kapladığını da otomatik yönetir. Bellek yönetimi otomatik yapılır.
// Bellek yönetimi: Garbage Collector (Çöp Toplayıcı) otomatik olarak kullanılmayan bellek alanlarını temizler ve belleği optimize eder.

// // Değişkenlerin konsola yazdırılması
// console.log("Benim adım:", adi);
// console.log(dogumYili);
// console.log(soyadi);

// // ECMAScript 6 Öncesi fonksiyon tanımı

// function topla(a, b) {
//     return a + b;
// }

// // function isim(birinci_deger,ikinci_deger) {
// //   return birinci_deger + ikinci_deger
// // }


// // ECMAScript 6 Sonrası fonksiyon tanımı
// // Arrow Function (Ok Fonksiyonu) ile fonksiyon tanımı
// // Değişkenin hafızasına atıyor. Daha hızlı tanımlanıyor arrow function ile.

// // const toplamak = (birinci_deger, ikinci_deger) => (birinci_deger)+(ikinci_deger)


// const carp = (a, b) => a * b;

// // toplamak(1,3)

// console.log("Toplama:", topla(5, 10));
// console.log("Çarpma:", carp(5, 10));


// const add = (a, b) => a + b;

// let a = 10;
// if(a==10){
//     console.log("a eşittir 10")
// }


// let total = 0
// for(let i=0;i<10;i++){   // let tanımı içeride yapılıyor.
//     total += i
// }

// console.log("total", total)

// var ile let arasındaki farklar
// var function scope - let ise block scope özelliğine sahiptir.
// block scope örnek:


// // herhangi bir süslü parantez içinde tanımlanan let'i süslü parantez dışına çıkaramayız.

// function test(){
//     if(true){
//         var degisken = "Merhaba" // let ile tanımlasaydık aşağıda tanımlayamazdık.
//     }
//     if(true){
//         console.log(degisken) // aslında çağıramam lazım.
//     }
// }

// test()

// // Tekrar tanımlama özelliği

// // var'ın tekrar tanımlama özelliği var.
// var isim = "Can"
// console.log(isim)
// var isim = "Canan"
// console.log(isim)


// // let'in tekrar tanımlama özelliği yok. aslında var'ın açığı bu.
// let soy_isim = "Can"
// console.log(isim)
// // let soy_isim = "Canan"
// console.log(isim)

// var soy_adi = "Uzun"
// soy_adi = "Aydın"

// let adres = "İzmir"
// adres = "İstanbul"

// console.log(soy_adi)
// console.log(adres)


// // hoisting: Hoisting, JavaScript'in var ile tanımlanan değişkenlerin bildirimini (adını) kodun en üstüne taşıması, ancak değerini (atamasını) yerinde bırakmasıdır.

// // benim_adim = "Can-Ankara" // global scope: windows objesi falan
// // console.log(benim_adim)


// // atama işlemleri immutable değiştirilemez: const.
// // const: constant 
// // const ile yapılan değere sonradan tanımlama yapılamaz.

// let benim_adim = "Can"
// const adress = "İzmir"

// benim_adim = "Cem"
// // adress = "Ankara"



// REST Operatörü

// Traditional yöntem


// burada hata yaptım
// function add2(){
//    console.log(arguments)
//    let total = 0
//    for(let i=0;i<arguments,length;i++){
//      total += arguments[i]
//    }
//    return total}
 
// console.log(add2(1,2,3,4,5,6))


// rest yöntem 

// const add3 = (...args) => {
//   console.log(args);
//   let total = 0;
//   for(let i=0;i<args.length;i++){
//     total+=args[i]
//   } 
//   return total
// }

// console.log(add3(1,2,3,4,5,6))



// add to cart  - sepete ekle

// function addToCart(urun_adi,adet,fiyat){

// }

// addToCart("Elma",2,10)
// addToCart("Armut",2,10)
// addToCart("Elma",2,10)


// Object
// obje mantığı. dictionary mantığı. key-value, anahtar-değer ilişkisi. sütun adı value'ya benziyor.
// 3 defa istek 1 defa istek göndermek için.

// let urunler=[{
//   urunadi:"Elma",
//   urunadet:5,
//   urunfiyat:100
// },
// {
//   urunadi:"Armut",
//   urunadet:5,
//   urunfiyat:35
// },
// {
//   urunadi:"Limon",
//   urunadet:8,
//   urunfiyat:65
// }]

// function addToCartNew(urun){
//   console.log(urun.urunadi)
//   console.log(urun.urunadet)
//   console.log(urun.urunfiyat)
// }

// addToCartNew(urun[0])

// // distracting işlemi

// let bolgeler = ["İç Anadolu", "Marmara", "Karadeniz"] // diziler, indeks mantığı
// console.log(bolgeler[2])

// bizim odağımız veri tabanı veri tabanıyla haberleşebilmek!
// veri tabanlarına indekslerle erişmek doğru değil
// indeksler değişebilir ama sütun ismi değişmez. 
// veri tabanındaki verilere erişebilmek için

// let[icAnadolu,marmara,karadeniz]=["İç Anadolu", "Marmara", "Karadeniz"] // distracting işlemi
// console.log(icAnadolu)

// let[urun_adi2,adet,fiyat]=["Karpuz",3,20]
// console.log(urun_adi2)

// let[elma,armut,limon]=[
//   {urun_adi:"Elma",adet:10,fiyat1:100},
//   {urun_adi:"Armut",adet:5,fiyat:380},
//   {urun_adi:"Limon",adet:50,fiyat:30}
// ]

// console.log(elma.urun_adi)


// filter
// sql gibi veriyi bir kez çekip defalarca filtreleme yapmamıza yarıyor.
// sitede çok varsa req-response yapılıyorsa bunun önüne geçilip
// bir kez veri çekiliyor veri tabanından bundan filter yapılıyor memory üzerinden
// güvenlik sıkıntı olabilir ama çok hızlı.

// const sayilar = [1,2,3,5,6,7,8,9,10]

// const teksayilar = sayilar.filter(sayi=>sayi%2===0);
// console.log(teksayilar)

// find
// sadece rakam değil ad da aranabiliyor.

// const numbers = [1,2,3,5,6,7,8,9,10]

// const ciftsayilar = numbers.find(function(sayi){
//   return sayi%2===0
// }
// )
// console.log(ciftsayilar)



// map fonksiyonu


// const num = [1,2,3,4,5,6]

// const katSayi = num.map(num=>num*2)
// console.log(katSayi)

// const totals = num.map(function(sayi){
//   return sayi * 2
// })
// console.log(totals)


// reduce

// const numm = [1,2,3,4,5,6]

// const totall = numm.reduce((acc,curr) => acc+curr,0)   
// console.log(totall)
// // acc: accumulator - biriken değer
// // curr: current - o anki değer

// // forEach fonksiyonu
// const say = [1,2,3,4,5,6]
// say.forEach(say=>{
//   console.log(say)
// })


// hata denetimi

// try{
//   const result = 10/0
//   console.log("Sonuç:", result)

// }catch(error){
//   console.log("Bir hata oluştu:", error.message)
// }
// finally{
//   console.log("Hata denetimi tamamlandı.")
// }


// function bolmeİslem (X,y){
//   if(y===0){
//     throw new Error("Bir sayı sıfıra bölünemez.")
//   }
//   return x/y
// }
// try{
//   const sonuc = bolmeİslem(10,0)
//   console.log("Sonuç:", sonuc)
// }
// catch(error){
//   console.log("Hata Yakalandı:", error.message)
// }


// classlara kadar geldik.
// vizeden sonra class'lar sonra API

// sınav sadece kod değil ilk bölümdeki teorik bilgiler de var.
// kodlama kısmı da var oturup yazmak gibi.
// case verecek problem yani.

// vize sonrası ders.
// class'lar 
// modüler tasarım.


// extend
// birden fazla veri tabanı bağlaması

export class BaseLogger{
    constructor(){
        this.data=data
    }
    log(data){
        console.log("Default Logger"+data)
    }
}

export class ElasticLogger extends BaseLogger(){
    constructor(){
        this.time=time
    }
    log(data,time){
        console.log("Logged to Elastic"+data+time)
    }
}

export class MongoLogger extends BaseLogger(){
    constructor(user){
        this.user=user
    }
    log(data,user){
        console.log("Logged to Mongo"+data+user)
    }
}