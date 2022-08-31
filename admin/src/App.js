// npm install react-router-dom @mui/material @emotion/react @emotion/styled sweetalert2 react-jss @mui/icons-material
/*import module*/
import React from "react";
/*import router*/
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import Home from "./component/page/Home";
import LoginPage from "./component/page/Login";
import RegisterPage from "./component/page/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
