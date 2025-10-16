// Node.js'in temel web sunucusu modülünü dahil ediyoruz.
const http = require('http');

// Tarayıcıda göstereceğimiz rastgele mesajlar.
const mesajlar = [
    "Bugün harika bir gün olacak!",
    "Kod yazmak bir sanattır.",
    "Bir kahve alıp devam etme zamanı!",
    "Hayal gücü, bilginin başlangıcıdır.",
    "Merhaba Dünya, ben Node.js!",
    "Sayfayı yenile, yeni bir sır keşfet!",
    "Bu sunucuyu çalıştırdığına göre sen bir harikasın!"
];

// Sunucumuzu oluşturalım.
const server = http.createServer((req, res) => {
    // Rastgele bir mesaj seçelim.
    const rastgeleMesaj = mesajlar[Math.floor(Math.random() * mesajlar.length)];

    // Tarayıcıya HTML olarak yanıt vereceğimizi belirtiyoruz.
    // charset=utf-8 Türkçe karakterlerin düzgün görünmesini sağlar.
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    // Tarayıcıda görünecek HTML içeriğini oluşturuyoruz.
    const htmlCevap = `
        <html>
            <head>
                <title>Node.js Sunucusu</title>
                <style>
                    body { 
                        background-color: #282c34; 
                        color: #61dafb; 
                        display: flex; 
                        justify-content: center; 
                        align-items: center; 
                        height: 100vh; 
                        font-family: Arial, sans-serif;
                        margin: 0;
                    }
                    h1 { 
                        font-size: 3rem; 
                        text-align: center;
                        border: 3px solid #61dafb;
                        padding: 20px 40px;
                        border-radius: 15px;
                    }
                </style>
            </head>
            <body>
                <h1>${rastgeleMesaj}</h1>
            </body>
        </html>
    `;

    // Cevabı tarayıcıya gönderip bağlantıyı sonlandırıyoruz.
    res.end(htmlCevap);
});

// Sunucunun hangi portu dinleyeceğini belirtiyoruz.
const port = 3000;
server.listen(port, () => {
    console.log(`🎉 Sunucu başarıyla başlatıldı!`);
    console.log(`👉 Tarayıcınızdan http://localhost:${port} adresine gidin.`);
});