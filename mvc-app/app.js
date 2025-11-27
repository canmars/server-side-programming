import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// EJS ve Layout Ayarları
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');  // Layout dosyasının yolu
app.use(expressLayouts);  // Bu middleware'i view engine'den SONRA ekleyin

// Statik dosyalar
app.use(express.static('public'));

// Ana sayfa rotası
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Ana Sayfa',
        layout: 'layouts/main'  // Layout'u burada da belirtin
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});