import React from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import AbsensiForm from "./AbsensiForm";
import Acc from "./DataTerkirim";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<AbsensiForm />} />
          <Route path="/data" element={<Acc />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
 