const express = require('express');
const serverless = require('serverless-http');

// Inisialisasi Express
const app = express();
app.use(express.json()); // Untuk parsing JSON di request body

// Tempat penyimpanan informasi sementara (bisa diganti dengan database)
let infoData = [];

// Endpoint untuk mengambil informasi terbaru
app.get('/api/get-info', (req, res) => {
  res.status(200).json(infoData);
});

// Endpoint untuk meng-upload informasi
app.post('/api/upload-info', (req, res) => {
  const { infoText } = req.body; // Ambil informasi dari body request

  if (!infoText) {
    return res.status(400).json({ message: 'Informasi tidak boleh kosong!' });
  }

  // Simpan informasi ke array (bisa diganti dengan database)
  infoData.push(infoText);

  return res.status(200).json({ message: 'Informasi berhasil diperbarui!', data: infoData });
});

// Gunakan serverless-http untuk mendukung Vercel
module.exports.handler = serverless(app);
