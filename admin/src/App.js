// npm install react-router-dom @mui/material @emotion/react @emotion/styled sweetalert2 react-jss @mui/icons-material
/*import module*/
import React from "react";
/*import router*/
import { BrowserRouter, Routes, Route } from "react-router-dom";

/*import routes*/

import Landing from "./component/page/Landing";
import Login from "./component/page/Login";
import Register from "./component/page/Register";
import UpdatePage from "./component/UI/atom/update_button";
import PrivateRoute from "./lib/PrivateRoute";
import PublicRoute from "./lib/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute component={<Landing />} />} />
        <Route
          path="/register"
          element={<PublicRoute component={<Register />} />}
        />
        <Route path="/login" element={<PublicRoute component={<Login />} />} />
        <Route
          path="/admin"
          element={<PrivateRoute component={<UpdatePage />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
