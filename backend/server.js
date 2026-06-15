import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Konfigurasi Database Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'unilandfarm_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test Koneksi DB saat server menyala
try {
  const connection = await pool.getConnection();
  console.log('Koneksi Database MySQL Berhasil!');
  connection.release();
} catch (err) {
  console.error('Koneksi Database Gagal:', err.message);
}

// 1. ENDPOINT REGISTER USER
app.post('/api/register', async (req, res) => {
  const { business_name, email, password } = req.body;
  if (!business_name || !email || !password) {
    return res.status(400).json({ message: 'Semua data pendaftaran harus diisi!' });
  }

  try {
    // Cek apakah email sudah terdaftar
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email sudah terdaftar!' });
    }

    // Insert user baru ke database (Token default = 0)
    // Catatan: Pada produk asli gunakan bcrypt untuk hashing password
    const [result] = await pool.query(
      'INSERT INTO users (business_name, email, password_hash, token_balance) VALUES (?, ?, ?, ?)',
      [business_name, email, password, 0]
    );

    res.status(201).json({
      message: 'Pendaftaran berhasil!',
      user: {
        id: result.insertId,
        business_name,
        email,
        token_balance: 0
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server saat registrasi.' });
  }
});

// 2. ENDPOINT LOGIN USER
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan password harus diisi!' });
  }

  try {
    // Cari user di database
    const [users] = await pool.query(
      'SELECT id, business_name, email, password_hash, token_balance FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Email tidak terdaftar!' });
    }

    const user = users[0];
    
    // Verifikasi password (plain text untuk kemudahan tugas akhir, ubah ke hash nanti jika perlu)
    if (user.password_hash !== password) {
      return res.status(401).json({ message: 'Password salah!' });
    }

    res.json({
      message: 'Login berhasil!',
      user: {
        id: user.id,
        business_name: user.business_name,
        email: user.email,
        token_balance: user.token_balance
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server saat login.' });
  }
});

// 3. ENDPOINT PROSES PEMBAYARAN TOKEN
app.post('/api/payment', async (req, res) => {
  const { userId, tokensAdded, price, paymentMethod, packageName } = req.body;

  if (!userId || !tokensAdded || !price || !paymentMethod) {
    return res.status(400).json({ message: 'Parameter pembayaran tidak lengkap!' });
  }

  const connection = await pool.getConnection();
  try {
    // Mulai Database Transaction untuk keamanan data
    await connection.beginTransaction();

    // 1. Generate Invoice Number secara unik
    const invoice = `INV-${new Date().getFullYear()}${(new Date().getMonth()+1).toString().padStart(2, '0')}${new Date().getDate().toString().padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

    // 2. Bersihkan format harga (buang "Rp" dan titik ".")
    const cleanPrice = parseFloat(price.replace('Rp', '').replace(/\./g, '').trim());

    // 3. Catat di tabel transactions
    await connection.query(
      'INSERT INTO transactions (invoice_number, user_id, amount, tokens_added, payment_method, status) VALUES (?, ?, ?, ?, ?, ?)',
      [invoice, userId, cleanPrice, tokensAdded, paymentMethod, 'SUCCESS']
    );

    // 4. Update saldo token di tabel users
    await connection.query(
      'UPDATE users SET token_balance = token_balance + ? WHERE id = ?',
      [tokensAdded, userId]
    );

    // Dapatkan data user yang terbaru untuk dikirim ke frontend
    const [updatedUsers] = await connection.query(
      'SELECT token_balance FROM users WHERE id = ?',
      [userId]
    );

    // Commit transaksi ke database jika semua step aman
    await connection.commit();

    res.json({
      message: 'Pembayaran berhasil tercatat!',
      invoice,
      amount: tokensAdded,
      new_balance: updatedUsers[0].token_balance
    });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ message: 'Pembayaran gagal diproses di server.' });
  } finally {
    connection.release();
  }
});

// 4. ENDPOINT RIWAYAT TRANSAKSI USER
app.get('/api/transactions/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await pool.query(
      'SELECT invoice_number, amount, tokens_added, payment_method, status, created_at FROM transactions WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data riwayat transaksi.' });
  }
});

// Jalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server API berjalan di port ${PORT}`);
});
