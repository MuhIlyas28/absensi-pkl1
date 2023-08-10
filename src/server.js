const express = require("express");
const app = express();
const amqp = require("amqplib");

const URL_RMQ = "amqp://rmq2.pptik.id"; // Ganti dengan URL RMQ Anda

app.use(express.json());

// Endpoint untuk menerima data dari aplikasi React
app.post("/api/absensi", (req, res) => {
  const data = req.body;

  amqp
    .connect(URL_RMQ)
    .then((connection) => {
      return connection.createChannel();
    })
    .then((channel) => {
      const namaAntrian = "absensiDataQueue"; // Ganti dengan nama antrian yang Anda inginkan
      return channel.assertQueue(namaAntrian, { durable: false })
        .then(() => channel.sendToQueue(namaAntrian, Buffer.from(JSON.stringify(data))))
        .then(() => {
          console.log("Data dikirimkan ke RabbitMQ:", data);
          res.status(200).json({ message: "Data berhasil dikirimkan" });
          return channel.close(); // Tutup channel setelah pengiriman berhasil
        });
    })
    .catch((error) => {
      console.error("Gagal mengirimkan data ke RabbitMQ:", error);
      res.status(500).json({ error: "Gagal mengirimkan data ke RabbitMQ" });
    });
});

const PORT = 3001; // Ganti dengan port yang Anda inginkan
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
