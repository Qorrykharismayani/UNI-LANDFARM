# Uni-LanFaram - AI CMS Landing Page Platform

Uni-LanFaram adalah platform pembuatan landing page agribisnis dan UMKM lokal bertenaga AI dengan backend Next.js, Prisma ORM, dan database MySQL.

---

## 🛠️ Langkah-Langkah Setup Database MySQL (Laragon)

Ikuti langkah-langkah di bawah ini untuk menghubungkan aplikasi dengan database MySQL lokal menggunakan Laragon.

### **Langkah 1: Install & Jalankan Laragon**
1. Download dan install [Laragon](https://laragon.org/download/) jika belum ada.
2. Buka Laragon dan klik **Start All** untuk menjalankan Apache & MySQL.

### **Langkah 2: Buat Database**
1. Klik kanan pada tray icon Laragon → **MySQL** → **HeidiSQL** (atau buka HeidiSQL manual).
2. Buat database baru dengan nama: `unilandfarm`.

### **Langkah 3: Konfigurasi file `.env`**
Buat atau edit file `.env` di direktori utama project Anda:

```env
DATABASE_URL="mysql://root@localhost:3306/unilandfarm"
JWT_SECRET="uni_lanfaram_super_secret_jwt_key_2026_uninside"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### **Langkah 4: Jalankan Migrasi & Menjalankan Aplikasi**
Jalankan perintah berikut secara berurutan di terminal Anda:

```bash
# 1. Menginstal seluruh modul dependensi
npm install

# 2. Membuat file Prisma Client lokal
npx prisma generate

# 3. Menerapkan migrasi skema tabel ke MySQL
npx prisma migrate dev --name init_mysql

# 4. Menyuntikkan data awal seeder (Default Admin & User)
npx prisma db seed

# 5. Menjalankan server lokal Next.js
npm run dev
```

---

## 🔒 Fitur Proteksi & Fallback
Aplikasi Uni-LanFaram memiliki **Error Handling Koneksi Database** yang aman:
* **Anti-Crash Guard**: Jika `DATABASE_URL` pada file `.env` masih kosong, aplikasi **tidak akan crash atau memicu Internal Server Error**. 
* **Informative Response API**: Aplikasi akan menampilkan pesan yang jelas:
  > *"Database MySQL belum terhubung. Silakan periksa konfigurasi DATABASE_URL pada file .env."*
* **Offline-Fallback**: Fitur frontend tetap dapat dijalankan secara lancar menggunakan mock memory data local storage untuk demonstrasi interaktif.
