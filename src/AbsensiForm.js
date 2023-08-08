import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./AbsensiForm.module.css";

const AbsensiForm = () => {
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io("http://example.com"); // "GANTI" harus diganti dengan server websocket sy
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // Simpan data absensi dengan menggunakan axios atau kirimkan ke backend
      axios
        .post("http://example.com/api/absensi", {
          nama,
          tanggal,
        })
        .then((response) => {
          console.log(response.data);
          if (socket) {
            socket.emit("absensiData", response.data);
          }
        })
        .catch((error) => {
          // Tangani kesalahan jika ada
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
  };

  return (
    <div className={`container ${styles.container}`}>
      <div className={`container ${styles.form}`}>
        <h2>FORM ABSENSI</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nama" className="form-label">
              Nama:
            </label>
            <input
              type="text"
              id="nama"
              className="form-control"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tanggal" className="form-label">
              Tanggal:
            </label>
            <input
              type="date"
              id="tanggal"
              className="form-control"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AbsensiForm;
