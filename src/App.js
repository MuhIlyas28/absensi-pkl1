import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AbsensiForm from "./AbsensiForm";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<AbsensiForm />} />
          {/* Tambahkan rute lainnya jika diperlukan */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
