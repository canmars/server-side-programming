
console.log("Benim adım:");


// function carpmak(a,b){
//     return a*b;
// }

// const carpmak = (a,b) => a*b;
// const carpmak = ((a,b) => a*b);




// console.log(carpmak(1,3))


// let x=5;
// if (x==5){
//     console.log('a esittir 5')
// }


// let a=6
// if (a==6) {
//     console.log('a esittir 6')
// }


// let total = 0
// for(let i=0;i<10;i++){   // let tanımı içeride yapılıyor.
//     total += i
// }



// let toplam = 0
// for (let i=0;i<10;i++){
//     toplam += i
// }

// let toplam1 = 0
// for (let f=0;f<10;f++){
//     toplam1 += f
// }

// function test(){
//     if(true){
//         var degisken = "Merhaba" // let ile tanımlasaydık aşağıda tanımlayamazdık.
//     }
//     if(true){
//         console.log(degisken) // aslında çağıramam lazım.
//     }
// }

// test()


// var soy_adi = "Uzun"
// soy_adi = "Aydın"

// let adres = "İzmir"
// adres = "İstanbul"

// const urun = "Kitap"
// // urun = "Araba"

// console.log(soy_adi)
// console.log(adres)
// console.log(urun)


// benim_adim = "Can-Ankara"
// console.log(benim_adim)

// benim_adim = "Can-Ankara"; // global scope: windows objesi falan
// console.log(benim_adim); // Çıktı: undefined

// function add2(){
//    console.log(arguments);
//    let total = 0;
//    for(let i=0;i<arguments.length;i++){
//      total += arguments[i]
//    }
//    return total}
 
// console.log(add2(1,2,3,4,5,6))


// const add3 = (...args) => {
//   console.log(args);
//   let total = 0;
//   for(let i=0;i<args.length;i++){
//     total+=args[i]
//   } 
//   return total
// }

// console.log(add3(1,2,3,4,5,6))



// function fonks_ism(){
//     toplam = 0;
//     for (let i=0;i<arguments.length;i++){
//         toplam += arguments[i]
//     }
//     return toplam
// }

// console.log(fonks_ism(1,2,3,4))

// const fonks_i = (...args) => {
//     top = 0;
//     for (let i=0;i<args.length;i++){
//         top += args[i]
//     }
//     return top
// }  

// console.log(fonks_i(1,2,3,4))


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

// addToCartNew(urunler[1])

// let [icAnadolu,marmara,karadeniz] = ["İç Anadolu", "Marmara", "Karadeniz"] // distracting işlemi
// console.log(marmara)

// let[urun_adi2,adet,fiyat]=["Karpuz",3,20]
// console.log(urun_adi2)


// let[elma,armut,limon]=[
//   {urun_adi:"Elma",adet:10,fiyat1:100},
//   {urun_adi:"Armut",adet:5,fiyat:380},
//   {urun_adi:"Limon",adet:50,fiyat:30}
// ]

// console.log(armut.adet, armut.fiyat)


// let dersler = [{
//     dersAdi: 'Sunucu',
//     dersKodu: 'YBS2010'
// },
// {
//     dersAdi: 'Web',
//     dersKodu: 'YBS2000'
// }
// ]



// let [sunucu, web] = [
//     {dersSorumlusu: 'Can Aydin', dersKodu:'YBS2001'},
//     {dersSorumlusu: 'Kutan Koruyan', dersKodu: 'YBS2002'}
// ]

// console.log(web.dersKodu)


// const sayilar = [1,2,3,5,6,7,8,9,10]

// const tek_sayilar = sayilar.filter(sayi=>sayi%2===1);
// console.log(tek_sayilar)


// const sayilar = [1,2,3,5,6,7,8,9,10]
// const cift_sayilar = sayilar.filter(sayi=>sayi%2===0 and );
// console.log(cift_sayilar)

// find
// sadece rakam değil ad da aranabiliyor.

// const numbers = [1,2,3,5,6,7,8,9,10]

// const ciftsayilar = numbers.find(sayi=>sayi%2===0);
// console.log(ciftsayilar)

// const numbers = [1,2,3,5,6,7,8,9,10]
// const ciftsayilar = numbers.find(function(sayi){
//   return sayi%2===0}
// )
// console.log(ciftsayilar)



// function syste (sayi){
//     return sayi += 1;
// }


// const syste = (sayi=>sayi += 1);



// function sstt (ekmek){
//     return kitap+ekmek
// }

// const market = (nesne,raf) => (nesne+raf)



// map fonksiyonu

// const num = [1,2,3,4,5,6]

// const katSayi = num.map(num=>num*2)
// console.log(katSayi)

// const totals = num.map(function(sayi){
//   return sayi +10
// })
// console.log(totals)


// reduce reduce fonksiyonu, bir diziyi (listeyi) alıp onu tek bir değere "indirger" (reduce eder). bir dizideki tüm sayıları toplayıp tek bir sonuç elde etmenizi sağlar

// acc: accumulator - biriken değer
// curr: current - o anki değer

// const numbers = [1,2,3,4,5,6]

// const total = numbers.reduce((acc,curr) => acc+curr,0)   
// console.log(total)



// forEach fonksiyonu
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

// try{
//     const sonuc = 10/0
// }
// catch(error){
//     console.log(error.message)
// }
// finally{
//     console.log("hata var ya")
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


