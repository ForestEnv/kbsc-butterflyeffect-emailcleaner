// npm install react-router-dom @mui/material @emotion/react @emotion/styled sweetalert2 react-jss @mui/icons-material
/*import module*/
import React from "react";
/*import router*/
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import LandingPage from "./component/page/Landing";
import LoginPage from "./component/page/Login";
import RegisterPage from "./component/page/Register";
import UpdatePage from "./component/UI/atom/update_button";

// route (publicroute) 설정 필요
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/adminPage" element={<UpdatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
