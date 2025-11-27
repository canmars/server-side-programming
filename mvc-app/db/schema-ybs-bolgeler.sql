/**
 * YBS Bölgeler Veritabanı Şeması
 * 
 * Bu dosya, ybs_bolgeler veritabanı yapısını gösterir.
 * 
 * İLİŞKİLER:
 * - bolge (1) -> (N) iller  (Bir bölge, birden fazla ile sahip olabilir)
 * - iller (1) -> (N) ilceler (Bir il, birden fazla ilçeye sahip olabilir)
 * - iller (1) -> (1) nufus   (Bir il, bir nüfus kaydına sahiptir)
 * 
 * ÖNEMLİ: Bu dosya sadece referans içindir.
 * Veritabanınız zaten mevcut, bu yüzden tabloları oluşturmanıza gerek yok.
 */

-- Veritabanı seç (zaten mevcut)
USE ybs_bolgeler;

-- ============================================
-- TABLO YAPILARI
-- ============================================

-- 1. BÖLGE TABLOSU (En üst seviye)
-- Bölgeler: Marmara, İç Anadolu, Akdeniz, vb.
CREATE TABLE IF NOT EXISTS bolge (
    bolge_id INT PRIMARY KEY,
    bolge_ad VARCHAR(50) NOT NULL,
    INDEX idx_bolge_ad (bolge_ad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. İLLER TABLOSU (Orta seviye)
-- İller: İstanbul, Ankara, İzmir, vb.
CREATE TABLE IF NOT EXISTS iller (
    il_id INT PRIMARY KEY,
    il_ad VARCHAR(50) NOT NULL,
    bolge_id INT NOT NULL,
    FOREIGN KEY (bolge_id) REFERENCES bolge(bolge_id) ON DELETE RESTRICT,
    INDEX idx_il_ad (il_ad),
    INDEX idx_bolge_id (bolge_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. İLÇELER TABLOSU (Alt seviye)
-- İlçeler: Kadıköy, Beşiktaş, Çankaya, vb.
CREATE TABLE IF NOT EXISTS ilceler (
    ilce_id INT PRIMARY KEY,
    ilce_ad VARCHAR(50) NOT NULL,
    il_id INT NOT NULL,
    FOREIGN KEY (il_id) REFERENCES iller(il_id) ON DELETE RESTRICT,
    INDEX idx_ilce_ad (ilce_ad),
    INDEX idx_il_id (il_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. NÜFUS TABLOSU
-- İllere ait nüfus bilgileri
CREATE TABLE IF NOT EXISTS nufus (
    plaka INT PRIMARY KEY,
    iller VARCHAR(14),
    n2023 INT,
    FOREIGN KEY (n2023) REFERENCES iller(il_id) ON DELETE RESTRICT,
    INDEX idx_iller (iller)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- İLİŞKİ ÖZETİ
-- ============================================
-- 
-- bolge (1) ──< iller (N)     : Bir bölge, birden fazla ile sahip
-- iller (1) ──< ilceler (N)   : Bir il, birden fazla ilçeye sahip
-- iller (1) ──< nufus (1)     : Bir il, bir nüfus kaydına sahip
--
-- ============================================

-- Tabloları kontrol et
SHOW TABLES;

-- Örnek sorgular (veritabanınızda veri varsa çalıştırabilirsiniz)
-- SELECT * FROM bolge;
-- SELECT * FROM iller;
-- SELECT * FROM ilceler;
-- SELECT * FROM nufus;

