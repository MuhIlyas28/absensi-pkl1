import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./AbsensiForm.module.css";
import { Link } from "react-router-dom";

const AbsensiForm = () => {
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [loading, setLoading] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [tanggalSaatIni, setTanggalSaatIni] = useState("");

  useEffect(() => {
    const currentDate = new Date().toISOString().substr(0, 10);
    setTanggalSaatIni(currentDate);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const currentDate = new Date().toISOString().substr(0, 10);
    setTanggalSaatIni(currentDate); // Perbarui tanggalSaatIni saat form dikirim

    const msg = {
      nama: nama,
      tanggal: tanggal || tanggalSaatIni,
    };

    try {
      const response = await axios.post("http://localhost:3001/post", msg);
      console.log(response.data);
      setSuccessAlert(true); // Aktifkan alert sukses
      setNama(""); // Setel kembali input nama menjadi kosong setelah sukses
    } catch (error) {
      // Tangani kesalahan jika ada
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container ${styles.container}`}>
      <div className={`container ${styles.form}`}>
        <h2>FORM ABSENSI</h2>
        {successAlert && ( // Tampilkan alert jika successAlert true
          <div className="alert alert-success" role="alert">
            Data berhasil dikirim ke RabbitMQ!
          </div>
        )}
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
              value={tanggal || tanggalSaatIni} // Gunakan tanggal saat ini jika tanggal kosong
              onChange={(e) => setTanggal(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
        <Link to="/acc" className="btn btn-secondary mt-3">
          Tampilan Data Absensi
        </Link>
      </div>
    </div>
  );
};

export default AbsensiForm;

