import React from "react";
import { Link } from "react-router-dom";

const Acc = () => {
  return (
    <div>
      <h2>Halaman Baru (Acc)</h2>
      <p>Ini adalah halaman baru yang ditampilkan.</p>
      
      {/* Tautan kembali ke halaman awal */}
      <Link to="/">Kembali ke Form Absensi</Link>
      
      {/* Tautan untuk menampilkan "Data Terkirim" */}
      <Link to="/data">Data Terkirim</Link>
    </div>
  );
};

export default Acc;

