import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';

dotenv.config({ path: './config.env' });
const app = express();
const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV || 'development';

// Güvenlik HTTP başlıkları
app.use(helmet());

// Geliştirme ortamında loglama
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// CORS ayarları
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Body parser, JSON veri sınırı
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Veri temizleme (NoSQL injection önleme)
app.use(mongoSanitize());

// Parametre kirliliğini önleme
app.use(hpp({
  whitelist: ['filter', 'sort', 'limit', 'page'] // Query parametreleri
}));

app.use(express.static(`${__dirname}/public`));