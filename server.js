const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public')); // Serve static files

let currentInfo = 'Tidak ada informasi terbaru saat ini.';

// Ketika koneksi socket baru terhubung
io.on('connection', (socket) => {
    console.log('User connected');

    // Kirim informasi terbaru ke client baru yang terhubung
    socket.emit('updateInfo', currentInfo);

    // Menerima informasi dari admin
    socket.on('newInfo', (data) => {
        currentInfo = data;
        io.emit('updateInfo', currentInfo); // Kirim ke semua client
    });

    // Ketika user terputus
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
